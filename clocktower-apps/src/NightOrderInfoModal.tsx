import Modal from "react-modal";
import {
  StandardModalFooter,
  StandardModalHeader,
  type BaseModalProps,
  type StandardModalFooterProps,
  type StandardModalHeaderProps,
} from "./components/ModalWrapper";

type NightOrderInfoModalProps = BaseModalProps &
  StandardModalHeaderProps &
  StandardModalFooterProps;

export const NightOrderInfoModal = ({
  modalIsOpen,
  closeModal,
  modalTitle,
  onConfirm,
  onCancel,
}: NightOrderInfoModalProps) => {
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
      closeTimeoutMS={500}
    >
      <StandardModalHeader modalTitle={modalTitle} closeModal={onCancel} />
      <StandardModalFooter onConfirm={onConfirm} onCancel={onCancel} />
    </Modal>
  );
};
