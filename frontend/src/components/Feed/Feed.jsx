import "./feed.css";
import Share from "./Share";
import Post from "./Post";
import { useState, useEffect } from "react";
import axios from "axios"

export default function Feed() {
    const [posts, setPosts]=useState([]);

    /*useEffect(() => {
        axios.get
        //setPosts(res.data)
        return () => {

        }
    }, //[input])*/

    // Exemple de structure posts = [{textContent : "article"}, { textContent "autre article"}]
    
    return (
        <div className="feedContainer">
            <Share />
            {posts.map((item) => (
                <Post textContent={item.textContent}/>
            ))}
        </div>
    );
}
