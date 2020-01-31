import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Switch from "@material-ui/core/Switch";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import AssignedClientsTable from "../Tables/assignedClientsTable";
//import TeamMemFilesTable from "../Tables/teamMemFilesTable";
// import MemberUploadAction from "../Actions/memberUploadAction";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Cyan from "@material-ui/core/colors/cyan";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
/* import CloseIcon from "@material-ui/icons/Close";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import WarningIcon from "@material-ui/icons/Warning";
import InfoIcon from "@material-ui/icons/Info"; */
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Chip from "@material-ui/core/Chip";
import InputMask from "react-input-mask";

import API from "../utils/API";

const styles = theme => ({
  root: {
    marginTop: theme.spacing(10),
    align: "center",
    height: "130"
  },

  memberAvatar: {
    margin: 10,
    color: theme.palette.getContrastText(Cyan[800]),
    backgroundColor: Cyan[800],
    "&:hover": {
      backgroundColor: Cyan[400]
    },
    width: 100,
    height: 100,
    fontSize: 40,
    marginBottom: theme.spacing(-18)
  },

  toggle: {
    paddingRight: theme.spacing(1) * 30
  },

  marg: {
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },

  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: 300
  },

  textFieldRole: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(4),
    width: 200
  },

  textFieldTop: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(5),
    width: 300
  },
  menu: {
    width: 200
  },

  checked: {},

  root2: {
    width: "100%",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: Cyan[800]
  },
  infoRoot: {
    marginBottom: theme.spacing(1) * 2
  },

  floatButton: {
    marginTop: theme.spacing(4),
    margin: theme.spacing(1),
    /* this is text color */ color: theme.palette.getContrastText("#b2dfdb"),
    backgroundColor: "#b2dfdb",
    "&:hover": {
      backgroundColor: "#80cbc4"
    }
  },

  margin: {
    margin: theme.spacing(1)
  },

  multiSelectDialog: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    minWidth: "80%"
    //maxWidth: 300
  },

  deleteButton: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(2),
    /* this is text color */ color: theme.palette.getContrastText("#b2dfdb"),
    backgroundColor: "#b2dfdb",
    "&:hover": {
      backgroundColor: "#80cbc4"
    }
  },

  saveButton: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    /* this is text color */ color: theme.palette.getContrastText("#b2dfdb"),
    backgroundColor: "#b2dfdb",
    "&:hover": {
      backgroundColor: "#80cbc4"
    }
  },

  leftIcon: {
    // marginRight: theme.spacing(1)
  },

  formRoot: {
    marginTop: theme.spacing(2)
    // marginLeft: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(3)
  }
});

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

