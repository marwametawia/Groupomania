import { getComments } from "../services/comments";
import { useJWT } from "./useJWT";
import { useQuery } from "react-query";

export const useGetComments = () =>{
    const token = useJWT();
    return  useQuery(['getComments', postId ], () => getComments(token, postId)); //data, isLoading, isError
    

}  