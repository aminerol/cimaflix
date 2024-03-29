import { Router, Request, Response } from "express";
import * as multer from "multer";

const imageFilter = function(req, file, cb) {
  // accept image only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

const UPLOAD_PATH = "dist/public/assets/posters";
//const upload = multer({ dest: `${UPLOAD_PATH}/`, fileFilter: imageFilter });
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, `${UPLOAD_PATH}/`);
  },
  filename: function(req, file, cb) {
    let ext = file.originalname.substring(
      file.originalname.lastIndexOf("."),
      file.originalname.length
    );
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage, fileFilter: imageFilter });
const crudRouter = Router();
crudRouter.post("/poster/post", upload.single("img"), uploadFile);
export default crudRouter;
/**
 * Upload
 * @param req
 * @param res
 */
export function uploadFile(req: Request, res: Response) {
  const file = req.file;
  // Set upload date
  file["uploadDate"] = new Date();
  // Send response
  res.json({ file: file });
}
