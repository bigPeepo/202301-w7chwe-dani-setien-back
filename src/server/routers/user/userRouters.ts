import { Router } from "express";
import { upload } from "..";
import { signinUser } from "../../controllers/userControllers.js";

const usersRouter = Router();

usersRouter.post("/signin", upload.single("image"), signinUser);

export default usersRouter;
