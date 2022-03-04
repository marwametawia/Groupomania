import axios from "axios";

export const getComments = async (token, idPost) => {
    const res = await axios.get(`http://localhost:8080/api/post/${idPost}/comment/`, {
        headers: {
            authorization: `Bearer ${token}`,
        },
    });

    return res.data;
};

export const deleteComment =  (token, postId, commentId) => {
    
    return  axios.delete(
        `http://localhost:8080/api/post/${postId}/comment/${commentId}/`,
        {
            headers: {
                authorization: `Bearer ${token}`,
            },
        }
    );
}

export function createComment(token, postId, text) {

   return axios.post(`http://localhost:8080/api/post/${postId}/comment/`, {
        textContent: text,
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}