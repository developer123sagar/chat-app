import { useEffect, useState } from "react";

import MyProfile from "@/components/MyProfile";
import ContactList from "@/components/chat/ContactList";
import SearchBar from "@/components/Sidebar/SearchBar";
import SidebarHeader from "@/components/Sidebar/SidebarHeader";
import { PageType } from "@/types";
import { RootState, useAppSelector } from "@/redux/store";

const Sidebar = () => {
  const { isContactsPage, isProfile } = useAppSelector(
    (state: RootState) => state.contactList
  );
  const [currentPageType, setCurrentPageType] = useState<PageType>("DEFAULT");

  useEffect(() => {
    if (isContactsPage) {
      setCurrentPageType("ALL_CONTACTS");
    } else {
      setCurrentPageType("DEFAULT");
    }
  }, [isContactsPage]);

  return (
    <aside className="flex flex-col max-h-screen z-30 w-[30rem] bg-gray-800 border-r border-gray-500">
      {!isProfile ? (
        currentPageType === "DEFAULT" ? (
          <>
            <SidebarHeader />
            <SearchBar />
          </>
        ) : (
          <ContactList />
        )
      ) : (
        <MyProfile />
      )}
    </aside>
  );
};

export default Sidebar;
