import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineChat } from "react-icons/md";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppDispatch } from "@/redux/store";
import { setContactPage } from "@/redux/users/ContactListSlice";
import Tooltip from "@/components/custom/Tooltip";

export default function SidebarHeader() {
  const dispatch = useAppDispatch();

  return (
    <ul className="h-16 px-4 py-3 flex justify-between items-center">
      <li className="cursor-pointer">
        <Avatar>
          <AvatarImage src="/imgs/me.jpg" />
          <AvatarFallback>Avatar</AvatarFallback>
        </Avatar>
      </li>
      <li className="flex gap-6">
        <Tooltip text="All Contacts">
          <MdOutlineChat
            size={20}
            color="white"
            className="cursor-pointer"
            onClick={() => dispatch(setContactPage())}
          />
        </Tooltip>
        <Tooltip text="Settings">
          <BsThreeDotsVertical
            size={20}
            color="white"
            className="cursor-pointer"
          />
        </Tooltip>
      </li>
    </ul>
  );
}
