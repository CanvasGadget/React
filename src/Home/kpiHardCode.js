import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { red, blue, green, cyan, yellow } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";

import API from "../utils/API";

const styles = theme => ({
  card: {
    width: 100,
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(5),
    backgroundColor: yellow[800]
  },
  card2: {
    width: 100,
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(10),
    paddingRight: theme.spacing(2),
    backgroundColor: yellow[800]
  },
  card3: {
    width: 100,
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(10),
    backgroundColor: yellow[800]
  },

  avatar: {
    marginTop: theme.spacing(5),
    marginRight: theme.spacing(30),
    marginBottom: theme.spacing(5),
    width: 175,
    height: 175,
    color: "#fff",
    backgroundColor: cyan[800]
  },

  avatar2: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    // marginRight: theme.spacing(30),
    width: 175,
    height: 175,
    color: "#fff",
    backgroundColor: cyan[800]
  },

  title: {
    fontSize: 20,
    marginRight: theme.spacing(4)
  },
  title2: {
    fontSize: 45
    //color: "textSecondary"
    //marginRight: theme.spacing()
  }
});

class KPITest extends React.Component {
  state = {
    order: "asc",
    orderBy: "",
    accountData: [],
    page: 0,
    rowsPerPage: 10,
    selected: [],
    open: false,
    redirect: false,
    curBillEmail: "",
    sessionsLeft: [],
    now_and_rest_of_week: "",
    clientNum: []
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container justify="center" alignItems="center">
        <Avatar className={classes.avatar}>
          <Grid container align="center" justify="center">
            <Typography className={classes.title2}>7</Typography>
          </Grid>
          <Typography className={classes.title}>Total Clients</Typography>
        </Avatar>
        <Avatar className={classes.avatar2}>
          <Grid container align="center" justify="center">
            <Typography className={classes.title2}>4</Typography>
          </Grid>
          <Typography className={classes.title}>Sessions This Week</Typography>
        </Avatar>
      </Grid>
    );
  }
}

KPITest.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(KPITest);
