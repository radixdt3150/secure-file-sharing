// Express Router
import type { Router } from 'express';

import { verifyToken } from '../middleware/verifyToken';
import { fileUpload } from '../middleware/fileUpload';

import fileController from '../controllers/file';

export default function (router: Router) {
    router.post('/file/upload', fileUpload.array('files', 10), verifyToken, fileController.upload);
};
