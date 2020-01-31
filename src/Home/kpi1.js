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

  orangeAvatar: {
    margin: 20,
    width: 200,
    height: 200,
    color: "#fff",
    backgroundColor: blue[500]
  },

  title: {
    fontSize: 20
  },
  title2: {
    fontSize: 60
    //color: "textSecondary"
    //marginRight: theme.spacing()
  }
});

class KPI1 extends React.Component {
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

  async componentDidMount() {
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

  componentWillUnmount() {}

  render() {
    const { classes } = this.props;
    const { sessionsLeft, clientNum } = this.state;
    return (
      <Grid container justify="center" alignItems="center">
        {/*  {clientNum.map(option => (
          <Avatar
            key={option.num_clients}
            value={option.num_clients}
            className={classes.orangeAvatar}
          >
            <Grid container justify="center">
              <Typography className={classes.title2}>
                {option.num_clients}
              </Typography>
            </Grid>
            <Grid container justify="center">
              <Typography className={classes.title}>Total Clients</Typography>
            </Grid>
          </Avatar>
        ))} */}
        {sessionsLeft.map(option => (
          <Avatar
            key={option.now_and_rest_of_week}
            value={option.now_and_rest_of_week}
            className={classes.orangeAvatar}
          >
            <Grid container justify="center">
              <Typography className={classes.title2}>
                {option.now_and_rest_of_week}
              </Typography>
            </Grid>
            <Grid container justify="center">
              <Typography className={classes.title}>
                Sessions Left This Week
              </Typography>
            </Grid>
          </Avatar>
        ))}
      </Grid>
    );
  }
}

KPI1.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(KPI1);
