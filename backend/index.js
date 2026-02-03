import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import { app } from "./app.js"; 

// Environment Variables Load karna
dotenv.config({
    path: './.env'
});

const PORT = process.env.PORT || 8000;
connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`⚙️ Server is running at port : ${PORT}`);
    });
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})