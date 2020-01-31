import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    //paddingTop: theme.spacing(1),
    //paddingBottom: theme.spacing(1)
    padding: theme.spacing(1, 1),
    marginLeft: theme.spacing(-3),
    marginRight: theme.spacing(-3),
    marginTop: theme.spacing(-2.8)
  },
  root2: {
    marginTop: theme.spacing(2),
    width: "19%"
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },

  backToButton: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    /* this is text color */ color: theme.palette.getContrastText("#b2dfdb"),
    backgroundColor: "#b2dfdb",
    "&:hover": {
      backgroundColor: "#80cbc4"
    }
  }
});

const navStyle = {
  color: "black",
  textDecoration: "none"
};

class TitleBarClients extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Paper className={classes.root} elevation={2}>
          <Typography align="center" variant="h5">
            Clients
          </Typography>
        </Paper>
      </div>
    );
  }
}

TitleBarClients.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TitleBarClients);
