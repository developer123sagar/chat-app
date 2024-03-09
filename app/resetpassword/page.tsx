"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Spinner from "@/components/Spinner";
import Input from "@/components/custom/Input";
import Logo from "@/components/custom/Logo";
import { Button } from "@/components/ui/button";
import { useResetPasswordMutation } from "@/redux/api/AuthApi";
import { getPasswordValidationMessage, validatePassword } from "@/validation";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

export default function ResetPasswordPage() {
  const [token, setToken] = useState("");
  const [showPass, setShowPass] = useState({
    newpass: false,
    confirmPass: false,
  });

  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const router = useRouter();

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
        toast.success(res.message);
        if (res.success === true) {
          router.push("/");
        }
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
            <div className="relative">
              <Input
                id="pass"
                label="New Password"
                type={showPass.newpass ? "text" : "password"}
                required
                value={form.newPassword}
                onChange={(e) =>
                  setForm({ ...form, newPassword: e.target.value })
                }
              />
              <p
                className="absolute right-2 bottom-2.5 cursor-pointer"
                onClick={() =>
                  setShowPass((prev) => ({ ...prev, newpass: !prev.newpass }))
                }
              >
                {showPass.newpass ? (
                  <FaRegEyeSlash size={20} className="text-gray-400" />
                ) : (
                  <FaRegEye size={20} className="text-gray-400" />
                )}
              </p>
            </div>
            <div className="relative">
              <Input
                id="pass"
                label="Confirm Password"
                type={showPass.confirmPass ? "text" : "password"}
                required
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
              />
              <p
                className="absolute right-2 bottom-2.5 cursor-pointer"
                onClick={() =>
                  setShowPass((prev) => ({
                    ...prev,
                    confirmPass: !prev.confirmPass,
                  }))
                }
              >
                {showPass.confirmPass ? (
                  <FaRegEyeSlash size={20} className="text-gray-400" />
                ) : (
                  <FaRegEye size={20} className="text-gray-400" />
                )}
              </p>
            </div>
            <Button disabled={isLoading} type="submit">
              {isLoading ? <Spinner btn /> : "Change Password"}
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
