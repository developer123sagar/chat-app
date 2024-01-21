import AuthoForm from "@/components/AuthForm";
import { POST_SIGNUP } from "@/constants";

export default function SignUp() {
  return (
    <AuthoForm
      api={POST_SIGNUP}
      variant="SIGNUP"
      title="Register Your Account"
    />
  );
}
