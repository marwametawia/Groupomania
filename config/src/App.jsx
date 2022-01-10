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
import {PrivateRoute} from './components/PrivateRoute';
import {Toaster} from 'react-hot-toast';


function App() {
    return (
        <div>
            <Toaster/>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>

                    <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>}/>
                    <Route path="/profile/" element={<PrivateRoute><Profile/></PrivateRoute>}/>
                </Routes>
            </Router>
        </div>
    )
}

export default App;
