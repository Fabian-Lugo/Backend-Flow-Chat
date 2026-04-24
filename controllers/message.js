const Message = require("../models/message");

const getMessages = async (request, response) => {
  const myId = request.uid;
  const messagesFrom = request.params.sender;
  const messages = await Message.find({
    $or: [
      { sender: myId, receiver: messagesFrom },
      { sender: messagesFrom, receiver: myId },
    ],
  })
    .sort({ createdAt: "desc" })
    .limit(50);

  return response.status(200).json({
    validate: true,
    status: response.statusCode,
    message: "Messages listed successfully",
    myId: myId,
    messagesFrom: messagesFrom,
    messages: messages,
  });
};

module.exports = {
  getMessages,
};
