import React, { Component } from "react";
import { withRouter } from "react-router";

//import BigCalendar from "react-big-calendar";
import Calendar from "react-big-calendar";
import moment from "moment";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import NoteAddIcon from "@material-ui/icons/NoteAddOutlined";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import DeleteForeverIcon from "@material-ui/icons/DeleteForeverOutlined";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../Calendar/calendarStyle.css";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  DatePicker,
  TimePicker
} from "@material-ui/pickers";
import Container from "@material-ui/core/Container";

import { Redirect, Link } from "react-router-dom";

import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
// Snackbar
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContentWrapper from "../common/MySnackbarContentWrapper";

import API from "../utils/API";
import { SketchPicker } from "react-color";

const localizer = Calendar.momentLocalizer(moment);
const propTypes = {};
moment().toDate();
const CURRENT_DATE = moment().toDate();

const styles = theme => ({
  root: {
    paddingTop: theme.spacing(10),
    height: "100%"
    // width: "90%"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400
  },
  textField2: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 194
  },
  dense: {
    marginTop: 16
  },
  menu: {
    //width: 200
  },
  root3: {
    width: "100%"
  },

  categoryButton: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
    /* this is text color */ color: theme.palette.getContrastText("#b2dfdb"),
    backgroundColor: "#b2dfdb",
    "&:hover": {
      backgroundColor: "#80cbc4"
    }
  },

  /* NEW */

  colorPicker: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2)
  }
});

const navStyle = {
  color: "black",
  textDecoration: "none"
};

const theme = createMuiTheme({
  palette: {
    primary: { main: "#b2dfdb" },
    secondary: { main: "#f44336" }
  }
});

const theme2 = createMuiTheme({
  palette: {
    primary: { main: "#00838f" }
  }
});

const deleteTheme = createMuiTheme({
  palette: {
    primary: { main: "#f44336" }
  }
});

const newBillTypes = [
  {
    value: "Billable",
    label: "Billable"
  },

  {
    value: "Non-billable",
    label: "Non-billable"
  }
];

const repeatOptions = [
  {
    value: "Daily",
    label: "Daily"
  },

  {
    value: "Weekly",
    label: "Weekly"
  },
  {
    value: "Monthly",
    label: "Monthly"
  },
  {
    value: "Custom",
    label: "Custom"
  }
];

const repeatEndOptions = [
  /* {
    value: "Never",
    label: "Never"
  },
*/
  {
    value: "After",
    label: "After"
  },
  {
    value: "On Date",
    label: "On Date"
  }
];

const customFreqOptions = [
  {
    value: "Specific Days",
    label: "Specific Days"
  },

  {
    value: "Every x days",
    label: "Every x days"
  }
  /*
  {
    value: "Weekly",
    label: "Weekly"
  },
  {
    value: "Monthly",
    label: "Monthly"
  }
  */
];

const categories = [];

const eventEdgeColor = attendance => {
  let edgeColor;
  if (attendance === "Present ($)") {
    edgeColor = "green";
  } else if (attendance === "Absent, no notice ($)") {
    edgeColor = "red";
  } else if (attendance === "Absent, notice") {
    edgeColor = "yellow";
  }

  return attendance
    ? {
        border: "none",
        //backgroundColor: "#80cbc4",
        borderLeft: "5px solid " + edgeColor
      }
    : {
        border: "none"
        //backgroundColor: "#80cbc4"
      };
};

const CustomToolbar = ({ label, onNavigate, view, onView }) => {
  return (
    <div className="rbc-toolbar">
   
      <span className="rbc-toolbar-label" style={{ fontSize: "18px" }}>
        {label}
      </span>
      <span className="rbc-btn-group"></span>
    </div>
  );
};

const DefaultEventWrapper = ({
  event,
  onSelect,
  onClick,
  selected,
  label,
  type,
  children
}) => {
  return type === "date" ? (
    children.props.type === "popup" ? (
      <div
        type="popup"
        tabIndex="0"
        className="rbc-event"
        style={eventEdgeColor(event.resource.attendance)}
        onClick={() => onSelect(event)}
      >
        <div className="rbc-event-content" title={event.title}>
          {localizer.format(event.start, "h:mm a")} -{" "}
          {localizer.format(event.end, "h:mm a")}; {event.resource.client} (
          {event.resource.therapist})
        </div>
      </div>
    ) : (
      <div
        tabIndex="0"
        className="rbc-event"
        style={eventEdgeColor(event.resource.attendance)}
        onClick={() => onSelect(event)}
      >
        <div className="rbc-event-content" title={event.title}>
          {localizer.format(event.start, "h:mm a")} -{" "}
          {localizer.format(event.end, "h:mm a")}; {event.resource.client} (
          {event.resource.therapist})
        </div>
      </div>
    )
  ) : (
    <div
      title={event.title}
      className={selected ? "rbc-event rbc-selected" : "rbc-event"}
      style={eventEdgeColor(event.resource.attendance)}
      onClick={() => onClick()}
    >
      <div className="rbc-event-label">{label}</div>
      <div className="rbc-event-content">
        {event.resource.client} ({event.resource.therapist})
      </div>
    </div>
  );
};

const customDayPropGetter = date => {
  if (moment(CURRENT_DATE).isSame(date, "day"))
    return {
      className: "current-day",
      style: {
        backgroundColor: "#e0f2f1"
      }
    };
  else return {};
};

