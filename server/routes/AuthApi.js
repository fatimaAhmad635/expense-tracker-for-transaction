import { Router } from "express";
import * as AuthController from '../controller/AuthController.js';
const router = Router();

// Create new user and check also is user is already exist or not
router.post("/register",AuthController.register );

// Create jwt token for authenticated user (user is exist or not and password is matched with hashed password or not)
router.post("/login",AuthController.login );
export default router;
