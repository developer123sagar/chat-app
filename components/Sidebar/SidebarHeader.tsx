import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { MdOutlineChat } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function SidebarHeader() {
  return (
    <ul className="h-16 px-4 py-3 flex justify-between items-center">
      <li className="cursor-pointer">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>Avatar</AvatarFallback>
        </Avatar>
      </li>
      <li className="flex gap-6">
        <MdOutlineChat size={20} color="white" className="cursor-pointer" />
        <BsThreeDotsVertical
          size={20}
          color="white"
          className="cursor-pointer"
        />
      </li>
    </ul>
  );
}
