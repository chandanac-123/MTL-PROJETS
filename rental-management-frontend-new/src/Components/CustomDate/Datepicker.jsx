import { DatePicker } from 'antd'
import dayjs from 'dayjs';
import React from 'react'

const Datepicker = ({ onChange, picker, value, errors = false, format = "DD/MM/YYYY", name = "", futureDisable = false, pastDisable = false }) => {

  function handleDateChange(e) {
    onChange(e?.$d?.toLocaleDateString("fr-CA"), name)
  }

  const disabledFutureDate = current => {
    return current && current.valueOf() > Date.now();
  };

  const disabledPastDate = current => {
    const currentDay = dayjs();
    return current && (current.isBefore(currentDay.startOf('month')) || current.isSame(currentDay, 'month'));
  };
  

  return (
    <div className='w-full'>
      <DatePicker
        disabledDate={futureDisable ? disabledFutureDate : pastDisable ? disabledPastDate : ""}
        picker={picker}
        onChange={handleDateChange}
        format={format}
        defaultValue={value ? dayjs(value) : ''}
        className='bg-search-bg-color outline-none border-none h-10 text-xl rounded-lg focus:border-color-white active:border-color-white w-full  p-2.5'
      />
      <div className='text-color-orange text-xs mt-1'>
        <span role='alert'>{errors}</span>
      </div>
    </div>
  )
}

export default Datepicker