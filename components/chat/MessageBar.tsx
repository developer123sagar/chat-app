import toast from "react-hot-toast";
import { BsEmojiSmile } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";
import { FaMicrophone } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { RootState, useAppSelector } from "@/redux/store";
import { FormEvent, useState } from "react";
import { useSendMessageMutation } from "@/redux/api/MessageApi";
import { useSocket } from "@/provider/SocketProvider";
import { SOCKET_SEND_MESSAGE } from "@/constants";

const MessageBar = () => {
  const [form, seetForm] = useState({
    message: "",
    to: "",
  });
  const { currentChatUser, loginUser } = useAppSelector(
    (state: RootState) => state.contactList
  );
  const { socket } = useSocket();
  const [sendMsg] = useSendMessageMutation();

  const handleMessageSubmit = async (e: FormEvent) => {
    e.preventDefault();
    seetForm({ ...form, message: "" });

    socket.emit(SOCKET_SEND_MESSAGE, {
      senderId: loginUser?._id,
      receiverId: currentChatUser?._id,
      message: form.message,
      messageType: "text",
      messageStatus: "DELIVERED",
      createdAt: new Date().toISOString(),
    });

    if (currentChatUser) {
      const updatedForm = { ...form };
      updatedForm.to = currentChatUser?._id;
      try {
        await sendMsg(updatedForm).unwrap();
        socket.emit("send-msg", {
          to: currentChatUser._id,
          from: loginUser?._id,
          message: form.message,
        });
      } catch (err: any) {
        toast.error(err.error || "Something went wrong");
      }
    }
  };

  return (
    <>
      {currentChatUser && (
        <ul className="h-20 px-4 flex items-center gap-6 relative bg-gray-800">
          <li className="flex gap-6">
            <BsEmojiSmile
              className="text-gray-200 cursor-pointer text-xl"
              title="Emoji"
            />
            <ImAttachment
              className="text-gray-200 cursor-pointer text-xl"
              title="Attach File"
            />
          </li>
          <li className="w-full rounded-lg h-10 flex gap-10 items-center">
            <input
              type="text"
              placeholder="Type a message"
              className="bg-gray-600 text-sm focus:outline-none text-white placeholder:text-white h-10 rounded px-5 py-4 w-full"
              value={form.message}
              onChange={(e) => seetForm({ ...form, message: e.target.value })}
            />
            <div className="flex-center">
              {form.message.length > 0 ? (
                <Button onClick={handleMessageSubmit}>
                  <MdSend
                    className="text-gray-200 cursor-pointer text-xl"
                    title="send message"
                  />
                </Button>
              ) : (
                <Button>
                  <FaMicrophone
                    className="text-gray-200 cursor-pointer text-xl"
                    title="record"
                  />
                </Button>
              )}
            </div>
          </li>
        </ul>
      )}
    </>
  );
};

export default MessageBar;
