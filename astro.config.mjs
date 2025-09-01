// @ts-check
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import clsx from "clsx";
import { h } from "hastscript";
import rehypeClassNames from "rehype-class-names";
import rehypeMathjax from "rehype-mathjax";
import remarkMath from "remark-math";
import markdownClasses from "./src/data/markdownClasses";
import {
  convertDisabledCheckboxesToReadonly,
  unwrapTopLevelDiv,
  wrapWithTopLevelDiv,
} from "./src/utilities/markdown";

/**
 * @type {import('@shikijs/core').ShikiTransformer}
 */
const transformerWrapWithDiv = {
  pre: (node) => {
    const common = [
      "highlight",
      "bg-[#f8f8f8]",
      "dark:bg-[#24292f]",
      "mx-0 my-[1em]",
      "rounded",
    ];
    node.properties.class = clsx(node.properties.class, ...common);
    return h(
      "div",
      {
        className: clsx(
          ...common,
          node.properties.dataLanguage &&
            `language-${node.properties.dataLanguage}`
        ),
      },
      node
    );
  },
};

export default defineConfig({
  markdown: {
    shikiConfig: {
      // Refer to https://shiki.style/guide/dual-themes
      defaultColor: false,
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      transformers: [transformerWrapWithDiv],
    },
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      rehypeMathjax,
      // To allow targetting of top-level elements
      [wrapWithTopLevelDiv, "prose"],
      [rehypeClassNames, markdownClasses],
      [unwrapTopLevelDiv, "prose"],
      convertDisabledCheckboxesToReadonly,
    ],
  },
  server: {
    port: 3000,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
