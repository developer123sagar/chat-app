"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

import Input from "@/components/custom/Input";
import Spinner from "@/components/Spinner";
import SocialButton from "@/components/custom/SocialButton";
import Logo from "@/components/custom/Logo";
import {
  AuthFormSubmit,
  getUserInfo,
  removeAllData,
} from "@/redux/auth/AuthSlice";
import { Button } from "@/components/ui/button";
import { google } from "@/common/icons";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";

interface AuthFormProps {
  variant: "SIGNIN" | "SIGNUP";
  api: string;
  title: string;
}

const AuthoForm = ({ variant, api, title }: AuthFormProps) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    ...(variant === "SIGNUP" && { username: "" }),
  });

  const dispatch = useAppDispatch();
  const router = useRouter();

  const { error, loading, message } = useAppSelector(
    (state: RootState) => state.auth
  );

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await dispatch(AuthFormSubmit({ apiRoute: api, form: form })).then(
      (res) => {
        if (AuthFormSubmit.fulfilled.match(res)) {
          if (variant === "SIGNIN") {
            dispatch(getUserInfo());
          } else {
            router.push("/");
          }
        }
      }
    );
  };

  return (
    <section className="w-full min-h-screen flex flex-col justify-center px-5 py-10 sm:items-center sm:px-8 lg:px-10">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Logo />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tighter">
          {title}
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow-sm sm:rounded-lg sm:px-10">
          <form onSubmit={handleFormSubmit} className="space-y-6">
            {variant === "SIGNUP" && (
              <Input
                label="Username"
                id="username"
                type="text"
                required
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
            )}
            <Input
              label="Email"
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <Input
              label="Password"
              type="password"
              required
              id="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            {error && !message && (
              <span className="text-sm text-rose-600">{error}</span>
            )}
            <Button className="h-[2.7rem]" fullWidth>
              {loading ? (
                <Spinner btn />
              ) : variant === "SIGNIN" ? (
                "Login"
              ) : (
                "Sign up"
              )}
            </Button>
            {variant === "SIGNIN" && (
              <>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>
                <SocialButton icon={google} />
              </>
            )}
            <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
              <h2>
                {variant === "SIGNIN"
                  ? "New to Jiffychat ?"
                  : "Already have an account"}
              </h2>
              <Link
                onClick={() => dispatch(removeAllData())}
                href={variant === "SIGNIN" ? "/signup" : "/"}
                className="underline cursor-pointer"
              >
                {variant === "SIGNIN" ? "Create an account" : "Login"}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AuthoForm;
