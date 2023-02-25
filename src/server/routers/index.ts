import multer from "multer";

const multerConfig = {
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, "uploads/");
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 4,
  },
};

export const upload = multer(multerConfig);
