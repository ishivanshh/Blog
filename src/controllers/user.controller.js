import { User } from "../models/user.model.js";
import { Blog } from "../models/blog.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)
        .select("-password");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const totalBlogs = await Blog.countDocuments({
        author: user._id
    });

    const publishedBlogs = await Blog.countDocuments({
        author: user._id,
        status: "published"
    });

    const draftBlogs = await Blog.countDocuments({
        author: user._id,
        status: "draft"
    });

    return res.status(200).json(

        new ApiResponse(

            200,

            {
                user,

                stats: {

                    totalBlogs,

                    publishedBlogs,

                    draftBlogs

                }

            },

            "Profile fetched successfully"

        )

    );

});

const updateUserProfile = asyncHandler(async (req, res) => {

    const {
        fullName,
        username,
        bio,
        profilePicture,
        socialLinks
    } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Update Full Name
    if (fullName !== undefined) {
        user.fullName = fullName.trim();
    }

    // Update Username
    if (username !== undefined) {

        const existingUser = await User.findOne({
            username: username.toLowerCase().trim()
        });

        if (
            existingUser &&
            existingUser._id.toString() !== user._id.toString()
        ) {
            throw new ApiError(409, "Username already exists");
        }

        user.username = username.toLowerCase().trim();
    }

    // Update Bio
    if (bio !== undefined) {
        user.bio = bio;
    }

    // Update Profile Picture
    if (profilePicture !== undefined) {
        user.profilePicture = profilePicture;
    }

    // Update Social Links
    if (socialLinks !== undefined) {

        user.socialLinks = {

            ...user.socialLinks,

            ...socialLinks

        };

    }

    await user.save();

    const updatedUser = await User.findById(user._id)
        .select("-password");

    return res.status(200).json(

        new ApiResponse(

            200,

            updatedUser,

            "Profile updated successfully"

        )

    );

});

export { updateUserProfile };