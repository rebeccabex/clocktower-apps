import styled from "styled-components";
import { SpecialAbilitiesField } from "./SpecialAbilitiesField";
import {
  defaultSpecialAbility,
  type SpecialAbility,
  type SpecialAbilityFieldName,
} from "./types";
import { Button } from "./components/Button";
import { Trash2 } from "lucide-react";

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
    <SectionContainer>
      <HeaderContainer>
        <div>Special Abilities</div>
        <Button onClick={onAddSpecialAbility} label="Add" />
      </HeaderContainer>
      <SpecialAbilitiesContainer>
        {specialAbilities.map((specialAbility, i) => (
          <SpecialAbilityContainer key={i}>
            <SpecialAbilityHeaderRow>
              {`Special ability ${i + 1}`}
              <Button
                onClick={() => onDelete(i)}
                label="Delete"
                icon={Trash2}
              />
            </SpecialAbilityHeaderRow>
            <SpecialAbilitiesField
              specialAbility={specialAbility}
              updateAbility={(
                fieldToUpdate: SpecialAbilityFieldName,
                newValue: string,
              ) => onUpdate(fieldToUpdate, newValue, i)}
              index={i}
            />
          </SpecialAbilityContainer>
        ))}
      </SpecialAbilitiesContainer>
    </SectionContainer>
  );
};

const SectionContainer = styled.div`
  margin: 5px 0;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const SpecialAbilitiesContainer = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
`;

const SpecialAbilityContainer = styled.div`
  display: block;
`;

const SpecialAbilityHeaderRow = styled.div`
  display: flex;
  justify-content: center;
`;
