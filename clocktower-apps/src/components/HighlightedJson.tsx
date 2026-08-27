import { useMemo } from "react";
import { TOKEN_COLOURS, tokenise } from "./jsonHandling";
import styled from "styled-components";

type HighlightedJsonProps = {
  text: string;
};

export const HighlightedJson = ({ text }: HighlightedJsonProps) => {
  const tokens = useMemo(() => tokenise(text), [text]);

  return (
    <JsonContainer>
      {tokens.map((token, i) => {
        const colour = TOKEN_COLOURS[token.type];

        if (token.type === "key") {
          const colonMatch = token.text.match(/^(.*")(\s*:)$/s);
          if (colonMatch) {
            return (
              <span key={i}>
                <HighlightedSpan $colour={colour}>
                  {colonMatch[1]}
                </HighlightedSpan>
                <HighlightedSpan $colour={TOKEN_COLOURS.comma}>
                  {colonMatch[2]}
                </HighlightedSpan>
              </span>
            );
          }
        }
        return (
          <HighlightedSpan key={i} $colour={colour}>
            {token.text}
          </HighlightedSpan>
        );
      })}
    </JsonContainer>
  );
};

const JsonContainer = styled.pre`
  margin: 0;
  padding: 16px;
  font-family: "ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace";
  font-size: 13px;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: anywhere;
  text-align: left;
`;

const HighlightedSpan = styled.span<{ $colour?: string }>`
  color: ${(props) => props.$colour ?? undefined};
`;
