import React from 'react';
import { withRouter } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import { validationForm } from "../js/validation";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Axios from 'axios';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const useStyles = makeStyles(theme => ({
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white,
      },
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));


function SignUp(props) {

    const classes = useStyles();
        
        return (
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
                <Formik
                initialValues={{
                  firstName:"",
                  lastName:"",
                  email:"",
                  password:""
                }}
                validate={validationForm}
                onSubmit={(values, {setSubmitting}) => {
                  Axios
                    .post("http://localhost:5001/", values)
                    .then(response => {
                      if (response.status === 201) {
                        localStorage.setItem("user", JSON.stringify(values))   
                        props.history.push("/signin")
                      }
                    })
                  // localStorage.setItem("user", JSON.stringify(values))
                  // props.history.push("/signin")
                }}
                >
                  {({
                    values,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting
                  }) => (
                <form 
                className={classes.form}
                onSubmit={handleSubmit}
                noValidate
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="fname"
                        name="firstName"
                        variant="outlined"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        defaultValue={values.firstName}
                        autoFocus
                      />
                      <p
                      style={{
                        color:"red",
                        fontStyle:"italic"
                      }}
                      >
                        <ErrorMessage name="firstName" />
                      </p>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        defaultValue={values.lastName}
                        autoComplete="lname"
                      />
                      <p
                      style={{
                        color:"red",
                        fontStyle:"italic"
                      }}
                      >
                        <ErrorMessage name="lastName" />
                      </p>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        defaultValue={values.email}
                        autoComplete="email"
                      />
                       <p
                      style={{
                        color:"red",
                        fontStyle:"italic"
                      }}
                      >
                        <ErrorMessage name="email" />
                      </p>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        defaultValue={values.password}
                        autoComplete="current-password"
                      />
                      <p
                      style={{
                        color:"red",
                        fontStyle:"italic"
                      }}
                      >
                        <ErrorMessage name="password" />
                      </p>
                    </Grid>

                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Sign Up
                  </Button>
                  <Grid container justify="flex-end">
                    <Grid item>
                      <Link href="/signin" variant="body2">
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </form>
                )}
                </Formik>
              </div>
              <Box mt={5}>
                <Copyright />
              </Box>
            </Container>
          );   
}

export default withRouter(SignUp)
