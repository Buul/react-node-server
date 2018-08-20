import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  container: {
    minHeight: "100%",
    position: "relative"
  },
  root: {
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
    margin: "3%"
  },
  table: {
    minWidth: 700
  }
});

let id = 0;
function createData(cartao, valor, data) {
  id += 1;
  return { id, cartao, valor, data };
}

const rows = [
  createData("Master", 18.0, "25/01/2018"),
  createData("Master", 18.0, "25/01/2018"),
  createData("Master", 18.0, "25/01/2018"),
  createData("Master", 18.0, "25/01/2018"),
  createData("Master", 18.0, "25/01/2018")
];

function SimpleTable(props) {
  const { classes } = props;

  return (
    <div className={classes.container}>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Cartão</TableCell>
              <TableCell numeric>Valor</TableCell>
              <TableCell>Data</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => {
              return (
                <TableRow key={row.id}>
                  <TableCell>{row.cartao}</TableCell>
                  <TableCell numeric>{row.valor}</TableCell>
                  <TableCell>{row.data}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTable);
