import { BiSearchAlt2 } from "react-icons/bi";
import { IoFilter } from "react-icons/io5";

export default function SearchBar() {
  return (
    <ul className="flex py-3 px-4 items-center gap-3 h-14 bg-gray-900">
      <li className="bg-gray-700 flex items-center gap-5 px-3 py-1 rounded flex-grow">
        <BiSearchAlt2
          className="text-gray-200 cursor-pointer text-lg"
          size={20}
        />
        <input
          type="text"
          placeholder="Search or start a new chat"
          className="bg-transparent text-sm w-full py-2 focus:outline-none text-white"
        />
      </li>
      <li className="px-2">
        <IoFilter color="white" size={25} className="cursor-pointer" />
      </li>
    </ul>
  );
}
