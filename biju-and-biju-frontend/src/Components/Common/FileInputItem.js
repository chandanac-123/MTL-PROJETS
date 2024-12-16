import React from "react";
import { useRef } from "react";
import styled from "styled-components";

const FileInputItem = (props) => {
  const hiddenFileInputAdrs = useRef(null);
  return (
    <>
      <InputContainer fwidth={props.fwidth}>
        <ButtonWrap className="button-wrap">
          <InputLabel
            className="button"
            bcolor={props.bcolor}
            onClick={() => hiddenFileInputAdrs.current.click()}
          >
            Choose File
          </InputLabel>
          <input
            id={props.name}
            ref={hiddenFileInputAdrs}
            onClick={(event) => {
              event.target.value = null;
            }}
            type="file"
            onChange={props.handleFileChange}
            name={props.name}
            style={{ display: "none" }}
            accept={props.accept ? props.accept : "*/*"}
          />
          <FileText>
            {props.value ? props.value?.name : "No file chosen"}
          </FileText>
        </ButtonWrap>
      </InputContainer>
      {props.required ? <ErrorMsg>*Please select a File</ErrorMsg> : null}
    </>
  );
};
export default FileInputItem;

const ErrorMsg = styled.span`
  font-size: 12px;
  color: red;
`;

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
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;
`;
const InputContainer = styled.div`
  padding: 5px;
  border: 1px solid #d9d9;
  border-radius: 6px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  /* width: 92%; */
  max-width: ${({ fwidth }) => (fwidth ? fwidth : "400px")};
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
const FileText = styled.span`
  width: 60%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
