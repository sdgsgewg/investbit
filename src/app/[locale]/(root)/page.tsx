import { Section } from "@/components/home";
import { homeSections } from "@/constants/sections";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {homeSections.map(({ name, element }, index) => (
        <Section key={name} sectionName={name} isOdd={index % 2 !== 0}>
          {element}
        </Section>
      ))}
    </main>
  );
}
