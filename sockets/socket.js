const { io } = require("../index");
const { verifyToken } = require("../helpers/token");
const {
  userConnected,
  userDisconnected,
  saveMessage,
} = require("../controllers/socket");
console.log("[Socket.IO] Motor de tiempo real listo");

io.on("connection", (client) => {
  console.log("[Socket.IO] Usuario conectado");

  const [isValid, uid] = verifyToken(client.handshake.headers["x-token"]);
  if (!isValid) {
    return client.disconnect();
  }

  userConnected(uid);

  client.join(uid);
  client.on("message", async (payload) => {
    const toSave = {
      sender: uid,
      receiver: payload.receiver,
      message: payload.message ?? payload.text,
    };
    await saveMessage(toSave);
    io.to(payload.receiver).emit("message", payload);
  });

  client.on("disconnect", () => {
    console.log("[Socket.IO] Usuario desconectado");
    userDisconnected(uid);
  });
});
