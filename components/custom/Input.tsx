"use client";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  labelClass?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type = "text",
  required = true,
  disabled = false,
  className,
  labelClass,
  ...props
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className={cn(
          `
         block
         text-sm 
         font-medium 
         leading-6
        text-gray-900
        `,
          labelClass,
          {}
        )}
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          type={type}
          disabled={disabled}
          required={required}
          className={cn(
            `
          form_control 
          block 
          w-full 
          rounded
          border-[1px]
          border-gray-300/80
          py-1.5 
          pl-2
          text-gray-900 
          placeholder:text-gray-900 
          sm:text-sm 
          sm:leading-6`,
            className,
            {}
          )}
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;
