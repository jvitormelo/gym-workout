import { FC, useId } from "react";

type Option = {
  value: string;
  label: string;
};

interface SelectProps {
  options: Option[];
  value?: string;
  name: string;
  onChange?: (value: string) => void;
  label?: string;
}

export const Select: FC<SelectProps> = ({
  options,
  onChange,
  name,
  value,
  label,
}) => {
  const id = useId();

  return (
    <div className="flex flex-col w-fit gap-2">
      {label && (
        <label htmlFor={id} className="dark:text-white">
          {label}
        </label>
      )}

      <select
        id={name}
        name={name}
        onChange={(event) => onChange && onChange(event.target.value)}
        value={value}
        className="p-3 rounded-sm"
      >
        {options.map((option) => (
          <option className="p-1" key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
