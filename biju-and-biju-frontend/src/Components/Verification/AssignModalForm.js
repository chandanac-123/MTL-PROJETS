import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ButtonItem from "../ButtonItem";
import TextFieldItem from "../Common/TextFieldItem";
import SelectBoxLabel from "../SelectBoxLabel";
import axios from "axios";
import { selectAccess } from "../../Slices/authSlice";
import { useSelector } from "react-redux";
import RedStarItem from "../Common/RedStarItem";
import {
  assign_team_member,
  team_member_dropdown,
} from "../../Api/VerificationApis";
import { useDispatch } from "react-redux";
import { get_data, patch_data } from "../../Store/common/commonSlice";

function AssignModalForm(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const access = useSelector(selectAccess);
  const [state, setState] = useState({ team_members: [], team_member: "" });

  useEffect(() => {
    async function fetchMyAPI() {
      dispatch(get_data(team_member_dropdown))
        .then((res) => {
          // console.log('login res => ',res);
          const result = res?.payload;
          if (res?.payload?.status === 200) {
            setState((prevState) => {
              return {
                ...prevState,
                team_members: result.data,
              };
            });
          }
        })
        .catch((err) => {
          console.error(err);
          setState((prevState) => {
            return {
              ...prevState,
              refresh: false,
            };
          });
        });

      // try {
      //   const result = await axios.get(team_member_dropdown, {
      //     headers: { Authorization: `Bearer ${access}` },
      //   });
      //   if (result.status === 200) {
      //     setState((prevState) => {
      //       return {
      //         ...prevState,
      //         team_members: result.data,
      //       };
      //     });
      //   }
      // } catch (error) {
      //   console.log(error);
      // }
    }
    fetchMyAPI();
  }, []);

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    let param = {
      values: {
        team_assigned: state.team_member,
      },
      url: assign_team_member + props.data.id + "/",
    };
    dispatch(patch_data(param))
      .then((res) => {
        // console.log('login res => ',res);
        const result = res?.payload;
        if (result?.status === 200) {
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
    //   const result = await axios.patch(
    //     assign_team_member + props.data.id + "/",
    //     {
    //       team_assigned: state.team_member,
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
    props.setState((prevState) => {
      return {
        ...prevState,
        refresh: true,
      };
    });
  };

  const handleSelectChange = (value, name) => {
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  return (
    <FormContainer>
      <HeadSection>
        <SubHead className="icons">
          {/* <img src={require('../../Assets/images/arrow-circle-leftarrow.png')} /> */}
        </SubHead>
        <SubHead>
          <Title>Assign Team Member</Title>
        </SubHead>
        <SubHead className="icons" onClick={() => props.setOpen(false)}>
          {/* <img src={require('../../Assets/images/close-square.png')} /> */}
        </SubHead>
      </HeadSection>
      <FormSection>
        <ItemRow>
          <LabelSection>
            <Label className="secondary">
              Team Member
              <RedStarItem />
            </Label>
          </LabelSection>
          <ItemSection>
            <SelectBoxLabel
              selectType="UserName"
              datas={state?.team_members}
              handleChange={handleSelectChange}
              name="team_member"
              value={state.team_member}
              fpadding="9.5px 14px"
              fsize="12px"
            />
          </ItemSection>
        </ItemRow>
      </FormSection>
      <ButtonSection>
        <ButtonItem
          name="Cancel"
          type="outlined"
          handleClick={handleClose}
          color="#252F40"
          bgColor=""
          fsize="16px"
          fweight="500"
          ffpadding="6px 40px"
          bradius="8px"
        />
        <ButtonItem
          name=" Save "
          type="contained"
          handleClick={handleSubmit}
          color="#fff"
          fmargin="25px"
          bgColor="#132756"
          fsize="16px"
          fweight="500"
          ffpadding="6px 80px"
          bradius="8px"
          pending={loading}
          loader={loading}
        />
      </ButtonSection>
    </FormContainer>
  );
}

export default AssignModalForm;

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
  margin-bottom: 25px;
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
  width: 60%;
  margin-right: 52px;
`;
const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 25px;
  height: 400px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
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
  height: 300px;
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

const ButtonSection = styled.div`
  padding: 0px 95px 40px 95px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  /* margin-top: 50px; */
`;
