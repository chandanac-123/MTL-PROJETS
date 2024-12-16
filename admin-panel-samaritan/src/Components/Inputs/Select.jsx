import Select from 'react-select';

const customStyles = {
  control: (base, state) => ({
    ...base,
    background: '#EFEDE5',
    color: '#999999',
    border: 'none',
    borderRadius: '8px',
    boxShadow: state.isFocused ? null : null,
    fontWeight: '400',
    height: '40px', 
    minHeight: '40px'
  }),
};

const customFilterOption = (option, inputValue) => {
  if (!inputValue) return true;
  return option.label.toLowerCase().startsWith(inputValue.toLowerCase());
};

const SelectComponent = ({
  placeholder,
  options,
  name,
  onChange,
  value,
  isMulti,
  menuPlacement,
  touched,
  errors,
  constant,
  disabled = false,
  isClearable = true,
  className = '',
  icons = false
}) => {
  
  const mapOptions = options?.map((option) => ({
    value: option.id || option.value,
    label: option.name || option?.display_name || option?.full_name || option?.label
  }));

  return (
    <div className="relative w-full whitespace-nowrap">
      <Select
        styles={customStyles}
        placeholder={<div className={`font-inter text-sm font-semibold text-grey ${className}`}>{placeholder}</div>}
        options={constant ? options : mapOptions}
        name={name}
        onChange={onChange}
        value={value}
        isMulti={isMulti}
        isClearable={isClearable}
        isDisabled={disabled}
        menuPlacement={menuPlacement || 'auto'}
        filterOption={customFilterOption} // Adding the custom filter function here
      />
      {icons && (
        <div className="absolute top-0 right-0 w-10 h-9 flex justify-center items-center pointer-events-none bg-bg_white outline outline-1 rounded-r-lg outline-outline_grey">
          <img loading="lazy" src={icons} alt="" className="h-4" />
        </div>
      )}
      {touched && errors && (
        <div className="text-badge-red text-xs mt-1">
          <span role="alert">{errors}</span>
        </div>
      )}
    </div>
  );
};

export default SelectComponent;
