import styled from "styled-components";
import React from "react";
import SelectBoxLabel from "../../Components/SelectBoxLabel";
import SearchButton from "../../Components/SearchButton";
import SearchInput from "../../Components/Common/SearchInput";

function TATReportVisitHeader({
  handleSelectChange,
  handleSearch,
  state,
  setState,
  filterState,
  handleFilter,
  handleReset,
  fi_types,
}) {
  return (
    <Container>
      <>
        <HeadDiv>
          <AgentDiv>
            <Label>Vendor </Label>
            <SelectBoxLabel
              handleChange={handleSelectChange}
              datas={state.vendor_list}
              selectType="EmployeeName"
              name="vendor"
              value={state.vendor}
              fpadding="9.5px 14px"
              fsize="12px"
              min_width="70%"
            />
          </AgentDiv>
          <AgentDiv>
            <Label>Product </Label>
            <SelectBoxLabel
              handleChange={handleSelectChange}
              datas={state.product_list}
              selectType="ProductName"
              name="product"
              value={state.product}
              fpadding="9.5px 14px"
              fsize="12px"
              min_width="70%"
            />
          </AgentDiv>
          <AgentDiv>
            <Label>Visit Type </Label>
            <SelectBoxLabel
              handleChange={handleSelectChange}
              datas={fi_types}
              selectType="EmployeeName"
              name="visit_type"
              value={state.visit_type}
              fpadding="9.5px 14px"
              fsize="12px"
              min_width="70%"
            />
          </AgentDiv>
          <ButtonDiv>
            {filterState ? (
              <SearchButton
                handleSearch={handleFilter}
                className="full-width"
              />
            ) : (
              <SearchButton
                handleSearch={handleReset}
                title="Reset"
                className="full-width"
              />
            )}
          </ButtonDiv>
        </HeadDiv>
        <SearchInput handleSearch={handleSearch} value={state.searchValue} />
      </>
    </Container>
  );
}

export default TATReportVisitHeader;

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
  margin: 10px 0px;
`;

const Label = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #444445;
  width: 30%;
`;
