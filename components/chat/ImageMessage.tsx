import Image from "next/image";

import MessageStatusComp from "@/components/chat/MessageStatusComp";
import { calculateTime } from "@/helper/CalculateTime";
import { RootState, useAppSelector } from "@/redux/store";
import { MessageType } from "@/types";

const ImageMessage = ({ message }: { message: MessageType }) => {
  const { currentChatUser } = useAppSelector(
    (state: RootState) => state.contactList
  );

  return (
    <div
      className={`mt-2 p-1 rounded ${
        message.senderId === currentChatUser?._id
          ? "bg-[#78a45e]"
          : "bg-[#4890d8]"
      }`}
    >
      <div className="relative">
        <Image
          src={message.message}
          alt={"img"}
          width={260}
          height={260}
          className="rounded"
          priority
        />
        <div className="absolute bottom-1 right-1 flex items-end gap-1">
          <span className="text-white text-[11px] font-bold pt-1 min-w-fit z-50">
            {calculateTime(message.createdAt)}
          </span>
          <span>
            {message.receiverId === currentChatUser?._id && (
              <MessageStatusComp msgStatus={message.messageStatus} />
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ImageMessage;
