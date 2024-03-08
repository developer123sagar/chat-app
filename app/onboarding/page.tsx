"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Avatar from "@/components/common/OnboardingAvatar";
import Input from "@/components/custom/Input";
import Logo from "@/components/custom/Logo";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { setUser } from "@/redux/reducer/ContactListReducer";
import { useUpdateProfileMutation } from "@/redux/api/ProfileUpdateApi";

type onboardingForm = {
  avatar: string | null;
  about: string | null;
  displayName: string | null;
};
const Onboarding = () => {
  const [image, setImage] = useState("/imgs/avatar.png");
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [form, setForm] = useState<onboardingForm>({
    avatar: null,
    about: "",
    displayName: "",
  });

  const { loginUser } = useAppSelector(
    (state: RootState) => state.contactList
  );
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loginUser) {
      setForm({
        avatar: "",
        about: (loginUser?.isProfileUpdated && loginUser.about) || "",
        displayName: loginUser.displayName || "",
      });
      setImage(loginUser?.avatar);
    }
  }, [loginUser]);

  const handleUpdateProfile = async () => {
    const formData = new FormData();
    if (form.displayName) {
      formData.append("displayName", form.displayName);
    }
    if (form.avatar) {
      formData.append("avatar", form.avatar);
    }
    if (form.about) {
      formData.append("about", form.about);
    }

    try {
      const res = await updateProfile(formData).unwrap();
      console.log(res);
      if (res.success === true) {
        dispatch(
          setUser({
            ...loginUser,
            displayName: res.data.displayName || loginUser?.displayName,
            about: res.data.about || loginUser?.about,
            avatar: res.data.avatar || loginUser?.avatar,
          })
        );
        router.push("/");
      }
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
            value={form.displayName as string}
            onChange={(e) => setForm({ ...form, displayName: e.target.value })}
          />
          <Input
            label="About"
            id="about"
            labelClass="text-white"
            className="py-3"
            value={form.about as string}
            onChange={(e) => setForm({ ...form, about: e.target.value })}
          />
          <Button className="py-3" onClick={handleUpdateProfile}>
            {isLoading ? (
              <Spinner btn />
            ) : loginUser?.isProfileUpdated ? (
              "Update Profile"
            ) : (
              "Create Profile"
            )}
          </Button>
        </div>
        <div>
          <Avatar
            type="xl"
            image={image}
            setImage={setImage}
            setForm={setForm}
          />
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
