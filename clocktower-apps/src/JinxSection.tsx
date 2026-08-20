import { TextField } from "./components/TextField";
import { defaultJinx, type Jinx, type JinxFieldName } from "./types";

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
    <div>
      <div>Jinxes</div>
      <button onClick={onAdd}>Add</button>
      {jinxes.map((_, i) => (
        <div>
          <div>
            {`Jinx ${i + 1}`}
            <button onClick={() => onDelete(i)}>-</button>
          </div>
          <TextField
            fieldName="id"
            updateField={(newValue: string) => onUpdate("id", newValue, i)}
            maxLength={50}
            label="Character ID"
            required
          />
          <TextField
            fieldName="reason"
            updateField={(newValue: string) => onUpdate("reason", newValue, i)}
            maxLength={500}
            label="Reason"
            required
          />
        </div>
      ))}
    </div>
  );
};
