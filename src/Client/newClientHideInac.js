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
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Cyan from "@material-ui/core/colors/cyan";
import Switch from "@material-ui/core/Switch";
import classNames from "classnames";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import green from "@material-ui/core/colors/green";
import IconButton from "@material-ui/core/IconButton";
//import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
//import MaskedInput from "react-text-mask";
//import NumberFormat from "react-number-format";
import { Redirect } from "react-router-dom";

import axios from "axios";
import API from "../utils/API";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    ///marginTop: theme.spacing(1),
    width: 300
  },

  textFieldTest: {
    marginRight: theme.spacing(79),

    width: 300
  },

  checkboxAlign: {
    marginRight: theme.spacing(86)
  },

  textFieldSession: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing(10),
    width: 300
  },

  menu: {
    width: 200
  },
  root: {
    width: "100%",
    //marginLeft: theme.spacing.unit * 22,
    // paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing(2)
    //backgroundColor: red[200]
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

  rootTitle2: {
    width: "100%",
    marginTop: theme.spacing(2),
    backgroundColor: "#1de9b6"

    //paddingTop: theme.spacing.unit,
    //paddingBottom: theme.spacing.unit * 2
  },

  marg: {
    marginRight: theme.spacing(44)
    // marginBottom: theme.spacing(5)
  },
  textFieldAlign: {
    marginRight: theme.spacing(49),
    width: 300
    // marginBottom: theme.spacing(5)
  },

  textFieldAlign2: {
    marginRight: theme.spacing(79),
    width: 300
    // marginBottom: theme.spacing(5)
  },

  textFieldAlign3: {
    marginRight: theme.spacing(79),
    paddingBottom: theme.spacing(2),
    width: 300
    // marginBottom: theme.spacing(5)
  },

  textFieldAlign4: {
    marginRight: theme.spacing(49),
    marginBottom: theme.spacing(4),
    width: 300
    // marginBottom: theme.spacing(5)
  },

  alignCheck: {
    // marginRight: theme.spacing(40)
    // marginBottom: theme.spacing(5)
  },

  checkedRoot: {
    // color: "#00838f",
    "&$checked": {
      color: "#80cbc4"
    }
  },
  checked: {},

  container2: {
    display: "flex",
    flexWrap: "wrap"
  },
  textFieldNotes: {
    //marginLeft: theme.spacing.unit,
    //marginRight: theme.spacing.unit,
    //marginBottom: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    width: 938
  },

  textField3: {
    marginLeft: theme.spacing(24),
    //marginBottom: theme.spacing(5),
    // marginRight: theme.spacing(20),
    width: 300
  },

  title: {
    align: "center"
    //marginTop: theme.spacing(1)
    //marginBottom: theme.spacing(3)
  },
  title2: {
    align: "center",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2)
  },

  checkBoxPadding: {
    paddingBottom: theme.spacing(2)
  },

  menu2: {
    width: 200
  },
  root2: {
    width: 1020,
    paddingBottom: theme.spacing(2)
  },

  root3: {
    width: "5%"
  },

  divider: {
    backgroundColor: "#1de9b6",
    marginBottom: theme.spacing(2)
  },

  saveButton: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
    /* this is text color */ color: theme.palette.getContrastText("#b2dfdb"),
    backgroundColor: "#b2dfdb",
    "&:hover": {
      backgroundColor: "#80cbc4"
    },

    success: {
      backgroundColor: green[600]
    },

    iconSnack: {
      fontSize: 5
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(10)
    },
    message: {
      display: "flex",
      alignItems: "center"
    }
  }
});

const variantIcon = {
  success: CheckCircleIcon
};

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
    value: "",
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

const clientTypes = [
  {
    value: "Individual",
    label: "Individual"
  },

  {
    value: "Facility",
    label: "Facility"
  }
];

const sessionTypes = [
  {
    value: "Lessons",
    label: "Lessons"
  },

  {
    value: "Therapy",
    label: "Therapy"
  }
];

const paymentTypes = [
  {
    value: "Card",
    label: "Card"
  },

  {
    value: "Cash",
    label: "Cash"
  },

  {
    value: "Check",
    label: "Check"
  }
];

const cardTypes = [
  {
    value: "American Express",
    label: "American Express"
  },

  {
    value: "Discover",
    label: "Discover"
  },

  {
    value: "MasterCard",
    label: "MasterCard"
  },
  {
    value: "Visa",
    label: "Visa"
  }
];

const navStyle = {
  color: "black",
  textDecoration: "none"
};

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon
            className={classNames(classes.iconSnack, classes.iconVariant)}
          />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="primary"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.iconSnack} />
        </IconButton>
      ]}
      {...other}
    />
  );
}

const MySnackbarContentWrapper = withStyles(styles)(MySnackbarContent);

