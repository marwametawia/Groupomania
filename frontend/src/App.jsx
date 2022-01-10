import React, {useState} from "react";
import Home from "./components/pages/Home";
import Register from "./components/pages/Register";
import {
    BrowserRouter as Router,
    Routes,
    Route,

  } from "react-router-dom";
import Login from "./components/pages/Login";
import Profile from "./components/pages/Profile";
import OnePost from "./components/Feed/OnePost";


function App() {
    const [token, setToken] = useState("")

    return (
       <Router>
           <Routes>
               <Route path="/" element={<Home token={token}/>} />
               <Route path="/login" element={<Login setToken={setToken}/>} />
               <Route path="/register" element={ <Register />} />
               <Route path="/profile/" element={<Profile />}/>
               <Route path="/post/" element={<OnePost />}/>
           </Routes>
       </Router>)
}

export default App;
