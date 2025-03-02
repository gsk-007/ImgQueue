import { Router } from "express";
import { upload } from "./handlers/upload";
import { checkStatus } from "./handlers/status";

const router = Router();

router.post("/upload", upload);
router.get("/status/:requestId", checkStatus);

export default router;
