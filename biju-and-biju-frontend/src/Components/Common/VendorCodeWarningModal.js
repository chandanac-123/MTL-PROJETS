import React from "react";
import styled from "styled-components";
import ButtonItem from "../ButtonItem";
import TextFieldItem from "../Common/TextFieldItem";

function VendorCodeWarningModal(props) {
  const [is_exist, setExist] = React.useState(false);
  const handleCLick = () => {
    if (is_exist) {
      props.setOpen(false);
    } else {
      setExist(true);
    }
  };

  return (
    <FormContainer>
      <HeadSection>
        <SubHead>
          <Title>Warning !</Title>
        </SubHead>
        <SubHead className="icons" onClick={() => props.setOpen(false)}>
          <img src={require("../../Assets/images/close-squareblack.png")} />
        </SubHead>
      </HeadSection>
      <FormSection>
        <ItemRow className="label-top">
          {is_exist ? (
            <Label>This code already exist</Label>
          ) : (
            <Label>Vendor Code = Vendor + Product + Location</Label>
          )}
        </ItemRow>
        <ItemRow>
          <Label className="secondary">The vendor code must br unique</Label>
        </ItemRow>
      </FormSection>
      <ButtonSection>
        <LastSection>
          <ButtonItem
            name="OK"
            type="contained"
            color="#fff"
            bgColor="#132756"
            fsize="16px"
            fweight="500"
            fpadding="3px 17px"
            bradius="8px"
            handleCLick={handleCLick}
          />
        </LastSection>
      </ButtonSection>
    </FormContainer>
  );
}

export default VendorCodeWarningModal;

const LastSection = styled.div`
  /* display: flex;
    justify-content: space-between;
    align-items: center; */
  width: 67%;
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
  &.label-top {
    margin-bottom: 15px;
  }
`;
const LabelSection = styled.div``;
const Label = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: #000000;
  &.secondary {
    font-size: 12px;
    font-weight: 400;
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
  color: #ff0303;
  font-size: 16px;
  font-weight: 600;
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
  background-color: #fff;
  padding: 25px;
  border-radius: 12px 12px 0px 0px;
`;
const UploadSection = styled.div`
  padding: 25px 25px 0px 25px;
`;
const ButtonSection = styled.div`
  padding: 10px 10px 0px 25px;
  width: 100%;
  margin-bottom: 25px;
  display: flex;
  justify-content: flex-start;
  /* margin-top: 50px; */
`;
