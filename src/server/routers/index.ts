import multer from "multer";

const multerConfig = {
  limits: {
    fileSize: 1024 * 1024 * 8,
  },
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, "uploads/");
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}${file.originalname}`);
    },
  }),
};

export const upload = multer(multerConfig);
