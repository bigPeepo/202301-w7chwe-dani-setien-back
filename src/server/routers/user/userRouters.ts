import { Router } from "express";

import { loginUser, signupUser } from "../../controllers/userControllers.js";
import { upload } from "../index.js";

const usersRouter = Router();

usersRouter.post("/signup", upload.single("image"), signupUser);
usersRouter.post("/login", loginUser);

export default usersRouter;
