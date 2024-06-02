import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import helmet from 'helmet';
import {rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})

const app = express()
app.use(limiter)
// Use helmet with custom configuration to set various HTTP headers for security
app.use(helmet({
    contentSecurityPolicy: false,  // Disable CSP if you need more control
    frameguard: {
        action: 'deny'  // Prevent clickjacking by denying iframes
    },
    hidePoweredBy: true,  // Hide the X-Powered-By header
    xssFilter: true,  // Enable XSS filter
    noSniff: true,  // Prevent MIME type sniffing
    ieNoOpen: true,  // Set X-Download-Options for IE8+
    hsts: {
        maxAge: 31536000,  // Enable HTTP Strict Transport Security (1 year)
        includeSubDomains: true,
        preload: true
    }
}));

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import userRouter from './routes/user.routes.js'
import healthcheckRouter from "./routes/healthcheck.routes.js"
import tweetRouter from "./routes/tweet.routes.js"
import subscriptionRouter from "./routes/subscription.routes.js"
import videoRouter from "./routes/video.routes.js"
import commentRouter from "./routes/comment.routes.js"
import likeRouter from "./routes/like.routes.js"
import playlistRouter from "./routes/playlist.routes.js"
import dashboardRouter from "./routes/dashboard.routes.js"

// logger.info('the server started');
//routes declaration
app.use("/api/v1/healthcheck", healthcheckRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/tweets", tweetRouter)
app.use("/api/v1/subscriptions", subscriptionRouter)
app.use("/api/v1/videos", videoRouter)
app.use("/api/v1/comments", commentRouter)
app.use("/api/v1/likes", likeRouter)
app.use("/api/v1/playlist", playlistRouter)
app.use("/api/v1/dashboard", dashboardRouter)

// http://localhost:8000/api/v1/users/register

export { app }