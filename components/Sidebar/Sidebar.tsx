import SearchBar from "./SearchBar";
import UserList from "./UserList";
import SidebarHeader from "./SidebarHeader";

const Sidebar = () => {
  return (
    <aside className="flex flex-col max-h-screen z-30 w-[30rem] bg-gray-800">
      <SidebarHeader />
      <SearchBar />
      <UserList />
    </aside>
  );
};

export default Sidebar;
