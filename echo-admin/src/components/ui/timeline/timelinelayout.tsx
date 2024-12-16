"use client";

import React from "react";
import {
	Timeline,
	TimelineItem,
	TimelineConnector,
	TimelineHeader,
	TimelineTitle,
	TimelineIcon,
	TimelineDescription,
	TimelineContent,
	TimelineTime,
	TimelineDayTime,
} from "@/components/ui/timeline/timeline";
import { dateConversion } from "@/utils/helper";

export interface TimelineElement {
	id: string;
	status: string;
	orderId: string;
	createdAt: string;
	updatedAt: string;
}

interface TimelineLayoutProps {
	items: TimelineElement[];
}


export const TimelineLayout = ({ items }: TimelineLayoutProps) => {
	return (
		<Timeline>
			{items?.map((timeline, i) => (
				<TimelineItem key={i}>
					{i < items.length - 1 && <TimelineConnector />}
					<TimelineHeader>
						<TimelineTime>{dateConversion(timeline?.updatedAt,'DD MMM YYYY')}</TimelineTime>
						<TimelineDayTime>{dateConversion(timeline?.updatedAt,'hh:mm A, dddd')}</TimelineDayTime>
						<TimelineIcon />
						<TimelineTitle>{timeline?.status}</TimelineTitle>
					</TimelineHeader>
					<TimelineContent>
						{timeline?.orderId && <TimelineDescription>{`Order ID : ${timeline?.orderId}`}</TimelineDescription>}
					</TimelineContent>
				</TimelineItem>
			))}
		</Timeline>
	);
};