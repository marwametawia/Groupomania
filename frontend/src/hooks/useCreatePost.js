import { useQueryClient, useMutation } from "react-query";
import { share } from "../services/posts";
export const useCreatPost = () => {
    const queryClient = useQueryClient();
    return useMutation((postId) => share(post, tokenW), {
        onSuccess: () => {
            queryClient.invalidateQueries("getPosts");
        },
    });
};
