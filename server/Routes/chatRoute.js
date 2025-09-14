const express = require("express");
const { createChat, findUserChat, findChat } = require("../Controller/chatController");
const verifyToken = require("../Middleware/authMiddleware");

const router = express.Router();

router.post("/", verifyToken, createChat);
router.get("/:userId", verifyToken, findUserChat);
router.get("/find/:firstId/:secondId", verifyToken, findChat );

module.exports = router;