import * as React from "react";
import { cn } from "@/lib/utils";

const Timeline = React.forwardRef<
	HTMLOListElement,
	React.HTMLAttributes<HTMLOListElement>
>(({ className, ...props }, ref) => (
	<ol ref={ref} className={cn("flex flex-col px-20 py-1", className)} {...props} />
));
Timeline.displayName = "Timeline";

const TimelineItem = React.forwardRef<
	HTMLLIElement,
	React.LiHTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
	<li
		ref={ref}
		className={cn("relative flex flex-col p-7 pt-0 [&>*]:mb-3", className)}
		{...props}
	/>
));
TimelineItem.displayName = "TimelineItem";

const TimelineTime = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
	<p
		ref={ref}
		className={cn(
			"absolute translate-x-36 md:-translate-x-24 text-sm font-normal leading-none text-secondary-foreground",
			className,
		)}
		{...props}
	/>

));
TimelineTime.displayName = "TimelineTime";

const TimelineDayTime = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "absolute text-badge_grey translate-x-36 md:-translate-x-24 text-xs font-normal leading-none mt-10 pt-4",
      className,
    )}
    {...props}
  />
));
TimelineDayTime.displayName = "TimelineDayTime";


const TimelineDay = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
	<p
		ref={ref}
		className={cn(
			"absolute translate-x-36 md:-translate-x-24 text-sm font-normal leading-none text-secondary-foreground",
			className,
		)}
		{...props}
	/>

));
TimelineDay.displayName = "TimelineDay";

const TimelineConnector = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			"absolute top-[25px] left-[78px] -translate-x-1/2 translate-y-2 h-[38px] w-[2px] bg-light_pink mt-0",
			className,
		)}
		{...props}
	/>
));
TimelineConnector.displayName = "TimelineConnector";

const TimelineHeader = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("flex items-center gap-4", className)}
		{...props}
	/>
));
TimelineHeader.displayName = "TimelineHeader";

const TimelineTitle = React.forwardRef<
	HTMLHeadingElement,
	React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
	<h3
		ref={ref}
		className={cn(
			"font-medium leading-none tracking-tight text-secondary-foreground text-sm",
			className,
		)}
		{...props}>
		{children}
	</h3>
));
TimelineTitle.displayName = "CardTitle";

const TimelineIcon = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			"flex items-center justify-center bg-light_pink rounded-xxl w-[20px] h-[20px] ms-10", // Outer circle
			className
		)}
		{...props}
	>
		{/* Inner circle */}
		<div className="bg-primary rounded-xxl w-[8px] h-[8px]" />
	</div>
));
TimelineIcon.displayName = "TimelineIcon";


const TimelineDescription = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
	<p
		ref={ref}
		className={cn("text-xs text-primary max-w-sm px-6 py-0 font-medium ml-7 whitespace-nowrap", className)}
		{...props}
	/>
));
TimelineDescription.displayName = "TimelineDescription";

const TimelineContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("flex flex-col items-start px-6 pt-0 pb-0", className)}
		{...props}
	/>
));
TimelineContent.displayName = "TimelineContent";

export {
	Timeline,
	TimelineItem,
	TimelineConnector,
	TimelineHeader,
	TimelineTitle,
	TimelineIcon,
	TimelineDescription,
	TimelineContent,
	TimelineTime,
	TimelineDay,
	TimelineDayTime,
};