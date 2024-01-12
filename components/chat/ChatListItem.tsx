import { capitalizeFirstLetter } from "@/helper/capitalizeFirstLetter";
import { changeCurrentUser } from "@/redux/reducer/ContactListReducer";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { ChatListItemProps } from "@/types";
import Avatar from "../custom/Avatar";

const ContactListItem = ({
  data,
}: ChatListItemProps) => {
  const dispatch = useAppDispatch();
  const { currentChatUser } = useAppSelector(
    (state: RootState) => state.contactList
  );
  
  return (
    <div
      className={`flex cursor-pointer hover:bg-gray-900 border-gray-900 border-y ${
        currentChatUser?._id === data._id ? "bg-gray-900" : null
      }`}
      onClick={() => dispatch(changeCurrentUser(data))}
    >
      <div className="min-w-fit px-5 pt-3 pb-1">
        <Avatar src="https://github.com/shadcn.png" />
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
            <span className="text-gray-600 line-clamp-1 text-sm">
              Hey there! I am using Jiffychat.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactListItem;
