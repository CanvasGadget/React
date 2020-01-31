import React from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import moment from "moment";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Redirect } from "react-router-dom";
import Grey from "@material-ui/core/colors/grey";
import Slider from "@material-ui/core/Slider";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Section from "../TemplateBuilder/Section";
import { SECTION_TYPES } from "../constants/mockData";

import MySnackbarContentWrapper from "../common/MySnackbarContentWrapper";

import API from "../utils/API";

const styles = theme => ({
  /* 
  clientAvatar: {
    margin: 10,
    color: theme.palette.getContrastText(Grey[800]),
    backgroundColor: Grey[800],
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

  letter: {
    color: Grey[500]
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

  rootRating: {
    width: 600
  },
  marginRating: {
    height: theme.spacing(3)
  },
  textFieldRating: {
    // marginLeft: theme.spacing(1)
    marginRight: theme.spacing(1),
    width: 300
  },

  marginPercScale: {
    height: theme.spacing(3)
  },
  textFieldScaleTop: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(1),
    width: 300
  },
  textFieldScale: {
    // marginLeft: theme.spacing(1)
    marginRight: theme.spacing(1),
    width: 300
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

  saveAndSendButton: {
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
    value: "Narrative",
    label: "Narrative"
  },

  {
    value: "SOAP",
    label: "SOAP"
  },

  {
    value: "Rating Scale",
    label: "Rating Scale"
  },
  {
    value: "Percentage Scale",
    label: "Percentage Scale"
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

const marks = [
  {
    value: 1,
    label: "1"
  },

  {
    value: 2,
    label: "2"
  },

  {
    value: 3,
    label: "3"
  },

  {
    value: 4,
    label: "4"
  },
  {
    value: 5,
    label: "5"
  },
  {
    value: 6,
    label: "6"
  },
  {
    value: 7,
    label: "7"
  },
  {
    value: 8,
    label: "8"
  },
  {
    value: 9,
    label: "9"
  },
  {
    value: 10,
    label: "10"
  }
];

class Documentation extends React.Component {
  state = {
    clientData: [],
    therapistData: [],
    eventsData: [],
    event: 0, // current event id
    client: "",
    noteType: "",
    attendanceType: "",
    billType: "",
    sessionDate: "",
    calID: "",
    checkedPayor: true,
    checkedFamily: false,
    checkedTherapist: false,
    checkedPortal: false,
    validationBox: false,
    redirect: false,
    narrativeNote: null,
    noteTypes: [],
    // SOAP
    s_note: "",
    o_note: "",
    a_note: "",
    p_note: "",
    // Rating Scale
    rating1: 10,
    rating2: 10,
    rating3: 10,
    ratingDesc1: null,
    ratingDesc2: null,
    ratingDesc3: null,
    addRating2: false,
    addRating3: false,
    // Percentage Scale
    scaleResult: null,
    scaleResult2: null,
    scaleResult3: null,
    addScale2: false,
    addScale3: false,
    sections: []
  };

  async componentDidMount() {
    try {
      const eventsResp = await API.get("/events");
      //const membersResp = await API.get("/members");
      //const clientsResp = await API.get("/clients/all");
      const events = eventsResp.data.data;
      //const members = membersResp.data.data;
      //const clients = clientsResp.data.data;
      const formsResp = await API.get("/templates/templates");
      const formData = formsResp.data.data;
      this.setState({
        // therapistData: members,
        //clientData: clients
        eventsData: events,
        noteTypes: formData.map(template => {
          return {
            value: template.id,
            label: template.template_name
          };
        })
      });
      this.setState({ event: this.props.location.state.curEventId }, () => {
        this.changeContentWithEventId();
        //this.changeInitialsWithMemberId();
      });
    } catch (error) {
      console.log("Data fetching error: ", error);
    }
  }

  changeContentWithEventId() {
    const event = this.state.eventsData.find(
      ({ id }) => id === this.state.event
    );
    if (event) {
      const { id, clients, start, attendance, bill_type } = event;
      this.setState({
        // id: id,
        // privliges,
        client: clients,
        sessionDate: start,
        attendanceType: attendance,
        billType: bill_type
      });
    }
  }

  onSubmit() {
    //experiment keeping preventDefault
    //e.preventDefault();

    const noteObj = {
      narrativeNote: this.state.narrativeNote,
      attendanceType: this.state.attendanceType,
      calID: this.state.calID
    };
    console.log("submitted note", noteObj);

    if (noteObj.narrativeNote === "") {
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

    /* end of submit */
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleChangeNoteType = name => event => {
    this.setState({
      [name]: event.target.value,
      // Narrative
      narrativeNote: null,
      // SOAP
      s_note: null,
      o_note: null,
      a_note: null,
      p_note: null,
      // Rating Scale
      rating1: null,
      rating2: null,
      rating3: null,
      ratingDesc1: null,
      ratingDesc2: null,
      ratingDesc3: null,
      addRating2: false,
      addRating3: false,
      // Percentage Scale
      scaleResult: null,
      scaleResult2: null,
      scaleResult3: null,
      addScale2: false,
      addScale3: false
    });
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

  handleChangeSlider = name => (e, value) => {
    this.setState({
      [name]: value
    });
  };

  handleAdd2ndRating = name => event => {
    this.setState({
      [name]: event.target.checked,
      addRating2: !this.state.addRating2,
      addRating3: false,
      ratingDesc2: null,
      rating2: 10,
      ratingDesc3: null,
      rating3: 10
    });
  };

  handleAdd3rdRating = name => event => {
    this.setState({
      [name]: event.target.checked,
      addRating3: !this.state.addRating3,
      ratingDesc3: null,
      rating3: 10
    });
  };

  handleChangeGoalResult1 = event => {
    this.setState({ scaleResult: event.target.value });
  };

  handleChangeScaleResult2 = event => {
    this.setState({ scaleResult2: event.target.value });
  };

  handleChangeScaleResult3 = event => {
    this.setState({ scaleResult3: event.target.value });
  };

  handleAdd2ndGoal = name => event => {
    this.setState({
      [name]: event.target.checked,
      addScale2: !this.state.addScale2,
      addScale3: null,
      scaleResult2: null
    });
  };

  handleAdd3rdGoal = name => event => {
    this.setState({
      [name]: event.target.checked,
      addScale3: !this.state.addScale3,
      scaleResult3: null
    });
  };

  onChangeCheckboxField = (sectionId, checkboxId = 0, name, value) => {
    const { sections } = this.state;

    const sectionIndex = sections.findIndex(
      section => section.id === sectionId
    );

    const updatedSections = sections.slice();
    updatedSections[sectionIndex]["fields"][0]["checkboxes"][checkboxId][
      name
    ] = value;

    this.setState({ sections: updatedSections });
  };

  onChangeSectionField = (sectionId, fieldId = 0, name, value) => {
    const { sections } = this.state;

    const sectionIndex = sections.findIndex(
      section => section.id === sectionId
    );

    const updatedSections = sections.slice();
    updatedSections[sectionIndex]["fields"][fieldId][name] = value;

    this.setState({ sections: updatedSections });
  };

  onSelectTemplate = name => async event => {
    try {
      const templateId = event.target.value;

      console.log(templateId);
      const res = await API.get(`templates/templates/${templateId}`);

      const template = res.data.data;

      this.setState({
        [name]: template.id,
        sections: JSON.parse(template.sections)
      });
    } catch (error) {
      console.error("Failed to fetch template.");
    }
  };

  render() {
    const { classes } = this.props;

    const { eventsData } = this.state;

    return (
      <div>
        {this.state.redirect ? (
          <Redirect
            to={{
              pathname: "/calendar"
            }}
          />
        ) : null}
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
        <Container maxWidth="lg">
          {/* Avatar */}
          {/*   <Grid container justify="center" alignItems="center">
            <IconButton color="primary" className={classes.clientAvatar}>
              {this.state.clientInitials}
            </IconButton>
          </Grid> */}
          <Grid
            container
            direction="row"
            //justify="space-between"
            alignItems="center"
          >
            <TextField
              id="client-textbox"
              label="Client"
              value={this.state.client}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="session-date"
              label="Session Date"
              value={moment(this.state.sessionDate).format("MM/DD/YYYY h:mm a")}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />

            <MuiThemeProvider theme={theme}>
              <TextField
                id="attendance-type"
                select
                label="Attendance"
                className={classes.textField2}
                value={this.state.attendanceType}
                // value={this.state.billType}
                onChange={this.handleChange("attendanceType")}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                margin="normal"
                variant="outlined"
              >
                {attendanceTypes.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </MuiThemeProvider>

            <TextField
              id="note-type"
              select
              label="Note Type"
              className={classes.textField2}
              value={this.state.noteType}
              onChange={this.onSelectTemplate("noteType")}
              SelectProps={{
                MenuProps: {
                  //className: classes.menu
                }
              }}
              margin="normal"
              variant="outlined"
            >
              {this.state.noteTypes.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Container maxWidth="lg">
              <MuiThemeProvider theme={theme}>
                {this.state.sections.map(section => {
                  return (
                    <Section
                      key={section.id}
                      fields={section.fields}
                      classes={classes}
                      onChange={this.onChangeSectionField}
                      onChangeCheckbox={this.onChangeCheckboxField}
                      sectionId={section.id}
                      sectionType={section.type}
                      sectionTypes={SECTION_TYPES}
                      theme={theme}
                    />
                  );
                })}
              </MuiThemeProvider>
            </Container>
            {/*     <MuiThemeProvider theme={theme}>
              <TextField
                id="note-type"
                select
                label="Note Type"
                className={classes.textField2}
                value={this.state.noteType}
                onChange={this.handleChange("noteType")}
                SelectProps={{
                  MenuProps: {
                    //className: classes.menu
                  }
                }}
                margin="normal"
                variant="outlined"
              >
                {noteTypes.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </MuiThemeProvider> */}
            {/* 
            <TextField
              id="session-date"
              label="Session Time"
              value={moment(this.state.sessionDate).format("h:mm a")}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            /> */}
          </Grid>
          {/* Regular Note */}
          {this.state.noteType === "Narrative" ? (
            <TextField
              id="reg-note"
              label="Notes"
              //style={{ margin: 8 }}
              value={this.state.narrativeNote}
              // className={classes.textField3}
              placeholder="Add notes here"
              fullWidth
              onChange={this.handleChange("narrativeNote")}
              variant="outlined"
              multiline
              rows="12"
              margin="normal"
              /*  InputLabelProps={{
              shrink: true
            }} */
            />
          ) : null}
          {/* SOAP Note */}
          {this.state.noteType === "SOAP" ? (
            <Grid container direction="row">
              <Typography variant="h5" col className={classes.letter}>
                S
              </Typography>
              <TextField
                id="s-note"
                //label="S"
                //style={{ margin: 8 }}
                // className={classes.textField3}
                //placeholder="Add notes here"
                value={this.state.s_note}
                fullWidth
                onChange={this.handleChange("s_note")}
                variant="outlined"
                multiline
                rows="2"
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <Typography variant="h5" className={classes.letter}>
                O
              </Typography>
              <TextField
                id="o-note"
                //label="S"
                //style={{ margin: 8 }}
                // className={classes.textField3}
                //placeholder="Add notes here"
                value={this.state.o_note}
                onChange={this.handleChange("o_note")}
                fullWidth
                variant="outlined"
                multiline
                rows="2"
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <Typography variant="h5" className={classes.letter}>
                A
              </Typography>
              <TextField
                id="a-note"
                //label="S"
                //style={{ margin: 8 }}
                // className={classes.textField3}
                //placeholder="Add notes here"
                value={this.state.a_note}
                onChange={this.handleChange("a_note")}
                fullWidth
                variant="outlined"
                multiline
                rows="2"
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <Typography variant="h5" className={classes.letter}>
                P
              </Typography>
              <TextField
                id="p-note"
                //label="S"
                //style={{ margin: 8 }}
                // className={classes.textField3}
                //placeholder="Add notes here"
                value={this.state.p_note}
                onChange={this.handleChange("p_note")}
                fullWidth
                variant="outlined"
                multiline
                rows="2"
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
          ) : null}
          {this.state.noteType === "Rating Scale" ? (
            <MuiThemeProvider theme={theme}>
              <TextField
                id="first-box"
                label="Title"
                value={this.state.ratingDesc1}
                className={classes.textFieldRating}
                onChange={this.handleChange("ratingDesc1")}
                margin="normal"
                variant="outlined"
              />
              <div className={classes.rootRating}>
                <div className={classes.marginRating} />
                <Slider
                  defaultValue={10}
                  //getAriaValueText={valuetext}
                  // aria-labelledby="discrete-slider-custom"
                  //step={1}
                  min={1}
                  max={10}
                  value={this.state.rating1}
                  onChange={this.handleChangeSlider("rating1")}
                  valueLabelDisplay="auto"
                  marks={marks}
                />

                <div className={classes.marginRating} />

                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={this.state.addRating2}
                      onChange={this.handleAdd2ndRating("addRating2")}
                      value={this.state.addRating2}
                    />
                  }
                  label="Add additional rating"
                />
              </div>
              {this.state.addRating2 ? (
                <TextField
                  id="second-box"
                  label="Title"
                  onChange={this.handleChange("ratingDesc2")}
                  value={this.state.ratingDesc2}
                  className={classes.textFieldRating}
                  margin="normal"
                  variant="outlined"
                />
              ) : null}
              <div className={classes.rootRating}>
                <div className={classes.marginRating} />
                {this.state.addRating2 ? (
                  <Slider
                    defaultValue={10}
                    //getAriaValueText={valuetext}
                    // aria-labelledby="discrete-slider-custom"
                    // step={1}
                    min={1}
                    max={10}
                    value={this.state.rating2}
                    onChange={this.handleChangeSlider("rating2")}
                    valueLabelDisplay="auto"
                    marks={marks}
                  />
                ) : null}
                <div className={classes.marginRating} />
                {this.state.addRating2 ? (
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        checked={this.state.addRating3}
                        onChange={this.handleAdd3rdRating("addRating3")}
                        value={this.state.addRating3}
                      />
                    }
                    label="Add additional rating"
                  />
                ) : null}
              </div>
              {this.state.addRating3 ? (
                <TextField
                  id="third-box"
                  label="Title"
                  onChange={this.handleChange("ratingDesc3")}
                  value={this.state.ratingDesc3}
                  className={classes.textFieldRating}
                  margin="normal"
                  variant="outlined"
                />
              ) : null}
              <div className={classes.rootRating}>
                <div className={classes.marginRating} />
                {this.state.addRating3 ? (
                  <Slider
                    defaultValue={10}
                    //getAriaValueText={valuetext}
                    // aria-labelledby="discrete-slider-custom"
                    step={1}
                    min={1}
                    max={10}
                    value={this.state.rating3}
                    onChange={this.handleChangeSlider("rating3")}
                    valueLabelDisplay="auto"
                    marks={marks}
                  />
                ) : null}
              </div>
            </MuiThemeProvider>
          ) : null}
          {this.state.noteType === "Percentage Scale" ? (
            <FormControl component="fieldset">
              <MuiThemeProvider theme={theme}>
                <TextField
                  id="first-goal"
                  label="Title"
                  //value={this.state.firstText}
                  className={classes.textFieldScaleTop}
                  marginPercScale="normal"
                  variant="outlined"
                />
                <RadioGroup
                  aria-label="first-group"
                  name="first-group"
                  //   value={this.state.scaleResult}
                  onChange={this.handleChangeGoalResult1}
                  row
                >
                  <FormControlLabel
                    checked={this.state.scaleResult === "Never (0%)"}
                    value="Never (0%)"
                    control={<Radio color="primary" />}
                    label="Never (0%)"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    checked={this.state.scaleResult === "Rarely (<50%)"}
                    value="Rarely (<50%)"
                    control={<Radio color="primary" />}
                    label="Rarely (<50%)"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    checked={this.state.scaleResult === "Inconsistent (51-79%)"}
                    value="Inconsistent (51-79%)"
                    control={<Radio color="primary" />}
                    label="Inconsistent (51-79%)"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    checked={this.state.scaleResult === "Consistent (>80%)"}
                    value="Consistent (>80%)"
                    control={<Radio color="primary" />}
                    label="Consistent (>80%)"
                    labelPlacement="end"
                  />
                </RadioGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={this.state.addScale2}
                      onChange={this.handleAdd2ndGoal("addScale2")}
                      value={this.state.addScale2}
                    />
                  }
                  label="Add additional goal"
                />

                {/*     Second Goal  */}
                {this.state.addScale2 ? (
                  <TextField
                    id="second-goal"
                    label="Title"
                    //value={this.state.firstText}
                    className={classes.textFieldScale}
                    marginPercScale="normal"
                    variant="outlined"
                  />
                ) : null}
                {this.state.addScale2 ? (
                  <RadioGroup
                    aria-label="position"
                    name="second-group"
                    //value={this.state.scaleResult2}
                    onChange={this.handleChangeScaleResult2}
                    row
                  >
                    <FormControlLabel
                      checked={this.state.scaleResult2 === "Never (0%)"}
                      value="Never (0%)"
                      control={<Radio color="primary" />}
                      label="Never (0%)"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      checked={this.state.scaleResult2 === "Rarely (<50%)"}
                      value="Rarely (<50%)"
                      control={<Radio color="primary" />}
                      label="Rarely (<50%)"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      checked={
                        this.state.scaleResult2 === "Inconsistent (51-79%)"
                      }
                      value="Inconsistent (51-79%)"
                      control={<Radio color="primary" />}
                      label="Inconsistent (51-79%)"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      checked={this.state.scaleResult2 === "Consistent (>80%)"}
                      value="Consistent (>80%)"
                      control={<Radio color="primary" />}
                      label="Consistent (>80%)"
                      labelPlacement="end"
                    />
                  </RadioGroup>
                ) : null}

                {this.state.addScale2 ? (
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        checked={this.state.addScale3}
                        onChange={this.handleAdd3rdGoal("addScale3")}
                        value={this.state.addScale3}
                      />
                    }
                    label="Add additional goal"
                  />
                ) : null}
                {/*  Third Goal */}
                {this.state.addScale3 ? (
                  <TextField
                    id="second-goal"
                    label="Title"
                    //value={this.state.firstText}
                    className={classes.textFieldScale}
                    marginPercScale="normal"
                    variant="outlined"
                  />
                ) : null}
                {this.state.addScale3 ? (
                  <RadioGroup
                    aria-label="position"
                    name="second-group"
                    //value={this.state.scaleResult2}
                    onChange={this.handleChangeScaleResult3}
                    row
                  >
                    <FormControlLabel
                      checked={this.state.scaleResult3 === "Never (0%)"}
                      value="Never (0%)"
                      control={<Radio color="primary" />}
                      label="Never (0%)"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      checked={this.state.scaleResult3 === "Rarely (<50%)"}
                      value="Rarely (<50%)"
                      control={<Radio color="primary" />}
                      label="Rarely (<50%)"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      checked={
                        this.state.scaleResult3 === "Inconsistent (51-79%)"
                      }
                      value="Inconsistent (51-79%)"
                      control={<Radio color="primary" />}
                      label="Inconsistent (51-79%)"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      checked={this.state.scaleResult3 === "Consistent (>80%)"}
                      value="Consistent (>80%)"
                      control={<Radio color="primary" />}
                      label="Consistent (>80%)"
                      labelPlacement="end"
                    />
                  </RadioGroup>
                ) : null}
              </MuiThemeProvider>
            </FormControl>
          ) : null}
          {/* Email options */}
          <FormLabel className={classes.labelStyle} component="legend">
            Email:
          </FormLabel>
          <MuiThemeProvider theme={theme}>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.checkedPayor}
                    onChange={this.handleChangeCheck("checkedPayor")}
                    value="checkedPayor"
                    color="primary"
                  />
                }
                label="Payor"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.checkedFamily}
                    onChange={this.handleChangeCheck("checkedFamily")}
                    value="checkedFamily"
                    color="primary"
                  />
                }
                label="Family"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.checkedTherapist}
                    onChange={this.handleChangeCheck("checkedTherapist")}
                    value="checkedTherapist"
                    color="primary"
                  />
                }
                label="Therapist"
              />
              {/*    <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.checkedPortal}
                    onChange={this.handleChangeCheck("checkedPortal")}
                    value="checkedPortal"
                    color="primary"
                  />
                }
                label="Send to Portal"
              /> */}
            </FormGroup>
          </MuiThemeProvider>
          <Grid container direction="row" justify="flex-end">
            <Button
              className={classes.saveButton}
              size="large"
              variant="contained"
              onClick={() => {
                this.onSubmit(
                  this.state.calID,
                  this.state.narrativeNote,
                  this.state.attendanceType
                );
              }}
            >
              Save
            </Button>
            <Button
              className={classes.saveAndSendButton}
              size="large"
              variant="contained"
              /*  onClick={() => {
                this.onSubmit(
                  this.state.calID,
                  this.state.narrativeNote,
                  this.state.attendanceType
                );
              }} */
            >
              Save and Send
            </Button>
          </Grid>
        </Container>
      </div>
    );
  }
}

Documentation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(Documentation));
