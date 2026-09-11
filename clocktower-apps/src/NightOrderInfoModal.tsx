import {
  ModalFooter,
  ModalWrapper,
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
import { Button } from "./components/Button";
import { CircleCheck, ExternalLink } from "lucide-react";

type NightOrderInfoModalProps = BaseModalProps &
  StandardModalHeaderProps &
  StandardModalFooterProps;

export const NightOrderInfoModal = ({
  modalIsOpen,
  closeModal,
  modalTitle,
  onCancel,
}: NightOrderInfoModalProps) => {
  const [displayNight, setDisplayNight] = useState<NightOrder>("First");

  const nightOrderSlots = (
    displayNight === "First" ? firstNightOrderSlots : otherNightOrderSlots
  )
    .slice(1)
    .filter((slot) => !slot.unselectable);

  const onClickNightButton = (newValue: NightOrder) =>
    setDisplayNight(newValue);

  return (
    <ModalWrapper
      modalIsOpen={modalIsOpen}
      closeModal={closeModal}
      closeTimeout={500}
      maxWidthPixels={800}
    >
      <StandardModalHeader modalTitle={modalTitle} closeModal={onCancel} />
      <NightSelectionContainer>
        <NightSelectionButton
          onClick={() => onClickNightButton("First")}
          disabled={displayNight === "First"}
        >
          First night
        </NightSelectionButton>
        <NightSelectionButton
          onClick={() => onClickNightButton("Other")}
          disabled={displayNight === "Other"}
        >
          Other nights
        </NightSelectionButton>
      </NightSelectionContainer>
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
      <ModalFooter>
        <a
          href="https://github.com/ThePandemoniumInstitute/botc-release/blob/main/resources/data/nightsheet.json"
          target="_blank"
        >
          See official night order {<ExternalLink />}
        </a>
        <Button label="OK" onClick={closeModal} icon={CircleCheck} />
      </ModalFooter>
    </ModalWrapper>
  );
};

const NightSelectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 5px 0;
  justify-content: space-evenly;
  button:first-child {
    border-right: none;
  }
  button:last-child {
    border-left: none;
  }
`;

const NightSelectionButton = styled.button<{ disabled: boolean }>`
  width: 50%;
  padding: 5px 10px;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  background-color: ${(props) => (props.disabled ? "#dddddd" : "var(-bg)")};
  color: ${(props) => (props.disabled ? "#222222" : "var(-text)")};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const StyledTable = styled.table`
  width: 100%;
`;

const StyledTableBody = styled.tbody`
  tr:nth-child(even) {
    background-color: #dddddd;
    color: #222222;
  }
`;

const StyledTableRow = styled.tr``;

const StyledTableCell = styled.td`
  padding-left: 5px;
`;
