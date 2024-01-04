"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogClose, DialogFooter } from "./ui/dialog";
import { ENDPOINT, Todo } from "@/app/page";

import { KeyedMutator } from "swr";
import { useUser } from "@clerk/nextjs";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  body: z.string().min(2, {
    message: "Body must be at least 2 characters.",
  }),
  userID: z.string().min(2, {
    message: "Body must be at least 2 characters.",
  }),
});

export function CreateFrom({ mutate }: { mutate: KeyedMutator<Todo[]> }) {
  const { user } = useUser();
  const userId = user?.id;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      body: "",
      userID: userId,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createTodo(values);
    console.log(values);
  }

  async function createTodo(values: {
    title: string;
    body: string;
    userID: string;
  }) {
    const updated = await fetch(`${ENDPOINT}/api/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((r) => r.json());

    mutate(updated);
    form.reset();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>タイトル</FormLabel>
              <FormControl>
                <Input placeholder="基本情報の問題を20個解く" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>内容</FormLabel>
              <FormControl>
                <Input
                  placeholder="基本情報を受けるうえで、合計800問を解く上の20問"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter className="sm:justify-start ">
          <DialogClose asChild>
            <Button type="submit" className="my-3 w-full">
              追加
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </Form>
  );
}
