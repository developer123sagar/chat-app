"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const verifyUserEmail = async () => {
      try {
        await axios.post("/api/user/verifyEmail", { token });
        setVerified(true);
      } catch (err: any) {
        setError(err.response.data.error);
      }
    };
    if (typeof window !== "undefined" && token?.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlToken = new URLSearchParams(window.location.search).get("token");
      console.log(urlToken)
      setToken(urlToken || "");
    }
  }, []);

  return (
    <div className="w-full flex justify-center items-center">
      {verified &&
        "Your Email is verified successfully . Now you can close this page"}
      {error && <p>{error}</p>}
    </div>
  );
}
