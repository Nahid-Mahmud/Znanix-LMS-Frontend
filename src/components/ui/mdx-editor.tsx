"use client";

import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  tablePlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  frontmatterPlugin,
  directivesPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  CodeToggle,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  BlockTypeSelect,
  Separator,
  type MDXEditorMethods,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { forwardRef, useState, useMemo } from "react";
import { Card } from "./card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { Eye, Edit } from "lucide-react";
import { cn } from "@/lib/utils";
import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";
import processMarkdown from "@/utils/processMarkdown";

// Process markdown to HTML using remark

// Component to handle markdown processing using useMemo
const MarkdownPreview = ({ markdown, placeholder }: { markdown: string; placeholder?: string }) => {
  const [processedHtml, setProcessedHtml] = useState<string>("");

  // Use useMemo to process markdown only when it changes
  useMemo(() => {
    if (markdown) {
      processMarkdown(markdown)
        .then(setProcessedHtml)
        .catch((error: any) => {
          console.error("Error processing markdown:", error);
          setProcessedHtml(markdown); // Fallback to original markdown
        });
    } else {
      setProcessedHtml("");
    }
  }, [markdown]);

  if (!markdown) {
    return <p className="text-muted-foreground italic">{placeholder || "Start writing to see preview..."}</p>;
  }

  if (!processedHtml) {
    return <p className="text-muted-foreground">Processing markdown...</p>;
  }

  return (
    <div className="prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: processedHtml }} />
  );
};

interface MDXEditorProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  className?: string;
  readOnly?: boolean;
  name?: string;
  showPreview?: boolean;
}

const MDXEditorComponent = forwardRef<MDXEditorMethods, MDXEditorProps>(
  ({ value, onChange, onBlur, placeholder, className, readOnly = false, name, showPreview = true }, ref) => {
    const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

    const handleEditorChange = (newValue: string) => {
      onChange(newValue);
    };

    if (!showPreview) {
      return (
        <div className={cn("mdx-editor-wrapper", className)}>
          <MDXEditor
            ref={ref}
            markdown={value}
            onChange={handleEditorChange}
            placeholder={placeholder}
            readOnly={readOnly}
            plugins={[
              // Essential plugins
              headingsPlugin(),
              listsPlugin(),
              quotePlugin(),
              thematicBreakPlugin(),
              markdownShortcutPlugin(),
              linkPlugin(),
              linkDialogPlugin(),
              imagePlugin(),
              tablePlugin(),
              codeBlockPlugin({
                defaultCodeBlockLanguage: "javascript",
              }),
              codeMirrorPlugin({
                codeBlockLanguages: {
                  javascript: "JavaScript",
                  typescript: "TypeScript",
                  python: "Python",
                  java: "Java",
                  css: "CSS",
                  html: "HTML",
                  json: "JSON",
                  markdown: "Markdown",
                },
              }),
              diffSourcePlugin({
                viewMode: "rich-text",
                diffMarkdown: "",
              }),
              frontmatterPlugin(),
              directivesPlugin(),
              // Toolbar plugin with all tools
              toolbarPlugin({
                toolbarContents: () => (
                  <>
                    <UndoRedo />
                    <Separator />
                    <BoldItalicUnderlineToggles />
                    <CodeToggle />
                    <Separator />
                    <BlockTypeSelect />
                    <Separator />
                    <ListsToggle />
                    <Separator />
                    <CreateLink />
                    <InsertImage />
                    <Separator />
                    <InsertTable />
                    <InsertThematicBreak />
                  </>
                ),
              }),
            ]}
            contentEditableClassName={cn(
              "min-h-[200px] max-h-[500px] overflow-y-auto",
              "focus:outline-none p-3 border border-input rounded-md bg-background",
              "prose prose-sm max-w-none dark:prose-invert"
            )}
          />
        </div>
      );
    }

    return (
      <div className={cn("mdx-editor-wrapper", className)}>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "edit" | "preview")}>
          <TabsList className="grid w-full grid-cols-2 mb-2">
            <TabsTrigger value="edit" className="flex items-center gap-2">
              <Edit className="w-4 h-4" />
              Edit
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="mt-0">
            <MDXEditor
              ref={ref}
              markdown={value}
              onChange={handleEditorChange}
              placeholder={placeholder}
              readOnly={readOnly}
              plugins={[
                // Essential plugins
                headingsPlugin(),
                listsPlugin(),
                quotePlugin(),
                thematicBreakPlugin(),
                markdownShortcutPlugin(),
                linkPlugin(),
                linkDialogPlugin(),
                imagePlugin(),
                tablePlugin(),
                codeBlockPlugin({
                  defaultCodeBlockLanguage: "javascript",
                }),
                codeMirrorPlugin({
                  codeBlockLanguages: {
                    javascript: "JavaScript",
                    typescript: "TypeScript",
                    python: "Python",
                    java: "Java",
                    css: "CSS",
                    html: "HTML",
                    json: "JSON",
                    markdown: "Markdown",
                  },
                }),
                diffSourcePlugin({
                  viewMode: "rich-text",
                  diffMarkdown: "",
                }),
                frontmatterPlugin(),
                directivesPlugin(),
                // Toolbar plugin with all tools
                toolbarPlugin({
                  toolbarContents: () => (
                    <>
                      <UndoRedo />
                      <Separator />
                      <BoldItalicUnderlineToggles />
                      <CodeToggle />
                      <Separator />
                      <BlockTypeSelect />
                      <Separator />
                      <ListsToggle />
                      <Separator />
                      <CreateLink />
                      <InsertImage />
                      <Separator />
                      <InsertTable />
                      <InsertThematicBreak />
                    </>
                  ),
                }),
              ]}
              contentEditableClassName={cn(
                "min-h-[200px] max-h-[500px] overflow-y-auto prose prose-sm max-w-none",
                "focus:outline-none",
                "p-3 border border-input rounded-md bg-background text-foreground",
                "prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground",
                "prose-code:text-foreground prose-pre:bg-muted prose-pre:text-foreground",
                "prose-blockquote:text-foreground prose-li:text-foreground"
              )}
            />
          </TabsContent>

          <TabsContent value="preview" className="mt-0">
            <Card className="min-h-[200px] max-h-[500px] overflow-y-auto p-4 border border-input bg-background">
              <MarkdownPreview markdown={value} placeholder={placeholder} />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  }
);

MDXEditorComponent.displayName = "MDXEditor";

export { MDXEditorComponent as MDXEditor };
