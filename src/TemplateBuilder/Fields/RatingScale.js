import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Slider from "@material-ui/core/Slider";
import { MuiThemeProvider } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { MAX_RATINGS } from "../../constants/mockData";

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

function FormBuilderRatingScale(props) {
  const {
    editMode,
    fields,
    classes,
    onAddRating,
    onChange,
    onChangeSlider,
    theme
  } = props;

  return (
    <MuiThemeProvider theme={theme}>
      {fields.map((field, index) => {
        return (
          <Fragment key={index}>
            <TextField
              id="first-box"
              label="Rating Scale Title"
              value={field.title}
              className={classes.textFieldRating}
              onChange={onChange("title", index)}
              margin="normal"
              variant="outlined"
            />

            <div className={classes.rootRating}>
              <div className={classes.marginRating} />
              <Slider
                //getAriaValueText={valuetext}
                // aria-labelledby="discrete-slider-custom"
                //step={1}
                min={1}
                max={10}
                value={field.rating}
                onChange={onChangeSlider("rating", index)}
                valueLabelDisplay="auto"
                marks={marks}
              />

              <div className={classes.marginRating} />

              {index + 1 < MAX_RATINGS && editMode && (
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={fields.length - 1 > index}
                      onChange={onAddRating()}
                    />
                  }
                  label="Add additional rating"
                />
              )}
            </div>
          </Fragment>
        );
      })}
    </MuiThemeProvider>
  );
}

FormBuilderRatingScale.defaultProps = {
  editMode: false
};

FormBuilderRatingScale.propTypes = {
  classes: PropTypes.object.isRequired,
  editMode: PropTypes.bool,
  fields: PropTypes.arrayOf(
    PropTypes.shape({ title: PropTypes.string, rating: PropTypes.number })
  ),
  onAddRating: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onChangeSlider: PropTypes.func.isRequired,
  theme: PropTypes.shape().isRequired
};

export default FormBuilderRatingScale;
