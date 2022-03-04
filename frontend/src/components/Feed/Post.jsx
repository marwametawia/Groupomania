import "./post.css";
import React from "react";
import Comment from "./Comment";
import { usePosts } from "../../hooks/usePosts";
import { useDeletePost } from "../../hooks/useDeletePost";

export default function Post() {
    const isAdmin = false;
    const isAuthor = false;
    const posts = usePosts();
    const deletePost = useDeletePost();

    return (
        <div className="post">
            <div className="postContainer">
                <div className="postCenter">
                    {posts.data &&
                        posts.data.map((item) => (
                            <div className="postContent" key={item.id}>
                                <div className="postAuthor">
                                    {item.user
                                        ? item.user.firstName
                                        : "deleted user"}
                                </div>
                                <div className="postText">
                                    <span> {item.textContent} </span>
                                </div>
                                <div className="postContentBottom">
                                    <button
                                        onClick={() => {
                                            deletePost.mutate(item.id);
                                        }}
                                    >
                                        Supprimer
                                    </button>

                                    <Comment postId={item.id} />
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
