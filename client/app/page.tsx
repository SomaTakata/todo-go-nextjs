"use client";
import SideBar from "@/components/SideBar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { Trash2 } from "lucide-react";
import useSWR from "swr";

export const ENDPOINT = "http://localhost:4000";

const fetcher = (url: string) =>
  fetch(`${ENDPOINT}/${url}`).then((r) => r.json());

export default function Home() {
  const { data, mutate } = useSWR("api/todos", fetcher);

  return (
    <main className="flex h-screen w-fll items-center justify-center ">
      <div className="flex h-screen w-full items-center justify-center gap-4">
        <SideBar />
        <Card className="w-[65%] h-[90%] shadow-lg relative flex justify-center">
          <div className=" w-[90%] flex flex-col mt-5">
            <div className="flex m-2 justify-between">
              <div className="font-bold text-lg border-b-2 border-teal-400">
                All Tasks/{JSON.stringify(data)}
              </div>
              <PlusCircle />
            </div>
            <div className="mt-4 gap-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              <Card className="w-full h-[150px] bg-secondary p-4 relative">
                <div className="font-bold ">フォームの実装をしたい</div>

                <div className="absolute bottom-3 w-[90%]">
                  <div className="text-sm">2023/12/13</div>
                  <div className="flex mt-1 item-center  justify-between">
                    <Badge variant="destructive">未完了</Badge>
                    <Trash2 className="w-5 h-5 mr-2" />
                  </div>
                </div>
              </Card>
              <Card className="w-full h-[150px] bg-secondary p-4 relative">
                <div className="font-bold ">TODOアプリを作成したい</div>

                <div className="absolute bottom-3 w-[90%]">
                  <div className="text-sm">2023/12/13</div>
                  <div className="flex mt-1 item-center  justify-between">
                    <Badge variant="success">完了</Badge>
                    <Trash2 className="w-5 h-5 mr-2" />
                  </div>
                </div>
              </Card>

              <Card className="w-full h-[150px]   relative">
                <button className="w-full h-full">add</button>
              </Card>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
