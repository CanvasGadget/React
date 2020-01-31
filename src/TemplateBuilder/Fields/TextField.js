import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import React from "react";

function FormBuilderTextField(props) {
  const { classes, fields, onChange } = props;
  const { notes, title } = fields[0];

  return (
    <Grid container direction="column">
      <TextField
        id="reg-title"
        label="Textbox Title"
        //style={{ margin: 8 }}
        value={title}
        className={classes.textField}
        placeholder="Add title here"
        fullWidth
        onChange={onChange("title", 0)}
        variant="outlined"
        multiline
        //rows="12"
        margin="normal"
      />

      <TextField
        id="reg-notes"
        label="Textbox Notes"
        //style={{ margin: 8 }}
        value={notes}
        //className={classes.textField3}
        fullWidth
        onChange={onChange("notes", 0)}
        variant="outlined"
        multiline
        rows="12"
        margin="normal"
      />
    </Grid>
  );
}

FormBuilderTextField.propTypes = {
  classes: PropTypes.object.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({ title: PropTypes.string, notes: PropTypes.string })
  ),
  onChange: PropTypes.func.isRequired
};

export default FormBuilderTextField;
