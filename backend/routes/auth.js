import express from "express";
import { loginSchema, registerSchema } from "../libs/validate-schema.js"
import { loginUser, registerUser } from "../controllers/auth-controller.js";

const router = express.Router();

router.post("/register", validateRequest({ body: registerSchema }),
    registerUser
);

router.post("/login", validateRequest({ body: loginSchema }),
    loginUser
);

export default router