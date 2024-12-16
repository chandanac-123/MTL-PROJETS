import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styled from "styled-components";

export default function SelectBoxLabel(props) {
  const value = props.value;
  const datas = props.datas;
  const handleChange = (event) => {
    let val = event.target.value;
    props.handleChange(val, props.name);
  };
  // const ShowRenderValue = (val) => {
  //   let name = props.vendor_list.filter((i) => i.id === val)[0].name;
  //   return name;
  // };

  return (
    <Box sx={{ minWidth: props.min_width ? props.min_width : 212 }}>
      {props.title ? (
        <Label variant="standard" htmlFor="uncontrolled-native">
          {props.title}
        </Label>
      ) : null}
      <FormControl fullWidth>
        <SelectInput
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value ? value : ""}
          onChange={handleChange}
          fpadding={props.fpadding}
          fsize={props.fsize}
          fwidth={props.fwidth}
          displayEmpty
          // renderValue={(value) => (value !== '' ? ShowRenderValue(value) : props.default)}
        >
          {props.selectType == "ProductName" &&
            datas?.map((i, index) => (
              <MenuItem value={i.id} key={index}>
                {i.product_name}
              </MenuItem>
            ))}
          {props.selectType == "EmployeeName" &&
            datas?.map((i, index) => (
              <MenuItem value={i.id} key={index}>
                {i.name || i.employee_name}
              </MenuItem>
            ))}
          {props.selectType == "UserName" &&
            datas?.map((i, index) => (
              <MenuItem value={i.id} key={index}>
                {i.employee_name}
              </MenuItem>
            ))}
          {props.selectType == "Comment" &&
            datas?.map((i, index) => (
              <MenuItem value={i.id} key={index}>
                {i.comment}
              </MenuItem>
            ))}
          {props.selectType == "VendorEmployeeName" &&
            datas?.map((i, index) => (
              <MenuItem value={i} key={index}>
                {i.employee_name}
              </MenuItem>
            ))}
          {props.selectType == "FieldAgentName" &&
            datas?.map((i, index) => (
              <MenuItem value={i} key={index}>
                {i.fieldagent_name}
              </MenuItem>
            ))}
          {props.selectType == "name" &&
            datas?.map((i, index) => (
              <MenuItem value={i.id} key={index}>
                {i.name}
              </MenuItem>
            ))}
        </SelectInput>
        {props.required ? <ErrorMsg>*Please select a value </ErrorMsg> : null}
      </FormControl>
    </Box>
  );
}

const ErrorMsg = styled.span`
  font-size: 12px;
  color: red;
  margin-left: 16px;
`;

const Label = styled(InputLabel)`
  color: #444445 !important;
  font-size: 10px !important;
  font-weight: 600 !important;
  margin-bottom: 8px !important;
`;

const SelectInput = styled(Select)`
  width: ${({ fwidth }) => (fwidth ? fwidth : "unset")};
  div[role="button"] {
    /* padding: 6.5px 14px; */
    padding: ${({ fpadding }) => (fpadding ? fpadding : "6.5px 14px")};
    font-size: ${({ fsize }) => (fsize ? fsize : "10px !important")};
    /* font-size: 10px !important; */
  }
  fieldset {
    border-color: #d9d9d9 !important;
    border-width: 1px !important;
    border-radius: 6px !important;
  }
`;
