import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { yellow } from "@material-ui/core/colors";

import Grid from "@material-ui/core/Grid";

const mint = "#69f0ae";
const black = "#212121";

const styles = {
  avatar: {
    margin: 20,
    width: 100,
    height: 100,
    backgroundColor: mint,
    color: black,
    fontSize: 20
  },
  avatar2: {
    margin: 20,
    color: "#fff",
    backgroundColor: yellow[800],
    width: 100,
    height: 100,
    fontSize: 20
  },
  avatar3: {
    margin: 20,
    color: "#fff",
    backgroundColor: yellow[800],
    width: 100,
    height: 100,
    fontSize: 20
  }
};

function KPI2(props) {
  const { classes } = props;
  return (
    <Grid container justify="center" alignItems="center">
      <Avatar className={classes.avatar}>KPI 1</Avatar>
      <Avatar className={classes.avatar2}>KPI 2</Avatar>
      <Avatar className={classes.avatar3}>KPI 3</Avatar>
    </Grid>
  );
}

KPI2.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(KPI2);
