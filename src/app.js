import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import healthCheck from "./controllers/healthCheck.controller.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use((req, res, next) => {
  req.cookies = req.cookies || {};
  next();
});

app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  })
);

app.get("/", (req, res) => {
  res.send("Nodemon is working!");
});

app.get("/api/v1/healthcheck", healthCheck);
app.use("/api/v1/auth", authRoutes); // app,use is middleware ")
app.use(errorMiddleware);

export default app;