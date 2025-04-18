export default {
  "h1, h2, h3, h4, h5, h6": [
    "text-left",
    "group",
    "font-bold dark:font-semibold",
    "relative",
  ],
  h1: "text-xl lg:text-2xl",
  h2: "text-lg lg:text-xl",
  h3: "text-lg",
  "ol li": ["list-decimal", "ml-5"],
  "ul li": ["list-disc", "ml-5"],
  pre: [
    // TODO: Investigate why astro-code is overridden
    "astro-code",
    "overflow-x-auto",
    "px-6",
    "py-4",
  ],
  ":not(pre)>code": ["px-1", "py-0.5", "rounded-sm"],
  "pre code span": ["dark:opacity-85"],
  a: ["text-blue-600", "dark:text-blue-300", "underline", "underline-offset-4"],
  blockquote: [
    "space-y-2",
    "text-[0.9em]",
    "px-4",
    "py-2",
    "bg-[#fff2d9]",
    "dark:bg-amber-900/50",
  ],
  "blockquote :is(h1, h2, h3, h4, h5, h6)": ["!text-[1em]"],
  table: [
    "table-auto",
    "border-collapse",
    "overflow-hidden",
    "bg-white",
    "dark:bg-neutral-800",
  ],
  thead: ["bg-slate-400/20", "dark:bg-neutral-500/20"],
  "tbody > tr": ["even:bg-slate-400/20", "dark:even:bg-neutral-500/20"],
  "th,td": [
    "border",
    "border-neutral-400 dark:border-neutral-600",
    "border-solid",
    "px-3",
    "py-1",
  ],
  hr: ["border-neutral-200", "dark:border-neutral-700"],
  // TODO: Use cascading styles once plugin is fixed
  // "mjx-container": ["text-[0.875em]"],
  // // Only target block-level LaTeX elements
  // "prose > mjx-container": ["px-6", "py-4", "text-center", "[&>*]:inline"],
  ".prose > mjx-container": [
    "px-6",
    "py-4",
    "text-center",
    "text-[0.875em]",
    "[&>*]:inline",
  ],
  ":not(.prose) > mjx-container": ["text-[0.875em]", "[&>*]:inline"],
};
