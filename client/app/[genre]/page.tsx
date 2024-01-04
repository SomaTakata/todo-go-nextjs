"use client";
import { Modal } from "@/components/Modal";
import SideBar from "@/components/SideBar";
import TodoCard from "@/components/TodoCard";
import { Card } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { Todo } from "../page";
import { AddTodoCard } from "@/components/AddTodoCard";
import { useUser } from "@clerk/nextjs";

export const ENDPOINT = "http://localhost:8080";

export default function Home() {
  const { user } = useUser();
  const userId = user?.id;
  const params = useParams();
  const genre = Array.isArray(params.genre) ? params.genre[0] : params.genre;
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, mutate } = useSWR<Todo[]>(
    userId ? `${ENDPOINT}/api/todos/${genre}?userId=${userId}` : null,
    fetcher
  );
  console.log(data);

  const getTitle = () => {
    switch (genre) {
      case "important":
        return "重要なタスク";
      case "completed":
        return "完了したタスク";
      case "uncompleted":
        return "未完了のタスク";
      default:
        return "全てのタスク";
    }
  };

  return (
    <main className="flex h-screen w-fll items-center justify-center">
      <div className="flex h-screen w-full items-center justify-center gap-4">
        <SideBar genre={genre} />
        <Card className="w-[65%] h-[90%] shadow-lg relative flex justify-center">
          <div className=" w-[90%] flex flex-col mt-5">
            <div className="flex m-2 justify-between">
              <div className="font-bold text-lg border-b-2 border-teal-400">
                {getTitle()}
              </div>
              <Modal func={<PlusCircle />} mutate={mutate} />
            </div>

            <div className="mt-4 gap-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.isArray(data) &&
                data.map((todo: Todo) => {
                  return <TodoCard todo={todo} key={todo.ID} mutate={mutate} />;
                })}
              <AddTodoCard mutate={mutate} />
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
