
export const useAuthenticatedUser = () => {
    return JSON.parse(window.localStorage.getItem("userData"));
}
