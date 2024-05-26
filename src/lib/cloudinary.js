import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: "dkywqtaik",
  api_key: "633222887781138",
  api_secret: "Jtt34akNBmJZdbwZV2zkPgbA_mw",
});

const uploadOnCloudinary = async (localFile) => {
  try {
    if (!localFile) return null;
    const res = await cloudinary.uploader.upload(localFile, {
      resource_type: "auto",
    });
    fs.unlinkSync(localFile); //remove the locally file after uploaded to cloudinary
    return res;
  } catch (error) {
    console.log("Cloudinary error: ", error);
    fs.unlinkSync(localFile); //remove the locally file if it is not uploaded to cloudinary
    return null;
  }
};

export { uploadOnCloudinary };
