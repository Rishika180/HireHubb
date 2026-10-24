// Shared auth helpers so the controller and middleware agree on secret + cookie settings.

// Render env was set up with SECRET_KEY while the local .env uses JWT_SECRET; accept both.
export const getJwtSecret = () => process.env.SECRET_KEY || process.env.JWT_SECRET;

const isProduction = () => process.env.NODE_ENV === "production" || Boolean(process.env.RENDER);

// Frontend (Vercel) and backend (Render) are on different sites, so the cookie must be
// SameSite=None; Secure to be sent cross-site. Locally (http://localhost) that combination is
// rejected, so fall back to Lax.
export const cookieOptions = () => ({
    httpOnly: true,
    secure: isProduction(),
    sameSite: isProduction() ? "none" : "lax",
});
