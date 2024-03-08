import Chat from "@/components/chat/Chat";
import CurrentUserProfile from "@/components/chat/CurrentUserProfile";
import EmptyState from "@/components/chat/EmptyState";
import SearchMessages from "@/components/chat/SearchMessages";
import Sidebar from "@/components/Sidebar/Sidebar";
import { RootState, useAppSelector } from "@/redux/store";

export default function MainPage() {
  const { currentChatUser } = useAppSelector(
    (state: RootState) => state.contactList
  );
  const { isMessageSearch, isCurrentUserProfileView } = useAppSelector(
    (state: RootState) => state.messages
  );

  return (
    <div className="hidden sm:flex h-screen w-screen">
      <Sidebar />
      {currentChatUser ? (
        <div
          className={`w-full ${
            isMessageSearch || isCurrentUserProfileView
              ? "grid grid-cols-12"
              : ""
          }`}
        >
          <div className="col-span-7">
            <Chat />
          </div>
          <div className="col-span-5">
            {isMessageSearch && <SearchMessages />}
            {isCurrentUserProfileView && <CurrentUserProfile />}
          </div>
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
