import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const homework = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/data/homework",
  }),
  schema: z.object({
    font: z.enum(["sans", "serif"]),
    title: z.string(),
    name: z.string(),
    date: z.coerce.date().optional(),
    logo: z
      .object({
        src: z.string(),
        position: z.enum(["left", "right", "center"]),
        width: z.number(),
        height: z.number(),
      })
      .optional(),
    pageNumbers: z.enum(["right", "left", "center"]).optional(),
  }),
});

export const collections = { homework };
