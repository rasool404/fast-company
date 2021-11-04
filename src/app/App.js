import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/ui/navbar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";

const App = () => {
  return (
    <>
      <Navbar />
      <div>
        <Switch>
          <Route path="/users/:userId?" component={Users} />
          <Route path="/login" component={Login} />
          <Route path="/" exact component={Main} />
          <Redirect to="/" />
        </Switch>
      </div>
    </>
  );
};

export default App;
