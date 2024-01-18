import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";

import { NextApiResponseServerIo, OnlineUsers } from "@/types";
import { SOCKET_ADD_USER, SOCKET_GET_USER } from "@/constants/APIRoute";

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
      addTrailingSlash: false,
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