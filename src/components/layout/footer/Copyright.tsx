import { useTranslations } from "next-intl";

const Copyright = () => {
  const tFooter = useTranslations("footer");

  return (
    <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
      &copy; {new Date().getFullYear()} Investbit. {tFooter("copyright")}
    </div>
  );
};

export default Copyright;
