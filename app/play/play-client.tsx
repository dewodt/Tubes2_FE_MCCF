"use client";

import { WikipediaInput } from "./wikipedia-input";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlayFormSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Waypoints } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const PlayClient = () => {
  const form = useForm<z.infer<typeof PlayFormSchema>>({
    resolver: zodResolver(PlayFormSchema),
  });

  function onSubmit(data: z.infer<typeof PlayFormSchema>) {
    toast.success("You submitted the following values:", {
      description: JSON.stringify(data, null, 2),
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
                render={({ field: { value, name }, ...field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Start</FormLabel>
                    <FormControl>
                      <WikipediaInput
                        placeholder="Insert start"
                        name={name} // For setValue field identifier
                        value={value}
                        setValue={form.setValue} // RHF setValue(field, value)
                        {...field} // Rest of props
                      />
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
                render={({ field: { value, name }, ...field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Target</FormLabel>
                    <FormControl>
                      <WikipediaInput
                        placeholder="Insert target"
                        name={name} // For setValue field identifier
                        value={value}
                        setValue={form.setValue} // RHF setValue(field, value)
                        {...field} // Rest props
                      />
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
