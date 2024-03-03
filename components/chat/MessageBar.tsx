import toast from "react-hot-toast";
import EmojiPicker, {
  Theme,
  EmojiStyle,
  SuggestionMode,
} from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";

import PhotoPicker from "@/components/common/PhotoPicker";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { usePredictMSGMutation } from "@/redux/api/PredictMsgAPI";
import {
  useSendImageMutation,
  useSendMessageMutation,
} from "@/redux/api/MessageApi";
import { useSocket } from "@/provider/SocketProvider";
import { SOCKET_SEND_MESSAGE } from "@/constants";
import { addMessage } from "@/redux/reducer/MessageReducer";
import { Emoji, MsgType, PredictMsg } from "@/types";

const MessageBar = () => {
  // usestate
  const [form, setForm] = useState({
    message: "",
    to: "",
  });
  const [grabPhoto, setGrabPhoto] = useState(false);

  // redux state
  const { currentChatUser, loginUser, onlineUsers } = useAppSelector(
    (state: RootState) => state.contactList
  );
  const dispatch = useAppDispatch();
  const { socket } = useSocket();

  // rtk query api methods
  const [sendMsg] = useSendMessageMutation();
  const [sendImg] = useSendImageMutation();
  const [predictMsg] = usePredictMSGMutation();

  // checking is user online
  const isOnline = onlineUsers?.some(
    (user) => user.userId === currentChatUser?._id
  );

  // creaating msg data to send
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
    const res: PredictMsg = await predictMsg(form.message).unwrap();

    if (res.status === 200) {
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
    } else if (res.status === 401) {
      toast.error("Hate Speech Detected");
    } else {
      toast.error("Offensive Language Detected");
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
        <ul className="h-[10vh] relative px-4 flex items-center gap-6 bg-gray-800">
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
              onClick={() => setGrabPhoto(true)}
            />
          </li>
          <form className="w-full rounded-lg h-10 flex gap-10 items-center">
            <input
              type="text"
              placeholder="Type a message"
              className="bg-gray-600 text-sm focus:outline-none text-white placeholder:text-white h-10 rounded px-5 py-4 w-full"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />

            <Button type="submit" onClick={handleMessageSubmit}>
              <MdSend
                className="text-gray-200 cursor-pointer text-xl"
                title="Send message"
              />
            </Button>
          </form>
        </ul>
      )}
      {grabPhoto && <PhotoPicker onChange={photoPickerChange} />}
    </>
  );
};

export default MessageBar;
