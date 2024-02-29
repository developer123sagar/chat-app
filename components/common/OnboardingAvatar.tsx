/* eslint-disable no-unused-vars */
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { OnboardingAvatarProps } from "@/types";
import ContextMenu from "./ContextMenu";
import PhotoPicker from "./PhotoPicker";
import CapturePhoto from "./CapturePhoto";

function OnAvatar({ type, image, setImage, setForm }: OnboardingAvatarProps) {
  const [hover, setHover] = useState(false);
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const [contextMenuCordinates, setContextMenuCordinates] = useState({
    x: 0,
    y: 0,
  });

  const [grabPhoto, setGrabPhoto] = useState(false);
  const [showCapturePhoto, setShowCapturePhoto] = useState(false);

  const showContextMenu = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setContextMenuCordinates({ x: e.pageX, y: e.pageY });
    setIsContextMenuVisible(true);
  };

  useEffect(() => {
    if (grabPhoto) {
      const data = document.getElementById("photo-picker");
      if (data) {
        data.click();
        document.body.onfocus = (e: FocusEvent) => {
          setTimeout(() => {
            setGrabPhoto(false);
          }, 1000);
        };
      }
    }
  }, [grabPhoto]);

  const contextMenuOptions = [
    {
      name: "Take Photo",
      callback: () => {
        setShowCapturePhoto(true);
      },
    },
    // { name: "Choose From Library", callback: () => {} },
    {
      name: "Upload Photo",
      callback: () => {
        setGrabPhoto(true);
      },
    },
    {
      name: "Remove Photo",
      callback: () => {
        setImage("/imgs/avatar.png");
      },
    },
  ];

  const photoPickerChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prevForm: any) => ({
        ...prevForm,
        avatar: file,
      }));
      const reader = new FileReader();
      const data = document.createElement("img");

      reader.onload = function (event) {
        const result = event.target?.result ?? "";
        data.src = result as string;
        data.setAttribute("data-src", result as string);
      };

      reader.readAsDataURL(file);

      setTimeout(() => {
        setImage(data.src);
      }, 100);
    }
  };

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
            className="relative cursor-pointer z-0 rounded-full overflow-hidden"
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
            <div className="flex items-center justify-center h-36 w-36 overflow-hidden">
              <Image
                src={image}
                alt="avatar"
                height={140}
                width={140}
                className="rounded-full w-36 h-36"
                layout="fixed"
                objectFit="cover"
              />
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
      {showCapturePhoto && (
        <CapturePhoto setImage={setImage} hide={setShowCapturePhoto} />
      )}
      {grabPhoto && <PhotoPicker onChange={photoPickerChange} />}
    </>
  );
}

export default OnAvatar;
