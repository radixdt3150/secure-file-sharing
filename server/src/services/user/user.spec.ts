import { afterEach, describe, expect, it, jest } from "@jest/globals";

import * as jwt from 'jsonwebtoken';
import User, { IUser, UserSchema } from "../../models/User";
import UserService from "./index";

jest.mock('jsonwebtoken');
jest.mock('../../models/User');

describe('UserService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    })

    describe('createUser', () => {
        it('Should create and return a user', async () => {
            const rawPassword = 'password123';
            const userFields: IUser = { 
                email: 'john@doe.com', 
                password: rawPassword,
                name: 'John Doe',
                salt: ''
            };
            
            const savedUser = { ...userFields, _id: 'userId123' };

            (User.generatePassword as jest.Mock).mockReturnValue({
                salt: 'randomSalt',
                hashedPassword: 'hashedPassword123'
            });
            
            (User.prototype.save as jest.Mock).mockImplementation(() => Promise.resolve(savedUser));

            const user = await UserService.createUser(userFields);
            expect(User.generatePassword).toHaveBeenCalledWith(rawPassword);
            expect(user).toEqual(savedUser);
        })
    })
})