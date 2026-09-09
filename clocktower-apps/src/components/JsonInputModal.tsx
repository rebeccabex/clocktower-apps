import { useState } from "react";
import Modal from "react-modal";
import { Button } from "./Button";
import styled from "styled-components";
import { CircleCheck, CircleX, X } from "lucide-react";
import type { ToastType } from "../types";

Modal.setAppElement("#root");

type JsonInputModalProps = {
  modalIsOpen: boolean;
  characterJson: string;
  setInput: (newInput: string) => void;
  closeModal: () => void;
  sendToastMessage: (message: string, type?: ToastType) => void;
};

export const JsonInputModal = ({
  modalIsOpen,
  characterJson,
  setInput,
  closeModal,
  sendToastMessage,
}: JsonInputModalProps) => {
  const [inputJson, setInputJson] = useState(characterJson);
  const [error, setError] = useState("");

  const onConfirmInput = () => {
    // TODO make useMemo in JsonPrettyPrinter a custom hook and use HighlightedJson in component?
    try {
      JSON.parse(inputJson);
      setInput(inputJson);
      closeModal();
    } catch (e) {
      sendToastMessage("Invalid JSON", "error");
      if (e instanceof SyntaxError) {
        setError(e.message);
      } else {
      }
    }
  };

  const onModalOpen = () => setInputJson(characterJson);

  const customStyles = {
    content: {
      backgroundColor: "var(--bg)",
      maxWidth: "400px",
      justifySelf: "center",
      width: "100%",
    },
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      style={customStyles}
      onRequestClose={closeModal}
      onAfterOpen={onModalOpen}
      closeTimeoutMS={500}
    >
      <StyledContent>
        <TextAreaContainer>
          <TopContainer>
            <InputAreaLabel>JSON input</InputAreaLabel>
            <Button icon={X} label="" onClick={closeModal} />
          </TopContainer>
          <StyledTextArea
            value={inputJson}
            onChange={(e) => setInputJson(e.target.value)}
            spellCheck={false}
            $error={error}
          />
        </TextAreaContainer>
        <div>{error}</div>
        <ButtonContainer>
          <Button onClick={closeModal} label="Cancel" icon={CircleX} />
          <Button onClick={onConfirmInput} label="OK" icon={CircleCheck} />
        </ButtonContainer>
      </StyledContent>
    </Modal>
  );
};

const StyledContent = styled.div`
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  height: 100%;
`;

const InputAreaLabel = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const TextAreaContainer = styled.div`
  overflow: hidden;
  min-height: 0;
  height: 95%;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const StyledTextArea = styled.textarea<{ $error: any }>`
  width: 100%;
  min-height: 100px;
  height: 100%;
  resize: vertical;
  padding: 10px 12px;
  font-family: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace';
  font-size: 13px;
  line-height: 1.5;
  border: 1px solid ${(props) => (props.$error ? "#F87171" : "#D1D5DB")};
  border-radius: 8px;
  outline: none;
  box-sizing: border-box;
  background: #1f2430;
  border: 1px solid #2d3340;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;
