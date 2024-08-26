// Express Router
import type { Router } from 'express';

// Component routes
import userRoutes from './user';
import fileRoutes from "./file";

export function assembleRoutes (router: Router) {
    userRoutes(router);
    fileRoutes(router);
};