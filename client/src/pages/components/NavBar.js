import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MKBox from 'components/MKBox';
import { useNavigate } from 'react-router-dom';
import DefaultNavbar from './DefaultNavbar';
import routes from 'routes';
import { Container, Grid, Stack } from '@mui/material';


export default function NavBar(props) {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <MKBox >
            <MKBox>
                <MKBox variant="gradient" bgColor="dark" shadow="sm" py={0.25}>
                    <DefaultNavbar
                        brand='Notes App'
                        routes={[]}
                        transparent
                        relative
                        light
                        center
                        action={{
                            label: "LOGOUT",
                            type: "internal",
                            route: "/logout",
                            color: "primary",
                        }}
                    >
                    </DefaultNavbar>
                </MKBox>
                <MKBox m = {3}>
                    <Container>
                        {props.children}
                    </Container>
                </MKBox>
            </MKBox>
        </MKBox>
    );
}