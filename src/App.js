import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {RecordTable, SingleRecord, CreateRecord} from "./pages";

function App() {
  return (
    <Router>
      <Route exact path="/" component={RecordTable}/>
      <Route path="/record/:recordId" component={SingleRecord}/>
      <Route path="/create" component={CreateRecord}/>
    </Router>
  );
}

export default App;
