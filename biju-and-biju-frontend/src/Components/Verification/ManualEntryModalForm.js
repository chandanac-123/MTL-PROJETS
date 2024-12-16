import React, { useState } from "react";
import styled from "styled-components";
import ButtonItem from "../ButtonItem";
import { manual_verification } from "../../Api/VerificationApis";
import axios from "axios";
import { selectAccess } from "../../Slices/authSlice";
import { useSelector } from "react-redux";
import { patch_data } from "../../Store/common/commonSlice";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";

function ManualEntryModalForm(props) {
  const dispatch = useDispatch();
  const isMobileScreen = useMediaQuery({ query: "(max-width: 480px)" });
  const access = useSelector(selectAccess);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    let param = {
      values: {
        work_status: "recieved",
        recieved_type: "offline",
      },
      url: manual_verification + props.data.id + "/",
    };
    dispatch(patch_data(param))
      .then((res) => {
        // console.log('login res => ',res);
        const result = res?.payload;
        if (result?.status === 200) {
          handleClose();
          setLoading(false);
          props.setState((prevState) => {
            return {
              ...prevState,
              refresh: true,
            };
          });
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

    // try {
    //   setLoading(true);
    //   const result = await axios.patch(
    //     manual_verification + props.data.id + "/",
    //     {
    //       work_status: "recieved",
    //       recieved_type: "offline",
    //     },
    //     { headers: { Authorization: `Bearer ${access}` } }
    //   );
    //   if (result.status === 200) {
    //     handleClose();
    //     setLoading(false);
    //   }
    // } catch (error) {
    //   console.log(error);
    //   setLoading(false);
    // }
  };

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
          <Title>Manual Entry Confirmation</Title>
        </SubHead>
        <SubHead className="icons" onClick={() => props.setOpen(false)}>
          {/* <img src={require('../../Assets/images/close-square.png')} /> */}
        </SubHead>
      </HeadSection>
      <FormSection>
        <SpanItem>Are you sure you want to update entry manually?</SpanItem>
      </FormSection>
      <ButtonSection>
        <ButtonItem
          name="Cancel"
          handleClick={handleClose}
          type="outlined"
          color="#252F40"
          bgColor=""
          fsize="16px"
          fweight="500"
          fpadding={isMobileScreen ? "5px 20px" : "6px 40px"}
          bradius="8px"
        />
        <ButtonItem
          name="OK"
          handleClick={handleSubmit}
          type="contained"
          color="#fff"
          bgColor="#132756"
          fsize="16px"
          fweight="500"
          fpadding={isMobileScreen ? "5px 40px" : "6px 65px"}
          bradius="8px"
          pending={loading}
          loader={loading}
        />
      </ButtonSection>
    </FormContainer>
  );
}

export default ManualEntryModalForm;

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
  justify-content: center;
  align-items: center;
  gap: 50px;
  /* margin-top: 50px; */
`;
