import {
  ModalWrapper,
  StandardModalFooter,
  StandardModalHeader,
  type BaseModalProps,
  type StandardModalFooterProps,
  type StandardModalHeaderProps,
} from "./components/ModalWrapper";
import { useState } from "react";
import {
  firstNightOrderSlots,
  getCharactersToDisplay,
  otherNightOrderSlots,
  type NightOrder,
} from "./nightOrderSlots";
import styled from "styled-components";

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
  const [displayNight, setDisplayNight] = useState<NightOrder>("First");

  const nightOrderSlots = (
    displayNight === "First" ? firstNightOrderSlots : otherNightOrderSlots
  )
    .slice(1)
    .filter((slot) => !slot.unselectable);

  return (
    <ModalWrapper
      modalIsOpen={modalIsOpen}
      closeModal={closeModal}
      closeTimeout={500}
      maxWidthPixels={800}
    >
      <StandardModalHeader modalTitle={modalTitle} closeModal={onCancel} />
      <StyledTable>
        <thead>
          <tr>
            <th>Position</th>
            <th>Description</th>
            <th>Example characters</th>
          </tr>
        </thead>
        <StyledTableBody>
          {nightOrderSlots.map((slot, i) => (
            <StyledTableRow key={`table-row-${i}`}>
              <StyledTableCell>{slot.startingPosition}</StyledTableCell>
              <StyledTableCell>{slot.description}</StyledTableCell>
              <StyledTableCell>
                {slot.characters && getCharactersToDisplay(slot.characters)}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </StyledTableBody>
      </StyledTable>
      <StandardModalFooter onConfirm={onConfirm} onCancel={onCancel} />
    </ModalWrapper>
  );
};

const StyledTable = styled.table`
  width: 100%;
`;

const StyledTableBody = styled.tbody``;

const StyledTableRow = styled.tr``;

const StyledTableCell = styled.td`
  padding-left: 5px;
`;
