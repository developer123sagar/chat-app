"use client";

import React, { useState } from "react";
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
import { useUpdateProfileMutation } from "@/redux/api/ProfileUpdateApi";
import Spinner from "@/components/Spinner";

const Onboarding = () => {
  const [image, setImage] = useState("/imgs/avatar.png");
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [form, setForm] = useState({
    avatar: "",
    about: "",
    displayName: "",
    gender: "Male",
  });

  console.log(form);

  const handleUpdateProfile = async () => {
    const formData = new FormData();
    formData.append("displayName", form.displayName);
    formData.append("avatar", form.avatar);
    formData.append("gender", form.displayName);
    formData.append("about", form.about);
    try {
      const res = await updateProfile(formData).unwrap();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

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
          <Input
            label="Display Name"
            id="name"
            labelClass="text-white"
            className="py-3"
            onChange={(e) => setForm({ ...form, displayName: e.target.value })}
          />
          <Input
            label="About"
            id="about"
            labelClass="text-white"
            className="py-3"
            onChange={(e) => setForm({ ...form, about: e.target.value })}
          />
          <Button className="py-3" onClick={handleUpdateProfile}>
            {isLoading ? <Spinner btn /> : "Create Profile"}
          </Button>
        </div>
        <div>
          <Avatar
            type="xl"
            image={image}
            setImage={setImage}
            setForm={setForm}
          />
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
