import "./post.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Post() {
    const [posts, setPosts] = useState([]);
   
    const navigate = useNavigate();
    const tokenW = window.localStorage.getItem("token");
    const userData = JSON.parse(window.localStorage.getItem("userData"));

    useEffect(() => {
        async function request() {
            let res;
            try {
                res = await axios.get("http://localhost:8080/api/post/", {
                    headers: {
                        authorization: `Bearer ${tokenW}`,
                    },
                });
            } catch (error) {
                throw error;
            }
            console.log(res)
            setPosts(res.data);
        }

        if (!tokenW || tokenW === "") {
            navigate("/login");
        } else {
            request();
        }
    }, [tokenW]);

   

    console.log(posts);

    async function deletePost(postId) {
        let res
        try {
            res = await axios.delete(
                `http://localhost:8080/api/post/${postId}`,
                {
                    headers: {
                        authorization: `Bearer ${tokenW}`,
                    },
                }
            );
        } catch (error) {
            throw error;
        }
    }

    return (
        <div className="post">
            <div className="postContainer">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img className="postProfileImg"></img>
                        <span className="postUserName"></span>
                        <span className="postDate"></span>
                    </div>
                </div>
                <div className="postCenter">
                    {posts.map((item) => (
                        <div className="postAuthor"key={item.id}>{item.user? item.user.firstName : "deleted user" }
                        <div className="postText" >
                            {item.textContent}
                            <button onClick={()=>{
                                deletePost(item.id)}}>
                                Supprimer
                            </button>
                        </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