class NewClientHideInactive extends React.Component {
  state = {
    open: false,
    //client info state
    checkedActive: true,
    clientType: "",
    clientFirstName: "",
    clientLastName: "",
    clientEmail: "",
    clientTitle: "",
    clientCurrentPassword: "",
    clientConfirmPassword: "",
    sessionType: "",
    sessionCost: "",
    sessionLegnth: "",
    clientPhone: "",
    clientAddress: "",
    clientBday: "",
    clientState: "",
    clientCity: "",
    clientZipCode: "",
    clientFacility: "",
    clientNotes: "",
    multiline: "Controlled",
    //contact info state
    checkedSameCont: false,
    contactFirstName: "",
    contactLastName: "",
    contactEmail: "",
    contactCheckedRecEmails: "",
    contactTitle: "",
    contactPhone: "",
    contact2ndPhone: "", // still need to add this to the database
    contactAddress: "",
    contactCity: "",
    contactState: "",
    contactZip: "",
    // contact 2 info state
    contactFirstName2: null,
    contactLastName2: null,
    contactEmail2: null,
    contactCheckedRecEmails2: null,
    contactTitle2: null,
    contactPhone2: null,
    contact2ndPhone2: null, // still need to add this to the database
    contactAddress2: null,
    contactCity2: null,
    contactState2: null,
    contactZip2: null,
    // contact 3 info state
    contactFirstName3: null,
    contactLastName3: null,
    contactEmail3: null,
    contactCheckedRecEmails3: null,
    contactTitle3: null,
    contactPhone3: null,
    contact2ndPhone3: null, // still need to add this to the database
    contactAddress3: null,
    contactCity3: null,
    contactState3: null,
    contactZip3: null,
    //payor info state
    billingFirstName: "",
    billingLastName: "",
    nameOnCard: null,
    cardNum: null,
    payorEmail: "",
    payorTitle: "",
    paymentType: "Card",
    billingPhone: "",
    billingAddress: "",
    billingCity: "",
    billingZip: "",
    billingState: "",
    cvv: null,
    expDate: null,
    cardType: null,
    sameAsContact: false,
    //toDashboard: false,
    navigate: false,
    //intervalIsSet: null
    therapistData: [],
    therapist: "",
    // condition
    checkedContact2: false,
    checkedContact3: false,
    // redirect
    redirect: false
  };

  onSubmit() {
    //experiment keeping preventDefault
    //e.preventDefault();

    const clientObj = {
      // client info
      checkedActive: this.state.checkedActive,
      clientType: this.state.clientType,
      clientFirstName: this.state.clientFirstName,
      clientLastName: this.state.clientLastName,
      clientEmail: this.state.clientEmail,
      clientTitle: this.state.clientTitle,
      clientCurrentPassword: this.state.clientCurrentPassword,
      clientConfirmPassword: this.state.clientConfirmPassword,
      clientPhone: this.state.clientPhone,
      clientAddress: this.state.clientAddress,
      sessionType: this.state.sessionType,
      sessionCost: this.state.sessionCost,
      sessionLength: this.state.sessionLegnth,
      clientBday: this.state.clientBday,
      clientState: this.state.clientState,
      clientCity: this.state.clientCity,
      clientZipCode: this.state.clientZipCode,
      clientNotes: this.state.clientNotes,
      // contact info
      contactFirstName: this.state.contactFirstName,
      contactLastName: this.state.contactLastName,
      contactEmail: this.state.contactEmail,
      contactTitle: this.state.contactTitle,
      contactPhone: this.state.contactPhone,
      contactAddress: this.state.contactAddress,
      contactCity: this.state.contactCity,
      contactState: this.state.contactState,
      contactZip: this.state.contactZip,
      // contact 2 info
      contactFirstName2: this.state.contactFirstName2,
      contactLastName2: this.state.contactLastName2,
      contactEmail2: this.state.contactEmail2,
      contactTitle2: this.state.contactTitle2,
      contactPhone2: this.state.contactPhone2,
      contactAddress2: this.state.contactAddress2,
      contactCity2: this.state.contactCity2,
      contactState2: this.state.contactState2,
      contactZip2: this.state.contactZip2,
      // contact 3 info
      contactFirstName3: this.state.contactFirstName3,
      contactLastName3: this.state.contactLastName3,
      contactEmail3: this.state.contactEmail3,
      contactTitle3: this.state.contactTitle3,
      contactPhone3: this.state.contactPhone3,
      contactAddress3: this.state.contactAddress3,
      contactCity3: this.state.contactCity3,
      contactState3: this.state.contactState3,
      contactZip3: this.state.contactZip3,
      // payor info
      billingFirstName: this.state.billingFirstName,
      billingLastName: this.state.billingLastName,
      nameOnCard: this.state.nameOnCard,
      cardNum: this.state.cardNum,
      payorEmail: this.state.payorEmail,
      payorTitle: this.state.payorTitle,
      paymentType: this.state.paymentType,
      billingPhone: this.state.billingPhone,
      billingAddress: this.state.billingAddress,
      billingCity: this.state.billingCity,
      billingZip: this.state.billingZip,
      billingState: this.state.billingState,
      cvv: this.state.cvv,
      expDate: this.state.expDate,
      cardType: this.state.cardType
    };
    axios
      .post("http://localhost:5000/clients/registerclient", clientObj)
      .then(response => {
        this.setState({
          clientObj,
          redirect: true
        });
      });
  }

  async componentDidMount() {
    await this.updateContent();
  }

  componentWillUnmount() {}

