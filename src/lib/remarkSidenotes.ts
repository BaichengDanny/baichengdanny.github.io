import type { FootnoteDefinition, Parent, PhrasingContent, Root } from "mdast";
import { visit } from "unist-util-visit";

/** BibTeX citations use this prefix and stay numbered footnotes. */
const CITATION_PREFIX = "cite-";

/** Flattens a footnote definition into phrasing content so it can sit inside a paragraph. */
function noteContent(definition: FootnoteDefinition): PhrasingContent[] {
  const content: PhrasingContent[] = [];
  for (const child of definition.children) {
    if (child.type !== "paragraph") continue;
    if (content.length > 0) content.push({ type: "text", value: " " });
    content.push(...child.children);
  }
  return content;
}

/**
 * Turns handwritten `[^id]` footnotes into sidenotes. Citation footnotes
 * (`cite-…`, produced by `remarkCitations`) stay in the References list.
 */
export default function remarkSidenotes() {
  return (tree: Root) => {
    const notes = new Map<string, FootnoteDefinition>();

    visit(tree, "footnoteDefinition", (node, index, parent) => {
      if (!parent || index === undefined || node.identifier.startsWith(CITATION_PREFIX)) return;
      notes.set(node.identifier, node);
      parent.children.splice(index, 1);
      return index;
    });

    if (notes.size === 0) return;

    visit(tree, "footnoteReference", (node, index, parent: Parent | undefined) => {
      if (!parent || index === undefined) return;
      const definition = notes.get(node.identifier);
      if (!definition) return;
      const sidenote = {
        type: "sidenote" as const,
        data: { hName: "sidenote" },
        children: noteContent(definition),
      };
      parent.children.splice(index, 1, sidenote as unknown as PhrasingContent);
      return index;
    });
  };
}
