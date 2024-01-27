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

import PhotoPicker from "@/components/common/PhotoPicker";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import {
  useSendImageMutation,
  useSendMessageMutation,
} from "@/redux/api/MessageApi";
import { useSocket } from "@/provider/SocketProvider";
import { SOCKET_SEND_MESSAGE } from "@/constants";
import { addMessage } from "@/redux/reducer/MessageReducer";
import { MsgType } from "@/types";

type Emoji = {
  emoji: any;
};

const MessageBar = () => {
  const [form, setForm] = useState({
    message: "",
    to: "",
  });
  const [grabPhoto, setGrabPhoto] = useState(false);
  const photoPicker = useRef(null);

  const { currentChatUser, loginUser, onlineUsers } = useAppSelector(
    (state: RootState) => state.contactList
  );
  const dispatch = useAppDispatch();
  const { socket } = useSocket();

  const [sendMsg] = useSendMessageMutation();
  const [sendImg] = useSendImageMutation();

  const isOnline = onlineUsers?.some(
    (user) => user.userId === currentChatUser?._id
  );

  const createMessageData = (message: string, messageType: MsgType): any => {
    return {
      senderId: loginUser?._id!,
      receiverId: currentChatUser?._id!,
      message,
      messageType,
      messageStatus: isOnline ? "SEEN" : "SENT",
      createdAt: new Date().toISOString(),
    };
  };

  const handleMessageSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setForm({ ...form, message: "" });

    const msgData = createMessageData(form.message, "text");

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

  useEffect(() => {
    if (grabPhoto) {
      const data = document.getElementById("photo-picker");
      if (data) {
        data.click();
        document.body.onfocus = () => {
          setTimeout(() => {
            setGrabPhoto(false);
          }, 1000);
        };
      }
    }
  }, [grabPhoto]);

  const photoPickerChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    if (e.target.files) {
      let imageUrl = URL.createObjectURL(e.target.files[0]);
      formData.append("image", e.target.files[0] as File);
      formData.append("receiver", currentChatUser?._id as string);

      if (!isOnline) {
        const imgMsgData = createMessageData(imageUrl, "image");
        dispatch(addMessage(imgMsgData));
      }

      try {
        const res = await sendImg(formData).unwrap();
        if (res.message) {
          const socketImgData = createMessageData(res.message, "image");
          socket.emit(SOCKET_SEND_MESSAGE, socketImgData);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      {currentChatUser && (
        <ul className="h-20 relative px-4 flex items-center gap-6 bg-gray-800">
          <li className="flex gap-6 z-[9999] bg-opacity-95 opacity-95">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <BsEmojiSmile
                  title="Emoji"
                  className="text-gray-200 cursor-pointer text-xl"
                />
              </DropdownMenuTrigger>

              <DropdownMenuContent className="relative left-[9.5rem] bottom-8">
                <EmojiPicker
                  theme={Theme.DARK}
                  emojiStyle={EmojiStyle.FACEBOOK}
                  suggestedEmojisMode={SuggestionMode.FREQUENT}
                  onEmojiClick={handleEmojiClick}
                />
              </DropdownMenuContent>
            </DropdownMenu>

            <ImAttachment
              className="text-gray-200 cursor-pointer text-xl"
              title="Attach File"
              ref={photoPicker}
              onClick={() => setGrabPhoto(true)}
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
                    title="Send message"
                  />
                </Button>
              ) : (
                <Button>
                  <FaMicrophone
                    className="text-gray-200 cursor-pointer text-xl"
                    title="Record"
                  />
                </Button>
              )}
            </div>
          </li>
        </ul>
      )}
      {grabPhoto && <PhotoPicker onChange={photoPickerChange} />}
    </>
  );
};

export default MessageBar;
