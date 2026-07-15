import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

const LegalSection = () => {
  const tFooter = useTranslations("footer");

  return (
    <div>
      <h4 className="font-medium mb-4">Legal</h4>
      <ul className="space-y-2 text-sm text-muted-foreground">
        <li>
          <Link href="#" className="hover:text-primary transition-colors">
            {tFooter("legal.privacyPolicy")}
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:text-primary transition-colors">
            {tFooter("legal.termsOfService")}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default LegalSection;
