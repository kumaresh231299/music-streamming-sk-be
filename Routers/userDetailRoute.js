import express from "express";
import { createPlay, getPlaylist, getPlaylistById, getUser, updateUser } from "../Controller/userDetailController.js";

const router = express.Router();

router.get("/user-details/:id", getUser)
router.put("/user-details/:id", updateUser)
router.post("/user-details/createPlaylist/:userId", createPlay)
router.get("/user-details/getPlaylist/:id", getPlaylist)
router.get('/playlist/:id', getPlaylistById); // Use playlist ID in the route


export default router;