import { Button, Card, Container, FormControl, FormHelperText, FormLabel, Grid, Paper, Stack, TextField, Typography } from "@mui/material";

import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../shared/services/api";
import { APICALL_URL } from "../../shared/appConstants";
import { token } from "../../shared/services/token";
import MKInput from "components/MKInput";
import MKBox from "components/MKBox";
import { CenterFocusStrong } from "@mui/icons-material";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";

export default function Login(props) {
  const [state, setState] = useState({
    emailhelperText: "",
    incorrectData: false
  })
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const passwordRef = useRef();
  const emailRef = useRef();
  const navigate = useNavigate();
  const handelLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post(APICALL_URL.USER.login, {
        email: email,
        password: password,
      });
      const body = await response.json();
      if (response.status == 200) {
        token.setToken(body.token);
        navigate('/');
      } else if (response.status == 404) { 
        emailRef.current.focus();
        console.log(emailRef.current);
        setState({
          ...state,
          incorrectData: true,
          emailhelperText: "User not registered"
        })
      } else {
        emailRef.current.focus();
        console.log(emailRef.current);
        setState({
          ...state,
          incorrectData: true,
          emailhelperText: "Incorrect email or password"
        })
      }
    } catch (e) {
      console.log("handleLogin: ", e);
    }
  };

  return (
    <MKBox>
      <MKBox
        px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}
      >
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <form onSubmit={handelLogin}>
                <Grid container spacing={3} justifyContent="center">
                  <Grid item xs={10}>
                    <MKTypography variant="h4" fontWeight="medium" mt={1}>LOGIN</MKTypography>
                  </Grid>
                  <Grid item xs={10}>
                    <FormControl sx={{ width: '80%' }} error={state.incorrectData}>
                      <MKInput
                        inputRef={emailRef}
                        label="E-mail address"
                        name="email"
                        type="text"
                        onChange={(e) => {
                          setEmail(e.target.value)
                        }}
                        error={state.incorrectData}
                        margin="normal"
                        required
                        fullWidth
                        autoComplete="email"
                        autoFocus
                      />
                      <FormHelperText>{state.emailhelperText}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={10}>
                    <FormControl sx={{ width: '80%' }}>
                      <MKInput
                        inputRef={passwordRef}
                        label="Password"
                        name="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                        error={state.incorrectData}
                        required
                        fullWidth
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={10}>
                    <MKButton type="submit" variant="contained" color="info">LOGIN</MKButton>
                  </Grid>
                  <Grid item xs={10}>
                    <MKTypography variant="body2">
                      Don't have a account? <Link to="/register">REGISTER</Link>
                    </MKTypography>
                  </Grid>
                </Grid>
              </form>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
    </MKBox>
  );
}
