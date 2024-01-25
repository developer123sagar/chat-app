import toast from "react-hot-toast";
import EmojiPicker, {
  Theme,
  EmojiStyle,
  SuggestionMode,
} from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";
import { FaMicrophone } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { FormEvent, useState } from "react";
import { useSendMessageMutation } from "@/redux/api/MessageApi";
import { useSocket } from "@/provider/SocketProvider";
import { SOCKET_SEND_MESSAGE } from "@/constants";
import { addMessage } from "@/redux/reducer/MessageReducer";
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

type Emoji = {
  emoji: any;
};

const MessageBar = () => {
  const [form, setForm] = useState({
    message: "",
    to: "",
  });
  const { currentChatUser, loginUser, onlineUsers } = useAppSelector(
    (state: RootState) => state.contactList
  );

  const dispatch = useAppDispatch();
  const { socket } = useSocket();
  const [sendMsg] = useSendMessageMutation();

  const isOnline = onlineUsers?.some(
    (user) => user.userId === currentChatUser?._id
  );

  const handleMessageSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setForm({ ...form, message: "" });

    const msgData = {
      senderId: loginUser?._id,
      receiverId: currentChatUser?._id,
      message: form.message,
      messageType: "text",
      messageStatus: isOnline ? "SEEN" : "SENT",
      createdAt: new Date().toISOString(),
    };

    socket.emit(SOCKET_SEND_MESSAGE, msgData);
    if (!isOnline) {
      dispatch(addMessage(msgData));
    }

    if (currentChatUser) {
      const updatedForm = { ...form };
      updatedForm.to = currentChatUser?._id;
      try {
        await sendMsg(updatedForm).unwrap();
      } catch (err: any) {
        toast.error(err.error || "Something went wrong");
      }
    }
  };

  const handleEmojiClick = (emoji: Emoji) => {
    setForm((prev) => ({ ...prev, message: (prev.message += emoji.emoji) }));
  };

  return (
    <>
      {currentChatUser && (
        <ul className="h-20 px-4 flex items-center gap-6 bg-gray-800">
          <li className="flex gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <BsEmojiSmile className="text-gray-200 cursor-pointer text-xl" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <EmojiPicker
                  theme={Theme.DARK}
                  emojiStyle={EmojiStyle.FACEBOOK}
                  suggestedEmojisMode={SuggestionMode.FREQUENT}
                  onEmojiClick={handleEmojiClick}
                  className="z-50 relative left-40 bottom-8"
                />
              </DropdownMenuContent>
            </DropdownMenu>

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
              onChange={(e) => setForm({ ...form, message: e.target.value })}
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
