import mongoose from "mongoose";


const connectDb = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined in backend/.env.");
        }

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected ✅");
    } catch (error) {
        console.error("Database Connection Error:", error.message);
        process.exit(1);
    }
};

export default connectDb;