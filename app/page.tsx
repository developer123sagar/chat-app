"use client";

import AuthoForm from "@/components/AuthForm";
import MainPage from "@/components/MainPage";
import Spinner from "@/components/Spinner";
import { POST_SIGNIN } from "@/constants/APIRoute";
import { useGetUserInfoQuery } from "@/redux/api/AuthApi";
import { RootState, useAppSelector } from "@/redux/store";

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
        <AuthoForm
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
