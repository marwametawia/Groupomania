import { getPosts } from "../services/posts";
import { useJWT } from "./useJWT";
import { useQuery } from "react-query";

export const usePosts = () =>{
    const token = useJWT();
    return  useQuery(['getPosts', token ],() => getPosts(token)); //data, isLoading, isError
    

}  