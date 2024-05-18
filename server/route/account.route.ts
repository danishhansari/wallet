import { Router } from "express";
import {
  getAccountBalance,
  transferMoney,
  getTransactionHistory,
} from "../controllers/account.controller";
import { verifyJWT } from "../middleware/index.middleware";

const router = Router();

router.post("/balance", verifyJWT, getAccountBalance);
router.post("/transfer", verifyJWT, transferMoney);
router.get("/transaction-history", verifyJWT, getTransactionHistory);

export default router;
