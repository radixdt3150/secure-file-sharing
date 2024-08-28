// Express Router
import type { Router } from 'express';

import userController from "../../controllers/user";
import { userRegisterSchema, userLoginSchema } from '../../validation/schema';
import { verifyToken } from '../../middleware/verifyToken';

export default function (router: Router) {
    // public routes
    router.post('/user/register', userRegisterSchema, userController.register);
    router.post('/user/login', userLoginSchema, userController.login);

    // private
    router.get('/user/private', verifyToken, (req, res) => { res.json(req?.body.decoded) });
};
