import { Router } from "express";
import passport from "passport";
import * as CategoryController from '../controller/CategoryController.js'
const router = Router();
router.patch("/:id",CategoryController.update)
router.post("/",CategoryController.create)
router.delete("/:id",CategoryController.destory);
export default router;
