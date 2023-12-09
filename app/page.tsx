import SideBar from "@/components/SideBar";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex h-screen w-fll items-center justify-center ">
      <div className="flex h-screen w-full items-center justify-center gap-4">
        <SideBar />
        <Card className="w-[65%] h-[90%]  shadow-lg"></Card>
      </div>
    </main>
  );
}
