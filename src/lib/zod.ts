import * as z from "zod";

export const PlayFormSchema = z.object({
  algorithm: z.enum(["IDS", "BFS"], {
    errorMap: () => ({
      message: "Please select an algorithm to use",
    }),
  }),
  pathSolutionOption: z.enum(["single", "multiple"], {
    errorMap: () => ({
      message: "Please select a path solution option",
    }),
  }),
  start: z
    .string({ required_error: "Please enter a starting wikipedia page" }) // Null
    .min(1, "Please enter a starting wikipedia page"), // Empty string,
  target: z
    .string({ required_error: "Please enter a target wikipedia page" }) // Null
    .min(1, "Please enter a target wikipedia page"), // Empty string
});
