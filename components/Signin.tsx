import Input from "@/components/custom/Input";
import SocialButton from "@/components/custom/SocialButton";
import { Button } from "@/components/ui/button";
import { google } from "@/common/icons";

const Signin = () => {
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow-sm sm:rounded-lg sm:px-10">
        <form className="space-y-6">
          <Input label="Email" id="email" />
          <Input label="Password" id="password" />
          <Button fullWidth>Login</Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          <SocialButton icon={google} />
        </form>
      </div>
    </div>
  );
};

export default Signin;
