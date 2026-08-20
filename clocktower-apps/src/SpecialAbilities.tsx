import styled from "styled-components";
import { SpecialAbilitiesField } from "./SpecialAbilitiesField";
import { defaultSpecialAbility, type SpecialAbility } from "./types";

type SpecialAbilitiesProps = {
  specialAbilities: Array<SpecialAbility>;
  addSpecialAbility: (newAbility: SpecialAbility) => void;
  updateSpecialAbility: (
    updatedAbility: SpecialAbility,
    indexToUpdate: number,
  ) => void;
  removeSpecialAbility: (indexToRemove: number) => void;
};

export const SpecialAbilities = ({
  specialAbilities,
  addSpecialAbility,
  updateSpecialAbility,
  removeSpecialAbility,
}: SpecialAbilitiesProps) => {
  const onAddSpecialAbility = () => addSpecialAbility(defaultSpecialAbility);
  const onUpdate = (updatedAbility: SpecialAbility, indexToUpdate: number) =>
    updateSpecialAbility(updatedAbility, indexToUpdate);
  const onDelete = (indexToRemove: number) =>
    removeSpecialAbility(indexToRemove);

  return (
    <div>
      <div>Special Abilities</div>
      <button onClick={onAddSpecialAbility}>Add</button>
      {specialAbilities.map((specialAbility, i) => (
        <SpecialAbilitiesContainer key={i}>
          <div>
            {`Special ability ${i + 1}`}
            <button onClick={() => onDelete(i)}>-</button>
          </div>
          <SpecialAbilitiesField
            specialAbility={specialAbility}
            updateAbility={() => onUpdate(specialAbility, i)}
          />
        </SpecialAbilitiesContainer>
      ))}
    </div>
  );
};

const SpecialAbilitiesContainer = styled.div`
  display: block;
  width: 50%;
`;
