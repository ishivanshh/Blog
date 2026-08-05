import cloudinary, { getMissingCloudinaryEnvVars } from "../config/cloudinary.js";

export const uploadOnCloudinary = async (
  file,
  {
    folder = "blog-app",
    resource_type = "image",
    public_id,
    overwrite = true,
  } = {}
) => {
  if (!file) {
    throw new Error("No file provided for Cloudinary upload");
  }

  const missingEnvVars = getMissingCloudinaryEnvVars();
  if (missingEnvVars.length > 0) {
    throw new Error(`Missing Cloudinary env vars: ${missingEnvVars.join(", ")}`);
  }

  const uploadOptions = {
    folder,
    resource_type,
    overwrite,
    public_id,
  };

  try {
    if (file.buffer) {
      return await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
          if (error) return reject(error);
          if (!result?.secure_url) {
            return reject(new Error("Cloudinary upload did not return a secure_url"));
          }
          resolve(result.secure_url);
        });

        stream.end(file.buffer);
      });
    }

    if (file.path) {
      const result = await cloudinary.uploader.upload(file.path, uploadOptions);
      if (!result?.secure_url) {
        throw new Error("Cloudinary upload did not return a secure_url");
      }
      return result.secure_url;
    }

    if (typeof file === "string") {
      const result = await cloudinary.uploader.upload(file, uploadOptions);
      if (!result?.secure_url) {
        throw new Error("Cloudinary upload did not return a secure_url");
      }
      return result.secure_url;
    }

    throw new Error("Unsupported file payload for Cloudinary upload");
  } catch (error) {
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};
