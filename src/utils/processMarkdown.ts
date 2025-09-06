import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

export default async function processMarkdown(markdown: string) {
  const processed = await remark().use(remarkGfm).use(remarkHtml).process(markdown);
  return processed.toString();
}
