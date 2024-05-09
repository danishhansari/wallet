import { Router } from "express";
import {
  registerUser,
  loginUser,
  editProfile,
  searchUserProfile,
} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middleware/index.middleware.js";

const router = Router();

router.post("/signup", registerUser);
router.post("/signin", loginUser);
router.patch("/edit-profile", verifyJWT, editProfile);
router.get("/:q", verifyJWT, searchUserProfile);

export default router;
