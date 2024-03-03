import { BsThreeDotsVertical } from "react-icons/bs";
import { BiSearchAlt2 } from "react-icons/bi";
import { MdCall } from "react-icons/md";
import { IoVideocam } from "react-icons/io5";

import Avatar from "@/components/custom/Avatar";
import Badge from "@/components/custom/Badge";
import Tooltip from "@/components/custom/Tooltip";
import { capitalizeFirstLetter } from "@/helper/capitalizeFirstLetter";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { setMessageSearch } from "@/redux/reducer/MessageReducer";

const ChatHeader = () => {
  const { currentChatUser } = useAppSelector(
    (state: RootState) => state.contactList
  );
  const dispatch = useAppDispatch();

  return (
    <>
      {currentChatUser && (
        <header className="h-[10vh] px-4 py-3 flex-between bg-gray-800 text-white">
          <li className="flex-center gap-6">
            <Avatar src={currentChatUser?.avatar} />
            <div className="flex flex-col">
              <span className="text-gray-200 text-sm">
                {capitalizeFirstLetter(currentChatUser?.username as string)}
              </span>
              <Badge />
            </div>
          </li>
          <li className="flex gap-4">
            <Tooltip text="Voice call">
              <MdCall size={20} className="cursor-pointer" />
            </Tooltip>
            <Tooltip text="Video call">
              <IoVideocam size={20} className="cursor-pointer" />
            </Tooltip>
            <BiSearchAlt2
              title="Search"
              size={20}
              className="cursor-pointer"
              onClick={() => dispatch(setMessageSearch())}
            />
            <BsThreeDotsVertical size={20} className="cursor-pointer" />
          </li>
        </header>
      )}
    </>
  );
};

export default ChatHeader;
