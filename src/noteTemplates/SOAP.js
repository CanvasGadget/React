import React from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import {
  withStyles,
  createMuiTheme
  // MuiThemeProvider
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import FormLabel from "@material-ui/core/FormLabel";
// import FormGroup from "@material-ui/core/FormGroup";
// import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import API from "../utils/API";


const styles = theme => ({
  /* 
  clientAvatar: {
    margin: 10,
    color: theme.palette.getContrastText(Cyan[800]),
    backgroundColor: Cyan[800],
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

  textField2: {
    //marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    //marginTop: theme.spacing(2),
    width: 193
  },

  labelStyle: {
    marginTop: theme.spacing(5)
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
    value: "Regular",
    label: "Regular"
  },
  {
    value: "SOAP",
    label: "SOAP"
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

class SOAP extends React.Component {
  state = {
    s_note: "",
    o_note: "",
    a_note: "",
    p_note: "",
    calID: "",
    checkedPayor: true,
    checkedFamily: false,
    checkedTherapist: false,
    checkedPortal: false,
    validationBox: false,
    redirect: false,
    sections: []
  };

  async componentDidMount() {
        const res = await API.get(`templates/templates_soap/getSoap`);
        const template = res.data.data;     

        if(!template.sections)return

        this.setState({
          sections: JSON.parse(template.sections)
        });

        this.setState({
           s_note: this.state.sections.s_note,
           o_note: this.state.sections.o_note,
           a_note: this.state.sections.a_note,
           p_note: this.state.sections.p_note
        })
        console.log('soap data front:', template.sections);
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    // console.log('sections:', this.state.sections);
    // console.log('sections:', name, event.target.value);
    this.state.sections =  {
      s_note: this.state.s_note,
      a_note: this.state.a_note,
      o_note: this.state.o_note,
      p_note: this.state.p_note
    }
    // console.log('sections:', this.state.sections);
  };

  onClickSave = async () => {
    try {
      const { sections } = this.state;

      await API.post("templates/templates/soap", {
        sections: JSON.stringify(sections),
      });

      this.props.history.push("/notetemplates");
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { classes } = this.props;

    //test
    // const {clientData, therapistData } = this.state;

    return (
      <div>
        <Container maxwidth="lg">
          <Grid container direction="row">
            <Typography variant="h5" className={classes.letter}>
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
      </div>
    );
  }
}

SOAP.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(SOAP));
