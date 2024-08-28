import { afterEach, describe, expect, it, jest } from "@jest/globals";

import * as jwt from 'jsonwebtoken';
import User, { IUser } from "../../models/User";
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

    describe('userExist', () => {
        it('Should return true if user exists', async () => {
            // Arrange
            const existingEmail = "john@doe.com";

            (User.findOne as jest.Mock).mockImplementation((filter: any): Promise<boolean> => {
                return Promise.resolve(filter?.email === existingEmail)
            });

            // Act
            const result = await UserService.userExists(existingEmail);

            // Assertions
            expect(User.findOne).toHaveBeenCalledWith({ email: existingEmail });
            expect(result).toBe(true);
        })

        it('Should return false if user doesn\'t exists', async () => {
            // Arrange
            const existingEmail = "john@doe.com";
            const nonExitentEmail = "alice@smith.com";

            (User.findOne as jest.Mock).mockImplementation((filter: any): Promise<boolean> => {
                return Promise.resolve(filter?.email === existingEmail)
            });

            // Act
            const result = await UserService.userExists(nonExitentEmail);

            // Assertions
            expect(User.findOne).toHaveBeenCalledWith({ email: nonExitentEmail });
            expect(result).toBe(false);
        })
    })

    describe('attemptLogin', () => {
        it('Should return user if email and password match', async () => {
            // Arrange
            const email = 'test@example.com';
            const password = 'password123';
            const user = { 
                email, 
                password: 'hashedPassword123', 
                salt: 'randomSalt' 
            };

            (User.findOne as jest.Mock).mockImplementation((filter: any): Promise<typeof user | null> => {
                if (filter.email === email) return Promise.resolve(user)
                return Promise.resolve(null)
            });

            (User.validatePassword as jest.Mock).mockReturnValue(Boolean(user))

            // Act
            const result = await UserService.attemptLogin(email, password);

            // Assert
            expect(User.findOne).toHaveBeenCalledWith({ email })
            expect(User.validatePassword).toHaveBeenCalled();
            expect(result).toEqual(user);
        })

        it('Should return null if email or password don\'t match', async () => {
            // Arrange
            const email = 'test@example.com';
            const password = 'password123';

            (User.findOne as jest.Mock).mockImplementation((filter: any): Promise<null | undefined> => {
                if (filter.email !== email || filter.password !== password) return Promise.resolve(null);
                return Promise.resolve(undefined);
            });


            // Act
            const result = await UserService.attemptLogin('dummy@email.com', 'dummypassword');

            // Assert
            expect(User.findOne).not.toHaveBeenCalledWith({ email })
            expect(User.validatePassword).toHaveBeenCalledTimes(0);
            expect(result).toBeNull();
        })
    })

    describe('generateToken', () => {
        it('Should generate and return a signed JWT token', () => {
            // Arrange
            const payload = { _id: 'user_id' };
            const expiresIn = "360d";
            const signedToken = "signedtoken";

            (jwt.sign as jest.Mock).mockReturnValue(signedToken);

            // Act
            const result = UserService.generateToken(payload, expiresIn);

            // Assert
            expect(jwt.sign).toHaveBeenCalledWith(payload, expect.any(String), { expiresIn, issuer: expect.any(String) })
            expect(result).toBe(signedToken)
        })
    })
})