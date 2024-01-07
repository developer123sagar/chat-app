// import EmptyState from "@/components/chat/EmptyState";
import Sidebar from "@/components/Sidebar/Sidebar";
import Chat from "@/components/chat/Chat";

export default function MainPage() {
  return (
    <div className="hidden lg:flex h-screen w-screen">
      <Sidebar />
      {/* <EmptyState /> */}
      <Chat />
    </div>
  );
}
