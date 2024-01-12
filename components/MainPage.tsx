import EmptyState from "@/components/chat/EmptyState";
import Sidebar from "@/components/Sidebar/Sidebar";
import Chat from "@/components/chat/Chat";
import { RootState, useAppSelector } from "@/redux/store";

export default function MainPage() {
  const { currentChatUser } = useAppSelector(
    (state: RootState) => state.contactList
  );
  return (
    <div className="hidden lg:flex h-screen w-screen">
      <Sidebar />
      {currentChatUser ? <Chat /> : <EmptyState />}
    </div>
  );
}
