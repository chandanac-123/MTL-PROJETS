'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import close_icon from '@public/icons/color-close.svg';
import search_icon from '@public/icons/search.svg';

const customStyles = {
    control: (base: any, state: any) => ({
        ...base,
        background: "#F1F1F2",
        color: '#999999',
        border: 'none',
        borderRadius: '60px',
        boxShadow: state.isFocused ? 'none' : null,
        fontWeight: '400',
        minHeight: '48px',
        paddingLeft: '26px',
    }),

    dropdownIndicator: (base: any) => ({
        ...base,
        display: 'none'
    }),

    option: (base: any, state: any) => ({
        ...base,
        backgroundColor: '#F1F1F2',
        color: '#333333',
        border: 'none',
        '&:hover': {
            backgroundColor: ' #EDE7DB',
            color: '#333333',
        },
    }),

    placeholder: (base: any) => ({
        ...base,
        paddingLeft: 8,
        color: '#999999', // Customize the placeholder color here
    }),
};

const customTheme = (theme: any) => ({
    ...theme,
    colors: {
        ...theme.colors,
        primary25: '#EDE7DB', // color when option is hovered
    },
});

export default function OptionOutsideSelect({
    placeholder,
    label,
    constant = false,
    errors,
    onChange,
    touched,
    value,
    name,
    formik,
    options,
    isMulti = false,
    disabled = false,
    isClearable = false,
}: any) {
    const [selectedItems, setSelectedItems] = useState<any[]>([]);

    useEffect(() => {
        setSelectedItems(value);
    }, [value]);

    const mapOptions = options?.map((option: any) => ({
        value: option,
        label: option.name,
    }));

    // Filter out selected items from the options list
    const filteredOptions = mapOptions?.filter(
        (option: any) => !selectedItems?.some((item: any) => item.id === option.value.id)
    );

    const handleChange = (selectedOption: any) => {
        const selectedValue = isMulti
            ? selectedOption?.map((option: any) => option.value)
            : selectedOption?.value;
        onChange(selectedValue);
        setSelectedItems(selectedOption || []);
    };

    const handleRemove = (itemToRemove: any) => {
        const updatedItems = selectedItems.filter((item: any) => item !== itemToRemove);
        setSelectedItems(updatedItems);
        formik.setFieldValue('bannerProducts', updatedItems)
    };

    return (
        <div className="flex flex-col gap-2 w-full whitespace-nowrap relative">
            <label className="text-base text-textblack">{label}</label>
            <div className="absolute inset-y-1 left-0 top-9 h-10 flex items-center pl-4 pointer-events-none">
                <Image loading="lazy" src={search_icon} alt="" className='z-10' />
            </div>
            <Select
                styles={customStyles}
                theme={customTheme}
                placeholder={placeholder}
                options={constant ? options : filteredOptions}
                name={name}
                onChange={handleChange}
                value={
                    isMulti
                        ? mapOptions?.filter((option: any) => value?.includes(option.value))
                        : mapOptions?.find((option: any) => option?.value === value)
                }
                isMulti={isMulti}
                isClearable={isClearable}
                isDisabled={disabled}
                controlShouldRenderValue={!isMulti}
            />

            {errors && touched && <p className="text-text_error text-xs">{errors}</p>}

            {/* Display selected items outside the Select component */}
            {selectedItems && (
                <div className="selected-items-container grid grid-cols-6 gap-2 mb-4">
                    {selectedItems.map((item: any, index: number) => {
                        const imageFilter = item?.ProductImages?.find(
                            (img: any) => img?.isPrimary === true
                        )?.imageUrl;

                        return (
                            <div
                                key={index}
                                className="bg-bg_primary p-3 w-30 rounded-base flex flex-col justify-between"
                            >
                                <div className="flex justify-end">
                                    <Image
                                        src={close_icon}
                                        alt="Remove"
                                        onClick={() => handleRemove(item)} // Add the remove handler
                                        className="cursor-pointer"
                                    />
                                </div>
                                <div className="flex flex-col justify-center items-center gap-1">
                                    <Image src={imageFilter} alt="" width={60} height={60} className='object-cover' />
                                    <span
                                        className="font-normal text-xs break-all whitespace-normal text-center min-h-8">
                                        {item?.name?.length > 25
                                            ? `${item?.name.slice(0, 25)}...`
                                            : item?.name}
                                    </span>
                                </div>
                                <div className="flex justify-center align-bottom">
                                    <span className="font-semibold text-sm">
                                        £{parseFloat(item?.price)?.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
