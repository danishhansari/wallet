import { Router } from "express";
import {
  getAccountBalance,
  transferMoney,
  getTransactionHistory,
} from "../controllers/account.controller.js";
import { verifyJWT } from "../middleware/index.middleware.js";

const router = Router();

router.post("/balance", verifyJWT, getAccountBalance);
router.post("/transfer", verifyJWT, transferMoney);
router.get("/transaction-history", verifyJWT, getTransactionHistory);

export default router;
