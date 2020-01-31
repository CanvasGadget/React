import React from "react";
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
import { Redirect } from "react-router-dom";

import API from "../utils/API";

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
  { id: "member_first_name", disablePadding: true, label: "First" },
  { id: "member_last_name", disablePadding: true, label: "Last" },
  { id: "role", disablePadding: true, label: "Role" },
  { id: "email", label: "Email" },
  { id: "phone", disablePadding: true, label: "Phone" }
];

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: Cyan[800],
    color: theme.palette.common.white,
    fontSize: 18
  },
  body: {
    fontSize: 12
  }
}))(TableCell);

// Table Header

class EnhancedTableHead extends React.Component {
  static defaultProps = { order: "asc" };
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
                padding={row.disablePadding ? "none" : "default"}
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

EnhancedTableHead.propTypes = {
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
    overflowX: "auto",
    alignItems: "center"
  },
  appBar: {
    position: "relative",
    backgroundColor: Cyan[800]
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

// Table Body

class TeamMembersTable extends React.Component {
  static defaultProps = { TableSortLabel: "asc" };
  state = {
    order: "asc",
    open: false,
    orderBy: "",
    memberData: [],
    page: 0,
    rowsPerPage: 10,
    redirect: false,
    curMemberId: 0
  };

  async componentDidMount() {
    try {
      const { data: members } = await API.get("/members/active");
      const memberData = members.data || [];
      this.setState({
        memberData
      });
      console.log("here's the member data length: ", memberData.length);
      /*    if (members.data.length > 0) {
        console.log("here's the good length: ", members.data.length);
        this.setState({
          memberData: members.data
        });
      } else {
        console.log("here's the zero length: ", members.data.length);
        this.setState({
          memberData: []
        });
      } */
    } catch (error) {
      const memberData = this.state.memberData;
      console.log("Team Member List fetch error: ", error);
      console.log("Here's the error length: ", memberData.length);
    }
  }

  componentWillUnmount() {}

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

  //show team members details box;
  handleClickRedirect = (memberId = 0) => {
    this.setState({
      redirect: true,
      curMemberId: memberId
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  // isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { memberData, order, orderBy, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage -
      Math.min(rowsPerPage, memberData.length - page * rowsPerPage);

    return (
      <Container maxWidth="lg">
        {this.state.redirect ? (
          <Redirect
            to={{
              pathname: "/teammembers/hideinactive/details",
              state: { curMemberId: this.state.curMemberId }
            }}
          />
        ) : null}
        {memberData.length > 0 ? (
          <Paper className={classes.root}>
            <div className={classes.tableWrapper}>
              <Table className={classes.table} aria-labelledby="tableTitle">
                <EnhancedTableHead
                  //numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={this.handleRequestSort}
                  rowCount={memberData.length}
                />
                <TableBody>
                  {stableSort(memberData, getSorting(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(n => {
                      // const isSelected = this.isSelected(n.id);
                      return (
                        <TableRow
                          hover
                          className={classes.row}
                          tabIndex={-1}
                          key={n.id}
                          onClick={() => this.handleClickRedirect(n.id)}
                        >
                          <TableCell align="center">
                            {n.member_first_name}
                          </TableCell>

                          <TableCell align="center">
                            {n.member_last_name}
                          </TableCell>
                          <TableCell align="center">{n.role}</TableCell>
                          <TableCell align="center">{n.email}</TableCell>
                          <TableCell align="center">{n.phone}</TableCell>
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
              rowsPerPageOptions={[10, 20, 50]}
              component="div"
              count={memberData.length}
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
        ) : (
          `Seems like you don't have any active team members or you haven't added any team members. 
        Click the Add New button above to add a new team member! To set any inactive team members to active,
        click the Show All button above, click on the specifc team member, and click the Active switch above the Team Member dropdown box!`
        )}
      </Container>
    );
  }
}

TeamMembersTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TeamMembersTable);
