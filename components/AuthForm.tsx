"use client";

import Link from "next/link";
import Spinner from "@/components/Spinner";
import toast from "react-hot-toast";
import { FaRegEyeSlash } from "react-icons/fa";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import Input from "@/components/custom/Input";
import Logo from "@/components/custom/Logo";
import { AuthFormProps } from "@/types";
import { Button } from "@/components/ui/button";
import {
  useAuthFormSubmitMutation,
  useGetUserInfoQuery,
} from "@/redux/api/AuthApi";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import {
  changeSkipUserInfo,
  toggleShowHidePass,
} from "@/redux/reducer/ContactListReducer";
import {
  getPasswordValidationMessage,
  validatePassword,
  validateUsername,
} from "@/validation";
import { FaRegEye } from "react-icons/fa6";

const AuthForm = ({ variant, title, api }: AuthFormProps) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    ...(variant === "SIGNUP" && { username: "" }),
  });
  const [changeSkip, setChangeSkip] = useState(true);
  const { showPass } = useAppSelector((state: RootState) => state.contactList);
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
            <div className="relative">
              <Input
                id="pass"
                label="Password"
                type={showPass ? "text" : "password"}
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <p
                className="absolute right-2 bottom-2.5 cursor-pointer"
                onClick={() => dispatch(toggleShowHidePass())}
              >
                {showPass ? (
                  <FaRegEyeSlash size={20} className="text-gray-400" />
                ) : (
                  <FaRegEye size={20} className="text-gray-400" />
                )}
              </p>
            </div>
            {variant === "SIGNIN" && (
              <div className="my-1">
                <Link
                  href={"/forgotpassword"}
                  className="underline cursor-pointer text-sm font-extrabold"
                >
                  Forgot Password ?
                </Link>
              </div>
            )}
            <Button disabled={isLoading} className="h-[2.7rem]" fullWidth>
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
