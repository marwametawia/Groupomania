import "./post.css";
import React from 'react';
import Comment from "./Comment";
import {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate, Link} from "react-router-dom";
import {useJWT} from '../../hooks/useJWT';


export default function Post() {
    const [posts, setPosts] = useState([]);

    const navigate = useNavigate();
    const tokenW = useJWT();

    const getPosts = async () => {
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

    useEffect(() => {
        getPosts();
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

            getPosts();
        } catch (error) {
            throw error;
        }
    }

    return (
        <div className="post">
            <div className="postContainer">

                <div className="postCenter">
                    {posts.map((item) => (
                        <div className="postContent" key={item.id}>
                            <div className="postAuthor">{item.user ? item.user.firstName : "deleted user"}
                            </div>
                            <div className="postText">
                                <span>   {item.textContent} </span>

                            </div>
                            <div className="postContentBottom">
                                <button onClick={() => {
                                    deletePost(item.id)
                                }}>
                                    Supprimer
                                </button>
                                <Comment postId={item.id}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
