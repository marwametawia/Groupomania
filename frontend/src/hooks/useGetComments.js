import { getComments } from "../services/comments";
import { useJWT } from "./useJWT";
import { useQuery } from "react-query";

export const useGetComments = (postId, enabled) =>{
    const token = useJWT();
    return  useQuery(['getComments', postId ], () => getComments(token, postId), {enabled }); //data, isLoading, isError
    

}  