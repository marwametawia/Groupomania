import axios from "axios";
import { useState } from "react";
import "./comment.css";

export default function Comment({ postId }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [commentsData, setCommentsData] = useState([]);
    const tokenW = window.localStorage.getItem("token");
    const [comment, setComment] = useState("");


    async function deleteComment(commentId) {
        let res
        try {
            res = await axios.delete(
                `http://localhost:8080/api/post/${postId}/comment/${commentId}/`,
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
        return await axios.get(`http://localhost:8080/api/post/${postId}/comment/`, {
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



    function handleChange(e) {
        setComment(e.target.value);
    }

    async function handleSubmit(postId) {
        let res;
        console.log(tokenW)
        console.log(postId)
        try {
            res = await axios.post(`http://localhost:8080/api/post/${postId}/comment/`, {
                headers: {
                    authorization: `Bearer ${tokenW}`,
                },
            })
        } catch (error) {
            console.error(error);
            throw error;
        }
        console.log(tokenW);
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
                    <span> Les commentaires se chargent </span>
                ) : commentsData.length !== 0 ? (
                    commentsData.map((item) => (
                        <div className="postAuthor"key={item.id}>{item.user? item.user.firstName : "deleted user" }
                        <div className="postText" >
                            {item.textContent}
                            <button onClick={()=>{
                                deleteComment(item.id)}}>
                                Supprimer
                            </button>
                           
                        </div>
                        
                        
                         </div>



                    ))
                ) : (
                    <span>No comments</span>
                )
            ) : (
                <div className="createComment" >
                    < input placeholder="écrire un commentaire"
                    className="createComment"
                    value={comment}
                    onChange={handleChange} 
                    />
                
                <button 
                    onClick={()=>{
                        handleSubmit(postId)
                    }}
                    className="createCommentButton"
                >
                    Partager
                </button>
                </div>
            )}
        </div>
    );
}
