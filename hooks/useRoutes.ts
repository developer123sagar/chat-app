"use client"

import useConversation from "@/hooks/useConversation";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { chat, leftArrow, users } from "@/common/icons";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

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
      href: '#',
      icon: leftArrow,
    }
  ], [pathname, conversationId]);

  return routes;
};

export default useRoutes;