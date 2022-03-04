import { useQueryClient, useMutation } from "react-query";
import { comment } from "../services/comments";
import { useJWT } from "./useJWT";
import { toast } from "react-hot-toast";

export const useCreateComment = () => {
    const token = useJWT();
    const queryClient = useQueryClient();
    return useMutation((text, postId) => comment(token, postId, text), {
        onSuccess: () => {
            queryClient.invalidateQueries("getComment", postId);
        },
        onError: () => {
            toast.error("le commentaire n'a pas pu être publié");
        },
    });
};
