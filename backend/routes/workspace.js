import { validateRequest } from "zod-express-middleware";
import { workspaceSchema } from "../libs/validate-schema";
import authMiddleware from "../middleware/auth-middleware";

const router = express.Router();

router.post("/", authMiddleware, validateRequest({ body: workspaceSchema }),
    createWorkspace
);