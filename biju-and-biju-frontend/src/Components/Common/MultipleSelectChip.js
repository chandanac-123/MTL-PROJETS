import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import styled from "styled-components";
import { get_name_by_id } from "../../Functions/utils";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip(props) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    // setPersonName(
    //   typeof value === 'string' ? value.split(',') : value,
    // );
    let val = typeof value === "string" ? value.split(",") : value;
    props.handleChange(val, props.name);
  };

  return (
    <div>
      <FormControl
        sx={{ minWidth: props.min_width ? props.min_width : 377 }}
        fullWidth
      >
        {/* <InputLabel id="demo-multiple-chip-label">Chip</InputLabel> */}
        <SelectInput
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={props.value}
          onChange={handleChange}
          fpadding={props.fpadding}
          fsize={props.fsize}
          fwidth={props.fwidth}
          displayEmpty
          input={<OutlinedInput id="select-multiple-chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={get_name_by_id(props.datas, value)} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {props.datas.map((i, index) => (
            <MenuItem
              key={index}
              value={i.id}
              style={getStyles(i.id, props.value, theme)}
            >
              {i.name}
            </MenuItem>
          ))}
        </SelectInput>
        {props.required ? <ErrorMsg>*Mandatory Field </ErrorMsg> : null}
      </FormControl>
    </div>
  );
}

const ErrorMsg = styled.span`
  font-size: 12px;
  color: red;
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
