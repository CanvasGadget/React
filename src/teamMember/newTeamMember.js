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
import { Redirect } from "react-router-dom";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputMask from "react-input-mask";
import InputAdornment from "@material-ui/core/InputAdornment";

import API from "../utils/API";

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
class NewTeamMember extends React.Component {
  state = {
    checkedActive: true,
    memberFirstName: "",
    memberLastName: "",
    memberRole: "",
    memberEmail: "",
    memberTitle: "",
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
    validationBox: false,
    validationBox2: false
  };

  onSubmit() {
    //experiment keeping preventDefault
    //e.preventDefault();

    const memberObj = {
      memberFullName:
        this.state.memberFirstName + " " + this.state.memberLastName,
      memberFirstName: this.state.memberFirstName,
      memberLastName: this.state.memberLastName,
      memberEmail: this.state.memberEmail,
      memberRole: this.state.memberRole,
      memberTitle: this.state.memberTitle,
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

    if (memberObj.memberFirstName === "") {
      this.setState({ validationBox: true });
    } else if (memberObj.memberLastName === "") {
      this.setState({ validationBox: true });
    } else if (memberObj.memberEmail === "") {
      this.setState({ validationBox: true });
    }

    // submit data
    else {
      API.post("/members/addmember", memberObj)
        // .then(res => console.log(res.data));
        .then(async response => {
          console.log(response.data);
          this.setState({
            memberObj,
            //  open: false,
            redirect: true
          });
        });
    }

    /* end of submit */
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

  handleValidationOpen = () => {
    this.setState({ validationBox: true });
  };

  handleValidationClose = () => {
    this.setState({ validationBox: false });
  };

  handleValidationOpen2 = () => {
    this.setState({ validationBox2: true });
  };

  handleValidationClose2 = () => {
    this.setState({ validationBox2: false });
  };

  render() {
    const { classes } = this.props;
    if (this.state.redirect) {
      return <Redirect push to="/teammembers" />;
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
              open={this.state.validationBox}
              onClose={this.handleValidationClose}
            >
              <DialogTitle>Oops! You missed a field!</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please fill out any field with an asterisk.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleValidationClose}>Got it!</Button>
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
              <InputMask
                mask="99999"
                //maskPlaceholder=""
                maskChar={null}
                value={this.state.memberZipCode}
                onChange={this.handleChange("memberZipCode")}
                className={classes.textField}
              >
                {() => (
                  <TextField
                    id="memberZip"
                    label="Zip Code"
                    variant="outlined"
                    className={classes.textField}
                    margin="normal"
                    // type="text"
                  />
                )}
              </InputMask>
              <InputMask
                mask="999-999-9999"
                //maskPlaceholder=""
                maskChar={null}
                value={this.state.memberPhone}
                onChange={this.handleChange("memberPhone")}
                className={classes.textField}
              >
                {() => (
                  <TextField
                    id="standard-memberPhone"
                    label="Phone Number"
                    variant="outlined"
                    className={classes.textField}
                    margin="normal"
                    // type="text"
                  />
                )}
              </InputMask>
              <InputMask
                mask="99/99/9999"
                //maskPlaceholder=""
                maskChar={null}
                value={this.state.memberBday}
                onChange={this.handleChange("memberBday")}
                className={classes.textField}
              >
                {() => (
                  <TextField
                    id="bday"
                    label="Birthday"
                    variant="outlined"
                    placeholder="MM/DD/YYYY"
                    className={classes.textField}
                    margin="normal"
                    // type="text"
                  />
                )}
              </InputMask>
              <InputMask
                mask="9999999999"
                //maskPlaceholder=""
                maskChar={null}
                value={this.state.memberNpi}
                onChange={this.handleChange("memberNpi")}
                className={classes.textField}
              >
                {() => (
                  <TextField
                    id="memberNpi"
                    label="NPI Number"
                    variant="outlined"
                    className={classes.textField}
                    margin="normal"
                    // type="text"
                  />
                )}
              </InputMask>

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

NewTeamMember.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NewTeamMember);
