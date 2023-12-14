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

export function Modal({
  mutate,
  func,
}: {
  mutate: KeyedMutator<Todo[]>;
  func: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{func}</DialogTrigger>
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
