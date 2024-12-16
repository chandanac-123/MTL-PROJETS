import React, { useState } from "react";
import styled from "styled-components";
import ButtonItem from "../ButtonItem";
import { payout_fileupload } from "../../Api/ReportsApis";
import { selectAccess } from "../../Slices/authSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import FileInputItem from "../Common/FileInputItem";
import { post_data_file } from "../../Store/common/commonSlice";
import { useDispatch } from "react-redux";

function PayoutReportAddModalForm(props) {
  const dispatch = useDispatch();
  const access = useSelector(selectAccess);
  const [state, setState] = useState({
    upload: "",
  });

  const handleFileChange = (e) => {
    const { files, name } = e.target;
    if (e.target.files) {
      setState((prevState) => {
        return {
          ...prevState,
          [name]: files[0],
        };
      });
    }
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("file", state.upload);
    let param = {
      values: data,
      url: payout_fileupload,
    };

    dispatch(post_data_file(param))
      .then((res) => {
        // console.log('login res => ',res);
        const result = res?.payload;
        if (result?.status === 201) {
          handleClose();
          alertSuccessFun("File Uploaded Successfully");
        }
      })
      .catch((error) => {
        console.error(error);
      });

    // try {
    //     const result = await axios.post(payout_fileupload,
    //         data,
    //         { headers: {"Authorization" : `Bearer ${access}`,"Content-Type": "multipart/form-data"} }
    //         )
    //     if(result.status === 201){
    //         handleClose()
    //         alertSuccessFun("File Uploaded Successfully")
    //     }
    // } catch (error) {
    //     console.log(error);
    // }
    props.setState((prevState) => {
      return {
        ...prevState,
        refresh: true,
      };
    });
  };

  const alertSuccessFun = (msg) => {
    props.setSnackbarStatus({
      isOpen: true,
      severity: "success",
      message: msg,
    });
  };

  return (
    <FormContainer>
      <HeadSection>
        <SubHead className="icons">
          <img
            src={require("../../Assets/images/arrow-circle-leftarrow.png")}
          />
        </SubHead>
        <SubHead>
          <Title>Add New Uploads</Title>
        </SubHead>
        <SubHead className="icons" onClick={() => props.setOpen(false)}>
          <img src={require("../../Assets/images/close-square.png")} />
        </SubHead>
      </HeadSection>
      <UploadSection>
        <FileLabel>Upload Excel Sheet</FileLabel>
        <FileInputItem
          handleFileChange={handleFileChange}
          name="upload"
          value={state.upload}
          accept="text/csv"
        />
      </UploadSection>
      <FormSection>
        <ButtonSection>
          <ButtonItem
            handleClick={handleClose}
            name="Cancel"
            type="outlined"
            color="#252F40"
            bgColor=""
            fsize="16px"
            fweight="500"
            fpadding="6px 40px"
            bradius="8px"
          />
          <ButtonItem
            handleClick={handleSubmit}
            name="Submit"
            type="contained"
            color="#fff"
            bgColor="#132756"
            fsize="16px"
            fweight="500"
            fpadding="6px 50px"
            bradius="8px"
          />
        </ButtonSection>
      </FormSection>
    </FormContainer>
  );
}

export default PayoutReportAddModalForm;

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
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 48px;
  margin-right: 48px;
  gap: 50px;
`;

const FileLabel = styled.span`
  color: #000000;
  font-weight: 600;
  font-size: 12px;
`;
