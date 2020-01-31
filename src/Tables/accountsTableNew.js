import React from "react";
//import classNames from "classnames";
import PropTypes from "prop-types";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import Cyan from "@material-ui/core/colors/cyan";
import Container from "@material-ui/core/Container";
import { Redirect } from "react-router-dom";

import API from "../utils/API";
/*
let counter = 0;
function createData(name, role, email, phone, clients) {
  counter += 1;
  return { id: counter, name, role, email, phone, clients };
}
*/

// Warn if overriding existing method
if (Array.prototype.equals)
  console.warn(
    "Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code."
  );
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function(array) {
  // if the other array is a falsy value, return
  if (!array) return false;

  // compare lengths - can save a lot of time
  if (this.length != array.length) return false;

  for (var i = 0, l = this.length; i < l; i++) {
    // Check if we have nested arrays
    if (this[i] instanceof Array && array[i] instanceof Array) {
      // recurse into the nested arrays
      if (!this[i].equals(array[i])) return false;
    } else if (this[i] != array[i]) {
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false;
    }
  }
  return true;
};
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", { enumerable: false });

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: "payor", disablePadding: true, label: "Payor" },
  { id: "client", disablePadding: true, label: "Client(s)" },
  { id: "client_type", disablePadding: true, label: "Account Type" },
  { id: "billing_phone", disablePadding: true, label: "Phone" },
  { id: "billing_email", disablePadding: true, label: "Email" },
  { id: "payment_type", disablePadding: true, label: "Payment Method" },
  { id: "balance", disablePadding: true, label: "Balance" },
  { id: "last_pay_date", label: "Last Payment Date" }
];

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: Cyan[800],
    color: theme.palette.common.white,
    fontSize: 17
  },
  body: {
    fontSize: 12
  }
}))(TableCell);

class TransactionsTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          <CustomTableCell padding="checkbox">
            <MuiThemeProvider theme={theme}>
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={numSelected === rowCount}
                onChange={onSelectAllClick}
                color="primary"
              />
            </MuiThemeProvider>
          </CustomTableCell>
          {rows.map(
            row => (
              <CustomTableCell
                key={row.id}
                align="center"
                sortDirection={orderBy === row.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === row.id}
                  direction={order}
                  onClick={this.createSortHandler(row.id)}
                >
                  {row.label}
                </TableSortLabel>
              </CustomTableCell>
            ),
            this
          )}
        </TableRow>
      </TableHead>
    );
  }
}

TransactionsTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
  // previous file
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired
  //rowCount: PropTypes.number.isRequired,
};

