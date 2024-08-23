// Express Router
import type { Router } from 'express';

import userController from "../controllers/user";
import { userRegisterSchema } from '../validation/schema';

export default function (router: Router) {
    // public routes
    router.get('/user/register', userRegisterSchema, userController.register);
    // router.post('/user/login', userLoginSchema, userController.login);
};
