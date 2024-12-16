import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { create_admin } from "../../Api/AdminManagementAPIs";
import { GetDecryptedPaswd } from "../../Functions/utils";
import { selectAccess } from "../../Slices/authSlice";
import { post_data, put_data } from "../../Store/common/commonSlice";
import ButtonItem from "../ButtonItem";
import CheckBoxItem from "../Common/CheckBoxItem";
import RedStarItem from "../Common/RedStarItem";
import TextFieldItem from "../Common/TextFieldItem";
import RadioGroups from "../RadioGroups";

function AdminManagementModalForm(props) {
  const dispatch = useDispatch();
  const access = useSelector(selectAccess);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    name: "",
    username: "",
    password: "",
    status: "active",
    permissions: [
      {
        label: "Verification",
        name: "verification",
        view: false,
        edit: false,
      },
      {
        label: "Admin",
        name: "admin",
        view: false,
        edit: false,
      },
      {
        label: "Vendor Billing",
        name: "vendor_billing",
        view: false,
        edit: false,
      },
      {
        label: "Meter Reading",
        name: "meter_reading",
        view: false,
        edit: false,
      },
      {
        label: "Mobile Request",
        name: "usermobile",
        view: false,
        edit: false,
      },
      {
        label: "Time Tracker",
        name: "time_tracker",
        view: false,
        edit: false,
      },
      {
        label: "Work Tracker",
        name: "worker_tracker",
        view: false,
        edit: false,
      },
      {
        label: "Download Image",
        name: "download_image",
        view: false,
        edit: false,
      },
      {
        label: "Report",
        name: "report",
        view: false,
        edit: false,
      },
      {
        label: "Role Management",
        name: "role_management",
        view: false,
        edit: false,
      },
    ],
    formErrors: {},
    id: null,
  });

  useEffect(() => {
    if (props.singleData) {
      let id = props.singleData?.id;
      let name = props.singleData?.first_name;
      let username = props.singleData?.username;
      let password = GetDecryptedPaswd(props.singleData?.encrypted_password);
      let status = props.singleData?.is_active ? "active" : "inactive";
      let permissions = [...state.permissions];
      let menu_list = props.singleData.menu_list;

      menu_list.forEach((menuItem) => {
        // Find the matching permission in the 'permissions' array
        const permission = permissions.find((p) => p.name === menuItem.menu);

        // If a matching permission is found
        if (permission) {
          // Update the 'view' and 'edit' values based on the 'actions' in 'menu_list'
          permission.view = menuItem.actions.view;
          permission.edit = menuItem.actions.change;
        }
      });

      console.log(permissions);
      setState((prevState) => {
        return {
          ...prevState,
          id,
          name,
          username,
          password,
          status,
          permissions,
        };
      });
    }
  }, [props.singleData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
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

  const handleCheckBox = (name, value, action) => {
    let permissions = [...state.permissions];
    let instance = permissions.filter((i) => i.name === name)[0];
    if (action === "view") {
      instance.view = !value;
      if (!value === false) {
        instance.edit = false;
      }
    } else if (action === "edit") {
      console.log(value);
      instance.edit = !value;
      if (!value) {
        instance.view = !value;
      }
    }
    setState((prevState) => {
      return {
        ...prevState,
        permissions,
      };
    });
    console.log(permissions);
  };

  const handleDelete = () => {
    console.log("delete");
  };

  const ValidationForm = () => {
    let validRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let regex = /^\d{10}$/;
    let validation = true;
    let formErrors = state.formErrors;
    if (!state.name) {
      formErrors["name"] = true;
      validation = false;
    }
    if (!state.username) {
      formErrors["username"] = true;
      validation = false;
    }
    if (!state.password) {
      formErrors["password"] = true;
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

  const handleSubmit = async () => {
    let validation = ValidationForm();
    if (validation) {
      const permissions = state.permissions;
      let verification = {};
      let admin = {};
      let vendor_billing = {};
      let meter_reading = {};
      let usermobile = {};
      let time_tracker = {};
      let worker_tracker = {};
      let download_image = {};
      let report = {};
      let role_management = {};
      permissions.map((i) => {
        if (i.name === "verification") {
          verification.view = i.view;
          verification.change = i.edit;
        }
        if (i.name === "admin") {
          admin.view = i.view;
          admin.change = i.edit;
        }
        if (i.name === "vendor_billing") {
          vendor_billing.view = i.view;
          vendor_billing.change = i.edit;
        }
        if (i.name === "meter_reading") {
          meter_reading.view = i.view;
          meter_reading.change = i.edit;
        }
        if (i.name === "time_tracker") {
          time_tracker.view = i.view;
          time_tracker.change = i.edit;
        }
        if (i.name === "worker_tracker") {
          worker_tracker.view = i.view;
          worker_tracker.change = i.edit;
        }
        if (i.name === "download_image") {
          download_image.view = i.view;
          download_image.change = i.edit;
        }
        if (i.name === "report") {
          report.view = i.view;
          report.change = i.edit;
        }
        if (i.name === "role_management") {
          role_management.view = i.view;
          role_management.change = i.edit;
        }
        if (i.name === "usermobile") {
          usermobile.view = i.view;
          usermobile.change = i.edit;
        }
      });

      if (state.id) {
        let url = create_admin + state.id + "/";
        setLoading(true);
        let param = {
          values: {
            first_name: state.name,
            username: state.username,
            password: state.password,
            is_active: state.status === "active",
            verification: verification,
            admin: admin,
            vendor_billing: vendor_billing,
            meter_reading: meter_reading,
            time_tracker: time_tracker,
            worker_tracker: worker_tracker,
            download_image: download_image,
            report: report,
            role_management: role_management,
            usermobile: usermobile,
          },
          url: url,
        };

        dispatch(put_data(param))
          .then((res) => {
            // console.log('login res => ',res);
            const result = res?.payload;
            if (result?.status === 200) {
              props.setState((prevState) => {
                return {
                  ...prevState,
                  refresh: true,
                };
              });
              console.log("enter");
              alertSuccessFun("Admin updated Successfully");
              props.setOpen(false);
              setLoading(false);
            }
          })
          .catch((error) => {
            setLoading(false);
            alertErrorFun(error?.response?.data?.error);
          });

        // try {
        //   setLoading(true);
        //   const result = await axios.put(
        //     url,
        //     {
        //       first_name: state.name,
        //       username: state.username,
        //       password: state.password,
        //       is_active: state.status === "active",
        //       verification: verification,
        //       admin: admin,
        //       vendor_billing: vendor_billing,
        //       meter_reading: meter_reading,
        //       time_tracker: time_tracker,
        //       worker_tracker: worker_tracker,
        //       download_image: download_image,
        //       report: report,
        //       role_management: role_management,
        //       usermobile: usermobile,
        //     },
        //     { headers: { Authorization: `Bearer ${access}` } }
        //   );
        //   if (result.status === 200) {
        //     //   handleClose();
        //     props.setState((prevState) => {
        //       return {
        //         ...prevState,
        //         refresh: true,
        //       };
        //     });
        //     console.log("enter");
        //     alertSuccessFun("Admin updated Successfully");
        //     props.setOpen(false);
        //     setLoading(false);
        //   }
        // } catch (error) {
        //   setLoading(false);
        //   alertErrorFun(error?.response?.data?.error);
        // }
      } else {
        setLoading(true);
        let param = {
          values: {
            first_name: state.name,
            username: state.username,
            password: state.password,
            is_active: state.status === "active",
            verification: verification,
            admin: admin,
            vendor_billing: vendor_billing,
            meter_reading: meter_reading,
            usermobile: usermobile,
            time_tracker: time_tracker,
            worker_tracker: worker_tracker,
            download_image: download_image,
            report: report,
            role_management: role_management,
          },
          url: create_admin,
        };

        dispatch(post_data(param))
          .then((res) => {
            // console.log('login res => ',res);
            const result = res?.payload;
            if (result?.status === 201) {
              props.setState((prevState) => {
                return {
                  ...prevState,
                  refresh: true,
                };
              });
              alertSuccessFun("Admin added Successfully");
              props.setOpen(false);
              setLoading(false);
            }
          })
          .catch((error) => {
            setLoading(false);
            alertErrorFun(
              error?.response?.data?.username[0] || error?.response?.data?.error
            );
            console.log(error);
          });

        // try {
        //   setLoading(true);
        //   const result = await axios.post(
        //     create_admin,
        //     {
        //       first_name: state.name,
        //       username: state.username,
        //       password: state.password,
        //       is_active: state.status === "active",
        //       verification: verification,
        //       admin: admin,
        //       vendor_billing: vendor_billing,
        //       meter_reading: meter_reading,
        //       usermobile: usermobile,
        //       time_tracker: time_tracker,
        //       worker_tracker: worker_tracker,
        //       download_image: download_image,
        //       report: report,
        //       role_management: role_management,
        //     },
        //     { headers: { Authorization: `Bearer ${access}` } }
        //   );
        //   if (result.status === 201) {
        //     //   handleClose();
        //     props.setState((prevState) => {
        //       return {
        //         ...prevState,
        //         refresh: true,
        //       };
        //     });
        //     alertSuccessFun("Admin added Successfully");
        //     props.setOpen(false);
        //     setLoading(false);
        //   }
        // } catch (error) {
        //   setLoading(false);
        //   alertErrorFun(error?.response?.data?.username[0]||error?.response?.data?.error);
        //   console.log(error);
        // }
      }
    }
  };

  let datas = [
    {
      name: "active",
      label: "Active",
      checked: true,
    },
    {
      name: "inactive",
      label: "Inactive",
      checked: false,
    },
  ];

  return (
    <FormContainer>
      <HeadSection>
        <Title>{props.is_edit ? "Edit" : "Add New"} Admin</Title>
      </HeadSection>
      <FormSection>
        <TopSection>
          <ItemRow>
            <LabelSection>
              <Label>
                Name
                <RedStarItem />
              </Label>
            </LabelSection>
            {/* <ItemSection>
                    <TextFieldItem placeholder="" handleChange={handleChange} name="name" value={state.name} />
                </ItemSection> */}
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
                User Name
                <RedStarItem />
              </Label>
            </LabelSection>
            <ItemSection>
              <TextFieldItem
                required={state.formErrors.username}
                textField="Text"
                width="377px"
                handleChange={handleChange}
                name="username"
                value={state.username}
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
              <Label>Status</Label>
            </LabelSection>
            <ItemSection>
              <RadioGroups
                datas={datas}
                handleChange={handleRadioChange}
                value={state.status}
                name="status"
                fsize="12px"
                fweight="400"
                mr="20px"
                ssize="20px"
              />
            </ItemSection>
          </ItemRow>
        </TopSection>
        <BorderItem>
          <ItemRow className="heading">
            <LabelSection>
              <Label className="head">Add User Role</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue></SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow className="">
            <LabelSection>
              <Label className="sub-head">Permissions</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue></SpanValue>
            </ItemSection>
          </ItemRow>
          {state.permissions.map((i, index) => (
            <ItemRow key={index}>
              <LabelSection>
                <Label>{i.label}</Label>
              </LabelSection>
              <ItemSection>
                <CheckContainer>
                  <CheckBoxSection
                    onClick={() => handleCheckBox(i.name, i.view, "view")}
                  >
                    <CheckBoxItem clr="#969696" ticked={i.view} />
                    <SpanValue>View</SpanValue>
                  </CheckBoxSection>
                  <CheckBoxSection
                    onClick={() => handleCheckBox(i.name, i.edit, "edit")}
                  >
                    <CheckBoxItem clr="#969696" ticked={i.edit} />
                    <SpanValue>EDIT</SpanValue>
                  </CheckBoxSection>
                </CheckContainer>
              </ItemSection>
            </ItemRow>
          ))}
        </BorderItem>
      </FormSection>
      <ButtonSection>
        <ButtonItem
          handleClick={() => props.setOpen(false)}
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
          name="Submit"
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

export default AdminManagementModalForm;

const TopSection = styled.div``;
const CheckContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: 45px;
`;
const CheckBoxSection = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: 40px;
`;
const BorderItem = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 25px;
  margin-bottom: 25px;
`;
const SpanValue = styled.span`
  color: #000000;
  font-size: 12px;
  font-weight: 400;
  &.important {
    font-size: 14px;
    font-weight: 700;
  }
  &.secondary {
    color: #444445;
  }
`;
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
  margin-bottom: 20px;
  &.heading {
    margin-bottom: 10px;
  }
  &.flex-start {
    align-items: flex-start;
  }
`;
const LabelSection = styled.div``;
const Label = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #000000;
  &.head {
    font-size: 14px;
  }
  &.sub-head {
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
