import React from "react";
//import classNames from "classnames";
import PropTypes from "prop-types";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
//import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";

import API from "../utils/API";

const styles = theme => ({
  rootRating: {
    width: 650
  },
  marginRating: {
    height: theme.spacing(3)
  },
  textFieldRating: {
    // marginLeft: theme.spacing(1)
    marginRight: theme.spacing(1),
    width: 650
  }
});

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

const theme = createMuiTheme({
  palette: {
    primary: { main: "#b2dfdb" }
  }
});

class SliderTest extends React.Component {
  state = {
    rating1: 10,
    rating2: 10,
    rating3: 10,
    ratingDesc1: "",
    ratingDesc2: "",
    ratingDesc3: "",
    addRating2: false,
    addRating3: false,
    sections: []
  };

  /*   async componentDidMount() {
    try {
      const sessionsLeftResp = await API.get("/events/sessionsleft");
      const clientNumResp = await API.get("/clients/numclients");
      const sessionsLeftData = sessionsLeftResp.data.data;
      const clientNumData = clientNumResp.data.data;
      console.log(clientNumData);
      console.log(sessionsLeftData);
      this.setState({
        sessionsLeft: sessionsLeftData,
        clientNum: clientNumData

        //clientData
      });
    } catch (error) {
      console.log(error);
    }
  }

  componentWillUnmount() {} */

  async componentDidMount() {
    const res = await API.get(`templates/templates_rating/getRating`);
    const template = res.data.data;     

    if(!template.sections)return

    this.setState({
      sections: JSON.parse(template.sections)
    });


    this.setState({
       rating1: this.state.sections.rating1,
       rating2: this.state.sections.rating2,
       rating3: this.state.sections.rating3,
       ratingDesc1: this.state.sections.ratingDesc1,
       ratingDesc2: this.state.sections.ratingDesc2,
       ratingDesc3: this.state.sections.ratingDesc3,
       addRating2: this.state.sections.addRating2,
       addRating3: this.state.sections.addRating3
    })
    console.log('soap data front:', template.sections);
}

  handleChangeSlider = name => (e, value) => {
    this.setState({
      [name]: value
    });
    // console.log('slide: ', name, value);
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    // console.log('rating :', name, event.target.value);
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
 
  onClickSave = async () => {
    this.state.sections =  {
      rating1: this.state.rating1,
      ratingDesc1: this.state.ratingDesc1,
      rating2: this.state.rating2,
      ratingDesc2: this.state.ratingDesc2,
      rating3: this.state.rating3,
      ratingDesc3: this.state.ratingDesc3,
      addRating2: this.state.addRating2,
      addRating3: this.state.addRating3
    }
    // console.log('sections :', this.state.sections);
    try {
      const { sections } = this.state;

      await API.post("templates/templates/rating", {
        sections: JSON.stringify(sections),
      });

      this.props.history.push("/notetemplates");
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container direction="column" justify="center" alignItems="center">
        <MuiThemeProvider theme={theme}>
          <TextField
            id="first-box"
            label="Title"
            onChange={this.handleChange("ratingDesc1")}
            value={this.state.ratingDesc1}
            className={classes.textFieldRating}
            margin="normal"
            variant="outlined"
          />
          <div className={classes.rootRating}>
            <div className={classes.marginRating} />

            <Slider
              // defaultValue={10}
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
              label="add additional rating"
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
                label="add additional rating"
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
      </Grid>
    );
  }
}

SliderTest.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SliderTest);
