import styled from "styled-components";
import React from "react";
import SearchInput from "../Common/SearchInput";
import FilterBox from "../FilterBox";
import { AgentDiv, ButtonDiv, DateDiv, Label } from "../../Screens/ReportsEdit";
import SelectBoxLabel from "../SelectBoxLabel";
import DateRangeInput from "../DateRangeInput";
import SearchButton from "../../Components/SearchButton";
import { RefreshButton } from "../RefreshButton";

function ReportEditHeader({
  handleSearch,
  fi_types,
  isfilter,
  setFilter,
  state,
  setState,
  handleFilter,
  handleSelectChange,
  handleReset,
  handleSearchButton,
  handleResetSearch,
  is_reset,
  handleRefresh,
}) {
  return (
    <Container>
      <FilterContainer>
        <AgentDiv className="full-width">
          <Label>Vendor</Label>
          <SelectBoxLabel
            handleChange={handleSelectChange}
            datas={state.vendor_list}
            selectType="EmployeeName"
            name="vendor"
            value={state.vendor}
            default=""
            fpadding="9.5px 14px"
            fsize="12px"
            min_width="75%"
          />
        </AgentDiv>
        <AgentDiv className="full-width">
          <Label>Agent</Label>
          <SelectBoxLabel
            handleChange={handleSelectChange}
            name="agent"
            datas={state.agent_list}
            selectType="EmployeeName"
            value={state.agent}
            default=""
            fpadding="9.5px 14px"
            fsize="12px"
            min_width="75%"
          />
        </AgentDiv>
        <AgentDiv className="full-width">
          <Label>Location</Label>
          <SelectBoxLabel
            handleChange={handleSelectChange}
            datas={state.location_list}
            selectType="name"
            name="location"
            value={state.location}
            default=""
            fpadding="9.5px 14px"
            fsize="12px"
            min_width="75%"
          />
        </AgentDiv>
        {/* <DateDiv className="full-width">
                <Label className='date-label'>Date</Label>
            </DateDiv> */}
        <DateRangeInput
          setState={setState}
          clearIcon={null}
          is_reset={is_reset}
          className="full-width"
          from_date={state.from_date}
          to_date={state.to_date}
        />
        <ButtonDiv className="reset-section center full-width mt-5">
          <SearchButton handleSearch={handleSearchButton} />
          <SearchButton handleSearch={handleResetSearch} title="Reset" />
        </ButtonDiv>
      </FilterContainer>
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

export default ReportEditHeader;

const Container = styled.div`
  margin-bottom: 10px;
  margin-top: 20px;
`;

const FilterContainer = styled.div`
  box-shadow: 0px 2px 10px 0px #00000033;
  border-radius: 4px;
  color: #ffffff;
  background-color: #ffffff;
  padding: 5px;
  margin-bottom: 10px;
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
