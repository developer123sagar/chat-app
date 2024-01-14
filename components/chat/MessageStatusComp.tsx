import { MessageStatus } from "@/types";
import { IoCheckmark, IoCheckmarkDone } from "react-icons/io5";

const MessageStatusComp = ({ msgStatus }: { msgStatus: MessageStatus }) => {
  return (
    <>
      {msgStatus === "SENT" && (
        <IoCheckmark className="text-lg text-gray-200" />
      )}
      {msgStatus === "DELIVERED" && <IoCheckmarkDone className="text-lg" />}
      {msgStatus === "SEEN" && (
        <IoCheckmarkDone className="text-lg text text-green-400" />
      )}
    </>
  );
};

export default MessageStatusComp;
