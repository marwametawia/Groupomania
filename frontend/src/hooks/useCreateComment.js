import { useQueryClient, useMutation } from "react-query";
import { createComment } from "../services/comments";
import { useJWT } from "./useJWT";
import { toast } from "react-hot-toast";

export const useCreateComment = () => {
    const token = useJWT();
    const queryClient = useQueryClient();
    return useMutation(({postId, text}) => createComment(token, postId, text), {
        onSuccess: (serverResponse, mutationParams) => { //parametres passés fonction useMutation
            console.log(mutationParams)
            queryClient.invalidateQueries(['getComments', mutationParams.postId]); // supprimer les données stockées associées à une requete
        },
        onError: () => {
            toast.error("le commentaire n'a pas pu être publié");
        },
    });
};
