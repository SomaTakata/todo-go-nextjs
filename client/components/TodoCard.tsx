import React from "react";
import { Card } from "./ui/card";
import { Star, Trash2 } from "lucide-react";
import { Todo } from "@/app/page";
import { toggleTodoDone } from "./function/toggleTodoDone";
import { deleteTodo } from "./function/deleteTodo";
import { KeyedMutator } from "swr";
import { Badge } from "./ui/badge";

// propsの型を定義
interface TodoCardProps {
  todo: Todo;
  mutate: KeyedMutator<Todo[]>;
}

// TodoCard関数コンポーネント
function TodoCard(props: TodoCardProps) {
  const { todo, mutate } = props;

  return (
    <Card key={todo.ID} className="w-full h-[150px] bg-secondary p-4 relative">
      <div className="font-bold text-[15px]">{todo.title}</div>
      <div className=" text-[11px] mt-1">{todo.body}</div>
      <div className="absolute bottom-3 w-[90%]">
        <div className="flex item-center  justify-between">
          <div className="flex   gap-3">
            <Badge
              variant={todo.done ? "success" : "destructive"}
              className="text-[11px] cursor-pointer"
              onClick={() => toggleTodoDone(todo.ID, mutate)}
            >
              {todo.done ? "完了" : "未完了"}
            </Badge>
          </div>
          <div className="flex ">
            <Star className="w-5 h-5 mr-2 " />
            <Trash2
              className="w-5 h-5 mr-2"
              onClick={() => deleteTodo(todo.ID, mutate)}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

export default TodoCard;
