import styled from "styled-components";
import React from "react";
import SearchInput from "../Common/SearchInput";
import FilterBox from "../FilterBox";
import { RefreshButton } from "../RefreshButton";

function ReportSubmittedHeader({
  handleSearch,
  fi_types,
  isfilter,
  setFilter,
  state,
  setState,
  handleFilter,
  handleSelectChange,
  handleReset,
  handleRefresh,
}) {
  return (
    <Container>
      <SearchInput handleSearch={handleSearch} value={state.searchValue} />
      <ButtonContainer>
        <RefreshButton onClick={handleRefresh} />
        <FilterBoxItem
          fi_types={fi_types}
          isfilter={isfilter}
          setFilter={setFilter}
          state={state}
          setState={setState}
          handleFilter={handleFilter}
          handleSelectChange={handleSelectChange}
          handleReset={handleReset}
          class="full-width"
        />
      </ButtonContainer>
    </Container>
  );
}

export default ReportSubmittedHeader;

const Container = styled.div`
  margin-bottom: 10px;
  margin-top: 20px;
`;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1px;
`;

const FilterBoxItem = styled(FilterBox)`
  position: absolute;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const IconLabelContainer = styled.div`
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  /* margin-right: 25px;
  width: 120px; */
`;
const IconImg = styled.div`
  width: 27px;
  height: 27px;
  img {
    width: 100%;
    height: 100%;
  }
`;
const SpanLabel = styled.span`
  color: #444445;
  font-size: 16px;
  font-weight: 500;
`;
