import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Switch, Link, Route } from "react-router-dom";
// Material UI Core
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Badge from "@material-ui/core/Badge";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Cyan from "@material-ui/core/colors/cyan";
// Icons
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MailIcon from "@material-ui/icons/Mail";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MonetizationOn from "@material-ui/icons/MonetizationOn";
import HomeIcon from "@material-ui/icons/Home";
import InsertInvitation from "@material-ui/icons/InsertInvitation";
import Mood from "@material-ui/icons/Mood";
import PeopleOutline from "@material-ui/icons/PeopleOutline";
//import InsertChartOutlined from "@material-ui/icons/InsertChartOutlined";
import AccountBalanceWallet from "@material-ui/icons/AccountBalanceWallet";
//import AccountBalance from "@material-ui/icons/AccountBalance";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
//import InsertDriveFile from "@material-ui/icons/InsertDriveFile";
// Title Bars
import TitleBarSettings from "./titleBars/titleBarSettings";
import TitleBarAccountsInv from "./titleBars/titleBarAccountsInv";
import TitleBarCal from "./titleBars/titleBarCalendar";
import TitleBarClientDet from "./titleBars/titleBarClientDetails";
import TitleBarClientDetActive from "./titleBars/titleBarClientDetailsActive";
import TitleBarClients from "./titleBars/titleBarClients";
import TitleBarHome from "./titleBars/titleBarHome";
import TitleBarNoteTemplates from "./titleBars/titleBarNoteTemplates";
//import TitleBarForms from "./titleBars/titleBarForms";
import NewTitleBarMemDet from "./titleBars/titleBarNewMemberDetails";
import NewTitleBarMemDetHideInact from "./titleBars/titleBarNewMemberDetailsHideInact";
import NewTitleBarClientDet from "./titleBars/titleBarNewClientDetails";
import NewTitleBarClientDetHideInact from "./titleBars/titleBarNewClientDetailsHideInact";
import TitleBarMemDet from "./titleBars/titleBarMemberDetails";
import TitleBarMemDetAct from "./titleBars/titleBarMemberDetailsActive";
import TitleBarTeamMembers from "./titleBars/titleBarTeamMembers";
import TitleBarDocumentation from "./titleBars/titleBarDocumentation";
import TitleBarDocumentationHome from "./titleBars/titleBarDocumentationHome";
import TitleBarAccountDetails from "./titleBars/titleBarAccountDetails";
import TitleBarMessages from "./titleBars/titleBarMessages";
import TitleBarMessageDetails from "./titleBars/titleBarMessageDetails";
import TitleBarNewMessage from "./titleBars/titleBarNewMessage";
import TitleBarRatingScale from "./titleBars/titleBarRatingScale";
import TitleBarSOAP from "./titleBars/titleBarSOAP";
import TitleBarNarrative from "./titleBars/titleBarNarrative";
import TitleBarPercScale from "./titleBars/titleBarPercScale";
// Home
import KPITest from "./Home/kpiHardCode";
import EventsTable from "./Tables/eventsTable";
// Settings
import PaymentSettings from "./Settings/paymentSettings";
// Actions
import TeamMemberActionsHideInactive from "./Actions/teamMemberActionsHideInactive";
import TeamMemberActionsShowAll from "./Actions/teamMemberActionsShowAll";
import NoteTemplatesActions from "./Actions/noteTemplatesActions";
//import FormsActions from "./Actions/formsActions";
import ClientActionsShowAll from "./Actions/clientActionsShowAll";
import ClientActionsHideInactive from "./Actions/clientActionsHideInactive";
import MessagesActions from "./Actions/messagesActions";
// Tables
import NoteTemplatesTable from "./Tables/noteTemplatesTable";
//import FormsTable from "./Tables/formsTable";
import TeamMembersTable from "./Tables/teamMembersTable";
import TeamMembersTableActive from "./Tables/teamMembersTableActive";
import ClientsTable from "./Tables/clientsTable";
import ClientsTableActive from "./Tables/clientsActiveTable";
//import AccountDetailsTable from "./Tables/accountDetailsTable2";
//import AccountDetailsTable from "./Tables/accountDetailsTable";
import AccountDetailsTableNew from "./Tables/accountDetailsTableNew";
// Clients
import NewClient from "./Client/newClient";
import NewClientHideInac from "./Client/newClientHideInac";
import ClientDetails from "./Client/clientDetails";
// Team Members
import MemberDetails from "./teamMember/memberDetails";
import NewTeamMember from "./teamMember/newTeamMember";
import NewTeamMemberHideInac from "./teamMember/newTeamMemberHideInac";
// Calendar
import ReactCalendarBase from "./Calendar/ReactCalendarBase";
// Accounts and Invoices
import AccountsInvoicesTabsNew from "./AcountsInvoices/accountsInvoicesTabsNew";
// Documentation
import Documentation from "./Calendar/documentation";
import Documentation2 from "./Calendar/doc2";
// Messages
import MessagesTable from "./Tables/messagesTable";
import MessageInfo from "./Messages/messageInfo";
import NewMessage from "./Messages/newMessage";
// Note Templates
import SOAP from "./noteTemplates/SOAP";
import Narrative from "./noteTemplates/narrative";
import RatingScale from "./noteTemplates/ratingScale";
import PercentageScale from "./noteTemplates/percentageScale";
import Builder from "./noteTemplates/Builder";
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';

