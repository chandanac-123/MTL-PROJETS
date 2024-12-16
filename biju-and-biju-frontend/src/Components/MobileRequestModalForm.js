import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ButtonItem from "./ButtonItem";
import axios from "axios";
import { selectAccess } from "../Slices/authSlice";
import { useSelector } from "react-redux";
import { mobile_requests } from "../Api/MobileRequestApis";
import { useDispatch } from "react-redux";
import { patch_data } from "../Store/common/commonSlice";

function MobileRequestModalForm(props) {
  const dispatch = useDispatch();
  const access = useSelector(selectAccess);
  const [state, setState] = useState({
    id: "",
    mobile_request_status: "",
  });

  useEffect(() => {
    if (props.is_edit) {
      setState((prevState) => {
        return {
          ...prevState,
          mobile_request_status: props.instance.mobile_request_status,
          id: props.instance.id,
        };
      });
    }
  }, [props.is_edit]);

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleSubmit = async () => {
    if (props.is_edit) {
      let param = {
        values: {
          mobile_request_status: state.mobile_request_status,
        },
        url: mobile_requests + props.row.id + "/",
      };

      dispatch(patch_data(param))
        .then((res) => {
          // console.log('login res => ',res);
          const result = res?.payload;
          if (result?.status === 200) {
            handleClose();
            props?.setState((prevState) => {
              return {
                ...prevState,
                refresh: true,
              };
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });

      // try {
      //   const result = await axios.patch(
      //     mobile_requests + props.row.id + "/",
      //     {
      //         mobile_request_status:state.mobile_request_status,
      //     },
      //     { headers: { Authorization: `Bearer ${access}` } }
      //   );
      //   if (result.status === 200) {
      //     handleClose();
      //   }
      // } catch (error) {
      //   console.log(error);
      // }
    }
  };

  return (
    <FormContainer>
      <HeadSection>
        <SubHead className="icons">
          <img src={require("../Assets/images/arrow-circle-leftarrow.png")} />
        </SubHead>
        <SubHead>
          <Title>{props.is_edit ? "Edit Field" : "Add New Field"}</Title>
        </SubHead>
        <SubHead className="icons" onClick={() => props.setOpen(false)}>
          <img src={require("../Assets/images/close-squareblack.png")} />
        </SubHead>
      </HeadSection>
      <FormSection>
        <ItemRow>
          <LabelSection>
            <Label>Are you sure?</Label>
          </LabelSection>
        </ItemRow>
      </FormSection>
      <ButtonSection>
        <LastSection>
          <ButtonItem
            name="Reject"
            handleClick={() =>
              handleSubmit((state.mobile_request_status = "Rejected"))
            }
            type="outlined"
            color="#252F40"
            bgColor=""
            fsize="16px"
            fweight="500"
            fpadding="6px 40px"
            bradius="8px"
          />
          <ButtonItem
            name="Accept"
            handleClick={() =>
              handleSubmit((state.mobile_request_status = "Accepted"))
            }
            type="contained"
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

export default MobileRequestModalForm;

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
  justify-content: center;
  align-items: center;
  /* margin-bottom: 25px; */
  &.label-top {
    align-items: flex-start;
  }
`;
const LabelSection = styled.div``;
const Label = styled.span`
  font-size: 16px;
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
  padding: 0px 25px 40px 25px;
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
  /* background-color: #132756; */
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
