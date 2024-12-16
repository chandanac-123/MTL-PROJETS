import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { holiday_url } from "../../Api/HolidayApis";
import ButtonItem from "../ButtonItem";
import DisableDatePickItem from "../Common/DisableDatePickItem";
import RedStarItem from "../Common/RedStarItem";
import TextFieldItem from "../Common/TextFieldItem";
import { selectAccess } from "../../Slices/authSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { convert_date_format } from "../../Functions/utils";
import { patch_data, post_data } from "../../Store/common/commonSlice";
import { useDispatch } from "react-redux";

function AddHolidayModalForm(props) {
  const dispatch = useDispatch();
  const access = useSelector(selectAccess);
  const [loading, setLoading] = useState(false);
  let currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);
  const [state, setState] = useState({
    submitted_date: currentDate,
    submitted_time: currentDate,
    description: "",
    id: "",
    formErrors: {},
  });

  useEffect(() => {
    if (props.is_edit) {
      setState((prevState) => {
        return {
          ...prevState,
          submitted_date: props.instance.holiday_date,
          description: props.instance.description,
          id: props.instance.id,
        };
      });
    }
  }, [props.is_edit]);

  const handleSelectChange = (value, name) => {
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    let formErrors = state.formErrors;
    formErrors[name] = false;
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
        formErrors,
      };
    });
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const ValidationForm = () => {
    let validation = true;
    let formErrors = state.formErrors;
    if (!state.description) {
      formErrors["description"] = true;
      validation = false;
    }

    setState((prevState) => {
      return {
        ...prevState,
        formErrors,
      };
    });
    return validation;
  };

  const handleSubmit = async () => {
    let submitted_date = convert_date_format(state.submitted_date);
    let validation = ValidationForm();
    if (validation) {
      if (props.is_edit) {
        setLoading(true);
        let data = {};
        if (props.instance.holiday_date != state.submitted_date) {
          data.holiday_date = submitted_date;
        }
        if (props.instance.description != state.description) {
          data.description = state.description;
        }

        let param = {
          values: data,
          url: holiday_url + state.id + "/",
        };

        dispatch(patch_data(param))
          .then((res) => {
            // console.log('login res => ',res);
            const result = res?.payload;
            if (result?.status === 200) {
              handleClose();
              alertSuccessFun("Holiday Updated Successfully");
              setLoading(false);
            }
          })
          .catch((error) => {
            console.error(error);
            setLoading(false);
            alertErrorFun(error.response.data.error);
          });

        // try {
        //   setLoading(true);
        //   let data = {};
        //   if (props.instance.holiday_date != state.submitted_date) {
        //     data.holiday_date = submitted_date;
        //   }
        //   if (props.instance.description != state.description) {
        //     data.description = state.description;
        //   }
        //   const result = await axios.patch(holiday_url + state.id + "/", data, {
        //     headers: { Authorization: `Bearer ${access}` },
        //   });
        //   if (result.status === 200) {
        //     handleClose();
        //     alertSuccessFun("Holiday Updated Successfully");
        //     setLoading(false);
        //   }
        // } catch (error) {
        //   setLoading(false);
        //   alertErrorFun(error.response.data.error);
        // }
      } else {
        setLoading(true);
        let param = {
          values: {
            holiday_date: submitted_date,
            description: state.description,
          },
          url: holiday_url,
        };
        dispatch(post_data(param))
          .then((res) => {
            // console.log('login res => ',res);
            const result = res?.payload;
            if (result?.status === 201) {
              handleClose();
              alertSuccessFun("Holiday Added Successfully");
              setLoading(false);
            } else if (result?.status === 400 && result?.data?.error) {
              alertErrorFun(result?.data?.error);
              setLoading(false);
            }
          })
          .catch((error) => {
            console.error(error);
            setLoading(false);
            alertErrorFun(error.response.data.error);
          });

        // try {
        //   setLoading(true);
        //   const result = await axios.post(
        //     holiday_url,
        //     {
        //       holiday_date: submitted_date,
        //       description: state.description,
        //     },
        //     { headers: { Authorization: `Bearer ${access}` } }
        //   );

        //   if (result.status === 201) {
        //     handleClose();
        //     alertSuccessFun("Holiday Added Successfully");
        //     setLoading(false);
        //   }
        // } catch (error) {
        //   setLoading(false);
        //   alertErrorFun(error.response.data.error);
        // }
      }
      props.setState((prevState) => {
        return {
          ...prevState,
          refresh: true,
        };
      });
    }
  };

  const alertSuccessFun = (msg) => {
    props.setSnackbarStatus({
      isOpen: true,
      severity: "success",
      message: msg,
    });
  };

  const alertErrorFun = (msg) => {
    props.setSnackbarStatus({ isOpen: true, severity: "error", message: msg });
  };

  return (
    <FormContainer>
      <HeadSection>
        {props.is_edit ? (
          <Title>Edit Holidays</Title>
        ) : (
          <Title>Add New Holidays</Title>
        )}
      </HeadSection>
      <FormSection>
        <ItemRow>
          <LabelSection>
            <Label>Submitted Date</Label>
          </LabelSection>
          <ItemSection>
            <DisableDatePickItem
              handleChange={handleSelectChange}
              name="submitted_date"
              value={state.submitted_date}
              disable_current={true}
            />
          </ItemSection>
        </ItemRow>
        <ItemRow className="label-top">
          <LabelSection>
            <Label>
              Description
              <RedStarItem />
            </Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              required={state.formErrors.description}
              textField="Text"
              handleChange={handleChange}
              name="description"
              value={state.description}
              placeholder=""
              multiLine={true}
              row={1}
              width="258px"
            />
          </ItemSection>
        </ItemRow>
      </FormSection>
      <ButtonSection>
        <LastSection>
          <ButtonItem
            name="Cancel"
            type="outlined"
            handleClick={handleClose}
            color="#252F40"
            bgColor=""
            fsize="16px"
            fweight="500"
            fpadding="6px 40px"
            bradius="8px"
          />
          <ButtonItem
            name={props.is_edit ? "Update" : "Submit"}
            type="contained"
            handleClick={handleSubmit}
            color="#fff"
            bgColor="#132756"
            fsize="16px"
            fweight="500"
            fpadding="6px 40px"
            bradius="8px"
            pending={loading}
            loader={loading}
          />
        </LastSection>
      </ButtonSection>
    </FormContainer>
  );
}

export default AddHolidayModalForm;

const LastSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 67%;
  gap: 50px;
`;

const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  &.label-top {
    align-items: flex-start;
  }
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
  /* margin-right: 52px; */
`;
const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 25px;
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
  justify-content: center;
  align-items: center;
  background-color: #132756;
  padding: 25px;
  border-radius: 12px 12px 0px 0px;
`;

const ButtonSection = styled.div`
  /* padding: 40px; */
  width: 100%;
  margin-bottom: 25px;
  display: flex;
  justify-content: center;
  /* margin-top: 50px; */
`;
