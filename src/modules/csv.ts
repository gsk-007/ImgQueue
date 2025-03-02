import * as csv from "fast-csv";

type Product = {
  serialNumber: number;
  productName: string;
  inputImageUrls: string[];
};

export const parseCsv = (file: Express.Multer.File): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    const products: Product[] = [];

    csv
      .parseFile(file.path, { headers: false, trim: true })
      .on("data", (row) => {
        const serialNumber = parseInt(row[0], 10);
        const productName = row[1];
        const inputImageUrls = row[2]
          .split(",")
          .map((url: string) => url.trim());

        if (serialNumber && productName && inputImageUrls.length) {
          products.push({ serialNumber, productName, inputImageUrls });
        } else {
          throw new Error("Error in csv.");
        }
      })
      .on("end", () => resolve(products))
      .on("error", (error: any) => reject(error));
  });
};
