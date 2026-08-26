import { useMemo } from "react";
import { TOKEN_COLOURS, tokenise } from "./jsonHandling";

type HighlightedJsonProps = {
  text: string;
};

export const HighlightedJson = ({ text }: HighlightedJsonProps) => {
  const tokens = useMemo(() => tokenise(text), [text]);

  return (
    <pre
      style={{
        margin: 0,
        padding: "16px",
        fontFamily:
          'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
        fontSize: "13px",
        lineHeight: 1.6,
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        overflowWrap: "anywhere",
      }}
    >
      {tokens.map((token, i) => {
        const colour = TOKEN_COLOURS[token.type];

        if (token.type === "key") {
          const colonMatch = token.text.match(/^(.*")(\s*:)$/s);
          if (colonMatch) {
            return (
              <span key={i}>
                <span style={{ color: colour }}>{colonMatch[1]}</span>
                <span style={{ color: TOKEN_COLOURS.comma }}>
                  {colonMatch[2]}
                </span>
              </span>
            );
          }
        }
        return (
          <span key={i} style={colour ? { color: colour } : undefined}>
            {token.text}
          </span>
        );
      })}
    </pre>
  );
};
