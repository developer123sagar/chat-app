"use client";
import React from "react";
import { useState } from "react";
import Avatar from "@/components/common/OnboardingAvatar";
import Input from "@/components/custom/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Logo from "@/components/custom/Logo";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Onboarding = () => {
  const [image, setImage] = useState("/imgs/avatar.png");

  // const onboardUserHandler = async () => {
  //   if(validateDetails()){
  //     const email = userInfo.email;
  //     try{

  //     }catch (err){
  //       console.log(err);
  //     }
  //   }
  // };

  // const validateDetails = () => {
  //   if (name.length < 3){
  //     return false;
  //   }
  //   return true
  // }

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-800">
      <div className="flex-center gap-4">
        <Image
          src="/jiffy.png"
          alt="jiffychat"
          width={100}
          height={100}
          className="object-cover w-36 h-36 my-4"
        />
        <Logo />
      </div>

      <h2 className="text-xl font-bold text-white mt-4">Create your profile</h2>
      <div className="flex-center gap-10 mt-6 w-[80%] mx-auto">
        <div className="flex flex-col w-[300px] mt-5 space-y-6">
          <Input label="Display Name" id="name" labelClass="text-white" className="py-3" />
          <Input label="About" id="about" labelClass="text-white" className="py-3" />
          <Button className="py-3">Create Profile</Button>
        </div>
        <div>
          <Avatar type="xl" image={image} setImage={setImage} />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="others">Others</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
