import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface ReactDatepickerProps {
    selectedDate?: Date | null;
    startDate?: Date | null;
    endDate?: Date | null;
    onDateChange?: (date: Date | [Date | null, Date | null] | null) => void;
    placeholderText?: string;
    label?: string;
    dateRange?: boolean;
    [key: string]: any;
    className?: string;
    errors?: string;
    touched?: boolean;
    disableFutureDate?: boolean;
    disablePastDate?:boolean
}

const ReactDatepicker: React.FC<ReactDatepickerProps> = ({
    selectedDate,
    startDate,
    endDate,
    onDateChange,
    placeholderText = "MM/DD/YYYY",
    label,
    className,
    errors,
    touched,
    dateRange = false,
    disableFutureDate,
    disablePastDate,
    ...props
}) => {
    const [internalStartDate, setInternalStartDate] = useState<Date | null>(startDate ?? selectedDate ?? null);
    const [internalEndDate, setInternalEndDate] = useState<Date | null>(endDate ?? null);

    const handleDateChange = (date: Date | [Date | null, Date | null] | null) => {
        if (dateRange) {
            const [start, end] = Array.isArray(date) ? date : [date, null];
            setInternalStartDate(start);
            setInternalEndDate(end);
            if (onDateChange) {
                onDateChange([start, end])
            }
        } else {
            const singleDate = date instanceof Date ? date : null;
            setInternalStartDate(singleDate);
            if (onDateChange) {
                onDateChange(singleDate);
            }
        }
    };

    return (
        <div className="relative">
            {label && <label className="block text-gray-700 mb-2">{label}</label>}
            <DatePicker
                selected={internalStartDate ?? undefined}
                startDate={dateRange ? (internalStartDate ?? undefined) : undefined}
                endDate={dateRange ? (internalEndDate ?? undefined) : undefined}
                onChange={handleDateChange}
                placeholderText={placeholderText}
                className={`${className} h-12 rounded-[30px] pl-4  focus:outline-none focus:ring-0`}
                selectsRange={dateRange as true}
                dateFormat="dd/MM/yyyy"
                isClearable
                minDate={disablePastDate ? new Date() : undefined}
                maxDate={disableFutureDate ? new Date() : undefined}
                {...props}
            />
            {errors && touched && <p className="text-text_error text-xs">{errors}</p>}
        </div>
    );
};


export default ReactDatepicker;
