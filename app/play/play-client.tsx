"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Search, Waypoints } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const PlayFormSchema = z.object({
  algorithm: z.enum(["IDS", "BFS"], {
    errorMap: () => ({
      message: "Please select an algorithm to use.",
    }),
  }),
  start: z
    .string({ required_error: "Please enter a starting wikipedia page." }) // Null
    .min(1, "Please enter a starting wikipedia page."), // Empty string,
  target: z
    .string({ required_error: "Please enter a target wikipedia page." }) // Null
    .min(1, "Please enter a target wikipedia page."), // Empty string
});

const PlayClient = () => {
  const form = useForm<z.infer<typeof PlayFormSchema>>({
    resolver: zodResolver(PlayFormSchema),
  });

  function onSubmit(data: z.infer<typeof PlayFormSchema>) {
    toast.success("You submitted the following values:", {
      description: "Tes",
    });
  }

  return (
    <>
      {/* Form Section */}
      <section className="flex w-full max-w-3xl flex-col gap-5">
        {/* Title */}
        <h1 className="text-center text-3xl font-bold tracking-wide lg:text-5xl">
          WikiRace
        </h1>

        {/* Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            {/* Algorithm Select Field */}
            <FormField
              control={form.control}
              name="algorithm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Algorithm</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select algorithm" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="IDS">IDS</SelectItem>
                      <SelectItem value="BFS">BFS</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Algorithm used to find the shortest wikipedia path from
                    start to target.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-5 sm:flex-row sm:gap-2">
              {/* Start Field */}
              <FormField
                control={form.control}
                name="start"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Start</FormLabel>
                    <FormControl>
                      <Input placeholder="Insert start" {...field} />
                    </FormControl>
                    <FormDescription>
                      Wikipedia title of the starting page
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Arrow Icon */}
              <ArrowRight className="relative top-10 hidden size-6 flex-none sm:block" />

              {/* Target Field */}
              <FormField
                control={form.control}
                name="target"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Target</FormLabel>
                    <FormControl>
                      <Input placeholder="Insert target" {...field} />
                    </FormControl>
                    <FormDescription>
                      Wikipedia title of the target page
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" size="lg" className="w-full items-center">
              <Waypoints className="mr-2 size-5" />
              <span>Find Shortest Path</span>
            </Button>
          </form>
        </Form>
      </section>

      {/* Result Section */}
      <section></section>
    </>
  );
};

export default PlayClient;
