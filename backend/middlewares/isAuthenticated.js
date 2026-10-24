import jwt from "jsonwebtoken";
import { getJwtSecret } from "../utils/auth.js";

// Token comes from the httpOnly cookie, or from an "Authorization: Bearer <token>" header.
// The header fallback keeps login working in browsers that block third-party cookies
// (Safari, Brave, Chrome incognito) when frontend and backend are on different domains.
const getToken = (req) => {
    if (req.cookies?.token) return req.cookies.token;
    const header = req.headers.authorization;
    if (header && header.startsWith("Bearer ")) return header.slice(7);
    return null;
};

const isAuthenticated = async (req, res, next) => {
    try {
        const token = getToken(req);
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            })
        }
        const decode = await jwt.verify(token, getJwtSecret());
        if(!decode){
            return res.status(401).json({
                message:"Invalid token",
                success:false
            })
        };
        req.id = decode.userId;
        next();
    } catch (error) {
        console.log(error);
         return res.status(401).json({
            message: "Token expired or invalid, please login again",
            success: false,
        });
    }
}
export default isAuthenticated;
