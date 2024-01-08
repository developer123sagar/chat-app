import { useEffect, useState } from "react";

import ContactList from "../chat/ContactList";
import SearchBar from "./SearchBar";
import UserList from "./UserList";
import SidebarHeader from "./SidebarHeader";
import { RootState, useAppSelector } from "@/redux/store";
import { PageType } from "@/types";

const Sidebar = () => {
  const { isContactsPage } = useAppSelector(
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
      {currentPageType === "DEFAULT" ? (
        <>
          <SidebarHeader />
          <SearchBar />
          <UserList />
        </>
      ) : (
        <ContactList />
      )}
    </aside>
  );
};

export default Sidebar;
