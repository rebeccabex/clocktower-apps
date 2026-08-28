import styled from "styled-components";
import { Button } from "./components/Button";
import { TextField } from "./components/TextField";
import { defaultJinx, type Jinx, type JinxFieldName } from "./types";
import { Trash2 } from "lucide-react";

type JinxSectionProps = {
  jinxes: Array<Jinx>;
  addJinx: (newJinx: Jinx) => void;
  updateJinx: (
    fieldToUpdate: JinxFieldName,
    newValue: string,
    index: number,
  ) => void;
  removeJinx: (indexToRemove: number) => void;
};

export const JinxSection = ({
  jinxes,
  addJinx,
  updateJinx,
  removeJinx,
}: JinxSectionProps) => {
  const onAdd = () => addJinx(defaultJinx);
  const onUpdate = (field: JinxFieldName, newValue: string, index: number) =>
    updateJinx(field, newValue, index);
  const onDelete = (indexToRemove: number) => removeJinx(indexToRemove);

  return (
    <JinxesContainer>
      <HeaderContainer>
        <div>Jinxes</div>
        <Button onClick={onAdd} label="Add" />
      </HeaderContainer>
      {jinxes.map((jinx, i) => (
        <div key={i}>
          <JinxHeaderRow>
            {`Jinx ${i + 1}`}
            <Button onClick={() => onDelete(i)} label="Delete" icon={Trash2} />
          </JinxHeaderRow>
          <TextField
            fieldName="id"
            updateField={(newValue: string) => onUpdate("id", newValue, i)}
            value={jinx.id}
            maxLength={50}
            label="Character ID"
            required
            displayTooltip={true}
            tooltipId={`jinx-${i}-id`}
            tooltipContent="The ID of the character this character is jinxed with"
          />
          <TextField
            fieldName="reason"
            updateField={(newValue: string) => onUpdate("reason", newValue, i)}
            value={jinx.reason}
            maxLength={500}
            label="Reason"
            required
            displayTooltip={false}
          />
        </div>
      ))}
    </JinxesContainer>
  );
};

const JinxesContainer = styled.div`
  margin: 5px 0;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const JinxHeaderRow = styled.div`
  display: flex;
  justify-content: center;
`;
