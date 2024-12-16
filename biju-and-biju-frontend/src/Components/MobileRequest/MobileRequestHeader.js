import styled from "styled-components";
import React from "react";
import RadioGroups from "../RadioGroups";
import SearchInput from "../Common/SearchInput";

function MobileRequestHeader({
  handleSearch,
  filter_datas,
  handleRadioChange,
  state,
}) {
  return (
    <Container>
      <>
        <FilterContainer>
          <RadioGroups
            datas={filter_datas}
            handleChange={handleRadioChange}
            value={state.filter_option}
            name="filter_option"
          />
        </FilterContainer>
        <SearchInput handleSearch={handleSearch} value={state.searchValue} />
      </>
    </Container>
  );
}

export default MobileRequestHeader;

const Container = styled.div`
  margin-bottom: 10px;
  margin-top: 20px;
`;

const FilterContainer = styled.div`
  box-shadow: 0px 2px 10px 0px #00000033;
  border-radius: 4px;
  color: #ffffff;
  background-color: #ffffff;
  padding: 10px;
  margin-bottom: 10px;
`;
