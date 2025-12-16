import { memo } from "react";

type ConsentCheckboxProps = {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const ConsentCheckbox = memo(
  ({ id, label, checked, onChange }: ConsentCheckboxProps) => {
    return (
      <label className="flex cursor-pointer items-center gap-2">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="cursor-pointer accent-indigo-500"
        />
        <span>{label}</span>
      </label>
    );
  },
);

ConsentCheckbox.displayName = "ConsentCheckbox";

export default ConsentCheckbox;
