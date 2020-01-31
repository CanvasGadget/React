import React from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Mouse from "@material-ui/icons/Mouse";
import Search from "@material-ui/icons/Search";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import API from "../utils/API";

moment().toDate();

const styles = theme => ({
  root: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    align: "center"
    // width: "31%"
  },

  button: {
    margin: theme.spacing.unit,
    align: "center",
    /* this is text color */ color: theme.palette.getContrastText("#b2dfdb"),
    backgroundColor: "#b2dfdb",
    "&:hover": {
      backgroundColor: "#80cbc4"
    }
  },

  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  dialogTitle: {
    marginBottom: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
  textField2: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
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
    primary: { main: "#00838f" }
  }
});

class InvoiceActions extends React.Component {
  state = {
    anchorEl: null,
    openInvoices: false,
    openDateRange: false,
    payorData: [],
    payor: "",
    status: "Unpaid",
    startDate: moment()
      .subtract(1, "month")
      .format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
    invoiceDate: moment().format("YYYY-MM-DD"),
    dueDate: moment()
      .add(1, "month")
      .format("YYYY-MM-DD")
    // invoiceNotes: null
  };
  async componentDidMount() {
    await this.updateContent();
  }

  componentWillUnmount() {}

  async updateContent() {
    try {
      const payorsResp = await API.get("/accounts/payors");
      const payorData = payorsResp.data.data;

      this.setState({ payorData });
    } catch (error) {
      console.log("While fetching transaction we got an error: ", error);
    }
  }
  onSubmit = e => {
    //experiment keeping preventDefault
    //  e.preventDefault();

    const invObj = {
      invoiceDate: this.state.invoiceDate,
      payor: this.state.payor, //payor_last: this.state.payor,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      dueDate: this.state.dueDate,
      amount: this.state.invoiceAmount
    };
    API.post("accounts/manualinvoices", invObj).then(async response => {
      this.props.onUpdated();
    });
    this.handleCloseInvoices();
  };

  /* change of team member dropdown */
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  /* show invoices diaglog box */
  handleClickOpenInvoice = () => {
    this.setState({ openInvoices: true });
  };

  /* close invoices diaglog box */
  handleCloseInvoices = () => {
    this.setState({ openInvoices: false });
  };

  handleDateChangeStart = date => {
    this.setState({ startDate: date.format("YYYY-MM-DD" /*  HH:mm:ss */) });
  };

  handleDateChangeEnd = date => {
    this.setState({ endDate: date.format("YYYY-MM-DD") });
  };

  handleDateChangeInvoice = date => {
    this.setState({ invoiceDate: date.format("YYYY-MM-DD") });
  };

  handleDateChangeDue = date => {
    this.setState({ dueDate: date.format("YYYY-MM-DD") });
  };

  /* Select menu options */
  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl, payorData } = this.state;
    const isMenuOpen = Boolean(anchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Email</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>Download</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>Delete</MenuItem>
      </Menu>
    );

    return (
      <div>
        <Grid container direction="row" justify="center" alignItems="center">
          <Container maxWidth="sm">
            <Paper className={classes.root} elevation={7}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                {/* New Invoice button */}
                <Button
                  variant="contained"
                  onClick={this.handleClickOpenInvoice}
                  className={classes.button}
                >
                  <AddIcon
                    className={classNames(classes.leftIcon, classes.iconSmall)}
                  />
                  New Invoice
                </Button>
                {/* New Invoice dialog box */}
                <Dialog
                  open={this.state.openInvoices}
                  onClose={this.handleCloseInvoices}
                >
                  <DialogTitle id="form-dialog-title">New Invoice</DialogTitle>
                  <DialogContent>
                    <TextField
                      id="standard-select-payor"
                      required
                      select
                      label="Payor"
                      variant="outlined"
                      margin="normal"
                      type="search"
                      className={classes.textField}
                      value={this.state.payor}
                      onChange={this.handleChange("payor")}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu
                        }
                      }}
                    >
                      {payorData.map(option => (
                        <MenuItem
                          key={option.value}
                          value={option.billing_full_name}
                        >
                          {option.billing_full_name}
                        </MenuItem>
                      ))}
                    </TextField>

                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <Grid container row>
                        <MuiThemeProvider theme={theme2}>
                          <DatePicker
                            inputVariant="outlined"
                            margin="normal"
                            className={classes.textField}
                            label="Start Date"
                            value={this.state.startDate}
                            onChange={this.handleDateChangeStart}
                          />
                        </MuiThemeProvider>
                      </Grid>
                      <MuiThemeProvider theme={theme2}>
                        <Grid container row>
                          <DatePicker
                            inputVariant="outlined"
                            margin="normal"
                            className={classes.textField}
                            label="End Date"
                            value={this.state.endDate}
                            onChange={this.handleDateChangeEnd}
                          />
                        </Grid>
                      </MuiThemeProvider>
                      <MuiThemeProvider theme={theme2}>
                        <Grid container row>
                          <DatePicker
                            margin="normal"
                            inputVariant="outlined"
                            className={classes.textField}
                            label="Invoice Date"
                            value={this.state.invoiceDate}
                            onChange={this.handleDateChangeInvoice}
                          />
                        </Grid>
                      </MuiThemeProvider>
                      <MuiThemeProvider theme={theme2}>
                        <Grid container row>
                          <DatePicker
                            inputVariant="outlined"
                            margin="normal"
                            className={classes.textField}
                            label="Due Date"
                            value={this.state.dueDate}
                            onChange={this.handleDateChangeDue}
                          />
                        </Grid>
                      </MuiThemeProvider>
                    </MuiPickersUtilsProvider>
                    {/*
                    <TextField
                      id="standard-invoiceNotes"
                      label="Notes"
                      variant="outlined"
                      className={classes.textField}
                      value={this.state.invoiceNotes}
                      onChange={this.handleChange("invoiceNotes")}
                      margin="normal"
                    />
*/}
                  </DialogContent>
                  <MuiThemeProvider theme={theme2}>
                    <DialogActions>
                      <Button
                        onClick={this.handleCloseInvoices}
                        color="primary"
                      >
                        Cancel
                      </Button>
                      <Button
                        color="primary"
                        onClick={() => {
                          this
                            .onSubmit
                            /*  this.state.invoiceDate,
                            this.state.payor,
                            this.state.startDate,
                            this.state.endDate,
                            this.state.dueDate,
                            this.state.invoiceAmount */
                            ();
                        }}
                      >
                        Add
                      </Button>
                    </DialogActions>
                  </MuiThemeProvider>
                </Dialog>
                {/* Selected button */}
                <Button
                  variant="contained"
                  onClick={this.handleProfileMenuOpen}
                  className={classes.button}
                >
                  <Mouse
                    className={classNames(classes.leftIcon, classes.iconSmall)}
                  />
                  Selected
                </Button>
                {renderMenu}

                {/* Search button */}
                <Button variant="contained" className={classes.button}>
                  <Search
                    className={classNames(classes.leftIcon, classes.iconSmall)}
                  />
                  Search
                </Button>
                {/*
                <Button
                  variant="contained"
                  onClick={this.handleClickOpen2}
                  className={classes.button}
                >
                  <Visibility
                    className={classNames(classes.leftIcon, classes.iconSmall)}
                  />
                  Show
                </Button>
   */}
              </Grid>
            </Paper>
          </Container>
        </Grid>
      </div>
    );
  }
}

InvoiceActions.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InvoiceActions);
