"use client";
import React from 'react'
import { useState } from 'react';
import Image from "next/image";
import Input from "@/components/common/Input";
import Avatar from "@/components/common/Avatar";
import Gender from "@/components/common/Gender";

const Onboarding = () => {
  const [name, setName] = useState("");
  const [about, setAbout] = useState ("");
  const [image, setImage] = useState ("/imgs/avatar.png");
  const [gender, setGender] = useState ("");

  return (
    
    <div className= "flex flex-col items-center justify-center h-screen w-screen">
      <div className="flex items-center justify-center ">
        <Image src="/imgs/onboardinglogo.png" alt="jiffychat" height={350} width={350} />
        <span className="text-7xl">
          <span className="text-blue-600/80">Jiffy</span>
          <span className="text-gray-600/80">Chat</span>
        </span>
      </div>
      <h2 className="text-xl font-bold mt-1">Create your profile</h2>
      <div className="flex gap-10 mt-6">
        <div className="flex flex-col items-center justify-center mt-5 space-y-6">
          <Input name="Display Name" state={name} setState={setName} label={true}/>
          <Input name="About" state={about} setState={setAbout} label/>
        </div>
        <div>
          <Avatar type="xl" image={image} setImage={setImage}/>
          <Gender selectedGender={gender} setGender={setGender} />
        </div>
      </div>
    </div>
  );
}

export default Onboarding