//width of drawer
const drawerWidth = 240;

const theme1 = createMuiTheme({
  palette: {
    primary: {
        main: '#FFFFFF'
    }
  }
 
  // palette: {
  //   primary: '#00bcd4',
  //   secondary: '#ff4081'
  // }
});

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    backgroundColor: Cyan[800]
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },

  rightToolbar: {
    marginLeft: "auto",
    marginRight: -12
  }
});

const navStyle = {
  color: "black",
  textDecoration: "none"
};
const navStyle2 = {
  color: "white",
  textDecoration: "none"
};

const Page404 = () => {
  return <h3>404 error - Just smile and wave, boys...smile and wave.</h3>;
};

class MainApp extends React.Component {
  state = {
    open: false,
    anchorEl: null
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  /*
  reloadPage() {
    // if (this.state.location !== prevState.location) {
    window.location.reload();
    console.log("Refresh!");
  }
  */

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;
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
        <Link style={navStyle} to="/settings">
          <MenuItem onClick={this.handleMenuClose}> Practice Settings</MenuItem>
        </Link>
        <MenuItem onClick={this.handleMenuClose}>Help</MenuItem>
        <Link style={navStyle} to="/signin">
          {" "}
          <MenuItem onClick={this.props.handleSignOut}>Sign Out</MenuItem>{" "}
        </Link>
      </Menu>
    );

