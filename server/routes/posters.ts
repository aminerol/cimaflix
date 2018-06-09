import { Router, Request, Response } from 'express';
import * as multer from 'multer';

const imageFilter = function (req, file, cb) {
    // accept image only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
const UPLOAD_PATH = 'public/assets/posters';
const upload = multer({ dest: `${UPLOAD_PATH}/`, fileFilter: imageFilter });

export default Router().post('/poster/post', upload.single('img'), uploadFile);

/**
 * Upload
 * @param req
 * @param res
 */
export function uploadFile(req: Request, res: Response) {
    const file = req.file;
    // Set upload date
    file['uploadDate'] = new Date();    
    // Send response
    res.json({file: file});
  };