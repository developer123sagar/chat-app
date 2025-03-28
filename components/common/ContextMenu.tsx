/* eslint-disable no-unused-vars */
import React, { useRef, MouseEvent, useEffect } from "react";

interface Option {
  name: string;
  callback: () => void;
}

interface ContextMenuProps {
  options: Option[];
  cordinates: { x: number; y: number };
  contextMenu: boolean;
  setContextMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

function ContextMenu({
  options,
  cordinates,
  contextMenu,
  setContextMenu,
}: ContextMenuProps) {
  const contextMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick: EventListener = (event) => {
      const target = event.target as HTMLElement;
      if (target.id !== "context-opener") {
        if (
          contextMenuRef.current &&
          !contextMenuRef.current.contains(target)
        ) {
          setContextMenu(false);
        }
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [setContextMenu]);

  const handleClick = (e: MouseEvent, callback: () => void) => {
    e.stopPropagation();
    setContextMenu(false);
    callback();
  };

  return (
    <div
      className={`bg-background-black fixed py-2 z-[100]`}
      ref={contextMenuRef}
      style={{
        top: cordinates.y,
        left: cordinates.x,
      }}
    >
      <ul className="bg-black">
        {options.map(({ name, callback }) => (
          <li
            key={name}
            onClick={(e) => handleClick(e, callback)}
            className="px-5 py-2 cursor-pointer hover:bg-background-default"
          >
            <span className="text-white"> {name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContextMenu;
