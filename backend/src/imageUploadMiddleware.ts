import multer from "multer";
import { Request, Response, NextFunction } from "express";
import { getEnvVar } from "./getEnvVar.js";

class ImageFormatError extends Error {}

const storageEngine = multer.diskStorage({
  destination: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void,
  ) {
    cb(null, getEnvVar("IMAGE_UPLOAD_DIR") as string);
  },
  filename: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void,
  ) {
    const mediaType = file.mimetype;
    let fileExtension: string | undefined;

    if (mediaType === "image/png") {
      fileExtension = "png";
    } else if (mediaType === "image/jpg" || mediaType === "image/jpeg") {
      fileExtension = "jpg";
    } else {
      cb(new ImageFormatError("Unsupported image type"), "");
      return;
    }

    const fileName =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + "." + fileExtension;
    cb(null, fileName);
  },
});

export const imageMiddlewareFactory = multer({
  storage: storageEngine,
  limits: {
    files: 10,
    fileSize: 50 * 1024 * 1024, // 50 MB total
  },
});

export function handleImageFileErrors(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (err instanceof multer.MulterError || err instanceof ImageFormatError) {
    res.status(400).send({
      error: "Bad Request",
      message: err.message,
    });
    return;
  }
  next(err);
}
