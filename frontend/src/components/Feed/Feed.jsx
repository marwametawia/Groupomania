import "./feed.css";
import Share from "./Share";
import Post from "./Post";
import { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"


export default function Feed({token}) {
    const [posts, setPosts]=useState([]);
    const navigate = useNavigate()
    const tokenW = window.localStorage.getItem("token")

    useEffect(() => {
        async function request() {
            let res;
            try{
                res = await axios.get("http://localhost:8080/api/post/",{headers : {
                     authorization : `Bearer ${tokenW}`
                    }})
            }catch(error){
                throw error
            }
            setPosts(res.data)
        }

        if (!tokenW || tokenW === "") {
            navigate("/login")
        }else{
            request()
        }
    }, [tokenW])

    console.log(posts)
    
    return (
        <div className="feedContainer">
            <Share />
            
           
            <Post />
        </div>
    );
}
