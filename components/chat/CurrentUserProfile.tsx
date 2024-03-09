import Image from "next/image";
import { VscClose } from "react-icons/vsc";
import { FaTrashCan } from "react-icons/fa6";

import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { setCurrentUserProfileView } from "@/redux/reducer/MessageReducer";
import { capitalizeFirstLetter } from "@/helper/capitalizeFirstLetter";
import { formatDate } from "@/helper/FormatDate";

const CurrentUserProfile = () => {
  const dispatch = useAppDispatch();
  const { currentChatUser } = useAppSelector(
    (state: RootState) => state.contactList
  );

  return (
    <div className="border-gray-400 border-l w-full bg-slate-900 flex flex-col z-10 h-screen">
      <div className="bg-gray-800 px-4 py-3 flex gap-10 items-center h-[10vh] mb-1">
        <VscClose
          className="cursor-pointer text-gray-200"
          title="Close"
          size={30}
          color="white"
          onClick={() => dispatch(setCurrentUserProfileView(false))}
        />
        <span className="text-white">Contact Info</span>
      </div>
      <div className="overflow-auto custom-scrollbar h-full w-full">
        <div className="bg-gray-800 py-5">
          <Image
            src={currentChatUser?.avatar as string}
            alt={currentChatUser?.username as string}
            width={210}
            height={210}
            priority
            className="rounded-full p-1 mx-auto w-[200px] h-[200px]"
          />
          <h1 className="mx-auto w-fit text-white text-lg">
            {capitalizeFirstLetter(currentChatUser?.username as string)}
          </h1>
          {currentChatUser?.displayName && (
            <h2 className="text-base text-gray-400 w-fit mx-auto">
              {currentChatUser?.displayName}
            </h2>
          )}
        </div>
        <div className="bg-gray-800 py-3 my-1 px-4">
          <h3 className="text-gray-400">About</h3>
          <p className="text-sky-400">{currentChatUser?.about}</p>
        </div>
        <div className="bg-gray-800 py-3 my-1 px-4">
          <h3 className="text-gray-400 text-base font-extrabold tracking-tighter">
            Jiffychat member since
          </h3>
          <p className="text-sky-400 text-xs">
            {formatDate(currentChatUser?.createdAt as Date)}
          </p>
        </div>

        <div className="bg-gray-800 py-4 my-1 px-4 flex gap-2 items-center cursor-pointer hover:bg-gray-600 transition duration-700">
          <FaTrashCan color="red" size={20} />
          <h3 className="text-gray-400">Delete Chat</h3>
        </div>
      </div>
    </div>
  );
};

export default CurrentUserProfile;
