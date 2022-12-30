import TransactionsApi from './TransactionApi.js'
import AuthApi from './AuthApi.js'
import UserApi from './UserApi.js'

import { Router } from "express";
const router = Router();

// '/transaction' is the base Url
router.use("/transaction", TransactionsApi);
router.use("/auth", AuthApi);
router.use("/user", UserApi);

export default router