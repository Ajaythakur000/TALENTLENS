import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors({
    origin:['http://localhost:5173', 'http://localhost:5175'],
    credentials: true
}));

app.use(express.json({limit: "16kb"}));


app.use(express.urlencoded({extended: true, limit: "16kb"}));

app.use(express.static("public"));

app.use(cookieParser());

import userRouter from "./routes/user.routes.js"; 
import companyRouter from "./routes/company.routes.js";
import jobRouter from "./routes/job.routes.js";
import applicationRouter from "./routes/application.routes.js";



app.use("/api/v1/user", userRouter);
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

// Agar URL hai: http://localhost:8000/api/v1/user/register
// Toh control 'userRouter' ke paas jayega, aur wahan se '/register' dhoondhega.


export { app }