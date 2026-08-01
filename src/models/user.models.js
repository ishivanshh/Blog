import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full name is required"],
    trim: true,
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  bio: {
    type: String,
    default: "",
  },
  profilePicture: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    enum: ["User", "Admin"],
    default: "User",
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("User", userSchema);

// generated access token and refreshtoken 
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            email : this.email,
            username : this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expireIn : process.env.ACCESS_TOKEN_EXPIRY}
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id : this._id,

        },
        process.env.REFRESH_TOKEN_SECRET,
        {expireIn : process.env.REFRESH_TOKEN_EXPIRY}
    )
}

// hash the password 
userSchema.pre("save", async function(next){
    if(!this.isModified("password"))return next();
    this.password = await brcypt.hash(this.password, 10);
    next();
});



userSchema.methods.isPasswordCorrect = async function (password){
    return await brcypt.compare(password , this.password);
};


userSchema.methods.generateTemporaryToken = function (){
    // generates a 20 bytes random and convert them to hex

    const unHashedToken = crypto.randomBytes(20).toString("hex");

    //Creates a secure hash of the token using the SHA-256.

    const hashedToken = crypto
        .createHash("sha256")
        .update(unHashedToken)
        .digest("hex")

    const tokenExpiry = Date.now() + (20*60*1000) // 20 mins
    return {unHashedToken , hashedToken , tokenExpiry}
};