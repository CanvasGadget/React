import React from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import FormLabel from "@material-ui/core/FormLabel";
// import FormGroup from "@material-ui/core/FormGroup";
// import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
//import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
//import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
// import moment from "moment";
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import { Redirect } from "react-router-dom";
// import MySnackbarContentWrapper from "../common/MySnackbarContentWrapper";

//import API from "../utils/API";

const styles = theme => ({
  /* 
  clientAvatar: {
    margin: 10,
    color: theme.palette.getContrastText(Cyan[800]),
    backgroundColor: Cyan[800],
    width: 100,
    height: 100,
    fontSize: 40
    //marginBottom: theme.spacing(-18)
    //marginRight: theme.spacing(1) * 20
  }, */

  toggle: {
    paddingRight: theme.spacing(1) * 30
  },

  marg: {
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },

  menu: {
    width: 400
  },

  input: {
    display: "none"
  },

  textField: {
    // marginLeft: theme.spacing(1)
    marginRight: theme.spacing(1)
    //width: 400
  },

  textField2: {
    //marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    //marginTop: theme.spacing(2),
    width: 193
  },

  labelStyle: {
    marginTop: theme.spacing(5)
  },

  deleteButton: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    /* this is text color */ color: theme.palette.getContrastText("#b2dfdb"),
    backgroundColor: "#b2dfdb",
    "&:hover": {
      backgroundColor: "#80cbc4"
    }
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

/* const theme2 = createMuiTheme({
  palette: {
    primary: { main: "#80cbc4" }
  }
}); */

const noteTypes = [
  {
    value: "Regular",
    label: "Regular"
  },
  {
    value: "SOAP",
    label: "SOAP"
  }
];

const attendanceTypes = [
  {
    value: "Present ($)",
    label: "Present ($)"
  },
  {
    value: "Absent, no notice ($)",
    label: "Absent, no notice ($)"
  },
  {
    value: "Absent, notice",
    label: "Absent, notice"
  }
];

class NewMessage extends React.Component {
  state = {
    clientData: [],
    therapistData: [],
    sessionDate: "",
    from: "",
    subject: "",
    to: "",
    regMessage: "",
    calID: "",
    checkedPayor: true,
    checkedFamily: false,
    checkedTherapist: false,
    checkedPortal: false,
    validationBox: false,
    redirect: false
  };

  /* componentDidMount() {
    this.setState({
      client: this.props.location.state.client,
      sessionDate: this.props.location.state.sessionDate,
      calID: this.props.location.state.calID
    });
  }

  onSubmit() {
    //experiment keeping preventDefault
    //e.preventDefault();

    const noteObj = {
      regMessage: this.state.regMessage,
      attendanceType: this.state.attendanceType,
      calID: this.state.calID
    };
    console.log("submitted note", noteObj);

    if (noteObj.regMessage === "") {
      this.setState({ validationBox: true });
    } else {
      API.put("/events/addnote", noteObj)
        // .then(res => console.log(res.data));
        .then(async response => {
          console.log(response.data);
          this.setState({
            noteObj,
            redirect: true
            //  open: false,
          });
        });
    }
  } */

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleChangeCheck = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleValidationOpen = () => {
    this.setState({ validationBox: true });
  };

  handleValidationClose = () => {
    this.setState({ validationBox: false });
  };

  handleClickRedirect = () => {
    this.setState({ redirect: true });
  };

  render() {
    const { classes } = this.props;

    //test
    // const {clientData, therapistData } = this.state;

    return (
      <div>
        <Container maxWidth="lg">
          {/* Avatar */}
          {/*   <Grid container justify="center" alignItems="center">
            <IconButton color="primary" className={classes.clientAvatar}>
              {this.state.clientInitials}
            </IconButton>
          </Grid> */}

          <TextField
            id="to-textbox"
            fullWidth
            label="To"
            value={this.state.to}
            //className={classes.textField}
            onChange={this.handleChange("payor")}
            margin="normal"
            variant="outlined"
          />
          <MuiThemeProvider theme={theme}>
            <TextField
              id="from-textbox"
              fullWidth
              label="From"
              value={this.state.from}
              //  className={classes.textField}
              onChange={this.handleChange("therapist")}
              margin="normal"
              variant="outlined"
            />
          </MuiThemeProvider>
          <TextField
            id="subject-textbox"
            label="Subject"
            fullWidth
            value={this.state.subject}
            onChange={this.handleChange("subject")}
            //className={classes.textField}
            margin="normal"
            variant="outlined"
          />

          {/* Regular Note */}

          <TextField
            id="reg-note"
            label="Body"
            //style={{ margin: 8 }}
            value={this.state.regMessage}
            //className={classes.textField}
            placeholder="Add notes here"
            fullWidth
            onChange={this.handleChange("regMessage")}
            variant="outlined"
            multiline
            rows="12"
            margin="normal"
            /*  InputLabelProps={{
              shrink: true
            }} */
          />
        </Container>
        <Grid container justify="flex-end">
          <Button
            className={classes.saveButton}
            size="large"
            variant="contained"
            /*  onClick={() => {
                this.onSubmit(
                  this.state.calID,
                  this.state.regNote,
                  this.state.attendanceType
                );
              }} */
          >
            Send
          </Button>
        </Grid>
      </div>
    );
  }
}

NewMessage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(NewMessage));
