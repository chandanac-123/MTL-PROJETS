import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import styled from "styled-components";

export default function RadioGroups(props) {
  let datas = [];

  if (props.datas) {
    datas = props.datas;
  }

  return (
    <RadioContainer ml={props.ml}>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        {datas.map((i, index) => (
          <FormLabel
            fsize={props.fsize}
            fweight={props.fweight}
            mr={props.mr}
            ssize={props.ssize}
            value={i.name}
            disabled={i.disabled}
            key={index}
            control={
              <Radio
                checked={i.name == props.value ? true : false}
                onChange={() =>
                  props.handleChange
                    ? props.handleChange(i.name, props.name)
                    : null
                }
              />
            }
            label={i.label}
          />
        ))}
      </RadioGroup>
    </RadioContainer>
  );
}

const RadioContainer = styled(FormControl)`
  margin-left: ${({ ml }) => (ml ? ml : "18px !important")};
  color: #444445;
  font-weight: 500;
`;
const FormLabel = styled(FormControlLabel)`
  &.MuiFormControlLabel-root.MuiFormControlLabel-labelPlacementEnd.RadioGroups__FormLabel-sc-j97ftw-1 {
    margin-right: ${({ mr }) => (mr ? mr : "10px")};
  }
  span {
    font-weight: ${({ fweight }) => (fweight ? fweight : "500 !important")};
    font-size: ${({ fsize }) => (fsize ? fsize : "16px")};
    &.MuiButtonBase-root {
      color: #132756 !important;
    }
  }
  svg {
    width: ${({ ssize }) => (ssize ? ssize : "1em")};
    height: ${({ ssize }) => (ssize ? ssize : "1em")};
  }
`;
