import AuthoForm from "@/components/AuthForm";


export default function SignUp() {
  return (
    <AuthoForm
      api="/api/user/signup"
      variant="SIGNUP"
      title="Register Your Account"
    />
  );
}
