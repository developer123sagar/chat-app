"use client";

import toast from "react-hot-toast";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineChat } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Avatar from "@/components/custom/Avatar";
import Tooltip from "@/components/custom/Tooltip";
import {
  setContactPage,
  toggleIsProfileview,
} from "@/redux/reducer/ContactListReducer";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogOutQuery } from "@/redux/api/AuthApi";

export default function SidebarHeader() {
  const dispatch = useAppDispatch();
  const { loginUser } = useAppSelector((state: RootState) => state.contactList);
  const [isLogout, setIsLogout] = useState(true);
  const { data, isSuccess } = useLogOutQuery(null, { skip: isLogout });
  const router = useRouter();

  if (isSuccess) {
    toast.success(data.message);
    window.location.reload();
  }

  return (
    <div className="h-16 px-4 py-3 flex justify-between items-center">
      <div className="cursor-pointer">
        {loginUser && (
          <Tooltip text={loginUser?.username}>
            <Avatar
              src={loginUser?.avatar}
              onClick={() => dispatch(toggleIsProfileview())}
            />
          </Tooltip>
        )}
      </div>
      <div className="flex gap-6">
        <Tooltip text="All Contacts">
          <MdOutlineChat
            size={20}
            color="white"
            className="cursor-pointer"
            onClick={() => dispatch(setContactPage())}
          />
        </Tooltip>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Tooltip text="Settings">
              <BsThreeDotsVertical
                size={20}
                color="white"
                className="cursor-pointer"
              />
            </Tooltip>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-gray-900 border-gray-900 text-white w-40">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => dispatch(toggleIsProfileview())}
              className="cursor-pointer hover:bg-gray-700"
            >
              My Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push("/onboarding")}
              className="cursor-pointer hover:bg-gray-700"
            >
              Onboarding
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setIsLogout(false)}
              className="cursor-pointer hover:bg-gray-700"
            >
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
