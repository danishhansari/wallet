import { Router } from "express";
import {
  registerUser,
  loginUser,
  editProfile,
  searchUserProfile,
  getCurrentUser,
} from "../controllers/user.controllers";
import { verifyJWT } from "../middleware/index.middleware";

const router = Router();

router.post("/signup", registerUser);
router.post("/signin", loginUser);
router.post("/current-user", verifyJWT, getCurrentUser);
router.patch("/edit-profile", verifyJWT, editProfile);
router.post("/", searchUserProfile);

export default router;
