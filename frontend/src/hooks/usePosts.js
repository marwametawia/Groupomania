import { getPosts } from "../services/posts";
import { useJWT } from "./useJWT";
import { useQuery } from "react-query";

export const usePosts = () =>{
    const tokenW = useJWT();
    return  useQuery(['getPosts', tokenW ],() => getPosts(tokenW)); //data, isLoading, isError
    

}  