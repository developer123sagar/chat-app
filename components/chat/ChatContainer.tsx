"use client";

import toast from "react-hot-toast";
import { useEffect, useRef } from "react";

import ImageMessage from "@/components/chat/ImageMessage";
import MessageStatusComp from "@/components/chat/MessageStatusComp";
import Spinner from "@/components/Spinner";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { useGetMessagesQuery } from "@/redux/api/MessageApi";
import { calculateTime } from "@/helper/CalculateTime";
import { addMessage, setMessage } from "@/redux/reducer/MessageReducer";
import { useSocket } from "@/provider/SocketProvider";
import { SOCKET_GET_MESSAGE } from "@/constants";
import { MessageType } from "@/types";
import { useChatScroll } from "@/hooks/use-chat-scroll";

const ChatContainer = () => {
  const chatRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { currentChatUser } = useAppSelector(
    (state: RootState) => state.contactList
  );
  const { messages } = useAppSelector((state: RootState) => state.messages);
  const { socket } = useSocket();

  const {
    data: msg,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMessagesQuery(currentChatUser?._id);

  const dispatch = useAppDispatch();

  if (isError) {
    if ("status" in error) {
      let errMsg: any = "error" in error ? error.error : error.data;
      if (error.status === 401) {
        toast.error(errMsg.message);
        window.location.reload();
      }
    } else {
      toast.error("something went wrong");
    }
  }

  useEffect(() => {
    socket.on(SOCKET_GET_MESSAGE, (data: MessageType) => {
      dispatch(addMessage(data));
    });
  }, [socket, dispatch]);

  useEffect(() => {
    dispatch(setMessage(msg));
  }, [dispatch, msg]);

  useChatScroll({
    chatRef,
    bottomRef,
    shouldLoadMore: false,
    loadMore: () => {},
    count: messages && messages?.length,
  });

  return (
    <div className="h-[80vh] py-3 px-4 w-full flex-grow overflow-auto custom-scrollbar relative">
      <div className="flex w-full">
        <div
          className="flex flex-col justify-end w-full gap-1 overflow-auto z-0"
          ref={chatRef}
        >
          {isLoading && <Spinner btn />}
          {isSuccess &&
            messages &&
            messages?.map((msg, id) => (
              <div
                key={msg._id || id}
                className={`flex ${
                  msg.senderId === currentChatUser?._id
                    ? "justify-start"
                    : "justify-end"
                } `}
              >
                {msg.messageType === "text" && (
                  <div
                    className={`px-3 text py-2.5 text-sm flex gap-2 items-end max-w-[55%] rounded-full ${
                      msg.senderId === currentChatUser?._id
                        ? "bg-[#78a45e]"
                        : "bg-[#4890d8]"
                    }`}
                  >
                    <p className="text-white break-all text-[16px]">
                      {msg.message}
                    </p>
                    <div className="flex gap-1 items-end ">
                      <span
                        className={`text-[11px] text-gray-300 pt-1 min-w-fit`}
                      >
                        {calculateTime(msg.createdAt)}
                      </span>
                      <span>
                        {msg.receiverId === currentChatUser?._id && (
                          <MessageStatusComp msgStatus={msg.messageStatus} />
                        )}
                      </span>
                    </div>
                  </div>
                )}
                {msg.messageType === "image" && <ImageMessage message={msg} />}
              </div>
            ))}
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
