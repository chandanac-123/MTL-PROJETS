import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectWithLabel } from './select';

export default function CustomeSelectSearch({ placeholder, constant = false, options, label }: any) {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <SelectWithLabel label={label}>
            <Select>
                <SelectTrigger className="w-full h-12" searchTerm={searchTerm}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent searchTerm={searchTerm} setSearchTerm={setSearchTerm}>
                    {options?.map((item: any) => (
                        <SelectItem key={item.id} value={item.id}>
                            {item.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </SelectWithLabel>
    );
}
