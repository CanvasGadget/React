import React from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
//import FormControlLabel from "@material-ui/core/FormControlLabel";
//import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
//import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
//import AddIcon from "@material-ui/icons/Add";
//import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Grey from "@material-ui/core/colors/grey";
//import Slider from "@material-ui/core/Slider";
//import FormControl from "@material-ui/core/FormControl";
//import Radio from "@material-ui/core/Radio";
//import RadioGroup from "@material-ui/core/RadioGroup";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Section from "../TemplateBuilder/Section";
import { SECTION_TYPES, MAX_SECTIONS } from "../constants/mockData";

import API from "../utils/API";
import { guid } from "../utils/Util";

const styles = theme => ({
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

  Section: {
    display: "none"
  },

  textField: {
    // marginLeft: theme.spacing(1)
    marginRight: theme.spacing(1),
    width: 300
  },

  letter: {
    color: Grey[500]
  },

  textFieldTitle: {
    //marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),

    width: 400
  },

  textField2: {
    //marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(5),
    width: 190
  },

  textField3: {
    //marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(10),
    width: 400
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

  colorButton: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(4),
    // marginBottom: theme.spacing(5),
    align: "center",
    /* this is text color */ color: theme.palette.getContrastText("#b2dfdb"),
    backgroundColor: "#b2dfdb",
    "&:hover": {
      backgroundColor: "#80cbc4"
    }
  },

  displayFlex: {
    display: "flex"
  }
});

const navStyle = {
  color: "black",
  textDecoration: "none"
};

const theme = createMuiTheme({
  palette: {
    primary: { main: "#b2dfdb" }
  }
});

class BuilderTest extends React.Component {
  state = {
    id: null,
    deleteDialog: false,
    newTemplateTitle: "",
    sections: [
      {
        id: guid(),
        fields: [{ title: "", notes: "" }],
        type: "Textbox"
      }
    ]
  };

  async componentDidMount() {
    if (this.props.match.params.id) {
      try {
        const res = await API.get(
          `templates/templates/${this.props.match.params.id}`
        );

        const template = res.data.data;

        this.setState({
          id: template.id,
          newTemplateTitle: template.template_name,
          sections: JSON.parse(template.sections)
        });
      } catch (error) {
        console.error("Failed to fetch template.");
      }
    }
  }

  componentWillUnmount() {
    this.setState({
      id: null,
      newTemplateTitle: "",
      sections: [
        {
          id: guid(),
          fields: [{ title: "", notes: "" }],
          type: "Textbox"
        }
      ]
    });
  }

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

  onAddNewRatingField = (sectionId, checked) => {
    const { sections } = this.state;

    const sectionIndex = sections.findIndex(
      section => section.id === sectionId
    );

    const fieldsLength = sections[sectionIndex]["fields"].length;

    const updatedSections = sections.slice();

    if (checked) {
      updatedSections[sectionIndex]["fields"].push({ rating: 10, title: "" });
    } else if (fieldsLength > 1) {
      updatedSections[sectionIndex]["fields"].pop();
    }

    this.setState({ sections: updatedSections });
  };

  onChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  onChangeCheckboxAddRemove = (sectionId, action) => {
    const { sections } = this.state;

    const sectionIndex = sections.findIndex(
      section => section.id === sectionId
    );

    const updatedSections = sections.slice();

    if (action === "add") {
      updatedSections[sectionIndex]["fields"][0]["checkboxes"].push({
        title: "",
        checkboxes: [{ checked: false, label: "" }]
      });
    } else {
      updatedSections[sectionIndex]["fields"][0]["checkboxes"].pop();
    }

    this.setState({ sections: updatedSections });
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

  onChangeSectionType = sectionId => event => {
    const { sections } = this.state;

    const sectionIndex = sections.findIndex(
      section => section.id === sectionId
    );

    const type = event.target.value;

    const updatedSections = sections.slice();
    updatedSections[sectionIndex].type = type;

    if (type === "TextField") {
      updatedSections[sectionIndex].fields = [{ notes: "", title: "" }];
    } else if (type === "Rating Scale") {
      updatedSections[sectionIndex].fields = [{ rating: 10, title: "" }];
    } else if (type === "Percentage Scale") {
      updatedSections[sectionIndex].fields = [{ title: "", value: "" }];
    } else if (type === "Checkbox") {
      updatedSections[sectionIndex].fields = [
        { title: "", checkboxes: [{ checked: false, label: "" }] }
      ];
    }

    this.setState({ sections: updatedSections });
  };

  onClickAddSection = sectionId => () => {
    const { sections } = this.state;

    if (sections.length >= MAX_SECTIONS) {
      return;
    }

    const sectionIndex = sections.findIndex(
      section => section.id === sectionId
    );

    const updatedSections = sections.slice();
    updatedSections.splice(sectionIndex + 1, 0, {
      id: guid(),
      fields: [{ title: "", notes: "" }],
      type: "Textbox"
    });

    this.setState({ sections: updatedSections });
  };

  onClickRemoveSection = sectionId => () => {
    const { sections } = this.state;

    if (sections.length <= 1) {
      return;
    }

    const sectionIndex = sections.findIndex(
      section => section.id === sectionId
    );

    const updatedSections = sections.slice();
    updatedSections.splice(sectionIndex, 1);

    this.setState({ sections: updatedSections });
  };

  onClickSave = async () => {
    try {
      const { id, newTemplateTitle, sections } = this.state;

      if (id) {
        // Update
        console.log('new :', id, newTemplateTitle, sections);
        await API.put(`templates/templates/${id}`, {
          name: newTemplateTitle,
          sections: JSON.stringify(sections),
          visible: "Yes"
        });
      } else {
        // Add
        await API.post("templates/templates", {
          name: newTemplateTitle,
          sections: JSON.stringify(sections),
          visible: "Yes"
        });
      }

      this.props.history.push("/notetemplates");
    } catch (error) {
      console.log(error);
    }
  };

  handleDeleteDialogOpen = () => {
    this.setState({ deleteDialog: true });
  };

  handleDeleteDialogClose = () => {
    this.setState({ deleteDialog: false });
  };

  onClickDelete = async () => {
    try {
      const { id, newTemplateTitle, sections } = this.state;
      await API.delete(`templates/delete/${id}`, {
        id: id,
        name: newTemplateTitle,
        sections: JSON.stringify(sections),
        visible: "Yes"
      });
      this.props.history.push("/notetemplates");
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { classes } = this.props;
    const { sections, id } = this.state;

    return (
      <div>
        <Container maxWidth="lg">
          <Grid
            container
            direction="column"
            //justify="space-between"
            alignItems="center"
          >
            <MuiThemeProvider theme={theme}></MuiThemeProvider>

            <TextField
              id="template-title"
              label="New Template Title"
              value={this.state.newTemplateTitle}
              className={classes.textFieldTitle}
              onChange={this.onChange("newTemplateTitle")}
              variant="outlined"
              margin="normal"
            />
          </Grid>

          <MuiThemeProvider theme={theme}>
            {sections.map(section => {
              return (
                <Section
                  key={section.id}
                  editMode
                  fields={section.fields}
                  classes={classes}
                  onAddRating={this.onAddNewRatingField}
                  onChange={this.onChangeSectionField}
                  onChangeCheckbox={this.onChangeCheckboxField}
                  onAddRemoveCheckbox={this.onChangeCheckboxAddRemove}
                  onSectionTypeChange={this.onChangeSectionType}
                  onSectionAdd={this.onClickAddSection}
                  onSectionRemove={this.onClickRemoveSection}
                  sectionId={section.id}
                  sectionType={section.type}
                  sectionTypes={SECTION_TYPES}
                  theme={theme}
                />
              );
            })}
          </MuiThemeProvider>

          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
          >
            <Button
              variant="contained"
              className={classes.colorButton}
              onClick={this.onClickSave}
            >
              Save
            </Button>
            {this.state.id ? (
              <Button
                variant="contained"
                className={classes.colorButton}
                onClick={this.handleDeleteDialogOpen}
              >
                Delete
              </Button>
            ) : null}
          </Grid>
        </Container>
        <Dialog
          open={this.state.deleteDialog}
          onClose={this.handleDeleteDialogClose}
        >
          <DialogTitle>
            Are you sure you want to delete this template?
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Once this template has been deleted, it cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDeleteDialogClose}>No</Button>
            <Button onClick={this.onClickDelete} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

BuilderTest.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(BuilderTest));
