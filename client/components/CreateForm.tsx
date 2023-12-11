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
import { title } from "process";
import { create } from "domain";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  body: z.string().min(2, {
    message: "Body must be at least 2 characters.",
  }),
});

export function CreateFrom({ mutate }: { mutate: KeyedMutator<Todo[]> }) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.

    // ✅ This will be type-safe and validated.

    createTodo(values);
    console.log(values);
  }

  async function createTodo(values: { title: string; body: string }) {
    const updated = await fetch(`${ENDPOINT}/api/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((r) => r.json);

    mutate(updated);
    form.reset();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Todo</FormLabel>
              <FormControl>
                <Input placeholder="what do you want to do ?" {...field} />
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
              <FormLabel>Body</FormLabel>
              <FormControl>
                <Input placeholder="Tell me more ..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="submit">Create</Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </Form>
  );
}
