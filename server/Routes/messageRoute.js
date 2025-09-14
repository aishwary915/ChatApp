const express = require("express");
const { createMessage, getMessages } = require("../Controller/messageController");
const verifyToken = require("../Middleware/authMiddleware");

const router = express.Router();

router.post("/", verifyToken, createMessage);
router.get("/:chatId", verifyToken, getMessages);

module.exports = router;