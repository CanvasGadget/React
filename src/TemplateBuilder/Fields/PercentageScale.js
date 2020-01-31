import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { MuiThemeProvider } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { MAX_GOALS } from "../../constants/mockData";

function FormBuilderPercentageScale(props) {
  const {
    editMode,
    fields,
    classes,
    onAddGoal,
    onChange,
    onChangeGoalResult,
    theme
  } = props;

  return (
    <FormControl component="fieldset">
      <MuiThemeProvider theme={theme}>
        {fields.map((field, index) => {
          return (
            <Fragment key={index}>
              <TextField
                id="first-goal"
                label="Percentage Scale Title"
                value={field.title}
                className={classes.textFieldScaleTop}
                marginPercScale="normal"
                variant="outlined"
                onChange={onChange("title", index)}
              />

              <RadioGroup
                aria-label="first-group"
                name="first-group"
                //   value={this.state.scaleResult}
                onChange={onChangeGoalResult("value", index)}
                row
              >
                <FormControlLabel
                  checked={field.value === "Never (0%)"}
                  value="Never (0%)"
                  control={<Radio color="primary" />}
                  label="Never (0%)"
                  labelPlacement="end"
                />

                <FormControlLabel
                  checked={field.value === "Rarely (<50%)"}
                  value="Rarely (<50%)"
                  control={<Radio color="primary" />}
                  label="Rarely (<50%)"
                  labelPlacement="end"
                />

                <FormControlLabel
                  checked={field.value === "Inconsistent (51-79%)"}
                  value="Inconsistent (51-79%)"
                  control={<Radio color="primary" />}
                  label="Inconsistent (51-79%)"
                  labelPlacement="end"
                />

                <FormControlLabel
                  checked={field.value === "Consistent (>80%)"}
                  value="Consistent (>80%)"
                  control={<Radio color="primary" />}
                  label="Consistent (>80%)"
                  labelPlacement="end"
                />
              </RadioGroup>

              {index + 1 < MAX_GOALS && editMode && (
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={fields.length - 1 > index}
                      onChange={onAddGoal()}
                    />
                  }
                  label="Add additional goal"
                />
              )}
            </Fragment>
          );
        })}
      </MuiThemeProvider>
    </FormControl>
  );
}

FormBuilderPercentageScale.defaultProps = {
  editMode: false
};

FormBuilderPercentageScale.propTypes = {
  classes: PropTypes.object.isRequired,
  editMode: PropTypes.bool,
  fields: PropTypes.arrayOf(
    PropTypes.shape({ title: PropTypes.string, rating: PropTypes.number })
  ),
  onChange: PropTypes.func.isRequired,
  onChangeGoalResult: PropTypes.func.isRequired,
  theme: PropTypes.shape().isRequired
};

export default FormBuilderPercentageScale;
