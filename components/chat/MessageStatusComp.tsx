import { IoCheckmark, IoCheckmarkDone } from "react-icons/io5";
import { MessageStatus } from "@/types";

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
