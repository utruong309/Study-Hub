import express from "express";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote
} from "../controllers/noteController.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(verifyToken); //all routes below require authentication, run before route handler 

router.get("/", getNotes);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;