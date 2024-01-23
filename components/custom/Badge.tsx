import { RootState, useAppSelector } from "@/redux/store";

const Badge = () => {
  const { onlineUsers, currentChatUser } = useAppSelector(
    (state: RootState) => state.contactList
  );
  const isOnline = onlineUsers?.some(
    (user) => user.userId === currentChatUser?._id
  );
  return (
    <ul>
      <li className="text-xs">
        {isOnline ? (
          <p className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            Active now
          </p>
        ) : (
          <p className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-gray-400 inline-block" />
            Offline
          </p>
        )}
      </li>
    </ul>
  );
};

export default Badge;
