import { useState } from "react";
import { Button } from "./components/Button";
import { NightOrderRow } from "./NightOrderRow";
import { firstNightOrderSlots, otherNightOrderSlots } from "./nightOrderSlots";
import type { BotCCharacter, BotCCharacterFieldName } from "./types";
import { NightOrderInfoModal } from "./NightOrderInfoModal";
import styled from "styled-components";

type NightOrderSectionProps = {
  characterObject: BotCCharacter;
  updateField: (updatedField: BotCCharacterFieldName, newValue: number) => void;
};

export const NightOrderSection = ({
  characterObject,
  updateField,
}: NightOrderSectionProps) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <>
      <HeaderContainer>
        <div>Night order</div>
        <Button label="Help" onClick={openModal} />
      </HeaderContainer>
      <NightOrderRow
        label="First night order"
        nightOrderSlots={firstNightOrderSlots}
        nightOrder="First"
        currentValue={characterObject.firstNight ?? 0}
        updateNightOrderValue={(newValue: number) =>
          updateField("firstNight", newValue)
        }
        displayTooltip
        tooltipId="tooltip-first-night-order"
        tooltipContent="Set to 0 if the character doesn't wake on the first night"
      />
      <NightOrderRow
        label="Other nights order"
        nightOrderSlots={otherNightOrderSlots}
        nightOrder="Other"
        currentValue={characterObject.otherNight ?? 0}
        updateNightOrderValue={(newValue: number) =>
          updateField("otherNight", newValue)
        }
        displayTooltip
        tooltipId="tooltip-other-night-order"
        tooltipContent="Set to 0 if the character doesn't wake on nights other than the first"
      />
      <NightOrderInfoModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        modalTitle="Night Order information"
        onCancel={closeModal}
        onConfirm={closeModal}
      />
    </>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
`;
