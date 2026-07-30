import express from "express";
import { addToWatchList } from "../controllers/watchListController.js"; 
import { removeFromWatchlist } from "../controllers/watchListController.js";
import { updateInWatchList } from "../controllers/watchListController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { addToWatchListSchema } from "../validators/watchListValidators.js";
const router = express.Router();

router.use(authMiddleware);

router.post("/", validateRequest(addToWatchListSchema),addToWatchList);
router.delete("/:id",removeFromWatchlist);
router.put("/:id",updateInWatchList);
export default router;