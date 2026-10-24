// Set VITE_API_URL in Vercel (or frontend/.env) to point at a different backend, e.g. http://localhost:8000
// Production: call our own domain (/api/...), Vercel forwards it to Render (see vercel.json).
// Local: set VITE_API_URL (e.g. http://localhost:8000), otherwise falls back to Render.
const BASE_URL = import.meta.env.PROD
    ? ""
    : (import.meta.env.VITE_API_URL || "https://hirehubb.onrender.com").replace(/\/$/, "");
export const USER_API_END_POINT = `${BASE_URL}/api/v1/user`;
export const JOB_API_END_POINT = `${BASE_URL}/api/v1/job`;
export const APPLICATION_API_END_POINT = `${BASE_URL}/api/v1/application`;
export const COMPANY_API_END_POINT = `${BASE_URL}/api/v1/company`;
