import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ButtonItem from "../ButtonItem";
import TextFieldItem from "../Common/TextFieldItem";
import { selectAccess } from "../../Slices/authSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { district_list } from "../../Api/SettingsAPIs";
import RedStarItem from "../Common/RedStarItem";
import { useDispatch } from "react-redux";
import { patch_data, post_data } from "../../Store/common/commonSlice";

function AddDistrictModalForm(props) {
  const dispatch = useDispatch();
  const access = useSelector(selectAccess);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    district: "",
    description: "",
    zone: "",
    id: "",
    formErrors: {},
  });

  useEffect(() => {
    if (props.is_edit) {
      setState((prevState) => {
        return {
          ...prevState,
          district: props.district.name,
          description: props.district.description,
          id: props.district.id,
        };
      });
    }
  }, [props.is_edit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formErrors = state.formErrors;
    formErrors[name] = false;
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const ValidationForm = () => {
    let validation = true;
    let formErrors = state.formErrors;
    if (!state.district) {
      formErrors["district"] = true;
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
    let validation = ValidationForm();
    if (validation) {
      if (props.is_edit) {
        let data = {};
        if (props.district.name != state.district) {
          data.name = state.district;
        }
        if (props.district.description != state.description) {
          data.description = state.description;
        }
        setLoading(true);
        let param = {
          values: data,
          url: district_list + state.id + "/",
        };
        dispatch(patch_data(param))
          .then((res) => {
            // console.log('login res => ',res);
            const result = res?.payload;
            if (result?.status === 200) {
              handleClose();
              alertSuccessFun("District Updated Successfully");
              setLoading(false);
              props.setState((prevState) => {
                return {
                  ...prevState,
                  refresh: true,
                };
              });
            } else if (result?.status === 400 && result?.data?.error) {
              setLoading(false);
              alertErrorFun(result?.data?.error);
            }
          })
          .catch((error) => {
            console.error(error);
            setLoading(false);
            alertErrorFun(error.response.data.error);
          });

        // try {
        //   setLoading(true);
        //   const result = await axios.patch(
        //     district_list + state.id + "/",
        //     data,
        //     { headers: { Authorization: `Bearer ${access}` } }
        //   );
        //   if (result.status === 200) {
        //     handleClose();
        //     alertSuccessFun("District Updated Successfully");
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
            name: state.district,
            description: state.description,
          },
          url: district_list,
        };

        dispatch(post_data(param))
          .then((res) => {
            // console.log('login res => ',res);
            const result = res?.payload;
            if (result?.status === 201) {
              handleClose();
              alertSuccessFun("District Added Successfully");
              setLoading(false);
              props.setState((prevState) => {
                return {
                  ...prevState,
                  refresh: true,
                };
              });
            } else if (result?.status === 400 && result?.data?.error) {
              setLoading(false);
              alertErrorFun(result?.data?.error);
            }
          })
          .catch((error) => {
            setLoading(false);
            alertErrorFun(error.response.data.error);
          });

        // try {
        //   setLoading(true);
        //   const result = await axios.post(
        //     district_list,
        //     {
        //       name: state.district,
        //       description: state.description,
        //     },
        //     { headers: { Authorization: `Bearer ${access}` } }
        //   );

        //   if (result.status === 201) {
        //     handleClose();
        //     alertSuccessFun("District Added Successfully");
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
          <Title>Edit District</Title>
        ) : (
          <Title>Add District</Title>
        )}
      </HeadSection>
      <FormSection>
        <ItemRow>
          <LabelSection>
            <Label>
              District
              <RedStarItem />
            </Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              required={state.formErrors.district}
              width="377px"
              textField="Text"
              handleChange={handleChange}
              name="district"
              value={state.district}
              placeholder="Type"
            />
          </ItemSection>
        </ItemRow>
        <ItemRow className="flex-start">
          <LabelSection>
            <Label>Description</Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              handleChange={handleChange}
              textField="Text"
              name="description"
              value={state.description}
              multiLine={true}
              row={2}
              width="377px"
            />
          </ItemSection>
        </ItemRow>
      </FormSection>
      <ButtonSection>
        <ButtonItem
          handleClick={handleClose}
          name="Cancel"
          type="outlined"
          color="#252F40"
          bgColor=""
          fsize="16px"
          fweight="500"
          fpadding="4px 110px"
          bradius="8px"
        />
        <ButtonItem
          handleClick={handleSubmit}
          name={props.is_edit ? "Update" : "Add"}
          type="contained"
          color="#fff"
          bgColor="#132756"
          fsize="16px"
          fweight="500"
          fpadding="5px 110px"
          bradius="8px"
          pending={loading}
          loader={loading}
        />
      </ButtonSection>
    </FormContainer>
  );
}

export default AddDistrictModalForm;

const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  &.flex-start {
    align-items: flex-start;
  }
`;
const LabelSection = styled.div``;
const Label = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #000000;
  &.billing-location {
    color: #656666;
    font-size: 13px;
    font-weight: 400;
  }
`;
const ItemSection = styled.div`
  width: 60%;
  margin-right: 52px;
  &.billing-location {
    height: 100px;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    overflow-y: scroll;
    padding: 19px;
    width: 53%;
  }
`;
const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 25px;
  height: 180px;
  /* overflow-y: scroll; */
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
  padding: 0px 40px 40px 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  /* margin-top: 50px; */
`;
