import { ModeToggle } from "@/components/ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SideBarButton } from "@/components/ui/sidebar-bottn";
import { LogOut } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex h-screen w-fll items-center justify-center ">
      <div className="flex h-screen w-full items-center justify-center gap-4">
        <Card className="w-[200px] h-[90%]  shadow-lg relative flex items-center justify-center">
          <div className="absolute w-[90%] top-5  flex  justify-center">
            <div className="flex w-[90%] items-center  justify-between px-2">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="icon" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className="font-bold text-md">Tom Brown</div>
            </div>
          </div>
          <div className="flex flex-col w-full ">
            <SideBarButton variant="secondary" asChild>
              <Link href="">All Tasks</Link>
            </SideBarButton>
            <SideBarButton variant="ghost" asChild>
              <Link href="">Important</Link>
            </SideBarButton>
            <SideBarButton variant="ghost" asChild>
              <Link href="">Completed</Link>
            </SideBarButton>
            <SideBarButton variant="ghost" asChild>
              <Link href="">Do it Now</Link>
            </SideBarButton>
          </div>

          <div className="absolute w-[90%] bottom-4  flex  justify-between px-3">
            <div className="flex items-center   gap-1">
              <LogOut className="w-4 h-4" />
              <div className=" font-bold text-sm">Sign Out</div>
            </div>
            <ModeToggle />
          </div>
        </Card>

        <Card className="w-[65%] h-[90%]  shadow-lg"></Card>
      </div>
    </main>
  );
}
