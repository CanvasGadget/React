import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import React from "react";
import FormBuilderCheckbox from "./Fields/Checkbox";
import FormBuilderPercentageScale from "./Fields/PercentageScale";
import FormBuilderRatingScale from "./Fields/RatingScale";
import FormBuilderTextField from "./Fields/TextField";

class Section extends React.Component {
  state = {
    checkBoxTitle: ""
  };

  handleChange = (name, fieldId) => event => {
    const { sectionId, onChange } = this.props;
    onChange(sectionId, fieldId, name, event.target.value);
  };

  handleCheckbox = (name, fieldId) => event => {
    const { sectionId, onChangeCheckbox } = this.props;

    const value = name === "label" ? event.target.value : event.target.checked;
    onChangeCheckbox(sectionId, fieldId, name, value);
  };

  handleCheckboxField = action => event => {
    const { sectionId, onAddRemoveCheckbox } = this.props;
    onAddRemoveCheckbox(sectionId, action);
  };

  handleNewField = () => event => {
    const { sectionId, onAddRating } = this.props;
    onAddRating(sectionId, event.target.checked);
  };

  handleChangeSlider = (name, fieldId) => (e, value) => {
    const { sectionId, onChange } = this.props;
    onChange(sectionId, fieldId, name, value);
  };

  handleChangeGoal = (name, fieldId) => event => {
    const { sectionId, onChange } = this.props;
    onChange(sectionId, fieldId, name, event.target.value);
  };

  render() {
    const {
      classes,
      editMode,
      fields,
      onSectionAdd,
      onSectionRemove,
      onSectionTypeChange,
      sectionId,
      sectionType,
      sectionTypes,
      theme
    } = this.props;

    return (
      <div>
        {editMode && (
          <Grid
            container
            direction="column"
            //justify="space-between"
            alignItems="center"
          >
            <TextField
              id="note-type"
              select
              label="Section Type"
              className={classes.textField2}
              value={sectionType}
              onChange={onSectionTypeChange(sectionId)}
              SelectProps={{
                MenuProps: {
                  //className: classes.menu
                }
              }}
              margin="normal"
              variant="outlined"
            >
              {sectionTypes.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        )}

        {/* Textbox */}
        {sectionType === "Textbox" && (
          <FormBuilderTextField
            classes={classes}
            fields={fields}
            onChange={this.handleChange}
          />
        )}

        {/* Rating Scale */}
        {sectionType === "Rating Scale" && (
          <FormBuilderRatingScale
            classes={classes}
            editMode={editMode}
            fields={fields}
            onAddRating={this.handleNewField}
            onChange={this.handleChange}
            onChangeSlider={this.handleChangeSlider}
            theme={theme}
          />
        )}

        {/* Percentage Scale */}
        {sectionType === "Percentage Scale" && (
          <FormBuilderPercentageScale
            classes={classes}
            editMode={editMode}
            fields={fields}
            onAddGoal={this.handleNewField}
            onChange={this.handleChange}
            onChangeGoalResult={this.handleChangeGoal}
            theme={theme}
          />
        )}

        {/* Checkbox */}
        {sectionType === "Checkbox" && (
          <FormBuilderCheckbox
            classes={classes}
            editMode={editMode}
            fields={fields}
            onChange={this.handleChange}
            onChangeCheckbox={this.handleCheckbox}
            onAddRemove={this.handleCheckboxField}
          />
        )}

        {editMode && (
          <Grid container direction="row" justify="center" alignItems="center">
            <Button
              variant="contained"
              className={`${classes.colorButton} ${classes.marg}`}
              onClick={onSectionAdd(sectionId)}
            >
              Add Section
            </Button>

            <Button
              variant="contained"
              className={`${classes.colorButton} ${classes.marg}`}
              onClick={onSectionRemove(sectionId)}
            >
              Remove Section
            </Button>
          </Grid>
        )}
      </div>
    );
  }
}

Section.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Section;
