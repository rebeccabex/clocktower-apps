import { useState, useMemo } from "react";
import { HighlightedJson } from "./HighlightedJson";
import { AlertCircle, Check, Copy, Trash2 } from "lucide-react";
import styled from "styled-components";
import { Button } from "./Button";

type JsonPrettyPrinterProps = {
  input: string;
  indent?: number;
  clearCharacter: () => void;
  editable?: boolean;
  setInput: (newValue: string) => void;
};

export const JsonPrettyPrinter = ({
  input,
  indent = 2,
  clearCharacter,
  editable = false,
  setInput,
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
          <ButtonContainer>
            <Button
              onClick={handleCopy}
              disabled={!formatted}
              icon={copied ? Check : Copy}
              label={copied ? "Copied" : "Copy"}
            />
            <Button onClick={clearCharacter} label="Clear" icon={Trash2} />
          </ButtonContainer>
        </OptionsContainer>

        {editable && (
          <InputAreaContainer>
            <InputAreaLabel>JSON input</InputAreaLabel>
            <StyledTextArea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              spellCheck={false}
              $error={error}
            />
          </InputAreaContainer>
        )}

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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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

const InputAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const InputAreaLabel = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const StyledTextArea = styled.textarea<{ $error: any }>`
  width: 100%;
  min-height: 100px;
  resize: vertical;
  padding: 10px 12px;
  font-family: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace';
  font-size: 13px;
  line-height: 1.5;
  border: 1px solid ${(props) => (props.$error ? "#F87171" : "#D1D5DB")};
  border-radius: 8px;
  outline: none;
  box-sizing: border-box;
  background: #fafafa;
  color: #111827;
`;
