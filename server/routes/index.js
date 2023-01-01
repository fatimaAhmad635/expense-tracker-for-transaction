import TransactionsApi from './TransactionApi.js'
import AuthApi from './AuthApi.js'
import UserApi from './UserApi.js'
import CategoryApi from './CategoryApi.js'
import passport from "passport";
import { Router } from "express";
const router = Router();
const auth=passport.authenticate("jwt", { session: false });
// '/transaction' is the base Url
router.use("/transaction",auth, TransactionsApi);
router.use("/auth", AuthApi);
router.use("/user", UserApi);
router.use("/category",auth,CategoryApi)
export default router