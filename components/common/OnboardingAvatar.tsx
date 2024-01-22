import Image from "next/image";
import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { OnboardingAvatarProps } from "@/types";

function Avatar({ type, image, setImage }: OnboardingAvatarProps){
    const [hover, setHover] = useState(false);
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
                    
                    <div className="relative cursor-pointer z-0"
                        onMouseEnter={()=>setHover(true)}
                        onMouseLeave={()=>setHover(false)}
                    >
                        <div className={`z-10 px-8 py-6 h-36 w-36 absolute flex items-center justify-center flex-col text-center gap-2
                            ${hover ? "visible" : "hidden"}
                            `}>
                            <FaCamera className="text-2xl" id="context-opener"/>
                            <span className="text-white"> Change Profile Photo </span>
                        </div>
                        <div className="flex items-center justify-center h-36 w-36">
                            <Image src={image} alt="avatar" height={140} width={140} />
                        </div>
                    </div>
                    
                )}
            </div>
        </>
    )
}
export default Avatar;