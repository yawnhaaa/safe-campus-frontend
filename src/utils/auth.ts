const TOKEN_KEY = 'jwt_token'

const setToken = (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
}

const getToken = (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
}

const removeToken = (): void => {
    localStorage.removeItem(TOKEN_KEY);
}


export { setToken, getToken, removeToken }