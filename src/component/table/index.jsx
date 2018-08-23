import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import SaveAlt from "@material-ui/icons/SaveAlt";

import CustomModal from "~/utils/component/CustomModal";

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

class SimpleTable extends Component {
  state = {
    token: "",
    data: [],
    openModal: false,
    message: []
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.token !== nextProps.user.token) {
      var config = {
        headers: {
          Authorization: `bearer ${nextProps.user.token}`
        }
      };
      axios
        .get("http://localhost:7000/transactions", config)
        .then(resp => {
          this.setState({ data: resp.data });
        })
        .catch(e => {
          const errorMessage = [];
          errorMessage.push("Falha ao buscar transações");
          errorMessage.push(e.message);
          this.setState({
            openModal: true,
            message: errorMessage
          });
        });
    }
  }

  onClickBtnRow = row => {
    const rows = [["idTransacao", "cartao", "valor", "data"]];
    rows.push([row.idTransacao, row.cartao, row.valor, row.data]);
    let csvContent = "data:text/csv;charset=utf-8,";
    rows.forEach(function(rowArray) {
      let row = rowArray.join(",");
      csvContent += row + "\r\n";
    });

    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  };

  handleCloseModal = () => {
    this.setState({ openModal: false });
  };

  render() {
    const { classes } = this.props;
    const { data, openModal, message } = this.state;

    return (
      <div className={classes.container}>
        <Paper className={classes.root}>
          {data.length > 0 && (
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Id da Transação</TableCell>
                  <TableCell>Cartão</TableCell>
                  <TableCell numeric>Valor</TableCell>
                  <TableCell>Data</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map(row => {
                  return (
                    <TableRow key={row.idTransacao}>
                      <TableCell>{row.idTransacao}</TableCell>
                      <TableCell>{row.cartao}</TableCell>
                      <TableCell numeric>{row.valor}</TableCell>
                      <TableCell>{row.data}</TableCell>
                      <TableCell>
                        <IconButton
                          color="primary"
                          key={row.idTransacao}
                          onClick={() => this.onClickBtnRow(row)}
                        >
                          <SaveAlt />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </Paper>
        <CustomModal
          open={openModal}
          closeModal={this.handleCloseModal}
          title="Error"
          message={message}
        />
      </div>
    );
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default withStyles(styles)(connect(mapStateToProps)(SimpleTable));
