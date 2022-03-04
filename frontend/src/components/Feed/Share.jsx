import "./share.css";
import React, { useState } from "react";
import { useCreatePost } from "../../hooks/useCreatePost";
export default function Share() {
    const [post, setPost] = useState("");
    const createPost = useCreatePost();


    function handleChange(e) {
        setPost(e.target.value);
    }

    

    return (
        <div className="share">
            <div className="shareContainer">
                <input
                    placeholder="Quoi de neuf ?"
                    className="shareInput"
                    value={post}
                    onChange={handleChange}
                />
                <button
                    onClick={() => {
                        createPost.mutate(post);
                    }}
                    className="shareButton"
                >
                    Partager
                </button>
            </div>
        </div>
    );
}
