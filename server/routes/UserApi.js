import { Router } from "express";
import passport from "passport";
import * as UserController from '../controller/UserController.js'
const router = Router();

// Overall, this code is setting up a route that will require a valid JSON Web Token 
// to be included in the request in order to access the endpoint and receive a 
// response from the server. The UserController.index
router.get("/", passport.authenticate("jwt", { session: false }), UserController.index);
export default router;
