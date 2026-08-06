import User from "../models/user.models.js";
import Blog from "../models/blog.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { uploadOnCloudinary } from "../utils/uploadOnCloudinary.js";

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const totalBlogs = await Blog.countDocuments({ author: user._id });
  const publishedBlogs = await Blog.countDocuments({ author: user._id, status: "Published" });
  const draftBlogs = await Blog.countDocuments({ author: user._id, status: "Draft" });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user,
        stats: {
          totalBlogs,
          publishedBlogs,
          draftBlogs,
        },
      },
      "Profile fetched successfully"
    )
  );
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const { fullName, username, bio, profilePicture } = req.body ?? {};
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (fullName !== undefined) {
    user.fullName = fullName.trim();
  }

  if (username !== undefined) {
    const existingUser = await User.findOne({ username: username.toLowerCase().trim() });

    if (existingUser && existingUser._id.toString() !== user._id.toString()) {
      throw new ApiError(409, "Username already exists");
    }

    user.username = username.toLowerCase().trim();
  }

  if (bio !== undefined) {
    user.bio = bio;
  }

  const profilePictureFile = req.file;
  let profilePictureUrl = profilePicture;

  if (profilePictureFile) {
    profilePictureUrl = await uploadOnCloudinary(profilePictureFile, {
      folder: "blog-app/profile-pictures",
      public_id: `user_${user._id}`,
      overwrite: true,
    });
  }

  if (profilePictureUrl !== undefined) {
    user.profilePicture = profilePictureUrl;
  }

  await user.save();

  const updatedUser = await User.findById(user._id).select("-password");

  return res.status(200).json(
    new ApiResponse(200, updatedUser, "Profile updated successfully")
  );
});

export { getUserProfile, updateUserProfile };
export default { getUserProfile, updateUserProfile };