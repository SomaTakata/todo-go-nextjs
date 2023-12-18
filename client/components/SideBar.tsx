import React from "react";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { SideBarButton } from "./ui/sidebar-bottn";
import { ModeToggle } from "./ModeToggle";
import { LogOut, CheckCircle2, Star, ClipboardList, Play } from "lucide-react";
import { useParams } from "next/navigation";

function SideBar({ genre }: { genre: string }) {
  console.log(genre);
  const getVariant = (buttonGenre: string) =>
    genre === buttonGenre ? "secondary" : "ghost";
  return (
    <Card className="w-[200px] h-[90%]  shadow-lg relative flex items-center justify-center">
      <div className="absolute w-[90%] top-5  flex  justify-center">
        <div className="flex w-[90%] items-center  justify-between px-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="icon" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="font-bold text-base">Tom Brown</div>
        </div>
      </div>
      <div className="flex flex-col w-full ">
        <Link href="/" className="text-base">
          <SideBarButton
            variant={getVariant("")}
            className="flex justify-start w-full px-10"
          >
            <ClipboardList className="w-4 h-4 mr-3" />
            全てのタスク
          </SideBarButton>
        </Link>
        <Link href="/important" className="text-base">
          <SideBarButton
            variant={getVariant("important")}
            className="flex w-full justify-start px-10"
          >
            <Star className="w-4 h-4 mr-3" />
            重要
          </SideBarButton>
        </Link>
        <Link href="/completed" className="text-base">
          <SideBarButton
            variant={getVariant("completed")}
            className="flex w-full justify-start px-10"
          >
            <CheckCircle2 className="w-4 h-4 mr-3" />
            完了
          </SideBarButton>
        </Link>
        <Link href="/uncompleted" className="text-base">
          <SideBarButton
            variant={getVariant("uncompleted")}
            className="flex w-full justify-start px-10"
          >
            <Play className="w-4 h-4 mr-3" />
            未完了
          </SideBarButton>
        </Link>
      </div>

      <div className="absolute bottom-4  flex w-full  justify-between px-3">
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
