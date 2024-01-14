"use client";

import dynamic from "next/dynamic";

import { POST_SIGNIN } from "@/constants/APIRoute";
import { useGetUserInfoQuery } from "@/redux/api/AuthApi";
import { RootState, useAppSelector } from "@/redux/store";

const MainPage = dynamic(() => import("@/components/MainPage"));
const AuthForm = dynamic(() => import("@/components/AuthForm"));
const Spinner = dynamic(() => import("@/components/Spinner"));

export default function HomePage() {
  const { skipUserInfo } = useAppSelector(
    (state: RootState) => state.contactList
  );

  const {
    isLoading,
    data: user,
    isError,
  } = useGetUserInfoQuery(null, { skip: skipUserInfo });

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      {(!user?.isVerified && isLoading) ||
      user === null ||
      isError ||
      skipUserInfo ? (
        <AuthForm
          api={POST_SIGNIN}
          variant="SIGNIN"
          title=" Login to your account"
        />
      ) : (
        <MainPage />
      )}
    </>
  );
}
