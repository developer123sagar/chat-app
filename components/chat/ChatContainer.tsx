import { RootState, useAppSelector } from "@/redux/store";
import { useGetMessagesQuery } from "@/redux/api/MessageApi";
import Spinner from "../Spinner";
import { calculateTime } from "@/helper/CalculateTime";
import MessageStatusComp from "./MessageStatusComp";

const ChatContainer = () => {
  const { currentChatUser } = useAppSelector(
    (state: RootState) => state.contactList
  );

  const {
    data: messages,
    isLoading,
    isSuccess,
  } = useGetMessagesQuery(currentChatUser?._id);

  return (
    <div className="h-[80vh] z-50 py-3 px-4 w-full relative flex-grow overflow-auto custom-scrollbar">
      {/* <Image
        src={"/imgs/chatBg.jpeg"}
        alt="jiffychat"
        width={1000}
        height={100}
        priority
        className="w-full h-full z-0 object-cover opacity-5 absolute top-0 left-0"
      /> */}
      <div className="flex w-full">
        <ul className="flex flex-col justify-end w-full gap-1 overflow-auto">
          {isLoading && <Spinner btn />}
          {isSuccess &&
            messages.map((msg) => (
              <li
                key={msg._id}
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
                    <p className="text-white break-all">{msg.message}</p>
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
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatContainer;
