
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
    indicatorSeparator: () => ({
        display: 'none'
    }),
    dropdownIndicator: (base: any) => ({
        ...base,
        display: 'none'
    }),
    multiValue: (base: any) => ({
        ...base,
        backgroundColor: '#EDE7DB',
        borderRadius: '10px',
        alignItems: 'center',
        padding: 'inherit',
        fontSize:'medium'
    }),
    multiValueLabel: (base: any) => ({
        ...base,
        color: '#222222',
    }),
    multiValueRemove: (base: any) => ({
        ...base,
        display:'none'
    }),
};

export default function MuiltiInputView({ placeholder, label, constant = false, errors, onChange, touched, value, name, options, isMulti, disabled = false, isClearable = true }: any) {

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
