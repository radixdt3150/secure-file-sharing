// Express lib
import { Response, Request } from 'express';

import { Types } from 'mongoose';

// Services
import type { FileServiceType } from '../services/file';
import fileServ from "../services/file";
import userServ from "../services/user";

// Utils
import { STATUS_CODE, STATUS } from "../utils/Constants";
import { IFile } from '../models/File';

class FileController {
    // Data members
    private readonly fileService;
    // private readonly userService;

    // Dependency injection in constructor
    constructor(fileService: FileServiceType, userService: any) {
        this.fileService = fileService;
        // this.userService = userService
    }


    public upload = async (req: Request, res: Response): Promise<void> => {
        // Response Object
        const response: { status: string, data: any } = {
            status: STATUS.SUCCESS,
            data: null
        };
        let httpStatus = STATUS_CODE.OK;

        try {
            const userId = req.body.decoded._id;

            if (userId && Types.ObjectId.isValid(userId)) {
                const toBeAddedFiles = (req.files as Array<Express.Multer.File>)
                .map((mFile: Express.Multer.File): Partial<IFile> => {
                    return {
                        name: mFile.filename,
                        owner: userId,
                        path: mFile.path,
                        size: mFile.size,
                        type: mFile.originalname.split('.').at(-1),
                        originalName: mFile.originalname
                    }
                });
                
                await this.fileService.addFilesToDB(toBeAddedFiles);
                response.data = "File(s) uploaded successfully";
            } else {
                // error post with given id does not exists
                response.status = STATUS.ERROR;
                response.data = 'User not found!';
                httpStatus = STATUS_CODE.CLIENT_ERROR;
            }
        } catch (e) {
            response.status = STATUS.ERROR;
            response.data = null;
            httpStatus = STATUS_CODE.INTERNAL_SERVER_ERROR;
            console.error(`Error in File controller :: ${e}`);
        }

        // send the response after all the processing is done
        res.status(httpStatus).json(response);
    }
}

export default new FileController(fileServ, userServ);
