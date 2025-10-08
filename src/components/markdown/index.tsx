import MDEditor from "@uiw/react-md-editor";
import "./markdown.css";

export default function Markdown({ content }: { content: string }) {
  return (
    <MDEditor.Markdown
      className="markdown bg-background"
      source={content}
      components={{
        a: ({ children, ...props }) => (
          <a {...props} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        ),
      }}
    />
  );
}
