import React from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import Cyan from "@material-ui/core/colors/cyan";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Redirect } from "react-router-dom";

import axios from "axios";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },

  colorSwitchBase: {
    color: red[300],
    "&$colorChecked": {
      color: green[500],
      "& + $colorBar": {
        backgroundColor: green[500]
      }
    }
  },
  colorBar: {},
  colorChecked: {},

  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },

  textField2: {
    // marginLeft: theme.spacing.unit,
    marginRight: theme.spacing(20),
    width: 300
  },

  textField3: {
    marginLeft: theme.spacing(24),
    //marginBottom: theme.spacing(5),
    // marginRight: theme.spacing(20),
    width: 300
  },

  textFieldNotes: {
    //marginLeft: theme.spacing.unit,
    //marginRight: theme.spacing.unit,
    width: 850
  },

  marg: {
    marginRight: theme.spacing(44)
    // marginBottom: theme.spacing(5)
  },

  menu: {
    width: 200
  },
  root: {
    width: "100%",
    //marginLeft: theme.spacing.unit * 22,
    paddingTop: theme.spacing.unit,
    marginTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },

  rootTitle: {
    width: "100%",
    marginTop: theme.spacing(-1),
    marginBottom: theme.spacing(2),
    backgroundColor: Cyan[800],
    color: theme.palette.getContrastText("#00838f")

    //paddingTop: theme.spacing.unit,
    //paddingBottom: theme.spacing.unit * 2
  },

  container2: {
    display: "flex",
    flexWrap: "wrap"
  },

  menu2: {
    width: 200
  },

  memberTitle: {
    align: "center"
    //marginTop: theme.spacing(1),
    //marginBottom: theme.spacing(1)
  },
  icon: {
    marginRight: theme.spacing(1),
    fontSize: 20
  },

  saveButton: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
    /* this is text color */ color: theme.palette.getContrastText("#b2dfdb"),
    backgroundColor: "#b2dfdb",
    "&:hover": {
      backgroundColor: "#80cbc4"
    }
  }
});

const theme = createMuiTheme({
  palette: {
    primary: { main: "#b2dfdb" }
  }
});

const theme2 = createMuiTheme({
  palette: {
    primary: { main: "#80cbc4" }
  }
});

const titles = [
  {
    value: null,
    label: ""
  },

  {
    value: "Dr.",
    label: "Dr."
  },

  {
    value: "Miss",
    label: "Miss"
  },

  {
    value: "Mr.",
    label: "Mr."
  },
  {
    value: "Mrs.",
    label: "Mrs."
  },
  {
    value: "Ms.",
    label: "Ms."
  },
  {
    value: "Mx.",
    label: "Mx."
  }
];

const roles = [
  {
    value: "Administrator",
    label: "Administrator"
  },

  {
    value: "Therapist",
    label: "Therapist"
  },

  {
    value: "Intern",
    label: "Intern"
  }
];

class NewTeamMemberHideInactive extends React.Component {
  state = {
    checkedActive: true,
    memberFirstName: "",
    memberLastName: "",
    memberRole: "",
    memberEmail: "",
    memberTitle: "",
    memberCurrentPass: "",
    memberConfirmPass: "",
    memberPhone: "",
    memberAddress: "",
    memberLocation: "",
    memberNpi: "",
    memberCity: "",
    memberZipCode: "",
    memberNotes: "",
    memberBday: "",
    multiline: "Controlled",
    redirect: false,
    deleteDialog: false,
    deleteDialog2: false
  };

  /*
  componentDidMount() {
    axios
      .get("http://localhost:5000/members")
      .then(response => {
        console.log("Got member data!");
        console.log(response.data);
        this.setState({
          memberData: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
      console.log("Client interval set!");
    }
  }
*/
  // multiple get method

