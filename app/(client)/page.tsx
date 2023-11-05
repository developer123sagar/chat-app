import Logo from "@/components/custom/Logo";
import Signin from "@/app/(auth)/signin/page";

export default function HomePage() {
  return (
    <section className="w-full min-h-screen flex justify-center items-center py-10 sm:px-8 lg:px-10">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Logo />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tighter">
          Login to your account
        </h2>
      </div>
      <Signin />
    </section>
  );
}
