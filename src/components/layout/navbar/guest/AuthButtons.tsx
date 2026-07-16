import LoginButton from "@/components/layout/buttons/LoginButton";
import RegisterButton from "@/components/layout/buttons/RegisterButton";

const AuthButtons = () => {
  return (
    <div className="hidden md:flex gap-4">
      <LoginButton />
      <RegisterButton />
    </div>
  );
};

export default AuthButtons;
