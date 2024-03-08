import { VscClose } from "react-icons/vsc";

import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { setCurrentUserProfileView } from "@/redux/reducer/MessageReducer";
import Image from "next/image";
import { capitalizeFirstLetter } from "@/helper/capitalizeFirstLetter";

const CurrentUserProfile = () => {
  const dispatch = useAppDispatch();
  const { currentChatUser } = useAppSelector(
    (state: RootState) => state.contactList
  );

  const { messages } = useAppSelector((state: RootState) => state.messages);

  console.log(messages);

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
            className="rounded-full p-1 mx-auto"
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
        {
            
        }
      </div>
    </div>
  );
};

export default CurrentUserProfile;
