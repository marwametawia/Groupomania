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


function App() {
    const [token, setToken] = useState("")

    return (
       <Router>
           <Routes>
               <Route path="/" element={<Home token={token}/>} />
               <Route path="/login" element={<Login setToken={setToken}/>} />
               <Route path="/register" element={ <Register />} />
               <Route path="/profile/:username" element={<Profile />}/>
           </Routes>
       </Router>)
}

export default App;
