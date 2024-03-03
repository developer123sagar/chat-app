import { BiSearchAlt2 } from "react-icons/bi";
import { useEffect, useState } from "react";
import { VscClose } from "react-icons/vsc";

import { calculateTime } from "@/helper/CalculateTime";
import { capitalizeFirstLetter } from "@/helper/capitalizeFirstLetter";
import { MessageType } from "@/types";
import { useAppDispatch, useAppSelector, RootState } from "@/redux/store";
import { setMessageSearch } from "@/redux/reducer/MessageReducer";

const SearchMessages = () => {
  const { currentChatUser } = useAppSelector(
    (state: RootState) => state.contactList
  );
  const { messages } = useAppSelector((state: RootState) => state.messages);
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState("");
  const [searchedMessages, setSearchedMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    if (searchText) {
      setSearchedMessages(
        messages?.filter(
          (msg) =>
            msg.messageType === "text" && msg.message.includes(searchText)
        )
      );
    } else {
      setSearchedMessages([]);
    }
  }, [searchText]);

  return (
    <div className="border-gray-400 border-l w-full bg-slate-700 flex flex-col z-10 h-screen">
      <div className="bg-gray-800 px-4 py-3 flex gap-10 items-center h-[10vh]">
        <VscClose
          className="cursor-pointer text-gray-200"
          title="Close"
          size={30}
          color="white"
          onClick={() => dispatch(setMessageSearch())}
        />
        <span className="text-white">Search Messages</span>
      </div>
      <div className="overflow-auto custom-scrollbar h-full w-full">
        <div className="w-full flex-col-center">
          <div className="flex px-5 items-center gap-3 h-14 w-full">
            <div className="flex items-center gap-3 w-full">
              <div className="bg-gray-900 flex items-center gap-5 px-3 py-1 rounded flex-grow w-full">
                <BiSearchAlt2 className="text-gray-200 cursor-pointer text-lg" />
                <input
                  type="text"
                  placeholder="Search chat..."
                  className="bg-transparent text-sm w-full py-2 focus:outline-none text-white"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
            </div>
          </div>
          <span className="text-gray-200">
            {!searchText.length &&
              currentChatUser?.username &&
              `Search for messages with ${capitalizeFirstLetter(
                currentChatUser.username
              )}`}
          </span>
        </div>
        <div>
          {searchText.length > 0 && !searchedMessages.length && (
            <span className="text-gray-200 w-full flex justify-center">
              No messages found
            </span>
          )}
          <div className="flex flex-col w-full h-full">
            {searchedMessages?.map((msg, id) => (
              <div
                key={id}
                className="flex flex-col justify-center cursor-pointer hover:bg-gray-800 w-full p-5 border-b-[0.2px] border-gray-200"
              >
                <span
                  className="text-sm
                   text-gray-200"
                >
                  {calculateTime(msg.createdAt)}
                </span>
                <span className="text-teal-500">{msg.message}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchMessages;
