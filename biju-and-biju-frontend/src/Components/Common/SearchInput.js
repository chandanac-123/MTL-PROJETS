import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import InputAdornment from "@mui/material/InputAdornment";
import useDebounce from "../../common/hooks/useDebounce";

function SearchInput({ handleSearch, value }) {
  const [searchText, setSearchText] = useState(value || "");

  const searchExp = useDebounce(searchText, 500);

  useEffect(() => {
    handleSearch(searchExp);
  }, [searchExp]);

  return (
    <SectionDiv>
      <TextInput
        id="outlined-start-adornment"
        sx={{ m: 0, width: "100%" }}
        value={searchText}
        placeholder="Search"
        onChange={(e) => setSearchText(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <img
                src={require("../../Assets/images/searchfilter.png")}
                alt=""
              />
            </InputAdornment>
          ),
          inputProps: { maxLength: 100 },
        }}
      />
    </SectionDiv>
  );
}

export default SearchInput;

const SectionDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TextInput = styled(TextField)`
  fieldset {
    border-color: #132756 !important;
    border-width: 2px !important;
    color: #001b54 !important;
    border-radius: 4px;
    opacity: 0.7;
  }
  input {
    padding: 9.5px;
    padding-left: 20px;
    ::placeholder {
      color: #132756 !important;
      font-weight: 600;
      font-size: 12px;
      opacity: 1 !important;
    }
  }
  img {
    margin-right: 13px;
  }
`;
