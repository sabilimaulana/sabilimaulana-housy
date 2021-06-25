import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./index.css";

import reportWebVitals from "./reportWebVitals";
import Home from "./pages/Home";

import HouseDetail from "./pages/DetailHouse";
import { UserContextProvider } from "./contexts/UserContext";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Booking from "./pages/Booking";
import History from "./pages/History";
import { FilterContextProvider } from "./contexts/FilterContext";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <FilterContextProvider>
        <UserContextProvider>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/guest">
              <Home />
            </Route>
            <Route exact path="/house-detail/:id">
              <HouseDetail />
            </Route>
            <Route exact path="/me">
              <Profile />
            </Route>
            <Route exact path="/my-booking">
              <Booking />
            </Route>
            <Route exact path="/my-history">
              <History />
            </Route>
            <Route>
              <NotFound />
            </Route>
            {/* <Redirect to="/" /> */}
          </Switch>
        </UserContextProvider>
      </FilterContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
