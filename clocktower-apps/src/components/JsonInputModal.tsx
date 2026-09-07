import { useState } from "react";
import Modal from "react-modal";
import { Button } from "./Button";
import styled from "styled-components";

Modal.setAppElement("#root");

type JsonInputModalProps = {
  modalIsOpen: boolean;
  input: string;
  setInput: (newInput: string) => void;
  closeModal: () => void;
};

export const JsonInputModal = ({
  modalIsOpen,
  input,
  setInput,
  closeModal,
}: JsonInputModalProps) => {
  const [error, setError] = useState(undefined);

  const onConfirmInput = () => {
    // verify json
    closeModal();
  };

  const onCancel = () => closeModal();

  return (
    <Modal isOpen={modalIsOpen}>
      <StyledContent>
        <TextAreaContainer>
          <InputAreaLabel>JSON input</InputAreaLabel>
          <StyledTextArea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            $error={error}
          />
        </TextAreaContainer>

        <Button onClick={onCancel} label="Cancel" />
        <Button onClick={onConfirmInput} label="OK" />
      </StyledContent>
    </Modal>
  );
};

const StyledContent = styled.div`
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  margin-right: -50%;
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
