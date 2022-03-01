import axios from "axios";


export const getPosts = async (token) => {
    const res = await axios.get("http://localhost:8080/api/post/", {
        headers: {
            authorization: `Bearer ${token}`,
        },
    });

    return res.data;
};

export function deletePost(postId, tokenW) {
    return axios.delete(`http://localhost:8080/api/post/${postId}`, {
        headers: {
            authorization: `Bearer ${tokenW}`,
        },
    });
}

export function share(tokenW, text) {

    return axios.post("http://localhost:8080/api/post/", {textContent: text}, {

                headers: {
                    authorization: `Bearer ${tokenW}`,
                },
            });
}