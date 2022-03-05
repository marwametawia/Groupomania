import "./post.css";
import React from "react";
import Comment from "./Comment";
import { usePosts } from "../../hooks/usePosts";
import { useDeletePost } from "../../hooks/useDeletePost";
import { useAuthenticatedUser } from "../../hooks/useAuthenticatedUser";

export default function Post() {
    
    const posts = usePosts();
    const deletePost = useDeletePost();
    const userData = useAuthenticatedUser();

    return (
        <div className="post">
            <div className="postContainer">
                <div className="postCenter">
                    {posts.data &&
                        posts.data.map((item) => (
                            <div className="postContent" key={item.id}>
                                <div className="postAuthor">
                                    {item.user
                                        ? item.user.firstName +
                                          " " +
                                          item.user.lastName
                                        : "deleted user"}
                                </div>
                                <div className="postText">
                                    <span> {item.textContent} </span>
                                </div>
                                <div className="postContentBottom">
                                    {userData.userId === item.userId ||
                                    userData.isAdmin ? (
                                        <button
                                            onClick={() => {
                                                deletePost.mutate(item.id);
                                            }}
                                        >
                                            Supprimer
                                        </button>
                                    ) : null}
                                   

                                    <Comment postId={item.id} />
                                </div>
                                {userData.isAdmin? " userId:"+ " "+ item.userId
                                    : null}
                            </div>
                        ))}
                        
                </div>
                
            </div>
        </div>
    );
}
