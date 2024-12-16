import React from "react";
import styled from "styled-components";
import ButtonItem from "../ButtonItem";
import DatePickItem from "../Common/DatePickItem";
import FileInputItem from "../Common/FileInputItem";
import NormalList from "../Common/NormalList";
import RedStarItem from "../Common/RedStarItem";
import TextFieldItem from "../Common/TextFieldItem";
import TimePickItem from "../Common/TimePickItem";
import RadioGroups from "../RadioGroups";

function TimeTrackViewModalForm(props) {
  const items = [
    "ALAPPUZHA",
    "CALICUT",
    "COIBATORE",
    "ERNAKULAM",
    "IDUKKI",
    "KANNUR",
    "KASARGODE",
    "KOLLAM",
    "KOTTAYAM",
    "MALAPPURAM",
  ];
  const demo = ["Select"];

  let datas = [
    {
      name: "active",
      label: "Active",
      checked: true,
    },
    {
      name: "inactive",
      label: "Inactive",
      checked: false,
    },
  ];

  return (
    <FormContainer>
      <HeadSection>
        <SubHead className="icons">
          <img
            src={require("../../Assets/images/arrow-circle-leftarrow.png")}
          />
        </SubHead>
        <SubHead>
          <Title>Edit Vendor Product and District</Title>
        </SubHead>
        <SubHead className="icons" onClick={() => props.setOpen(false)}>
          <img src={require("../../Assets/images/close-square.png")} />
        </SubHead>
      </HeadSection>
      <FormSection>
        <ItemRow className="first">
          <LabelSection>
            <Label>
              Status
              <RedStarItem />
            </Label>
          </LabelSection>
          <ItemSection>
            <RadioGroups
              datas={datas}
              fsize="12px"
              fweight="400"
              mr="20px"
              ssize="20px"
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>
              Designation
              <RedStarItem />
            </Label>
          </LabelSection>
          <ItemSection>
            <Label className="designation">Group Leader-Backend</Label>
          </ItemSection>
        </ItemRow>
        <ItemRow className="flex-start">
          <LabelSection>
            <Label>
              Select District
              <br />
              (Unassigned district)
              <RedStarItem />
            </Label>
          </LabelSection>
          <ItemSection className="list-item">
            <NormalList items={items} />
          </ItemSection>
        </ItemRow>
        <ItemRow className="flex-start">
          <LabelSection>
            <Label>
              Select District
              <br />
              (Assigned district)
              <RedStarItem />
            </Label>
          </LabelSection>
          <ItemSection className="list-item">
            <NormalList items={demo} />
          </ItemSection>
        </ItemRow>
        <ItemRow className="flex-start">
          <LabelSection>
            <Label>
              Select Vendor
              <br />
              (Unassigned Vendor)
              <RedStarItem />
            </Label>
          </LabelSection>
          <ItemSection className="list-item">
            <NormalList items={demo} />
          </ItemSection>
        </ItemRow>
        <ItemRow className="flex-start">
          <LabelSection>
            <Label>
              Select Vendor
              <br />
              (Assigned Vendor)
              <RedStarItem />
            </Label>
          </LabelSection>
          <ItemSection className="list-item">
            <NormalList items={demo} />
          </ItemSection>
        </ItemRow>
        <ItemRow className="flex-start">
          <LabelSection>
            <Label>
              Select Product
              <br />
              (Unassigned Product)
              <RedStarItem />
            </Label>
          </LabelSection>
          <ItemSection className="list-item">
            <NormalList items={demo} />
          </ItemSection>
        </ItemRow>
        <ItemRow className="flex-start">
          <LabelSection>
            <Label>
              Select Product
              <br />
              (Assigned Product)
              <RedStarItem />
            </Label>
          </LabelSection>
          <ItemSection className="list-item">
            <NormalList items={demo} />
          </ItemSection>
        </ItemRow>
      </FormSection>
      <ButtonSection>
        <LastSection>
          <ButtonItem
            name="Save"
            type="contained"
            color="#fff"
            bgColor="#132756"
            fsize="16px"
            fweight="500"
            fpadding="5px 105px"
            bradius="8px"
          />
        </LastSection>
      </ButtonSection>
    </FormContainer>
  );
}

export default TimeTrackViewModalForm;

const LastSection = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 88%;
`;
const SpanValue = styled.span`
  color: #444445;
  font-size: 12px;
  font-weight: 400;
  &.important {
    font-size: 14px;
    font-weight: 700;
  }
`;
const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
  &.label-top {
    align-items: flex-start;
  }
  &.flex-start {
    align-items: flex-start;
  }
  &.first {
    margin-top: 0px;
  }
`;
const LabelSection = styled.div``;
const Label = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #000000;
  &.secondary {
    color: #444445;
    font-size: 13px;
  }
  &.designation {
    color: #444445;
    font-weight: 400;
  }
`;
const ItemSection = styled.div`
  width: 62%;
  margin-right: 15px;
  &.list-item {
    height: 108px;
    overflow-y: scroll;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
  }
`;
const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 25px;
  height: 500px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const SubHead = styled.div`
  &.icons {
    cursor: pointer;
  }
`;

const Title = styled.span`
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 12px;
`;
const HeadSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #132756;
  padding: 25px;
  border-radius: 12px 12px 0px 0px;
`;
const UploadSection = styled.div`
  padding: 25px 25px 0px 25px;
`;
const ButtonSection = styled.div`
  /* padding: 40px; */
  width: 100%;
  margin-bottom: 25px;
  display: flex;
  justify-content: center;
  /* margin-top: 50px; */
`;
