import React, { Fragment } from "react";

import Home from "./components/pages/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Statistics from "./components/pages/Statistics";

import { Sidebar } from "./components/Sidebar";



import { FoodTable } from "components/FoodTable";
//import { FoodTable_hookform } from "components/FoodTable_hookform";

export function App() {
  function NotFound() {
    return (
      <div className="main-panel ps">
        <h1>Página no encontrada </h1>
      </div>
    );
  }

  return (
    <Fragment>
      <Router>
        <div>
          <Sidebar />
          <div className="content w-100">
            <Switch>
              <Route path="/statistics" exact={true} component={Statistics} />
              <Route path="/foodtable" component={() => <FoodTable />} />
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    </Fragment>
  );
}
