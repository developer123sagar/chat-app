"use client";

import AuthoForm from "@/components/AuthForm";
import MainPage from "@/components/MainPage";
import Spinner from "@/components/Spinner";
import { getUserInfo } from "@/redux/auth/AuthSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";

export default function HomePage() {
  const { user, loading2 } = useAppSelector((state: RootState) => state.auth);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  if (loading2) {
    return <Spinner />;
  }

  return (
    <>
      {(!user?.isVerified && loading2) || user === null ? (
        <AuthoForm
          api="/api/user/signin"
          variant="SIGNIN"
          title=" Login to your account"
        />
      ) : (
        <MainPage />
      )}
    </>
  );
}
