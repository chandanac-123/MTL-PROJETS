import React, { useState } from "react";
import styled from "styled-components";
import ButtonItem from "../ButtonItem";
import TextFieldItem from "../Common/TextFieldItem";
import NotificationTable from "./NotificationTable";
import { remarks_verification } from "../../Api/VerificationApis";
import axios from "axios";
import { selectAccess } from "../../Slices/authSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { post_data } from "../../Store/common/commonSlice";

function NotificationModalForm(props) {
  const dispatch = useDispatch();
  const access = useSelector(selectAccess);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [state, setState] = useState({
    remark: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShowError(false);
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const handleSubmit = async () => {
    if (state.remark) {
      setLoading(true);
      let param = {
        values: {
          verification_address: props.reportReceived
            ? props.datas.data.assign_verification_id.verification_address.id
            : props.datas?.verification_address.id,
          reciever: props.reportReceived
            ? props.datas?.data?.field_agent
            : props.datas?.assigned_verification_users?.filter(
                (i) => i.status == true
              )[0]?.field_agent,
          message: state.remark,
        },
        url: remarks_verification,
      };

      dispatch(post_data(param))
        .then((res) => {
          // console.log('login res => ',res);
          const result = res?.payload;
          if (result?.status === 201) {
            handleClose();
            setLoading(false);
          }
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });

      // try {
      //   setLoading(true);
      //   const result = await axios.post(
      //     remarks_verification,
      //     {
      //       verification_address: props.reportReceived
      //         ? props.datas.data.assign_verification_id.verification_address.id
      //         : props.datas?.verification_address.id,
      //       reciever: props.reportReceived
      //         ? props.datas?.data?.field_agent
      //         : props.datas?.assigned_verification_users[0]?.field_agent,
      //       message: state.remark,
      //     },
      //     { headers: { Authorization: `Bearer ${access}` } }
      //   );
      //   if (result.status === 201) {
      //     handleClose();
      //     setLoading(false);
      //   }
      // } catch (error) {
      //   console.log(error);
      //   setLoading(false);
      // }
      props.setState((prevState) => {
        return {
          ...prevState,
          refresh: true,
        };
      });
    } else {
      setShowError(true);
    }
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <>
      {!props.reportReceived ? (
        <FormContainer>
          <HeadSection>
            <SubHead className="icons">
              {/* <img src={require('../../Assets/images/arrow-circle-leftarrow.png')} /> */}
            </SubHead>
            <SubHead>
              <Title>Notifications</Title>
            </SubHead>
            <SubHead className="icons" onClick={() => props.setOpen(false)}>
              {/* <img src={require('../../Assets/images/close-square.png')} /> */}
            </SubHead>
          </HeadSection>
          <FormSection>
            <ItemRow>
              <LabelSection>
                <Label>Add Remarks</Label>
              </LabelSection>
              <TopItemContainer>
                <ItemSection>
                  <TextFieldItem
                    textField="Text"
                    multiLine={true}
                    row={2}
                    width="100%"
                    handleChange={handleChange}
                    name="remark"
                    value={state.remark}
                  />
                </ItemSection>
                {showError ? (
                  <span style={{ color: "red" }}>this field is required</span>
                ) : null}
                <ButonContainer>
                  <ButtonItem
                    name="Cancel"
                    handleClick={handleClose}
                    type="outlined"
                    color="#252F40"
                    bgColor=""
                    fsize="16px"
                    fweight="500"
                    fpadding="6px 40px"
                    bradius="8px"
                  />
                  <ButtonItem
                    name=" Save "
                    handleClick={handleSubmit}
                    type="contained"
                    color="#fff"
                    bgColor="#132756"
                    fsize="16px"
                    fweight="500"
                    fpadding="6px 50px"
                    bradius="8px"
                    pending={loading}
                    loader={loading}
                  />
                </ButonContainer>
              </TopItemContainer>
            </ItemRow>
            <ItemRow className="table-section">
              <Label className="table-label">History</Label>
              <NotificationTable datas={props.datas} />
            </ItemRow>
          </FormSection>
        </FormContainer>
      ) : (
        <FormContainer>
          <HeadSection>
            <SubHead className="icons">
              {/* <img src={require('../../Assets/images/arrow-circle-leftarrow.png')} /> */}
            </SubHead>
            <SubHead>
              <Title>Notifications</Title>
            </SubHead>
            <SubHead className="icons" onClick={() => props.setOpen(false)}>
              <img src={require("../../Assets/images/close-square.png")} />
            </SubHead>
          </HeadSection>
          <HistoryDataContainer>
            <ItemRow className="table-section">
              <Label className="table-label">History</Label>
              <NotificationTable datas={props.datas} />
            </ItemRow>
          </HistoryDataContainer>
        </FormContainer>
      )}
    </>
  );
}

export default NotificationModalForm;

const TopItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  /* margin-right: 52px; */
`;
const ButonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 22%;
  margin-top: 30px;
  gap: 50px;
`;
const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  margin-bottom: 25px;
  &.table-section {
    flex-direction: column;
    margin-top: 45px;
  }
`;
const LabelSection = styled.div`
  margin-top: 10px;
`;
const Label = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #000000;
  &.table-label {
    margin-bottom: 10px;
  }
`;
const ItemSection = styled.div``;
const HistoryDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 25px;
  height: 300px;
  overflow-y: scroll;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 25px;
  height: 500px;
  overflow-y: scroll;
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
