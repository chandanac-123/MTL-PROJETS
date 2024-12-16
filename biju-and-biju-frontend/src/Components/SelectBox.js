import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styled from "styled-components";

export default function SelectBox(props) {
  let initial = "";
  if (props.default) {
    initial = 10;
  } else if (props.datas) {
    initial = props.datas[0].value;
  }
  let datas = props.datas;
  if (!datas) {
    datas = [
      {
        name: props.default ? props.default : "Ten",
        value: 10,
      },
      {
        name: "Twenty",
        value: 20,
      },
      {
        name: "Thirty",
        value: 30,
      },
    ];
  }
  const [value, setValue] = React.useState(initial);

  useEffect(() => {
    if (props.setValue) {
      props.setValue(value);
    }
  }, [value]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box sx={{ minWidth: props.min_width ? props.min_width : 212 }}>
      <FormControl fullWidth>
        <SelectInput
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          //   label="value"
          onChange={handleChange}
        >
          {/* <MenuItem value={10}>{props.default? props.default : "Ten"}</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
          {datas.map((i) => (
            <MenuItem value={i.value}>{i.name}</MenuItem>
          ))}
        </SelectInput>
      </FormControl>
    </Box>
  );
}

const SelectInput = styled(Select)`
  div[role="button"] {
    padding: 9.5px 14px;
  }
  fieldset {
    border-color: #d9d9d9 !important;
    border-width: 1px !important;
  }
`;
