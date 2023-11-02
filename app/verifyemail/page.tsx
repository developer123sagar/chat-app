"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const verifyUserEmail = async () => {
      try {
        const res = await axios.post("/api/user/verifyEmail", { token });
        setVerified(true);
        console.log(res);
      } catch (err: any) {
        console.log(err.response.data);
        throw new Error(err.message);
      }
    };
    if (token?.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken);
  }, []);

  return (
    <div className="w-full flex justify-center items-center">
      {verified ? "Email is verified successfully" : "something went wrong"}
    </div>
  );
}
