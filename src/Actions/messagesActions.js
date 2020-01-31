import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Visibility from "@material-ui/icons/Visibility";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";
import { Redirect, Link } from "react-router-dom";

const styles = theme => ({
  root: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    marginTop: theme.spacing(2),
    align: "center"
    // width: "31%"
  },

  button: {
    margin: theme.spacing.unit,
    align: "center",
    /* this is text color */ color: theme.palette.getContrastText("#b2dfdb"),
    backgroundColor: "#b2dfdb",
    "&:hover": {
      backgroundColor: "#80cbc4"
    }
  },

  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  dialogTitle: {
    marginBottom: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
  textField2: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
  menu: {
    width: 200
  }
});

const navStyle = {
  color: "black",
  textDecoration: "none"
};

class ClientActionsHideInactive extends React.Component {
  state = {
    anchorEl: null,
    redirect: false
  };

  handleRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  /* Select menu options */
  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const isMenuOpen = Boolean(anchorEl);

    return (
      <div>
        <Grid container direction="row" justify="center" alignItems="center">
          <Container maxWidth="sm">
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Paper className={classes.root} elevation={7}>
                <Link style={navStyle} to="/messages/new">
                  {/* Add new message button */}
                  <Button
                    variant="contained"
                    className={classes.button}
                    //onClick={this.handleClickOpen}
                  >
                    <AddIcon
                      className={classNames(
                        classes.leftIcon,
                        classes.iconSmall
                      )}
                    />
                    New Message
                  </Button>
                </Link>

                {/* Delete button */}
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={this.props.onDelete}
                >
                  <DeleteIcon
                    className={classNames(classes.leftIcon, classes.iconSmall)}
                  />
                  Delete
                </Button>
              </Paper>
            </Grid>
          </Container>
          {this.state.redirect ? (
            <Redirect push to="/clients/hideinactive" />
          ) : null}
        </Grid>
      </div>
    );
  }
}

ClientActionsHideInactive.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ClientActionsHideInactive);
