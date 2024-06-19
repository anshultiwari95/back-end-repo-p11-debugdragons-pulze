import express, { Router } from "express";

import { updateRecipientStatus } from "../../controllers/gettingResponse/updateRecipientStatusController";

const router: Router = express.Router();

router.post("/updateRecipientStatus", updateRecipientStatus);

export default router;
