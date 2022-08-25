import React from "react";
import { useController } from "react-hook-form";

const Input = ({ name, type = "text", control, ...props }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });

  return (
    <input
      id={name}
      type={type}
      {...field}
      {...props}
      className="px-2 py-3 rounded-md border-2 border-hanPurple bg-transparent focus:border-mediumPurple"
    />
  );
};

export default Input;
