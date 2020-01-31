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
// import FormGroup from "@material-ui/core/FormGroup";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
// import Typography from "@material-ui/core/Typography";
// import Cyan from "@material-ui/core/colors/cyan";
// import Switch from "@material-ui/core/Switch";
// import classNames from "classnames";
// import CheckCircleIcon from "@material-ui/icons/CheckCircle";
// import CloseIcon from "@material-ui/icons/Close";
// import green from "@material-ui/core/colors/green";
// import IconButton from "@material-ui/core/IconButton";
//import Snackbar from "@material-ui/core/Snackbar";
// import SnackbarContent from "@material-ui/core/SnackbarContent";
//import MaskedInput from "react-text-mask";
//import NumberFormat from "react-number-format";
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import { Redirect } from "react-router-dom";

// import API from "../utils/API";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },

  root: {
    width: "100%",
    //marginLeft: theme.spacing.unit * 22,
    marginTop: theme.spacing(5),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2)
    //backgroundColor: red[200]
  },

  button: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
    /* this is text color */ color: theme.palette.getContrastText("#b2dfdb"),
    backgroundColor: "#b2dfdb",
    "&:hover": {
      backgroundColor: "#80cbc4"
    }
  },

  menu: {
    width: 200
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

const paymentTypes = [
  {
    value: "No Online Payments",
    label: "No Online Payments"
  },

  {
    value: "Stripe",
    label: "Stripe"
  }
];

const navStyle = {
  color: "black",
  textDecoration: "none"
};

class PaymentSettings extends React.Component {
  state = {
    open: false,
    //client info state
    checkedActive: true,
    paymentType: "No Online Payments"
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleChangeChecked = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes } = this.props;

    return (
      <Container maxWidth="lg">
        <form className={classes.container} noValidate autoComplete="off">
          <Paper className={classes.root} elevation={1}>
            <Grid container justify="center" alignItems="center">
              <Grid container row justify="center" alignItems="center">
                <MuiThemeProvider theme={theme}>
                  <TextField
                    id="standard-select-paymentType"
                    select
                    required
                    label="Payment Type"
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

                  {this.state.paymentType === "Stripe" ? (
                    <Button
                      size="medium"
                      variant="contained"
                      className={classes.button}
                    >
                      Connect with Stripe
                    </Button>
                  ) : null}
                </MuiThemeProvider>
              </Grid>
            </Grid>
          </Paper>
        </form>
      </Container>
    );
  }
}

PaymentSettings.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PaymentSettings);
