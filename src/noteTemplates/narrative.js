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


const theme = createMuiTheme({
  palette: {
    primary: { main: "#b2dfdb" }
  }
});

class Narrative extends React.Component {
  state = {
    narrativeNote: '',
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
    const res = await API.get(`templates/templates_narrative/getNarrative`);
    const template = res.data.data;     

    if(!template.sections)return

    this.setState({
      sections: JSON.parse(template.sections)
    });


    this.setState({
        narrativeNote: this.state.sections.narrativeNote
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

  onClickSave = async () => {
    this.state.sections = {
        narrativeNote: this.state.narrativeNote
    }
    // console.log('sections :', this.state.sections);
    try {
      const { sections } = this.state;

      await API.post("templates/templates/narrative", {
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

Narrative.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Narrative);
