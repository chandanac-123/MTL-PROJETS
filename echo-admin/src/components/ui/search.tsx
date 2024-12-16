'use client'
import * as React from "react"
import { cn } from "@/lib/utils"
import serach_icon from '@public/icons/search.svg'
import Image from "next/image";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    placeholder?: string;
    name?: string;
    handleChange?: any;
    errors?: string;
    touched?: boolean
}

const Search = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, label, placeholder, name, handleChange, errors, touched, ...props }, ref) => {

        return (
            <div className="flex flex-col relative">
                <div className="absolute inset-y-1 left-0 h-10 flex items-center pl-4 pointer-events-none">
                    <Image loading="lazy" src={serach_icon} alt="" />
                </div>
                <input
                    type={type}
                    className={cn(
                        "flex  w-full rounded-lg border-none bg-bg_primary px-2 py-3 text-sm pl-11 focus-visible:outline-none focus-visible:border-none",
                        className
                    )}
                    ref={ref}
                    placeholder='Search'
                    onChange={handleChange}
                    name={name}
                    {...props}
                />
                {errors && touched && <p className="text-text_error text-xs">{errors}</p>}
            </div>
        )
    }
)
Search.displayName = "Search"

export { Search }
