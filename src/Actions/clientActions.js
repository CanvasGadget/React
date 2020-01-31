import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  root: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    marginTop: theme.spacing(5),
    // marginLeft: theme.spacing(65),
    align: "center",
    width: "19.5%"
  },

  colorButton: {
    marginTop: theme.spacing(4),
    // marginBottom: theme.spacing(5),
    align: "center",
    /* this is text color */ color: theme.palette.getContrastText("#b2dfdb"),
    backgroundColor: "#b2dfdb",
    "&:hover": {
      backgroundColor: "#80cbc4"
    }
  },

  button: {
    //margin: theme.spacing.unit,
    align: "center"
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  }
});

const navStyle = {
  color: "black",
  textDecoration: "none"
};

class ClientActions extends React.Component {
  /*
  reloadPage() {
    // if (this.state.location !== prevState.location) {
    window.location.reload();
    console.log("Refresh!");
  
*/

  //switchPage() {}

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Grid
          container
          direction="row-reverse"
          justify="center"
          alignItems="center"
        >
          {/*
          <Paper
          
            className={classes.root}
            elevation={7}
          >
          */}
          <Link style={navStyle} to="/clients/newclient">
            <Grid
              container
              direction="row-reverse"
              justify="center"
              alignItems="center"
            >
              <Button
                variant="contained"
                className={classes.colorButton}
                //onClick={this.handleClickOpen}
              >
                <AddIcon
                  className={classNames(classes.leftIcon, classes.iconSmall)}
                />
                Add New
              </Button>
            </Grid>
          </Link>
          {/*    </Paper> */}
        </Grid>
      </div>
    );
  }
}

ClientActions.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ClientActions);
