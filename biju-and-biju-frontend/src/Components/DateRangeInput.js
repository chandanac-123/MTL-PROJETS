import React, { useState, useEffect } from "react";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import styled from "styled-components";

function DateRangeInput(props) {
  // const [value, onChange] = useState([new Date(), new Date()]);

  const [value, setDateRange] = useState([
    props.from_date || "",
    props.to_date || "",
  ]);

  const handleDateRangeChange = (value) => {
    setDateRange(value);
  };

  useEffect(() => {
    if (props.setState && value) {
      props.setState((prevState) => {
        return {
          ...prevState,
          from_date: value[0],
          to_date: value[1],
        };
      });
    }
  }, [value]);

  useEffect(() => {
    if (props.is_reset) {
      setDateRange(null);
    }
  }, [props.is_reset]);
  return (
    <Container className={props.className}>
      <DateRangePickerItem
        className={props.className}
        onChange={handleDateRangeChange}
        value={value}
        clearIcon={null}
        format="dd/MM/y"
      />
    </Container>
  );
}

export default DateRangeInput;

const DateRangePickerItem = styled(DateRangePicker)`
  &.full-width {
    width: 100%;
  }
  & .react-daterange-picker__calendar {
    z-index: 999 !important;
  }
`;

const Container = styled.div`
  width: 80%;
  div {
    padding: 5px !important;
    border-radius: 4px !important;
    border-color: #d9d9d9 !important;
  }
  &.full-width {
    width: 100%;
  }
`;
