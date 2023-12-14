"use client";
import { Modal } from "@/components/Modal";
import SideBar from "@/components/SideBar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { Trash2 } from "lucide-react";
import useSWR from "swr";

export interface Todo {
  id: number;
  title: string;
  body: string;
  done: boolean;
}

export const ENDPOINT = "http://localhost:8080";

const fetcher = (url: string) =>
  fetch(`${ENDPOINT}/${url}`).then((r) => r.json());

export default function Home() {
  const { data, mutate } = useSWR<Todo[]>("api/todos", fetcher);

  async function markTodoAdDone(id: number) {
    const updated = await fetch(`${ENDPOINT}/api/todos/${id}/done`, {
      method: "PATCH",
    }).then((r) => r.json());

    mutate(updated);
  }

  return (
    <main className="flex h-screen w-fll items-center justify-center ">
      <div className="flex h-screen w-full items-center justify-center gap-4">
        <SideBar />
        <Card className="w-[65%] h-[90%] shadow-lg relative flex justify-center">
          <div className=" w-[90%] flex flex-col mt-5">
            <div className="flex m-2 justify-between">
              <div className="font-bold text-lg border-b-2 border-teal-400">
                All Tasks
              </div>
              <PlusCircle />
            </div>

            <div className="mt-4 gap-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <Card className="w-full h-[150px] bg-secondary p-4 relative">
                <div className="font-bold text-[15px]">
                  フォームの実装をしたい
                </div>
                <div className=" text-[11px] mt-1">
                  TODOアプリを作るうえでフォームを実装したいと思ったから。
                </div>

                <div className="absolute bottom-3 w-[90%]">
                  <div className="flex item-center  justify-between">
                    <div className="flex   gap-3">
                      <Badge variant="destructive" className="text-[11px]">
                        未完了
                      </Badge>
                    </div>
                    <Trash2 className="w-4 h-4 mr-2 mt-[4px]" />
                  </div>
                </div>
              </Card>
              {data?.map((todo) => {
                return (
                  <Card
                    key={todo.id}
                    className="w-full h-[150px] bg-secondary p-4 relative"
                  >
                    <div className="font-bold text-[15px]">{todo.title}</div>
                    <div className=" text-[11px] mt-1">{todo.body}</div>
                    <div className="absolute bottom-3 w-[90%]">
                      <div className="flex item-center  justify-between">
                        <div className="flex   gap-3">
                          <Badge
                            variant={todo.done ? "success" : "destructive"}
                            className="text-[11px]"
                            onClick={() => markTodoAdDone(todo.id)}
                          >
                            {todo.done ? "完了" : "未完了"}
                          </Badge>
                        </div>
                        <Trash2 className="w-4 h-4 mr-2 mt-[4px]" />
                      </div>
                    </div>
                  </Card>
                );
              })}
              <Modal mutate={mutate} />
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