  componentDidMount() {
    axios
      .get("http://localhost:5000/members")
      .then(response => {
        console.log("Got member data!");
        console.log(response.data);
        this.setState({
          memberData: response.data
        });
      }) /* multiple get
      .then(response2 => {
        return axios
          .get("http://localhost:5000/allclients") // using response.data
          .then(response2 => {
            console.log("Got client data!");
            console.log(response2.data);
            this.setState({
              clientData: response2.data
            });
          });
      }) */
      .catch(function(error) {
        console.log(error);
      });

    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
      console.log("Data interval set!");
    }
  }

  /* async request style

 componentDidMount() {
    axios
      .get("http://localhost:5000/members")
      .then(response => {
        console.log("Got member data!");
        console.log(response.data);
        this.setState({
          memberData: response.data
        });
      })
      .then(async () => {
        const response2 = await axios
          .get("http://localhost:5000/allclients") // using response.data
          ;
        console.log("Got client data!");
        console.log(response2.data);
        this.setState({
          clientData: response2.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });

    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
      console.log("Data interval set!");
    }
  }

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
      console.log("Unmounted from team data!");
    }
  }
	
  */

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
      console.log("Unmounted from data!");
    }
  }

  onSubmit() {
    //experiment keeping preventDefault
    //e.preventDefault();

    const memberObj = {
      memberFirstName: this.state.memberFirstName,
      memberLastName: this.state.memberLastName,
      memberEmail: this.state.memberEmail,
      memberRole: this.state.memberRole,
      memberTitle: this.state.memberTitle,
      memberCurrentPass: this.state.memberCurrentPass,
      memberConfirmPass: this.state.memberConfirmPass,
      memberPhone: this.state.memberPhone,
      memberAddress: this.state.memberAddress,
      memberLocation: this.state.memberLocation,
      memberNpi: this.state.memberNpi,
      memberCity: this.state.memberCity,
      memberZipCode: this.state.memberZipCode,
      memberNotes: this.state.memberNotes,
      memberBday: this.state.memberBday,
      checkedActive: this.state.checkedActive
    };
    /* 
    const clientObj = {
      client: this.state.client,
      memberFirstName: this.state.memberFirstName,
      memberLastName: this.state.memberLastName,
      sessionCost: this.state.sessionCost,
      sessionLength: this.state.sessionLength,
      sessionType: this.state.sessionType
    };
    */
    axios
      .post("http://localhost:5000/members/registermember", memberObj)
      // .then(res => console.log(res.data));
      /* this will clear everything after saving+closing */
      .then(response => {
        this.setState({
          memberObj,
          redirect: true
        });
      });
    /* multiple post 
      .then(post2 => {
        return axios
          .post("http://localhost:5000/assignClients/assignclient1", clientObj) // using response.data
          .then(post2 => {
            this.setState({
              clientObj
            });
          });
      });
      */
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleChange2 = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleChangeChecked = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleDeleteDialogOpen = () => {
    this.setState({ deleteDialog: true });
  };

  handleDeleteDialogClose = () => {
    this.setState({ deleteDialog: false });
  };

  handleDeleteDialogOpen2 = () => {
    this.setState({ deleteDialog2: true });
  };

  handleDeleteDialogClose2 = () => {
    this.setState({ deleteDialog2: false });
  };

  /*

  reloadPage() {
    // if (this.state.location !== prevState.location) {
    window.location.reload();
    console.log("Refresh!");
  }
*/

  render() {
    const { classes } = this.props;
    if (this.state.redirect) {
      return <Redirect push to="/teammembers/hideinactive/" />;
    }

    return (
      <Container maxWidth="lg">
        <form className={classes.container} noValidate autoComplete="off">
          <Paper className={classes.root} elevation={1}>
            <Paper className={classes.rootTitle} elevation={0}>
              <Typography
                className={classes.memberTitle}
                align="center"
                variant="h5"
              >
                Team Member Information
              </Typography>
            </Paper>

            <Dialog
              open={this.state.deleteDialog}
              onClose={this.handleDeleteDialogClose}
            >
              <DialogTitle>Oops! You missed a field!</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please fill out any field with an asterisk.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleDeleteDialogClose}>Got it!</Button>
              </DialogActions>
            </Dialog>

            <Dialog
              open={this.state.deleteDialog2}
              onClose={this.handleDeleteDialogClose2}
            >
              <DialogTitle>Please input the same password</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  The passwords inputted must match
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleDeleteDialogClose2}>Ok</Button>
              </DialogActions>
            </Dialog>

            <Grid container justify="center" alignItems="center">
              <Grid container row justify="center" alignItems="center">
                <MuiThemeProvider theme={theme}>
                  <FormGroup row>
                    <FormControlLabel
                      className={classes.marg}
                      control={
                        <Switch
                          checked={this.state.checkedActive}
                          onChange={this.handleChangeChecked("checkedActive")}
                          value="checkedActive"
                          // marginLeft="theme.spacing(2)"

                          /*
                        classes={{
                          switchBase: "#1de9b6",
                          checked: "#1de9b6",
                          bar: "#1de9b6"
                        }}*/
                          color="primary"
                        />
                      }
                      label="Active"
                    />
                  </FormGroup>
                </MuiThemeProvider>

                <TextField
                  id="memberRole"
                  select
                  label="Role"
                  variant="outlined"
                  className={classes.textField3}
                  value={this.state.memberRole}
                  onChange={this.handleChange("memberRole")}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                >
                  {roles.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <TextField
                id="standard-select-memberTitle"
                select
                label="Title"
                margin="normal"
                variant="outlined"
                className={classes.textField}
                value={this.state.memberTitle}
                onChange={this.handleChange("memberTitle")}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
              >
                {titles.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <MuiThemeProvider theme={theme}>
                <TextField
                  required
                  id="standard-memberFirstName"
                  label="First Name"
                  variant="outlined"
                  color={theme}
                  className={classes.textField}
                  value={this.state.memberFirstName}
                  onChange={this.handleChange("memberFirstName")}
                  margin="normal"
                />
              </MuiThemeProvider>
              <TextField
                required
                id="standard-lastNamename"
                label="Last Name"
                variant="outlined"
                className={classes.textField}
                value={this.state.memberLastName}
                onChange={this.handleChange("memberLastName")}
                margin="normal"
              />
              <TextField
                required
                id="standard-memberEmail"
                variant="outlined"
                label="Email"
                className={classes.textField}
                value={this.state.memberEmail}
                onChange={this.handleChange("memberEmail")}
                margin="normal"
              />
              <TextField
                required
                id="standard-password-input"
                variant="outlined"
                label="Password"
                className={classes.textField}
                type="password"
                value={this.state.memberCurrentPassword}
                onChange={this.handleChange("memberCurrentPassword")}
                //autoComplete="current-password"
                margin="normal"
              />
              <TextField
                required
                id="standard-memberConfirmPass-input"
                variant="outlined"
                label="Confirm Password"
                className={classes.textField}
                type="password"
                value={this.state.memberConfirmPass}
                onChange={this.handleChange("memberConfirmPass")}
                //autoComplete="current-password"
                margin="normal"
              />

              <TextField
                id="standard-memberAddress"
                variant="outlined"
                label="Address"
                className={classes.textField}
                value={this.state.memberAddress}
                onChange={this.handleChange("memberAddress")}
                margin="normal"
              />
              <TextField
                id="standard-memberCity-"
                variant="outlined"
                label="City"
                className={classes.textField}
                value={this.state.memberCity}
                onChange={this.handleChange("memberCity")}
                margin="normal"
              />
              <TextField
                id="standard-state"
                variant="outlined"
                label="State"
                className={classes.textField}
                value={this.state.memberState}
                onChange={this.handleChange("memberState")}
                margin="normal"
              />
              <TextField
                id="standard-memberZipCode"
                variant="outlined"
                label="Zip Code"
                className={classes.textField}
                value={this.state.memberZipCode}
                onChange={this.handleChange("memberZipCode")}
                margin="normal"
              />
              <TextField
                id="standard-memberPhone"
                variant="outlined"
                label="Phone Number"
                className={classes.textField}
                value={this.state.memberPhone}
                onChange={this.handleChange("memberPhone")}
                margin="normal"
              />
              <TextField
                id="standard-bday"
                variant="outlined"
                label="Birthday"
                className={classes.textField}
                value={this.state.memberBday}
                onChange={this.handleChange("memberBday")}
                margin="normal"
              />

              <TextField
                id="standard-memberNpi"
                variant="outlined"
                label="NPI Number"
                className={classes.textField}
                value={this.state.memberNpi}
                onChange={this.handleChange("memberNpi")}
                margin="normal"
              />

              <TextField
                id="standard-primary-location"
                variant="outlined"
                label="Primary Location"
                className={classes.textField}
                value={this.state.memberLocation}
                onChange={this.handleChange("memberLocation")}
                margin="normal"
              />

              <MuiThemeProvider theme={theme2}>
                <TextField
                  id="standard-full-width"
                  //label="Additional memberNotes"
                  value={this.state.memberNotes}
                  style={{ margin: 8 }}
                  className={classes.textFieldNotes}
                  onChange={this.handleChange("memberNotes")}
                  placeholder="Add any additional notes here"
                  fullWidth
                  multiline
                  margin="normal"
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </MuiThemeProvider>
            </Grid>

            <Grid container direction="row" justify="flex-end">
              <Button
                className={classes.saveButton}
                size="large"
                variant="contained"
                onClick={() => {
                  this.onSubmit(
                    this.state.checkedActive,
                    this.state.memberFirstName,
                    this.state.memberLastName,
                    this.state.memberRole,
                    this.state.memberEmail,
                    this.state.memberTitle,
                    this.state.memberCurrentPass,
                    this.state.memberConfirmPass,
                    this.state.memberPhone,
                    this.state.memberAddress,
                    this.state.memberLocation,
                    this.state.memberNpi,
                    this.state.memberCity,
                    this.state.memberZipCode,
                    this.state.memberNotes,
                    this.state.memberBday
                  );
                  //this.reloadPage();
                }}
              >
                Save
              </Button>
            </Grid>
            {/* Assign client button */}
            {/*
            <Grid container direction="row" justify="center">
              <Button
                className={classes.saveButton}
                size="large"
                variant="contained"
              >
                <AddIcon className={classes.icon} />
                Assign Client
              </Button>
            </Grid>
            */}
          </Paper>
        </form>
      </Container>
    );
  }
}

NewTeamMemberHideInactive.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NewTeamMemberHideInactive);
