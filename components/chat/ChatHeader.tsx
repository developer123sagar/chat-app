import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Tooltip from "@/components/custom/Tooltip";

import { BiSearchAlt2 } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoVideocam } from "react-icons/io5";
import { MdCall } from "react-icons/md";

const ChatHeader = () => {
  return (
    <header className="h-16 px-4 py-3 flex-between bg-gray-800 text-white">
      <li className="flex-center gap-6">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>Avatar</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-gray-200 text-sm">Demo</span>
          <span className="text-gray-200 text-sm">Online</span>
        </div>
      </li>
      <li className="flex gap-4">
        <Tooltip text="Voice call">
          <MdCall size={20} className="cursor-pointer" />
        </Tooltip>
        <Tooltip text="Video call">
          <IoVideocam size={20} className="cursor-pointer" />
        </Tooltip>

        <BiSearchAlt2 size={20} className="cursor-pointer" />

        <BsThreeDotsVertical size={20} className="cursor-pointer" />
      </li>
    </header>
  );
};

export default ChatHeader;