const styles = theme => ({
  root: {
    //width: "60%",
    marginTop: theme.spacing(1) * 3,
    // marginLeft: theme.spacing(1) * 30,
    overflowX: "auto"
  },
  table: {
    //minWidth: 1020,
  },
  tableWrapper: {
    overflowX: "auto"
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
});

const theme = createMuiTheme({
  palette: {
    primary: { main: "#b2dfdb" }
  }
});

const theme2 = createMuiTheme({
  palette: {
    primary: { main: "#00838f" }
  }
});

class AccountsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: "asc",
      orderBy: "",
      accountData: [],
      page: 0,
      rowsPerPage: 10,
      selected: [],
      open: false,
      redirect: false,
      curBillEmail: ""
    };
  }

  async componentDidMount() {
    // const accountsResp = await API.get("/accounts/accounts2");
    // this.setState({
    //   accountData: accountsResp.data.data
    // });
    try {
      const obj = {
        startDate: localStorage.getItem("startDate"),
        endDate: localStorage.getItem("endDate"),
        keyword: this.props.keyword
      };
      API.post("/accounts/accountspr", obj).then(async res => {
        this.setState({
          accountData: res.data.data
        });
      });
    } catch (error) {
      console.log("Account detail data fetching error: ", error);
    }
  }

  /*   async componentDidMount() {
    await this.updateTableContent();
  }

  async updateTableContent() {
    try {
      const accountsResp = await API.get("/accounts/accounts");
      const accountData = accountsResp.data.data;

      this.setState({ accountData });
    } catch (error) {
      console.log("Accounts data fetching error: ", error);
    }
  }
  */
  componentWillUnmount() {}

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(
        state => ({ selected: state.accountData.map(n => n.billing_email) }),
        () => this.props.onSelectedUpdated(this.state.selected)
      );
      return;
    }
    this.setState({ selected: [] }, () =>
      this.props.onSelectedUpdated(this.state.selected)
    );
  };

  async componentDidUpdate(prevProps) {
    if (
      prevProps.startDate != this.props.startDate ||
      prevProps.startDate != this.props.startDate ||
      prevProps.keyword != this.props.keyword
    ) {
      try {
        const obj = {
          startDate: this.props.startDate,
          endDate: this.props.endDate,
          keyword: this.props.keyword
        };
        API.post("/accounts/accountspr", obj).then(async res => {
          this.setState({
            accountData: res.data.data
          });
        });
      } catch (error) {
        console.log("Account detail data fetching error: ", error);
      }
    }

    // if (prevProps.toggleUpdated !== this.props.toggleUpdated) {
    //   await this.updateTableContent();
    // }

    // const { selected } = this.state
    // const { prevSelected } = prevState

    // if (selected.equals(prevSelected) === false)
    // this.props.onSelectedUpdated(selected)
    // console.log('selected', selected)
  }

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    this.props.onSelectedUpdated(newSelected);

    this.setState({ selected: newSelected });
  };

  // prev file -->

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  //redirect to account details;
  handleClickRedirect = (accountBillEmail = "") => {
    localStorage.setItem("BillEmail", accountBillEmail);
    localStorage.setItem("startDate", this.props.startDate);
    localStorage.setItem("endDate", this.props.endDate);
    this.setState({
      redirect: true,
      curBillEmail: accountBillEmail
    });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const {
      accountData,
      order,
      orderBy,
      rowsPerPage,
      page,
      selected
    } = this.state;
    const emptyRows =
      rowsPerPage -
      Math.min(rowsPerPage, accountData.length - page * rowsPerPage);

    return (
      <Container maxWidth="lg">
        {this.state.redirect ? (
          <Redirect
            to={{
              pathname: "/accountsandinv/accountdetails",
              state: {
                curBillEmail: this.state.curBillEmail
              }
            }}
          />
        ) : null}

        <Paper className={classes.root}>
          <div className={classes.tableWrapper}>
            <Table /* className={classes.table} */ aria-labelledby="tableTitle">
              <TransactionsTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={this.handleRequestSort}
                onSelectAllClick={this.handleSelectAllClick}
                rowCount={accountData.length || 0}
              />
              <TableBody>
                {stableSort(accountData, getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((n, i) => {
                    const isSelected = this.isSelected(n.billing_email);
                    return (
                      <TableRow
                        hover
                        className={classes.row}
                        tabIndex={-1}
                        key={i}
                        selected={isSelected}
                      >
                        <TableCell padding="checkbox">
                          <MuiThemeProvider theme={theme}>
                            <Checkbox
                              color="primary"
                              checked={isSelected}
                              onClick={event =>
                                this.handleClick(event, n.billing_email)
                              }
                            />
                          </MuiThemeProvider>
                        </TableCell>

                        <TableCell
                          onClick={() =>
                            this.handleClickRedirect(n.billing_email)
                          }
                          align="center"
                        >
                          {n.payor}{" "}
                        </TableCell>
                        <TableCell align="center">{n.client}</TableCell>
                        <TableCell align="center">{n.client_type}</TableCell>
                        <TableCell align="center">{n.billing_phone}</TableCell>
                        <TableCell align="center">{n.billing_email}</TableCell>
                        <TableCell align="center">{n.payment_type}</TableCell>

                        {n.balance <= "0" ? (
                          <TableCell style={{ color: "green" }} align="center">
                            {n.balance}
                          </TableCell>
                        ) : (
                          <TableCell style={{ color: "red" }} align="center">
                            {n.balance}{" "}
                          </TableCell>
                        )}
                        <TableCell align="center">{n.last_pay_date}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            rowsPerPageOptions={[10, 20, 50]}
            component="div"
            count={accountData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              "aria-label": "Previous Page"
            }}
            nextIconButtonProps={{
              "aria-label": "Next Page"
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
    );
  }
}

AccountsTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AccountsTable);
