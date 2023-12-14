import { ENDPOINT, Todo } from "@/app/page";
import { KeyedMutator } from "swr";

export async function toggleTodoImportant(id: number,mutate:KeyedMutator<Todo[]>) {
    try {
      const response = await fetch(`${ENDPOINT}/api/todos/${id}/important`, {
        method: "PATCH",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Todoリストの状態を再フェッチして更新
      mutate();
    } catch (error) {
      console.error("Error toggling todo done status:", error);
    }
  }
