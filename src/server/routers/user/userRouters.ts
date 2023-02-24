import { Router } from "express";

import { signupUser } from "../../controllers/userControllers.js";
import { upload } from "../index.js";

const usersRouter = Router();

usersRouter.post("/signup", upload.single("image"), signupUser);

export default usersRouter;