  async updateContent() {
    try {
      const therapistsResp = await API.get("/members/getTherapists");
      const clientsResp = await API.get("/clients/all");
      const therapistData = therapistsResp.data.data || [];
      const clientData = clientsResp.data.data || [];

      this.setState(
        {
          therapistData,
          clientData
        },
        () => {
          // this.changeContentWithClientId()
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  // sets the contact boxes same as client
  handleChangeCheckSameCont = name => event => {
    this.setState({
      [name]: event.target.checked,
      contactFirstName: this.state.clientFirstName,
      contactLastName: this.state.clientLastName,
      contactEmail: this.state.clientEmail,
      contactTitle: this.state.clientTitle,
      contactPhone: this.state.clientPhone,
      contactAddress: this.state.clientAddress,
      contactCity: this.state.clientCity,
      contactState: this.state.clientState,
      contactZip: this.state.clientZipCode
    });
  };

  // clears the boxes
  // need to form validate later to make sure the fields do not equal "" or null when the information is saved
  handleChangeCheckSameContClear = name => event => {
    this.setState({
      [name]: event.target.checked,
      contactFirstName: "",
      contactLastName: "",
      contactEmail: "",
      contactTitle: "",
      contactPhone: "",
      contactAddress: "",
      contactCity: "",
      contactState: "",
      contactZip: ""
    });
  };

  handleChangeCheck2 = name => event => {
    this.setState({
      [name]: event.target.checked,
      //this will set the values to blank once the window is closed
      contactFirstName2: null,
      contactLastName2: null,
      contactEmail2: null,
      contactCheckedRecEmails2: null,
      contactTitle2: null,
      contactPhone2: null,
      contact2ndPhone2: null,
      contactAddress2: null,
      contactCity2: null,
      contactState2: null,
      contactZip2: null,

      // contact 3,
      checkedContact3: false,
      contactFirstName3: null,
      contactLastName3: null,
      contactEmail3: null,
      contactCheckedRecEmails3: null,
      contactTitle3: null,
      contactPhone3: null,
      contact2ndPhone3: null,
      contactAddress3: null,
      contactCity3: null,
      contactState3: null,
      contactZip3: null
    });
  };

  handleChangeCheck3 = name => event => {
    this.setState({
      [name]: event.target.checked,
      //this will set the values to blank once the window is closed
      contactFirstName3: null,
      contactLastName3: null,
      contactEmail3: null,
      contactCheckedRecEmails3: null,
      contactTitle3: null,
      contactPhone3: null,
      contact2ndPhone3: null,
      contactAddress3: null,
      contactCity3: null,
      contactState3: null,
      contactZip3: null
    });
  };

  handleChangeCard = name => event => {
    this.setState({
      [name]: event.target.value,
      nameOnCard: null,
      cardNum: null,
      cvv: null,
      expDate: null,
      cardType: null
    });
  };

  handleChangeChecked = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  toggleShow = () => {
    this.setState(state => ({ isShow: !state.isShow }));
  };

  handleClickSnackBar = () => {
    this.setState({ open: true });
  };

  handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { therapistData } = this.state;
    /*
    if (this.state.toDashboard === true) {
        return <Redirect to='/dashboard' />
      }
  */
    /*

    const { navigate } = this.state;

    // here is the important part
    if (navigate) {
      return <Redirect to="/clients" push={true} />;
    }
    */

    /*

    function TextMaskCustom(props) {
      const { inputRef, ...other } = props;

      return (
        <MaskedInput
          {...other}
          ref={ref => {
            inputRef(ref ? ref.inputElement : null);
          }}
          mask={[
            /[1-9]/,
            /\d/,
            /\d/,
            " ",
            /\d/,
            /\d/,
            /\d/,
            " ",
            /\d/,
            /\d/,
            /\d/,
            /\d/
          ]}
          placeholderChar={"\u2000"}
          showMask
        />
      );
    }

    TextMaskCustom.propTypes = {
      inputRef: PropTypes.func.isRequired
    };

    function NumberFormatCustom(props) {
      const { inputRef, onChange, ...other } = props;

      return (
        <NumberFormat
          {...other}
          getInputRef={inputRef}
          onValueChange={values => {
            onChange({
              target: {
                value: values.value
              }
            });
          }}
          thousandSeparator
          prefix="$"
        />
      );
    }

    NumberFormatCustom.propTypes = {
      inputRef: PropTypes.func.isRequired,
      onChange: PropTypes.func.isRequired
    };

    */

    if (this.state.redirect) {
      return <Redirect push to="/clients/hideinactive" />;
    }

    return (
      <Container maxWidth="lg">
        <form className={classes.container} noValidate autoComplete="off">
          <Paper className={classes.root} elevation={1}>
            <Paper className={classes.rootTitle} elevation={0}>
              <Typography className={classes.title} align="center" variant="h5">
                Client Information
              </Typography>
            </Paper>

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
                  id="standard-select-clientType"
                  select
                  required
                  label="Client Type"
                  variant="outlined"
                  className={classes.textField3}
                  value={this.state.clientType}
                  onChange={this.handleChange("clientType")}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                >
                  {clientTypes.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <TextField
                id="standard-select-title"
                select
                label="Title"
                variant="outlined"
                className={classes.textField}
                value={this.state.clientTitle}
                margin="normal"
                onChange={this.handleChange("clientTitle")}
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

              {this.state.clientType === "Facility" ? (
                <TextField
                  id="standard-firstName"
                  label="First Name"
                  variant="outlined"
                  className={classes.textField}
                  value={this.state.clientFirstName}
                  onChange={this.handleChange("clientFirstName")}
                  margin="normal"
                />
              ) : (
                <TextField
                  required
                  id="standard-firstName"
                  label="First Name"
                  variant="outlined"
                  className={classes.textField}
                  value={this.state.clientFirstName}
                  onChange={this.handleChange("clientFirstName")}
                  margin="normal"
                />
              )}

              {this.state.clientType === "Facility" ? (
                <TextField
                  id="standard-lastNamename"
                  label="Last Name"
                  variant="outlined"
                  className={classes.textField}
                  value={this.state.clientLastName}
                  onChange={this.handleChange("clientLastName")}
                  margin="normal"
                />
              ) : (
                <TextField
                  required
                  id="standard-lastNamename"
                  label="Last Name"
                  variant="outlined"
                  className={classes.textField}
                  value={this.state.clientLastName}
                  onChange={this.handleChange("clientLastName")}
                  margin="normal"
                />
              )}

              {/* insert facility name here */}

              {this.state.clientType === "Facility" ? (
                <TextField
                  required
                  id="standard-facility-name"
                  label="Facility Name"
                  variant="outlined"
                  className={classes.textField}
                  value={this.state.clientFacility}
                  onChange={this.handleChange("clientFacility")}
                  margin="normal"
                />
              ) : null}

              <TextField
                required
                id="standard-email"
                variant="outlined"
                label="Email"
                className={classes.textField}
                value={this.state.clientEmail}
                onChange={this.handleChange("clientEmail")}
                margin="normal"
              />
              <MuiThemeProvider theme={theme}>
                <TextField
                  required
                  id="standard-password-input"
                  variant="outlined"
                  label="Password"
                  className={classes.textField}
                  type="password"
                  value={this.state.clientCurrentPassword}
                  onChange={this.handleChange("clientCurrentPassword")}
                  //autoComplete="current-password"
                  margin="normal"
                />
              </MuiThemeProvider>
              <TextField
                required
                id="standard-confirmPassword-input"
                variant="outlined"
                label="Confirm Password"
                className={classes.textField}
                type="password"
                value={this.state.confirmPassword}
                onChange={this.handleChange("confirmPassword")}
                //autoComplete="current-password"
                margin="normal"
              />

              <TextField
                id="standard-address"
                variant="outlined"
                label="Address"
                className={classes.textField}
                value={this.state.clientAddress}
                onChange={this.handleChange("clientAddress")}
                margin="normal"
              />
              <TextField
                id="standard-city-"
                variant="outlined"
                label="City"
                className={classes.textField}
                value={this.state.clientCity}
                onChange={this.handleChange("clientCity")}
                margin="normal"
              />
              <TextField
                id="standard-state"
                variant="outlined"
                label="State"
                className={classes.textField}
                value={this.state.clientState}
                onChange={this.handleChange("clientState")}
                margin="normal"
              />
              <TextField
                id="standard-zipCode"
                variant="outlined"
                label="Zip Code"
                className={classes.textField}
                value={this.state.clientZipCode}
                onChange={this.handleChange("clientZipCode")}
                margin="normal"
              />
              <TextField
                id="standard-phone"
                variant="outlined"
                label="Phone Number"
                className={classes.textField}
                value={this.state.clientPhone}
                onChange={this.handleChange("clientPhone")}
                margin="normal"
              />

              {this.state.clientType === "Facility" ? (
                <TextField
                  id="standard-bday"
                  variant="outlined"
                  label="Birthday"
                  className={classes.textFieldTest}
                  value={this.state.clientBday}
                  onChange={this.handleChange("clientBday")}
                  margin="normal"
                />
              ) : (
                <TextField
                  id="standard-bday"
                  variant="outlined"
                  label="Birthday"
                  className={classes.textField}
                  value={this.state.clientBday}
                  onChange={this.handleChange("clientBday")}
                  margin="normal"
                />
              )}

              <Grid container row justify="center" alignItems="center">
                <TextField
                  id="standard-select-sessionType"
                  select
                  label="Session Type"
                  variant="outlined"
                  margin="normal"
                  className={classes.textFieldSession}
                  value={this.state.sessionType}
                  onChange={this.handleChange("sessionType")}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                >
                  {sessionTypes.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="standard-cost"
                  label="Session Cost (dollars)"
                  variant="outlined"
                  className={classes.textFieldSession}
                  value={this.state.sessionCost}
                  onChange={this.handleChange("sessionCost")}
                  margin="normal"
                  /*
                  InputProps={{
                    inputComponent: NumberFormatCustom
                  }}*/
                />
                <TextField
                  id="standard-length"
                  label="Session Length (minutes)"
                  variant="outlined"
                  className={classes.textFieldSession}
                  value={this.state.sessionLength}
                  onChange={this.handleChange("sessionLength")}
                  margin="normal"
                />
                <Grid container justify="center" alignItems="center">
                  <TextField
                    id="standard-select-therapist"
                    select
                    label="Therapist"
                    variant="outlined"
                    margin="normal"
                    className={classes.textFieldTest}
                    value={this.state.therapist}
                    onChange={this.handleChange("therapist")}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu
                      }
                    }}
                  >
                    {therapistData.map(option => (
                      <MenuItem
                        key={option.value}
                        value={option.member_full_name}
                      >
                        {option.member_full_name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>

              <Grid container justify="center" alignItems="center">
                <MuiThemeProvider theme={theme2}>
                  <TextField
                    id="standard-full-width"
                    //label="Additional Notes"
                    style={{ margin: 8 }}
                    className={classes.textFieldNotes}
                    value={this.state.clientNotes}
                    onChange={this.handleChange("clientNotes")}
                    placeholder="Add any additional notes here"
                    //fullWidth
                    multiline
                    margin="normal"
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </MuiThemeProvider>
              </Grid>

              <Paper className={classes.rootTitle} elevation={0}>
                <Typography
                  className={classes.title}
                  align="center"
                  variant="h5"
                >
                  Contact Information
                </Typography>
              </Paper>

              <Grid
                className={classes.checkboxAlign}
                container
                justify="center"
                alignItems="center"
              >
                <FormGroup row>
                  {this.state.checkedSameCont ? (
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="primary"
                          checked={this.state.checkedSameCont}
                          //clears the contact boxes
                          onChange={this.handleChangeCheckSameContClear(
                            "checkedSameCont"
                          )}
                          classes={{
                            root: classes.checkedRoot,
                            checked: classes.checked
                          }}
                          value="checkedSameCont"
                        />
                      }
                      label="Same as client information"
                    />
                  ) : (
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="primary"
                          checked={this.state.checkedSameCont}
                          //sets the boxes to the same as contact info
                          onChange={this.handleChangeCheckSameCont(
                            "checkedSameCont"
                          )}
                          classes={{
                            root: classes.checkedRoot,
                            checked: classes.checked
                          }}
                          value="checkedSameCont"
                        />
                      }
                      label="Same as client information"
                    />
                  )}
                  {/*
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        checked={this.state.checkedSameCont}
                        onChange={this.handleChangeCheckSameCont(
                          "checkedSameCont"
                        )}
                        classes={{
                          root: classes.checkedRoot,
                          checked: classes.checked
                        }}
                        value="checkedSameCont"
                      />
                    }
                    label="Same as client information"
                  />
                  */}
                </FormGroup>
              </Grid>

              {/* Contact Info*/}
              <TextField
                id="standard-select-contactTitle"
                select
                label="Title"
                variant="outlined"
                margin="normal"
                className={classes.textField}
                value={this.state.contactTitle}
                onChange={this.handleChange("contactTitle")}
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
              <TextField
                required
                id="standard-contactFirstName"
                label="First Name"
                variant="outlined"
                className={classes.textField}
                value={this.state.contactFirstName}
                onChange={this.handleChange("contactFirstName")}
                margin="normal"
              />
              <TextField
                required
                id="standard-lastNamename"
                label="Last Name"
                variant="outlined"
                className={classes.textField}
                value={this.state.contactLastName}
                onChange={this.handleChange("contactLastName")}
                margin="normal"
              />
              <TextField
                id="standard-contactAddress"
                variant="outlined"
                label="Street Address"
                className={classes.textField}
                value={this.state.contactAddress}
                onChange={this.handleChange("contactAddress")}
                margin="normal"
              />
              <TextField
                id="standard-contactCity-"
                variant="outlined"
                label="City"
                className={classes.textField}
                value={this.state.contactCity}
                onChange={this.handleChange("contactCity")}
                margin="normal"
              />
              <TextField
                id="standard-state"
                variant="outlined"
                label="State"
                className={classes.textField}
                value={this.state.contactState}
                onChange={this.handleChange("contactState")}
                margin="normal"
              />
              <TextField
                id="standard-contactZip"
                variant="outlined"
                label="Zip Code"
                className={classes.textField}
                value={this.state.contactZip}
                onChange={this.handleChange("contactZip")}
                margin="normal"
              />

              <TextField
                id="standard-contactPhone"
                variant="outlined"
                label="Phone Number"
                className={classes.textField}
                value={this.state.contactPhone}
                onChange={this.handleChange("contactPhone")}
                margin="normal"
              />
              <TextField
                id="standard-contactPhone"
                variant="outlined"
                label="Secondary Phone Number"
                className={classes.textField}
                value={this.state.contact2ndPhone}
                onChange={this.handleChange("contact2ndPhone")}
                margin="normal"
              />

              <TextField
                required
                id="standard-contactEmail"
                variant="outlined"
                label="Email"
                className={classes.textFieldAlign}
                value={this.state.contactEmail}
                onChange={this.handleChange("contactEmail")}
                margin="normal"
              />
              <FormGroup className={classes.alignCheck} row>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={this.state.contactCheckedRecEmails}
                      onChange={this.handleChangeChecked(
                        "contactCheckedRecEmails"
                      )}
                      classes={{
                        root: classes.checkedRoot,
                        checked: classes.checked
                      }}
                      value="contactCheckedRecEmails"
                    />
                  }
                  label="Receive email notifcations"
                />
              </FormGroup>

              <Container>
                <FormGroup className={classes.checkBoxPadding} row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        checked={this.state.checkedContact2}
                        onChange={this.handleChangeCheck2("checkedContact2")}
                        classes={{
                          root: classes.checkedRoot,
                          checked: classes.checked
                        }}
                        value="checkedContact2"
                      />
                    }
                    label="Add second contact"
                  />
                </FormGroup>
              </Container>

              {this.state.checkedContact2 ? (
                <Paper className={classes.rootTitle} elevation={0}>
                  <Typography
                    className={classes.title}
                    align="center"
                    variant="h5"
                  >
                    Contact 2 Information
                  </Typography>
                </Paper>
              ) : null}

              {this.state.checkedContact2 ? (
                <TextField
                  id="standard-select-contactTitle2"
                  select
                  label="Title"
                  margin="normal"
                  variant="outlined"
                  className={classes.textField}
                  value={this.state.contactTitle2}
                  onChange={this.handleChange("contactTitle2")}
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
              ) : null}

              {this.state.checkedContact2 ? (
                <TextField
                  required
                  id="standard-contactFirstName2"
                  label="First Name"
                  variant="outlined"
                  className={classes.textField}
                  value={this.state.contactFirstName2}
                  onChange={this.handleChange("contactFirstName2")}
                  margin="normal"
                />
              ) : null}
              {this.state.checkedContact2 ? (
                <TextField
                  required
                  id="standard-lastNamename2"
                  label="Last Name"
                  variant="outlined"
                  className={classes.textField}
                  value={this.state.contactLastName2}
                  onChange={this.handleChange("contactLastName2")}
                  margin="normal"
                />
              ) : null}

              {this.state.checkedContact2 ? (
                <TextField
                  id="standard-contactAddress2"
                  variant="outlined"
                  label="Street Address"
                  className={classes.textField}
                  value={this.state.contactAddress2}
                  onChange={this.handleChange("contactAddress2")}
                  margin="normal"
                />
              ) : null}
              {this.state.checkedContact2 ? (
                <TextField
                  id="standard-contactCity-2"
                  variant="outlined"
                  label="City"
                  className={classes.textField}
                  value={this.state.contactCity2}
                  onChange={this.handleChange("contactCity2")}
                  margin="normal"
                />
              ) : null}

              {this.state.checkedContact2 ? (
                <TextField
                  id="standard-state2"
                  variant="outlined"
                  label="State"
                  className={classes.textField}
                  value={this.state.contactState2}
                  onChange={this.handleChange("contactState2")}
                  margin="normal"
                />
              ) : null}
              {this.state.checkedContact2 ? (
                <TextField
                  id="standard-contactZip2"
                  variant="outlined"
                  label="Zip Code"
                  className={classes.textField}
                  value={this.state.contactZip2}
                  onChange={this.handleChange("contactZip2")}
                  margin="normal"
                />
              ) : null}

              {this.state.checkedContact2 ? (
                <TextField
                  id="standard-contactPhone2"
                  variant="outlined"
                  label="Phone Number"
                  className={classes.textField}
                  value={this.state.contactPhone2}
                  onChange={this.handleChange("contactPhone2")}
                  margin="normal"
                />
              ) : null}

              {this.state.checkedContact2 ? (
                <TextField
                  id="standard-contactPhone2"
                  variant="outlined"
                  label="Secondary Phone Number"
                  className={classes.textField}
                  value={this.state.contact2ndPhone2}
                  onChange={this.handleChange("contact2ndPhone2")}
                  margin="normal"
                />
              ) : null}

              {this.state.checkedContact2 ? (
                <TextField
                  required
                  id="standard-contactEmail2"
                  variant="outlined"
                  label="Email"
                  className={classes.textFieldAlign}
                  value={this.state.contactEmail2}
                  onChange={this.handleChange("contactEmail2")}
                  margin="normal"
                />
              ) : null}

              {this.state.checkedContact2 ? (
                <FormGroup className={classes.alignCheck} row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        checked={this.state.contactCheckedRecEmails2}
                        onChange={this.handleChangeChecked(
                          "contactCheckedRecEmails2"
                        )}
                        classes={{
                          root: classes.checkedRoot,
                          checked: classes.checked
                        }}
                        value="contactCheckedRecEmails2"
                      />
                    }
                    label="Receive email notifcations"
                  />
                </FormGroup>
              ) : null}
              {/*
              {this.state.checkedContact2 ? (
                <FormGroup className={classes.alignCheck} row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        checked={this.state.contactCheckedRecEmails}
                        onChange={this.handleChangeChecked(
                          "contactCheckedRecEmails"
                        )}
                        classes={{
                          root: classes.checkedRoot,
                          checked: classes.checked
                        }}
                        value="contactCheckedRecEmails"
                      />
                    }
                    label="Receive email notifcations"
                  />
                </FormGroup>
              ) : null}
                  */}

              {this.state.checkedContact2 ? (
                <Container>
                  <FormGroup className={classes.checkBoxPadding} row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="primary"
                          checked={this.state.checkedContact3}
                          onChange={this.handleChangeCheck3("checkedContact3")}
                          classes={{
                            root: classes.checkedRoot,
                            checked: classes.checked
                          }}
                          value="checkedContact3"
                        />
                      }
                      label="Add third contact"
                    />
                  </FormGroup>
                </Container>
              ) : null}
              {/* Contact 3 */}

              {this.state.checkedContact3 ? (
                <Paper className={classes.rootTitle} elevation={0}>
                  <Typography
                    className={classes.title}
                    align="center"
                    variant="h5"
                  >
                    Contact 3 Information
                  </Typography>
                </Paper>
              ) : null}

              {this.state.checkedContact3 ? (
                <TextField
                  id="standard-select-contactTitle3"
                  select
                  label="Title"
                  margin="normal"
                  variant="outlined"
                  className={classes.textField}
                  value={this.state.contactTitle3}
                  onChange={this.handleChange("contactTitle3")}
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
              ) : null}

              {this.state.checkedContact3 ? (
                <TextField
                  required
                  id="standard-contactFirstName3"
                  label="First Name"
                  variant="outlined"
                  className={classes.textField}
                  value={this.state.contactFirstName3}
                  onChange={this.handleChange("contactFirstName3")}
                  margin="normal"
                />
              ) : null}
              {this.state.checkedContact3 ? (
                <TextField
                  required
                  id="standard-lastNamename3"
                  label="Last Name"
                  variant="outlined"
                  className={classes.textField}
                  value={this.state.contactLastName3}
                  onChange={this.handleChange("contactLastName3")}
                  margin="normal"
                />
              ) : null}

              {this.state.checkedContact3 ? (
                <TextField
                  id="standard-contactAddress3"
                  variant="outlined"
                  label="Street Address"
                  className={classes.textField}
                  value={this.state.contactAddress3}
                  onChange={this.handleChange("contactAddress3")}
                  margin="normal"
                />
              ) : null}
              {this.state.checkedContact3 ? (
                <TextField
                  id="standard-contactCity-3"
                  variant="outlined"
                  label="City"
                  className={classes.textField}
                  value={this.state.contactCity3}
                  onChange={this.handleChange("contactCity3")}
                  margin="normal"
                />
              ) : null}

              {this.state.checkedContact3 ? (
                <TextField
                  id="standard-state3"
                  variant="outlined"
                  label="State"
                  className={classes.textField}
                  value={this.state.contactState3}
                  onChange={this.handleChange("contactState3")}
                  margin="normal"
                />
              ) : null}
              {this.state.checkedContact3 ? (
                <TextField
                  id="standard-contactZip3"
                  variant="outlined"
                  label="Zip Code"
                  className={classes.textField}
                  value={this.state.contactZip3}
                  onChange={this.handleChange("contactZip3")}
                  margin="normal"
                />
              ) : null}

              {this.state.checkedContact3 ? (
                <TextField
                  id="standard-contactPhone3"
                  variant="outlined"
                  label="Phone Number"
                  className={classes.textField}
                  value={this.state.contactPhone3}
                  onChange={this.handleChange("contactPhone3")}
                  margin="normal"
                />
              ) : null}

              {this.state.checkedContact3 ? (
                <TextField
                  id="standard-contactPhone3"
                  variant="outlined"
                  label="Secondary Phone Number"
                  className={classes.textField}
                  value={this.state.contact2ndPhone3}
                  onChange={this.handleChange("contact2ndPhone3")}
                  margin="normal"
                />
              ) : null}

              {this.state.checkedContact3 ? (
                <TextField
                  required
                  id="standard-contactEmail3"
                  variant="outlined"
                  label="Email"
                  className={classes.textFieldAlign4}
                  value={this.state.contactEmail3}
                  onChange={this.handleChange("contactEmail3")}
                  margin="normal"
                />
              ) : null}

              {this.state.checkedContact3 ? (
                <FormGroup className={classes.alignCheck} row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        checked={this.state.contactCheckedRecEmails3}
                        onChange={this.handleChangeChecked(
                          "contactCheckedRecEmails3"
                        )}
                        classes={{
                          root: classes.checkedRoot,
                          checked: classes.checked
                        }}
                        value="contactCheckedRecEmails3"
                      />
                    }
                    label="Receive email notifcations"
                  />
                </FormGroup>
              ) : null}

              {/*
            <Button
              size="medium"
              variant="contained"
              className={classes.button}
            >
              Add Additional
            </Button>
            */}

              {/* Payor Info  */}
              {/*
              <FormGroup className={classes.marg} row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.sameAsContact}
                      onChange={this.handleChange("sameAsContact")}
                      value="sameAsContact"
                      color="default"
                    />
                  }
                  label="Same as contact" 
                />
              </FormGroup>
                */}

              <Paper className={classes.rootTitle} elevation={0}>
                <Typography
                  className={classes.title}
                  align="center"
                  variant="h5"
                >
                  Payor Information
                </Typography>
              </Paper>
              <Grid container justify="center" alignItems="center">
                <TextField
                  id="billingFirstName"
                  label="First Name"
                  variant="outlined"
                  className={classes.textField}
                  value={this.state.billingFirstName}
                  onChange={this.handleChange("billingFirstName")}
                  margin="normal"
                />
                <TextField
                  id="billingLastName"
                  label="Last Name"
                  variant="outlined"
                  className={classes.textField}
                  value={this.state.billingLastName}
                  onChange={this.handleChange("billingLastName")}
                  margin="normal"
                />
                <TextField
                  id="standard-select-paymentType"
                  select
                  label="Payment Type"
                  margin="normal"
                  variant="outlined"
                  className={classes.textField}
                  value={this.state.paymentType}
                  onChange={this.handleChange("paymentType")}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                >
                  {paymentTypes.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                {this.state.paymentType === "Card" ? (
                  <TextField
                    id="standard-select-cardType"
                    select
                    label="Card Type"
                    margin="normal"
                    variant="outlined"
                    className={classes.textField}
                    value={this.state.cardType}
                    onChange={this.handleChangeCard("cardType")}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu
                      }
                    }}
                  >
                    {cardTypes.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : null}

                {this.state.paymentType === "Card" ? (
                  <TextField
                    id="standard-nameOnCard"
                    label="Name on Card"
                    variant="outlined"
                    className={classes.textField}
                    value={this.state.nameOnCard}
                    onChange={this.handleChangeCard("nameOnCard")}
                    margin="normal"
                  />
                ) : null}
                {this.state.paymentType === "Card" ? (
                  <TextField
                    id="standard-cardNum"
                    label="Card Number"
                    variant="outlined"
                    className={classes.textField}
                    value={this.state.cardNum}
                    onChange={this.handleChangeCard("cardNum")}
                    margin="normal"
                  />
                ) : null}

                {this.state.paymentType === "Card" ? (
                  <TextField
                    id="standard-cvv"
                    label="CVV"
                    type="password"
                    variant="outlined"
                    className={classes.textField}
                    value={this.state.cvv}
                    onChange={this.handleChangeCard("cvv")}
                    margin="normal"
                  />
                ) : null}

                {this.state.paymentType === "Card" ? (
                  <TextField
                    id="standard-expDate"
                    variant="outlined"
                    label="Expiration Date"
                    className={classes.textField}
                    value={this.state.expDate}
                    onChange={this.handleChangeCard("expDate")}
                    margin="normal"
                  />
                ) : null}

                <TextField
                  id="standard-billingAddress"
                  variant="outlined"
                  label="Billing Street Address"
                  className={classes.textField}
                  value={this.state.billingAddress}
                  onChange={this.handleChange("billingAddress")}
                  margin="normal"
                />

                <TextField
                  id="standard-billingCity-"
                  variant="outlined"
                  label="City"
                  className={classes.textField}
                  value={this.state.billingCity}
                  onChange={this.handleChange("billingCity")}
                  margin="normal"
                />

                <TextField
                  id="standard-payorEmail"
                  variant="outlined"
                  label="Email"
                  className={classes.textField}
                  value={this.state.payorEmail}
                  onChange={this.handleChange("payorEmail")}
                  margin="normal"
                />

                <TextField
                  id="standard-state"
                  variant="outlined"
                  label="State"
                  className={classes.textField}
                  value={this.state.billingState}
                  onChange={this.handleChange("billingState")}
                  margin="normal"
                />

                <TextField
                  id="standard-phone"
                  variant="outlined"
                  label="Phone Number"
                  className={classes.textField}
                  value={this.state.billingPhone}
                  onChange={this.handleChange("billingPhone")}
                  margin="normal"
                />

                <TextField
                  id="standard-billingZip"
                  variant="outlined"
                  label="Zip Code"
                  className={classes.textField}
                  value={this.state.billingZip}
                  onChange={this.handleChange("billingZip")}
                  margin="normal"
                />

                {/*
                <Button
                  size="medium"
                  variant="contained"
                  className={classes.button}
                >
                  +
                </Button>
*/}
              </Grid>
            </Grid>

            <Grid container justify="flex-end">
              <Button
                className={classes.saveButton}
                size="large"
                variant="contained"
                onClick={() => {
                  this.onSubmit(
                    // client info
                    this.state.clientType,
                    this.state.checkedActive,
                    this.state.clientFirstName,
                    this.state.clientLastName,
                    this.state.clientEmail,
                    this.state.clientTitle,
                    this.state.clientCurrentPassword,
                    this.state.clientConfirmPassword,
                    this.state.sessionType,
                    this.state.sessionCost,
                    this.state.sessionLegnth,
                    this.state.clientPhone,
                    this.state.clientAddress,
                    this.state.clientBday,
                    this.state.clientCity,
                    this.state.clientState,
                    this.state.clientZipCode,
                    this.state.clientNotes,
                    // contact info
                    this.state.contactFirstName,
                    this.state.contactLastName,
                    this.state.contactEmail,
                    this.state.contactTitle,
                    this.state.contactPhone,
                    this.state.contactAddress,
                    this.state.contactCity,
                    this.state.contactState,
                    this.state.contactZip,
                    // contact 2 info
                    this.state.contactFirstName2,
                    this.state.contactLastName2,
                    this.state.contactEmail2,
                    this.state.contactTitle2,
                    this.state.contactPhone2,
                    this.state.contactAddress2,
                    this.state.contactCity2,
                    this.state.contactState2,
                    this.state.contactZip2,
                    // contact 3 info
                    this.state.contactFirstName3,
                    this.state.contactLastName3,
                    this.state.contactEmail3,
                    this.state.contactTitle3,
                    this.state.contactPhone3,
                    this.state.contactAddress3,
                    this.state.contactCity3,
                    this.state.contactState3,
                    this.state.contactZip3,
                    // payor info
                    this.state.billingFirstName,
                    this.state.billingLastName,
                    this.state.nameOnCard,
                    this.state.cardNum,
                    this.state.payorEmail,
                    this.state.payorTitle,
                    this.state.paymentType,
                    this.state.billingPhone,
                    this.state.billingAddress,
                    this.state.billingCity,
                    this.state.billingZip,
                    this.state.billingState,
                    this.state.cvv,
                    this.state.expDate,
                    this.state.cardType
                  );
                  // this.handleClickSnackBar();
                  //this.setLocation();
                  //this.setState({ navigate: true });
                  // this.reloadPage();
                }}
              >
                {/*  <Link style={navStyle} to="/clients"> */}
                Save
                {/*   </Link> */}
              </Button>
              {/*
              <Snackbar
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left"
                }}
                open={this.state.open}
                autoHideDuration={6000}
                onClose={this.handleCloseSnackBar}
              >
                <MySnackbarContentWrapper
                  onClose={this.handleCloseSnackBar}
                  variant="success"
                  message="Your new client has been saved!"
                />
              </Snackbar>
              */}
            </Grid>
          </Paper>
        </form>
      </Container>
    );
  }
}

NewClientHideInactive.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NewClientHideInactive);
