"use client";

import AuthoForm from "@/components/AuthForm";
import MainPage from "@/components/MainPage";
import { getUserInfo } from "@/redux/auth/AuthSlice";
import { useAppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { RootState, useAppSelector } from "@/redux/store";

export default function HomePage() {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user?.token) dispatch(getUserInfo());
  }, [dispatch, user?.token]);

  return (
    <>
      {!user?.token ? (
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
