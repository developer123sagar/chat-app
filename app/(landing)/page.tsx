import React from "react";
import Signin from "../(auth)/signin/page";
export default function LandingPage() {
  return (<> 
  <section className="w-full h-full flex justify-center items-center">
      <p className="text-lg font-semibold font mt-7" style={{ fontSize: '35px' }}>Welcome to Jiffy Chat </p>
    </section>
    <Signin />
    </>
  );
}
