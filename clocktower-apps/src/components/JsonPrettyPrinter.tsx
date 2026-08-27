import { useState, useMemo } from "react";
import { HighlightedJson } from "./HighlightedJson";
import { AlertCircle, Check, Copy } from "lucide-react";
import styled from "styled-components";

type JsonPrettyPrinterProps = {
  input: string;
  indent?: number;
};

export const JsonPrettyPrinter = ({
  input,
  indent = 2,
}: JsonPrettyPrinterProps) => {
  const [copied, setCopied] = useState(false);

  const { formatted, error } = useMemo(() => {
    if (!input.trim()) return { formatted: "", error: null };
    try {
      const parsed = JSON.parse(input);
      return { formatted: JSON.stringify(parsed, null, indent), error: null };
    } catch (e: any) {
      return { formatted: null, error: e.message };
    }
  }, [input, indent]);

  const handleCopy = async () => {
    if (!formatted) return;
    try {
      await navigator.clipboard.writeText(formatted);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <OutputContainer>
      <BorderedContainer>
        <OptionsContainer>
          <OutputTitle>Formatted output</OutputTitle>
          <CopyButton
            onClick={handleCopy}
            disabled={!formatted}
            $isFormatted={formatted !== null}
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? "Copied" : "Copy"}
          </CopyButton>
        </OptionsContainer>

        <JsonContainer>
          {error ? (
            <ErrorContainer>
              <StyledAlertCircle size={16} />
              <span>Invalid JSON: {error}</span>
            </ErrorContainer>
          ) : formatted ? (
            <HighlightedJson text={formatted} />
          ) : (
            <EmptyOutput>Nothing to display yet.</EmptyOutput>
          )}
        </JsonContainer>
      </BorderedContainer>
    </OutputContainer>
  );
};

const OutputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 720px;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
`;

const BorderedContainer = styled.div`
  border-radius: 10px;
  overflow: hidden;
  background: #1f2430;
  border: 1px solid #2d3340;
  position: relative;
`;

const OptionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-bottom: 1px solid #2d3340;
  background: #191d26;
`;

const OutputTitle = styled.span`
  font-size: 12px;
  color: #9ca3af;
  font-weight: 600;
`;

const CopyButton = styled.button<{ $isFormatted?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: ${(props) => (props.$isFormatted ? "#E5E7EB" : "#4B5563")};
  background: transparent;
  border: 1px solid #374151;
  border-radius: 6px;
  padding: 4px 8px;
  cursor: ${(props) => (props.$isFormatted ? "pointer" : "not-allowed")};
`;

const JsonContainer = styled.div`
  max-height: 480px;
  overflow: auto;
`;

const ErrorContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
  padding: 16px;
  color: #FCA5A5;
  font-size: 13px;
  font-family: ui-monospace; monospace;
`;

const StyledAlertCircle = styled(AlertCircle)`
  flex-shrink: 0;
  margin-top: 1px;
`;

const EmptyOutput = styled.div`
  padding: 16px;
  color: #6b7280;
  font-size: 13px;
`;
