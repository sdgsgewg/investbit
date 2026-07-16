import { ROUTES } from "@/constants/routes";
import { useRouter } from "@/navigation";
import { LogIn } from "lucide-react";
import { useTranslations } from "next-intl";
import Button from "./Button";

interface Props {
  onClose?: () => void;
}

const LoginButton = ({ onClose }: Props) => {
  const tAuth = useTranslations("auth");

  const router = useRouter();

  const handleNavigateToLogin = () => {
    router.push(ROUTES.AUTH.LOGIN);
  };

  return (
    <Button
      icon={LogIn}
      label={tAuth("login")}
      onClose={onClose}
      onPress={handleNavigateToLogin}
      className="border bg-background hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50"
    />
  );
};

export default LoginButton;
