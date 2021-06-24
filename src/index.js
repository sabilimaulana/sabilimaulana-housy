import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./index.css";

import reportWebVitals from "./reportWebVitals";
import Home from "./pages/Home";

import HouseDetail from "./pages/DetailHouse";
import { UserContextProvider } from "./Contexts/UserContext";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <UserContextProvider>
        <Switch>
          <Route exact path="/">
            <Home />
            {/* <HouseDetail /> */}
          </Route>
          <Route exact path="/guest">
            <Home />
          </Route>
          <Route exact path="/house-detail/:id">
            <HouseDetail />
          </Route>
        </Switch>
      </UserContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
