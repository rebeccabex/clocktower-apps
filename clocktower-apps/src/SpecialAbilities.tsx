import styled from "styled-components";
import { SpecialAbilitiesField } from "./SpecialAbilitiesField";
import {
  defaultSpecialAbility,
  type SpecialAbility,
  type SpecialAbilityFieldName,
} from "./types";
import { Button } from "./components/Button";

type SpecialAbilitiesProps = {
  specialAbilities: Array<SpecialAbility>;
  addSpecialAbility: (newAbility: SpecialAbility) => void;
  updateSpecialAbility: (
    fieldToUpdate: SpecialAbilityFieldName,
    updatedAbility: string,
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
  const onUpdate = (
    fieldToUpdate: SpecialAbilityFieldName,
    updatedAbility: string,
    indexToUpdate: number,
  ) => updateSpecialAbility(fieldToUpdate, updatedAbility, indexToUpdate);
  const onDelete = (indexToRemove: number) =>
    removeSpecialAbility(indexToRemove);

  return (
    <SpecialAbilitiesContainer>
      <HeaderContainer>
        <div>Special Abilities</div>
        <Button onClick={onAddSpecialAbility} label="Add" />
      </HeaderContainer>
      {specialAbilities.map((specialAbility, i) => (
        <SpecialAbilityContainer key={i}>
          <div>
            {`Special ability ${i + 1}`}
            <Button onClick={() => onDelete(i)} label="Delete" />
          </div>
          <SpecialAbilitiesField
            specialAbility={specialAbility}
            updateAbility={(
              fieldToUpdate: SpecialAbilityFieldName,
              newValue: string,
            ) => onUpdate(fieldToUpdate, newValue, i)}
          />
        </SpecialAbilityContainer>
      ))}
    </SpecialAbilitiesContainer>
  );
};

const SpecialAbilitiesContainer = styled.div`
  margin: 5px 0;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const SpecialAbilityContainer = styled.div`
  display: block;
  width: 50%;
`;
