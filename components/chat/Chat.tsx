import ChatContainer from "@/components/chat/ChatContainer";
import ChatHeader from "@/components/chat/ChatHeader";
import MessageBar from "@/components/chat/MessageBar";

const Chat = () => {
  return (
    <div className="bg-[#222e35] w-full flex flex-col justify-between">
      <ChatHeader />
      <ChatContainer />
      <MessageBar />
    </div>
  );
};

export default Chat;
