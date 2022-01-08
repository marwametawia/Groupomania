import axios from "axios";
import { useState } from "react";
import "./comment.css";

export default function Comment({ postId }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [commentsData, setCommentsData] = useState([]);
    const tokenW = window.localStorage.getItem("token");


    async function deleteComment(commentId) {
        let res
        try {
            res = await axios.delete(
                `http://localhost:8080/api/comment/${commentId}`,
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

    async function getComments() {
        return await axios.get(`http://localhost:8080/api/comment/${postId}`, {
            headers: {
                authorization: `Bearer ${tokenW}`,
            },
        });
    }

    async function handleCLick() {
        if (!isOpen) {
            setIsOpen(true);
            setIsLoading(true);
            const res = await getComments();
            setIsLoading(false);
            setCommentsData(res.data);
        } else {
            setIsOpen(false)
        }
    }

    return (
        <div>
            <button
                onClick={() => {
                    handleCLick();
                }}
            >
                { isOpen ? <span>Cacher les commentaires </span> : <span>Afficher les commentaires</span>}
            </button>
            {isOpen ? (
                isLoading ? (
                    <span> Loading comments </span>
                ) : commentsData.length !== 0 ? (
                    commentsData.map((item) => (
                        <div className="postAuthor"key={item.id}>{item.user? item.user.firstName : "deleted user" }
                        <div className="postText" >
                            {item.textContent}
                            <button onClick={()=>{
                                deleteComment(item.id)}}>
                                Supprimer
                            </button>
                            <Comment postId={item.id}/>
                        </div>
                        
                        
                         </div>



                    ))
                ) : (
                    <span>No comments</span>
                )
            ) : (
                <span> </span>
            )}
        </div>
    );
}
