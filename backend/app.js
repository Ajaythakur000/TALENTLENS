import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json({limit: "16kb"}));


app.use(express.urlencoded({extended: true, limit: "16kb"}));

app.use(express.static("public"));

app.use(cookieParser());

import userRouter from "./routes/user.routes.js"; 

app.use("/api/v1/user", userRouter);

// Agar URL hai: http://localhost:8000/api/v1/user/register
// Toh control 'userRouter' ke paas jayega, aur wahan se '/register' dhoondhega.


export { app }