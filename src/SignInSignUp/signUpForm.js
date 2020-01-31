import React, { Component } from "react";
import PropTypes from "prop-types";
import { Auth } from "aws-amplify";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
// import Cyan from "@material-ui/core/colors/cyan";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
// import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Logo2 from "../pit2.png";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"© "}
      App
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },

  image: {
    backgroundImage:
      "url(https://images.pexels.com/photos/956981/milky-way-starry-sky-night-sky-star-956981.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center"
  },

  paper: {
    margin: theme.spacing(10, 4),
    marginBottom: theme.spacing(40),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

  textFieldTop: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
    //width: "40%"
  },

  textFieldBottom: {
    marginBottom: theme.spacing(4)
    //width: "40%"
  },

  saveButton: {
    marginBottom: theme.spacing(2),
    // margin: theme.spacing(2),
    /* this is text color */ color: theme.palette.getContrastText("#b2dfdb"),
    backgroundColor: "#b2dfdb",
    "&:hover": {
      backgroundColor: "#80cbc4"
    },
    width: "25%"
  },
  textFieldOriginal: {
    marginBottom: theme.spacing(4),
    width: "40%"
  }
});

const theme = createMuiTheme({
  palette: {
    primary: { main: "#b2dfdb" }
  }
});

const navStyle = {
  color: "black",
  textDecoration: "none"
};
class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // username: "",
      password: "",
      email: "",
      confirmationCode: "",
      firstName: "",
      lastName: "",
      verified: false
    };

    this.handleConfirm = this.handleConfirm.bind(this);
    this.confirmSignUp = this.confirmSignUp.bind(this);
  }

  // KEEP for Signing Up
  submitSignUp = async event => {
    const { /*username, */ password, email } = this.state;
    event.preventDefault();

    try {
      await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          email: email
        }
      });
      this.setState({ verified: true });
      console.log(`Sucessfully signed up`);
    } catch (error) {
      ///The user has already registered so go to the SignIn method
      if (error["code"] === "UsernameExistsException") {
        console.log("this user already exists!");
      } else {
        console.log(error);
      }
    }
  };

  confirmSignUp() {
    const { /*username*/ email, confirmationCode } = this.state;
    Auth.confirmSignUp(/*username*/ email, confirmationCode)
      .then(() => {
        console.log("Successfully confirmed signed up");
        this.props.handleSignup();
        console.log(this.props.handleSignup);
      })
      .catch(err => console.log(`Error confirming sign up - ${err}`));
  }

  handleConfirm(e) {
    e.preventDefault();

    this.confirmSignUp();
    this.setState({
      confirmationCode: "",
      email: ""
      //username: ""
    });

    e.target.reset();
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.state.verified ? (
          <form onSubmit={this.handleConfirm}>
            <CssBaseline />
            <Grid container component="main" className={classes.root}>
              <Grid item xs={false} sm={4} md={7} className={classes.image} />
              <Grid
                item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={6}
                //square
              >
                <div className={classes.paper}>
                  <Avatar className={classes.avatar}>
                    {/* <LockOutlinedIcon /> */}
                    <img src={Logo2} alt="test" height={45} />
                  </Avatar>

                  <Typography component="h1" variant="h5">
                    Sign Up
                  </Typography>
                  <MuiThemeProvider theme={theme}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="confirmationCode"
                      label="Confirmation Code"
                      className={classes.textFieldTop}
                      value={this.state.confirmationCode}
                      onChange={this.handleChange("confirmationCode")}
                    />
                    <Button
                      className={classes.saveButton}
                      type="submit"
                      size="large"
                      variant="contained"
                    >
                      Confirm Sign Up
                    </Button>
                  </MuiThemeProvider>
                  <Grid container>
                    <Grid item xs>
                      <Link style={navStyle} href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link style={navStyle} href="#" variant="body2">
                        {"Already have an account? Sign in"}
                      </Link>
                    </Grid>
                  </Grid>
                  <Box mt={5}>
                    <Copyright />
                  </Box>
                </div>
              </Grid>
            </Grid>
          </form>
        ) : (
          <form onSubmit={this.submitSignUp}>
            <CssBaseline />
            <Grid container component="main" className={classes.root}>
              <Grid item xs={false} sm={4} md={7} className={classes.image} />
              <Grid
                item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={6}
                //square
              >
                <div className={classes.paper}>
                  <Avatar className={classes.avatar}>
                    {/* <LockOutlinedIcon /> */}
                    <img src={Logo2} alt="test" height={45} />
                  </Avatar>

                  <Typography component="h1" variant="h5">
                    Sign Up
                  </Typography>
                  <MuiThemeProvider theme={theme}>
                    {/*    <Grid
                      container
                      direction="column"
                      justify="center"
                      alignItems="center"
                    > */}
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="first-name"
                      label="First Name"
                      className={classes.textFieldTop}
                      value={this.state.firstName}
                      onChange={this.handleChange("firstName")}
                    />
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="last-name"
                      label="Last Name"
                      className={classes.textFieldTop}
                      value={this.state.lastName}
                      onChange={this.handleChange("lastName")}
                    />
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email"
                      className={classes.textFieldTop}
                      value={this.state.email}
                      onChange={this.handleChange("email")}
                    />

                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      type="password"
                      id="password"
                      label="Password"
                      className={classes.textFieldBottom}
                      value={this.state.password}
                      onChange={this.handleChange("password")}
                    />
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="org-name"
                      label="Organization Name"
                      className={classes.textFieldBottom}
                      value={this.state.orgName}
                      onChange={this.handleChange("orgName")}
                    />

                    <Button
                      className={classes.saveButton}
                      type="submit"
                      size="large"
                      variant="contained"
                    >
                      Sign Up
                    </Button>
                  </MuiThemeProvider>
                  <Grid container>
                    <Grid item xs>
                      <Link style={navStyle} href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link
                        onClick={this.props.handleSignup}
                        style={navStyle}
                        href="#"
                        variant="body2"
                      >
                        {"Already have an account? Sign In"}
                      </Link>
                    </Grid>
                  </Grid>
                  <Box mt={5}>
                    <Copyright />
                  </Box>
                </div>
              </Grid>
            </Grid>
          </form>
        )}
      </div>
    );
  }
}

SignUpForm.propTypes = {
  classes: PropTypes.object.isRequired
};

//export default SignUpForm;
export default withStyles(styles)(SignUpForm);
