import Select from 'react-select';

const customStyles = {
    control: (base, state) => ({
        ...base,
        background: "#F1F1F2",
        color: '#999999',
        border: 'none',
        borderRadius: '8px',
        boxShadow: state.isFocused ? null : null,
        fontWeight: '400'
    }),
};

const SelectField = ({ placeholder, options, name, onChange, value, isMulti, touched, errors, constant ,disabled=false ,isClearable=true}) => {

    const mapOptions = options?.map(option => ({
        value: option.id,
        label: option.name ||option?.state_name||option?.bank_name||option?.property_name,
    }))

    return (
        <div className='w-full whitespace-nowrap'>
            <Select
                styles={customStyles}
                placeholder={placeholder}
                options={constant ? options : mapOptions}
                name={name}
                onChange={onChange}
                value={value}
                isMulti={isMulti}
                isClearable={isClearable}
                isDisabled={disabled}
            />
            {touched && errors && (
                <div className='text-color-orange text-xs mt-1'>
                    <span role='alert'>{errors}</span>
                </div>
            )}
        </div>
    )
}

export default SelectField