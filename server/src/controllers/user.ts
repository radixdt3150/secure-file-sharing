// Express lib
import { Response, Request } from 'express';

// express-validator lib
import { validationResult } from 'express-validator';

// Services
import userServ from "../services/user";

// Utils
import { STATUS_CODE, STATUS } from "../utils/Constants";
import { errorTranformation } from '../utils/Common';

class UserController {
    // Data members
    private readonly userService;

    // Dependency injection in constructor
    constructor(userService: any) {
        this.userService = userService;
    }


    public register = async (req: Request, res: Response): Promise<void> => {
        // Response Object
        const response: { status: string, data: any } = {
            status: STATUS.SUCCESS,
            data: null
        };
        let httpStatus = STATUS_CODE.OK;

        try {
            // validate the request body and evaluate the result
            const validationError = validationResult(req);

            if (validationError.isEmpty()) {
                // Validation was successful
                // Check if user already exists with same email
                const doesUserExists = await this.userService.userExists(req.body.email);
                if (doesUserExists) {
                    response.status = STATUS.ERROR;
                    response.data = 'User already exists';
                    httpStatus = STATUS_CODE.CLIENT_ERROR;
                } else {
                    // create a user if it does not already exists
                    response.data = await this.userService.createUser(req.body);
                }
            } else {
                response.status = STATUS.ERROR;
                response.data = errorTranformation(validationError.array());
                httpStatus = STATUS_CODE.CLIENT_ERROR;
            }
        } catch (e) {
            response.status = STATUS.ERROR;
            response.data = null;
            httpStatus = STATUS_CODE.INTERNAL_SERVER_ERROR;
            console.error(`Error in User controller :: ${e}`);
        }

        // send the response after all the processing is done
        res.status(httpStatus).json(response);
    }

    public login = async (req: Request, res: Response): Promise<void> => {
        // Response Object
        const response: { status: string, data: any } = {
            status: STATUS.SUCCESS,
            data: null
        };
        let httpStatus = STATUS_CODE.OK;

        try {
            // validate the request body and evaluate the result
            const validationError = validationResult(req);
            const { email = '', password = '' } = req.body;
            if (validationError.isEmpty()) {
                // Validation was successful
                const loginUser = await this.userService.attemptLogin(email, password);
                if (loginUser?._id) {
                    const payload = {
                        _id: loginUser._id
                    }
                    const tokenExpiryDuration = '364d';
                    
                    const token = this.userService.generateToken(payload, tokenExpiryDuration);
                    res.setHeader('set-cookie', `authorization=${token}; HttpOnly; path=/`); // instrument to share token with browsers
                    res.setHeader('X-TOKEN', token); // instrument to share token with non-browser clients
                    response.data = loginUser;
                } else {
                    httpStatus = 401; // Unauthenticated
                    response.status = STATUS.ERROR;
                    response.data = 'Invalid Credentials';
                }
            } else {
                response.status = STATUS.ERROR;
                response.data = errorTranformation(validationError.array());
                httpStatus = STATUS_CODE.CLIENT_ERROR;
            }
        } catch (e) {
            response.status = STATUS.ERROR;
            response.data = null;
            httpStatus = STATUS_CODE.INTERNAL_SERVER_ERROR;
            console.log(`Error in User controller :: ${e}`);
        }

        // send the response after all the processing is done
        res.status(httpStatus).json(response);
    }
}

export default new UserController(userServ);
