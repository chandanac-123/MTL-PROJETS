import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ButtonItem from "../ButtonItem";
import DatePickItem from "../Common/DatePickItem";
import FileInputItem from "../Common/FileInputItem";
import RedStarItem from "../Common/RedStarItem";
import TextFieldItem from "../Common/TextFieldItem";
import SelectBoxLabel from "../SelectBoxLabel";
import axios from "axios";
import { selectAccess } from "../../Slices/authSlice";
import { useSelector } from "react-redux";
import {
  convert_date_format,
  GetDecryptedPaswd,
  GetImageUrl,
} from "../../Functions/utils";
import dayjs from "dayjs";
import { create_user, edit_user } from "../../Api/UserApis";
import RadioGroups from "../RadioGroups";
import { district_dropdown } from "../../Api/DropDownApis";
import { useDispatch } from "react-redux";
import {
  get_data,
  patch_data_file,
  post_data,
  post_data_file,
} from "../../Store/common/commonSlice";

function AddUserModalForm(props) {
  const dispatch = useDispatch();
  const access = useSelector(selectAccess);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    phone: "",
    employee_code: "",
    employeeid_name: "",
    account_holder: "",
    address: "",
    designation: "",
    MACID: "",
    zone: "",
    salary: "",
    cpv_local: "",
    cpv_ocl_rate1: "",
    cpv_ocl_rate2: "",
    cpv_ocl_rate3: "",
    cpv_ogl_rate1: "",
    cpv_ogl_rate2: "",
    cpv_ogl_rate3: "",
    pd_rate: "",
    bank: "",
    branch: "",
    ifsc_code: "",
    account_number: "",
    joining_date: null,
    date_of_birth: "",
    blood_group: "",
    description: "",
    photo: "",
    districts: [],
    formErrors: {},
    is_active: true,
    address_district: "",
  });

  const [initialState, setInitialState] = useState();

  useEffect(() => {
    async function fetchMyAPI() {
      dispatch(get_data(district_dropdown))
        .then((res) => {
          // console.log('login res => ',res);
          const result = res?.payload;
          if (res?.payload?.status === 200) {
            setState((prevState) => {
              return {
                ...prevState,
                districts: result.data,
              };
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });

      // try {
      //   const result = await axios.get(district_dropdown, {
      //     headers: { Authorization: `Bearer ${access}` },
      //   });
      //   if (result.status === 200) {
      //     setState((prevState) => {
      //       return {
      //         ...prevState,
      //         districts: result.data,
      //       };
      //     });
      //   }
      // } catch (error) {
      //   console.log(error);
      // }
    }
    fetchMyAPI();
  }, []);

  useEffect(() => {
    async function fetchMediaPI() {
      let mediaUrl = props.instance?.avatar;
      let file = null;
      // mediaUrl = "https://dev.biju.srv1.mtlstaging.com:8113/pub/media/profile-pic/Screenshot_2023-03-30_101007_QjkuFW1.png"
      if (mediaUrl) {
        mediaUrl = GetImageUrl(mediaUrl);
        const response = await fetch(mediaUrl);
        const data = await response.blob();
        const filename = mediaUrl.substring(mediaUrl.lastIndexOf("/") + 1);
        file = new File([data], filename, { type: data.type });
      }

      if (props.is_edit) {
        let date_of_birth = new Date(props.instance.date_of_birth);
        date_of_birth = dayjs(date_of_birth);
        let pswd = GetDecryptedPaswd(props.instance.user.encrypted_password);
        // let photo = fetchMediaPI(props.instance.avatar)
        console.log(file);
        setState((prevState) => {
          return {
            ...prevState,
            id: props.instance.id,
            name: props.instance.user.username,
            email: props.instance.user.email,
            password: pswd,
            phone: props.instance.user.phonenumber,
            employee_code: props.instance.employee_code,
            employeeid_name: props.instance.employee_name,
            account_holder: props.instance.account_holder,
            address: props.instance.address,
            designation: props.instance.user.user_type,
            MACID: props.instance.mac_id,
            zone: "",
            address_district: props.instance.address_district,
            salary: props.instance.salary,
            cpv_local: props.instance.cpv_local,
            cpv_ocl_rate1: props.instance.cpv_ocl_rate1,
            cpv_ocl_rate2: props.instance.cpv_ocl_rate2,
            cpv_ocl_rate3: props.instance.cpv_ocl_rate3,
            cpv_ogl_rate1: props.instance.cpv_ogl_rate1,
            cpv_ogl_rate2: props.instance.cpv_ogl_rate2,
            cpv_ogl_rate3: props.instance.cpv_ogl_rate3,
            pd_rate: props.instance.pd_rate,
            bank: props.instance.bank,
            branch: "",
            ifsc_code: props.instance.bank,
            account_number: props.instance.account_number,
            joining_date: props.instance.joining_date,
            date_of_birth: date_of_birth,
            blood_group: props.instance.blood_group,
            description: props.instance.description,
            photo: file,
            is_active: props.instance.user.is_active,
          };
        });
        setInitialState((prevState) => {
          return {
            ...prevState,
            name: props.instance.user.username,
          };
        });
      }
    }
    fetchMediaPI();
  }, [props.is_edit]);

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

  const handleRadioChange = (value, name) => {
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const handleSelectChange = (value, name) => {
    let formErrors = state.formErrors;
    formErrors[name] = false;
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

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

  const compareFormData = (formData, initialFormData) => {
    return Object.keys(formData).reduce((changedFields, field) => {
      if (formData["name"] !== initialFormData["name"]) {
        changedFields.push(field);
      }
      return changedFields;
    }, []);
  };

  // const compareFormData = Object.keys(state).reduce((acc, key) => {
  //     if (state[key] !== previousState[key]) {
  //       return { ...acc, [key]: state[key] };
  //     }
  //     return acc;
  // }, {});

  const ValidationForm = () => {
    console.log(state.designation, "state.designation");
    let validRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let regex = /^\d{10}$/;
    let validation = true;
    let formErrors = state.formErrors;
    if (!state.name) {
      formErrors["name"] = true;
      validation = false;
    }
    if (!state.email) {
      formErrors["email"] = true;
      validation = false;
    } else if (state.email && !state.email.match(validRegex)) {
      formErrors["email"] = true;
      validation = false;
    }
    if (!state.password) {
      formErrors["password"] = true;
      validation = false;
    }
    if (!state.phone) {
      formErrors["phone"] = true;
      validation = false;
    } else if (state.phone && !state.phone.match(regex)) {
      formErrors["phone"] = true;
      validation = false;
    }
    if (!state.employee_code) {
      formErrors["employee_code"] = true;
      validation = false;
    }
    if (!state.employeeid_name) {
      formErrors["employeeid_name"] = true;
      validation = false;
    }
    if (!state.account_holder) {
      formErrors["account_holder"] = true;
      validation = false;
    }
    if (!state.address) {
      formErrors["address"] = true;
      validation = false;
    }
    if (!state.designation) {
      formErrors["designation"] = true;
      validation = false;
    }
    if (!state.address_district) {
      formErrors["address_district"] = true;
      validation = false;
    }
    if (!state.date_of_birth) {
      formErrors["date_of_birth"] = true;
      validation = false;
    }
    if (!state.blood_group) {
      formErrors["blood_group"] = true;
      validation = false;
    }
    if (!state.joining_date) {
      formErrors["joining_date"] = true;
      validation = false;
    }

    // if(state.designation === "FieldAgent"){
    //   if (!state.cpv_local) {
    //     formErrors["cpv_local"] = true;
    //     validation = false;
    //   }
    // }

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
      let date_of_birth = convert_date_format(state.date_of_birth);
      let joining_date = convert_date_format(state.joining_date);
      if (props.is_edit) {
        let changed_state = compareFormData(state, initialState);
        setLoading(true);
        let user = {
          user_type: state.designation,
          is_active: state.is_active,
        };
        let initial_pswd = GetDecryptedPaswd(
          props.instance.user.encrypted_password
        );
        if (initial_pswd !== state.password) {
          user.password = state.password;
        }
        if (props.instance.user.username !== state.name) {
          user.username = state.name;
        }
        if (props.instance.user.email !== state.email) {
          user.email = state.email;
        }
        if (props.instance.user.phonenumber !== state.phone) {
          user.phonenumber = state.phone;
        }
        // if (changed_state.length) {
        //   user["username"] = state.name;
        // }
        for (const key in user) {
          data.append(`user.${key}`, user[key]);
        }
        data.append("employee_name", state.employeeid_name);
        data.append("employee_code", state.employee_code);
        data.append("account_holder", state.account_holder);
        data.append("address", state.address);
        data.append("mac_id", state.MACID);
        data.append("salary", state.salary);
        data.append("cpv_local", state.cpv_local ? state.cpv_local : "");
        data.append(
          "cpv_ocl_rate1",
          state.cpv_ocl_rate1 ? state.cpv_ocl_rate1 : ""
        );
        data.append(
          "cpv_ocl_rate2",
          state.cpv_ocl_rate2 ? state.cpv_ocl_rate2 : ""
        );
        data.append(
          "cpv_ocl_rate3",
          state.cpv_ocl_rate3 ? state.cpv_ocl_rate3 : ""
        );
        data.append(
          "cpv_ogl_rate1",
          state.cpv_ogl_rate1 ? state.cpv_ogl_rate1 : ""
        );
        data.append(
          "cpv_ogl_rate2",
          state.cpv_ogl_rate2 ? state.cpv_ogl_rate2 : ""
        );
        data.append(
          "cpv_ogl_rate3",
          state.cpv_ogl_rate3 ? state.cpv_ogl_rate3 : ""
        );
        data.append("pd_rate", state.pd_rate ? state.pd_rate : "");
        data.append("bank", state.bank);
        data.append("ifsc_code", state.ifsc_code);
        data.append("account_number", state.account_number);
        data.append("date_of_birth", date_of_birth);
        data.append("blood_group", state.blood_group);
        data.append("description", state.description);
        data.append("address_district", state.address_district);
        data.append("joining_date", joining_date);
        if (state.photo != null) data.append("avatar", state.photo);

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
              alertSuccessFun("User Updated Successfully");
              setLoading(false);
              props.setState((prevState) => {
                return {
                  ...prevState,
                  refresh: true,
                };
              });
            } else if (result?.status === 400) {
              setLoading(false);
              if (result?.data?.user?.username) {
                alertErrorFun(result?.data?.user?.username[0]);
              } else if (result?.data?.error) {
                alertErrorFun(result?.data?.error);
              }
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
                errormsg = "User with this username already exists.";
              }
            } catch {}
            alertErrorFun(errormsg);
          });

        // try {
        //   setLoading(true)
        //   let user = {
        //     user_type: state.designation,
        //     is_active: state.is_active,
        //   };
        //   let initial_pswd = GetDecryptedPaswd(props.instance.user.encrypted_password)
        //   if(initial_pswd !== state.password){
        //       user.password = state.password
        //   }
        //   if(props.instance.user.username !== state.name){
        //       user.username = state.name
        //   }
        //   if(props.instance.user.email !== state.email){
        //       user.email = state.email
        //   }
        //   if(props.instance.user.phonenumber !== state.phone){
        //       user.phonenumber = state.phone
        //   }
        //   // if (changed_state.length) {
        //   //   user["username"] = state.name;
        //   // }
        //   for (const key in user) {
        //     data.append(`user.${key}`, user[key]);
        //   }
        //   data.append("employee_name", state.employeeid_name);
        //   data.append("employee_code", state.employee_code);
        //   data.append("account_holder", state.account_holder);
        //   data.append("address", state.address);
        //   data.append("mac_id", state.MACID);
        //   data.append("salary", state.salary);
        //   data.append("cpv_local", state.cpv_local?state.cpv_local:"");
        //   data.append("cpv_ocl_rate1", state.cpv_ocl_rate1?state.cpv_ocl_rate1:"");
        //   data.append("cpv_ocl_rate2", state.cpv_ocl_rate2? state.cpv_ocl_rate2:"");
        //   data.append("cpv_ocl_rate3", state.cpv_ocl_rate3?state.cpv_ocl_rate3:"");
        //   data.append("cpv_ogl_rate1", state.cpv_ogl_rate1?state.cpv_ogl_rate1:"");
        //   data.append("cpv_ogl_rate2", state.cpv_ogl_rate2?state.cpv_ogl_rate2:"");
        //   data.append("cpv_ogl_rate3", state.cpv_ogl_rate3?state.cpv_ogl_rate3:"");
        //   data.append("pd_rate", state.pd_rate?state.pd_rate:"");
        //   data.append("bank", state.bank);
        //   data.append("ifsc_code", state.ifsc_code);
        //   data.append("account_number", state.account_number);
        //   data.append("date_of_birth", date_of_birth);
        //   data.append("blood_group", state.blood_group);
        //   data.append("description", state.description);
        //   data.append("address_district", state.address_district);
        //   data.append("joining_date", joining_date);
        //   if(state.photo!=null)
        //   data.append("avatar", state.photo)
        // const result = await axios.patch(
        //     edit_user + state.id,
        //     data,
        //     {
        //       headers: {
        //         Authorization: `Bearer ${access}`,
        //         "Content-Type": "multipart/form-data",
        //       },
        //     }
        //   );
        //   if (result.status === 200) {
        //     handleClose();
        //     alertSuccessFun("User Updated Successfully");
        //     setLoading(false)
        //   }
        // } catch (error) {
        //   setLoading(false)
        //   let errormsg=error.response.data.error
        //   try{
        //       if(error.response.data.user.username[0]=='user with this username already exists.'){
        //           errormsg="User with this username already exists."
        //       }
        //   }
        //  catch{}
        //   alertErrorFun(errormsg)
        // }
      } else {
        setLoading(true);
        let user = {
          username: state.name,
          password: state.password,
          email: state.email,
          phonenumber: state.phone,
          user_type: state.designation,
          is_active: state.is_active,
        };
        for (const key in user) {
          data.append(`user.${key}`, user[key]);
        }
        data.append("employee_name", state.employeeid_name);
        data.append("employee_code", state.employee_code);
        data.append("account_holder", state.account_holder);
        data.append("address", state.address);
        data.append("mac_id", state.MACID);
        data.append("salary", state.salary);
        data.append("cpv_local", state.cpv_local);
        data.append("cpv_ocl_rate1", state.cpv_ocl_rate1);
        data.append("cpv_ocl_rate2", state.cpv_ocl_rate2);
        data.append("cpv_ocl_rate3", state.cpv_ocl_rate3);
        data.append("cpv_ogl_rate1", state.cpv_ogl_rate1);
        data.append("cpv_ogl_rate2", state.cpv_ogl_rate2);
        data.append("cpv_ogl_rate3", state.cpv_ogl_rate3);
        data.append("pd_rate", state.pd_rate);
        data.append("bank", state.bank);
        data.append("ifsc_code", state.ifsc_code);
        data.append("account_number", state.account_number);
        data.append("date_of_birth", date_of_birth);
        data.append("blood_group", state.blood_group);
        data.append("description", state.description);
        data.append("address_district", state.address_district);
        data.append("joining_date", joining_date);
        data.append("avatar", state.photo);

        let param = {
          values: data,
          url: create_user,
        };

        dispatch(post_data_file(param))
          .then((res) => {
            const result = res?.payload;
            console.log("result res => ", result);
            if (result?.status === 201) {
              handleClose();
              alertSuccessFun("User Added Successfully");
              setLoading(false);
              props.setState((prevState) => {
                return {
                  ...prevState,
                  refresh: true,
                };
              });
            } else if (result?.status === 400) {
              setLoading(false);
              if (result?.data?.user?.username) {
                alertErrorFun(result?.data?.user?.username[0]);
              } else if (result?.data?.error) {
                alertErrorFun(result?.data?.error);
              }
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
                errormsg = "User with this username already exists.";
              }
            } catch {}
            alertErrorFun(errormsg);
          });

        // try {
        //   setLoading(true)
        //   let user = {
        //     username: state.name,
        //     password: state.password,
        //     email: state.email,
        //     phonenumber: state.phone,
        //     user_type: state.designation,
        //     is_active: state.is_active,
        //   };
        //   for (const key in user) {
        //     data.append(`user.${key}`, user[key]);
        //   }
        //   data.append("employee_name", state.employeeid_name);
        //   data.append("employee_code", state.employee_code);
        //   data.append("account_holder", state.account_holder);
        //   data.append("address", state.address);
        //   data.append("mac_id", state.MACID);
        //   data.append("salary", state.salary);
        //   data.append("cpv_local", state.cpv_local);
        //   data.append("cpv_ocl_rate1", state.cpv_ocl_rate1);
        //   data.append("cpv_ocl_rate2", state.cpv_ocl_rate2);
        //   data.append("cpv_ocl_rate3", state.cpv_ocl_rate3);
        //   data.append("cpv_ogl_rate1", state.cpv_ogl_rate1);
        //   data.append("cpv_ogl_rate2", state.cpv_ogl_rate2);
        //   data.append("cpv_ogl_rate3", state.cpv_ogl_rate3);
        //   data.append("pd_rate", state.pd_rate);
        //   data.append("bank", state.bank);
        //   data.append("ifsc_code", state.ifsc_code);
        //   data.append("account_number", state.account_number);
        //   data.append("date_of_birth", date_of_birth);
        //   data.append("blood_group", state.blood_group);
        //   data.append("description", state.description);
        //   data.append("address_district", state.address_district);
        //   data.append("joining_date", joining_date);
        //   data.append("avatar", state.photo);
        //   const result = await axios.post(
        //     create_user,
        //     data,
        //     {
        //       headers: {
        //         Authorization: `Bearer ${access}`,
        //         "Content-Type": "multipart/form-data",
        //       },
        //     }
        //   );
        //   if (result.status === 201) {
        //     handleClose();
        //     alertSuccessFun("User Added Successfully");
        //     setLoading(false)
        //   }
        // } catch (error) {
        //   setLoading(false)
        //   let errormsg=error.response.data.error
        //   try{
        //       if(error.response.data.user.username[0]=='user with this username already exists.'){
        //           errormsg="User with this username already exists."
        //       }
        //   }
        //  catch{}
        //   alertErrorFun(errormsg)
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

  const alertErrorFun = (msg) => {
    props.setSnackbarStatus({ isOpen: true, severity: "error", message: msg });
  };

  const designations = [
    {
      name: "Field Agent",
      id: "FieldAgent",
    },
    {
      name: "Group Leader",
      id: "GroupLeader",
    },
    {
      name: "Product Coordinator",
      id: "ProductCoordinator",
    },
    {
      name: "Team Member",
      id: "TeamMember",
    },
    {
      name: "District Coordinator",
      id: "DistrictCoordinator",
    },
    {
      name: "Executive Office Admin",
      id: "ExecutiveOfficeAdmin",
    },
  ];

  const blood_groups = [
    {
      name: "A+",
      id: "A+",
    },
    {
      name: "A-",
      id: "A-",
    },
    {
      name: "B+",
      id: "B+",
    },
    {
      name: "B-",
      id: "B-",
    },
    {
      name: "O+",
      id: "O+",
    },
    {
      name: "O-",
      id: "O-",
    },
    {
      name: "AB+",
      id: "AB+",
    },
    {
      name: "AB-",
      id: "AB-",
    },
  ];

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
          {props.is_edit ? (
            <Title>Edit User</Title>
          ) : (
            <Title>Add User(add new)</Title>
          )}
        </SubHead>
        <SubHead className="icons">
          {/* <img src={require('../../Assets/images/close-square.png')} /> */}
        </SubHead>
      </HeadSection>
      <FormSection>
        <ItemRow>
          <LabelSection>
            <Label>
              User Name
              <RedStarItem />
            </Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              required={state.formErrors.name}
              textField="Text"
              width="377px"
              handleChange={handleChange}
              name="name"
              value={state.name}
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>
              Email
              <RedStarItem />
            </Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              required={state.formErrors.email}
              textField="Email"
              width="377px"
              handleChange={handleChange}
              name="email"
              value={state.email}
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
              textField="Password"
              required={state.formErrors.password}
              width="377px"
              handleChange={handleChange}
              name="password"
              value={state.password}
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>
              Phone
              <RedStarItem />
            </Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              required={state.formErrors.phone}
              textField="PhoneNum"
              width="377px"
              handleChange={handleChange}
              name="phone"
              value={state.phone}
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>
              Employee <br /> ID Name
              <RedStarItem />
            </Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              required={state.formErrors.employee_code}
              textField="Text"
              width="377px"
              handleChange={handleChange}
              name="employee_code"
              value={state.employee_code}
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>
              Employee Code
              <RedStarItem />
            </Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              required={state.formErrors.employeeid_name}
              textField="Text"
              width="377px"
              handleChange={handleChange}
              name="employeeid_name"
              value={state.employeeid_name}
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>
              Account Holder
              <RedStarItem />
            </Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              required={state.formErrors.account_holder}
              textField="Text"
              width="377px"
              handleChange={handleChange}
              name="account_holder"
              value={state.account_holder}
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>
              Address
              <RedStarItem />
            </Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              required={state.formErrors.address}
              textField="Text"
              width="377px"
              handleChange={handleChange}
              name="address"
              value={state.address}
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>
              Designation
              <RedStarItem />
            </Label>
          </LabelSection>
          <ItemSection>
            <SelectBoxLabel
              required={state.formErrors.designation}
              selectType="EmployeeName"
              datas={designations}
              handleChange={handleSelectChange}
              name="designation"
              value={state.designation}
              default="Select"
              fpadding="9.5px 14px"
              fsize="12px"
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>MACID</Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              width="377px"
              handleChange={handleChange}
              textField="Text"
              name="MACID"
              value={state.MACID}
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>
              District
              <RedStarItem />
            </Label>
          </LabelSection>
          <ItemSection>
            <SelectBoxLabel
              required={state.formErrors.address_district}
              datas={state.districts}
              handleChange={handleSelectChange}
              name="address_district"
              value={state.address_district}
              default="Select"
              selectType="EmployeeName"
              fpadding="9.5px 14px"
              fsize="12px"
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>Salary</Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              width="377px"
              handleChange={handleChange}
              textField="Numeric"
              name="salary"
              value={state.salary}
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>CPV Local Rate</Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              // required={state.formErrors.cpv_local}
              textField="DecimalVal"
              width="377px"
              handleChange={handleChange}
              name="cpv_local"
              value={state.cpv_local}
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>CPV OCL Rate 1</Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              textField="DecimalVal"
              width="377px"
              handleChange={handleChange}
              name="cpv_ocl_rate1"
              value={state.cpv_ocl_rate1}
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>CPV OCL Rate 2</Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              textField="DecimalVal"
              width="377px"
              handleChange={handleChange}
              name="cpv_ocl_rate2"
              value={state.cpv_ocl_rate2}
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>CPV OCL Rate 3</Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              textField="DecimalVal"
              width="377px"
              handleChange={handleChange}
              name="cpv_ocl_rate3"
              value={state.cpv_ocl_rate3}
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>CPV OGL Rate 1</Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              textField="DecimalVal"
              width="377px"
              handleChange={handleChange}
              name="cpv_ogl_rate1"
              value={state.cpv_ogl_rate1}
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>CPV OGL Rate 2</Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              textField="DecimalVal"
              width="377px"
              handleChange={handleChange}
              name="cpv_ogl_rate2"
              value={state.cpv_ogl_rate2}
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>CPV OGL Rate 3</Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              textField="DecimalVal"
              width="377px"
              handleChange={handleChange}
              name="cpv_ogl_rate3"
              value={state.cpv_ogl_rate3}
            />
          </ItemSection>
        </ItemRow>

        <ItemRow>
          <LabelSection>
            <Label>PD Rate</Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              textField="DecimalVal"
              width="377px"
              handleChange={handleChange}
              name="pd_rate"
              value={state.pd_rate}
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>Bank</Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              width="377px"
              textField="Text"
              handleChange={handleChange}
              name="bank"
              value={state.bank}
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>IFSC Code</Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              width="377px"
              textField="Text"
              handleChange={handleChange}
              name="ifsc_code"
              value={state.ifsc_code}
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>Account Number</Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              width="377px"
              handleChange={handleChange}
              textField="Text"
              name="account_number"
              value={state.account_number}
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>
              Joining Date
              <RedStarItem />
            </Label>
          </LabelSection>
          <ItemSection>
            <DatePickItem
              required={state.formErrors.joining_date}
              handleChange={handleSelectChange}
              name="joining_date"
              value={state.joining_date}
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>
              Date Of Birth <RedStarItem />
            </Label>
          </LabelSection>
          <ItemSection>
            <DatePickItem
              required={state.formErrors.date_of_birth}
              handleChange={handleSelectChange}
              name="date_of_birth"
              value={state.date_of_birth}
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>
              Blood Group <RedStarItem />
            </Label>
          </LabelSection>
          <ItemSection>
            <SelectBoxLabel
              required={state.formErrors.blood_group}
              datas={blood_groups}
              handleChange={handleSelectChange}
              name="blood_group"
              value={state.blood_group}
              selectType="EmployeeName"
              default="Select"
              fpadding="9.5px 14px"
              fsize="12px"
            />
          </ItemSection>
        </ItemRow>
        <ItemRow className="flex-start">
          <LabelSection>
            <Label>Description</Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              width="377px"
              textField="Text"
              handleChange={handleChange}
              name="description"
              value={state.description}
              multiLine={true}
              row={2}
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>Photo</Label>
          </LabelSection>
          <ItemSection>
            <FileInputItem
              handleFileChange={handleFileChange}
              name="photo"
              value={state.photo}
              bcolor="#64A7DC"
              fwidth="97%"
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>Status</Label>
          </LabelSection>
          <ItemSection>
            <RadioGroups
              fsize="12px"
              fweight="400"
              mr="20px"
              ssize="20px"
              datas={status_datas}
              handleChange={handleRadioChange}
              value={state.is_active}
              name="is_active"
              ml="0px"
            />
          </ItemSection>
        </ItemRow>
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
          fpadding="6px 105px"
          bradius="8px"
        />
        <ButtonItem
          name="Submit"
          handleClick={handleSubmit}
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

export default AddUserModalForm;

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
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  /* margin-top: 50px; */
`;
