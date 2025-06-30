import express from "express";
import authMiddleware from "../middleware/auth-middleware";
import { validateRequest } from "zod-express-middleware";
import { projectSchema } from "../libs/validate-schema";
import { createProject } from "../controllers/project";

const router = express.Router();

router.post("/:workspaceId/create-project", authMiddleware,
    validateRequest({
            params: z.object({
                workspaceId: z.string(),
            }),
            body: projectSchema,
    }),
    createProject
);

export default router;