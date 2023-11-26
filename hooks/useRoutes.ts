"use client"

import axios from "axios";
import { useCallback, useMemo } from "react";
import { usePathname } from "next/navigation";

import useConversation from "@/hooks/useConversation";
import { chat, leftArrow, users } from "@/common/icons";
import { useAppDispatch } from "@/redux/store";
import { logOut } from "@/redux/auth/AuthSlice";

const useRoutes = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { conversationId } = useConversation();

  const logout = useCallback(async () => {
    try {
      await axios.get("/api/user/logout");
      dispatch(logOut());
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  const routes = useMemo(() => [
    {
      label: 'Chat',
      href: '/conversations',
      icon: chat,
      active: pathname === '/conversations' || !!conversationId
    },
    {
      label: 'Users',
      href: '/users',
      icon: users,
      active: pathname === '/users'
    },
    {
      label: 'Logout',
      icon: leftArrow,
      href: "#",
      onClick: () => logout()
    }
  ], [pathname, conversationId, logout]);

  return routes;
};

export default useRoutes;