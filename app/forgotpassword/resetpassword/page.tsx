"use client";

export default function ResetPassword() {
  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="w-[500px] p-5 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold">Reset Passowrd ?</h1>

          <form>
            <div className="mt-5">
              <label className="block">Password</label>
              <input
                type="password"
                placeholder="Enter your new password"
                className="w-full h-10 p-2 border rounded-md outline-red-400"
              />
            </div>
            <div className="mt-5">
              <label className="block">Confirm Password</label>
              <input
                type="password"
                placeholder="Enter your confirm password"
                className="w-full h-10 p-2 border rounded-md outline-red-400"
              />
            </div>
            <div className="mt-5">
              <button className="w-full bg-black p-2 rounded-lg text-white">
                Submit
              </button>
            </div>
            <div className="mt-5 text-center">Back to login</div>
          </form>
        </div>
      </div>
    </>
  );
}
