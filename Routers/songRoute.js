import express from "express"
import { getAudioLinks } from "../Controller/songController.js";

const router = express.Router();

//Route to handle upload audio
router.get('/upload-audio',getAudioLinks)

export default router;