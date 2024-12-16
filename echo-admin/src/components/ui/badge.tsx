import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center whitespace-nowrap rounded-[6px] border-none px-2.5 py-0.5 text-xs",
  {
    variants: {
      variant: {
        active:
          "bg-bg_green text-badge_green",
        inactive:
          "bg-light_grey  text-badge_grey",
        new:
          "bg-light_sandal  text-badge_sandal",
        confirmed:
          "bg-light_blue  text-badge_blue",
        order_packing:
          "bg-light_sandal  text-badge_sandal",
        ready_for_shipment:
          "bg-extra_light_pink  text-badge_pink",
        out_for_delivery:
          "bg-light_orange  text-badge_orange",
        deleted:
          "bg-light_red  text-badge_red",
        low_stock: "bg-brown_bg  text-brown_text",
        out_stock: "bg-red_bg  text-text_error",
        order_summary:"bg-light_pink text-primary h-7",
        ticket_count:"bg-text_error text-bg_secondary rounded-xl h-[24px] w-24px",
        coupon_bg:'bg-light_orange text-badge_orange'
      },
    },
    defaultVariants: {
      variant: "active",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
