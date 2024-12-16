import React from "react";
import styled from "styled-components";

const FileInputItemCopy = (props) => (
  <InputContainer fwidth={props.fwidth}>
    <ButtonWrap class="button-wrap">
      <InputLabel class="button" for={props.name} bcolor={props.bcolor}>
        Choose File
      </InputLabel>
      <input
        id={props.name}
        disabled={props?.disabled}
        type="file"
        onChange={props.handleFileChange}
        name={props.name}
      />
    </ButtonWrap>
  </InputContainer>
);
export default FileInputItemCopy;

const InputLabel = styled.label`
  display: inline-block;
  padding: 7px 17px;
  cursor: pointer;
  border-radius: 5px;
  /* background-color: #74B9FF; */
  background-color: ${({ bcolor }) => (bcolor ? bcolor : "#74B9FF")};
  font-size: 12px;
  font-weight: 500;
  color: #fff;
`;
const ButtonWrap = styled.div`
  position: relative;
`;
const InputContainer = styled.div`
  padding: 5px;
  border: 1px solid #d9d9;
  border-radius: 6px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  /* width: 92%; */
  width: ${({ fwidth }) => (fwidth ? fwidth : "400px")};
  margin-top: 5px;
  input[type="file"] {
    position: absolute;
    z-index: -1;
    top: 2px;
    left: 1px;
    font-size: 17px;
    color: #b8b8b8;
  }
`;
