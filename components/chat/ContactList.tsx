import toast from "react-hot-toast";
import { useState } from "react";

import ContactListItem from "@/components/chat/ContactListItem";
import Spinner from "@/components/Spinner";
import { BiArrowBack, BiSearchAlt2 } from "react-icons/bi";
import { useAppDispatch } from "@/redux/store";
import { useGetContactListQuery } from "@/redux/api/ContactListApi";
import { setContactPage } from "@/redux/reducer/ContactListReducer";

const ContactList = () => {
  const dispatch = useAppDispatch();
  const [searchInput, setSearchInput] = useState("");

  const { data, isLoading, isSuccess, isError, error } =
    useGetContactListQuery();

  if (isError) {
    if ("status" in error) {
      let errMsg: any = "error" in error ? error.error : error.data;
      if (error.status === 401) {
        toast.error(errMsg.message);
        window.location.reload();
      }
    } else {
      toast.error("something went wrong");
    }
  }

  const filteredContactData = isSuccess
    ? Object.fromEntries(
        Object.entries(data).map(([initialLetter, contact]) => [
          initialLetter,
          contact.filter((user) =>
            user.username.toLowerCase().includes(searchInput.toLowerCase())
          ),
        ])
      )
    : {};

  return (
    <>
      <div className="h-full flex flex-col">
        <div className="flex h-16 items-end px-3 py-4">
          <div className="flex items-center gap-10 text-white">
            <BiArrowBack
              className="cursor-pointer text-3xl"
              onClick={() => dispatch(setContactPage())}
            />
            <span>New Chat</span>
          </div>
        </div>
        <div className="h-16 px-1">
          <div className="flex items-center gap-3">
            <li className="bg-gray-900 flex items-center gap-5 px-3 py-1 rounded flex-grow">
              <BiSearchAlt2 className="text-gray-200 cursor-pointer text-lg" />
              <input
                type="text"
                placeholder="Search contacts"
                className="bg-transparent text-sm w-full py-2 focus:outline-none text-white"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </li>
          </div>
        </div>
        <h2 className="text-teal-500 text-lg font-bold pl-10 py-4 border-b border-gray-600">
          Friends On Jiffychat
        </h2>
        {isLoading ? (
          <div className="h-full flex-center">
            <Spinner />
          </div>
        ) : (
          <div className="h-full w-full overflow-y-scroll custom-scrollbar">
            {isSuccess &&
              Object.entries(filteredContactData).map(
                ([initialLetter, contact]) => (
                  <ul key={Date.now().toString() + initialLetter}>
                    {contact.length > 0 && (
                      <li className="text-teal-400 pl-10 py-6">
                        {initialLetter}
                      </li>
                    )}
                    {contact.map((user) => (
                      <ContactListItem data={user} key={user._id} />
                    ))}
                  </ul>
                )
              )}
          </div>
        )}
      </div>
    </>
  );
};

export default ContactList;
