import { Request, Response } from "express";
import multer, { Multer } from "multer";
import { parseCsv } from "../modules/csv";
import prisma from "../config/db";

const uploadFile: Multer = multer({ dest: "uploads/" });

export const upload = [
  uploadFile.single("file"),
  async (req: Request, res: Response) => {
    if (!req.file) {
      res.status(400);
      throw new Error("CSV file is required.");
    }

    const products = await parseCsv(req.file);

    const request = await prisma.processingRequest.create({
      data: {
        products: {
          create: products,
        },
      },
    });

    res.status(201).json({ data: request.id });
  },
];
