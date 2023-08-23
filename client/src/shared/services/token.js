
export const token = {
    setToken(token){
        sessionStorage.setItem('token', JSON.stringify(token));
    },
    getToken(){
        const tokenString = sessionStorage.getItem('token');
        const token = JSON.parse(tokenString);
        return token;
    },
}