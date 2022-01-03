import React from "react";
import Home from "./components/pages/Home";
import Register from "./components/pages/Register";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Login from "./components/pages/Login";
import Profile from "./components/pages/Profile";


function App() {
    return (
       <Router>
           <Switch>
               <Route exact path="/">
                    <Home />
               </Route>
               <Route path="/login">
                    <Login />
               </Route>
               <Route path="/register">
                    <Register />
               </Route>
               <Route path="/profile:username">
                    <Profile />
               </Route>
           </Switch>
       </Router>)
}

export default App;
