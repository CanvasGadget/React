import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import React from "react";

function FormBuilderCheckbox(props) {
  const {
    classes,
    editMode,
    fields,
    onAddRemove,
    onChange,
    onChangeCheckbox
  } = props;
  const { checkboxes, title } = fields[0];

  return (
    <>
      <TextField
        id="checkbox-note"
        label="Checkbox Group Title"
        //style={{ margin: 8 }}
        value={title}
        className={classes.textField}
        //placeholder="Add notes here"
        //fullWidth
        onChange={onChange("title", 0)}
        variant="outlined"
        multiline
        //rows="12"
        margin="normal"
      />

      <div className={classes.marginRating} />

      <FormGroup>
        {checkboxes.map((checkbox, index) => {
          return (
            <div className={classes.displayFlex} key={index}>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={checkbox.checked}
                    onChange={onChangeCheckbox("checked", index)}
                  />
                }
                label=""
              />

              <TextField
                id="checkbox-note"
                value={checkbox.label}
                className={classes.textField}
                onChange={onChangeCheckbox("label", index)}
                margin="normal"
              />
            </div>
          );
        })}
      </FormGroup>

      {editMode && (
        <>
          <Button
            className={`${classes.colorButton} ${classes.marg}`}
            onClick={onAddRemove("add")}
          >
            Add More
          </Button>

          <Button
            className={`${classes.colorButton} ${classes.marg}`}
            onClick={onAddRemove("remove")}
          >
            Remove Last One
          </Button>
        </>
      )}
    </>
  );
}

FormBuilderCheckbox.defaultProps = {
  editMode: false
};

FormBuilderCheckbox.propTypes = {
  classes: PropTypes.object.isRequired,
  editMode: PropTypes.bool,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      checkboxes: PropTypes.arrayOf(
        PropTypes.shape({
          checked: PropTypes.bool,
          label: PropTypes.label
        })
      ),
      title: PropTypes.string
    })
  ),
  onAddRemove: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onChangeCheckbox: PropTypes.func.isRequired
};

export default FormBuilderCheckbox;
