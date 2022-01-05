import React from "react";
import Home from "./components/pages/Home";
import Register from "./components/pages/Register";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import Login from "./components/pages/Login";
import Profile from "./components/pages/Profile";


function App() {
    return (
       <Router>
           <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/login" element={<Login />} />
               <Route path="/register" element={ <Register />} />
               <Route path="/profile:username" element={<Profile />}/>


           </Routes>
       </Router>)
}

export default App;
