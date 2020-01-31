import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { green } from "@material-ui/core/colors";

const styles = theme => ({
  root: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(40),
    width: 500,
    backgroundColor: green[300],
    fontSize: 50
  }
});

function DailyViewKPIs(props) {
  const { classes } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography className={classes.root}>Daily View</Typography>
      </Paper>
    </div>
  );
}

DailyViewKPIs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DailyViewKPIs);
