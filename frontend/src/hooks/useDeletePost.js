import { useQueryClient, useMutation } from "react-query";
import { deletePost } from "../services/posts";
import { useJWT } from "./useJWT";
import { toast } from "react-hot-toast";


export const useDeletePost = () => {
    const token = useJWT();
    const queryClient = useQueryClient();
    return useMutation((postId) => deletePost(postId, token), {
        onSuccess: () => {
            queryClient.invalidateQueries("getPosts");
        },
        onError: () => {
            toast.error("le post n'a pas pu être supprimé")
        }
    });
};
