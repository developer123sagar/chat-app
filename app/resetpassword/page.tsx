"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { FormEvent, useEffect, useState } from "react";

import Spinner from "@/components/Spinner";
import Input from "@/components/custom/Input";
import Logo from "@/components/custom/Logo";
import { Button } from "@/components/ui/button";
import { useResetPasswordMutation } from "@/redux/api/AuthApi";
import { getPasswordValidationMessage, validatePassword } from "@/validation";

export default function ResetPasswordPage() {
  const [token, setToken] = useState("");
  console.log(token)

  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [resetPass, { isLoading }] = useResetPasswordMutation();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlToken = new URLSearchParams(window.location.search).get(
        "forgotToken"
      );
      setToken(urlToken || "");
    }
  }, []);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (form.confirmPassword === form.newPassword) {
      if (!validatePassword(form.newPassword)) {
        const message = getPasswordValidationMessage(form.newPassword.trim());
        toast.error(message);
        return;
      }
      try {
        const res = await resetPass({
          token: token,
          newpassword: form.newPassword,
        }).unwrap();
        console.log(res);
      } catch (err: any) {
        toast.error(err.error || "Something went wrong!");
      }
    } else {
      toast.error("Password does not matched!");
    }
  };

  return (
    <>
      <div className="h-screen w-screen flex-center flex-col gap-4">
        <Logo />
        <div className="w-[400px] py-4 px-5 rounded shadow-lg shadow-blue-100 border border-gray-300">
          <h1 className="text-lg font-bold my-1">Reset Passowrd ?</h1>
          <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
            <Input
              id="new pass"
              type="password"
              label="New Password"
              required
              value={form.newPassword}
              onChange={(e) =>
                setForm({ ...form, newPassword: e.target.value })
              }
            />
            <Input
              id="confirm pass"
              type="password"
              label="Confirm Password"
              required
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
            />
            <Button disabled={isLoading} type="submit">
              {isLoading ? <Spinner btn /> : "Chnage Password"}
            </Button>
            <Link href={"/"} className="mt-1 text-center leading-tighter">
              Back to login
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
