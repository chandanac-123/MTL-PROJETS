import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ButtonItem from "../ButtonItem";
import TextFieldItem from "../Common/TextFieldItem";
import { selectAccess } from "../../Slices/authSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { convert_date_format, GetDecryptedPaswd } from "../../Functions/utils";
import { edit_user, vendor_api } from "../../Api/UserApis";
import RadioGroups from "../RadioGroups";
import RedStarItem from "../Common/RedStarItem";
import {
  patch_data_file,
  post_data_file,
} from "../../Store/common/commonSlice";
import { useDispatch } from "react-redux";

function AddVendorModalForm(props) {
  const dispatch = useDispatch();
  const access = useSelector(selectAccess);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    vendor_name: "",
    email_id: "",
    user_name: "",
    password: "",
    vendor_short_code: "",
    status: true,
    formErrors: {},
  });

  useEffect(() => {
    if (props.is_edit) {
      let pswd = GetDecryptedPaswd(props.instance.user.encrypted_password);
      setState((prevState) => {
        return {
          ...prevState,
          vendor_name: props.instance.employee_name,
          email_id: props.instance.user.email,
          user_name: props.instance.user.username,
          password: pswd,
          vendor_short_code: props.instance.employee_code,
          status: props.instance.user.is_active,
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
    var validRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let validation = true;
    let formErrors = state.formErrors;
    if (!state.vendor_name) {
      formErrors["vendor_name"] = true;
      validation = false;
    }
    if (!state.email_id) {
      formErrors["email_id"] = true;
      validation = false;
    } else if (state.email_id && !state.email_id.match(validRegex)) {
      formErrors["email_id"] = true;
      validation = false;
    }
    if (!state.password) {
      formErrors["password"] = true;
      validation = false;
    }
    if (!state.user_name) {
      formErrors["user_name"] = true;
      validation = false;
    }
    if (!state.vendor_short_code) {
      formErrors["vendor_short_code"] = true;
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
    const data = new FormData();
    let validation = ValidationForm();
    if (validation) {
      if (props.is_edit) {
        setLoading(true);
        let user = {
          password: state.password,
          email: state.email_id,
          user_type: "Vendor",
          is_active: state.status,
        };
        if (props.instance.user.username != state.user_name) {
          user.username = state.user_name;
        }
        for (const key in user) {
          data.append(`user.${key}`, user[key]);
        }
        data.append("employee_name", state.vendor_name);
        data.append("employee_code", state.vendor_short_code);
        let param = {
          values: data,
          url: edit_user + state.id,
        };

        dispatch(patch_data_file(param))
          .then((res) => {
            // console.log('login res => ',res);
            const result = res?.payload;
            if (result?.status === 200) {
              handleClose();
              alertSuccessFun("Vendor Updated Successfully");
              setLoading(false);
              props?.setState((prevState) => {
                return {
                  ...prevState,
                  refresh: true,
                };
              });
            }
          })
          .catch((error) => {
            setLoading(false);
            let errormsg = error.response.data.error;
            if (error.response.data.error == "Employee code already exist") {
              errormsg = "Vendor short code already exists!";
            }
            try {
              if (
                error.response.data.user.username[0] ==
                "user with this username already exists."
              ) {
                errormsg = "Vendor with this vendor name already exists!";
              }
            } catch {}
            alertErrorFun(errormsg);
          });

        // try {
        //   let user = {
        //     password: state.password,
        //     email: state.email_id,
        //     user_type: "Vendor",
        //     is_active: state.status,
        //   };
        //   if (props.instance.user.username != state.user_name) {
        //     user.username = state.user_name;
        //   }
        //   for (const key in user) {
        //     data.append(`user.${key}`, user[key]);
        //   }
        //   data.append("employee_name", state.vendor_name);
        //   data.append("employee_code", state.vendor_short_code);

        //   const result = await axios.patch(edit_user + state.id, data, {
        //     headers: {
        //       Authorization: `Bearer ${access}`,
        //       "Content-Type": "multipart/form-data",
        //     },
        //   });
        //   if (result.status === 200) {
        //     handleClose();
        //     alertSuccessFun("Vendor Updated Successfully");
        //     setLoading(false);
        //   }
        // } catch (error) {
        //   setLoading(false);
        //   let errormsg = error.response.data.error;
        //   if (error.response.data.error == "Employee code already exist") {
        //     errormsg = "Vendor short code already exists!";
        //   }
        //   try {
        //     if (
        //       error.response.data.user.username[0] ==
        //       "user with this username already exists."
        //     ) {
        //       errormsg = "Vendor with this vendor name already exists!";
        //     }
        //   } catch {}
        //   alertErrorFun(errormsg);
        // }
      } else {
        setLoading(true);
        let user = {
          username: state.user_name,
          password: state.password,
          email: state.email_id,
          user_type: "Vendor",
          is_active: state.status,
        };
        for (const key in user) {
          data.append(`user.${key}`, user[key]);
        }
        data.append("employee_name", state.vendor_name);
        data.append("employee_code", state.vendor_short_code);

        let param = {
          values: data,
          url: vendor_api,
        };

        dispatch(post_data_file(param))
          .then((res) => {
            // console.log('login res => ',res);
            const result = res?.payload;
            if (result?.status === 201) {
              handleClose();
              alertSuccessFun("Vendor Added Successfully");
              setLoading(false);
              props?.setState((prevState) => {
                return {
                  ...prevState,
                  refresh: true,
                };
              });
            }
          })
          .catch((error) => {
            setLoading(false);
            let errormsg = error.response.data.error;
            try {
              if (
                error.response.data.user.username[0] ==
                "user with this username already exists."
              ) {
                errormsg = "Vendor with this vendor name already exists!";
              }
            } catch {}
            alertErrorFun(errormsg);
          });

        // try {
        //   setLoading(true);
        //   let user = {
        //     username: state.user_name,
        //     password: state.password,
        //     email: state.email_id,
        //     user_type: "Vendor",
        //     is_active: state.status,
        //   };
        //   for (const key in user) {
        //     data.append(`user.${key}`, user[key]);
        //   }
        //   data.append("employee_name", state.vendor_name);
        //   data.append("employee_code", state.vendor_short_code);

        //   const result = await axios.post(vendor_api, data, {
        //     headers: {
        //       Authorization: `Bearer ${access}`,
        //       "Content-Type": "multipart/form-data",
        //     },
        //   });
        //   if (result.status === 201) {
        //     handleClose();
        //     alertSuccessFun("Vendor Added Successfully");
        //     setLoading(false);
        //   }
        // } catch (error) {
        //   setLoading(false);
        //   let errormsg = error.response.data.error;
        //   try {
        //     if (
        //       error.response.data.user.username[0] ==
        //       "user with this username already exists."
        //     ) {
        //       errormsg = "Vendor with this vendor name already exists!";
        //     }
        //   } catch {}
        //   alertErrorFun(errormsg);
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

  const handleRadioChange = (value, name) => {
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  let status_datas = [
    {
      name: true,
      label: "Active",
    },
    {
      name: false,
      label: "Inactive",
    },
  ];

  return (
    <FormContainer>
      <HeadSection>
        <SubHead className="icons">
          {/* <img src={require('../../Assets/images/arrow-circle-leftarrow.png')} /> */}
        </SubHead>
        <SubHead>
          <Title>{props.is_edit ? "Edit Vendor" : "Add New Vendor"}</Title>
        </SubHead>
        <SubHead className="icons" onClick={() => props.setOpen(false)}>
          {/* <img src={require('../../Assets/images/close-square.png')} /> */}
        </SubHead>
      </HeadSection>
      <FormSection>
        <ItemRow>
          <LabelSection>
            <Label>
              Vendor Name <RedStarItem />
            </Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              required={state.formErrors.vendor_name}
              textField="Text"
              handleChange={handleChange}
              name="vendor_name"
              value={state.vendor_name}
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>
              Email ID <RedStarItem />
            </Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              required={state.formErrors.email_id}
              textField="Email"
              handleChange={handleChange}
              name="email_id"
              value={state.email_id}
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>
              User Name
              <RedStarItem />
            </Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              required={state.formErrors.user_name}
              textField="Text"
              handleChange={handleChange}
              name="user_name"
              value={state.user_name}
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>
              Password
              <RedStarItem />
            </Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              required={state.formErrors.password}
              textField="Password"
              handleChange={handleChange}
              name="password"
              value={state.password}
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>
              Vendor short code
              <RedStarItem />
            </Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              required={state.formErrors.vendor_short_code}
              textField="Text"
              handleChange={handleChange}
              name="vendor_short_code"
              value={state.vendor_short_code}
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>
              Status
              <RedStarItem />
            </Label>
          </LabelSection>
          <ItemSection>
            <RadioGroups
              fsize="12px"
              fweight="400"
              mr="20px"
              ssize="20px"
              datas={status_datas}
              handleChange={handleRadioChange}
              value={state.status}
              name="status"
              ml="0px"
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
          fpadding="6px 105px"
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
          fpadding="6px 105px"
          bradius="8px"
          pending={loading}
          loader={loading}
        />
      </ButtonSection>
    </FormContainer>
  );
}

export default AddVendorModalForm;

const LocationItems = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 13px;
`;
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
  height: 380px;
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
  padding: 0px 40px 40px 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  /* margin-top: 50px; */
`;
