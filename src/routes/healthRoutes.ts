import express, { Router } from "express";
import { healthApi } from "../controllers/healthController";

const router: Router = express.Router();
router.get("/health", healthApi);

export default router;