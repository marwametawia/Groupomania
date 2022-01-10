import "./feed.css";
import React from 'react';
import Share from "./Share";
import Post from "./Post";
import {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"


export default function Feed() {

    return (
        <div className="feedContainer">
            <Share/>


            <Post/>
        </div>
    );
}
