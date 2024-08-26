// Express lib
import { Response, Request } from 'express';

// express-validator lib
// import { validationResult } from 'express-validator';

// Services
import type { FileServiceType } from '../services/file';
import fileServ from "../services/file";


// Utils
import { STATUS_CODE, STATUS } from "../utils/Constants";
// import { errorTranformation } from '../utils/Common';

class FileController {
    // Data members
    private fileService;

    // Dependency injection in constructor
    constructor(fileService: FileServiceType) {
        this.fileService = fileService;
    }


    public upload = async (req: Request, res: Response): Promise<void> => {
        // Response Object
        const response: { status: string, data: any } = {
            status: STATUS.SUCCESS,
            data: null
        };
        let httpStatus = STATUS_CODE.OK;

        try {
           res.send("File upload route")
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

export default new FileController(fileServ);
