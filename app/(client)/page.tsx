import AuthoForm from "@/components/AuthForm";

export default function HomePage() {
  return (
    <AuthoForm
      api="/api/user/signin"
      variant="SIGNIN"
      title=" Login to your account"
    />
  );
}
