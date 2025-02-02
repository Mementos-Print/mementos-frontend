import * as RadioGroup from "@radix-ui/react-radio-group";
import React from "react";
import { DropdownWithRadioProps } from "../../types/type";

const DropdownWithRadio: React.FC<DropdownWithRadioProps> = ({
  options,
  defaultValue,
  onChange,
}) => {
  return (
    <form className="w-fit bg-[#FAFAFA] p-4 shadow-[0_2px_15px] shadow-shadow shadow-opacity-50 rounded-lg">
      <RadioGroup.Root
        className="flex flex-col gap-2.5"
        defaultValue={defaultValue}
        aria-label="View density"
        onValueChange={onChange}
      >
        {options.map((option) => (
          <div
            key={option.value}
            className="inline-flex flex-row justify-between items-center p-2 bg-[#FAFAFA] rounded-lg w-[272px] hover:bg-dropdown"
          >
            <RadioGroup.Item
              className="cursor-pointer w-5 h-5 rounded-full bg-transparent border border-primary outline-none focus:ring-2 focus:ring-secondary hover:border-secondary hover:bg-secondary hover:outline-secondary hover:border-white"
              value={option.value}
              id={option.value}
            >
              <RadioGroup.Indicator className="relative flex h-full w-full items-center justify-center after:block after:w-[11px] after:h-[11px] after:rounded-full after:border-secondary after:bg-secondary after:outline-secondary after:border-white" />
            </RadioGroup.Item>
            <label
              className="pl-[15px] text-[15px] leading-none text-primary"
              htmlFor={option.value}
            >
              {option.label}
            </label>
          </div>
        ))}
      </RadioGroup.Root>
    </form>
  );
};

export default DropdownWithRadio;

//Usage
{/* const [selectedValue, setSelectedValue] = useState("item1");

<DropdownWithRadio
  options={options}
  defaultValue={selectedValue}
  onChange={(value) => {
     setSelectedValue(value);
  }}
/>

<p className="mt-4">
     Selected Option: <strong>{selectedValue}</strong>
</p> */}