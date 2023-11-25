"use client";

import AuthoForm from "@/components/AuthForm";
import MainPage from "@/components/MainPage";
import Sidebar from "@/components/Sidebar/Sidebar";
import { RootState, useAppSelector } from "@/redux/store";

export default function HomePage() {
  const { token } = useAppSelector((state: RootState) => state.auth);

  return (
    <>
      {!token ? (
        <AuthoForm
          api="/api/user/signin"
          variant="SIGNIN"
          title=" Login to your account"
        />
      ) : (
        <Sidebar>
          <MainPage />
        </Sidebar>
      )}
    </>
  );
}
