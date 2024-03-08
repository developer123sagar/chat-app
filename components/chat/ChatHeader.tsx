import { BsThreeDotsVertical } from "react-icons/bs";
import { BiSearchAlt2 } from "react-icons/bi";

import Avatar from "@/components/custom/Avatar";
import Badge from "@/components/custom/Badge";
import Tooltip from "@/components/custom/Tooltip";
import { capitalizeFirstLetter } from "@/helper/capitalizeFirstLetter";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import {
  setCurrentUserProfileView,
  setMessageSearch,
} from "@/redux/reducer/MessageReducer";

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
            <Tooltip text={currentChatUser?.username}>
              <Avatar src={currentChatUser?.avatar} />
            </Tooltip>
            <div className="flex flex-col">
              <span className="text-gray-200 text-sm">
                {capitalizeFirstLetter(
                  `${currentChatUser?.displayName || currentChatUser?.username}`
                )}
              </span>
              <Badge />
            </div>
          </li>
          <li className="flex gap-5">
            <BiSearchAlt2
              title="Search"
              size={20}
              className="cursor-pointer"
              onClick={() => {
                dispatch(setCurrentUserProfileView(false));
                dispatch(setMessageSearch(true));
              }}
            />
            <BsThreeDotsVertical
              onClick={() => {
                dispatch(setMessageSearch(false));
                dispatch(setCurrentUserProfileView(true));
              }}
              size={20}
              title="Contact info"
              className="cursor-pointer"
            />
          </li>
        </header>
      )}
    </>
  );
};

export default ChatHeader;
