import Image from "next/image";
import { MdKeyboardBackspace } from "react-icons/md";

import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { toggleIsProfileview } from "@/redux/reducer/ContactListReducer";
import { capitalizeFirstLetter } from "@/helper/capitalizeFirstLetter";
import { formatDate } from "@/helper/FormatDate";

const MyProfile = () => {
  const dispatch = useAppDispatch();
  const { loginUser } = useAppSelector((state: RootState) => state.contactList);

  return (
    <div className="border-gray-400 border-r w-full bg-slate-900 flex flex-col z-10 h-screen">
      <div className="bg-gray-800 px-4 py-3 flex gap-10 items-center h-[10vh] mb-1">
        <MdKeyboardBackspace
          className="cursor-pointer text-gray-200"
          title="Close"
          size={30}
          color="white"
          onClick={() => dispatch(toggleIsProfileview())}
        />
        <span className="text-white">My Profile</span>
      </div>
      <div className="overflow-auto custom-scrollbar h-full w-full">
        <div className="bg-gray-800 py-5">
          <Image
            src={loginUser?.avatar as string}
            alt={loginUser?.username as string}
            width={210}
            height={210}
            priority
            className="rounded-full p-1 mx-auto w-[200px] h-[200px]"
          />
          <h1 className="mx-auto w-fit text-white text-lg">
            {capitalizeFirstLetter(loginUser?.username as string)}
          </h1>
        </div>
        <div className="px-4 pt-4 border-b border-gray-700">
          <h2 className="text-teal-600">Your display name</h2>
          {loginUser?.displayName && (
            <h2 className="text-base text-white mt-1">
              {loginUser?.displayName}
            </h2>
          )}
          <p className="text-gray-400 text-[14px] my-5">
            This is not your username or pin. This name will be visible to your
            WhatsApp contacts
          </p>
        </div>
        <div className="py-5 px-4 border-b border-gray-700">
          <h3 className="text-teal-600">About</h3>
          <p className="text-sky-400">{loginUser?.about}</p>
        </div>
        <div className="py-5 my-1 px-4 border-b border-gray-700">
          <h3 className="text-teal-600 text-base font-extrabold tracking-tighter">
            Join Date
          </h3>
          <p className="text-sky-400 text-xs">
            {formatDate(loginUser?.createdAt as Date)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
