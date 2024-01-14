"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const route = useRouter();
  return (
    <div className="container mx-auto p-8 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <svg
          className="w-16 h-16 text-blue-500 mx-auto mb-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
        </svg>
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Nothing to see here
        </h1>
        <p className="text-gray-500 text-lg text-center mb-6">
          The page you are trying to open does not exist. You may have mistyped
          the address, or the page has been moved to another URL.
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => route.push("/")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Take me back to home page
          </button>
        </div>
      </div>
    </div>
  );
}
