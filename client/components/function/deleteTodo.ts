import { ENDPOINT, Todo } from "@/app/page";
import { KeyedMutator } from "swr";

export async function deleteTodo(id: string,mutate:KeyedMutator<Todo[]>) {
    try {
      const response = await fetch(`${ENDPOINT}/api/todos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      mutate();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }
