import React from "react";
import "./App.css";
import Movies from "./components/movies";
import { Route, Redirect, Switch } from "react-router-dom";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import MovieDetail from "./components/movieDetail";
import Login from "./components/login";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/movies/:id" component={MovieDetail}></Route>
          <Route path="/movies" component={Movies}></Route>
          <Route path="/login" component={Login}></Route>
          <Redirect exact from="/" to="/movies"></Redirect>
          <Redirect to="not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}
export default App;
