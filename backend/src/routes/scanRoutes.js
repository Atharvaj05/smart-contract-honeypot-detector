import express from "express";

import { scanContract }
from "../controllers/scanController.js";

const router = express.Router();

router.post(
  "/scan",
  scanContract
);

export default router;