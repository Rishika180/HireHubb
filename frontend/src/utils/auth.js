import axios from "axios";

// The backend sets an httpOnly cookie on login, but browsers that block third-party cookies
// (Safari, Brave, incognito) drop it because the API lives on a different domain. We also keep
// the JWT returned by the login response and send it as a Bearer token so auth works everywhere.
const TOKEN_KEY = "token";

export const getToken = () => {
    try {
        return localStorage.getItem(TOKEN_KEY);
    } catch {
        return null;
    }
};

export const setToken = (token) => {
    try {
        if (token) localStorage.setItem(TOKEN_KEY, token);
        else localStorage.removeItem(TOKEN_KEY);
    } catch {
        // storage unavailable; the cookie is still used
    }
};

export const setupAxiosAuth = () => {
    axios.interceptors.request.use((config) => {
        const token = getToken();
        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });
};
