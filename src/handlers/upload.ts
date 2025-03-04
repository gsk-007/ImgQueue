import { Request, Response } from "express";
import multer, { Multer } from "multer";
import { parseCsv } from "../modules/csv";
import prisma from "../config/db";
import { addImageProcessingJob } from "../jobs/imageProcessor";
import { BadRequestError } from "../errors/badRequestError";

const uploadFile: Multer = multer({ dest: "uploads/" });

export const upload = [
  uploadFile.single("file"),
  async (req: Request, res: Response) => {
    if (!req.file) {
      res.status(400);
      throw new BadRequestError("CSV file is required.");
    }

    const products = await parseCsv(req.file);

    const request = await prisma.processingRequest.create({
      data: {
        products: {
          create: products,
        },
      },
      include: {
        products: {
          select: {
            id: true,
            inputImageUrls: true,
          },
        },
      },
    });

    for (const product of request.products) {
      addImageProcessingJob(request.id, product);
    }
    res.status(201).json({ requestId: request.id });
  },
];
