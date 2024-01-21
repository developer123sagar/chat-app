import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineChat } from "react-icons/md";

import Avatar from "@/components/custom/Avatar";
import Tooltip from "@/components/custom/Tooltip";
import { useAppDispatch } from "@/redux/store";
import { setContactPage } from "@/redux/reducer/ContactListReducer";

export default function SidebarHeader() {
  const dispatch = useAppDispatch();

  return (
    <ul className="h-16 px-4 py-3 flex justify-between items-center">
      <li className="cursor-pointer">
        <Avatar src="/imgs/me.jpg" />
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
