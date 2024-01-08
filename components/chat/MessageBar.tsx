import { BsEmojiSmile } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";
// import { FaMicrophone } from "react-icons/fa";

import { Button } from "@/components/ui/button";

const MessageBar = () => {
  return (
    <ul className="h-20 px-4 flex items-center gap-6 relative bg-gray-800">
      <li className="flex gap-6">
        <BsEmojiSmile
          className="text-gray-200 cursor-pointer text-xl"
          title="Emoji"
        />
        <ImAttachment
          className="text-gray-200 cursor-pointer text-xl"
          title="Attach File"
        />
      </li>
      <li className="w-full rounded-lg h-10 flex items-center">
        <input
          type="text"
          placeholder="Type a message"
          className="bg-gray-600 text-sm focus:outline-none text-white placeholder:text-white h-10 rounded px-5 py-4 w-full"
        />
      </li>
      <li className="flex-center w-10">
        <Button className="px-5 flex-center">
          <MdSend
            className="text-gray-200 cursor-pointer text-xl"
            title="send message"
          />
        </Button>
        {/* <FaMicrophone
          className="text-gray-200 cursor-pointer text-xl"
          title="record"
        /> */}
      </li>
    </ul>
  );
};

export default MessageBar;
