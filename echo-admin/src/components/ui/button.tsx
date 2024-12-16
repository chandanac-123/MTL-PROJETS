'use client'
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Spinner } from "./spinner";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ",
  {
    variants: {
      variant: {
        default: "bg-secondary text-bg_secondary rounded-lg text-base font-semibold h-full w-full",
        destructive: "text-primary",
        outline: "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        secondary: "bg-primary text-bg_secondary hover:bg-slate-100/80 rounded-sm",
        ghost: "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50 cursor-pointer",
        link: "text-primary underline-offset-4 underline",
        add_button: "bg-primary h-10 text-bg_secondary w-full",
        cancel: 'bg-light_pink text-bg_secondary w-full text-black',
        view_invoice: "bg-light_pink h-10 text-secondary w-full",
        confirm_order: "bg-badge_green h-10 text-bg_secondary w-full",
        add_credit: "bg-light_pink h-10 text-secondary w-full text-sm",
        delete_coupon: "border border-[#959595] bg-none h-10 text-secondary"
      },
      size: {
        default: "h-full px-3 py-4 ",
        sm: "px-2",
        page: "rounded-xs h-8 w-8",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        add: 'px-4 py-6 rounded-xxxl',
        modal: 'px-4 py-3 rounded-xxxl',
        save: 'py-2',
        settings_save: 'w-60',
        edit_btn: 'h-50 w-78'
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  label?: string;
  loader?: boolean;
  icon?: React.ReactElement<HTMLImageElement>;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, label, icon, disabled, loader, onClick, ...props }, ref) => {

    const Comp = asChild ? Slot : "button";


    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        onClick={onClick}
        disabled={disabled}
      >
        {loader && disabled ? <Spinner /> : <>{label}{icon}</>}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
