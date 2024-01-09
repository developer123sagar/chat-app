import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { capitalizeFirstLetter } from "@/helper/capitalizeFirstLetter";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { changeCurrentUser } from "@/redux/users/ContactListSlice";
import { ChatListItemProps } from "@/types";

const ContactListItem = ({
  data,
  isContactPage = false,
}: ChatListItemProps) => {
  const dispatch = useAppDispatch();
  const { currentChatUser } = useAppSelector(
    (state: RootState) => state.contactList
  );
  console.log(isContactPage);

  return (
    <div
      className={`flex cursor-pointer hover:bg-gray-900 border-gray-900 border-y ${
        currentChatUser?._id === data._id ? "bg-gray-900" : null
      }`}
      onClick={() => dispatch(changeCurrentUser(data))}
    >
      <div className="min-w-fit px-5 pt-3 pb-1">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>Avatar</AvatarFallback>
        </Avatar>
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
