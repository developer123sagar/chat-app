"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";

import { POST_SIGNIN, SOCKET_ADD_USER, SOCKET_GET_USER } from "@/constants";
import { useGetUserInfoQuery } from "@/redux/api/AuthApi";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { setOnlineUsers, setUser } from "@/redux/reducer/ContactListReducer";
import { useSocket } from "@/provider/SocketProvider";
import { OnlineUsers } from "@/types";

const MainPage = dynamic(() => import("@/components/MainPage"));
const AuthForm = dynamic(() => import("@/components/AuthForm"));
const Spinner = dynamic(() => import("@/components/Spinner"));

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { socket } = useSocket();

  const { skipUserInfo, loginUser } = useAppSelector(
    (state: RootState) => state.contactList
  );

  const { isLoading, data: user } = useGetUserInfoQuery(null, {
    skip: skipUserInfo,
  });

  useEffect(() => {
    if (user && socket) {
      if (!loginUser) {
        dispatch(setUser(user));
      }
      socket.emit(SOCKET_ADD_USER, user._id);
      socket.on(SOCKET_GET_USER, (users: OnlineUsers[]) => {
        dispatch(setOnlineUsers(users));
      });
    }
  }, [dispatch, socket, user, loginUser]);

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      {!user || isLoading ? (
        <AuthForm
          api={POST_SIGNIN}
          variant="SIGNIN"
          title="Login to your account"
        />
      ) : (
        <MainPage />
      )}
    </>
  );
}
