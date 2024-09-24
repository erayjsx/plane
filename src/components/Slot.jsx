import { Checkbox, Field, Label } from "@headlessui/react";
import React from "react";

const Slot = ({
  checked = false,
  onChange,
  labelText = "05.00 AM - 11.59 AM",
  checkboxClassName = "",
  labelClassName = "",
  fieldClassName = "",
}) => {
  return (
    <>
      <Field
        className={`flex gap-2 cursor-pointer items-center ${fieldClassName}`}
      >
        <Checkbox
          checked={checked}
          onChange={onChange}
          className={`group size-3 outline-none rounded-full bg-white p-1 ring-1 border border-primary ring-white/15 ring-inset data-[checked]:bg-primary ${checkboxClassName}`}
        ></Checkbox>
        <Label className={`cursor-pointer text-zinc-600 ${labelClassName}`}>
          <p>{labelText}</p>
        </Label>
      </Field>
    </>
  );
};

export default Slot;
