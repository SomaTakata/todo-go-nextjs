import React from "react";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { SideBarButton } from "./ui/sidebar-bottn";
import { ModeToggle } from "./ModeToggle";
import { LogOut } from "lucide-react";

function SideBar() {
  return (
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
          <LogOut className="w-5 h-5" />
          <div className=" font-bold text-sm">Sign Out</div>
        </div>
        <ModeToggle />
      </div>
    </Card>
  );
}

export default SideBar;
