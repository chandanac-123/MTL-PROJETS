import styled from "styled-components";
import React from "react";
import { AgentDiv, ButtonDiv, DateDiv, Label } from "../../Screens/ReportsEdit";
import SearchButton from "../../Components/SearchButton";
import DateRangeInput from "../../Components/DateRangeInput";
import { TableButton } from "../MeterReading";
import SelectBoxLabel from "../../Components/SelectBoxLabel";

function MeterReadingHeader({
  state,
  handleSelectChange,
  handleReset,
  setState,
  dateReset,
  handleDateReset,
  handleDateSearch,
}) {
  return (
    <Container>
      <FilterContainer>
        <AgentDiv className="full-width">
          <Label>Verification Agent</Label>
          <SelectBoxLabel
            datas={state.verificationsAgent}
            handleChange={handleSelectChange}
            name="fieldagent_name"
            value={state.fieldagent_name}
            selectType="EmployeeName"
            default=""
            fpadding="9.5px 14px"
            fsize="12px"
            min_width="72%"
          />
        </AgentDiv>
        <TableButton
          className="full-width"
          type="button"
          bcolor="#132756"
          fcolor="#fff"
          value="Reset"
          onClick={handleReset}
        />
        <DateDiv className="full-width">
          <Label className="w-30">Date</Label>
          <DateRangeInput
            setState={setState}
            clearIcon={null}
            is_reset={dateReset}
            className="full-width"
          />
        </DateDiv>
        <ButtonDiv className="full-width">
          {!dateReset ? (
            <SearchButton
              handleSearch={handleDateReset}
              title="Reset"
              className="full-width"
            />
          ) : (
            <SearchButton
              handleSearch={handleDateSearch}
              className="full-width"
            />
          )}
        </ButtonDiv>
      </FilterContainer>
    </Container>
  );
}

export default MeterReadingHeader;

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
