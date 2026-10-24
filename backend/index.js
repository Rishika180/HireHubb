import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config({});

const app = express();

// Render sits behind a proxy; needed so secure cookies are set correctly over HTTPS.
app.set("trust proxy", 1);

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// Frontend origins allowed to call this API. Add more (comma separated) via CLIENT_URL,
// e.g. CLIENT_URL=https://hire-hubb.vercel.app,https://my-custom-domain.com
const allowedOrigins = [
    "https://hire-hubb.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000",
    ...(process.env.CLIENT_URL || "").split(",").map((o) => o.trim().replace(/\/$/, "")).filter(Boolean),
];

const corsOptions = {
    origin: (origin, callback) => {
        // no Origin header = same-origin / curl / server-to-server request
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

const PORT = process.env.PORT || 3000;


// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.get("/", (req, res) => {
  res.send("HireHub Backend is Running");
});

// last-resort error handler (e.g. multer/body-parser errors) so requests never hang
app.use((err, req, res, next) => {
    console.log("UNHANDLED ERROR:", err);
    res.status(err.status || 500).json({
        message: err.message || "Server error",
        success: false
    });
});

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})
