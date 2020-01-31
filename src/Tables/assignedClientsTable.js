import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import Cyan from "@material-ui/core/colors/cyan";
import Container from "@material-ui/core/Container";

import API from "../utils/API";

/*
let counter = 0;
function createData(name, role, email, phone, clients) {
  counter += 1;
  return { id: counter, name, role, email, phone, clients };
}
*/
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
  { id: "client_first_name", label: "First" },
  { id: "client_last_name", label: "Last" },
  { id: "phone", label: "Phone" },
  { id: "email", label: "Email" },
  { id: "facility", label: "Facility" }
  // { id: "clients", label: "Clients" }
];

const CustomTableCell = withStyles(theme => ({
  head: {
    //backgroundColor: lightBlue[400],
    backgroundColor: Cyan[800],
    color: theme.palette.common.white,
    fontSize: 15
  },
  body: {
    fontSize: 12
  }
}))(TableCell);

class AssignedClientsTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
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

AssignedClientsTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired
  //rowCount: PropTypes.number.isRequired,
};

const styles = theme => ({
  root: {
    //width: "60%",
    marginTop: theme.spacing(1) * 3,
    marginBottom: theme.spacing(2),
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
  },
  appBar: {
    position: "relative",
    backgroundColor: Cyan[800]
  },
  flex: {
    flex: 1
  }
});

const navStyle = {
  color: "black",
  textDecoration: "none"
};

class AssignedClientsTable extends React.Component {
  state = {
    order: "asc",
    open: false,
    orderBy: "",
    selectedClientData: [],
    selectedIndex: null,
    page: 0,
    rowsPerPage: 5,
    therapistFullName: this.props.therapistFullName,
    clientData: this.props.clients
  };

  componentDidMount() {
    this.updateSelectedClientData();
  }

  componentWillUnmount() {}

  componentDidUpdate(prevProps) {
    if (this.props.therapistFullName !== prevProps.therapistFullName)
      this.updateSelectedClientData();
  }

  updateSelectedClientData() {
    this.setState(
      {
        selectedClientData: this.props.clients.filter(
          client =>
            client.assi_therapist_full_name === this.props.therapistFullName
        )
      },
      () => {
        console.log("thera", this.props.therapistFullName);
        console.log("sele", this.state.clientData);
      }
    );
  }

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

  //show client details box;
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  // isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const {
      selectedClientData,
      order,
      orderBy,
      rowsPerPage,
      page
    } = this.state;
    const emptyRows =
      rowsPerPage -
      Math.min(rowsPerPage, selectedClientData.length - page * rowsPerPage);

    return (
      <Container maxWidth="lg">
        <Paper className={classes.root}>
          <div className={classes.tableWrapper}>
            <Table /* className={classes.table} */ aria-labelledby="tableTitle">
              <AssignedClientsTableHead
                //numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={this.handleRequestSort}
                rowCount={selectedClientData.length}
              />
              <TableBody>
                {stableSort(selectedClientData, getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(n => {
                    // const isSelected = this.isSelected(n.id);
                    return (
                      <TableRow
                        hover
                        className={classes.row}
                        tabIndex={-1}
                        key={n.id}
                        // onClick={this.handleClickOpen}
                      >
                        <TableCell align="center">
                          {n.client_first_name}
                        </TableCell>
                        <TableCell align="center">
                          {n.client_last_name}
                        </TableCell>
                        <TableCell align="center">{n.phone}</TableCell>
                        <TableCell align="center">{n.email}</TableCell>
                        <TableCell align="center">{n.facility}</TableCell>
                        {/* <TableCell align="center">{n.clients}</TableCell> */}
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
            rowsPerPageOptions={[5, 10, 15, 20]}
            component="div"
            count={selectedClientData.length}
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

AssignedClientsTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AssignedClientsTable);
