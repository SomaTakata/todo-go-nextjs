"use client";
import { AddTodoCard } from "@/components/AddTodoCard";
import { Modal } from "@/components/Modal";
import SideBar from "@/components/SideBar";
import TodoCard from "@/components/TodoCard";
import { Card } from "@/components/ui/card";
import { PlusCircle, Star } from "lucide-react";
import useSWR from "swr";

export interface Todo {
  CreatedAt: string;
  DeletedAt: string | null;
  ID: number;
  UpdatedAt: string;
  body: string;
  title: string;
  done: boolean;
  important: boolean;
}

export const ENDPOINT = "http://localhost:8080";

const fetcher = (url: string) =>
  fetch(`${ENDPOINT}/${url}`).then((r) => r.json());

export default function Home() {
  const { data, mutate } = useSWR<Todo[]>("api/todos", fetcher);
  console.log(data);

  return (
    <main className="flex h-screen w-fll items-center justify-center ">
      <div className="flex h-screen w-full items-center justify-center gap-4">
        <SideBar genre={""} />
        <Card className="w-[65%] h-[90%] shadow-lg relative flex justify-center">
          <div className=" w-[90%] flex flex-col mt-5">
            <div className="flex m-2 justify-between">
              <div className="font-bold text-lg border-b-2 border-teal-400">
                全てのタスク　
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
