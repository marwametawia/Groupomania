import { useQueryClient, useMutation } from "react-query";
import { deletePost } from "../services/posts";
export const useDeletePost = () => {
    const queryClient = useQueryClient();
    return useMutation((postId) => deletePost(postId, tokenW), {
        onSuccess: () => {
            queryClient.invalidateQueries("getPosts");
        },
    });
};
