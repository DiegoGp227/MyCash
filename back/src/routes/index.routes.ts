import { Router } from "express";
import dbCheck from "../controllers/test/test.js";

export const router: Router = Router();

// Test routes
router.get("/db", dbCheck);

//Auth routes
router.post("/signup", signpContoller);
