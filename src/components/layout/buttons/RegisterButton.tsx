import { ROUTES } from "@/constants/routes";
import { useRouter } from "@/navigation";
import { UserPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import Button from "./Button";

interface Props {
  onClose?: () => void;
}

const RegisterButton = ({ onClose }: Props) => {
  const tAuth = useTranslations("auth");

  const router = useRouter();

  const handleNavigateToRegister = () => {
    router.push(ROUTES.AUTH.REGISTER);
  };

  return (
    <Button
      icon={UserPlus}
      label={tAuth("register")}
      onClose={onClose}
      onPress={handleNavigateToRegister}
      className="bg-primary text-primary-foreground hover:bg-primary/90"
    />
  );
};

export default RegisterButton;
