import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import date_icon from '../../assets/date.svg';
import dateicon from '../../assets/dateicon.svg';

const Datepicker = ({ onChange, picker, value, errors, format = 'DD/MM/YYYY', name = '', touched, pastDisable = false, donationTable = false }) => {
  function handleDateChange(e) {
    onChange(e?.$d?.toLocaleDateString('fr-CA'), name);
  }

  const disabledPastDate = (current) => {
    const currentDay = dayjs();
    return current && current.isBefore(currentDay.startOf('day')) || current.isSame(currentDay, "day");
  };

  return (
    <div className="w-full">
      {donationTable ?
        <DatePicker
          picker={picker}
          disabledDate={pastDisable ? disabledPastDate : ''}
          onChange={handleDateChange}
          format={format}
          variant="filled"
          value={value ? dayjs(value) : ''}
          suffixIcon={
            <div className="w-10 absolute -top-2 -right-3 h-9 flex justify-center items-center pointer-events-none bg-bg_grey rounded-r-lg ">
              <img loading="lazy" src={dateicon} alt="" className="w-5 absolute " />
            </div>
          }
          className="bg-bg_grey  outline-none border-none h-10 text-xl rounded-lg w-full p-2.5"
        /> : <DatePicker
          picker={picker}
          disabledDate={pastDisable ? disabledPastDate : ''}
          onChange={handleDateChange}
          format={format}
          variant="filled"
          value={value ? dayjs(value) : ''}
          suffixIcon={
            <div className="w-10 absolute -top-2 -right-3 h-9 flex justify-center items-center pointer-events-none bg-bg_white outline outline-1 rounded-r-lg outline-outline_grey">
              <img loading="lazy" src={date_icon} alt="" className="w-5 absolute " />
            </div>
          }
          className="bg-btn_grey focus-within:bg-btn_grey outline-none border-none h-10 text-xl rounded-lg w-full p-2.5"
        />
      }

      {touched && errors && (
        <div className="text-badge-red text-xs mt-1">
          <span role="alert">{errors}</span>
        </div>
      )}
    </div>
  );
};

export default Datepicker;
