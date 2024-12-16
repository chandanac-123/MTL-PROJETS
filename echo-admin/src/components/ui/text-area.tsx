import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.InputHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  placeholder?: string;
  name?: string;
  handleChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  errors?: string;
  touched?: boolean;
  maxWords?: number; // Optional prop to set a max word limit
};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, title, placeholder, handleChange, name, errors, touched, maxWords = 1000, ...props },
    ref
  ) => {
    const [currentWordCount, setCurrentWordCount] = React.useState(0);

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = event.target.value;
      const words = value.trim().split(/\s+/).filter(Boolean);
      if (words.length <= maxWords) {
        setCurrentWordCount(words.length);
        handleChange?.(event);
      }
    };

    return (
      <div className="flex flex-col gap-2">
        {title && <label className="text-sm font-medium">{title}</label>}
        <textarea
          className={cn(
            "flex  w-full resize-none rounded-[20px] border-none bg-[#F4F4F4] px-6 py-4 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0",
            className
          )}
          onChange={handleInputChange}
          name={name}
          placeholder={placeholder}
          ref={ref}
          {...props}
          rows={4}
        />
        {errors && touched && <p className="text-text_error text-xs">{errors}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
