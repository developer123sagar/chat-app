"use client";

import Link from "next/link";
import Spinner from "@/components/Spinner";
import toast from "react-hot-toast";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import Input from "@/components/custom/Input";
import Logo from "@/components/custom/Logo";
import SocialButton from "@/components/custom/SocialButton";
import { AuthFormProps } from "@/types";
import { Button } from "@/components/ui/button";
import { google } from "@/common/icons";
import {
  useAuthFormSubmitMutation,
  useGetUserInfoQuery,
} from "@/redux/api/AuthApi";
import { useAppDispatch } from "@/redux/store";
import { changeSkipUserInfo } from "@/redux/reducer/ContactListReducer";
import {
  getPasswordValidationMessage,
  validatePassword,
  validateUsername,
} from "@/validation";

const AuthForm = ({ variant, title, api }: AuthFormProps) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    ...(variant === "SIGNUP" && { username: "" }),
  });
  const [changeSkip, setChangeSkip] = useState(true);

  const [postAuthForm, { isLoading }] = useAuthFormSubmitMutation();
  useGetUserInfoQuery(null, { skip: changeSkip });

  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleFormSubmit = async (e?: FormEvent) => {
    e?.preventDefault();
    if (variant === "SIGNUP") {
      if (!validateUsername(form.username as string)) {
        toast.error("Username must contain only alphabet characters");
        return;
      }
      if (!validatePassword(form.password)) {
        const message = getPasswordValidationMessage(form.password.trim());
        toast.error(message);
        return;
      }
    }
    try {
      const res: any = await postAuthForm({ form, api }).unwrap();
      toast.success(res.message);
      if (res.success && variant === "SIGNIN") {
        setChangeSkip(false);
        dispatch(changeSkipUserInfo(false));
      }
      if (variant === "SIGNUP") {
        dispatch(changeSkipUserInfo(true));
        router.push("/");
      }
    } catch (err: any) {
      toast.error(err.error || "Something went wrong");
    }
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
                id="username"
                label="Username"
                type="text"
                required
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
            )}
            <Input
              id="email"
              label="Email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <Input
              id="pass"
              label="Password"
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <Button className="h-[2.7rem]" fullWidth>
              {variant === "SIGNIN" ? (
                isLoading ? (
                  <Spinner btn />
                ) : (
                  "Login"
                )
              ) : isLoading ? (
                <Spinner btn />
              ) : (
                "Signup"
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
                onClick={
                  variant === "SIGNUP"
                    ? () => dispatch(changeSkipUserInfo(true))
                    : undefined
                }
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

export default AuthForm;
