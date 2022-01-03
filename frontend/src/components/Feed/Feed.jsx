import "./feed.css";
import Share from "./Share";
import Post from "./Post";
import { useState, useEffect } from "react";
import axios from "axios"

export default function Feed() {
    const [posts, setPosts]=useState([]);

    useEffect(() => {
        axios.get
        return () => {
            cleanup
        }
    }, [input])
    
    
    return (
        <div className="feedContainer">
            <Share />
            <Post />
        </div>
    );
}
