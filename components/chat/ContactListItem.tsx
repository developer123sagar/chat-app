import Avatar from "@/components/custom/Avatar";
import { capitalizeFirstLetter } from "@/helper/capitalizeFirstLetter";
import { changeCurrentUser } from "@/redux/reducer/ContactListReducer";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { ChatListItemProps } from "@/types";
import { changeGettingMsg } from "@/redux/reducer/MessageReducer";

const ContactListItem = ({ data }: ChatListItemProps) => {
  const dispatch = useAppDispatch();
  const { currentChatUser, onlineUsers } = useAppSelector(
    (state: RootState) => state.contactList
  );

  const isOnline = onlineUsers?.some((user) => user.userId === data?._id);

  return (
    <div
      className={`flex cursor-pointer border-gray-900 border-y ${
        currentChatUser?._id === data._id
          ? "bg-gray-900 hover:bg-gray-900"
          : "hover:bg-gray-700 transition duration-700 ease-in-out"
      }`}
      onClick={() => {
        dispatch(changeCurrentUser(data));
        dispatch(changeGettingMsg(true));
      }}
    >
      <div className="min-w-fit px-5 pt-3 pb-1 relative">
        <Avatar src={data?.avatar} />
        <span
          className={`inline-block w-2 h-2 rounded-full absolute top-3 right-5 ${
            isOnline ? "bg-emerald-500" : "bg-gray-400"
          }`}
        />
      </div>
      <div className="flex flex-col justify-center mt-3 pr-2 w-full min-h-full">
        <div className="flex justify-between">
          <div>
            <strong className="text-white first-letter:uppercase">
              {capitalizeFirstLetter(data?.username)}
            </strong>
          </div>
        </div>
        <div className="flex pb-2 pt-1">
          <div className="flex justify-between w-full">
            <span className="text-gray-400 line-clamp-1 text-sm">
              {data?.about}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactListItem;
