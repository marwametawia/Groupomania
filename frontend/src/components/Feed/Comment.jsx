import { useState } from "react";
import "./comment.css";
import { useGetComments } from "../../hooks/useGetComments";
import { useCreateComment } from "../../hooks/useCreateComment";
import { useDeleteComment } from "../../hooks/useDeleteComment";

export default function Comment({ postId }) {
    const [isOpen, setIsOpen] = useState(false);
    const [comment, setComment] = useState("");
    const createComment = useCreateComment();
    const deleteComment = useDeleteComment();
    const {data:commentsData,isLoading} = useGetComments(postId, isOpen);


    function handleChange(e) {
        setComment(e.target.value);
    }

    return (
        <div>
            <button onClick={() => setIsOpen(!isOpen) } >
                { isOpen ? <span>Cacher les commentaires </span> : <span>Afficher les commentaires</span>}
            </button>
            {isOpen && (
                isLoading ? (
                    <span> Les commentaires se chargent </span>
                ) : commentsData.length !== 0 ? (
                    commentsData.map((item) => (
                        <div className="postAuthor"key={item.id}>{item.user? item.user.firstName : "deleted user" }
                        <div className="postText" >
                            {item.textContent}
                           { <button onClick={()=>{
                                deleteComment.mutate({postId, commentId:item.id})}}>
                                Supprimer
                            </button>}

                        </div>


                         </div>



                    ))
                ) : (
                    <span>No comments</span>
                )
            )}

            <div className="createComment" >
                < input placeholder="écrire un commentaire"
                        className="createComment"
                        value={comment}
                        onChange={handleChange}
                />

                <button
                    onClick={()=>{
                        createComment.mutate({postId, text: comment})
                    }}
                    className="createCommentButton"
                >
                    Partager
                </button>
            </div>
        </div>
    );
}
