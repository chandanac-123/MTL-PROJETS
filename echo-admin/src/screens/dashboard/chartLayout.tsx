"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts"
import { useEffect, useState, Dispatch, SetStateAction } from "react";

import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart/chart"
import moment from "moment"
import { dateConversion } from "@/utils/helper";

// Chart configuration
const chartConfig = {
    sales: {
        label: "Sales",
        color: "#9D5A46",
    },
} satisfies ChartConfig


interface MonthlyData {
    total: number;
    increment: string;
}

interface ChartDataProps {
    [month: string]: MonthlyData;
}


export const BarchartLayout: React.FC<{
    data: ChartDataProps;
    setSalesofmonth: Dispatch<SetStateAction<Record<string, any>>>;
}> = ({ data, setSalesofmonth }) => {

    // if (!data || Object.keys(data).length === 0) {
    //     return <div></div>;
    // }

    const transformedData = Object.keys(data as ChartDataProps).map((key) => {
        const this_month = dateConversion(key, "MMMM");
        const monthKey = dateConversion(key, "MMM")?.toUpperCase();
        return {
            month: monthKey,
            sales: (data as ChartDataProps)[key],
            this_month: this_month
        };
    });

    const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

    useEffect(() => {
        if (Array.isArray(transformedData) && transformedData?.length != 0) {
            const currentMonthIndex = new Date().getMonth();
            const currentMonth = transformedData[currentMonthIndex]?.month || null;
            const currentMonthSales = transformedData?.find((current, i) => current?.month == currentMonth) ?? {}
            setSelectedMonth(currentMonth)
            setSalesofmonth(currentMonthSales);
        }
    }, []);

    const handleBarClick = (data: any) => {
        setSelectedMonth(data?.month);
        setSalesofmonth(data)
    };

    const maxSales = Math.max(...transformedData.map((entry) => entry.sales.total));

    return (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full max-w-[400px] overflow-hidden">
            <BarChart accessibilityLayer data={transformedData} barSize={17} barCategoryGap="30%" barGap={5} style={{ width: '100%', maxWidth: '100%' }}>
                <CartesianGrid vertical={false} horizontal={false} />
                <YAxis hide domain={[0, maxSales * 1.1]} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tick={{ fontSize: 12 }}
                    fill="#4A4A4A"
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <Bar dataKey="sales.total" radius={50} width={17}>
                    {transformedData.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={selectedMonth === entry?.month ? "#9D5A46" : "#EDEFEF"}
                            style={{ cursor: "pointer" }}
                            onClick={() => handleBarClick(entry)}
                        />
                    ))}
                </Bar>
            </BarChart>
        </ChartContainer>
    );
};
