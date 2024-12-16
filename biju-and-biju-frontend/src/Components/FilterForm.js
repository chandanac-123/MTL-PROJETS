import React from "react";
import styled from "styled-components";
import ButtonItem from "./ButtonItem";
import SelectBoxLabel from "./SelectBoxLabel";
import { selectAccess } from "../Slices/authSlice";
import { useSelector } from "react-redux";

export default function FilterForm(props) {
  return (
    <Container>
      <HeadDiv>
        <Title>Filter Options</Title>
      </HeadDiv>
      <SelectDiv>
        <SelectBoxLabel
          datas={props?.fi_types}
          title="FI Type"
          default="F1 Type"
          name="fi_type"
          handleChange={props?.handleSelectChange}
          value={props?.state.fi_type}
          selectType="EmployeeName"
        />
      </SelectDiv>
      <SelectDiv>
        <SelectBoxLabel
          title="Vendor"
          datas={props?.state.vendors}
          default="Vendor"
          handleChange={props?.handleSelectChange}
          value={props?.state.vendorValue}
          name="vendorValue"
          selectType="EmployeeName"
        />
      </SelectDiv>
      <SelectDiv>
        <SelectBoxLabel
          title="Product"
          datas={props?.state.products}
          default="Product"
          handleChange={props?.handleSelectChange}
          value={props?.state.productValue}
          name="productValue"
          selectType="ProductName"
        />
      </SelectDiv>
      <SelectDiv>
        <SelectBoxLabel
          title="District"
          datas={props?.state.districts}
          handleChange={props?.handleSelectChange}
          name="address_district"
          value={props?.state.address_district}
          default="Select"
          selectType="EmployeeName"
          fpadding="9.5px 14px"
          fsize="12px"
        />
      </SelectDiv>
      <BottomDiv>
        <ButtonItem
          name="Reset"
          type="outlined"
          color="#252F40"
          bgColor=""
          handleClick={props?.handleReset}
        />
        <ButtonItem
          name="Apply"
          type="contained"
          color="#fff"
          bgColor="#132756"
          handleClick={props?.handleFilter}
        />
      </BottomDiv>
    </Container>
  );
}

const HeadDiv = styled.div``;
const SelectDiv = styled.div`
  margin: 16px 0px;
`;
const BottomDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0px;
  gap: 50px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* align-items: center; */
`;

const Title = styled.span`
  color: #132756;
  font-size: 14px;
  font-weight: 700;
`;
