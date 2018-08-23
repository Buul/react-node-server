import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import SimpleAppBar from "~/component/header";
import Table from "~/component/table";
import Footer from "~/component/footer";
import getToken from "./utils/action/userActions";

class App extends Component {
  componentDidMount() {
    this.props.getToken();
  }
  render() {
    return (
      <div>
        <SimpleAppBar />
        <div style={{ minHeight: 500, overflow: "auto" }}>
          <Table />
        </div>
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getToken
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(App);
