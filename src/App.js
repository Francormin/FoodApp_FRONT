import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Details from "./components/Details";
import Creation from "./components/Creation";
import Landing from "./components/Landing";
import NotFound from "./components/NotFound";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(null);
  const [postsPerPage] = useState(9);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/home">
          <Home
            loading={loading}
            setLoading={setLoading}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            postsPerPage={postsPerPage}
          />
        </Route>
        <Route exact path="/recipes/:recipeId">
          <Details />
        </Route>
        <Route exact path="/creation">
          <Creation />
        </Route>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
