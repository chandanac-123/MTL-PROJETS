import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ButtonItem from "../ButtonItem";
import ReactAudioPlayer from "react-audio-player";
import { GetImageUrl } from "../../Functions/utils";

function PlayButtonModalForm(props) {
  const [state, setState] = useState({
    data: [],
    searchValue: "",
    refresh: true,
  });

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <FormContainer>
      <HeadSection>
        <SubHead className="icons">
          {/* <img src={require('../../Assets/images/arrow-circle-leftarrow.png')} /> */}
        </SubHead>
        <SubHead>
          <Title>Play Audio</Title>
        </SubHead>
        <SubHead className="icons" onClick={() => props.setOpen(false)}>
          <img src={require("../../Assets/images/close-square.png")} />
        </SubHead>
      </HeadSection>
      <FormSection>
        <ReactAudioPlayer
          src={GetImageUrl(props.datas.assign_verification_id.voice_clip)}
          autoPlay
          controls
        />
      </FormSection>
    </FormContainer>
  );
}

export default PlayButtonModalForm;

const SpanItem = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: #000000;
`;
const FormSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 45px;
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
  padding: 0px 95px 40px 95px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin-top: 50px; */
`;
