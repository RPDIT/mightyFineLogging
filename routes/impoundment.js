import express from "express";
import impoundmentController from "../controllers/impoundmentController.js";
const router = express.Router();

router.get("/:id", impoundmentController.getUserImpoundment);
router.get("/creation/:id", impoundmentController.createImpoundment);
router.post("/transaction/:id", impoundmentController.newTransaction);
router.get("/transaction/:id", impoundmentController.getTransactions);
// router.get("/transaction", impoundmentController.allTransactions);


export default router; 