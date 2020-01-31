import React from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import NoteHistoryTable from "../Tables/noteHistoryTable";
import Cyan from "@material-ui/core/colors/cyan";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import InputMask from "react-input-mask";
//import InputAdornment from "@material-ui/core/InputAdornment";

import MySnackbarContentWrapper from "../common/MySnackbarContentWrapper";

import API from "../utils/API";

const styles = theme => ({
  root: {
    marginTop: theme.spacing(10),
    align: "center",
    width: "100%",
    height: "120"
  },

  clientAvatar: {
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
    //marginRight: theme.spacing(1) * 20
  },

  toggle: {
    paddingRight: theme.spacing(1) * 30
  },

  marg: {
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },

  input: {
    display: "none"
  },

  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    //marginBottom: theme.spacing(1),
    width: 300
  },

  textField2: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: 200
  },

  textField3: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: 200
  },

  textFieldSession: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(6),
    width: 300
  },

  textFieldNotes: {
    //marginLeft: theme.spacing(1),
    //marginRight: theme.spacing(1),
    //marginBottom: theme.spacing(2),
    width: 938
  },

  textFieldAlign: {
    marginRight: theme.spacing(50),
    width: 300
    // marginBottom: theme.spacing(5)
  },

  textFieldTest: {
    marginRight: theme.spacing(79),
    width: 300
  },

  textFieldGoal: {
    marginLeft: theme.spacing(10),
    ///marginTop: theme.spacing(1),
    width: 800
  },

  textFieldObj: {
    marginLeft: theme.spacing(20),
    ///marginTop: theme.spacing(1),
    width: 800
  },

  menu: {
    width: 200
  },

  checked: {},

  root2: {
    //flexGrow: 1,
    //backgroundColor: theme.palette.background.paper,
    //marginLeft: theme.spacing(1) * 22,
    //marginRight: theme.spacing(1) * 22,
    //marginTop: theme.spacing(1) * 22,
    width: "100%",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: Cyan[800]
  },

  infoRoot: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },

  margin: {
    margin: theme.spacing(1)
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
  },

  checkBoxPadding: {
    paddingBottom: theme.spacing(2)
  },

  goalButton: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    /* this is text color */ color: theme.palette.getContrastText("#b2dfdb"),
    backgroundColor: "#b2dfdb",
    "&:hover": {
      backgroundColor: "#80cbc4"
    }
  },

  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.dark
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
});

