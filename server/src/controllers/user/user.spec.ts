import { describe, jest, it, afterEach, expect, beforeEach } from "@jest/globals";
import request from "supertest";
import { expressApp } from "../../app";

import UserService from "../../services/user"

import { STATUS_CODE, STATUS } from "../../utils/Constants";

// Mock modules
jest.mock("../../services/user");

describe('UserController E2E tests', () => {
    beforeEach(async () => {
        // await dbHandler.connect();
    })

    afterEach(async () => {
        jest.clearAllMocks();
        // await dbHandler.disconnect();
    })

    describe('POST /api/user/register', () => {
        it('Should return 200 and create a user when data is valid' , async () => {
            // Arrange
            const mockCreatedUser = { _id: 'userId123', email: 'test@example.com' };
            const reqPayload = {
                name: 'John Doe',
                email: "john@doe.com",
                password: "password123#"
            };
    
            (UserService.createUser as jest.Mock) = jest.fn<() => Promise<typeof mockCreatedUser>>()
                .mockResolvedValue(mockCreatedUser);
            (UserService.userExists as jest.Mock) = jest.fn<() => Promise<boolean>>()
                .mockResolvedValue(false);
    
            // Act
            const response = await request(expressApp)
                .post('/api/user/register')
                .send(reqPayload);
                
            // Assert
            expect(response.status).toBe(STATUS_CODE.OK);
            expect(response.body.status).toBe(STATUS.SUCCESS);
            expect(response.body.data).toEqual(mockCreatedUser);
        });

        it('Should perform validation and return errors if any', async () => {
            // Arrange
            const reqPayload = {
                // name: 'John Doe',
                email: "john@doe.com",
                password: "password123#"
            };

            // Act
            const response = await request(expressApp)
                .post('/api/user/register')
                .send(reqPayload);
            
            // Assert
            expect(response.status).toBe(STATUS_CODE.CLIENT_ERROR);
            expect(response.body.status).toBe(STATUS.ERROR);
            expect(response.body.data[0].name).toMatch(/name is required/i);
        });

        it('Should not create if a user already exists', async () => {
            // Arrange
            const reqPayload = {
                name: 'John Doe',
                email: "john@doe.com",
                password: "password123#"
            };

            (UserService.userExists as jest.Mock) = jest.fn<() => Promise<boolean>>()
                .mockResolvedValue(true);

            // Act
            const response = await request(expressApp)
                .post('/api/user/register')
                .send(reqPayload);
            
            // Assert
            expect(response.status).toBe(STATUS_CODE.CLIENT_ERROR);
            expect(response.body.status).toBe(STATUS.ERROR);
            expect(response.body.data).toMatch(/user already exists/i);
        })
    });

    describe('POST /api/user/login', () => {

        it('Should return with client error when request validation fails', async () => {
            // Arrange 
            const reqPayload = { email: "john@doe.com", password: "" };

            // Act
            const response = await request(expressApp)
                .post('/api/user/login')
                .send(reqPayload);
            
            // Assert
            expect(response.status).toBe(STATUS_CODE.CLIENT_ERROR);
            expect(response.body.data[0].password).toMatch(/password is required/i)
        });

        it('Should be unauthenticated(401) when credentials are incorrect', async () => {
            // Arrange
            const incorrectCreds = { email: "john@doe.com", password: "password123" };

            (UserService.attemptLogin as jest.Mock) = jest.fn<() => Promise<any>>().mockResolvedValue(null);

            // Act
            const response = await request(expressApp)
                .post('/api/user/login')
                .send(incorrectCreds);

            // Assert
            expect(response.status).toBe(401);
            expect(response.body.data).toMatch(/invalid credentials/i);
        });

        it('Should return with a success response when credentials are correct', async () => {
            // Arrange
            const correctCreds = { email: "john@doe.com", password: "password123" };
            const loggedInUser = { _id: 'user_id', name: 'John Doe', email: 'john@doe.com' };
            const signedToken = "signedToken";

            (UserService.attemptLogin as jest.Mock) = jest.fn<() => Promise<typeof loggedInUser>>()
                .mockResolvedValue(loggedInUser);
            (UserService.generateToken as jest.Mock).mockReturnValue(signedToken);

            // Act
            const response = await request(expressApp)
                .post('/api/user/login')
                .send(correctCreds);

            // Assert
            expect(response.status).toBe(STATUS_CODE.OK);
            expect(response.body.data).toEqual(loggedInUser);
        })
    })
})