    return ( 

      <ThemeProvider theme={theme1}>
      <div className={classes.root}>
        <CssBaseline />
        {/* <BrowserRouter> */}
        <AppBar
          /* do not want relative, static, or sticky; fixed or absolute seems to work */
          position="fixed"
          elevation={1}
          /* makes sure the apps shifts when the drawer is open */
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          {/* makes sure gutters are disabled when the drawer is not open */}
          <Toolbar disableGutters={!open}>
            {/* Icon button with click action*/}
            <IconButton
              color="primary"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              {/* Menu icon*/}
              <MenuIcon />
            </IconButton>
            {/* MTSaaS Name */}
            <Link style={navStyle2} to="/home">
              {/*    <img src={Logo} alt="test" height={45} /> */}
              <Typography variant="h6" color="primary" noWrap>
                App
              </Typography>
            </Link>
            <div className={classes.rightToolbar}>
              <IconButton color="primary">
                <Badge color="primary">
                  <MonetizationOn />
                </Badge>
              </IconButton>
              <IconButton color="primary">
                <Badge /* badgeContent={2} */ color="primary">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                aria-owns={isMenuOpen ? "material-appbar" : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="primary"
              >
                <AccountCircle />
              </IconButton>
            </div>
            {/* no visible change */}
            <div className={classes.sectionMobile}>
              <IconButton
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="primary"
              />
            </div>
            {/*end of toolbar and Appbar */}
          </Toolbar>
          {/* having the menu item full code below will make the route work
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: "top", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={isMenuOpen}
              onClose={this.handleMenuClose}
            >
              <MenuItem onClick={this.handleMenuClose}>
                {" "}
                Practice Settings
              </MenuItem>
              <MenuItem onClick={this.handleMenuClose}>Help</MenuItem>
              <Link style={navStyle} to="/signin">
                {" "}
                <MenuItem onClick={this.handleMenuClose}>
                  Sign Out
                </MenuItem>{" "}
              </Link>
            </Menu> 
            */}
          {renderMenu}
        </AppBar>

        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            <Link style={navStyle} to="/home">
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </Link>
            <Link style={navStyle} to="/calendar">
              <ListItem button>
                <ListItemIcon>
                  <InsertInvitation />
                </ListItemIcon>
                <ListItemText primary="Calendar" />
              </ListItem>
            </Link>

            <Link style={navStyle} to="/clients">
              <ListItem button>
                <ListItemIcon>
                  <Mood />
                </ListItemIcon>
                <ListItemText primary="Clients" />
              </ListItem>
            </Link>
            <Link style={navStyle} to="/teammembers">
              <ListItem button>
                <ListItemIcon>
                  <PeopleOutline />
                </ListItemIcon>
                <ListItemText primary="Team Members" />
              </ListItem>
            </Link>
            <Link style={navStyle} to="/messages">
              <ListItem button>
                <ListItemIcon>
                  <Badge /* badgeContent={2} */ color="primary">
                    <MailIcon />
                  </Badge>
                </ListItemIcon>
                <ListItemText primary="Messages" />
              </ListItem>
            </Link>
            <Link style={navStyle} to="/accountsandinv">
              <ListItem button>
                <ListItemIcon>
                  <AccountBalanceWallet />
                </ListItemIcon>
                <ListItemText primary="Acounts & Invoices" />
              </ListItem>
            </Link>
            {/*    <ListItem button>
              <ListItemIcon>
                <AccountBalance />
              </ListItemIcon>
              <ListItemText primary="Payroll" />
            </ListItem> */}
            {/*     <ListItem button>
              <ListItemIcon>
                <InsertChartOutlined />
              </ListItemIcon>
              <ListItemText primary="Reports" />
            </ListItem> */}
            {/*   <Link style={navStyle} to="/forms">
              <ListItem button>
                <ListItemIcon>
                  <InsertDriveFile />
                </ListItemIcon>
                <ListItemText primary="Forms" />
              </ListItem>
            </Link> */}
            <Link style={navStyle} to="/notetemplates">
              <ListItem button>
                <ListItemIcon>
                  <LibraryBooks />
                </ListItemIcon>
                <ListItemText primary="Note Templates" />
              </ListItem>
            </Link>
          </List>
        </Drawer>

        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          {/* creates header space in between the body text and the top nav*/}
          <div className={classes.drawerHeader} />

          {/* Start of routes */}
          <Switch>
            <Route
              exact
              path="/home"
              render={() => (
                <div>
                  <TitleBarHome />
                  <KPITest />
                  <EventsTable />
                </div>
              )}
            />
            <Route
              exact
              path="/settings"
              render={() => (
                <div>
                  <TitleBarSettings />
                  <PaymentSettings />
                </div>
              )}
            />

            <Route
              exact
              path="/calendar"
              render={() => (
                <div>
                  <TitleBarCal />
                  <ReactCalendarBase />
                </div>
              )}
            />

            <Route
              exact
              path="/clients"
              render={() => (
                <div>
                  <TitleBarClients />
                  <ClientActionsHideInactive />
                  <ClientsTable />
                </div>
              )}
            />

            <Route
              exact
              path="/clients/hideinactive"
              render={() => (
                <div>
                  <TitleBarClients />
                  <ClientActionsShowAll />
                  <ClientsTableActive />
                </div>
              )}
            />

            <Route
              exact
              path="/clients/details"
              render={() => (
                <div>
                  <TitleBarClientDet />
                  <ClientDetails />
                </div>
              )}
            />

            <Route
              exact
              path="/clients/hideinactive/details"
              render={() => (
                <div>
                  <TitleBarClientDetActive />
                  <ClientDetails />
                </div>
              )}
            />

            <Route
              exact
              path="/clients/newclient"
              render={() => (
                <div>
                  <NewTitleBarClientDet />
                  <NewClient />
                </div>
              )}
            />

            <Route
              exact
              path="/clients/hideinactive/newclient"
              render={() => (
                <div>
                  <NewTitleBarClientDetHideInact />
                  <NewClientHideInac />
                </div>
              )}
            />

            <Route
              exact
              path="/teammembers"
              render={() => (
                <div>
                  <TitleBarTeamMembers />
                  <TeamMemberActionsHideInactive />
                  <TeamMembersTable />
                </div>
              )}
            />

            <Route
              exact
              path="/teammembers/hideinactive"
              render={() => (
                <div>
                  <TitleBarTeamMembers />
                  <TeamMemberActionsShowAll />
                  <TeamMembersTableActive />
                </div>
              )}
            />

            <Route
              exact
              path="/teammembers/newmember"
              render={() => (
                <div>
                  <NewTitleBarMemDet />
                  <NewTeamMember />
                </div>
              )}
            />

            <Route
              exact
              path="/teammembers/hideinactive/newmember"
              render={() => (
                <div>
                  <NewTitleBarMemDetHideInact />
                  <NewTeamMemberHideInac />
                </div>
              )}
            />

            <Route
              exact
              path="/teammembers/details"
              render={() => (
                <div>
                  <TitleBarMemDet />
                  <MemberDetails />
                </div>
              )}
            />

            <Route
              exact
              path="/teammembers/hideinactive/details"
              render={() => (
                <div>
                  <TitleBarMemDetAct />
                  <MemberDetails />
                </div>
              )}
            />

            <Route
              exact
              path="/notetemplates"
              render={() => (
                <div>
                  <TitleBarNoteTemplates />
                  <NoteTemplatesActions />
                  <NoteTemplatesTable />
                </div>
              )}
            />

            <Route
              exact
              path="/notetemplates/build/:id?"
              render={() => (
                <div>
                  <Builder />
                </div>
              )}
            />

            <Route
              exact
              path="/notetemplates/SOAP"
              render={() => (
                <div>
                  <TitleBarSOAP />
                  <SOAP />
                </div>
              )}
            />

            <Route
              exact
              path="/notetemplates/narrative"
              render={() => (
                <div>
                  <TitleBarNarrative />
                  <Narrative />
                </div>
              )}
            />

            <Route
              exact
              path="/notetemplates/ratingscale"
              render={() => (
                <div>
                  <TitleBarRatingScale />
                  <RatingScale />
                </div>
              )}
            />

            <Route
              exact
              path="/notetemplates/percentagescale"
              render={() => (
                <div>
                  <TitleBarPercScale />
                  <PercentageScale />
                </div>
              )}
            />

            {/*    <Route
              exact
              path="/forms"
              render={() => (
                <div>
                  <TitleBarForms />
                  <FormsActions />
                  <FormsTable />
                </div>
              )}
            /> */}

            <Route
              exact
              path="/accountsandinv"
              render={() => (
                <div>
                  <TitleBarAccountsInv />
                  <AccountsInvoicesTabsNew />
                </div>
              )}
            />

            <Route
              exact
              path="/accountsandinv/accountdetails"
              render={() => (
                <div>
                  <TitleBarAccountDetails />
                  <AccountDetailsTableNew />
                </div>
              )}
            />

            <Route
              exact
              path="/documentation"
              render={() => (
                <div>
                  <TitleBarDocumentation />
                  <Documentation />
                </div>
              )}
            />

            <Route
              exact
              path="/documentation2"
              render={() => (
                <div>
                  <TitleBarDocumentationHome />
                  <Documentation2 />
                </div>
              )}
            />

            <Route
              exact
              path="/messages"
              render={() => (
                <div>
                  <TitleBarMessages />
                  <MessagesActions />
                  <MessagesTable />
                </div>
              )}
            />

            <Route
              exact
              path="/messages/new"
              render={() => (
                <div>
                  <TitleBarNewMessage />
                  <NewMessage />
                </div>
              )}
            />

            <Route
              exact
              path="/messages/detail"
              render={() => (
                <div>
                  <TitleBarMessageDetails />
                  <MessageInfo />
                </div>
              )}
            />

            <Route
              render={() => (
                <div>
                  {/*   <Page404 /> */}

                  <TitleBarHome />
                  <KPITest />
                  <EventsTable />
                </div>
              )}
            />
          </Switch>
        </main>
      </div>
      </ThemeProvider>
    );
  }
}
/* no visible changes */
MainApp.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MainApp);
