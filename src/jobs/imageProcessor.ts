import sharp from "sharp";
import imageQueue from "../queues/imageQueue";
import path from "path";
import axios from "axios";
import prisma from "../config/db";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const processImage = async (imageUrl: string): Promise<string> => {
  try {
    // Download the image
    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });
    const buffer = Buffer.from(response.data);

    // Extract the file name and insert "-output" before the extension
    const url = new URL(imageUrl);
    const pathname = url.pathname;
    const extension = path.extname(pathname);
    const outputUrl = imageUrl.replace(
      extension,
      `-output-${Date.now()}${extension}`
    );

    // Save the processed image
    const outputPath = path.join("uploads", path.basename(outputUrl));
    await sharp(buffer).jpeg({ quality: 50 }).toFile(outputPath);

    return outputPath;
  } catch (error) {
    console.error("Error processing image:", error);
    throw error;
  }
};

imageQueue.process(async (job) => {
  const { product } = job.data;

  const outputImageUrls: string[] = [];

  await prisma.product.update({
    where: { id: product.id },
    data: {
      status: "PROCESSING",
      outputImageUrls,
    },
  });

  for (const url of product.inputImageUrls) {
    const processedImagePath = await processImage(url);
    outputImageUrls.push(process.env.BASE_URL + "/" + processedImagePath);
  }
  // Update database with output URLs
  await prisma.product.update({
    where: { id: product.id },
    data: {
      status: "COMPLETED",
      outputImageUrls,
    },
  });

  return outputImageUrls;
});

export const addImageProcessingJob = async (
  requestId: string,
  product: any
) => {
  await imageQueue.add({ requestId, product });
};

export default imageQueue;
