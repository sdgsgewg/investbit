import { ROUTES } from "@/constants/routes";
import { LayoutDashboard } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import Button from "./Button";
import { useRouter } from "@/navigation";

interface Props {
  onClose?: () => void;
}

const DashboardButton = ({ onClose }: Props) => {
  const tNav = useTranslations("navigation");
  const router = useRouter();

  const handleNavigateToDashboard = () => {
    router.push(ROUTES.DASHBOARD.HOME);
  };

  return (
    <Button
      icon={LayoutDashboard}
      label={tNav("dashboard.base")}
      onClose={onClose}
      onPress={handleNavigateToDashboard}
      className="bg-primary/10 text-primary hover:bg-primary/20"
    />
  );
};

export default DashboardButton;
