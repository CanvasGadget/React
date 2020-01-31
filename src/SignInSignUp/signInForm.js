import React, { Component } from "react";
import { Auth } from "aws-amplify";
import PropTypes from "prop-types";
import App from "../App";
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

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // username: "",
      password: "",
      signedIn: false
    };
    this.handleToggleSignIn = this.handleToggleSignIn.bind(this);
    //this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
    // this.signIn = this.signIn.bind(this);
    //this.confirmSignIn = this.confirmSignIn.bind(this);
  }

  handleSubmit = async event => {
    const { /*username*/ email, password } = this.state;
    event.preventDefault();

    try {
      await Auth.signIn({ username: email, password: password });
      this.setState({ signedIn: true });
      console.log(`You have sucessfully signed in`);
    } catch (error) {
      console.log(`Error signing in: ${error}`);
      console.log(`There was an error logging in`);
      this.setState({ signedIn: false, username: "", password: "" });
    }
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleToggleSignIn() {
    const { signedIn } = this.state;
    this.handleToggleClear();
    this.setState({
      signedIn: !signedIn,
      email: "",
      username: "",
      password: ""
    });
  }

  handleToggleClear() {
    this.setState({
      //username: "",
      email: "",
      password: ""
    });
  }

  /*   
  handleChange(e) {
    if (e.target.id === "username") {
      this.setState({
        username: e.target.value
      });
    } else if (e.target.id === "password") {
      this.setState({
        password: e.target.value
      });
    }
  }
 */
  render() {
    // const { signedIn } = this.state;
    const { classes } = this.props;
    return (
      /*       <Container maxWidth="lg"> */
      <div>
        {this.state.signedIn ? (
          <App handleSignOut={this.handleToggleSignIn} />
        ) : (
          <form onSubmit={this.handleSubmit}>
            {/* Makes the text like typography */} <CssBaseline />
            {/*  <Grid
              container
              direction="column"
              justify="center"
              alignItems="
              center"
            > */}
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
                    Sign in
                  </Typography>
                  <MuiThemeProvider theme={theme}>
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

                    <Button
                      className={classes.saveButton}
                      type="submit"
                      size="large"
                      variant="contained"
                    >
                      Sign In
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
                        onClick={this.props.handleSignup2}
                        style={navStyle}
                        href="#"
                        variant="body2"
                      >
                        {"Don't have an account? Sign Up"}
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
        {/*   </Container>  */}
      </div>
    );
  }

  // end of classs
}

SignInForm.propTypes = {
  classes: PropTypes.object.isRequired
};

// export default SignInForm;
export default withStyles(styles)(SignInForm);
