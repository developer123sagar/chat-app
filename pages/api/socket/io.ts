import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";

import { NextApiResponseServerIo, OnlineUsers } from "@/types";
import { SOCKET_ADD_USER, SOCKET_GET_MESSAGE, SOCKET_GET_USER, SOCKET_SEND_MESSAGE } from "@/constants";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: path,
    });

    let onlineUsers: OnlineUsers[] = []

    io.on("connection", (socket) => {

      socket.on(SOCKET_ADD_USER, userId => {
        const isUserExist = onlineUsers.find(user => user.userId === userId)
        if (!isUserExist) {
          const user = { userId, socketId: socket.id }
          onlineUsers.push(user)
          io.emit(SOCKET_GET_USER, onlineUsers)
        }
      })

      socket.on(SOCKET_SEND_MESSAGE, async({ senderId, receiverId, message, messageType, createdAt, messageStatus }) => {
        const receiver = onlineUsers.find(user => user.userId === receiverId)
        const sender = onlineUsers.find(user => user.userId === senderId)

        if (receiver) {
          io.to(receiver.socketId).to(sender?.socketId!).emit(SOCKET_GET_MESSAGE, {
            senderId,
            receiverId,
            message,
            messageType,
            createdAt,
            messageStatus,
          })
        }
      })

      socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id)
        io.emit(SOCKET_GET_USER, onlineUsers)
      })
    });


    res.socket.server.io = io;
  }
  res.end();
}

export default ioHandler;