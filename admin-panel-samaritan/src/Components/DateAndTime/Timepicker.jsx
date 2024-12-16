import { TimePicker } from 'antd';
import React from 'react';
import time_icon from '../../assets/time.svg';
import dayjs from 'dayjs';

const Timepicker = ({ onChange, startTime, value, errors, name = '', touched }) => {

  const disabledTime = () => {
    const currentHour = dayjs(startTime).hour();
    const currentMinute = dayjs(startTime).minute();
    const disabledHours = () => {
      if (startTime) {
        return [...Array(currentHour).keys()]; // Convert to 12-hour format and disable hours before the current hour
      }
      return [];
    };

    const disabledMinutes = (hour) => {
      if (startTime && hour === currentHour) {
        return [...Array(currentMinute + 1).keys()]; // Disable minutes before the current minute if hour matches
      }
      return [];
    };

    return {
      disabledHours,
      disabledMinutes
      // You can include disabledSeconds and disabledMilliseconds if needed
    };
  };

  return (
    <div className="w-full">
      <TimePicker
        use12Hours={true}
        format="h:mm A"
        showNow={false}
        onChange={onChange}
        value={value ? dayjs(value) : ''}
        name={name}
        variant="filled"
        hideDisabledOptions={true}
        disabledTime={disabledTime}
        changeOnScroll
        needConfirm={false}
        suffixIcon={
          <div className="w-10 absolute -top-2 -right-2.5 h-9 flex justify-center items-center pointer-events-none bg-bg_white outline outline-1 rounded-r-lg outline-outline_grey">
            <img loading="lazy" src={time_icon} alt="" className="w-5" />
          </div>
        }
        className="bg-btn_grey focus-within:bg-btn_grey outline-none border-none h-10 text-xl rounded-lg  w-full p-2.5"
      />
      {touched && errors && (
        <div className="text-badge-red text-xs mt-1">
          <span role="alert">{errors}</span>
        </div>
      )}
    </div>
  );
};

export default Timepicker;
