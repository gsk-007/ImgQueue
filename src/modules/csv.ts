import * as csv from "fast-csv";
import { BadRequestError } from "../errors/badRequestError";

type Product = {
  serialNumber: number;
  productName: string;
  inputImageUrls: string[];
};

export const parseCsv = (file: Express.Multer.File): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    const products: Product[] = [];
    const urlRegex = /^(https?:\/\/)[^\s/$.?#].[^\s]*\.(jpg|jpeg)$/i;

    csv
      .parseFile(file.path, { headers: false, trim: true })
      .on("data", (row) => {
        const serialNumber = parseInt(row[0], 10);
        const productName = row[1];
        const inputImageUrls: string[] = row[2]
          .split(",")
          .map((url: string) => url.trim());

        const areValidUrls = inputImageUrls.every((url) => urlRegex.test(url));

        if (
          serialNumber &&
          productName &&
          inputImageUrls.length &&
          areValidUrls
        ) {
          products.push({ serialNumber, productName, inputImageUrls });
        } else {
          throw new BadRequestError(`Error in csv at Serial: ${serialNumber}`);
        }
      })
      .on("end", () => resolve(products))
      .on("error", (error: any) => reject(error));
  });
};
