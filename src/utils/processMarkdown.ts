import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

export default async function processMarkdown(markdown: string) {
  const processed = await remark().use(remarkGfm).use(remarkHtml, { sanitize: false }).process(markdown);

  // Add target="_blank" to all links
  const htmlWithTargetBlank = processed.toString().replace(/<a /g, '<a target="_blank" rel="noopener noreferrer" ');

  return htmlWithTargetBlank;
}
