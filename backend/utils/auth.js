// Shared auth helpers so the controller and middleware agree on secret + cookie settings.

// Render env was set up with SECRET_KEY while the local .env uses JWT_SECRET; accept both.
export const getJwtSecret = () => process.env.SECRET_KEY || process.env.JWT_SECRET;

const isProduction = () => process.env.NODE_ENV === "production" || Boolean(process.env.RENDER);

// The frontend calls the API through the Vercel proxy (/api -> Render), so the browser sees
// one site. A first-party SameSite=Lax httpOnly cookie works in every browser and also
// protects against CSRF. Secure (HTTPS-only) is enabled in production.
export const cookieOptions = () => ({
    httpOnly: true,
    secure: isProduction(),
    sameSite: "lax",
});