class MemberDetails extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    active: false,
    member: 0, // current member id,
    id: 0,
    therapistData: [],
    clientData: [],
    open: false,
    cost: "",
    length: "",
    type: "",
    checkedAdmin: true,
    checkedThera: true,
    checkedIntern: false,
    tabValue: 0,
    deleteDialog: false,
    memberRole: "",
    infoValidationBox: false,
    privValidationBox: false,
    //member info
    intials: "",
    fullName: "",
    firstName: "",
    lastName: "",
    email: "",
    title: "",
    memInitials: "",
    phone: "",
    address: "",
    location: "",
    npi: "",
    city: "",
    bday: "",
    state2: "",
    zipCode: "",
    notes: "",
    multiline: "Controlled",
    // assigned clients
    assiCli: [],
    client: "",
    assignOpen: false,
    // privs
    invBilling: true,
    calEvery: true,
    vOtherCli: true,
    eOtherSched: true,
    vOtherSched: true,
    eOtherInfo: true,
    vOtherInfo: true,
    addCli: true,
    recAtt: true,
    takePay: true,
    vNote: true,
    vCreateRep: true,
    vOwnCal: true,
    vOwnCli: true
  };

  async componentDidMount() {
    try {
      const membersResp = await API.get("/members");
      const clientsResp = await API.get("/clients/all");
      const members = membersResp.data.data;
      const clients = clientsResp.data.data;
      this.setState({
        therapistData: members,
        clientData: clients
      });
      this.setState({ member: this.props.location.state.curMemberId }, () => {
        // console.log("props ID: ", this.props.location.state.curMemberId);
        // console.log("member ID: ", this.state.member);
        this.changeContentWithMemberId();
        //this.changeInitialsWithMemberId();
      });
    } catch (error) {
      console.log("Data fetching error: ", error);
    }
  }

  async componentDidMountPostSave() {
    try {
      const membersResp = await API.get("/members");
      const clientsResp = await API.get("/clients/all");
      const members = membersResp.data.data;
      const clients = clientsResp.data.data;
      this.setState({
        therapistData: members,
        clientData: clients
      });
      this.setState({ member: this.state.member }, () => {
        console.log("post save member ID: ", this.state.member);
        this.changeContentWithMemberId();
        //this.changeInitialsWithMemberId();
      });
    } catch (error) {
      console.log("Data fetching error: ", error);
    }
  }

  onSaveInfo() {
    //experiment keeping preventDefault
    //e.preventDefault();

    const memberObj = {
      id: this.state.member,
      memberFullName: this.state.firstName + " " + this.state.lastName,
      memberFirstName: this.state.firstName,
      memberLastName: this.state.lastName,
      memberEmail: this.state.email,
      memberRole: this.state.memberRole,
      memberTitle: this.state.title,
      memberState: this.state.state2,
      memberPhone: this.state.phone,
      memberAddress: this.state.address,
      memberLocation: this.state.location,
      memberNpi: this.state.npi,
      memberCity: this.state.city,
      memberZipCode: this.state.zipCode,
      memberNotes: this.state.notes,
      memberBday: this.state.bday,
      checkedActive: this.state.active,
      location: this.state.location
    };

    API.put("/members/updatememberinfo", memberObj)
      // .then(res => console.log(res.data));
      .then(async res => {
        this.setState({
          memberObj,
          // redirect: true
          infoValidationBox: true
        });
        await this.componentDidMountPostSave();
      });
  }

  onSavePriv() {
    const memberObj = {
      id: this.state.member,
      invBilling: this.state.invBilling,
      calEvery: this.state.calEvery,
      vOtherCli: this.state.vOtherCli,
      eOtherSched: this.state.eOtherSched,
      vOtherSched: this.state.vOtherSched,
      eOtherInfo: this.state.eOtherInfo,
      vOtherInfo: this.state.vOtherInfo,
      addCli: this.state.addCli,
      recAtt: this.state.recAtt,
      takePay: this.state.takePay,
      vNote: this.state.vNote,
      vCreateRep: this.state.vCreateRep,
      vOwnCal: this.state.vOwnCal,
      vOwnCli: this.state.vOwnCli
    };

    API.put("/members/updatememberpriv", memberObj)
      // .then(res => console.log(res.data));
      .then(async res => {
        this.setState({
          memberObj,
          // redirect: true
          infoValidationBox: true
        });
      });

    /*    if (memberObj.firstName === "") {
      this.setState({ infoValidationBox: true });
    } else if (memberObj.lastName === "") {
      this.setState({ infoValidationBox: true });
    } else if (memberObj.email === "") {
      this.setState({ infoValidationBox: true });
    }

    // submit data
    else {
      API.post("/members/updatemember", memberObj)
        // .then(res => console.log(res.data));
        .then(async response => {
          console.log(response.data);
          this.setState({
            memberObj
            //  open: false,
            // ** put snackbar here **
          });
        });
    } */

    /* end of save Priv */
  }

  onAssiCli() {
    //experiment keeping preventDefault
    //e.preventDefault();

    const obj = {
      id: this.state.member,
      assiCli: this.state.assiCli
    };

    API.put("/members/assignclient", obj)
      // .then(res => console.log(res.data));
      .then(async res => {
        this.setState({
          obj,
          // redirect: true
          infoValidationBox: true
        });
        await this.componentDidMount();
      });
  }

  handleDeleteDialogOpen = () => {
    this.setState({ deleteDialog: true });
  };

  handleDeleteDialogClose = () => {
    this.setState({ deleteDialog: false });
  };

  handleClickAvatar = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleCloseAvatar = () => {
    this.setState({ anchorEl: null });
  };

  /* change of team member dropdown */
  handleChangeValue = name => event => {
    this.setState({ [name]: event.target.value }, () => {
      if (name === "member") this.changeContentWithMemberId();
      else if (name === "memberRole") {
        this.handleChangeRole2();
      }
    });
  };

  handleChangeRole2 = () => {
    if (this.state.memberRole === "Administrator") {
      this.setState({
        invBilling: true,
        calEvery: true,
        vOtherCli: true,
        eOtherSched: true,
        vOtherSched: true,
        eOtherInfo: true,
        vOtherInfo: true,
        addCli: true,
        recAtt: true,
        takePay: true,
        vNote: true,
        vCreateRep: true,
        vOwnCal: true,
        vOwnCli: true
      });
    } else if (this.state.memberRole === "Therapist") {
      this.setState({
        invBilling: false,
        calEvery: false,
        vOtherCli: false,
        eOtherSched: false,
        vOtherSched: false,
        eOtherInfo: false,
        vOtherInfo: false,
        addCli: true,
        recAtt: true,
        takePay: true,
        vNote: true,
        vCreateRep: false,
        vOwnCal: true,
        vOwnCli: true
      });
    } else if (this.state.memberRole === "Intern") {
      this.setState({
        invBilling: false,
        calEvery: false,
        vOtherCli: false,
        eOtherSched: false,
        vOtherSched: false,
        eOtherInfo: false,
        vOtherInfo: false,
        addCli: true,
        recAtt: true,
        takePay: true,
        vNote: true,
        vCreateRep: false,
        vOwnCal: true,
        vOwnCli: true
      });
    }
  };

  handleChangeRole = name => event => {
    this.setState({ [name]: event.target.value }, () => {
      if (name === "Therapist")
        this.setState({
          invBilling: false
        });
    });
  };

  changeContentWithMemberId() {
    const member = this.state.therapistData.find(
      ({ id }) => id === this.state.member
    );
    if (member) {
      const {
        id,
        active,
        title,
        member_full_name,
        member_first_name,
        member_last_name,
        initials,
        email,
        phone,
        street_address,
        city,
        zip,
        location,
        bday,
        npi,
        pass,
        notes,
        role,
        state,
        inv_billing,
        cal_every,
        view_other_clients,
        edit_other_sched,
        view_other_sched,
        edit_other_info,
        view_other_info,
        add_client,
        record_attendance,
        take_pay,
        view_note_hist,
        view_create_rep,
        view_own_cal,
        view_own_clients
      } = member;
      this.setState({
        member: id,
        active: active,
        memberRole: role,
        fullName: member_full_name,
        firstName: member_first_name,
        lastName: member_last_name,
        memInitials: initials,
        email: email,
        title: title,
        currentPassword: pass,
        confirmPassword: pass,
        phone: phone,
        address: street_address,
        npi: npi,
        city: city,
        state2: state,
        zipCode: zip,
        location: location,
        bday: bday,
        notes: notes,
        // privliges
        invBilling: inv_billing,
        calEvery: cal_every,
        vOtherCli: view_other_clients,
        eOtherSched: edit_other_sched,
        vOtherSched: view_other_sched,
        eOtherInfo: edit_other_info,
        vOtherInfo: view_other_info,
        addCli: add_client,
        recAtt: record_attendance,
        takePay: take_pay,
        vNote: view_note_hist,
        vCreateRep: view_create_rep,
        vOwnCal: view_own_cal,
        vOwnCli: view_own_clients
      });
      console.log("new member ID: ", this.state.member);
    }
  }

  /*   changeInitialsWithMemberId() {
    const member = this.state.initialsData.find(
      ({ id }) => id === this.state.member
    );
    if (member) {
      const {
        // id,
        initial
      } = member;
      this.setState({
        // id: id,
        initials: initial
      });
    }
  } */

  // change of check boxes
  handleChangeChecked = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleChangeTab = (event, tabValue) => {
    this.setState({ tabValue });
  };

  //show client assign box;
  handleClickClientOpen = () => {
    this.setState({ assignOpen: true });
  };

  handleClientClose = () => {
    this.setState({ assignOpen: false });
  };

  handleDeleteDialogOpen = () => {
    this.setState({ deleteDialog: true });
  };

  handleDeleteDialogClose = () => {
    this.setState({ deleteDialog: false });
  };

  handleValidationOpen = () => {
    this.setState({ infoValidationBox: true });
  };

  handleValidationClose = () => {
    this.setState({ infoValidationBox: false });
  };

  handleMultiCli = event => {
    const multiFilters = {
      therapists: this.state.multiFilters.therapists,
      assiCli: this.state.multiFilters.clients
    };
    multiFilters.clients = event.target.value;
    // if (event.target.value.includes("All")) {
    //   multiFilters.clients = ["All"];
    // }
    this.handleMultiFilterChanges(multiFilters);
  };

  render() {
    const { classes } = this.props;
    const { anchorEl, tabValue, clientData, therapistData } = this.state;
    return (
      <div>
        <Dialog
          open={this.state.infoValidationBox}
          onClose={this.handleValidationClose}
        >
          <DialogTitle>You changes have been saved</DialogTitle>
          <DialogContent>
            {/*     <DialogContentText>
             
            </DialogContentText> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleValidationClose}>Awesome!</Button>
          </DialogActions>
        </Dialog>

        <Container maxWidth="lg">
          {/* Avatar */}
          <Grid container justify="center" alignItems="center">
            <IconButton
              color="primary"
              className={classes.memberAvatar}
              onClick={this.handleClickAvatar}
            >
              {this.state.memInitials}
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: "center", horizontal: "center" }}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={this.handleCloseAvatar}
            >
              <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                // multiple
                type="file"
              />
              <label htmlFor="contained-button-file">
                <MenuItem onClick={this.handleClose}>Upload Picture </MenuItem>
              </label>
              <MenuItem onClick={this.handleClose}>Remove Picture</MenuItem>
            </Menu>
          </Grid>
          <Paper className={classes.root} elevation={2}>
            <MuiThemeProvider theme={theme}>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.active}
                      onChange={this.handleChangeChecked("active")}
                      value={this.state.active}
                      margin="theme.spacing(1) * 20"
                      className={classes.marg}
                      color="primary"
                    />
                  }
                  label="Active"
                />
              </FormGroup>
            </MuiThemeProvider>
            {/* member drop down */}
            <Grid container justify="space-between">
              <TextField
                id="standard-select-member"
                select
                label="Team Member"
                variant="outlined"
                className={classes.textField}
                value={this.state.member}
                onChange={this.handleChangeValue("member")}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
              >
                {therapistData.map(option => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.member_full_name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="standard-role"
                label="Role"
                variant="outlined"
                className={classes.textField}
                value={this.state.memberRole}
                //onChange={this.handleChangeValue("firstName")}
                margin="normal"
              />
            </Grid>
          </Paper>

          <AppBar className={classes.root2} position="static">
            {/* <MuiThemeProvider theme={theme}> */}
            <Tabs
              indicatorColor="primary"
              value={tabValue}
              onChange={this.handleChangeTab}
            >
              <Tab label="Team Member Information" />
              <Tab label="Assigned Clients" />
              <Tab label="Message History" />
              {/*   <Tab label="Member Files" /> */}
              <Tab label="Privileges " />
            </Tabs>
            {/* </MuiThemeProvider> */}
          </AppBar>

          {tabValue === 0 && (
            <form
              /* className={classes.container} */ noValidate
              autoComplete="off"
            >
              <Paper className={classes.infoRoot} elevation={2}>
                <Grid container justify="center" alignItems="center">
                  <TextField
                    id="standard-select-title"
                    select
                    margin="normal"
                    label="Title"
                    variant="outlined"
                    className={classes.textFieldTop}
                    value={this.state.title}
                    onChange={this.handleChangeValue("title")}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu
                      }
                    }}
                  >
                    {titles.map((option, i) => (
                      <MenuItem key={i} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <MuiThemeProvider theme={theme}>
                    <TextField
                      required
                      id="standard-firstName"
                      label="First Name"
                      variant="outlined"
                      className={classes.textFieldTop}
                      value={this.state.firstName}
                      onChange={this.handleChangeValue("firstName")}
                      margin="normal"
                    />
                  </MuiThemeProvider>

                  <TextField
                    required
                    id="standard-lastNamename"
                    label="Last Name"
                    variant="outlined"
                    className={classes.textFieldTop}
                    value={this.state.lastName}
                    onChange={this.handleChangeValue("lastName")}
                    margin="normal"
                  />

                  <TextField
                    required
                    id="standard-email"
                    variant="outlined"
                    label="Email"
                    className={classes.textField}
                    value={this.state.email}
                    onChange={this.handleChangeValue("email")}
                    margin="normal"
                  />

                  <TextField
                    id="standard-address"
                    variant="outlined"
                    label="Address"
                    className={classes.textField}
                    value={this.state.address}
                    onChange={this.handleChangeValue("address")}
                    margin="normal"
                  />

                  <TextField
                    id="standard-city-"
                    variant="outlined"
                    label="City"
                    className={classes.textField}
                    value={this.state.city}
                    onChange={this.handleChangeValue("city")}
                    margin="normal"
                  />

                  <TextField
                    id="standard-state"
                    variant="outlined"
                    label="State"
                    className={classes.textField}
                    value={this.state.state2}
                    onChange={this.handleChangeValue("state2")}
                    margin="normal"
                  />

                  <InputMask
                    mask="99999"
                    //maskPlaceholder=""
                    maskChar={null}
                    value={this.state.zipCode}
                    onChange={this.handleChangeValue("zipCode")}
                    className={classes.textField}
                  >
                    {() => (
                      <TextField
                        id="zip-textboc"
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
                    value={this.state.phone}
                    onChange={this.handleChangeValue("phone")}
                    className={classes.textField}
                  >
                    {() => (
                      <TextField
                        id="memphone-text"
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
                    value={this.state.bday}
                    onChange={this.handleChangeValue("bday")}
                    className={classes.textField}
                  >
                    {() => (
                      <TextField
                        id="mem-bday"
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
                    value={this.state.npi}
                    onChange={this.handleChangeValue("npi")}
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
                    value={this.state.location}
                    onChange={this.handleChangeValue("location")}
                    margin="normal"
                  />

                  <MuiThemeProvider theme={theme2}>
                    <TextField
                      id="standard-full-width"
                      style={{ margin: 8 }}
                      className={classes.textField2}
                      placeholder="Add any additional notes here"
                      fullWidth
                      multiline
                      value={this.state.notes}
                      onChange={this.handleChangeValue("notes")}
                      margin="normal"
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </MuiThemeProvider>
                </Grid>
                <Grid container direction="row" justify="space-between">
                  <Button
                    className={classes.deleteButton}
                    size="large"
                    variant="contained"
                    onClick={this.handleDeleteDialogOpen}
                  >
                    Delete
                  </Button>
                  <Dialog
                    open={this.state.deleteDialog}
                    onClose={this.handleDeleteDialogClose}
                  >
                    <DialogTitle>
                      Are you sure you want to delete this member?
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Once this member has been deleted, it cannot be undone.
                        If this member has references elsewhere, this member
                        will be marked as inactive.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.handleDeleteDialogClose}>No</Button>
                      <Button onClick={this.handleDeleteDialogClose} autoFocus>
                        Yes
                      </Button>
                    </DialogActions>
                  </Dialog>

                  <Button
                    className={classes.saveButton}
                    onClick={() => {
                      this.onSaveInfo();
                    }}
                    size="large"
                    variant="contained"
                  >
                    Save
                  </Button>
                </Grid>
              </Paper>
            </form>
          )}
          {tabValue === 1 && (
            <Grid container justify="center" alignItems="center">
              {/* Assign client button */}
              <Button
                variant="contained"
                onClick={this.handleClickClientOpen}
                className={classes.floatButton}
              >
                <AddIcon />
                Assign Clients
              </Button>
              <Dialog
                open={this.state.assignOpen}
                onClose={this.handleClientClose}
                //className={classes.assignRoot}
              >
                <DialogTitle id="form-dialog-title">Assign Clients</DialogTitle>
                <DialogContent>
                  <MuiThemeProvider theme={theme}>
                    <FormControl className={classes.multiSelectDialog}>
                      <InputLabel id="clientMulti">Clients</InputLabel>
                      <Select
                        id="clientMulti"
                        multiple
                        value={this.state.assiCli}
                        onChange={this.handleChangeValue("assiCli")}
                        // margin="normal"
                        //variant="outlined"
                        renderValue={selected => (
                          <div className={classes.chips}>
                            {selected.map(value => (
                              <Chip key={value} label={value} />
                            ))}
                          </div>
                        )}
                      >
                        {/* <MenuItem
                key={`client-all`}
                value={`All`}
              >
                {`All`}
              </MenuItem> */}
                        {clientData.map((value, index) => (
                          <MenuItem
                            key={`client-${index + 1}`}
                            value={value.client_full_name}
                          >
                            {value.client_full_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </MuiThemeProvider>
                </DialogContent>
                <MuiThemeProvider theme={theme2}>
                  <DialogActions>
                    <Button onClick={this.handleClientClose} color="primary">
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        this.onAssiCli();
                      }}
                      color="primary"
                    >
                      Assign
                    </Button>
                  </DialogActions>
                </MuiThemeProvider>
              </Dialog>
            </Grid>
          )}
          {tabValue === 1 && (
            <AssignedClientsTable
              clients={this.state.clientData}
              therapistFullName={this.state.fullName}
            />
          )}
          {tabValue === 2 && <Paper>Message History</Paper>}
          {/*  {tabValue === 3 && <MemberUploadAction />} */}
          {/*    {tabValue === 3 && <TeamMemFilesTable />} */}
          {tabValue === 3 && (
            <Paper className={classes.infoRoot2} elevation={2}>
              <Grid container justify="center">
                <TextField
                  id="memberRole"
                  select
                  label="Role"
                  variant="outlined"
                  className={classes.textFieldRole}
                  value={this.state.memberRole}
                  onChange={this.handleChangeValue("memberRole")}
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
              {this.state.memberRole === "Administrator" ? (
                <Grid
                  container
                  // direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <MuiThemeProvider theme={theme}>
                    <FormControl
                      component="fieldset"
                      className={classes.formControl}
                    >
                      <FormGroup>
                        {/* chunk 1-5 */}

                        <FormControlLabel
                          control={
                            <Switch
                              className={classes.formRoot2}
                              color="primary"
                              checked={true}
                              //onChange={this.handleChangeChecked("Admin_invoice")}
                              value={this.state.invBilling}
                            />
                          }
                          label="Invoices/Billing"
                        />

                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={true}
                              // onChange={this.handleChangeChecked("allCalendar")}
                              value={this.state.calEvery}
                            />
                          }
                          label="Calendar of everyone"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={true}
                              //onChange={this.handleChangeChecked("viewClient")}
                              value={this.state.vOtherCli}
                            />
                          }
                          label="View other clients vs. own clients"
                        />

                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={true}
                              //onChange={this.handleChangeChecked("editOtherSched")}
                              value={this.state.eOtherSched}
                            />
                          }
                          label="Edit other therapist schedule"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={true}
                              // onChange={this.handleChangeChecked( "Admin_viewOtherSched")}
                              value={this.state.vOtherSched}
                            />
                          }
                          label="View other therapist schedule"
                        />
                        {/* chunk 6-10 */}
                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={true}
                              /*  onChange={this.handleChangeChecked(
                                "editOtherInfo"
                              )} */
                              value={this.state.eOtherInfo}
                            />
                          }
                          label="Edit other therapist/client info"
                        />

                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={true}
                              /*  onChange={this.handleChangeChecked(
                                "viewOtherInfo"
                              )} */
                              value={this.state.vOtherInfo}
                            />
                          }
                          label="View other therapist/client info"
                        />
                      </FormGroup>
                    </FormControl>
                    <FormControl
                      component="fieldset"
                      className={classes.formControl}
                    >
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={true}
                              // onChange={this.handleChangeChecked("addClient")}
                              value={this.state.addCli}
                            />
                          }
                          label="Add client"
                        />

                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={true}
                              /*  onChange={this.handleChangeChecked(
                                "recordAttendance"
                              )} */
                              value={this.state.recAtt}
                            />
                          }
                          label="Record Attendance"
                        />

                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={true}
                              // onChange={this.handleChangeChecked("payment")}
                              value={this.state.takePay}
                            />
                          }
                          label="Take payment"
                        />

                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={true}
                              //onChange={this.handleChangeChecked("viewNote")}
                              value={this.state.vNote}
                            />
                          }
                          label="View note history"
                        />

                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={true}
                              //onChange={this.handleChangeChecked("Admin_viewReport")}
                              value={this.state.vCreateRep}
                            />
                          }
                          label="View/create reports"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={true}
                              /*   onChange={this.handleChangeChecked(
                                "viewCalendar"
                              )} */
                              value={this.state.vOwnCal}
                            />
                          }
                          label="View own calendar"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={true}
                              /*    onChange={this.handleChangeChecked(
                                "viewOwnClient"
                              )} */
                              value={this.state.vOwnCli}
                            />
                          }
                          label="View own clients"
                        />
                      </FormGroup>
                    </FormControl>
                  </MuiThemeProvider>
                </Grid>
              ) : null}

              {this.state.memberRole === "Therapist" ? (
                <Grid
                  container
                  // direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <MuiThemeProvider theme={theme}>
                    <FormControl
                      component="fieldset"
                      className={classes.formControl}
                    >
                      <FormGroup>
                        {/* chunk 1-5 */}

                        <FormControlLabel
                          control={
                            <Switch
                              className={classes.formRoot2}
                              color="primary"
                              checked={this.state.invBilling}
                              onChange={this.handleChangeValue("invBilling")}
                              value={this.state.invBilling}
                            />
                          }
                          label="Invoices/Billing"
                        />

                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={this.state.calEvery}
                              onChange={this.handleChangeChecked("calEvery")}
                              value={this.state.calEvery}
                            />
                          }
                          label="Calendar of everyone"
                        />

                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={this.state.vOtherCli}
                              onChange={this.handleChangeChecked(" vOtherCli")}
                              value={this.state.vOtherCli}
                            />
                          }
                          label="View other clients vs. own clients"
                        />

                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={this.state.eOtherSched}
                              onChange={this.handleChangeChecked("eOtherSched")}
                              value={this.state.eOtherSched}
                            />
                          }
                          label="Edit other therapist schedule"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={this.state.vOtherSched}
                              onChange={this.handleChangeChecked("vOtherSched")}
                              value={this.state.vOtherSched}
                            />
                          }
                          label="View other therapist schedule"
                        />
                        {/* chunk 6-10 */}
                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={this.state.eOtherInfo}
                              onChange={this.handleChangeChecked("eOtherInfo")}
                              value={this.state.eOtherInfo}
                            />
                          }
                          label="Edit other therapist/client info"
                        />

                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={this.state.vOtherInfo}
                              onChange={this.handleChangeChecked("vOtherInfo")}
                              value={this.state.vOtherInfo}
                            />
                          }
                          label="View other therapist/client info"
                        />
                      </FormGroup>
                    </FormControl>
                    <FormControl
                      component="fieldset"
                      className={classes.formControl}
                    >
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={this.state.addCli}
                              // onChange={this.handleChangeChecked("addCli")}
                              value={this.state.addCli}
                            />
                          }
                          label="Add client"
                        />

                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={this.state.recAtt}
                              // onChange={this.handleChangeChecked("recAtt")}
                              value={this.state.recAtt}
                            />
                          }
                          label="Record Attendance"
                        />

                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={this.state.vNote}
                              // onChange={this.handleChangeChecked("vNote")}
                              value={this.state.vNote}
                            />
                          }
                          label="View note history"
                        />

                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={this.state.takePay}
                              //  onChange={this.handleChangeChecked("takePay")}
                              value={this.state.takePay}
                            />
                          }
                          label="Take payment"
                        />

                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={this.state.vCreateRep}
                              onChange={this.handleChangeChecked("vCreateRep")}
                              value={this.state.vCreateRep}
                            />
                          }
                          label="View/create reports"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={this.state.vOwnCal}
                              //  onChange={this.handleChangeChecked("vOwnCal")}
                              value={this.state.vOwnCal}
                            />
                          }
                          label="View own calendar"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={this.state.vOwnCli}
                              //  onChange={this.handleChangeChecked("vOwnCli")}
                              value={this.state.vOwnCli}
                            />
                          }
                          label="View own clients"
                        />
                      </FormGroup>
                    </FormControl>
                  </MuiThemeProvider>
                </Grid>
              ) : null}

              {this.state.memberRole === "Intern" ? (
                <Grid
                  container
                  // direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <MuiThemeProvider theme={theme}>
                    <FormControl
                      component="fieldset"
                      className={classes.formControl}
                    >
                      <FormGroup>
                        {/* chunk 1-5 */}

                        <FormControlLabel
                          control={
                            <Switch
                              className={classes.formRoot2}
                              color="primary"
                              checked={this.state.invBilling}
                              onChange={this.handleChangeValue("invBilling")}
                              value={this.state.invBilling}
                            />
                          }
                          label="Invoices/Billing"
                        />

                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={this.state.calEvery}
                              onChange={this.handleChangeChecked("calEvery")}
                              value={this.state.calEvery}
                            />
                          }
                          label="Calendar of everyone"
                        />

                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={this.state.vOtherCli}
                              onChange={this.handleChangeChecked(" vOtherCli")}
                              value={this.state.vOtherCli}
                            />
                          }
                          label="View other clients vs. own clients"
                        />

                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={this.state.eOtherSched}
                              onChange={this.handleChangeChecked("eOtherSched")}
                              value={this.state.eOtherSched}
                            />
                          }
                          label="Edit other therapist schedule"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={this.state.vOtherSched}
                              onChange={this.handleChangeChecked("vOtherSched")}
                              value={this.state.vOtherSched}
                            />
                          }
                          label="View other therapist schedule"
                        />
                        {/* chunk 6-10 */}
                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={this.state.eOtherInfo}
                              onChange={this.handleChangeChecked("eOtherInfo")}
                              value={this.state.eOtherInfo}
                            />
                          }
                          label="Edit other therapist/client info"
                        />

                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={this.state.vOtherInfo}
                              onChange={this.handleChangeChecked("vOtherInfo")}
                              value={this.state.vOtherInfo}
                            />
                          }
                          label="View other therapist/client info"
                        />
                      </FormGroup>
                    </FormControl>
                    <FormControl
                      component="fieldset"
                      className={classes.formControl}
                    >
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={this.state.addCli}
                              //  onChange={this.handleChangeChecked("addCli")}
                              value={this.state.addCli}
                            />
                          }
                          label="Add client"
                        />

                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={this.state.recAtt}
                              // onChange={this.handleChangeChecked("recAtt")}
                              value={this.state.recAtt}
                            />
                          }
                          label="Record Attendance"
                        />

                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={this.state.vNote}
                              // onChange={this.handleChangeChecked("vNote")}
                              value={this.state.vNote}
                            />
                          }
                          label="View note history"
                        />

                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={this.state.takePay}
                              // onChange={this.handleChangeChecked("takePay")}
                              value={this.state.takePay}
                            />
                          }
                          label="Take payment"
                        />

                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={this.state.vCreateRep}
                              onChange={this.handleChangeChecked("vCreateRep")}
                              value={this.state.vCreateRep}
                            />
                          }
                          label="View/create reports"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={this.state.vOwnCal}
                              // onChange={this.handleChangeChecked("vOwnCal")}
                              value={this.state.vOwnCal}
                            />
                          }
                          label="View own calendar"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={this.state.vOwnCli}
                              // onChange={this.handleChangeChecked("vOwnCli")}
                              value={this.state.vOwnCli}
                            />
                          }
                          label="View own clients"
                        />
                      </FormGroup>
                    </FormControl>
                  </MuiThemeProvider>
                </Grid>
              ) : null}
              <Grid
                container
                // direction="column"
                justify="flex-end"
                //alignItems="flex-end"
              >
                <Button
                  className={classes.saveButton}
                  onClick={() => {
                    this.onSavePriv();
                  }}
                  size="large"
                  variant="contained"
                >
                  Save
                </Button>
              </Grid>
            </Paper>
          )}
        </Container>
      </div>
    );
  }
}

MemberDetails.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(MemberDetails));
