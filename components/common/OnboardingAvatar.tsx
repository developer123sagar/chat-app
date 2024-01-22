import Image from "next/image";
import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { OnboardingAvatarProps } from "@/types";
import ContextMenu from "./ContextMenu";

function Avatar({ type, image, setImage }: OnboardingAvatarProps) {
  const [hover, setHover] = useState(false);
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const [contextMenuCordinates, setContextMenuCordinates] = useState({
    x: 0,
    y: 0,
  });

  const showContextMenu = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setContextMenuCordinates({ x: e.pageX, y: e.pageY });
    setIsContextMenuVisible(true);
  };

  const contextMenuOptions = [
    { name: "Take Photo", callback: () => {} },
    { name: "Choose From Library", callback: () => {} },
    { name: "Upload Photo", callback: () => {} },
    { name: "Remove Photo", callback: () => {} },
  ];

  return (
    <>
      <div className="flex items-center justify-center">
        {type === "sm" && (
          <div className="relative">
            <Image src={image} alt="avatar" height={50} width={50} />
          </div>
        )}
        {type === "lg" && (
          <div className="relative">
            <Image src={image} alt="avatar" height={100} width={100} />
          </div>
        )}
        {type === "xl" && (
          <div
            className="relative cursor-pointer z-0"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <div
              className={`z-10 px-8 py-6 h-36 w-36 absolute flex items-center justify-center flex-col text-center gap-2
                            ${hover ? "visible" : "hidden"}
                            `}
              onClick={showContextMenu}
              id="context-opener"
            >
              <FaCamera
                className="text-2xl"
                onClick={showContextMenu}
                id="context-opener"
              />
              <span
                onClick={showContextMenu}
                id="context-opener"
                className="text-white"
              >
                Change Profile Photo
              </span>
            </div>
            <div className="flex items-center justify-center h-36 w-36">
              <Image src={image} alt="avatar" height={140} width={140} />
            </div>
          </div>
        )}
      </div>

      {isContextMenuVisible && (
        <ContextMenu
          options={contextMenuOptions}
          cordinates={contextMenuCordinates}
          contextMenu={isContextMenuVisible}
          setContextMenu={setIsContextMenuVisible}
        />
      )}
    </>
  );
}

export default Avatar;
