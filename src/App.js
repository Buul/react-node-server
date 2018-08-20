import React from "react";

import SimpleAppBar from "~/component/header";
import Table from "~/component/table";
import Footer from "~/component/footer";

const App = () => (
  <div>
    <SimpleAppBar />
    <div style={{ minHeight: 500, overflow: "auto" }}>
      <Table />
    </div>

    <Footer />
  </div>
);

export default App;