const theme = createMuiTheme({
  palette: {
    primary: { main: "#b2dfdb" }
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

class ClientDetails extends React.Component {
  state = {
    anchorEl: null,
    clientData: [],
    therapistData: [],
    selectedIndex: null,
    checkedA: false,
    client: "Jaren Jones",
    clientInitials: "",
    open: false,
    cost: "",
    length: "",
    clientType: "Individual",
    tabValue: 0,
    snackbarOpenWarning: false,
    snackbarOpenSuccess: false,
    snackbarOpenError: false,
    // CLIENT INFO TAB
    clientFirstName: "Jaren",
    clientFacility: null,
    clientLastName: "Jones",
    clientEmail: "jjones@mail.com",
    clientTitle: "Mr.",
    clientTherapist: "Harry Potter",
    sessionLength: "30",
    sessionCost: "$40",
    sessionType: "Therapy",
    clientCurrentPassword: "test123",
    clientConfirmPassword: "test123",
    clientPhone: "123-456-1111",
    clientStreetAddress: "123 Maple Street",
    clientBday: "2/20/1998",
    clientCity: "Plano",
    clientZipCode: "75023",
    clientState: "TX",
    clientNotes: "",
    multiline: "Controlled",
    deleteDialog: false,
    // CONTACT TAB
    // first contact
    contactFirstName: null,
    contactLastName: null,
    contactEmail: null,
    contactAddress: null,
    contactTitle: null,
    contactPhone: null,
    contactCity: null,
    contactState: null,
    contactZip: null,
    contact2ndPhone: null,
    // second contact
    checkedContact2: null,
    contact2FirstName: null,
    contact2LastName: null,
    contact2Email: null,
    contact2CheckedRecEmails: null,
    contact2Title: null,
    contact2Phone: null,
    contact2PhoneSec: null,
    contact2Address: null,
    contact2City: null,
    contact2State: null,
    contact2Zip: null,
    // third contact
    checkedContact3: null,
    contact3FirstName: null,
    contact3LastName: null,
    contact3Email: null,
    contact3CheckedRecEmails: null,
    contact3Title: null,
    contact3Phone: null,
    contact3PhoneSec: null,
    contact3Address: null,
    contact3City: null,
    contact3State: null,
    // multiline: "Controlled"
    // PAYOR TAB
    billingFirstName: "Jack",
    billingLastName: "Jones",
    nameOnCard: "Jack A. Jones",
    cardNum: "111122223333",
    payorEmail: "jackjones@mail.com",
    paymentType: "Card",
    billingPhone: "123-456-1111",
    billingAddress: "123 Maple Street",
    billingCity: "Plano",
    billingZip: "75023",
    billingState: "TX",
    cvv: "000",
    expDate: "03/17",
    cardType: "Visa",

    billSameAsContact: false,
    // GOALS TAB
    // add goals
    addGoal1: null,
    addGoal2: null,
    addGoal3: null,
    addGoal4: null,
    addGoal5: null,
    addGoal6: null,
    addGoal7: null,
    addGoal8: null,
    addGoal9: null,
    addGoal10: null,
    //1
    goal1: null,
    obj1_1: null,
    obj1_2: null,
    obj1_3: null,
    // 2
    goal2: null,
    obj2_1: null,
    obj2_2: null,
    obj2_3: null,
    //3
    goal3: null,
    obj3_1: null,
    obj3_2: null,
    obj3_3: null,
    //4
    goal4: null,
    obj4_1: null,
    obj4_2: null,
    obj4_3: null,
    //5
    goal5: null,
    obj5_1: null,
    obj5_2: null,
    obj5_3: null,
    //6
    goal6: null,
    obj6_1: null,
    obj6_2: null,
    obj6_3: null,
    //7
    goal7: null,
    obj7_1: null,
    obj7_2: null,
    obj7_3: null,
    //8
    goal8: null,
    obj8_1: null,
    obj8_2: null,
    obj8_3: null,
    //9
    goal9: null,
    obj9_1: null,
    obj9_2: null,
    obj9_3: null,
    //10
    goal10: null,
    obj10_1: null,
    obj10_2: null,
    obj10_3: null,
    // active goals
    activeGoal1: false,
    activeGoal2: false,
    activeGoal3: false,
    activeGoal4: false,
    activeGoal5: false,
    activeGoal6: false,
    activeGoal7: false,
    activeGoal8: false,
    activeGoal9: false,
    activeGoal10: false,
    deleteSuccessSnackbarOpen: false,
    deleteFailureSnackbarOpen: false,
    deleteClientErrorMsg: ""
  };

  handleClickAvatar = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleCloseAvatar = () => {
    this.setState({ anchorEl: null });
  };

  handleChangeChecked = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  /* change of client dropdown */
  handleChange = name => event => {
    this.setState({ [name]: event.target.value }, () => {
      if (name === "client") this.changeContentWithClientId();
    });
  };

  handleChangeTabs = (event, tabValue) => {
    this.setState({ tabValue });
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

  handleSnackbarClose = () => {
    this.setState({ deleteFailureSnackbarOpen: false });
  };

  handleDelete = () => {
    API.delete(`/clients/${this.state.client}`)
      .then(resp => {
        this.props.history.push("/clients");
      })
      .catch(error => {
        console.log("ee", error);
        this.setState({
          deleteFailureSnackbarOpen: true,
          deleteClientErrorMsg: error
        });
      });
    this.handleDeleteDialogClose();
  };

  handleChangeChecked = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  //action for contact 2 checkbox
  handleChangeCheck2 = name => event => {
    this.setState({
      [name]: event.target.checked,
      //this will set the values to blank once contact 3 is checked
      contact2FirstName: null,
      contact2LastName: null,
      contact2Email: null,
      contact2CheckedRecEmails: null,
      contact2Title: null,
      contact2Phone: null,
      contact2PhoneSec: null,
      contact2Address: null,
      contact2City: null,
      contact2State: null,
      contact2Zip: null,

      // contact 3,
      checkedContact3: false,
      contact3FirstName: null,
      contact3LastName: null,
      contact3Email: null,
      contact3CheckedRecEmails: null,
      contact3Title: null,
      contact3Phone: null,
      contact3PhoneSec: null,
      contact3Address: null,
      contact3City: null,
      contact3State: null,
      contact3Zip: null
    });
  };

  // action for contact 3 checkbox
  handleChangeCheck3 = name => event => {
    this.setState({
      [name]: event.target.checked,
      //this will set the values to blank once contact 3 is checked
      contact3FirstName: null,
      contact3LastName: null,
      contact3Email: null,
      contact3CheckedRecEmails: null,
      contact3Title: null,
      contact3Phone: null,
      contact3PhoneSec: null,
      contact3Address: null,
      contact3City: null,
      contact3State: null,
      contact3Zip: null
    });
  };

  handleGoalActive = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleAdd1stGoal = name => event => {
    this.setState({
      [name]: event.target.checked,
      activeGoal1: !this.state.activeGoal1,
      addGoal1: !this.state.addGoal1,
      goal1: null,
      obj1_1: null,
      obj1_2: null,
      obj1_3: null
    });
    console.log(this.state.addGoal1);
  };

  handleAdd2ndGoal = name => event => {
    this.setState({
      [name]: event.target.checked,
      activeGoal2: !this.state.activeGoal2,
      addGoal2: !this.state.addGoal2,
      goal2: null,
      obj2_1: null,
      obj2_2: null,
      obj2_3: null
    });
  };

  handleAdd3rdGoal = name => event => {
    this.setState({
      [name]: event.target.checked,
      activeGoal3: !this.state.activeGoal3,
      addGoal3: !this.state.addGoal3,
      goal3: null,
      obj3_1: null,
      obj3_2: null,
      obj3_3: null
    });
  };

  handleAdd4thGoal = name => event => {
    this.setState({
      [name]: event.target.checked,
      activeGoal4: !this.state.activeGoal4,
      addGoal4: !this.state.addGoal4,
      goal4: null,
      obj4_1: null,
      obj4_2: null,
      obj4_3: null
    });
  };

  handleAdd5thGoal = name => event => {
    this.setState({
      [name]: event.target.checked,
      activeGoal5: !this.state.activeGoal5,
      addGoal5: !this.state.addGoal5,
      goal5: null,
      obj5_1: null,
      obj5_2: null,
      obj5_3: null
    });
  };

  handleAdd6thGoal = name => event => {
    this.setState({
      [name]: event.target.checked,
      activeGoal6: !this.state.activeGoal6,
      addGoal6: !this.state.addGoal6,
      goal6: null,
      obj6_1: null,
      obj6_2: null,
      obj6_3: null
    });
  };

  handleAdd7thGoal = name => event => {
    this.setState({
      [name]: event.target.checked,
      activeGoal7: !this.state.activeGoal7,
      addGoal7: !this.state.addGoal7,
      goal7: null,
      obj7_1: null,
      obj7_2: null,
      obj7_3: null
    });
  };

  handleAdd8thGoal = name => event => {
    this.setState({
      [name]: event.target.checked,
      activeGoal8: !this.state.activeGoal8,
      addGoal8: !this.state.addGoal8,
      goal8: null,
      obj8_1: null,
      obj8_2: null,
      obj8_3: null
    });
  };

  handleAdd9thGoal = name => event => {
    this.setState({
      [name]: event.target.checked,
      activeGoal9: !this.state.activeGoal9,
      addGoal9: !this.state.addGoal9,
      goal9: null,
      obj9_1: null,
      obj9_2: null,
      obj9_3: null
    });
  };

  handleAdd10thGoal = name => event => {
    this.setState({
      [name]: event.target.checked,
      activeGoal10: !this.state.activeGoal10,
      addGoal10: !this.state.addGoal10,
      goal10: null,
      obj10_1: null,
      obj10_2: null,
      obj10_3: null
    });
  };

  async componentDidMount() {
    try {
      const therapistsResp = await API.get("/members/getTherapists");
      const clientsResp = await API.get("/clients/all");
      // console.log(clientsResp);
      const therapists = therapistsResp.data.data;
      const clients = clientsResp.data.data;
      //   console.log(clients);
      this.setState(
        {
          therapistData: therapists,
          clientData: clients,
          client: this.props.location.state.curClientId
        },
        () => {
          this.changeContentWithClientId();
        }
      );
    } catch (error) {
      console.log("Client data fetching error: ", error);
    }
  }

  async componentDidMountPostSave() {
    try {
      const therapistsResp = await API.get("/members/getTherapists");
      const clientsResp = await API.get("/clients/all");
      const therapists = therapistsResp.data.data;
      const clients = clientsResp.data.data;
      this.setState({
        therapistData: therapists,
        clientData: clients
      });
      this.setState({ client: this.state.client }, () => {
        console.log("post-save client ID: ", this.state.client);
        this.changeContentWithClientId();
        //this.changeInitialsWithMemberId();
      });
    } catch (error) {
      console.log("Data fetching error: ", error);
    }
  }

  changeContentWithClientId() {
    const client = this.state.clientData.find(
      ({ id }) => id === this.state.client
    );
    if (client) {
      const {
        id,
        initials,
        active,
        client_type,
        client_full_name,
        client_first_name,
        client_last_name,
        email,
        title,
        assi_therapist_full_name,
        facility,
        session_length,
        session_cost,
        session_type,
        phone,
        street_address,
        bday,
        city,
        zip,
        state,
        notes,
        // Contact tab
        // first contact
        contact_title,
        contact_first_name,
        contact_last_name,
        contact_email,
        contact_street_address,
        contact_phone,
        contact_city,
        contact_state,
        contact_zip,
        contact_sec_phone,
        contact_rec_email,
        // second contact
        contact2_active,
        contact2_title,
        contact2_first_name,
        contact2_last_name,
        contact2_email,
        contact2_street_address,
        contact2_phone,
        contact2_city,
        contact2_state,
        contact2_zip,
        contact2_sec_phone,
        contact2_rec_email,
        // 3rd contact
        contact3_active,
        contact3_title,
        contact3_first_name,
        contact3_last_name,
        contact3_email,
        contact3_street_address,
        contact3_phone,
        contact3_city,
        contact3_state,
        contact3_zip,
        contact3_sec_phone,
        contact3_rec_email,
        // Payor tab
        bill_same_as_contact,
        billing_first_name,
        billing_last_name,
        name_on_card,
        card_num,
        payment_type,
        billing_phone,
        billing_street_address,
        billing_city,
        billing_zip,
        billing_state,
        cvv,
        card_exp_date,
        card_type,
        //goals
        // goal 1
        addgoal1,
        goal1_active,
        goal1_desc,
        obj1_1_desc,
        obj1_2_desc,
        obj1_3_desc,
        // goal 2
        addgoal2,
        goal2_active,
        goal2_desc,
        obj2_1_desc,
        obj2_2_desc,
        obj2_3_desc,
        // goal 3
        addgoal3,
        goal3_active,
        goal3_desc,
        obj3_1_desc,
        obj3_2_desc,
        obj3_3_desc,
        // goal 4
        addgoal4,
        goal4_active,
        goal4_desc,
        obj4_1_desc,
        obj4_2_desc,
        obj4_3_desc,
        // goal 5
        addgoal5,
        goal5_active,
        goal5_desc,
        obj5_1_desc,
        obj5_2_desc,
        obj5_3_desc,
        // goal 6
        addgoal6,
        goal6_active,
        goal6_desc,
        obj6_1_desc,
        obj6_2_desc,
        obj6_3_desc,
        // goal 7
        addgoal7,
        goal7_active,
        goal7_desc,
        obj7_1_desc,
        obj7_2_desc,
        obj7_3_desc,
        // goal 8
        addgoal8,
        goal8_active,
        goal8_desc,
        obj8_1_desc,
        obj8_2_desc,
        obj8_3_desc,
        // goal 9
        addgoal9,
        goal9_active,
        goal9_desc,
        obj9_1_desc,
        obj9_2_desc,
        obj9_3_desc,
        // goal 10
        addgoal10,
        goal10_active,
        goal10_desc,
        obj10_1_desc,
        obj10_2_desc,
        obj10_3_desc
      } = client;
      console.log(client);
      this.setState({
        client: id,
        clientType: client_type,
        checkedA: active,
        clientInitials: initials,
        // CLIENT INFO TAB
        clientFirstName: client_first_name,
        clientFacility: facility,
        clientLastName: client_last_name,
        clientEmail: email,
        clientTitle: title,
        clientTherapist: assi_therapist_full_name,
        sessionLength: session_length,
        sessionCost: session_cost,
        sessionType: session_type,
        clientPhone: phone,
        clientStreetAddress: street_address,
        clientBday: bday,
        clientCity: city,
        clientZipCode: zip,
        clientState: state,
        clientNotes: notes,
        multiline: "Controlled",
        deleteDialog: false,
        // CONTACT TAB
        contactFirstName: contact_first_name || null,
        contactLastName: contact_last_name || null,
        contactEmail: contact_email || null,
        contactAddress: contact_street_address || null,
        contactTitle: contact_title || null,
        contactPhone: contact_phone || null,
        contactCity: contact_city || null,
        contactState: contact_state || null,
        contactZip: contact_zip || null,
        contact2ndPhone: contact_sec_phone || null,
        contactCheckedRecEmails: contact_rec_email || false,
        // second contact
        checkedContact2: contact2_active || false,
        contact2FirstName: contact2_first_name || null,
        contact2LastName: contact2_last_name || null,
        contact2Email: contact2_email || null,
        contact2CheckedRecEmails: contact2_rec_email || false,
        contact2Title: contact2_title || null,
        contact2Phone: contact2_phone || null,
        contact2PhoneSec: contact2_sec_phone || null,
        contact2Address: contact2_street_address || null,
        contact2City: contact2_city || null,
        contact2State: contact2_state || null,
        contact2Zip: contact2_zip || null,
        // third contact
        checkedContact3: contact3_active || false,
        contact3FirstName: contact3_first_name || null,
        contact3LastName: contact3_last_name || null,
        contact3Email: contact3_email || null,
        contact3CheckedRecEmails: contact3_rec_email || false,
        contact3Title: contact3_title || null,
        contact3Phone: contact3_phone || null,
        contact3PhoneSec: contact3_sec_phone || null,
        contact3Address: contact3_street_address || null,
        contact3City: contact3_city || null,
        contact3State: contact3_state || null,
        contact3Zip: contact3_zip || null,
        // multiline: "Controlled"
        // PAYOR TAB
        billSameAsContact: bill_same_as_contact || false,
        billingFirstName: billing_first_name || null,
        billingLastName: billing_last_name || null,
        nameOnCard: name_on_card || null,
        cardNum: card_num || null,
        payorEmail: email || null,
        paymentType: payment_type || null,
        billingPhone: billing_phone || null,
        billingAddress: billing_street_address || null,
        billingCity: billing_city || null,
        billingZip: billing_zip || null,
        billingState: billing_state || null,
        cvv: cvv || null,
        expDate: card_exp_date || null,
        cardType: card_type || null,
        // GOALS TAB
        // goal 1
        addGoal1: addgoal1 || false,
        activeGoal1: goal1_active || false,
        goal1: goal1_desc || null,
        obj1_1: obj1_1_desc || null,
        obj1_2: obj1_2_desc || null,
        obj1_3: obj1_3_desc || null,
        // goal 2
        addGoal2: addgoal2 || false,
        activeGoal2: goal2_active || false,
        goal2: goal2_desc || null,
        obj2_1: obj2_1_desc || null,
        obj2_2: obj2_2_desc || null,
        obj2_3: obj2_3_desc || null,
        // goal 3
        addGoal3: addgoal3 || false,
        activeGoal3: goal3_active || false,
        goal3: goal3_desc || null,
        obj3_1: obj3_1_desc || null,
        obj3_2: obj3_2_desc || null,
        obj3_3: obj3_3_desc || null,
        // goal 4
        addGoal4: addgoal4 || false,
        activeGoal4: goal4_active || false,
        goal4: goal4_desc || null,
        obj4_1: obj4_1_desc || null,
        obj4_2: obj4_2_desc || null,
        obj4_4: obj4_3_desc || null,
        // goal 5
        addGoal5: addgoal5 || false,
        activeGoal5: goal5_active || false,
        goal5: goal5_desc || null,
        obj5_1: obj5_1_desc || null,
        obj5_2: obj5_2_desc || null,
        obj5_3: obj5_3_desc || null,
        // goal 6
        addGoal6: addgoal6 || false,
        activeGoal6: goal6_active || false,
        goal6: goal6_desc || null,
        obj6_1: obj6_1_desc || null,
        obj6_2: obj6_2_desc || null,
        obj6_3: obj6_3_desc || null,
        // goal 7
        addGoal7: addgoal7 || false,
        activeGoal7: goal7_active || false,
        goal7: goal7_desc || null,
        obj7_1: obj7_1_desc || null,
        obj7_2: obj7_2_desc || null,
        obj7_3: obj7_3_desc || null,
        // goal 8
        addGoal8: addgoal8 || false,
        activeGoal8: goal8_active || false,
        goal8: goal8_desc || null,
        obj8_1: obj8_1_desc || null,
        obj8_2: obj8_2_desc || null,
        obj8_3: obj8_3_desc || null,
        // goal 9
        addGoal9: addgoal9 || false,
        activeGoal9: goal9_active || false,
        goal9: goal9_desc || null,
        obj9_1: obj9_1_desc || null,
        obj9_2: obj9_2_desc || null,
        obj9_3: obj9_3_desc || null,
        // goal 10
        addGoal10: addgoal10 || false,
        activeGoal10: goal10_active || false,
        goal10: goal10_desc || null,
        obj10_1: obj10_1_desc || null,
        obj10_2: obj10_2_desc || null,
        obj10_3: obj10_3_desc || null
      });
    }
  }

  onSaveInfo() {
    //experiment keeping preventDefault
    //e.preventDefault();

    const clientObj = {
      id: this.state.client,
      clientType: this.state.clientType,
      checkedA: this.state.checkedA,
      //clientInitials: this.state.clientInitials,
      // CLIENT INFO TAB
      clientFullName:
        this.state.clientFirstName + " " + this.state.clientLastName,
      clientFirstName: this.state.clientFirstName,
      clientFacility: this.state.clientFacility,
      clientLastName: this.state.clientLastName,
      clientEmail: this.state.clientEmail,
      clientTitle: this.state.clientTitle,
      clientTherapist: this.state.clientTherapist,
      sessionLength: this.state.sessionLength,
      sessionCost: this.state.sessionCost,
      sessionType: this.state.sessionType,
      clientPhone: this.state.clientPhone,
      clientStreetAddress: this.state.clientStreetAddress,
      clientBday: this.state.clientBday,
      clientCity: this.state.clientCity,
      clientZipCode: this.state.clientZipCode,
      clientState: this.state.clientState,
      clientNotes: this.state.clientNotes
    };

    API.put("/clients/updateclientinfo", clientObj)
      // .then(res => console.log(res.data));
      .then(async res => {
        this.setState({
          clientObj,
          // redirect: true
          infoValidationBox: true
        });
        await this.componentDidMountPostSave();
      });
  }

  onSaveContactInfo() {
    //experiment keeping preventDefault
    //e.preventDefault();

    const clientContactObj = {
      id: this.state.client,
      // contact 1
      contactFirstName: this.state.contactFirstName,
      contactLastName: this.state.contactLastName,
      contactEmail: this.state.contactEmail,
      contactAddress: this.state.contactAddress,
      contactTitle: this.state.contactTitle,
      contactPhone: this.state.contactPhone,
      contactCity: this.state.contactCity,
      contactState: this.state.contactState,
      contactZip: this.state.contactZip,
      contact2ndPhone: this.state.contact2ndPhone,
      contactCheckedRecEmails: this.state.contactCheckedRecEmails,
      // contact 2
      checkedContact2: this.state.checkedContact2,
      contact2FirstName: this.state.contact2FirstName,
      contact2LastName: this.state.contact2LastName,
      contact2Email: this.state.contact2Email,
      contact2Address: this.state.contact2Address,
      contact2Title: this.state.contact2Title,
      contact2Phone: this.state.contact2Phone,
      contact2City: this.state.contact2City,
      contact2State: this.state.contact2State,
      contact2Zip: this.state.contact2Zip,
      contact2PhoneSec: this.state.contact2PhoneSec,
      contact2CheckedRecEmails: this.state.contact2CheckedRecEmails,
      // contact 3
      checkedContact3: this.state.checkedContact3,
      contact3FirstName: this.state.contact3FirstName,
      contact3LastName: this.state.contact3LastName,
      contact3Email: this.state.contact3Email,
      contact3Address: this.state.contact3Address,
      contact3Title: this.state.contact3Title,
      contact3Phone: this.state.contact3Phone,
      contact3City: this.state.contact3City,
      contact3State: this.state.contact3State,
      contact3Zip: this.state.contact3Zip,
      contact3PhoneSec: this.state.contact3PhoneSec,
      contact3CheckedRecEmails: this.state.contact3CheckedRecEmails
    };

    API.put("/clients/updatecontactinfo", clientContactObj)
      // .then(res => console.log(res.data));
      .then(async res => {
        this.setState({
          clientContactObj,
          // redirect: true
          infoValidationBox: true
        });
      });
  }

  onSaveBillingInfo() {
    //experiment keeping preventDefault
    //e.preventDefault();

    const clientBillingObj = {
      id: this.state.client,
      // billing info
      billSameAsContact: this.state.billSameAsContact,
      billingFirstName: this.state.billingFirstName,
      billingLastName: this.state.billingLastName,
      payorEmail: this.state.payorEmail,
      paymentType: this.state.paymentType,
      billingPhone: this.state.billingPhone,
      billingAddress: this.state.billingAddress,
      billingCity: this.state.billingCity,
      billingZip: this.state.billingZip,
      billingState: this.state.billingState
    };

    API.put("/clients/updatebillinginfo", clientBillingObj)
      // .then(res => console.log(res.data));
      .then(async res => {
        this.setState({
          clientBillingObj,
          // redirect: true
          infoValidationBox: true
        });
      });
  }

  onSaveGoals() {
    //experiment keeping preventDefault
    //e.preventDefault();

    const clientGoalObj = {
      id: this.state.client,
      // goal 1
      addgoal1: this.state.addGoal1,
      activeGoal1: this.state.activeGoal1,
      goal1: this.state.goal1,
      obj1_1: this.state.obj1_1,
      obj1_2: this.state.obj1_2,
      obj1_3: this.state.obj1_3,
      // goal 2
      addgoal2: this.state.addGoal2,
      activeGoal2: this.state.activeGoal2,
      goal2: this.state.goal2,
      obj2_1: this.state.obj2_1,
      obj2_2: this.state.obj2_2,
      obj2_3: this.state.obj2_3,
      // goal 3
      addgoal3: this.state.addGoal3,
      activeGoal3: this.state.activeGoal3,
      goal3: this.state.goal3,
      obj3_1: this.state.obj3_1,
      obj3_2: this.state.obj3_2,
      obj3_3: this.state.obj3_3,
      // goal 4
      addgoal4: this.state.addGoal4,
      activeGoal4: this.state.activeGoal4,
      goal4: this.state.goal4,
      obj4_1: this.state.obj4_1,
      obj4_2: this.state.obj4_2,
      obj4_3: this.state.obj4_3,
      // goal 5
      addgoal5: this.state.addGoal5,
      activeGoal5: this.state.activeGoal5,
      goal5: this.state.goal5,
      obj5_1: this.state.obj5_1,
      obj5_2: this.state.obj5_2,
      obj5_3: this.state.obj5_3,
      // goal 6
      addgoal6: this.state.addGoal6,
      activeGoal6: this.state.activeGoal6,
      goal6: this.state.goal6,
      obj6_1: this.state.obj6_1,
      obj6_2: this.state.obj6_2,
      obj6_3: this.state.obj6_3,
      // goal 7
      addgoal7: this.state.addGoal7,
      activeGoal7: this.state.activeGoal7,
      goal7: this.state.goal7,
      obj7_1: this.state.obj7_1,
      obj7_2: this.state.obj7_2,
      obj7_3: this.state.obj7_3,
      // goal 8
      addgoal8: this.state.addGoal8,
      activeGoal8: this.state.activeGoal8,
      goal8: this.state.goal8,
      obj8_1: this.state.obj8_1,
      obj8_2: this.state.obj8_2,
      obj8_3: this.state.obj8_3,
      // goal 9
      addgoal9: this.state.addGoal9,
      activeGoal9: this.state.activeGoal9,
      goal9: this.state.goal9,
      obj9_1: this.state.obj9_1,
      obj9_2: this.state.obj9_2,
      obj9_3: this.state.obj9_3,
      // goal 10
      addgoal10: this.state.addGoal10,
      activeGoal10: this.state.activeGoal10,
      goal10: this.state.goal10,
      obj10_1: this.state.obj10_1,
      obj10_2: this.state.obj10_2,
      obj10_3: this.state.obj10_3
    };

    API.put("/clients/updategoals", clientGoalObj)
      // .then(res => console.log(res.data));
      .then(async res => {
        this.setState({
          clientGoalObj,
          // redirect: true
          infoValidationBox: true
        });
      });
  }

  componentWillUnmount() {}

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
              className={classes.clientAvatar}
              onClick={this.handleClickAvatar}
            >
              {this.state.clientInitials}
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              // anchorOrigin={{ vertical: "center", horizontal: "center" }}
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
                <MenuItem onClick={this.handleCloseAvatar}>
                  Upload Picture{" "}
                </MenuItem>
              </label>
              <MenuItem onClick={this.handleCloseAvatar}>
                Remove Picture
              </MenuItem>
            </Menu>
          </Grid>
          <Paper className={classes.root} elevation={2}>
            <Grid container justify="flex-start">
              <MuiThemeProvider theme={theme}>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.checkedA}
                        onChange={this.handleChangeChecked("checkedA")}
                        value="checkedA"
                        className={classes.marg}
                        color="primary"
                      />
                    }
                    label="Active"
                  />
                </FormGroup>
              </MuiThemeProvider>
            </Grid>

            {/* client drop down */}
            <Grid container justify="space-between">
              <TextField
                required
                id="newClient"
                select
                label="Client"
                className={classes.textField}
                value={this.state.client}
                onChange={this.handleChange("client")}
                //helperText="Please select your currency"
                margin="normal"
                variant="outlined"
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
              >
                {clientData.map(option => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.client_full_name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                required
                id="client-type"
                label="Client Type"
                variant="outlined"
                className={classes.textField}
                value={this.state.clientType}
                margin="normal"
              />
            </Grid>
          </Paper>

          <AppBar className={classes.root2} position="static">
            <Tabs
              indicatorColor="primary"
              value={tabValue}
              onChange={this.handleChangeTabs}
            >
              <Tab label="Client Information" />
              <Tab label="Contact Information" />
              <Tab label="Payor Information" />
              <Tab label="Note History" />
              <Tab label="Message History" />
              <Tab label="Goals & Objectives" />
            </Tabs>
          </AppBar>

          {tabValue === 0 && (
            <form
              /* className={classes.container} */ noValidate
              autoComplete="off"
            >
              <Paper className={classes.infoRoot} elevation={2}>
                <Grid container justify="center" alignItems="center">
                  <TextField
                    id="standard-select-member"
                    select
                    margin="normal"
                    label="Client Type"
                    variant="outlined"
                    className={classes.textField2}
                    value={this.state.clientType}
                    onChange={this.handleChange("clientType")}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu
                      }
                    }}
                  >
                    {clientTypes.map((option, i) => (
                      <MenuItem key={i} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid container justify="center" alignItems="center">
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
                  <MuiThemeProvider theme={theme}>
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
                  </MuiThemeProvider>
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

                  <TextField
                    id="standard-address"
                    variant="outlined"
                    label="Address"
                    className={classes.textField}
                    value={this.state.clientStreetAddress}
                    onChange={this.handleChange("clientStreetAddress")}
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

                  <InputMask
                    mask="99999"
                    //maskPlaceholder=""
                    maskChar={null}
                    value={this.state.clientZipCode}
                    onChange={this.handleChange("clientZipCode")}
                    className={classes.textField}
                  >
                    {() => (
                      <TextField
                        id="standard-zipCode"
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
                    value={this.state.clientPhone}
                    onChange={this.handleChange("clientPhone")}
                    className={classes.textField}
                  >
                    {() => (
                      <TextField
                        id="standard-phone"
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
                    value={this.state.clientBday}
                    onChange={this.handleChange("clientBday")}
                    className={classes.textField}
                  >
                    {() => (
                      <TextField
                        id="standard-bday"
                        label="Birthday"
                        variant="outlined"
                        placeholder="MM/DD/YYYY"
                        className={classes.textField}
                        margin="normal"
                        // type="text"
                      />
                    )}
                  </InputMask>

                  {/* insert facility name here */}

                  {this.state.clientType === "Facility" ? (
                    <TextField
                      required
                      id="standard-facility-name"
                      label="Facility Name"
                      variant="outlined"
                      className={classes.textFieldTest}
                      value={this.state.clientFacility}
                      onChange={this.handleChange("clientFacility")}
                      margin="normal"
                    />
                  ) : null}
                  <Grid container justify="center" alignItems="center">
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
                    />
                    {/*      <TextField
                      id="standard-length"
                      label="Session Length (minutes)"
                      variant="outlined"
                      className={classes.textFieldSession}
                      value={this.state.sessionLength}
                      onChange={this.handleChange("sessionLength")}
                      margin="normal"
                    /> */}
                    <InputMask
                      mask="999"
                      //maskPlaceholder=""
                      maskChar={null}
                      value={this.state.sessionLength}
                      onChange={this.handleChange("sessionLength")}
                      className={classes.textFieldSession}
                    >
                      {() => (
                        <TextField
                          id="standard-length"
                          label="Session Length (minutes)"
                          variant="outlined"
                          //placeholder="MM/DD/YYYY"
                          className={classes.textFieldSession}
                          margin="normal"
                          // type="text"
                        />
                      )}
                    </InputMask>
                    <Grid container justify="center" alignItems="center">
                      <TextField
                        id="standard-select-therapist"
                        select
                        label="Therapist"
                        variant="outlined"
                        margin="normal"
                        className={classes.textFieldTest}
                        value={this.state.clientTherapist}
                        onChange={this.handleChange("clientTherapist")}
                        SelectProps={{
                          MenuProps: {
                            className: classes.menu
                          }
                        }}
                      >
                        {therapistData.map(option => (
                          <MenuItem
                            key={option.id}
                            value={option.member_full_name}
                          >
                            {option.member_full_name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>
                  <Grid container justify="center">
                    <MuiThemeProvider theme={theme}>
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
                  <Grid container justify="space-between">
                    <Button
                      className={classes.deleteButton}
                      size="large"
                      variant="contained"
                      onClick={this.handleDeleteDialogOpen}
                    >
                      Delete
                    </Button>
                    <Snackbar
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right"
                      }}
                      open={this.state.deleteFailureSnackbarOpen}
                      onClose={this.handleSnackbarClose}
                      autoHideDuration={3000}
                    >
                      <MySnackbarContentWrapper
                        variant="error"
                        className={classes.margin}
                        message={`Something went wrong while removing client: ${this.state.deleteClientErrorMsg}`}
                      />
                    </Snackbar>
                    <Dialog
                      open={this.state.deleteDialog}
                      onClose={this.handleDeleteDialogClose}
                    >
                      <DialogTitle>
                        Are you sure you want to delete this client?
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Once this client has been deleted, it cannot be
                          undone. If this client has references elsewhere, this
                          client will be marked as inactive.
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={this.handleDeleteDialogClose}>
                          No
                        </Button>
                        <Button onClick={this.handleDelete} autoFocus>
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
                </Grid>
              </Paper>
            </form>
          )

          /* <ClientInfo />*/
          }
          {tabValue === 1 && (
            <form className={classes.container} noValidate autoComplete="off">
              <Paper className={classes.infoRoot} elevation={2}>
                {/*  Contact 1 */}
                <Grid container justify="center" alignItems="center">
                  <MuiThemeProvider theme={theme}>
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
                  </MuiThemeProvider>
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
                  <InputMask
                    mask="99999"
                    //maskPlaceholder=""
                    maskChar={null}
                    value={this.state.contactZip}
                    onChange={this.handleChange("contactZip")}
                    className={classes.textField}
                  >
                    {() => (
                      <TextField
                        id="standard-contactZip"
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
                    value={this.state.contactPhone}
                    onChange={this.handleChange("contactPhone")}
                    className={classes.textField}
                  >
                    {() => (
                      <TextField
                        id="standard-contactPhone"
                        label="Phone Number"
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
                    value={this.state.contact2ndPhone}
                    onChange={this.handleChange("contact2ndPhone")}
                    className={classes.textField}
                  >
                    {() => (
                      <TextField
                        id="standard-contactPhone2"
                        label="Secondary Phone Number"
                        variant="outlined"
                        className={classes.textField}
                        margin="normal"
                        // type="text"
                      />
                    )}
                  </InputMask>
                  <Grid container justify="center">
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
                    <MuiThemeProvider theme={theme}>
                      <FormGroup className={classes.alignCheck} row>
                        <FormControlLabel
                          control={
                            <Checkbox
                              color="primary"
                              checked={Boolean(
                                this.state.contactCheckedRecEmails
                              )}
                              onChange={this.handleChangeChecked(
                                "contactCheckedRecEmails"
                              )}
                              classes={{
                                root: classes.checkedRoot,
                                checked: classes.checked
                              }}
                              value={this.state.contactCheckedRecEmails}
                            />
                          }
                          label="Receive email notifcations"
                        />
                      </FormGroup>
                    </MuiThemeProvider>
                  </Grid>
                  <Container>
                    <FormGroup className={classes.checkBoxPadding} row>
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="primary"
                            checked={Boolean(this.state.checkedContact2)}
                            onChange={this.handleChangeCheck2(
                              "checkedContact2"
                            )}
                            classes={{
                              root: classes.checkedRoot,
                              checked: classes.checked
                            }}
                            value={this.state.checkedContact2}
                          />
                        }
                        label="Add second contact"
                      />
                    </FormGroup>
                  </Container>
                  {/* Contact 2 */}
                  {this.state.checkedContact2 ? (
                    <TextField
                      id="standard-select-contact2Title"
                      select
                      label="Title"
                      margin="normal"
                      variant="outlined"
                      className={classes.textField}
                      value={this.state.contact2Title}
                      onChange={this.handleChange("contact2Title")}
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
                      id="standard-contact2FirstName"
                      label="First Name"
                      variant="outlined"
                      className={classes.textField}
                      value={this.state.contact2FirstName}
                      onChange={this.handleChange("contact2FirstName")}
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
                      value={this.state.contact2LastName}
                      onChange={this.handleChange("contact2LastName")}
                      margin="normal"
                    />
                  ) : null}

                  {this.state.checkedContact2 ? (
                    <TextField
                      id="standard-contact2Address"
                      variant="outlined"
                      label="Street Address"
                      className={classes.textField}
                      value={this.state.contact2Address}
                      onChange={this.handleChange("contact2Address")}
                      margin="normal"
                    />
                  ) : null}
                  {this.state.checkedContact2 ? (
                    <TextField
                      id="standard-contactCity-2"
                      variant="outlined"
                      label="City"
                      className={classes.textField}
                      value={this.state.contact2City}
                      onChange={this.handleChange("contact2City")}
                      margin="normal"
                    />
                  ) : null}

                  {this.state.checkedContact2 ? (
                    <TextField
                      id="standard-state2"
                      variant="outlined"
                      label="State"
                      className={classes.textField}
                      value={this.state.contact2State}
                      onChange={this.handleChange("contact2State")}
                      margin="normal"
                    />
                  ) : null}
                  {this.state.checkedContact2 ? (
                    <InputMask
                      mask="99999"
                      //maskPlaceholder=""
                      maskChar={null}
                      value={this.state.contact2Zip}
                      onChange={this.handleChange("contact2Zip")}
                      className={classes.textField}
                    >
                      {() => (
                        <TextField
                          id="standard-contactZip2"
                          label="Zip Code"
                          variant="outlined"
                          className={classes.textField}
                          margin="normal"
                          // type="text"
                        />
                      )}
                    </InputMask>
                  ) : null}

                  {this.state.checkedContact2 ? (
                    <InputMask
                      mask="999-999-9999"
                      //maskPlaceholder=""
                      maskChar={null}
                      value={this.state.contact2Phone}
                      onChange={this.handleChange("contact2Phone")}
                      className={classes.textField}
                    >
                      {() => (
                        <TextField
                          id="standard-contact2Phone"
                          label="Phone Number"
                          variant="outlined"
                          className={classes.textField}
                          margin="normal"
                          // type="text"
                        />
                      )}
                    </InputMask>
                  ) : null}

                  {this.state.checkedContact2 ? (
                    <InputMask
                      mask="999-999-9999"
                      //maskPlaceholder=""
                      maskChar={null}
                      value={this.state.contact2PhoneSec}
                      onChange={this.handleChange("contact2PhoneSec")}
                      className={classes.textField}
                    >
                      {() => (
                        <TextField
                          id="standard-contact2Phone2"
                          label="Secondary Phone Number"
                          variant="outlined"
                          className={classes.textField}
                          margin="normal"
                          // type="text"
                        />
                      )}
                    </InputMask>
                  ) : null}

                  {this.state.checkedContact2 ? (
                    <TextField
                      required
                      id="standard-contact2Email"
                      variant="outlined"
                      label="Email"
                      className={classes.textFieldAlign}
                      value={this.state.contact2Email}
                      onChange={this.handleChange("contact2Email")}
                      margin="normal"
                    />
                  ) : null}

                  {this.state.checkedContact2 ? (
                    <FormGroup className={classes.alignCheck} row>
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="primary"
                            checked={Boolean(
                              this.state.contact2CheckedRecEmails
                            )}
                            onChange={this.handleChangeChecked(
                              "contact2CheckedRecEmails"
                            )}
                            classes={{
                              root: classes.checkedRoot,
                              checked: classes.checked
                            }}
                            value={this.state.contact2CheckedRecEmails}
                          />
                        }
                        label="Receive email notifcations"
                      />
                    </FormGroup>
                  ) : null}

                  {this.state.checkedContact2 ? (
                    <Container>
                      <FormGroup className={classes.checkBoxPadding} row>
                        <FormControlLabel
                          control={
                            <Checkbox
                              color="primary"
                              checked={Boolean(this.state.checkedContact3)}
                              onChange={this.handleChangeCheck3(
                                "checkedContact3"
                              )}
                              classes={{
                                root: classes.checkedRoot,
                                checked: classes.checked
                              }}
                              value={this.state.checkedContact3}
                            />
                          }
                          label="Add third contact"
                        />
                      </FormGroup>
                    </Container>
                  ) : null}
                  {/* Contact 3 */}

                  {this.state.checkedContact3 ? (
                    <TextField
                      id="standard-select-contact3Title"
                      select
                      label="Title"
                      margin="normal"
                      variant="outlined"
                      className={classes.textField}
                      value={this.state.contact3Title}
                      onChange={this.handleChange("contact3Title")}
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
                      id="standard-contact3FirstName"
                      label="First Name"
                      variant="outlined"
                      className={classes.textField}
                      value={this.state.contact3FirstName}
                      onChange={this.handleChange("contact3FirstName")}
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
                      value={this.state.contact3LastName}
                      onChange={this.handleChange("contact3LastName")}
                      margin="normal"
                    />
                  ) : null}

                  {this.state.checkedContact3 ? (
                    <TextField
                      id="standard-contact3Address"
                      variant="outlined"
                      label="Street Address"
                      className={classes.textField}
                      value={this.state.contact3Address}
                      onChange={this.handleChange("contact3Address")}
                      margin="normal"
                    />
                  ) : null}
                  {this.state.checkedContact3 ? (
                    <TextField
                      id="standard-contactCity-3"
                      variant="outlined"
                      label="City"
                      className={classes.textField}
                      value={this.state.contact3City}
                      onChange={this.handleChange("contact3City")}
                      margin="normal"
                    />
                  ) : null}

                  {this.state.checkedContact3 ? (
                    <TextField
                      id="standard-state3"
                      variant="outlined"
                      label="State"
                      className={classes.textField}
                      value={this.state.contact3State}
                      onChange={this.handleChange("contact3State")}
                      margin="normal"
                    />
                  ) : null}
                  {this.state.checkedContact3 ? (
                    <InputMask
                      mask="99999"
                      //maskPlaceholder=""
                      maskChar={null}
                      value={this.state.contact3Zip}
                      onChange={this.handleChange("contact3Zip")}
                      className={classes.textField}
                    >
                      {() => (
                        <TextField
                          id="standard-contactZip3"
                          label="Zip Code"
                          variant="outlined"
                          className={classes.textField}
                          margin="normal"
                          // type="text"
                        />
                      )}
                    </InputMask>
                  ) : null}

                  {this.state.checkedContact3 ? (
                    <InputMask
                      mask="999-999-9999"
                      //maskPlaceholder=""
                      maskChar={null}
                      value={this.state.contact3Phone}
                      onChange={this.handleChange("contact3Phone")}
                      className={classes.textField}
                    >
                      {() => (
                        <TextField
                          id="standard-contact3Phone"
                          label=" Phone Number"
                          variant="outlined"
                          className={classes.textField}
                          margin="normal"
                          // type="text"
                        />
                      )}
                    </InputMask>
                  ) : null}

                  {this.state.checkedContact3 ? (
                    <InputMask
                      mask="999-999-9999"
                      //maskPlaceholder=""
                      maskChar={null}
                      value={this.state.contact3PhoneSec}
                      onChange={this.handleChange("contact3PhoneSec")}
                      className={classes.textField}
                    >
                      {() => (
                        <TextField
                          id="standard-contact3Phone2"
                          label="Secondary Phone Number"
                          variant="outlined"
                          className={classes.textField}
                          margin="normal"
                          // type="text"
                        />
                      )}
                    </InputMask>
                  ) : null}

                  {this.state.checkedContact3 ? (
                    <TextField
                      required
                      id="standard-contact3Email"
                      variant="outlined"
                      label="Email"
                      className={classes.textFieldAlign}
                      value={this.state.contact3Email}
                      onChange={this.handleChange("contact3Email")}
                      margin="normal"
                    />
                  ) : null}

                  {this.state.checkedContact3 ? (
                    <FormGroup className={classes.alignCheck} row>
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="primary"
                            checked={Boolean(
                              this.state.contact3CheckedRecEmails
                            )}
                            onChange={this.handleChangeChecked(
                              "contact3CheckedRecEmails"
                            )}
                            classes={{
                              root: classes.checkedRoot,
                              checked: classes.checked
                            }}
                            value={this.state.contact3CheckedRecEmails}
                          />
                        }
                        label="Receive email notifcations"
                      />
                    </FormGroup>
                  ) : null}
                </Grid>
                <Grid container direction="row" justify="space-between">
                  {/*
            <Button
              size="medium"
              variant="contained"
              className={classes.button}
            >
              Add Additional
            </Button>
            */}
                  <Grid container justify="flex-end">
                    <Button
                      className={classes.saveButton}
                      size="large"
                      variant="contained"
                      onClick={() => {
                        this.onSaveContactInfo();
                      }}
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </form>
          )}
          {tabValue === 2 && (
            <form className={classes.container} noValidate autoComplete="off">
              <Paper className={classes.infoRoot} elevation={2}>
                <Grid container justify="space-between">
                  <MuiThemeProvider theme={theme}>
                    <FormGroup className={classes.marg} row>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.billSameAsContact}
                            onChange={this.handleChangeChecked(
                              "billSameAsContact"
                            )}
                            value="billSameAsContact"
                            color="primary"
                          />
                        }
                        label="Same as contact" /* same as contact 1 */
                      />
                    </FormGroup>
                  </MuiThemeProvider>
                </Grid>
                <Grid container justify="center" alignItems="center">
                  <MuiThemeProvider theme={theme}>
                    <TextField
                      required
                      id="billingFirstName"
                      label="First Name"
                      variant="outlined"
                      className={classes.textField}
                      value={this.state.billingFirstName}
                      onChange={this.handleChange("billingFirstName")}
                      margin="normal"
                    />
                  </MuiThemeProvider>
                  <TextField
                    required
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

                  <TextField
                    id="standard-select-cardType"
                    select
                    label="Card Type"
                    margin="normal"
                    variant="outlined"
                    className={classes.textField}
                    value={this.state.cardType}
                    onChange={this.handleChange("cardType")}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu
                      }
                    }}
                  >
                    {cardTypes.map((option, i) => (
                      <MenuItem key={i} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    required
                    id="standard-nameOnCard"
                    label="Name on Card"
                    variant="outlined"
                    className={classes.textField}
                    value={this.state.nameOnCard}
                    onChange={this.handleChange("nameOnCard")}
                    margin="normal"
                  />

                  <TextField
                    required
                    id="standard-cardNum"
                    label="Card Number"
                    variant="outlined"
                    className={classes.textField}
                    value={this.state.cardNum}
                    onChange={this.handleChange("cardNum")}
                    margin="normal"
                  />

                  <InputMask
                    mask="999"
                    //maskPlaceholder=""
                    maskChar={null}
                    value={this.state.cvv}
                    onChange={this.handleChange("cvv")}
                    className={classes.textField}
                  >
                    {() => (
                      <TextField
                        id="standard-cvv"
                        label="CVV"
                        placeholder="MM/YY"
                        variant="outlined"
                        className={classes.textField}
                        margin="normal"
                        // type="text"
                      />
                    )}
                  </InputMask>

                  <InputMask
                    mask="99/99"
                    //maskPlaceholder=""
                    maskChar={null}
                    value={this.state.expDate}
                    onChange={this.handleChange("expDate")}
                    className={classes.textField}
                  >
                    {() => (
                      <TextField
                        id="standard-expDate"
                        label="Expiration Date"
                        placeholder="MM/YY"
                        variant="outlined"
                        className={classes.textField}
                        margin="normal"
                        // type="text"
                      />
                    )}
                  </InputMask>

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
                    required
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

                  <InputMask
                    mask="999-999-9999"
                    //maskPlaceholder=""
                    maskChar={null}
                    value={this.state.billingPhone}
                    onChange={this.handleChange("billingPhone")}
                    className={classes.textField}
                  >
                    {() => (
                      <TextField
                        id="standard-billingPhone"
                        label="Phone Number"
                        variant="outlined"
                        className={classes.textField}
                        margin="normal"
                        // type="text"
                      />
                    )}
                  </InputMask>

                  <InputMask
                    mask="99999"
                    //maskPlaceholder=""
                    maskChar={null}
                    value={this.state.billingZip}
                    onChange={this.handleChange("billingZip")}
                    className={classes.textField}
                  >
                    {() => (
                      <TextField
                        id="standard-billingZip"
                        label="Zip Code"
                        variant="outlined"
                        className={classes.textField}
                        margin="normal"
                        // type="text"
                      />
                    )}
                  </InputMask>
                </Grid>

                <Grid container justify="flex-end">
                  <Button
                    className={classes.saveButton}
                    size="large"
                    variant="contained"
                    onClick={() => {
                      this.onSaveBillingInfo();
                    }}
                  >
                    Save
                  </Button>
                </Grid>
              </Paper>
            </form>
          )}
          {/* Note History */}
          {tabValue === 3 && <NoteHistoryTable />}
          {/* Message History */}
          {tabValue === 4 && <Paper>Message History</Paper>}
          {/* Goals & Objectives */}
          {tabValue === 5 && (
            <form className={classes.container} noValidate autoComplete="off">
              <Paper className={classes.infoRoot} elevation={2}>
                {this.state.addGoal1 ? null : (
                  <Typography
                    className={classes.title}
                    align="center"
                    variant="h6"
                  >
                    It looks like you haven't added any goals or objectives.
                    Check the box below to begin adding some!
                  </Typography>
                )}
                {this.state.addGoal1 ? null : (
                  <Grid container justify="center">
                    <Container>
                      <FormGroup className={classes.checkBoxPadding} row>
                        <FormControlLabel
                          control={
                            <MuiThemeProvider theme={theme}>
                              <Checkbox
                                color="primary"
                                checked={Boolean(this.state.addGoal1)}
                                onChange={this.handleAdd1stGoal("addGoal1")}
                                classes={{
                                  root: classes.checkedRoot,
                                  checked: classes.checked
                                }}
                                value={this.state.addGoal1}
                              />
                            </MuiThemeProvider>
                          }
                          label="Add goal"
                        />
                      </FormGroup>
                    </Container>
                  </Grid>
                )}

                {this.state.addGoal1 ? (
                  <Grid container direction="column">
                    <Container>
                      <FormGroup className={classes.checkBoxPadding} row>
                        <FormControlLabel
                          control={
                            <MuiThemeProvider theme={theme}>
                              <Checkbox
                                color="primary"
                                checked={Boolean(this.state.addGoal1)}
                                onChange={this.handleAdd1stGoal("addGoal1")}
                                classes={{
                                  root: classes.checkedRoot,
                                  checked: classes.checked
                                }}
                                value={this.state.addGoal1}
                              />
                            </MuiThemeProvider>
                          }
                          label="Add goal"
                        />
                      </FormGroup>
                    </Container>

                    <MuiThemeProvider theme={theme}>
                      <FormGroup row>
                        <FormControlLabel
                          className={classes.marg}
                          control={
                            <Switch
                              checked={this.state.activeGoal1}
                              onChange={this.handleChangeChecked("activeGoal1")}
                              value={this.state.activeGoal1}
                              color="primary"
                            />
                          }
                          label="Active Goal"
                        />
                      </FormGroup>
                    </MuiThemeProvider>
                    <TextField
                      required
                      multiline
                      id="goal1"
                      label="Goal 1"
                      variant="outlined"
                      className={classes.textFieldGoal}
                      value={this.state.goal1}
                      onChange={this.handleChange("goal1")}
                      margin="normal"
                    />

                    <TextField
                      multiline
                      id="obj 1_1"
                      label="Objective 1_1"
                      variant="outlined"
                      className={classes.textFieldObj}
                      value={this.state.obj1_1}
                      onChange={this.handleChange("obj1_1")}
                      margin="normal"
                    />
                    <TextField
                      multiline
                      id="obj 1_2"
                      label="Objective 1_2"
                      variant="outlined"
                      className={classes.textFieldObj}
                      value={this.state.obj1_2}
                      onChange={this.handleChange("obj1_2")}
                      margin="normal"
                    />
                    <TextField
                      multiline
                      id="obj 1_3"
                      label="Objective 1_3"
                      variant="outlined"
                      className={classes.textFieldObj}
                      value={this.state.obj1_3}
                      onChange={this.handleChange("obj1_3")}
                      margin="normal"
                    />
                    <Container>
                      <FormGroup className={classes.checkBoxPadding} row>
                        <FormControlLabel
                          control={
                            <Checkbox
                              color="primary"
                              checked={this.state.addGoal2}
                              onChange={this.handleAdd2ndGoal("addGoal2")}
                              classes={{
                                root: classes.checkedRoot,
                                checked: classes.checked
                              }}
                              value="addGoal2"
                            />
                          }
                          label="Add additional goal"
                        />
                      </FormGroup>
                    </Container>
                  </Grid>
                ) : null}

                {this.state.addGoal2 ? (
                  <Grid container direction="column">
                    <MuiThemeProvider theme={theme}>
                      <FormGroup row>
                        <FormControlLabel
                          className={classes.marg}
                          control={
                            <Switch
                              checked={this.state.activeGoal2}
                              onChange={this.handleGoalActive("activeGoal2")}
                              value={this.state.activeGoal2}
                              color="primary"
                            />
                          }
                          label="Active Goal"
                        />
                      </FormGroup>
                    </MuiThemeProvider>
                    <TextField
                      required
                      multiline
                      id="goal2"
                      label="Goal 2"
                      variant="outlined"
                      className={classes.textFieldGoal}
                      value={this.state.goal2}
                      onChange={this.handleChange("goal2")}
                      margin="normal"
                    />

                    <TextField
                      multiline
                      id="obj 2_1"
                      label="Objective 2_1"
                      variant="outlined"
                      className={classes.textFieldObj}
                      value={this.state.obj2_1}
                      onChange={this.handleChange("obj2_1")}
                      margin="normal"
                    />
                    <TextField
                      multiline
                      id="obj 2_2"
                      label="Objective 2_2"
                      variant="outlined"
                      className={classes.textFieldObj}
                      value={this.state.obj2_2}
                      onChange={this.handleChange("obj2_2")}
                      margin="normal"
                    />
                    <TextField
                      multiline
                      id="obj 2_3"
                      label="Objective 2_3"
                      variant="outlined"
                      className={classes.textFieldObj}
                      value={this.state.obj2_3}
                      onChange={this.handleChange("obj2_3")}
                      margin="normal"
                    />
                    <Container>
                      <FormGroup className={classes.checkBoxPadding} row>
                        <FormControlLabel
                          control={
                            <Checkbox
                              color="primary"
                              checked={this.state.addGoal3}
                              onChange={this.handleAdd3rdGoal("addGoal3")}
                              classes={{
                                root: classes.checkedRoot,
                                checked: classes.checked
                              }}
                              value={this.state.addGoal3}
                            />
                          }
                          label="Add additional goal"
                        />
                      </FormGroup>
                    </Container>
                  </Grid>
                ) : null}

                {this.state.addGoal3 ? (
                  <Grid container direction="column">
                    <MuiThemeProvider theme={theme}>
                      <FormGroup row>
                        <FormControlLabel
                          className={classes.marg}
                          control={
                            <Switch
                              checked={this.state.activeGoal3}
                              onChange={this.handleGoalActive("activeGoal3")}
                              value={this.state.activeGoal3}
                              color="primary"
                            />
                          }
                          label="Active Goal"
                        />
                      </FormGroup>
                    </MuiThemeProvider>
                    <TextField
                      required
                      multiline
                      id="goal3"
                      label="Goal 3"
                      variant="outlined"
                      className={classes.textFieldGoal}
                      value={this.state.goal3}
                      onChange={this.handleChange("goal3")}
                      margin="normal"
                    />

                    <TextField
                      multiline
                      id="obj 3_1"
                      label="Objective 3_1"
                      variant="outlined"
                      className={classes.textFieldObj}
                      value={this.state.obj3_1}
                      onChange={this.handleChange("obj3_1")}
                      margin="normal"
                    />
                    <TextField
                      multiline
                      id="obj 3_2"
                      label="Objective 3_2"
                      variant="outlined"
                      className={classes.textFieldObj}
                      value={this.state.obj3_2}
                      onChange={this.handleChange("obj3_2")}
                      margin="normal"
                    />
                    <TextField
                      multiline
                      id="obj 3_3"
                      label="Objective 3_3"
                      variant="outlined"
                      className={classes.textFieldObj}
                      value={this.state.obj3_3}
                      onChange={this.handleChange("obj3_3")}
                      margin="normal"
                    />
                    <Container>
                      <FormGroup className={classes.checkBoxPadding} row>
                        <FormControlLabel
                          control={
                            <Checkbox
                              color="primary"
                              checked={this.state.addGoal4}
                              onChange={this.handleAdd4thGoal("addGoal4")}
                              classes={{
                                root: classes.checkedRoot,
                                checked: classes.checked
                              }}
                              value={this.state.addGoal4}
                            />
                          }
                          label="Add additional goal"
                        />
                      </FormGroup>
                    </Container>
                  </Grid>
                ) : null}

                {this.state.addGoal4 ? (
                  <Grid container direction="column">
                    <MuiThemeProvider theme={theme}>
                      <FormGroup row>
                        <FormControlLabel
                          className={classes.marg}
                          control={
                            <Switch
                              checked={this.state.activeGoal4}
                              onChange={this.handleGoalActive("activeGoal4")}
                              value={this.state.activeGoal4}
                              color="primary"
                            />
                          }
                          label="Active Goal"
                        />
                      </FormGroup>
                    </MuiThemeProvider>
                    <TextField
                      required
                      multiline
                      id="goal4"
                      label="Goal 4"
                      variant="outlined"
                      className={classes.textFieldGoal}
                      value={this.state.goal4}
                      onChange={this.handleChange("goal4")}
                      margin="normal"
                    />

                    <TextField
                      multiline
                      id="obj 4_1"
                      label="Objective 4_1"
                      variant="outlined"
                      className={classes.textFieldObj}
                      value={this.state.obj4_1}
                      onChange={this.handleChange("obj4_1")}
                      margin="normal"
                    />
                    <TextField
                      multiline
                      id="obj 4_2"
                      label="Objective 4_2"
                      variant="outlined"
                      className={classes.textFieldObj}
                      value={this.state.obj4_2}
                      onChange={this.handleChange("obj4_2")}
                      margin="normal"
                    />
                    <TextField
                      multiline
                      id="obj 4_3"
                      label="Objective 4_3"
                      variant="outlined"
                      className={classes.textFieldObj}
                      value={this.state.obj4_3}
                      onChange={this.handleChange("obj4_3")}
                      margin="normal"
                    />
                    <Container>
                      <FormGroup className={classes.checkBoxPadding} row>
                        <FormControlLabel
                          control={
                            <Checkbox
                              color="primary"
                              checked={this.state.addGoal5}
                              onChange={this.handleAdd5thGoal("addGoal5")}
                              classes={{
                                root: classes.checkedRoot,
                                checked: classes.checked
                              }}
                              value={this.state.addGoal5}
                            />
                          }
                          label="Add additional goal"
                        />
                      </FormGroup>
                    </Container>
                  </Grid>
                ) : null}

                {this.state.addGoal5 ? (
                  <Grid container direction="column">
                    <MuiThemeProvider theme={theme}>
                      <FormGroup row>
                        <FormControlLabel
                          className={classes.marg}
                          control={
                            <Switch
                              checked={this.state.activeGoal5}
                              onChange={this.handleGoalActive("activeGoal5")}
                              value={this.state.activeGoal5}
                              color="primary"
                            />
                          }
                          label="Active Goal"
                        />
                      </FormGroup>
                    </MuiThemeProvider>
                    <TextField
                      required
                      multiline
                      id="goal5"
                      label="Goal 5"
                      variant="outlined"
                      className={classes.textFieldGoal}
                      value={this.state.goal5}
                      onChange={this.handleChange("goal5")}
                      margin="normal"
                    />

                    <TextField
                      multiline
                      id="obj 5_1"
                      label="Objective 5_1"
                      variant="outlined"
                      className={classes.textFieldObj}
                      value={this.state.obj5_1}
                      onChange={this.handleChange("obj5_1")}
                      margin="normal"
                    />
                    <TextField
                      multiline
                      id="obj 5_2"
                      label="Objective 5_2"
                      variant="outlined"
                      className={classes.textFieldObj}
                      value={this.state.obj5_2}
                      onChange={this.handleChange("obj5_2")}
                      margin="normal"
                    />
                    <TextField
                      multiline
                      id="obj 5_3"
                      label="Objective 5_3"
                      variant="outlined"
                      className={classes.textFieldObj}
                      value={this.state.obj5_3}
                      onChange={this.handleChange("obj5_3")}
                      margin="normal"
                    />
                    <Container>
                      <FormGroup className={classes.checkBoxPadding} row>
                        <FormControlLabel
                          control={
                            <Checkbox
                              color="primary"
                              checked={this.state.addGoal6}
                              onChange={this.handleAdd6thGoal("addGoal6")}
                              classes={{
                                root: classes.checkedRoot,
                                checked: classes.checked
                              }}
                              value={this.state.addGoal6}
                            />
                          }
                          label="Add additional goal"
                        />
                      </FormGroup>
                    </Container>
                  </Grid>
                ) : null}

                {this.state.addGoal6 ? (
                  <Grid container direction="column">
                    <MuiThemeProvider theme={theme}>
                      <FormGroup row>
                        <FormControlLabel
                          className={classes.marg}
                          control={
                            <Switch
                              checked={this.state.activeGoal6}
                              onChange={this.handleGoalActive("activeGoal6")}
                              value={this.state.activeGoal6}
                              color="primary"
                            />
                          }
                          label="Active Goal"
                        />
                      </FormGroup>
                    </MuiThemeProvider>
                    <TextField
                      required
                      multiline
                      id="goal6"
                      label="Goal 6"
                      variant="outlined"
                      className={classes.textFieldGoal}
                      value={this.state.goal6}
                      onChange={this.handleChange("goal6")}
                      margin="normal"
                    />

                    <TextField
                      multiline
                      id="obj 6_1"
                      label="Objective 6_1"
                      variant="outlined"
                      className={classes.textFieldObj}
                      value={this.state.obj6_1}
                      onChange={this.handleChange("obj6_1")}
                      margin="normal"
                    />
                    <TextField
                      multiline
                      id="obj 6_2"
                      label="Objective 6_2"
                      variant="outlined"
                      className={classes.textFieldObj}
                      value={this.state.obj6_2}
                      onChange={this.handleChange("obj6_2")}
                      margin="normal"
                    />
                    <TextField
                      multiline
                      id="obj 6_3"
                      label="Objective 6_3"
                      variant="outlined"
                      className={classes.textFieldObj}
                      value={this.state.obj6_3}
                      onChange={this.handleChange("obj6_3")}
                      margin="normal"
                    />
                    <Container>
                      <FormGroup className={classes.checkBoxPadding} row>
                        <FormControlLabel
                          control={
                            <Checkbox
                              color="primary"
                              checked={this.state.addGoal7}
                              onChange={this.handleAdd7thGoal("addGoal7")}
                              classes={{
                                root: classes.checkedRoot,
                                checked: classes.checked
                              }}
                              value={this.state.addGoal7}
                            />
                          }
                          label="Add additional goal"
                        />
                      </FormGroup>
                    </Container>
                  </Grid>
                ) : null}

                {this.state.addGoal7 ? (
                  <Grid container direction="column">
                    <MuiThemeProvider theme={theme}>
                      <FormGroup row>
                        <FormControlLabel
                          className={classes.marg}
                          control={
                            <Switch
                              checked={this.state.activeGoal7}
                              onChange={this.handleGoalActive("activeGoal7")}
                              value={this.state.activeGoal7}
                              color="primary"
                            />
                          }
                          label="Active Goal"
                        />
                      </FormGroup>
                    </MuiThemeProvider>
                    <TextField
                      required
                      multiline
                      id="goal7"
                      label="Goal 7"
                      variant="outlined"
                      className={classes.textFieldGoal}
                      value={this.state.goal7}
                      onChange={this.handleChange("goal7")}
                      margin="normal"
                    />

                    <TextField
                      multiline
                      id="obj 7_1"
                      label="Objective 7_1"
                      variant="outlined"
                      className={classes.textFieldObj}
                      value={this.state.obj7_1}
                      onChange={this.handleChange("obj7_1")}
                      margin="normal"
                    />
                    <TextField
                      multiline
                      id="obj 7_2"
                      label="Objective 7_2"
                      variant="outlined"
                      className={classes.textFieldObj}
                      value={this.state.obj7_2}
                      onChange={this.handleChange("obj7_2")}
                      margin="normal"
                    />
                    <TextField
                      multiline
                      id="obj 7_3"
                      label="Objective 7_3"
                      variant="outlined"
                      className={classes.textFieldObj}
                      value={this.state.obj7_3}
                      onChange={this.handleChange("obj7_3")}
                      margin="normal"
                    />
                    <Container>
                      <FormGroup className={classes.checkBoxPadding} row>
                        <FormControlLabel
                          control={
                            <Checkbox
                              color="primary"
                              checked={this.state.addGoal8}
                              onChange={this.handleAdd8thGoal("addGoal8")}
                              classes={{
                                root: classes.checkedRoot,
                                checked: classes.checked
                              }}
                              value={this.state.addGoal8}
                            />
                          }
                          label="Add additional goal"
                        />
                      </FormGroup>
                    </Container>
                  </Grid>
                ) : null}

                {this.state.addGoal8 ? (
                  <Grid container direction="column">
                    <MuiThemeProvider theme={theme}>
                      <FormGroup row>
                        <FormControlLabel
                          className={classes.marg}
                          control={
                            <Switch
                              checked={this.state.activeGoal8}
                              onChange={this.handleGoalActive("activeGoal8")}
                              value={this.state.activeGoal8}
                              color="primary"
                            />
                          }
                          label="Active Goal"
                        />
                      </FormGroup>
                    </MuiThemeProvider>
                    <TextField
                      required
                      multiline
                      id="goal8"
                      label="Goal 8"
                      variant="outlined"
                      className={classes.textFieldGoal}
                      value={this.state.goal8}
                      onChange={this.handleChange("goal8")}
                      margin="normal"
                    />

                    <TextField
                      multiline
                      id="obj 8_1"
                      label="Objective 8_1"
                      variant="outlined"
                      className={classes.textFieldObj}
                      value={this.state.obj8_1}
                      onChange={this.handleChange("obj8_1")}
                      margin="normal"
                    />
                    <TextField
                      multiline
                      id="obj 8_2"
                      label="Objective 8_2"
                      variant="outlined"
                      className={classes.textFieldObj}
                      value={this.state.obj8_2}
                      onChange={this.handleChange("obj8_2")}
                      margin="normal"
                    />
                    <TextField
                      multiline
                      id="obj 8_3"
                      label="Objective 8_3"
                      variant="outlined"
                      className={classes.textFieldObj}
                      value={this.state.obj8_3}
                      onChange={this.handleChange("obj8_3")}
                      margin="normal"
                    />
                    <Container>
                      <FormGroup className={classes.checkBoxPadding} row>
                        <FormControlLabel
                          control={
                            <Checkbox
                              color="primary"
                              checked={this.state.addGoal9}
                              onChange={this.handleAdd9thGoal("addGoal9")}
                              classes={{
                                root: classes.checkedRoot,
                                checked: classes.checked
                              }}
                              value={this.state.addGoal9}
                            />
                          }
                          label="Add additional goal"
                        />
                      </FormGroup>
                    </Container>
                  </Grid>
                ) : null}

                {this.state.addGoal9 ? (
                  <Grid container direction="column">
                    <MuiThemeProvider theme={theme}>
                      <FormGroup row>
                        <FormControlLabel
                          className={classes.marg}
                          control={
                            <Switch
                              checked={this.state.activeGoal9}
                              onChange={this.handleGoalActive("activeGoal9")}
                              value={this.state.activeGoal9}
                              color="primary"
                            />
                          }
                          label="Active Goal"
                        />
                      </FormGroup>
                    </MuiThemeProvider>
                    <TextField
                      required
                      multiline
                      id="goal9"
                      label="Goal 9"
                      variant="outlined"
                      className={classes.textFieldGoal}
                      value={this.state.goal9}
                      onChange={this.handleChange("goal9")}
                      margin="normal"
                    />

                    <TextField
                      multiline
                      id="obj 9_1"
                      label="Objective 9_1"
                      variant="outlined"
                      className={classes.textFieldObj}
                      value={this.state.obj9_1}
                      onChange={this.handleChange("obj9_1")}
                      margin="normal"
                    />
                    <TextField
                      multiline
                      id="obj 9_2"
                      label="Objective 9_2"
                      variant="outlined"
                      className={classes.textFieldObj}
                      value={this.state.obj9_2}
                      onChange={this.handleChange("obj9_2")}
                      margin="normal"
                    />
                    <TextField
                      multiline
                      id="obj 9_3"
                      label="Objective 9_3"
                      variant="outlined"
                      className={classes.textFieldObj}
                      value={this.state.obj9_3}
                      onChange={this.handleChange("obj9_3")}
                      margin="normal"
                    />
                    <Container>
                      <FormGroup className={classes.checkBoxPadding} row>
                        <FormControlLabel
                          control={
                            <Checkbox
                              color="primary"
                              checked={this.state.addGoal10}
                              onChange={this.handleAdd10thGoal("addGoal10")}
                              classes={{
                                root: classes.checkedRoot,
                                checked: classes.checked
                              }}
                              value={this.state.addGoal10}
                            />
                          }
                          label="Add additional goal"
                        />
                      </FormGroup>
                    </Container>
                  </Grid>
                ) : null}

                {this.state.addGoal10 ? (
                  <Grid container direction="column">
                    <MuiThemeProvider theme={theme}>
                      <FormGroup row>
                        <FormControlLabel
                          className={classes.marg}
                          control={
                            <Switch
                              checked={this.state.activeGoal10}
                              onChange={this.handleGoalActive("activeGoal10")}
                              value={this.state.activeGoal10}
                              color="primary"
                            />
                          }
                          label="Active Goal"
                        />
                      </FormGroup>
                    </MuiThemeProvider>
                    <TextField
                      required
                      multiline
                      id="goal10"
                      label="Goal 10"
                      variant="outlined"
                      className={classes.textFieldGoal}
                      value={this.state.goal10}
                      onChange={this.handleChange("goal10")}
                      margin="normal"
                    />

                    <TextField
                      multiline
                      id="obj 10_1"
                      label="Objective 10_1"
                      variant="outlined"
                      className={classes.textFieldObj}
                      value={this.state.obj10_1}
                      onChange={this.handleChange("obj10_1")}
                      margin="normal"
                    />
                    <TextField
                      multiline
                      id="obj 10_2"
                      label="Objective 10_2"
                      variant="outlined"
                      className={classes.textFieldObj}
                      value={this.state.obj10_2}
                      onChange={this.handleChange("obj10_2")}
                      margin="normal"
                    />
                    <TextField
                      multiline
                      id="obj 10_3"
                      label="Objective 10_3"
                      variant="outlined"
                      className={classes.textFieldObj}
                      value={this.state.obj10_3}
                      onChange={this.handleChange("obj10_3")}
                      margin="normal"
                    />
                  </Grid>
                ) : null}

                <Grid container justify="flex-end">
                  <Button
                    className={classes.saveButton}
                    size="large"
                    variant="contained"
                    onClick={() => {
                      this.onSaveGoals();
                    }}
                  >
                    Save
                  </Button>
                </Grid>
              </Paper>
            </form>
          )}
        </Container>
      </div>
    );
  }
}

ClientDetails.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(ClientDetails));
