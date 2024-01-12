import { RootState, useAppSelector } from "@/redux/store";
import { useGetMessagesQuery } from "@/redux/api/MessageApi";
import Spinner from "../Spinner";
import Image from "next/image";
import { calculateTime } from "@/helper/CalculateTime";

const ChatContainer = () => {
  const { currentChatUser, MainPageSkipMsg } = useAppSelector(
    (state: RootState) => state.contactList
  );

  const {
    data: messages,
    isLoading,
    isSuccess,
  } = useGetMessagesQuery(currentChatUser?._id, {
    skip: MainPageSkipMsg,
  });

  return (
    <div className="h-[80vh] z-50 py-1 px-1 w-full relative flex-grow overflow-auto custom-scrollbar">
      <Image
        src={"/imgs/chatBg.jpeg"}
        alt="jiffychat"
        width={1000}
        height={100}
        priority
        className="w-full h-full z-0 object-cover opacity-5 absolute top-0 left-0"
      />
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
                  <h1
                    className={`px-2 text py-2.5 text-sm flex gap-2 items-end max-w-[55%] rounded-lg ${
                      msg.senderId === currentChatUser?._id
                        ? "bg-gray-950"
                        : "bg-[#0695FF]"
                    }`}
                  >
                    <p className="text-white break-all">{msg.message}</p>
                    <div className="flex gap-1 items-end">
                      <span
                        className={`text-xs ${
                          msg.senderId === currentChatUser?._id
                            ? "text-gray-500"
                            : "text-slate-300"
                        } text-sm pt-1 min-w-fit`}
                      >
                        {calculateTime(msg.createdAt)}
                      </span>
                    </div>
                  </h1>
                )}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatContainer;
