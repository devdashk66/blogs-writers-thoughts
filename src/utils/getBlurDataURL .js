import { promises as fs } from "fs";
import lqip from "lqip-modern";

export const getBlurDataURL = async (imagePath) => {
  try {
    const imageBuffer = await fs.readFile(imagePath);
    const { metadata } = await lqip(imageBuffer);
    return metadata.dataURIBase64;
  } catch (error) {
    console.error("Error generating blurDataURL:", error);
    return null;
  }
};
