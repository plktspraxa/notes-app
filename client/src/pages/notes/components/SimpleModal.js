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


function SimpleModal({ show = false, setShow, note = { title: "", content: "" }, newNote = false }) {

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
    const titleRef = useRef();
    const contentRef = useRef();

    const toggleModal = () => setShow(!show);

    const resetForm = () => {
        titleRef.current.value = "";
        contentRef.current.value = "";
    }

    const addNote = async () => {
        const not = await notesApi.create({
            title: titleRef.current.value,
            content: contentRef.current.value
        })
            .then((res) => res.json())
        console.log(not);
    }

    const updateNote = async () => {
        const not = await notesApi.update(note._id, {
            title: titleRef.current.value,
            content: contentRef.current.value
        }).then((res) => res.json())
        console.log(not);
    }

    const deleteNote = async () => {
        notesApi.delete(note._id);
    }

    return (
        <MKBox component="section" py={6}>
            <Container>
                <Modal open={show}
                    onClose={() => {
                        resetForm();
                        toggleModal();
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
                                <MKInput sx={{
                                    width: "80%"
                                }} color="secondary" fontWeight="regular" defaultValue={note.title} inputRef={titleRef} />
                                <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={toggleModal} />
                            </MKBox>
                            <Divider sx={{ my: 0 }} />
                            <MKBox p={2} justifyContent="center"
                                alignItems="center" display='flex'>
                                <MKInput fullWidth color="secondary" fontWeight="regular" multiline rows={5} defaultValue={note.content} inputRef={contentRef} />
                            </MKBox>
                            <Divider sx={{ my: 0 }} />
                            <MKBox display="flex" justifyContent="space-between" p={1.5}>
                                <MKButton variant="gradient" color="error"
                                    onClick={() => {
                                        if (!newNote) {
                                            deleteNote();
                                        }
                                        toggleModal();
                                    }}
                                >
                                    {
                                        newNote ?
                                            <>
                                                Discard
                                            </>
                                            :
                                            <>
                                                Delete
                                            </>
                                    }
                                </MKButton>
                                <MKButton variant="gradient" color="info"
                                    onClick={() => {
                                        if (newNote) {
                                            addNote();
                                        } else {
                                            updateNote();
                                        }
                                        toggleModal();
                                    }}
                                >
                                    {
                                        newNote ?
                                            <>
                                                Create
                                            </>
                                            :
                                            <>
                                                Save changes
                                            </>
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

export default SimpleModal;