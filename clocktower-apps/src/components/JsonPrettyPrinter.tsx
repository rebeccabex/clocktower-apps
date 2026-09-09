import { useState, useMemo, useRef, useLayoutEffect } from "react";
import { HighlightedJson } from "./HighlightedJson";
import { AlertCircle, Check, Code, Copy, Trash2 } from "lucide-react";
import styled from "styled-components";
import { Button } from "./Button";
import { JsonInputModal } from "./JsonInputModal";
import type { ToastType } from "../types";

type JsonPrettyPrinterProps = {
  input: string;
  indent?: number;
  clearCharacter: () => void;
  setInput: (newValue: string) => void;
  setToastMessage: (message: string, type?: ToastType) => void;
};

export const JsonPrettyPrinter = ({
  input,
  indent = 2,
  clearCharacter,
  setInput,
  setToastMessage,
}: JsonPrettyPrinterProps) => {
  const [copied, setCopied] = useState(false);
  const parentRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
      setToastMessage("JSON copied!", "success");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setToastMessage("Failed to copy", "error");
    }
  };

  useLayoutEffect(() => {
    if (!parentRef.current) return;
    const observer = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
      setHeight(entries[0].contentRect.height);
    });
    observer.observe(parentRef.current);
    return () => observer.disconnect();
  }, []);

  const openModal = () => setModalIsOpen(true);

  const closeModal = () => setModalIsOpen(false);

  return (
    <FixedContainer ref={parentRef}>
      <OutputContainer $width={width} $height={height}>
        <BorderedContainer>
          <OptionsContainer>
            <OutputTitle>Formatted output</OutputTitle>
            <ButtonContainer>
              <Button onClick={openModal} label="Open JSON input" icon={Code} />
              <Button
                onClick={handleCopy}
                disabled={!formatted}
                icon={copied ? Check : Copy}
                label={copied ? "Copied" : "Copy"}
              />
              <Button onClick={clearCharacter} label="Clear" icon={Trash2} />
            </ButtonContainer>
          </OptionsContainer>

          <JsonInputModal
            modalIsOpen={modalIsOpen}
            characterJson={input}
            setInput={setInput}
            closeModal={closeModal}
            sendToastMessage={setToastMessage}
          />

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
    </FixedContainer>
  );
};

const FixedContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const OutputContainer = styled.div<{ $width: number; $height: number }>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: ${(props) => props.$width}px;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
  height: ${(props) => props.$height}px;
  position: fixed;
  top: 45;
  left: 50%;
`;

const BorderedContainer = styled.div`
  border-radius: 10px;
  overflow: hidden;
  background: #1f2430;
  border: 1px solid #2d3340;
  position: relative;
  height: 100%;
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
  overflow: auto;
  height: 100%;
  flex: 1;
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
