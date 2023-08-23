import { Button, Card, Container, FormControl, FormHelperText, FormLabel, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import { API } from "../../shared/services/api";
import { APICALL_URL } from "../../shared/appConstants";
import { token } from "../../shared/services/token";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import validator from "validator";
import { valid } from "chroma-js";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const passwordRef = useRef();
  const emailRef = useRef();
  const nameRef = useRef();
  const [errorMessage, setErrorMessage] = useState({
    emailMessage: "",
    passwordMessage: "password must contain a lower case, uppercase, number and more than 10 characters",
    passwordError: true,
    emailError: false
  });

  const navigate = useNavigate();

  const handlePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const lowerCase = /[a-z]/g;
    const upperCase = /[A-Z]/g;
    const numbers = /[0-9]/g;
    const requirements = [];

    if (!newPassword.match(lowerCase)) {
      requirements.push("lowercase letter");
      // setErrorMessage({ passwordMessage: "Password should contains lowercase letters!", passwordError: true });
    }
    if (!newPassword.match(upperCase)) {
      requirements.push("uppercase letter");
      // setErrorMessage({ passwordMessage: "Password should contain uppercase letters!", passwordError: true });
    } 
    if (!newPassword.match(numbers)) {
      requirements.push("numbers");
      // setErrorMessage({ passwordMessage: "Password should contains numbers also!", passwordError: true });
    } 
    if (newPassword.length < 10) {
      requirements.push("more than 10 characters");
      // setErrorMessage({ passwordMessage: "Password length should be more than 10.", passwordError: true });
    } 
    if (requirements.length == 0){
      setErrorMessage({ passwordMessage: "Password is strong!", passwordError: false });
      return false;
    }
    const errMessage = `password must also contain ${requirements.join(" ,")}`
    setErrorMessage({passwordMessage: errMessage, passwordError: true})
    return true;
  }

  const handelRegister = async (e) => {
    e.preventDefault();
    
    try {

      if (!validator.isEmail(email)) {
        setErrorMessage({
          ...errorMessage,
          emailError: true,
          emailMessage: "Incorrect e-mail address"
        })
        return emailRef.current.focus();
      }

      if (errorMessage.passwordError) {
        return passwordRef.current.focus();
      }

      const response = await API.post(APICALL_URL.USER.register, {
        name: name,
        email: email,
        password: password,
      });
      if (response.ok) {
        navigate('/login');
      } else if (response.status == 409) {
        console.log(response)
        setErrorMessage({
          ...errorMessage,
          emailError: true,
          emailMessage: "User already exists"
        })
        return emailRef.current.focus();
      } else {
        console.log('else')
      }
    } catch (e) {
      console.log(e);
    }

  };

  return (
    <MKBox>
      <MKBox
        px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}
      >
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={12} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <form onSubmit={handelRegister}>
                <Grid container spacing={3} justifyContent="center">
                  <Grid item xs={10}>
                    <MKTypography variant="h4" fontWeight="medium" mt={1}>REGISTER</MKTypography>
                  </Grid>
                  <Grid item xs={10}>
                    <FormControl sx={{ width: '80%' }}>
                      <MKInput
                        inputRef={nameRef}
                        label="Name"
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                        error={errorMessage.nameError}
                        margin="normal"
                        required
                        fullWidth
                        autoFocus
                      />
                      <FormHelperText>{errorMessage.nameMessage}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={10}>
                    <FormControl sx={{ width: '80%' }}>
                      <MKInput
                        inputRef={emailRef}
                        label="E-mail address"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        error={errorMessage.emailError}
                        margin="normal"
                        required
                        fullWidth
                        autoFocus
                      />
                      <FormHelperText>{errorMessage.emailMessage}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={10}>
                    <FormControl sx={{ width: '80%' }}>
                      <MKInput
                        inputRef={passwordRef}
                        label="Password"
                        name="password"
                        type="password"
                        onChange={(e) => handlePassword(e)}
                        error={errorMessage.passwordError}
                        margin="normal"
                        required
                        fullWidth
                      />
                      <FormHelperText>{errorMessage.passwordMessage}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={10}>
                    <MKButton type="submit" variant="contained" color="info">REGISTER</MKButton>
                  </Grid>
                  <Grid item xs={10}>
                    <MKTypography variant="body2">
                      Have an account? <Link to='/'>LOGIN</Link>
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
