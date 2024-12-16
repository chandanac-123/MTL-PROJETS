import React, { useState } from "react";
import styled from "styled-components";
import ButtonItem from "../ButtonItem";
import TextFieldItem from "../Common/TextFieldItem";

function AddVendorSPecificModalForm(props) {
  const [state, setState] = useState({
    mandatory: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const handleClose = () => {
    props.setOpen(false);
  };

  const handleSubmit = () => {
    console.log(state);
  };
  return (
    <FormContainer>
      <HeadSection>
        <SubHead className="icons">
          {/* <img src={require('../../Assets/images/arrow-circle-leftarrow.png')} /> */}
        </SubHead>
        <SubHead>
          <Title>{props.is_edit ? "Edit Field" : "Add New Field"}</Title>
        </SubHead>
        <SubHead className="icons" onClick={() => props.setOpen(false)}>
          {/* <img src={require('../../Assets/images/close-square.png')} /> */}
        </SubHead>
      </HeadSection>
      <FormSection>
        <ItemRow>
          <LabelSection>
            <Label>{props.is_edit ? "Edit Field" : "Add New Field"}</Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              handleChange={handleChange}
              name="mandatory"
              value={state.mandatory}
              placeholder="Type here"
              width="265px"
              fpadding="6.5px"
              fpadding_left="20px"
            />
          </ItemSection>
        </ItemRow>
      </FormSection>
      <ButtonSection>
        <LastSection>
          <ButtonItem
            name="Cancel"
            type="outlined"
            handleClick={handleClose}
            color="#252F40"
            bgColor=""
            fsize="16px"
            fweight="500"
            fpadding="6px 40px"
            bradius="8px"
          />
          <ButtonItem
            name="Add"
            type="contained"
            handleClick={handleSubmit}
            color="#fff"
            bgColor="#132756"
            fsize="16px"
            fweight="500"
            fpadding="6px 50px"
            bradius="8px"
          />
        </LastSection>
      </ButtonSection>
    </FormContainer>
  );
}

export default AddVendorSPecificModalForm;

const LastSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 67%;
  gap: 50px;
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
  /* margin-bottom: 25px; */
  &.label-top {
    align-items: flex-start;
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
`;
const ItemSection = styled.div`
  width: 65%;
  /* margin-right: 52px; */
`;
const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 25px;
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
