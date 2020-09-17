import jwt_decode from "jwt-decode";

export const checkIfLoggedIn = () => {
    const token = localStorage.getItem("token");
    if (token) {
        const user = jwt_decode(token);
        if (user.scopes[0] === 'ADMIN' || 'ROLE_ADMIN') {
            return token
        }
        return false
    }
    return false;
};