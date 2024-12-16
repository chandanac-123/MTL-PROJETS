import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { mandatory } from "../../Api/MandatoryApis";
import ButtonItem from "../ButtonItem";
import TextFieldItem from "../Common/TextFieldItem";
import { selectAccess } from "../../Slices/authSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import RedStarItem from "../Common/RedStarItem";
import { useDispatch } from "react-redux";
import { post_data, put_data } from "../../Store/common/commonSlice";

function AddMandatoryModalForm(props) {
  const dispatch = useDispatch();
  const access = useSelector(selectAccess);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    mandatory: "",
    id: "",
    formErrors: {},
  });

  useEffect(() => {
    if (props.is_edit) {
      setState((prevState) => {
        return {
          ...prevState,
          mandatory: props.instance.mandatory_field,
          id: props.instance.id,
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
    if (!state.mandatory) {
      formErrors["mandatory"] = true;
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
        setLoading(true);
        let param = {
          values: { mandatory_field: state.mandatory },
          url: mandatory + state.id + "/",
        };

        dispatch(put_data(param))
          .then((res) => {
            // console.log('login res => ',res);
            const result = res?.payload;
            if (result?.status === 200) {
              handleClose();
              setLoading(false);
              alertSuccessFun("Mandatory Updated Successfully");
              props.setState((prevState) => {
                return {
                  ...prevState,
                  refresh: true,
                };
              });
            }
          })
          .catch((error) => {
            console.error(error);
            setLoading(false);
          });

        // try {
        //   const result = await axios.put(
        //     mandatory + state.id + "/",
        //      {
        //       mandatory_field: state.mandatory,
        //     },
        //     { headers: { Authorization: `Bearer ${access}` } }
        //   );
        //   if (result.status === 200) {
        //     handleClose();
        //     setLoading(false);
        //     alertSuccessFun("Mandatory Updated Successfully");
        //   }
        // } catch (error) {
        //   console.log(error);
        //   setLoading(false);
        // }
      } else {
        setLoading(true);
        let param = {
          values: {
            mandatory_field: state.mandatory,
          },
          url: mandatory,
        };

        dispatch(post_data(param))
          .then((res) => {
            // console.log('login res => ',res);
            const result = res?.payload;
            if (result?.status === 201) {
              handleClose();
              alertSuccessFun("Mandatory Added Successfully");
              setLoading(false);
              props.setState((prevState) => {
                return {
                  ...prevState,
                  refresh: true,
                };
              });
            }
          })
          .catch((error) => {
            console.error(error);
            setLoading(false);
          });

        // try {
        //   setLoading(true);
        //   const result = await axios.post(
        //     mandatory,
        //     {
        //       mandatory_field: state.mandatory,
        //     },
        //     { headers: { Authorization: `Bearer ${access}` } }
        //   );

        //   if (result.status === 201) {
        //     handleClose();
        //     alertSuccessFun("Mandatory Added Successfully");
        //     setLoading(false);
        //   }
        // } catch (error) {
        //   console.log(error);
        //   setLoading(false);
        // }
      }
    }
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
        <Title>{props.is_edit ? "Edit Field" : "Add New Field"}</Title>
      </HeadSection>
      <FormSection>
        <ItemRow>
          <LabelSection>
            <Label>
              {props.is_edit ? "Edit Mandatory" : "Add New Mandatory"}{" "}
              <RedStarItem />
            </Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              required={state.formErrors.mandatory}
              textField="Text"
              handleChange={handleChange}
              name="mandatory"
              value={state.mandatory}
              placeholder="Type here"
              width="265px"
              fpadding="6.5px"
              fpadding_left="20px"
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
            name={props.is_edit ? "Update" : "Add"}
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
          />
        </LastSection>
      </ButtonSection>
    </FormContainer>
  );
}

export default AddMandatoryModalForm;

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
  /* margin-bottom: 25px; */
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
  width: 65%;
  /* margin-right: 52px; */
`;
const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
