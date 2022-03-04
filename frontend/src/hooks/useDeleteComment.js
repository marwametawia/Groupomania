import { useQueryClient, useMutation } from "react-query";
import { deleteComment } from "../services/comments";
import { useJWT } from "./useJWT";
import { toast } from "react-hot-toast";


export const useDeleteComment = () => {
    const token = useJWT();
    const queryClient = useQueryClient();
    return useMutation( (postId, commentId) => deleteComment(token, postId, commentId), {
        onSuccess: () => {
            queryClient.invalidateQueries("getComment", postId);
        },
        onError: () => {
            toast.error("le commentaire n'a pas pu être supprimé")
        }
    });
};
