import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import {
  getUserContactList,
  setContactPage,
} from "@/redux/users/ContactListSlice";
import { useEffect } from "react";
import { BiArrowBack, BiSearchAlt2 } from "react-icons/bi";

const ContactList = () => {
  const dispatch = useAppDispatch();
  const { contactList } = useAppSelector(
    (state: RootState) => state.contactList
  );

  useEffect(() => {
    dispatch(getUserContactList());
  }, [dispatch]);

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
        <div className="h-16">
          <div className="flex items-center gap-3">
            <li className="bg-gray-900 flex items-center gap-5 px-3 py-1 rounded flex-grow">
              <BiSearchAlt2 className="text-gray-200 cursor-pointer text-lg" />
              <input
                type="text"
                placeholder="Search contacts"
                className="bg-transparent text-sm w-full py-2 focus:outline-none text-white"
              />
            </li>
          </div>
        </div>
        <div className="h-full w-full overflow-y-scroll custom-scrollbar">
          {contactList &&
            Object.entries(contactList).map(([initialLetter, contact]) => (
              <ul key={Date.now().toString() + initialLetter}>
                <li className="text-teal-400 pl-10 py-6">{initialLetter}</li>
              </ul>
            ))}
        </div>
      </div>
    </>
  );
};

export default ContactList;
