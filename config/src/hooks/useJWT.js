
export const useJWT = () => {
    return window.localStorage.getItem("token");
}
