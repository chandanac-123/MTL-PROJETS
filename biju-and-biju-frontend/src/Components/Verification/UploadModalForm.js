import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ButtonItem from "../ButtonItem";
import FileInputItem from "../Common/FileInputItem";
import { verification_upload } from "../../Api/VerificationApis";
import { selectAccess } from "../../Slices/authSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { ws_progress_url } from "../../Api/ReportSubmittedApis";
import CommonProgressBar from "../ProgressBar/CommonProgressBar";
import { post_data, post_data_file } from "../../Store/common/commonSlice";
import { useDispatch } from "react-redux";

function UploadModalForm(props) {
  const dispatch = useDispatch();
  const access = useSelector(selectAccess);
  const user_type = useSelector((state) => state.auth.user_type);
  const [socket, setSocket] = useState(null);
  const [task_id, setTaskID] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState({
    percentage: "",
    msg: "",
  });
  const [state, setState] = useState({
    upload_report_hdfc: "",
    upload_report_common: "",
    upload_report_hdfccc: "",
  });

  const handleFileChange = (e) => {
    const { files, name, value } = e.target;
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
    setProgress((prevProgress) => {
      return {
        ...prevProgress,
        msg: "",
      };
    });
    const data = new FormData();
    if (state.upload_report_hdfc) {
      data.append("file", state.upload_report_hdfc);
      data.append("file_format", "hdfc");
    } else if (state.upload_report_common) {
      data.append("file", state.upload_report_common);
      data.append("file_format", "common");
    } else {
      data.append("file", state.upload_report_hdfccc);
      data.append("file_format", "hdfcc");
    }

    let param = {
      values: data,
      url: verification_upload,
    };
    dispatch(post_data_file(param))
      .then((res) => {
        // console.log('login res => ',res);
        const result = res?.payload;
        if (result.status === 201) {
          setTaskID(result?.data?.taskid);
        }
      })
      .catch((err) => {
        console.error(err);
      });

    // try {
    //     setLoading(true)
    //   const result = await axios.post(verification_upload, data, {
    //     headers: {
    //       Authorization: `Bearer ${access}`,
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });
    //   if (result.status === 201) {
    //     setTaskID(result?.data?.taskid);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const receiveMessage = (message) => {
    console.log(JSON.parse(message.data));
    const msg = JSON.parse(message.data);
    if (msg?.percentage_complete?.status === "end") {
      setProgress((prevProgress) => {
        return {
          ...prevProgress,
          percentage: 100,
          msg: "You have Uploaded Successfully",
        };
      });
      props.setState((prevState) => {
        return {
          ...prevState,
          refresh: true,
        };
      });
      handleClose();
      setLoading(false);
      alertSuccessFun("Uploaded Successfully");
    } else if (msg?.percentage_complete?.status === "failed") {
      setProgress((prevProgress) => {
        return {
          ...prevProgress,
          msg: msg?.percentage_complete?.msg
            ? msg?.percentage_complete?.msg
            : "File Upload Error",
        };
      });
      setLoading(false);
      props.setState((prevState) => {
        return {
          ...prevState,
          refresh: true,
        };
      });
    } else {
      setProgress((prevProgress) => {
        return {
          ...prevProgress,
          percentage: msg?.percentage_complete?.status,
        };
      });
    }
  };

  useEffect(() => {
    if (task_id) {
      let ws_url = ws_progress_url;
      let url = ws_url.replace("https", "wss") + task_id;
      const newSocket = new WebSocket(url);
      newSocket.onopen = (e) => {
        console.log("socket added", e);
      };
      newSocket.onmessage = receiveMessage;
      setSocket(newSocket);
      return () => {
        newSocket.close();
      };
    }
  }, [task_id]);

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
          {/* <img src={require('../../Assets/images/arrow-circle-leftarrow.png')} /> */}
        </SubHead>
        <SubHead>
          <Title>Upload New Verification</Title>
        </SubHead>
        <SubHead className="icons" onClick={() => props.setOpen(false)}>
          {/* <img src={require('../../Assets/images/close-square.png')} /> */}
        </SubHead>
      </HeadSection>
      {user_type == "Vendor" ? (
        <UploadSection>
          <FileLabel>Common</FileLabel>
          <FileInputItem
            disabled={state.upload_report_hdfccc || state.upload_report_hdfc}
            handleFileChange={handleFileChange}
            bcolor="#0984E3"
            name="upload_report_common"
            value={state.upload_report_common}
            accept="text/csv"
          />
        </UploadSection>
      ) : (
        <>
          <UploadSection>
            <FileLabel>HDFC</FileLabel>
            <FileInputItem
              disabled={
                state.upload_report_common || state.upload_report_hdfccc
              }
              handleFileChange={handleFileChange}
              name="upload_report_hdfc"
              value={state.upload_report_hdfc}
              accept="text/csv"
            />
          </UploadSection>
          <UploadSection>
            <FileLabel>Common</FileLabel>
            <FileInputItem
              disabled={state.upload_report_hdfccc || state.upload_report_hdfc}
              handleFileChange={handleFileChange}
              bcolor="#0984E3"
              name="upload_report_common"
              value={state.upload_report_common}
              accept="text/csv"
            />
          </UploadSection>
          <UploadSection>
            <FileLabel>HDFCCC</FileLabel>
            <FileInputItem
              disabled={state.upload_report_common || state.upload_report_hdfc}
              handleFileChange={handleFileChange}
              bcolor="#2F477D"
              name="upload_report_hdfccc"
              value={state.upload_report_hdfccc}
              accept="text/csv"
            />
          </UploadSection>
        </>
      )}
      <ButtonSection>
        <ButtonItem
          name="Cancel"
          type="outlined"
          handleClick={handleClose}
          color="#252F40"
          bgColor=""
          fsize="16px"
          fweight="500"
          fpadding="6px 50px"
          bradius="8px"
        />
        <ButtonItem
          name="Submit"
          type="contained"
          handleClick={handleSubmit}
          color="#fff"
          bgColor="#132756"
          fsize="16px"
          fweight="500"
          fpadding="6px 50px"
          bradius="8px"
          pending={loading}
          loader={loading}
          IsUpload={true}
        />
      </ButtonSection>

      <div>
        {progress?.percentage !== "" ? (
          <CommonProgressBar
            percentage={progress?.percentage}
            msg={progress?.msg}
          />
        ) : null}
      </div>
    </FormContainer>
  );
}

export default UploadModalForm;

const FileLabel = styled.span`
  color: #000000;
  font-weight: 600;
  font-size: 12px;
`;
const InputLabel = styled.label`
  display: inline-block;
  padding: 7px 19px;
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
  width: 92%;
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
  margin-top: 50px;
  margin-bottom: 32px;
  margin-left: 48px;
  margin-right: 48px;
  gap: 50px;
`;
