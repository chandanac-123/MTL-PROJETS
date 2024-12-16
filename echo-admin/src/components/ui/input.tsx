'use client'
import * as React from "react"
import { cn } from "@/lib/utils"
import Image from "next/image";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  placeholder?: string;
  name?: string;
  handleChange?: any;
  errors?: string;
  touched?: boolean;
  icon?: any
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, placeholder, name, handleChange, errors, touched, disabled = false, icon, ...props }, ref) => {

    return (
      <div className="flex flex-col gap-2 relative">
        <label className="text-base text-textblack">{label}</label>

        {icon && (
          <div className="w-10 absolute top-10 left-0 h-9 flex gap-2 justify-center items-center pointer-events-none border-r border-outline_grey">
            <Image src={icon} alt="" />
          </div>
        )}

        <input
          type={type}
          className={cn(
            "flex h-full w-full rounded-lg border-none bg-inputbg px-4 py-3 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:border-none",
            icon ? "pl-12" : "pl-4", // Conditional padding based on icon presence
            className
          )}
          ref={ref}
          placeholder={placeholder}
          onChange={handleChange}
          name={name}
          {...props}
          disabled={disabled}
        />
        {errors && touched && <p className="text-text_error text-xs">{errors}</p>}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
