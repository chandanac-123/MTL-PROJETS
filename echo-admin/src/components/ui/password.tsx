'use client'
import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import eyeicon from '@public/icons/eye.svg'
import eyeslash from '@public/icons/eye-slash.svg'
import Image from "next/image";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  name?: string;
  handleChange?: any;
  errors?: string;
  touched?: boolean
}

const Password = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, placeholder, name, handleChange, errors, touched, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="flex flex-col gap-2 relative">
        {label && <label className="text-base text-textblack">{label}</label>}
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : type}
            className={cn(
              "flex h-full w-full rounded-lg border-none bg-inputbg px-3 py-4 text-sm placeholder:text-slate-500 focus-visible:outline-none",
              className
            )}
            ref={ref}
            placeholder={placeholder}
            onChange={handleChange}
            name={name}
            {...props}
          />
          {type === "password" && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <Image src={eyeicon} alt="" className="h-5 w-5" /> : <Image src={eyeslash} alt="" className="h-5 w-5" />}
            </button>
          )}
        </div>
        {errors && touched && <p className="text-text_error text-xs">{errors}</p>}
      </div>
    );
  }
);

Password.displayName = "Password";

export { Password };
