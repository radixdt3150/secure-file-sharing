// Express Router
import type { Router } from 'express';

import { verifyToken } from '../middleware/verifyToken';

import fileController from '../controllers/file';

export default function (router: Router) {
    router.post('/file/upload', verifyToken, fileController.upload);
};
