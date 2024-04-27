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
import type { ResultResponse } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Waypoints } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

interface PlayFormProps {
  setResult: React.Dispatch<React.SetStateAction<ResultResponse | undefined>>;
}

interface FieldError {
  field: keyof z.infer<typeof PlayFormSchema>;
  message: string;
}

const PlayForm = ({ setResult }: PlayFormProps) => {
  // Form hooks
  const form = useForm<z.infer<typeof PlayFormSchema>>({
    resolver: zodResolver(PlayFormSchema),
  });

  // Submit handler
  const onSubmit = async (data: z.infer<typeof PlayFormSchema>) => {
    // Reset previous result
    setResult(undefined);

    // Initiate loading toast
    const loadingToast = toast.loading("Loading...", {
      description: "Please wait",
      duration: Infinity,
    });

    // Create form data
    const formData = new FormData();
    formData.append("algorithm", data.algorithm);
    formData.append("start", data.start);
    formData.append("target", data.target);
    formData.append("pathSolutionOption", data.pathSolutionOption);

    let res: Response;

    try {
      // Fetch data
      const endpoint = `${process.env.NEXT_PUBLIC_BE_URL}/play`;
      res = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      // Catch fetch error (timeout)
      // Remove loading toast
      toast.dismiss(loadingToast);

      if (typeof error === "string") {
        toast.error("Error", { description: error });
      } else if (error instanceof Error) {
        // Type error or any other error (includes network error, timeout, etc.)
        toast.error("Error", { description: error.message });
      } else {
        toast.error("Error", { description: "Failed to find shortest path" });
      }

      return;
    }

    // Parse response to json
    const resJSON = await res.json();

    // Remove loading toast
    toast.dismiss(loadingToast);

    // Error response
    if (!res.ok) {
      toast.error(resJSON.error, { description: resJSON.message });

      // Return if there's no error paths
      if (!resJSON.errorFields) return;

      // Trigger error focus
      resJSON.errorFields.forEach((item: FieldError) => {
        form.setError(
          item.field,
          { message: item.message },
          { shouldFocus: true },
        );
      });

      return;
    }

    // Success response
    // Show success toast
    toast.success("Success", { description: "Shortest path found" });
    setResult(resJSON);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
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
                disabled={form.formState.isSubmitting}
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
                Algorithm used to find the shortest wikipedia path from start to
                target.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Path Solution Option (Single / Multiple) */}
        <FormField
          control={form.control}
          name="pathSolutionOption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Solution Option</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={form.formState.isSubmitting}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select solution option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="multiple">Multiple</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Get single or multiple path solutions
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-4 sm:flex-row sm:gap-2">
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
                    disabled={form.formState.isSubmitting}
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
                    disabled={form.formState.isSubmitting}
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
        <Button
          type="submit"
          size="lg"
          className="w-full items-center"
          disabled={form.formState.isSubmitting}
        >
          <Waypoints className="mr-2 size-5" />
          <span>Find Shortest Path</span>
        </Button>
      </form>
    </Form>
  );
};

export { PlayForm };
