const express = require("express");
const router = express.Router();
const messageService = require("../services/messageService");

//POST CHAT MESSAGE TO DB
router.post("/message", async (request, response) => {
  try {
    const data = await messageService.saveMessage(request);

    return response.status(data.status).json(data.body);
  } catch (err) {
    console.log(err);
    const message = err.message ? err.message : "Error while Saving message";
    const code = err.statusCode ? err.statusCode : 500;
    return response.status(code).json({ message });
  }
});

//GET CHAT MESSAGES.
router.get("/message", async (request, response) => {
  try {
    const data = await messageService.getMessages(request);
    return response.status(data.status).json(data.body);
  } catch (err) {
    console.log(err);
    const message = err.message ? err.message : "Error while getting messages";
    const code = err.statusCode ? err.statusCode : 500;
    return response.status(code).json({ message });
  }
});

//get Chats
router.get("/chat", async (request, response) => {
  try {
    const data = await messageService.getChats(request);
    return response.status(data.status).json(data.body);
  } catch (err) {
    console.log(err);
    const message = err.message ? err.message : "Error while getting messages";
    const code = err.statusCode ? err.statusCode : 500;
    return response.status(code).json({ message });
  }
});

//GET CHAT MESSAGES.
router.get("/chatmessages", async (request, response) => {
  try {
    const data = await messageService.getMessages(request);
    return response.status(data.status).json(data.body);
  } catch (err) {
    console.log(err);
    const message = err.message ? err.message : "Error while getting messages";
    const code = err.statusCode ? err.statusCode : 500;
    return response.status(code).json({ message });
  }
});

module.exports = router;
