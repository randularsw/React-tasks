import React from "react";
import "./App.css";
import Movies from "./components/movies";
import { Route, Redirect, Switch } from "react-router-dom";
import NotFound from "./components/notFound";
// import Counters from './components/counters';

function App() {
  return (
    <main className="container">
      <Switch>
        <Route path="/movies" component={Movies}></Route>
        <Route path="/not-found" component={NotFound}></Route>
        <Redirect exact from="/" to="/movies"></Redirect>
        <Redirect to="not-found" />
      </Switch>
    </main>
  );
}
export default App;
