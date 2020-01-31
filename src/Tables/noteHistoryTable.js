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
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import Container from "@material-ui/core/Container";

let counter = 0;
function createData(note, sessionDate, noteDate) {
  counter += 1;
  return { id: counter, note, sessionDate, noteDate };
}

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
  { id: "note", label: "Note" },
  { id: "sessionDate", label: "Session Date" },
  { id: "noteDate", label: "Note Date" }
];

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: Cyan[800],
    color: theme.palette.common.white,
    fontSize: 15
  },
  body: {
    fontSize: 12
  }
}))(TableCell);

class NoteHistoryTableHead extends React.Component {
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

NoteHistoryTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired
  //rowCount: PropTypes.number.isRequired,
};

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    //marginLeft: theme.spacing.unit * 45,
    marginBottom: theme.spacing(10),
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

  root2: {
    // width: "500"
  },

  textField: {
    marginLeft: theme.spacing.unit,
    //marginRight: theme.spacing.unit,
    width: 200
  },

  textField2: {
    marginLeft: theme.spacing.unit,
    //marginRight: theme.spacing.unit,
    width: 200
  },
  textField3: {
    marginLeft: theme.spacing.unit,
    //marginRight: theme.spacing.unit,
    width: 400
  },

  checked: {}
});

const noteType = [
  {
    value: "Free Note",
    label: "Free Note"
  },

  {
    value: "Note Type 1",
    label: "Note Type 1"
  },
  {
    value: "Note Tyoe 2",
    label: "Note Tyoe 2"
  }
];

const attendance = [
  {
    value: "Absent",
    label: "Absent"
  },

  {
    value: "Late",
    label: "Late"
  },
  {
    value: "Present",
    label: "Present"
  },
  {
    value: "Unmarked",
    label: "Unmarked"
  }
];

const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[5],
    fontSize: 11
  }
}))(Tooltip);

class NoteHistoryTable extends React.Component {
  state = {
    order: "",
    orderBy: "",
    data: [
      createData("1/5/19", "1/7/19", "1/5/19"),
      createData("1/6/19", "1/8/19", "1/6/19"),
      createData("1/7/19", "1/10/19", "1/7/19"),
      createData("1/8/19", "1/11/19", "1/8/19"),
      createData("1/9/19", "1/12/19", "1/9/19"),
      createData("1/10/19", "1/13/19", "1/10/19"),
      createData("1/11/19", "1/14/19", "1/11/19"),
      createData("1/12/19", "1/15/19", "1/12/19"),
      createData("1/13/19", "1/16/19", "1/13/19")
    ],
    page: 0,
    rowsPerPage: 5,
    open: false,
    openV: false,
    sessionDateP: "1/5/19",
    noteInput: "This is was an amazing session!",
    clientName: "Jaren Jones",
    noteType: "Free Note",
    attendance: "Present",
    checkedPayor: false,
    checkedFamily: true,
    checkedTherapist: false,
    checkedHIPAA: false
  };

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

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  /* show date range diaglog box */
  handleClickOpenV = () => {
    this.setState({ openV: true });
  };

  /* close date range diaglog box */
  handleCloseV = () => {
    this.setState({ openV: false });
  };

  // isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Container maxWidth="md">
        <Grid container justify="center">
          <Paper className={classes.root}>
            <div className={classes.tableWrapper}>
              <Table className={classes.table} aria-labelledby="tableTitle">
                <NoteHistoryTableHead
                  //numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={this.handleRequestSort}
                  rowCount={data.length}
                />

                <Dialog
                  className={classes.root2}
                  open={this.state.openV}
                  onClose={this.handleCloseV}
                >
                  <DialogTitle id="form-dialog-title">
                    Session Notes
                  </DialogTitle>
                  <DialogContent>
                    <Grid container row>
                      <TextField
                        id="standard-date"
                        label="Client Name"
                        variant="outlined"
                        InputProps={{
                          readOnly: true
                        }}
                        className={classes.textField}
                        value={this.state.clientName}
                        //onChange={this.handleChange("clientName")}
                        margin="normal"
                      />
                      <TextField
                        id="standard-payor"
                        label="Session Date"
                        variant="outlined"
                        InputProps={{
                          readOnly: true
                        }}
                        className={classes.textField}
                        value={this.state.sessionDateP}
                        // onChange={this.handleChange("sessionDateP")}
                        margin="normal"
                      />
                    </Grid>
                    <Grid container row>
                      <TextField
                        id="standard-select-client"
                        select
                        label="Note Type"
                        variant="outlined"
                        className={classes.textField2}
                        value={this.state.noteType}
                        onChange={this.handleChange("noteType")}
                        SelectProps={{
                          MenuProps: {
                            className: classes.menu
                          }
                        }}
                      >
                        {noteType.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        id="standard-select-client"
                        select
                        label="Attendance"
                        variant="outlined"
                        className={classes.textField2}
                        value={this.state.attendance}
                        onChange={this.handleChange("attendance")}
                        SelectProps={{
                          MenuProps: {
                            className: classes.menu
                          }
                        }}
                      >
                        {attendance.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <TextField
                      id="standard-amount"
                      label="Notes"
                      variant="outlined"
                      multiline
                      InputProps={{
                        readOnly: true
                      }}
                      rows="15"
                      className={classes.textField3}
                      value={this.state.noteInput}
                      //onChange={this.handleChange("note")}
                      margin="normal"
                    />
                    <Grid container row justify="flex-end">
                      <FormGroup row>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={this.state.checkedPayor}
                              onChange={this.handleChange("checkedPayor")}
                              value="checkedPayor"
                              color="default"
                            />
                          }
                          label="Payor"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={this.state.checkedFamily}
                              onChange={this.handleChange("checkedFamily")}
                              value="checkedFamily"
                              color="default"
                            />
                          }
                          label="Family"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={this.state.checkedTherapist}
                              onChange={this.handleChange("checkedTherapist")}
                              value="checkedTherapist"
                              color="default"
                            />
                          }
                          label="Therapist"
                        />
                      </FormGroup>

                      <LightTooltip
                        title="Checking this will send this note to the portal"
                        placement="top-end"
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={this.state.checkedHIPAA}
                              onChange={this.handleChange("checkedHIPAA")}
                              value="checkedHIPAA"
                              color="default"
                            />
                          }
                          color="rgba(30, 130, 76, 1)"
                          label="HIPAA"
                        />
                      </LightTooltip>
                    </Grid>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleCloseV} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={this.handleCloseV} color="primary">
                      Save
                    </Button>
                  </DialogActions>
                </Dialog>

                <TableBody>
                  {stableSort(data, getSorting(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(n => {
                      // const isSelected = this.isSelected(n.id);
                      return (
                        <TableRow
                          hover
                          className={classes.row}
                          onClick={this.handleClickOpenV}
                          tabIndex={-1}
                          key={n.id}
                        >
                          <TableCell align="center">{n.note}</TableCell>
                          <TableCell align="center">{n.sessionDate}</TableCell>
                          <TableCell align="center">{n.noteDate}</TableCell>
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
              count={data.length}
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
        </Grid>
      </Container>
    );
  }
}

NoteHistoryTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NoteHistoryTable);
