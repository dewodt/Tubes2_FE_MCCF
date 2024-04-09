"use client";

import { ResultGraph } from "./result-graph";
import { ResultList } from "./result-list";
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
import { mockResultResponse } from "@/lib/mock";
import { PlayFormSchema } from "@/lib/zod";
import { ResultResponse } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Waypoints } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const PlayClient = () => {
  const form = useForm<z.infer<typeof PlayFormSchema>>({
    resolver: zodResolver(PlayFormSchema),
  });

  /*
   * Result state
   * - undefined: No result yet (loading / error / initial state)
   * - ResultResponse: Result data
   */
  const [result, setResult] = useState<ResultResponse | undefined>(undefined);

  function onSubmit(data: z.infer<typeof PlayFormSchema>) {
    console.log(data);

    // Mock data before the API is implemented
    setResult(mockResultResponse);
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
      {result && (
        <section className="flex flex-col items-center gap-12 lg:gap-16">
          {/* Result Message */}
          <div className="flex w-full max-w-2xl flex-col items-center gap-4 lg:gap-6">
            <h2 className="text-center text-xl font-bold tracking-wide lg:text-3xl">
              Information
            </h2>
            <p className="text-center text-base lg:text-xl">
              Traversed a total of{" "}
              <span className="font-semibold text-primary">
                {result.totalTraversed} articles
              </span>{" "}
              in{" "}
              <span className="font-semibold text-primary">
                {result.duration} seconds
              </span>{" "}
              where the shortest path from{" "}
              <Link
                href={result.articles[0].url}
                className="font-semibold text-primary underline-offset-4 hover:underline"
              >
                {result.articles[0].title}
              </Link>{" "}
              to{" "}
              <Link
                href={result.articles[result.articles.length - 1].url}
                className="font-semibold text-primary  underline-offset-4 hover:underline"
              >
                {result.articles[result.articles.length - 1].title}
              </Link>{" "}
              is{" "}
              <span className="font-semibold text-primary">
                {result.shortestPathLength} articles
              </span>
            </p>
          </div>

          {/* Result path (Graph) */}
          <div className="flex w-full max-w-3xl flex-col items-center gap-4 lg:gap-6">
            <h2 className="text-center text-xl font-bold tracking-wide lg:text-3xl">
              Graph Visualization
            </h2>
            <ResultGraph
              articles={mockResultResponse.articles}
              paths={mockResultResponse.paths}
            />
          </div>

          {/* Result path (List) */}
          <div className="flex w-full max-w-4xl flex-col items-center gap-4 lg:gap-6">
            <h2 className="text-center text-xl font-bold tracking-wide lg:text-3xl">
              Individual Paths
            </h2>
            <div className="flex flex-row flex-wrap items-center justify-center gap-6 lg:gap-8">
              {result.paths.map((path, idx) => {
                const data = path.map((idx) => result.articles[idx]);
                return <ResultList key={idx} data={data} />;
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default PlayClient;
