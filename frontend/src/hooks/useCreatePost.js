import { useQueryClient, useMutation } from "react-query";
import { share } from "../services/posts";
import { useJWT } from "./useJWT";
import { toast } from "react-hot-toast";

export const useCreatePost = () => {
    const token = useJWT();
    const queryClient = useQueryClient();
    return useMutation((post) => share(post, token), {
        onSuccess: () => {
            queryClient.invalidateQueries("getPosts");
        },
        onError: () => {
            toast.error("le post n'a pas pu être publié");
        },
    });
};
