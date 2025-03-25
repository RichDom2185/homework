// @ts-check
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import clsx from "clsx";
import { h } from "hastscript";

/**
 * @import {ShikiTransformer} from '@shikijs/core'
 * @type {ShikiTransformer}
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
  },
  server: {
    port: 3000,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
