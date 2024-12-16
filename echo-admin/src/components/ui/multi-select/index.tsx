
import Select from 'react-select';

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
    }),
    clearIndicator: (base: any) => ({
        ...base,
        display: 'none'
    }),
    indicatorSeparator: () => ({
        display: 'none'
    }),
    dropdownIndicator: (base: any) => ({
        ...base,
        color: '#686868',
        marginRight: '10px'
    }),
    multiValue: (base: any) => ({
        ...base,
        backgroundColor: '#EDE7DB',
        borderRadius: '10px',
        alignItems: 'center',
        padding: 'inherit',

    }),
    multiValueLabel: (base: any) => ({
        ...base,
        color: '#333333',
    }),
    multiValueRemove: (base: any) => ({
        ...base,
        color: '#EDE7DB',
        background: '#9D5A46',
        borderRadius: '16px',
        height: '20px',
        width: '20px',
        cursor: 'pointer',
        ':hover': {
            color: '#EDE7DB',
            background: '#9D5A46',
        },
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
    singleValue: (base: any, state: any) => ({
        ...base,
        color: '#333333',
    }),
    placeholder: (base: any) => ({
        ...base,
        color: '#999999', // Customize the placeholder color here
    }),
};

const customTheme = (theme: any) => ({
    ...theme,
    colors: {
        ...theme.colors,
        primary25: '#EDE7DB',  // color when option is hovered
    },
});

export default function SelectField({ placeholder, label, constant = false, errors, onChange, touched, value, name, options, isMulti, disabled = false, isClearable = true }: any) {

    const mapOptions = options?.map((option: any) => ({
        value: option.id,
        label: option.name || option.label,
    }))

    const handleChange = (selectedOption: any) => {
        const selectedValue = isMulti
            ? selectedOption?.map((option: any) => option.value)
            : selectedOption?.value;
        onChange(selectedValue);
    };

    return (
        <div className='flex flex-col gap-2 w-full whitespace-nowrap '>
            <label className="text-base text-textblack">{label}</label>
            <Select
                styles={customStyles}
                theme={customTheme}
                placeholder={placeholder}
                options={constant ? options : mapOptions}
                name={name}
                onChange={handleChange}
                value={
                    isMulti
                        ? mapOptions?.filter((option: any) => value?.includes(option?.value)) // Handles multi-select as an array of strings
                        : mapOptions?.find((option: any) => option?.value === value) // Handles single-select
                }
                isMulti={isMulti}
                isClearable={isClearable}
                isDisabled={disabled}
            />
            {errors && touched && <p className="text-text_error text-xs">{errors}</p>}
        </div>
    )
}
