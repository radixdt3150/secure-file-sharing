import * as jwt from 'jsonwebtoken';

import User, { IUser } from "../../models/User";

// Utils
import { JWT_ISSUER, SECRET } from "../../utils/Constants";

class UserService {
    /**
    * @param {IUser} userFields
    * @returns {Promise<any>}
    * @desc - creates a user with user fields provided in the request body
    */
    createUser = async (userFields: IUser): Promise<any> => {
        let user = null;
        // instantiate user model and save
        const { salt, hashedPassword } = User.generatePassword(userFields.password);
        userFields.salt = salt;
        userFields.password = hashedPassword;
        user = new User(userFields);
        user = await user.save();
        
        return user;
    }

    /**
     * @param {string} email
     * @returns {boolean}
     * @desc check whether a user with given email exists
     */
    userExists = async (email: string): Promise<boolean> => {
        let result = false;

        if (email) {
            result = Boolean(await User.findOne({ email }));
        }

        return result;
    }

    /**
     * @param {string} email
     * @param {string} password
     * @returns {any} matched user
     * @desc -  matches user with given credentials or null
     */
    attemptLogin = async (email: string, password: string): Promise<any> => {
        const user = await User.findOne({ email });
        if (user && User.validatePassword(password, user?.password, user?.salt)) {
            return user;
        }
        return null;
    }

    /**
     * @param { _id: string } payload
     * @returns - JWT signed token
     */
    generateToken = (payload: { _id: string }, expiresIn: string) => {
        const options = {
            expiresIn,
            issuer: JWT_ISSUER
        }
        return jwt.sign(payload, SECRET, options);
    }

}

export default new UserService();
