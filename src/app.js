import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import dotenv from 'dotenv';

// Load environment variables from .env file, if present
dotenv.config();

// Initialize the express application
const app = express();

// Rate limiter middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: 'draft-7', // `RateLimit` header
    legacyHeaders: false, // Disable `X-RateLimit-*` headers
    // store: ... , // Uncomment and configure Redis, Memcached, etc., if needed
});

// Use rate limiter
app.use(limiter);

// Use helmet with custom configuration to set various HTTP headers for security
app.use(helmet({
    contentSecurityPolicy: false, // Disable CSP if you need more control
    frameguard: {
        action: 'deny' // Prevent clickjacking by denying iframes
    },
    hidePoweredBy: true, // Hide the X-Powered-By header
    xssFilter: true, // Enable XSS filter
    noSniff: true, // Prevent MIME type sniffing
    ieNoOpen: true, // Set X-Download-Options for IE8+
    hsts: {
        maxAge: 31536000, // Enable HTTP Strict Transport Security (1 year)
        includeSubDomains: true,
        preload: true
    }
}));

// Use CORS with custom configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*', // Allow requests from this origin
    credentials: true // Allow cookies to be sent with requests
}));

// Handle preflight requests
app.options('*', cors());

// Middleware for parsing JSON and urlencoded data
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Serve static files from the "public" directory
app.use(express.static("public"));

// Middleware for parsing cookies
app.use(cookieParser());

// Import routes
import userRouter from './routes/user.routes.js';
import healthcheckRouter from "./routes/healthcheck.routes.js";
import tweetRouter from "./routes/tweet.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import videoRouter from "./routes/video.routes.js";
import commentRouter from "./routes/comment.routes.js";
import likeRouter from "./routes/like.routes.js";
import playlistRouter from "./routes/playlist.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";

// Route declarations
app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tweets", tweetRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/videos", videoRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/likes", likeRouter);
app.use("/api/v1/playlist", playlistRouter);
app.use("/api/v1/dashboard", dashboardRouter);

// Export the app
export { app };
