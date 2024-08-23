// Express Router
import type { Router } from 'express';

import userController from "../controllers/user";

export default function (router: Router) {
    // public routes
    router.get('/user/register', userController.register);
    // router.post('/user/login', userLoginSchema, userController.login);
};
