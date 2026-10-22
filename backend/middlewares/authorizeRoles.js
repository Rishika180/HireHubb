import { User } from "../models/user.model.js";

// Use AFTER isAuthenticated. Looks up the logged-in user's role in the DB
// (the JWT only stores userId) and only lets the listed roles through.
// Example: router.route("/post").post(isAuthenticated, authorizeRoles("recruiter"), postJob);
const authorizeRoles = (...allowedRoles) => {
    return async (req, res, next) => {
        try {
            const user = await User.findById(req.id).select("role");
            if (!user) {
                return res.status(401).json({
                    message: "User not found.",
                    success: false
                });
            }
            if (!allowedRoles.includes(user.role)) {
                return res.status(403).json({
                    message: "You are not allowed to perform this action.",
                    success: false
                });
            }
            req.role = user.role;
            next();
        } catch (error) {
            console.log("AUTHORIZE ROLES ERROR:", error);
            return res.status(500).json({
                message: "Server error",
                success: false
            });
        }
    };
};
export default authorizeRoles;
