import styled from "styled-components";
import React from "react";
import DateRangeInput from "../../Components/DateRangeInput";
import SelectBoxLabel from "../../Components/SelectBoxLabel";
import SearchButton from "../../Components/SearchButton";
import SearchInput from "../../Components/Common/SearchInput";

function TatReportHeader({
  handleSelectChange,
  handleSearchItem,
  handleSearch,
  state,
  Tat_filter,
  setState,
}) {
  return (
    <Container>
      <>
        <HeadDiv>
          <AgentDiv>
            <Label>TAT Report</Label>
            <SelectBoxLabel
              handleChange={handleSelectChange}
              name="filter_value"
              value={state.filter_value}
              datas={Tat_filter}
              selectType="name"
              default=""
              fpadding="9.5px 14px"
              fsize="12px"
              min_width="235px"
            />
          </AgentDiv>
          <DateDiv>
            <Label className="w-30">Date</Label>
            <DateRangeInput
              className="full-width"
              setState={setState}
              clearIcon={null}
            />
          </DateDiv>
          <ButtonDiv>
            <SearchButton handleSearch={handleSearch} className="full-width" />
          </ButtonDiv>
        </HeadDiv>
        <SearchInput
          handleSearch={handleSearchItem}
          value={state.searchValue}
        />
      </>
    </Container>
  );
}

export default TatReportHeader;

const Container = styled.div`
  margin-bottom: 10px;
  margin-top: 20px;
`;

const HeadDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1px;
  &.first {
    margin-bottom: 15px;
  }
  &.secondary {
    /* width: 55%; */
  }
`;

const AgentDiv = styled.div`
  font-size: 16px;
  color: #444445;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const DateDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
  /* margin-left: 20px; */
`;
const ButtonDiv = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;

const Label = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #444445;
  width: 30%;
`;
