import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import LandingPage from "./LandingPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AppLayout from "./AppLayout";
import { ProtectedRoute } from "./protected.route";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <ProtectedRoute exact path="/app" component={AppLayout} />
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement
);