class ReactCalendarBase extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      eventId: 0,
      seriesStartId: 0,
      isShowRepeatOptionInExistingDalog: false,
      deleteDialog: false,
      deleteSuccessSnackbarOpen: false,
      deleteFailureSnackbarOpen: false,
      isSoleDialog: false,
      calEvents: [
        //State is updated via componentDidMount
      ],
      therapistData: [],
      clientData: [],
      data: [],
      open: false,
      openExisting: false,
      //id: 0,
      // NEW EVENT
      newBillType: "",
      //newClientType: "",
      newClient: "",
      newTherapist: "",
      newLocation: "",
      newCategory: "",
      newStartDate: "",
      newStartTime: "",
      newEndDate: "",
      newEndTime: "",
      information: "",
      intervalIsSet: "",
      checkedRepeat: false,
      repeatOption: false,
      newEndRepeat: "",
      newNumOccurences: "",
      selectedDateOccurenceEnd: "",
      sun: false,
      mon: false,
      tues: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false,
      newRepeatEveryNumDays: "",
      newRepeatEveryNumWeeks: "",
      newRepeatEveryNumMonths: "",
      selectedDate: moment().format("YYYY-MM-DD HH:mm"),
      endSelectedDate: moment()
        .add(1, "hour")
        .format("YYYY-MM-DD HH:mm"),
      redirect: false,
      // EXISTING EVENT
      redirectDocs: false,
      attendance: "Present",
      existingBillType: "Billable",
      existingClientType: "Individual",
      existingClient: "John Smith",
      existingTherapist: "Harry Potter",
      existingLocation: "Main Building",
      existingCategory: "None",
      existingStart: "",
      existingEnd: "",
      existingRepeatOption: "Weekly",
      existingEndRepeat: "On Date",
      existingCustomFreq: "",
      existingEveryNumDays: "",
      existingEveryNumWeeks: "",
      existingEveryNumMonths: "",
      existingCheckedRepeat: false,
      existingNumOccurences: 0,
      existingEndDateOccurrence: "",
      amount: 0,
      transType: "Calendar",
      filters: {
        therapist: "All",
        client: "All",
        category: "All"
      },
      filteredCalEvents: [],
      isNewCategoryDialog: false,
      newCategoryData: {
        label: "",
        value: "",
        color: "#000000"
      }
    };
  }

  convertDate = date => {
    return moment.utc(date).toDate();
  };

  async componentDidMount() {
    await this.updateContent();
  }

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {}

  onSubmit(e) {
    //experiment keeping preventDefault
    //e.preventDefault();

    const obj = {
      newBillType: this.state.newBillType,
      //newClientType: this.state.newClientType,
      newTherapist: this.state.newTherapist,
      newLocation: this.state.newLocation,
      newCategory: this.state.newCategory,
      newClient: this.state.newClient,
      newDescription: "Session with " + this.state.newTherapist,
      selectedDate: this.state.selectedDate,
      endSelectedDate: this.state.endSelectedDate,
      checkedRepeat: +this.state.checkedRepeat, //true,false
      repeatOption: this.state.repeatOption, //"Daily","Weekly","Monthly","Custom"
      newEndRepeat: this.state.newEndRepeat, //"After","On Date"
      newNumOccurences: this.state.newNumOccurences, //"4"
      selectedDateOccurenceEnd: this.state.selectedDateOccurenceEnd, //"2019-09-18 03:41:00"
      newCustomFreq: this.state.newCustomFreq, //"Specific Days","Every x days","Weekly","Montly"
      newRepeatEveryNumDays: this.state.newRepeatEveryNumDays,
      newRepeatEveryNumWeeks: this.state.newRepeatEveryNumWeeks,
      newRepeatEveryNumMonths: this.state.newRepeatEveryNumMonths,
      billingEmail: this.state.billingEmail,
      sessionCost: this.state.sessionCost,
      sessionLength: this.state.sessionLength,
      sun: +this.state.sun,
      mon: +this.state.mon,
      tues: +this.state.tues,
      wed: +this.state.wed,
      thu: +this.state.thu,
      fri: +this.state.fri,
      sat: +this.state.sat,
      amount: this.state.amount,
      transType: this.state.transType,
      newDescription: "Session with " + this.state.newTherapist
    };
    console.log("submitobj", obj);

    //Here I have just added some basic validation messages for fields that are needed for repeat appointments
    //I guess you will add validations in your form later on
    if (obj.checkedRepeat) {
      if (!obj.repeatOption) {
        alert('Please select "Repeat Option"');
      } else if (!obj.newEndRepeat) {
        alert('Please select "End Repeat"');
      } else if (obj.newEndRepeat === "After" && !obj.newNumOccurences) {
        alert('Please enter "Occurances"');
      } else if (
        obj.newEndRepeat === "On Date" &&
        !obj.selectedDateOccurenceEnd
      ) {
        alert('Please select "End On"');
      } else if (obj.repeatOption === "Custom" && !obj.newCustomFreq) {
        alert('Please select "Custom Frequency"');
      } else {
        API.post("/events/insert", obj)
          // .then(res => console.log(res.data));
          .then(async response => {
            this.setState({
              obj,
              open: false
              // redirect: true
            });
            await this.updateContent();
          });
      }
    } else {
      API.post("/events/insert", obj).then(async response => {
        this.setState({
          obj,
          open: false
          // redirect: true
        });
        await this.updateContent();
      });
      //.then(res => console.log(res.data));
    }
    /* this will clear everything after saving+closing */

    this.setState({
      newBillType: "Billable",
      //newClientType: "",
      newClient: "",
      billingEmail: "",
      sessionCost: 0.0,
      sessionLength: 0,
      newTherapist: "",
      newLocation: "",
      newCategory: "",
      selectedDate: moment().format("YYYY-MM-DD HH:mm"),
      endSelectedDate: moment()
        .add(1, "hour")
        .format("YYYY-MM-DD HH:mm"),
      checkedRepeat: false,
      repeatOption: "",
      newEndRepeat: "",
      newNumOccurences: "",
      selectedDateOccurenceEnd: moment().format("YYYY-MM-DD HH:mm"),
      newCustomFreq: "",
      newRepeatEveryNumDays: "",
      newRepeatEveryNumWeeks: "",
      newRepeatEveryNumMonths: "",
      sun: false,
      mon: false,
      tues: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false
      // redirect: true,
      // open: false
    });
  }

  async updateContent() {
    try {
      const eventsResp = await API.get("/events");
      const therapistsResp = await API.get("/members/getTherapists");
      const clientsResp = await API.get("/clients/all");
      const calEvents =
        (eventsResp.data.data || []).map(event => {
          const { title, start, end, ...resource } = event;
          return {
            title,
            start,
            end,
            resource
          };
        }) || [];
      const therapistData = therapistsResp.data.data || [];
      const clientData = clientsResp.data.data || [];
      const filteredCalEvents = calEvents.slice();
      this.setState(
        {
          calEvents,
          therapistData,
          clientData,
          filteredCalEvents
        },
        () => {
          // this.changeContentWithClientId()
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  handleIsSoleDialogClose = () => {
    this.setState({ isSoleDialog: false });
  };

  handleIsSoleDialogOpen = () => {
    this.setState({ isSoleDialog: true });
  };

  handleOccurence = () => {
    this.setState({
      isShowRepeatOptionInExistingDalog: false,
      isSoleDialog: false,
      openExisting: true
    });
  };

  handleSeries = () => {
    this.setState({
      isShowRepeatOptionInExistingDalog: true,
      isSoleDialog: false,
      openExisting: true
    });
  };

  handleDeleteDialogOpen = () => {
    this.setState({ deleteDialog: true });
  };

  handleDeleteDialogClose = () => {
    this.setState({ deleteDialog: false });
  };

  handleDelete = () => {
    if (this.state.isShowRepeatOptionInExistingDalog)
      API.delete(`/events/series/${this.state.seriesStartId}`)
        .then(async resp => {
          this.handleCloseExisting();
          await this.updateContent();
        })
        .catch(error => {
          console.log("ee", error);
          this.setState({
            deleteFailureSnackbarOpen: true,
            deleteClientErrorMsg: error
          });
        });
    else
      API.delete(`/events/${this.state.eventId}`)
        .then(async resp => {
          this.handleCloseExisting();
          await this.updateContent();
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

  handleSnackbarClose = () => {
    this.setState({ deleteFailureSnackbarOpen: false });
  };

  /* show new event dialog box */
  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  /* close new event dialog box */
  handleClose = () => {
    this.setState({
      open: false,
      //this will set the values to blank once the window is closed
      newBillType: "Billable",
      newClientType: "",
      title: "",
      newClient: "",
      newTherapist: "",
      newLocation: "",
      newCategory: "",
      checkedRepeat: false,
      repeatOption: null,
      newEndRepeat: null,
      newNumOccurences: null,
      selectedDateOccurenceEnd: null,
      existingCustomFreq: null,
      sun: false,
      mon: false,
      tues: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false,
      newRepeatEveryNumDays: null,
      newRepeatEveryNumWeeks: null,
      newRepeatEveryNumMonths: null,
      newCustomFreq: null,
      selectedDate: moment().format("YYYY-MM-DD HH:mm"),
      endSelectedDate: moment()
        .add(1, "hour")
        .format("YYYY-MM-DD HH:mm")
    });
  };

  /* show existing event dialog box */
  handleClickOpen2 = event => {
    const { id, series_start_id } = event.resource;
    const firstEvent = this.state.calEvents.find(
      event => event.resource.series_start_id === series_start_id
    );
    const currentEvent = this.state.calEvents.find(
      event => event.resource.id === id
    );

    const {
      title,
      bill_type,
      client,
      therapist,
      location,
      repeats,
      repeat_option,
      end_repeat,
      num_occurences,
      end_date_occurrence,
      custom_frequency,
      repeat_num_days,
      mon,
      tues,
      wed,
      thu,
      fri,
      sat,
      sun,
      billing_email,
      session_cost,
      session_length,
      category
    } = firstEvent.resource;

    if (Boolean(repeats)) this.setState({ isSoleDialog: true });
    else this.setState({ openExisting: true });

    this.setState({
      eventId: id,
      seriesStartId: series_start_id,
      existingBillType: bill_type || "",
      existingClient: client || "",
      existingTherapist: therapist || "",
      existingLocation: location || "",
      existingCategory: category || "",
      existingStart: event.start || "",
      existingEnd: event.end || "",
      existingRepeatOption: repeat_option || "",
      existingEveryNumDays: repeat_num_days || "",
      existingEveryNumWeeks: "" || "",
      existingEveryNumMonths: "" || "",
      existingCheckedRepeat: Boolean(repeats) || false,
      existingEndRepeat: end_repeat || "",
      existingCustomFreq: custom_frequency || "",
      existingNumOccurences: num_occurences || "",
      existingEndDateOccurrence: end_date_occurrence,
      sun: Boolean(sun),
      mon: Boolean(mon),
      tues: Boolean(tues),
      wed: Boolean(wed),
      thu: Boolean(thu),
      fri: Boolean(fri),
      sat: Boolean(sat),
      billingEmail: billing_email || "",
      sessionCost: session_cost || 0.0,
      sessionLength: session_length || 0
    });
  };

  /* close existing event dialog box */
  handleCloseExisting = () => {
    this.setState({ openExisting: false });
  };

  handleChange = name => event => {
    if (name === "newClient" || name === "existingClient")
      this.updateClientInfo(event.target.value);
    this.setState({
      [name]: event.target.value,
      newCustomFreq: "",
      sun: false,
      mon: false,
      tues: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false
    });
  };

  updateClientInfo = clientName => {
    const { clientData } = this.state;
    const currentClient = clientData.find(
      client => client.client_full_name === clientName
    );
    if (currentClient) {
      const {
        billing_email,
        session_length,
        session_cost,
        assi_therapist_full_name
      } = currentClient;
      this.setState(
        {
          billingEmail: billing_email,
          sessionCost: session_cost,
          sessionLength: session_length,
          newTherapist: assi_therapist_full_name
        },
        () => {
          console.log(
            this.state.billingEmail,
            this.state.sessionCost,
            this.state.sessionLength,
            this.state.newTherapist
          );
        }
      );
    }
  };
  handleChange2 = name => event => {
    this.setState({
      [name]: event.target.value
      /* newCustomFreq: null,
      sun: false,
      mon: false,
      tues: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false */
    });
  };

  handleChangeCustom = name => event => {
    this.setState({
      [name]: event.target.value,
      sun: false,
      mon: false,
      tues: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false
    });
  };

  handleChangeCheck = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleChangeCheck2 = name => event => {
    this.setState({
      [name]: event.target.checked,
      //this will set the values to blank once the window is closed
      repeatOption: "",
      newEndRepeat: "",
      newNumOccurences: "",
      selectedDateOccurenceEnd: "",
      existingCustomFreq: "",
      sun: false,
      mon: false,
      tues: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false,
      newRepeatEveryNumDays: "",
      newRepeatEveryNumWeeks: "",
      newRepeatEveryNumMonths: ""
      // contact 3,
      /* checkedContact3: false,
      contactFirstName3: null,
      contactLastName3: null,
      contactEmail3: null,
      contactTitle3: null,
      contactPhone3: null,
      contactAddress3: null,
      contactCity3: null,
      contactState3: null,
      contactZip3: null */
    });
  };

  //printState = () => console.log(this.state)

  handleDateChangeStart = date => {
    this.setState({ selectedDate: date.format("YYYY-MM-DD HH:mm") });
  };

  handleDateChangeEnd = date => {
    this.setState({ endSelectedDate: date.format("YYYY-MM-DD HH:mm") });
  };

  handleDateOccurenceChange = date => {
    this.setState({
      selectedDateOccurenceEnd: date.format("YYYY-MM-DD HH:mm")
    });
  };

  handleRedirectDocs = () => {
    this.setState({ redirectDocs: true });
  };

  /*
  reloadPage() {
    window.location.reload();
  }
  */

  /*
  someMethod() {
    // Force a render without state change...
    this.forceUpdate();
  }
  */

  handleTherapistFilterChange = event => {
    const filters = {
      therapist: event.target.value,
      client: this.state.filters.client,
      category: this.state.filters.category
    };
    this.handleFilterChanges(filters);
  };

  handleClientFilterChange = event => {
    const filters = {
      therapist: this.state.filters.therapist,
      client: event.target.value,
      category: this.state.filters.category
    };
    this.handleFilterChanges(filters);
  };

  handleCategoryFilterChange = event => {
    const filters = {
      therapist: this.state.filters.therapist,
      client: this.state.filters.client,
      category: event.target.value
    };
    this.handleFilterChanges(filters);
  };

  handleFilterChanges = filters => {
    const { calEvents } = this.state;

    const filteredCalEvents =
      filters.therapist !== "All"
        ? calEvents.filter(val => val.resource.therapist === filters.therapist)
        : calEvents;

    const filteredCalEvents1 =
      filters.client !== "All"
        ? filteredCalEvents.filter(
            val => val.resource.client === filters.client
          )
        : filteredCalEvents;

    const filteredCalEvents2 =
      filters.category !== "All"
        ? filteredCalEvents1.filter(
            val => val.resource.category === filters.category
          )
        : filteredCalEvents1;
    this.setState({ filters, filteredCalEvents: filteredCalEvents2 });
  };

  handleNewCategoryDialogOpen = () => {
    this.setState({ isNewCategoryDialog: true });
  };

  /*   handleNewCategorySave = () => {
    const { newCategoryData } = this.state;

    if (newCategoryData.value) {
      categories.push(newCategoryData);
      this.setState({
        newCategoryData: {
          label: "",
          value: "",
          color: "#000000"
        },
        isNewCategoryDialog: false
      });
    }
  }; */

  handleNewCategoryCancel = () => {
    this.setState({
      newCategoryData: {
        label: "",
        value: "",
        color: "#000000"
      },
      isNewCategoryDialog: false
    });
  };

  handleNewCategoryNameChanges = e => {
    const { newCategoryData } = this.state;
    newCategoryData.value = e.target.value;
    newCategoryData.label = e.target.value;

    this.setState(newCategoryData);
  };

  handleNewCategoryColorChange = color => {
    const { newCategoryData } = this.state;
    newCategoryData.color = color.hex;

    this.setState(newCategoryData);
  };

  render() {
    const { classes } = this.props;
    //const classes = withStyles();
    const {
      calEvents,
      therapistData,
      clientData,
      selectedDate,
      endSelectedDate,
      filteredCalEvents,
      filters
    } = this.state;
    /*
    if (this.state.redirect) {
      return <Redirect to="/calendar/a" />;
    }
    */

    return (
      <div>
        <Container style={{ height: 1000 }} maxWidth="md">
          <Grid container justify="center"></Grid>

          <Calendar
            className={classes.root}
            selectable={true}
            startAccessor={calEvents => new Date(calEvents.start)}
            endAccessor={calEvents => new Date(calEvents.end)}
            localizer={localizer}
            events={filteredCalEvents}
            views={["day"]}
            defaultDate={new Date()}
            defaultView="day"
            onSelectEvent={this.handleClickOpen2}
            onSelectSlot={this.handleClickOpen}
            dayPropGetter={customDayPropGetter}
            // (this sets the start time of 8am)
            // min={new Date(2000, 1, 1, 8)}
            // this sets the end time of 8pm)
            // max={new Date(2000, 1, 1, 20)}
            popup={true}
            components={{
              // custom wrapper here
              // so that it actually gets used
              eventWrapper: DefaultEventWrapper,
              toolbar: CustomToolbar
            }}
          />
        </Container>
        {this.state.redirect ? <Redirect push to="/calendar/n" /> : null}
        {this.state.redirectDocs ? (
          <Redirect
            push
            to={{
              pathname: "/documentation",
              state: {
                client: this.state.existingClient,
                sessionDate: this.state.existingStart,
                // calNum: this.state.eventId,
                calID: this.state.eventId
                // moment(this.state.existingStart).format("MM-DD-YYYY") //.toString().substr(0, 10)
              }
            }}
          />
        ) : null}

        {/* existing dialog */}
        <Dialog
          open={this.state.openExisting}
          onClose={this.handleCloseExisting}
        >
          <form className={classes.container} noValidate autoComplete="off">
            <DialogContent>
              <Grid>
                {!this.state.isShowRepeatOptionInExistingDalog && (
                  <IconButton onClick={this.handleRedirectDocs}>
                    <MuiThemeProvider theme={theme}>
                      <NoteAddIcon color="primary" fontSize="large" />
                    </MuiThemeProvider>
                  </IconButton>
                )}
              </Grid>
              <TextField
                required
                id="bill_type"
                select
                label="Bill Type"
                className={classes.textField}
                value={this.state.existingBillType}
                onChange={e =>
                  this.setState({ existingBillType: e.target.value })
                }
                margin="normal"
                variant="outlined"
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
              >
                {newBillTypes.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                required
                id="existingClient"
                select
                label="Client"
                className={classes.textField}
                value={this.state.existingClient}
                onChange={this.handleChange("existingClient")}
                margin="normal"
                variant="outlined"
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
              >
                {clientData.map(option => (
                  <MenuItem key={option.id} value={option.client_full_name}>
                    {option.client_full_name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="existingTherapist"
                select
                label="Therapist"
                variant="outlined"
                margin="normal"
                className={classes.textField}
                value={this.state.existingTherapist}
                onChange={this.handleChange("existingTherapist")}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
              >
                {therapistData.map((option, i) => (
                  <MenuItem key={i} value={option.member_full_name}>
                    {option.member_full_name}
                  </MenuItem>
                ))}
              </TextField>
              <MuiThemeProvider theme={theme}>
                <TextField
                  required
                  id="existingLocation"
                  label="Location"
                  className={classes.textField2}
                  value={this.state.existingLocation}
                  onChange={e =>
                    this.setState({ existingLocation: e.target.value })
                  }
                  margin="normal"
                  variant="outlined"
                />
              </MuiThemeProvider>
              <TextField
                required
                id="existingCategory"
                select
                label="Category"
                className={classes.textField2}
                value={this.state.existingCategory}
                onChange={e =>
                  this.setState({ existingCategory: e.target.value })
                }
                margin="normal"
                variant="outlined"
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
              >
                {categories.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <MuiThemeProvider theme={theme}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <Grid container>
                    <MuiThemeProvider theme={theme2}>
                      <DatePicker
                        inputVariant="outlined"
                        margin="normal"
                        className={classes.textField2}
                        label="Date picker"
                        value={this.state.existingStart}
                        onChange={date =>
                          this.setState({ existingStart: date })
                        }
                      />

                      <TimePicker
                        margin="normal"
                        inputVariant="outlined"
                        className={classes.textField2}
                        label="Time picker"
                        value={this.state.existingStart}
                        onChange={date =>
                          this.setState({ existingStart: date })
                        }
                      />
                    </MuiThemeProvider>
                  </Grid>
                </MuiPickersUtilsProvider>
              </MuiThemeProvider>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <Grid container>
                  <MuiThemeProvider theme={theme2}>
                    <DatePicker
                      margin="normal"
                      inputVariant="outlined"
                      label="Date picker"
                      className={classes.textField2}
                      value={this.state.existingEnd}
                      onChange={date => this.setState({ existingStart: date })}
                    />
                    <TimePicker
                      inputVariant="outlined"
                      margin="normal"
                      label="Time picker"
                      className={classes.textField2}
                      value={this.state.existingEnd}
                      onChange={date => this.setState({ existingStart: date })}
                    />
                  </MuiThemeProvider>
                </Grid>
              </MuiPickersUtilsProvider>
              {this.state.isShowRepeatOptionInExistingDalog && (
                <Container>
                  <MuiThemeProvider theme={theme}>
                    <FormGroup row>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.existingCheckedRepeat}
                            onChange={this.handleChangeCheck2(
                              "existingCheckedRepeat"
                            )}
                            value="existingCheckedRepeat"
                            color="primary"
                          />
                        }
                        label="Repeat"
                      />
                    </FormGroup>
                  </MuiThemeProvider>
                </Container>
              )}
              {this.state.isShowRepeatOptionInExistingDalog &&
              this.state.existingCheckedRepeat ? (
                <TextField
                  id="standard-select-repeatOption"
                  select
                  label="Repeats"
                  variant="outlined"
                  className={classes.textField}
                  value={this.state.existingRepeatOption}
                  onChange={this.handleChange("existingRepeatOption")}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                >
                  {repeatOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              ) : null}

              {this.state.isShowRepeatOptionInExistingDalog &&
              this.state.existingRepeatOption === "Custom" ? (
                <TextField
                  id="standard-select-client"
                  select
                  label="Custom Frequency"
                  variant="outlined"
                  margin="normal"
                  className={classes.textField}
                  value={this.state.existingCustomFreq}
                  onChange={this.handleChangeCustom("existingCustomFreq")}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                >
                  {customFreqOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              ) : null}

              {this.state.existingCustomFreq === "Specific Days" ? (
                <MuiThemeProvider theme={theme}>
                  <FormGroup row>
                    <FormLabel component="legend">Every</FormLabel>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.sun}
                          onChange={this.handleChangeCheck("sun")}
                          value="sun"
                          color="primary"
                        />
                      }
                      label="Su"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.mon}
                          onChange={this.handleChangeCheck("mon")}
                          value="mon"
                          color="primary"
                        />
                      }
                      label="M"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.tues}
                          onChange={this.handleChangeCheck("tues")}
                          value="Tues"
                          color="primary"
                        />
                      }
                      label="T"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.wed}
                          onChange={this.handleChangeCheck("wed")}
                          value="Wed"
                          color="primary"
                        />
                      }
                      label="W"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.thu}
                          onChange={this.handleChangeCheck("thu")}
                          value="thu"
                          color="primary"
                        />
                      }
                      label="Th"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.fri}
                          onChange={this.handleChangeCheck("fri")}
                          value="fri"
                          color="primary"
                        />
                      }
                      label="F"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.sat}
                          onChange={this.handleChangeCheck("sat")}
                          value="sat"
                          color="primary"
                        />
                      }
                      label="Sa"
                    />
                  </FormGroup>
                </MuiThemeProvider>
              ) : null}

              {this.state.isShowRepeatOptionInExistingDalog &&
              this.state.existingCustomFreq === "Every x days" ? (
                <TextField
                  id="standard-newNumOccurences"
                  label="Every Number of Days"
                  variant="outlined"
                  className={classes.textField2}
                  value={this.state.existingEveryNumDays}
                  onChange={this.handleChangeCustom("existingEveryNumDays")}
                  margin="normal"
                />
              ) : null}

              {this.state.isShowRepeatOptionInExistingDalog &&
              this.state.existingCustomFreq === "Weekly" ? (
                <TextField
                  id="standard-newNumOccurences"
                  label="Every Number of Weeks"
                  variant="outlined"
                  className={classes.textField2}
                  value={this.state.existingRepeatEveryNumWeeks}
                  onChange={this.handleChangeCustom(
                    "existingRepeatEveryNumWeeks"
                  )}
                  margin="normal"
                />
              ) : null}

              {this.state.existingCustomFreq === "Monthly" ? (
                <TextField
                  id="standard-newNumOccurences"
                  label="Every Number of Months"
                  variant="outlined"
                  className={classes.textField2}
                  value={this.state.existingRepeatEveryNumMonths}
                  onChange={this.handleChangeCustom(
                    "existingRepeatEveryNumMonths"
                  )}
                  margin="normal"
                />
              ) : null}

              {this.state.isShowRepeatOptionInExistingDalog &&
              this.state.existingCheckedRepeat ? (
                <TextField
                  id="standard-select-client"
                  select
                  label="End Repeat"
                  variant="outlined"
                  margin="normal"
                  className={classes.textField2}
                  value={this.state.existingEndRepeat}
                  onChange={this.handleChange2("existingEndRepeat")}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                >
                  {repeatEndOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              ) : null}

              {this.state.isShowRepeatOptionInExistingDalog &&
              this.state.existingEndRepeat === "After" ? (
                <TextField
                  id="standard-newNumOccurences"
                  label="Occurences"
                  variant="outlined"
                  className={classes.textField2}
                  value={this.state.existingNumOccurences}
                  onChange={this.handleChange2("existingNumOccurences")}
                  margin="normal"
                />
              ) : null}

              {this.state.existingEndRepeat === "On Date" ? (
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <MuiThemeProvider theme={theme2}>
                    <DatePicker
                      inputVariant="outlined"
                      className={classes.textField2}
                      margin="normal"
                      id="mui-pickers-date"
                      label="End On"
                      value={this.state.existingEndDateOccurrence}
                      onChange={this.handleChange2("existingEndDateOccurrence")}
                    />
                  </MuiThemeProvider>
                </MuiPickersUtilsProvider>
              ) : null}
              <Grid>
                <MuiThemeProvider theme={theme}>
                  <IconButton onClick={this.handleDeleteDialogOpen}>
                    <DeleteForeverIcon color="secondary" fontSize="large" />
                  </IconButton>
                </MuiThemeProvider>
              </Grid>
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
                  Are you sure you want to delete this appointment?
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Once this appointment has been deleted, it cannot be undone.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleDeleteDialogClose}>No</Button>
                  <Button onClick={this.handleDelete} autoFocus>
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>
            </DialogContent>
            <Grid container justify="flex-end" alignItems="flex-end">
              <MuiThemeProvider theme={theme2}>
                <DialogActions>
                  <Button onClick={this.handleCloseExisting} color="primary">
                    Cancel
                  </Button>

                  <Button color="primary">Save</Button>
                </DialogActions>
              </MuiThemeProvider>
            </Grid>
          </form>
        </Dialog>
        {/* sole or repeating event? */}
        <Dialog
          open={this.state.isSoleDialog}
          onClose={this.handleIsSoleDialogClose}
        >
          <DialogTitle>Recurring</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This is a recurring event. Do you want to select the event series
              or the event occurrence?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleOccurence}>occurrence</Button>
            <Button onClick={this.handleSeries} autoFocus>
              series
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={this.state.open} onClose={this.handleClose}>
          <form className={classes.container} noValidate autoComplete="off">
            <DialogContent>
              <TextField
                required
                id="bill_type"
                select
                label="Bill Type"
                className={classes.textField}
                value={this.state.newBillType}
                onChange={e => this.setState({ newBillType: e.target.value })}
                margin="normal"
                variant="outlined"
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
              >
                {newBillTypes.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                required
                id="newClient"
                select
                label="Client"
                className={classes.textField}
                value={this.state.newClient}
                onChange={this.handleChange("newClient")}
                margin="normal"
                variant="outlined"
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
              >
                {clientData.map(option => (
                  <MenuItem key={option.id} value={option.client_full_name}>
                    {option.client_full_name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="standard-select-therapist"
                select
                label="Therapist"
                variant="outlined"
                margin="normal"
                className={classes.textField}
                value={this.state.newTherapist}
                onChange={this.handleChange("newTherapist")}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
              >
                {therapistData.map(option => (
                  <MenuItem key={option.id} value={option.member_full_name}>
                    {option.member_full_name}
                  </MenuItem>
                ))}
              </TextField>
              <MuiThemeProvider theme={theme}>
                <TextField
                  required
                  id="newLocation"
                  label="Location"
                  className={classes.textField2}
                  value={this.state.newLocation}
                  onChange={e => this.setState({ newLocation: e.target.value })}
                  margin="normal"
                  variant="outlined"
                />
              </MuiThemeProvider>
              <TextField
                required
                id="newCategory"
                select
                label="Category"
                className={classes.textField2}
                value={this.state.newCategory}
                onChange={e => this.setState({ newCategory: e.target.value })}
                margin="normal"
                variant="outlined"
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
              >
                {categories.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <MuiThemeProvider theme={theme}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <Grid container>
                    <MuiThemeProvider theme={theme2}>
                      <DatePicker
                        inputVariant="outlined"
                        margin="normal"
                        className={classes.textField2}
                        label="Date picker"
                        value={selectedDate}
                        onChange={this.handleDateChangeStart}
                      />

                      <TimePicker
                        margin="normal"
                        inputVariant="outlined"
                        className={classes.textField2}
                        label="Time picker"
                        value={selectedDate}
                        onChange={this.handleDateChangeStart}
                      />
                    </MuiThemeProvider>
                  </Grid>
                </MuiPickersUtilsProvider>
              </MuiThemeProvider>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <Grid container>
                  <MuiThemeProvider theme={theme2}>
                    <DatePicker
                      margin="normal"
                      inputVariant="outlined"
                      label="Date picker"
                      className={classes.textField2}
                      value={endSelectedDate}
                      onChange={this.handleDateChangeEnd}
                    />
                    <TimePicker
                      inputVariant="outlined"
                      margin="normal"
                      label="Time picker"
                      className={classes.textField2}
                      value={endSelectedDate}
                      onChange={this.handleDateChangeEnd}
                    />
                  </MuiThemeProvider>
                </Grid>
              </MuiPickersUtilsProvider>
              <Container>
                <MuiThemeProvider theme={theme}>
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.checkedRepeat}
                          onChange={this.handleChangeCheck2("checkedRepeat")}
                          value="checkedRepeat"
                          color="primary"
                        />
                      }
                      label="Repeat"
                    />
                  </FormGroup>
                </MuiThemeProvider>
              </Container>
              {this.state.checkedRepeat ? (
                <TextField
                  id="standard-select-repeatOption"
                  select
                  label="Repeats"
                  variant="outlined"
                  className={classes.textField}
                  value={this.state.repeatOption}
                  onChange={this.handleChange("repeatOption")}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                >
                  {repeatOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              ) : null}

              {this.state.repeatOption === "Custom" ? (
                <TextField
                  id="standard-select-client"
                  select
                  label="Custom Frequency"
                  variant="outlined"
                  margin="normal"
                  className={classes.textField}
                  value={this.state.newCustomFreq}
                  onChange={this.handleChangeCustom("newCustomFreq")}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                >
                  {customFreqOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              ) : null}

              {this.state.newCustomFreq === "Specific Days" ? (
                <MuiThemeProvider theme={theme}>
                  <FormGroup row>
                    <FormLabel component="legend">Every</FormLabel>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.sun}
                          onChange={this.handleChangeCheck("sun")}
                          value="sun"
                          color="primary"
                        />
                      }
                      label="Su"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.mon}
                          onChange={this.handleChangeCheck("mon")}
                          value="mon"
                          color="primary"
                        />
                      }
                      label="M"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.tues}
                          onChange={this.handleChangeCheck("tues")}
                          value="tues"
                          color="primary"
                        />
                      }
                      label="T"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.wed}
                          onChange={this.handleChangeCheck("wed")}
                          value="wed"
                          color="primary"
                        />
                      }
                      label="W"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.thu}
                          onChange={this.handleChangeCheck("thu")}
                          value="thu"
                          color="primary"
                        />
                      }
                      label="Th"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.fri}
                          onChange={this.handleChangeCheck("fri")}
                          value="fri"
                          color="primary"
                        />
                      }
                      label="F"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.sat}
                          onChange={this.handleChangeCheck("sat")}
                          value="sat"
                          color="primary"
                        />
                      }
                      label="Sa"
                    />
                  </FormGroup>
                </MuiThemeProvider>
              ) : null}

              {this.state.newCustomFreq === "Every x days" ? (
                <TextField
                  id="standard-newNumOccurences"
                  label="Every Number of Days"
                  variant="outlined"
                  className={classes.textField2}
                  value={this.state.newRepeatEveryNumDays}
                  onChange={this.handleChangeCustom("newRepeatEveryNumDays")}
                  margin="normal"
                />
              ) : null}

              {this.state.existingCustomFreq === "Weekly" ? (
                <TextField
                  id="standard-newNumOccurences"
                  label="Every Number of Weeks"
                  variant="outlined"
                  className={classes.textField2}
                  value={this.state.newRepeatEveryNumWeeks}
                  onChange={this.handleChangeCustom("newRepeatEveryNumWeeks")}
                  margin="normal"
                />
              ) : null}

              {this.state.existingCustomFreq === "Monthly" ? (
                <TextField
                  id="standard-newNumOccurences"
                  label="Every Number of Months"
                  variant="outlined"
                  className={classes.textField2}
                  value={this.state.newRepeatEveryNumMonths}
                  onChange={this.handleChangeCustom("newRepeatEveryNumMonths")}
                  margin="normal"
                />
              ) : null}

              {this.state.checkedRepeat ? (
                <TextField
                  id="standard-select-client"
                  select
                  label="End Repeat"
                  variant="outlined"
                  margin="normal"
                  className={classes.textField2}
                  value={this.state.newEndRepeat}
                  onChange={this.handleChange2("newEndRepeat")}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                >
                  {repeatEndOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              ) : null}

              {this.state.newEndRepeat === "After" ? (
                <TextField
                  id="standard-newNumOccurences"
                  label="Occurences"
                  variant="outlined"
                  className={classes.textField2}
                  value={this.state.newNumOccurences}
                  onChange={this.handleChange2("newNumOccurences")}
                  margin="normal"
                />
              ) : null}

              {this.state.newEndRepeat === "On Date" ? (
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <MuiThemeProvider theme={theme2}>
                    <DatePicker
                      inputVariant="outlined"
                      className={classes.textField2}
                      margin="normal"
                      id="mui-pickers-date"
                      label="End On"
                      value={this.state.selectedDateOccurenceEnd}
                      onChange={this.handleDateOccurenceChange}
                    />
                  </MuiThemeProvider>
                </MuiPickersUtilsProvider>
              ) : null}
            </DialogContent>
            <Grid container justify="flex-end" alignItems="flex-end">
              <MuiThemeProvider theme={theme2}>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Cancel
                  </Button>

                  <Button
                    onClick={() => {
                      this.onSubmit();
                    }}
                    color="primary"
                  >
                    Save
                  </Button>

                  {/*
              <Button onClick={this.printState} color="primary">
                Print State
              </Button>
              */}
                </DialogActions>
              </MuiThemeProvider>
            </Grid>
          </form>
        </Dialog>
      </div>
    );
  }
}

ReactCalendarBase.propTypes = propTypes;

export default withRouter(withStyles(styles)(ReactCalendarBase));
