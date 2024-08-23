import User, { IUser } from "../models/User";


class UserService {
    /**
    * @param {IUser} userFields
    * @returns {Promise<any>}
    * @desc - creates a user with user fields provided in the request body
    */
    createUser = async (userFields: IUser): Promise<any> => {
        let user = null;
        // instantiate user model and save
        userFields.password = User.generatePassword(userFields.password);
        user = new User(userFields);
        await user.save();
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

}

export default new UserService();
