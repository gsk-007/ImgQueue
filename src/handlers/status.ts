import { Request, Response } from "express";
import prisma from "../config/db";
import { Parser } from "json2csv";

export const checkStatus = async (
  req: Request<{ requestId: string }>,
  res: Response
) => {
  const { requestId } = req.params;

  const request = await prisma.processingRequest.findUnique({
    where: { id: requestId },
    include: {
      products: true,
    },
  });

  if (!request) {
    res.status(404);
    throw new Error("Request not found");
  }

  // Count products
  const totalProducts = request.products.length;
  const completedProducts = request.products.filter(
    (p) => p.status === "COMPLETED"
  ).length;
  const pendingProducts = totalProducts - completedProducts;

  let updatedStatus = request.status;

  if (
    completedProducts > 0 &&
    pendingProducts > 0 &&
    request.status !== "PROCESSING"
  ) {
    updatedStatus = "PROCESSING";
  } else if (pendingProducts === 0 && request.status !== "COMPLETED") {
    updatedStatus = "COMPLETED";
  }

  if (updatedStatus !== request.status) {
    await prisma.processingRequest.update({
      where: { id: requestId },
      data: { status: updatedStatus },
    });
  }

  if (updatedStatus !== "COMPLETED") {
    res.status(200).json({
      status: updatedStatus,
      totalProducts,
      completedProducts,
      pendingProducts,
    });
  }

  // Generate CSV for completed requests
  const csvData = request.products.map((product) => ({
    "S. No.": product.serialNumber,
    "Product Name": product.productName,
    "Input Image Urls": product.inputImageUrls.join(", "),
    "Output Image Urls": product.outputImageUrls.join(", "),
  }));

  const json2csvParser = new Parser();
  const csv = json2csvParser.parse(csvData);

  // Send CSV response
  res.header("Content-Type", "text/csv");
  res.attachment(`request_${requestId}_results.csv`);
  res.send(csv);
};
