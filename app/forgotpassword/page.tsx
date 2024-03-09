"use client";

import toast from "react-hot-toast";
import { FormEvent, useState } from "react";

import Input from "@/components/custom/Input";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { useSendForgotPassMailMutation } from "@/redux/api/AuthApi";
import Logo from "@/components/custom/Logo";
import { useRouter } from "next/navigation";

export default function ForgotPassPage() {
  const [sendForgotMail, { isLoading }] = useSendForgotPassMailMutation();
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await sendForgotMail(email).unwrap();
      toast.success(res.message);
      if (res.success === true) {
        router.push("/");
      }
    } catch (err: any) {
      toast.error(err.error || "Something went wrong!");
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col gap-4 justify-center items-center">
      <Logo />
      <div className="w-[400px] py-4 px-5 rounded shadow-lg shadow-blue-100 border border-gray-300">
        <h1 className="text-lg font-bold my-1">Forgot Passowrd ?</h1>
        <p className="text-gray-800 text-sm">
          Don&apos;t worry it happens. just enter your email below and we will
          send an email to you.
        </p>
        <form onSubmit={handleFormSubmit} className="my-2">
          <Input
            id="email"
            type="email"
            label="Enter email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button disabled={isLoading} type="submit" className="mt-4" fullWidth>
            {isLoading ? <Spinner btn /> : "Confirm"}
          </Button>
        </form>
      </div>
    </div>
  );
}
