import { Router } from "express";
import * as TransactionController from "../controller/TransactionController.js";
const router = Router();

// sending json response to /transaction  when http GET request to given URL
router.get("/", TransactionController.index);

// create transaction using /transaction url
router.post("/", TransactionController.create);

// Delete transaction using /transaction/:id
router.delete("/:id", TransactionController.destroy);

// Update transaction using /transaction/:id
router.patch("/:id", TransactionController.update);
export default router;
