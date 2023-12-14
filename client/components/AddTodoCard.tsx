import { Copy, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "./ui/card";
import { CreateFrom } from "./CreateForm";
import { KeyedMutator } from "swr";
import { Todo } from "@/app/page";

export function AddTodoCard({ mutate }: { mutate: KeyedMutator<Todo[]> }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="w-full h-[150px]">
          <Button
            variant="outline"
            className="w-full h-full text-base flex-col gap-2 text-gray-300"
          >
            Todoを追加
            <PlusCircle />
          </Button>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-lg">
        <DialogHeader>
          <DialogTitle>Todoを作成</DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <CreateFrom mutate={mutate} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
