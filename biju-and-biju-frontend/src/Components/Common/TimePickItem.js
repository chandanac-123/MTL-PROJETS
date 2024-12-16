import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TimePicker } from "antd";
import dayjs from "dayjs";
const format = "HH:mm";

export default function TimePickItem(props) {
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    if (value && props.handleChange) {
      props.handleChange(value, props.name);
    }
  }, [value]);

  const handleDateTime = (e) => {
    setValue(e);
  };

  const disabledTime = (now) => {
    const currentHour = now.hour();
    return {
      disabledHours: () => [...Array(24).keys()].slice(currentHour + 1),
    };
  };

  return (
    <>
      {props?.verTime ? (
        <Container mr={props.mr}>
          <TimePicker
            disabledTime={disabledTime}
            format={format}
            size="large"
            onChange={handleDateTime}
            placeholder="HH:MM"
            name="appt"
            value={dayjs(value, format)}
            defaultValue={dayjs(value, format)}
            showNow={false}
            allowClear={false}
          />
          {props.required ? <ErrorMsg>*Mandatory Field </ErrorMsg> : null}
        </Container>
      ) : (
        <Container mr={props.mr}>
          <TimePicker
            format={format}
            size="large"
            onChange={handleDateTime}
            placeholder="HH:MM"
            name="appt"
            value={dayjs(value, format)}
            defaultValue={dayjs(value, format)}
            showNow={false}
            allowClear={false}
          />
          {props.required ? <ErrorMsg>*Mandatory Field </ErrorMsg> : null}
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: ${({ mr }) => (mr ? mr : "0px")};
  width: max-content;
`;
const ErrorMsg = styled.span`
  font-size: 12px;
  color: red;
`;
