import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import Mouse from "@material-ui/icons/Mouse";
import Search from "@material-ui/icons/Search";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Container from "@material-ui/core/Container";
import Build from "@material-ui/icons/Build";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  root: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    marginTop: theme.spacing(5),
    align: "center"
    //width: "31%"
  },
  button: {
    margin: theme.spacing.unit,
    align: "center"
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
  menu: {
    width: 200
  }
});

class FormActions extends React.Component {
  state = {
    anchorEl: null,
    open: false,
    openV: false,
    payor: "",
    startDate: "",
    endDate: "",
    invoiceDate: "",
    invoiceAmount: "",
    dueDate: "",
    invoiceNotes: ""
  };

  /* change of team member dropdown */
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  /* show assign client diaglog box */
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  /* close assign client diaglog box */
  handleClose = () => {
    this.setState({ open: false });
  };

  /* show date range diaglog box */
  handleClickOpenV = () => {
    this.setState({ openV: true });
  };

  /* close date range diaglog box */
  handleCloseV = () => {
    this.setState({ openV: false });
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

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Email</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>Download</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>Duplicate</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>Delete</MenuItem>
      </Menu>
    );

    return (
      <div>
        <Grid container direction="row" justify="center" alignItems="center">
          <Container maxWidth="sm">
            <Paper className={classes.root} elevation={7}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                {/* Show button */}
                <Button
                  variant="contained"
                  // onClick={this.handleClickOpen}
                  className={classes.button}
                >
                  <Build
                    className={classNames(classes.leftIcon, classes.iconSmall)}
                  />
                  Build
                </Button>

                {/* Selected button */}
                <Button
                  variant="contained"
                  onClick={this.handleProfileMenuOpen}
                  className={classes.button}
                >
                  <Mouse
                    className={classNames(classes.leftIcon, classes.iconSmall)}
                  />
                  Selected
                </Button>
                {renderMenu}
                {/* Search button */}
                <Button variant="contained" className={classes.button}>
                  <Search
                    className={classNames(classes.leftIcon, classes.iconSmall)}
                  />
                  Search
                </Button>
              </Grid>
            </Paper>
          </Container>
        </Grid>
      </div>
    );
  }
}

FormActions.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FormActions);
