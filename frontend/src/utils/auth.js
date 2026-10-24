
// API calls now go through the Vercel proxy, so the httpOnly cookie is first-party and
// works in every browser. No token is stored in localStorage anymore.
export const getToken = () => null;

export const setToken = () => {
    try { localStorage.removeItem("token"); } catch { /* ignore */ }
};

export const setupAxiosAuth = () => {
    setToken(); // clear any token saved by the old version
};
