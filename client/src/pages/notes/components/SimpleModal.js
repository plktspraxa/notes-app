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

function SimpleModal({ show = false, setShow, note }) {
    const contentRef = useRef();

    const toggleModal = () => setShow(!show);

    const updateNote = async () => {

    }

    const deleteNote = async () => {
        
    }

    return (
        <MKBox component="section" py={6}>
            <Container>
                <Modal open={show} onClose={toggleModal} sx={{ display: "grid", placeItems: "center" }}>
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
                                <MKTypography variant="h5">{note.title}</MKTypography>
                                <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={toggleModal} />
                            </MKBox>
                            <Divider sx={{ my: 0 }} />
                            <MKBox p={2} justifyContent="center"
                                alignItems="center" display='flex'>
                                <MKInput fullWidth color="secondary" fontWeight="regular" multiline rows={5} defaultValue={note.content} inputRef = {contentRef} />
                            </MKBox>
                            <Divider sx={{ my: 0 }} />
                            <MKBox display="flex" justifyContent="space-between" p={1.5}>
                                <MKButton variant="gradient" color="dark" onClick={toggleModal}>
                                    close
                                </MKButton>
                                <MKButton variant="gradient" color="info" onClick = {() => console.log(contentRef.current.value)}>
                                    save changes
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