import { Container, Divider, Modal, Slide } from '@mui/material';
import MKBox from 'components/MKBox';
import MKButton from 'components/MKButton';
import MKTypography from 'components/MKTypography';
import React from 'react'

const ConfirmationPopUp = ({ show, setShow, setConfirmation , text}) => {
    return (
        <MKBox component="section" py={6}>
            <Container>
                <Modal
                    open={show}
                    sx={{ display: "grid", placeItems: "center" }}
                >
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
                                <MKTypography>
                                    {text}
                                </MKTypography>
                            </MKBox>
                            <Divider sx={{ my: 0 }} />
                            <MKBox display="flex" justifyContent="space-between" p={1.5}>
                                <MKButton
                                    variant="gradient"
                                    color="error"
                                    onClick={() => {
                                        setConfirmation(false);
                                        setShow(false);
                                    }}
                                >
                                    NO
                                </MKButton>
                                <MKButton
                                    variant="gradient"
                                    color="info"
                                    onClick={() => {
                                        setConfirmation(true)
                                        setShow(false);
                                    }}
                                >
                                    YES
                                </MKButton>
                            </MKBox>
                        </MKBox>
                    </Slide>
                </Modal>
            </Container>
        </MKBox>
    )
}

export default ConfirmationPopUp;