// top level imports
import { Request } from 'express';
import * as path from 'node:path';
import * as fs from 'node:fs';
import * as crypto from 'node:crypto';
import { pipeline } from 'node:stream/promises';

import multer from 'multer';

// Define storage
/* const storage = multer.diskStorage({
    destination: (req: Request, _f: Express.Multer.File, cb: any) => {
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
        cb(null, `${(new Date()).getTime()}${crypto?.randomBytes(3)?.toString('hex')}.enc`);
    }
}); */

/**
 * Custom multer storage that encrypts the file before storing it on the disk
 */
class EncryptedDiskStorage {
    async _handleFile(_req: Request, _file: Express.Multer.File, cb: any): Promise<void> {
        try {
            const algorithm = 'aes-256-cbc';
            const encryptionKey = crypto.randomBytes(32);
            const iv = crypto.randomBytes(16);
            const cipher = crypto.createCipheriv(algorithm, encryptionKey, iv);
            
            // Compute storage dir
            const { visibility = 'public' } = _req.body;
            const storageDirs = visibility === 'private' ? 'storage' : 'public';
            const destinationDir = path.join(__dirname, '../../' + storageDirs + '/uploads');
            // create the directory if it doesn't already exists
            if (!fs.existsSync(destinationDir)) {
                fs.mkdirSync(destinationDir, { recursive: true });
            }

            // Compute destination path
            const filename = `${(new Date()).getTime()}${crypto?.randomBytes(3)?.toString('hex')}.enc`;
            const filePath = path.join(destinationDir, filename);
            const outStream = fs.createWriteStream(filePath);

            await pipeline(_file.stream, cipher, outStream);

            cb(null, {
                filename,
                encryptionKey: encryptionKey.toString('hex'),
                iv: iv.toString('hex'),
                path: filePath,
                size: outStream.bytesWritten,
                originalname: _file.originalname
            })
        } catch(err) {
            // handle error
            console.log(err)
        }

    }

    _removeFile(_req: Request, _file: Express.Multer.File, cb: any) {
        fs.unlink(_file.path, cb)
    }
}

const storage = new EncryptedDiskStorage();

export const fileUpload = multer({
    storage
});
