import type { Root as HastRoot } from "hast";
import { h } from "hastscript";
import { visit } from "unist-util-visit";

export function wrapWithTopLevelDiv(className: string) {
  return function transformer(tree: HastRoot) {
    visit(tree, "root", (node) => {
      node.children = [h("div", { className }, node.children)];
    });
  };
}

export function unwrapTopLevelDiv(className: string) {
  return function transformer(tree: HastRoot) {
    visit(tree, "root", (node) => {
      if (node.children.length !== 1) {
        console.warn("Expected only one child in root node");
        return;
      }
      const div = node.children[0];
      if (div.type !== "element" || div.tagName !== "div") {
        console.warn("Expected root node to be a div");
        return;
      }
      const classes = div.properties.className as string[];
      if (!classes.includes(className)) {
        console.warn("Expected wrapping div to have class", className);
        return;
      }
      node.children = div.children;
    });
  };
}
