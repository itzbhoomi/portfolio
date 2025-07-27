import SkillsGrid from "@/components/SkillsGrid";
import TargetCursor from "@/components/TargetCursor";

export default function SkillsPage() {
  return (
    <main className="min-h-screen w-full bg-transparent pt-20 relative">

      <TargetCursor targetSelector=".cursor-target" />
      
      <SkillsGrid />
    </main>
  );
}
