import { useEffect, useRef, useState } from "react";
// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Slide from "@mui/material/Slide";

// @mui icons
import CloseIcon from "@mui/icons-material/Close";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import { notesApi } from "shared/services/notesApi";
import button from "assets/theme/components/button";
import { toast } from "react-toastify";


function NoteModal({ show = false, setShow, note = { title: "", content: "" }, newNote = false }) {
    const initialState = {
        charactersLeft: 200,
        titleHelper: "",
        titleError: false,
        
    }
    const [state, setState] = useState(initialState)
    const titleRef = useRef();
    const contentRef = useRef();

    const buttonLabel = {
        save() {
            return newNote ?
                <>
                    Create
                </>
                :
                <>
                    Save changes
                </>
        },
        delete() {
            return newNote ?
                <>
                    Discard
                </>
                :
                <>
                    Delete
                </>
        }
    }

    const closeModal = () => {
        resetForm();
        setShow(false)
    };

    const resetForm = () => {
        titleRef.current.value = "";
        contentRef.current.value = "";
        setState(initialState)
    }

    const addNote = async () => {
        const response = await notesApi.create({
            title: titleRef.current.value,
            content: contentRef.current.value
        })
        if (response.ok) {
            toast.success('Note Added')
            closeModal();
        } else if (response.status == 409) {
            toast.error('Dublicate Title')
            setState({
                ...state,
                titleHelper: "duplicate title",
                titleError: true
            })
        } else {
            toast.error('Couldn\'t add note!!')
        }
    }

    const updateNote = async () => {
        const response = await notesApi.update(note._id, {
            title: titleRef.current.value,
            content: contentRef.current.value
        });
        if (response.ok) {
            toast.success('Note Updated')
            closeModal();
        } else {
            toast.error('Note couldn\'t be Updated');
        }
    }

    const deleteNote = async () => {
        const response = await notesApi.delete(note._id);
        if(response.ok){
            toast.success('Note Deleted');
            closeModal();
        } else {
            toast.error('Note not deleted!!')
        }
    }

    return (
        <MKBox component="section" py={6}>
            <Container>
                <Modal open={show}
                    onClose={() => {
                        resetForm();
                    }}
                    sx={{ display: "grid", placeItems: "center" }}>
                    <Slide direction="down" in={show} timeout={500}>
                        <MKBox
                            position="relative"
                            width="500px"
                            display="flex"
                            flexDirection="column"
                            borderRadius="xl"
                            bgColor="white"
                            shadow="xl"
                        >
                            <MKBox display="flex" alginItems="center" justifyContent="space-between" p={2}>
                                <MKInput
                                    helperText={state.titleHelper}
                                    error={state.titleError}
                                    sx={{
                                        width: "80%"
                                    }}
                                    color="secondary"
                                    fontWeight="regular"
                                    defaultValue={note.title}
                                    inputRef={titleRef}
                                />
                                <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={closeModal} />
                            </MKBox>
                            <Divider sx={{ my: 0 }} />
                            <MKBox
                                p={2}
                                justifyContent="center"
                                alignItems="center"
                                display='flex'
                            >
                                <MKInput
                                    fullWidth
                                    color="secondary"
                                    helperText={`characters left : ${(state.charactersLeft) || (200 - note.content.length)}`}
                                    fontWeight="regular"
                                    multiline rows={5}
                                    inputProps={{ maxLength: 200 }}
                                    defaultValue={note.content}
                                    inputRef={contentRef}
                                    onChange={(e) => {
                                        const charLeft = (200 - e.target.value.length).toString();
                                        console.log(state);
                                        setState({
                                            ...state,
                                            charactersLeft: charLeft
                                        })
                                    }}
                                />
                            </MKBox>
                            <Divider sx={{ my: 0 }} />
                            <MKBox display="flex" justifyContent="space-between" p={1.5}>
                                <MKButton variant="gradient" color="error"
                                    onClick={() => {
                                        if (!newNote) {
                                            return deleteNote();
                                        }
                                        closeModal();
                                    }}
                                >
                                    {
                                        buttonLabel.delete()
                                    }
                                </MKButton>
                                <MKButton variant="gradient" color="info"
                                    onClick={() => {
                                        if (newNote) {
                                            addNote();
                                        } else {
                                            updateNote();
                                        }
                                    }}
                                >
                                    {
                                        buttonLabel.save()
                                    }
                                </MKButton>
                            </MKBox>
                        </MKBox>
                    </Slide>
                </Modal>
            </Container>
        </MKBox>
    );
}

export default NoteModal;