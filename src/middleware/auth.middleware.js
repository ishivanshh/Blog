import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "") || req.cookies?.accessToken;

  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const user = await User.findById(decodedToken._id).select("-password");

  if (!user) {
    throw new ApiError(401, "Invalid access token");
  }

  req.user = user;
  return next();
});

export default verifyJWT;