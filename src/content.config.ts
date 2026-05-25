import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    type: z.string(),
    status: z.string(),
    summary: z.string(),
    stack: z.array(z.string()),
    github: z.string().optional(),
    demo: z.string().optional(),
    logo: z.string().optional(),
    diagram: z.string().optional(),
    tiles: z.array(z.string()).optional(),
    featured: z.boolean().default(true),
    navLabel: z.string().optional(),
    parent: z.string().optional(),
    order: z.number()
  })
});

export const collections = { projects };
