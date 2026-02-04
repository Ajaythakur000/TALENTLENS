import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const isAuthenticated = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            throw new ApiError(401, "User not authenticated");
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if(!decode){
            throw new ApiError(401, "Invalid Token");
        }

        req.id = decode.userId;

        next();

    } catch (error) {
        throw new ApiError(401, "Invalid or Expired Token"); 
    }
});

export default isAuthenticated;