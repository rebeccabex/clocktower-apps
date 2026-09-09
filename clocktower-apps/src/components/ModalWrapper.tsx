import { type ReactNode } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { Button } from "./Button";
import { CircleCheck, CircleX, X } from "lucide-react";

export type BaseModalProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
  onModalOpen?: () => void;
  closeTimeout?: number;
};

type ModalWrapperProps = BaseModalProps & { children: ReactNode };

export const ModalWrapper = ({
  modalIsOpen,
  closeModal,
  onModalOpen,
  closeTimeout = 500,
  children,
}: ModalWrapperProps) => {
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
      closeTimeoutMS={closeTimeout}
    >
      {children}
    </Modal>
  );
};

type ModalHeaderProps = { children: ReactNode };

export const ModalHeader = ({ children }: ModalHeaderProps) => (
  <HeaderContainer>{children}</HeaderContainer>
);

export type StandardModalHeaderProps = {
  modalTitle: string;
  closeModal: () => void;
};

export const StandardModalHeader = ({
  modalTitle,
  closeModal,
}: StandardModalHeaderProps) => (
  <ModalHeader>
    <ModalTitle>{modalTitle}</ModalTitle>
    <Button icon={X} label="" onClick={closeModal} />
  </ModalHeader>
);

type ModalFooterProps = { children: ReactNode };

export const ModalFooter = ({ children }: ModalFooterProps) => (
  <FooterContainer>{children}</FooterContainer>
);

export type StandardModalFooterProps = {
  onCancel: () => void;
  onConfirm: () => void;
};

export const StandardModalFooter = ({
  onCancel,
  onConfirm,
}: StandardModalFooterProps) => (
  <ModalFooter>
    <Button icon={CircleX} label="Cancel" onClick={onCancel} />
    <Button icon={CircleCheck} label="OK" onClick={onConfirm} />
  </ModalFooter>
);

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ModalTitle = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;
