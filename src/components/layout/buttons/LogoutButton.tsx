import { LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import Button from "./Button";
import { useAuth } from "@/providers/auth-provider";

interface Props {
  onClose?: () => void;
}

const LogoutButton = ({ onClose }: Props) => {
  const tAuth = useTranslations("auth");

  const { signOut } = useAuth();

  return (
    <Button
      icon={LogOut}
      label={tAuth("logout")}
      onClose={onClose}
      onPress={signOut}
      className="bg-destructive/10 text-destructive hover:bg-destructive/20"
    />
  );
};

export default LogoutButton;
