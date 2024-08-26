// top level imports
import { Request } from 'express';
import * as path from 'node:path';
import * as fs from 'node:fs';
import * as crypto from 'node:crypto';

import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req: Request, _f, cb: any) => {
        const { visibility = 'public' } = req.body;

        const storageDirs = visibility === 'private' ? 'storage' : 'public';

        const destinationPath = path.join(__dirname, '../../' + storageDirs + '/uploads');

        // create the directory if it doesn't already exists
        if (!fs.existsSync(destinationPath)) {
            fs.mkdirSync(destinationPath, { recursive: true });
        }

        cb(null, destinationPath);
    },
    
    filename: function(_r, _f, cb) {
        cb(null, `${(new Date()).getTime()}${crypto?.randomBytes(3)?.toString('hex')}`);
    }
});

export const fileUpload = multer({ storage });
