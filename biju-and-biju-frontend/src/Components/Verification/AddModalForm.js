import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ButtonItem from "../ButtonItem";
import DisableDatePickItem from "../Common/DisableDatePickItem";
import TextFieldItem from "../Common/TextFieldItem";
import TimePickItem from "../Common/TimePickItem";
import SelectBoxLabel from "../SelectBoxLabel";
import {
  v2_product_dropdown,
  disctrict_dropdown,
  add_verification_url,
  v2_vendor_dropdown,
} from "../../Api/VerificationApis";
import { selectAccess } from "../../Slices/authSlice";
import { useSelector } from "react-redux";
import VendorListSelect from "../Common/VendorListSelect";
import RedStarItem from "../Common/RedStarItem";
import dayjs from "dayjs";
import { extract_date } from "../../Functions/utils";
import { useDispatch } from "react-redux";
import { get_data, post_data } from "../../Store/common/commonSlice";
import { useMediaQuery } from "react-responsive";

function AddModalForm(props) {
  const isMobileScreen = useMediaQuery({ query: "(max-width: 480px)" });
  const [buttonloading, setButtonloading] = useState(false);
  const dispatch = useDispatch();
  const access = useSelector(selectAccess);
  var now = dayjs();
  const hourse = now?.$H;
  const minutes = now?.$m;
  const [state, setState] = useState({
    formErrors: {},
    vendor: "",
    product_name: "",
    application_id: "",
    customer_name: "",
    fi_date: "",
    fi_date_time: new Date(),
    fi_initiated_time: `${hourse}:${minutes}`,
    billing_location: "",
    applicant_type: "",
    residence_address: "",
    residence_district: "",
    permanent_address: "",
    permanent_district: "",
    office_address: "",
    office_district: "",
    pd_address: "",
    pd_district: "",
    vendor_list: [],
    product_list: [],
    district_list: [],
    district_name: "",
    addresses: [],
    fi_type: "",
    adress: "",
    allocation_delay: "",
    adress_district: "",
    customer_number: "",
  });
  const currentDateCompare =
    extract_date(state.fi_date_time) == extract_date(now.$d);

  useEffect(() => {
    const time = `${hourse}:${minutes}`;
    setState((prevState) => {
      return {
        ...prevState,
        fi_initiated_time: time,
      };
    });
  }, []);

  useEffect(() => {
    async function fetchMyAPI() {
      dispatch(get_data(v2_vendor_dropdown))
        .then((res) => {
          // console.log('login res => ',res);
          const result = res?.payload;
          if (res?.payload?.status === 200) {
            setState((prevState) => {
              return {
                ...prevState,
                vendor_list: result.data,
              };
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    
      if (state.vendor) {
        let url = v2_product_dropdown + `?vendor=${state.vendor}`;
        dispatch(get_data(url))
          .then((res) => {
            const product_result = res?.payload;
            if (res?.payload?.status === 200) {
              setState((prevState) => {
                return {
                  ...prevState,
                  product_list: product_result.data,
                };
              });
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }

      dispatch(get_data(disctrict_dropdown))
        .then((res) => {
          const product_result = res?.payload;
          if (res?.payload?.status === 200) {
            setState((prevState) => {
              return {
                ...prevState,
                district_list: product_result.data,
              };
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });

    }
    fetchMyAPI();
  }, [state.vendor]);

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formErrors = state.formErrors;
    formErrors[name] = false;
    if (
      state.residence_address ||
      state.permanent_address ||
      state.office_address ||
      state.pd_address
    ) {
      formErrors["address"] = false;
    }
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

  const handleTimeChange = (value, name) => {
    const hourse = value?.$H;
    const minutes = value?.$m;
    const time = `${hourse}:${minutes}`;
    setState((prevState) => {
      return {
        ...prevState,
        [name]: time,
      };
    });
  };

  const ValidationForm = () => {
    let validation = true;
    let formErrors = state.formErrors;
    if (!state.vendor) {
      formErrors["vendor"] = true;
      validation = false;
    }
    if (!state.applicant_type) {
      formErrors["applicant_type"] = true;
      validation = false;
    }
    if (!state.residence_district && state.residence_address) {
      formErrors["residence_district"] = true;
      validation = false;
    }
    if (state.residence_district && !state.residence_address) {
      formErrors["residence_address"] = true;
      validation = false;
    }
    if (!state.office_district && state.office_address) {
      formErrors["office_district"] = true;
      validation = false;
    }
    if (state.office_district && !state.office_address) {
      formErrors["office_address"] = true;
      validation = false;
    }
    if (!state.permanent_district && state.permanent_address) {
      formErrors["permanent_district"] = true;
      validation = false;
    }
    if (state.permanent_district && !state.permanent_address) {
      formErrors["permanent_address"] = true;
      validation = false;
    }
    if (!state.pd_district && state.pd_address) {
      formErrors["pd_district"] = true;
      validation = false;
    }
    if (state.pd_district && !state.pd_address) {
      formErrors["pd_address"] = true;
      validation = false;
    }
    if (!state.product_name) {
      formErrors["product_name"] = true;
      validation = false;
    }
    if (!state.customer_name) {
      formErrors["customer_name"] = true;
      validation = false;
    }
    if (
      !state.residence_address &&
      !state.permanent_address &&
      !state.office_address &&
      !state.pd_address
    ) {
      formErrors["address"] = true;
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

  const dateFun = (date1, date2) => {
    const year = date1.getFullYear();
    const month = date1.getMonth();
    const day = date1.getDate();
    const hours = date2.split(":")[0];
    const minutes = date2.split(":")[1];
    const combinedDateTime = new Date(year, month, day, hours, minutes);
    return combinedDateTime;
  };

  const date1 = new Date(state.fi_date_time);

  const handleSubmit = async () => {
    let selectedTime = dateFun(date1, state.fi_initiated_time);
    let validation = ValidationForm();
    let addresses = [
      {
        fi_type: "RV",
        adress: state.residence_address,
        fi_date_time: selectedTime,
        allocation_delay: null,
        adress_district: state.residence_district,
      },
      {
        fi_type: "PV",
        adress: state.permanent_address,
        fi_date_time: selectedTime,
        allocation_delay: null,
        adress_district: state.permanent_district,
      },
      {
        fi_type: "BV",
        adress: state.office_address,
        fi_date_time: selectedTime,
        allocation_delay: null,
        adress_district: state.office_district,
      },
      {
        fi_type: "PD",
        adress: state.pd_address,
        fi_date_time: selectedTime,
        allocation_delay: null,
        adress_district: state.pd_district,
      },
    ];

    const filterUnwanted = (arr) => {
      const required = arr.filter((el) => {
        return el.adress;
      });
      return required;
    };

    if (validation) {
      setButtonloading(true);
      let param = {
        values: {
          addresses: filterUnwanted(addresses),
          application_id: state.application_id,
          applicant_type: state.applicant_type,
          customer_name: state.customer_name,
          customer_number: state.customer_number,
          vendor: state.vendor,
          product: state.product_name,
          customer_number: state.customer_number,
        },
        url: add_verification_url,
      };
      dispatch(post_data(param))
        .then((res) => {
          const result = res?.payload;
          if (result?.status === 201) {
            setButtonloading(false);
            handleClose();
            alertSuccessFun("Verification added successfully");
            props.setState((prevState) => {
              return {
                ...prevState,
                refresh: true,
              };
            });
          }
        })
        .catch((error) => {
          setButtonloading(false);
          alertErrorFun(error.response.data.error);
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

  const applicantType = [
    { name: "Applicant", id: "Applicant" },
    { name: "Co Applicant", id: "Co Applicant" },
    { name: "Guarantor", id: "Guarantor" },
  ];
  return (
    <FormContainer>
      <HeadSection>
        <SubHead className="icons"></SubHead>
        <SubHead>
          <Title>Add New Verification</Title>
        </SubHead>
        <SubHead
          className="icons"
          onClick={() => props.setOpen(false)}
        ></SubHead>
      </HeadSection>
      <FormSection onChange={(e) => handleChange(e)}>
        <ItemRow>
          <LabelSection>
            <Label>
              Select Vendor
              <RedStarItem />
            </Label>
          </LabelSection>
          <ItemSection>
            <VendorListSelect
              datas={state.vendor_list}
              required={state.formErrors.vendor}
              handleChange={handleSelectChange}
              name="vendor"
              value={state.vendor}
              default="Select"
              fpadding="9.5px 14px"
              fsize="12px"
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>
              Select Product
              <RedStarItem />
            </Label>
          </LabelSection>
          <ItemSection>
            <SelectBoxLabel
              required={state.formErrors.product_name}
              selectType="ProductName"
              datas={state.product_list}
              default="Select Product"
              fpadding="9.5px 14px"
              fsize="12px"
              handleChange={handleSelectChange}
              name="product_name"
              value={state.product_name}
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>Application ID</Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              width="377px"
              textField="Text"
              placeholder="Application ID"
              name="application_id"
              value={state.application_id ? state.application_id : ""}
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>
              Customer Name
              <RedStarItem />
            </Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              required={state.formErrors.customer_name}
              textField="Text"
              width="377px"
              placeholder="Customer Name"
              name="customer_name"
              value={state.customer_name ? state.customer_name : ""}
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>
              FI Date
              <RedStarItem />
            </Label>
          </LabelSection>
          <ItemSection>
            <DisableDatePickItem
              handleChange={handleSelectChange}
              name="fi_date_time"
              value={state.fi_date_time}
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>
              FI Time
              <RedStarItem />
            </Label>
          </LabelSection>
          <ItemSection>
            <TimePickItem
              verTime={currentDateCompare}
              handleChange={handleTimeChange}
              name="fi_initiated_time"
              value={state.fi_initiated_time}
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>
              Applicant Type
              <RedStarItem />
            </Label>
          </LabelSection>
          <ItemSection>
            <SelectBoxLabel
              required={state.formErrors.applicant_type}
              datas={applicantType}
              default="Select Applicant Type"
              fpadding="9.5px 14px"
              fsize="12px"
              handleChange={handleSelectChange}
              selectType="EmployeeName"
              name="applicant_type"
              value={state.applicant_type}
            />
          </ItemSection>
        </ItemRow>
        <ItemRow className="flex-start">
          <LabelSection>
            <Label>
              Residence Address
              {state.residence_district ? <RedStarItem /> : null}
            </Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              width="377px"
              textField="Text"
              placeholder="Residence Address"
              multiLine={true}
              name="residence_address"
              value={state.residence_address ? state.residence_address : ""}
              required={
                state.residence_district
                  ? state.formErrors.residence_address
                  : false
              }
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>
              District
              {state.residence_address ? <RedStarItem /> : null}
            </Label>
          </LabelSection>
          <ItemSection>
            <SelectBoxLabel
              required={
                state.residence_address
                  ? state.formErrors.residence_district
                  : false
              }
              selectType="EmployeeName"
              datas={state.district_list}
              default="Select District"
              fpadding="9.5px 14px"
              fsize="12px"
              handleChange={handleSelectChange}
              name="residence_district"
              value={state.residence_district}
            />
          </ItemSection>
        </ItemRow>
        <ItemRow className="flex-start">
          <LabelSection>
            <Label>
              Office Address
              {state.office_district ? <RedStarItem /> : null}
            </Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              width="377px"
              textField="Text"
              placeholder="Office Address"
              multiLine={true}
              name="office_address"
              value={state.office_address ? state.office_address : ""}
              required={
                state.office_district ? state.formErrors.office_address : false
              }
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>
              District
              {state.office_address ? <RedStarItem /> : null}
            </Label>
          </LabelSection>
          <ItemSection>
            <SelectBoxLabel
              required={
                state.office_address ? state.formErrors.office_district : false
              }
              datas={state.district_list}
              default="Select District"
              fpadding="9.5px 14px"
              fsize="12px"
              handleChange={handleSelectChange}
              name="office_district"
              selectType="EmployeeName"
              value={state.office_district}
            />
          </ItemSection>
        </ItemRow>
        <ItemRow className="flex-start">
          <LabelSection>
            <Label>
              Permanent Address
              {state.permanent_district ? <RedStarItem /> : null}
            </Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              width="377px"
              textField="Text"
              placeholder="Permanent Address"
              multiLine={true}
              name="permanent_address"
              value={state.permanent_address ? state.permanent_address : ""}
              required={
                state.permanent_district
                  ? state.formErrors.permanent_address
                  : false
              }
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>
              District
              {state.permanent_address ? <RedStarItem /> : null}
            </Label>
          </LabelSection>
          <ItemSection>
            <SelectBoxLabel
              required={
                state.permanent_address
                  ? state.formErrors.permanent_district
                  : false
              }
              selectType="EmployeeName"
              datas={state.district_list}
              default="Select District"
              fpadding="9.5px 14px"
              fsize="12px"
              handleChange={handleSelectChange}
              name="permanent_district"
              value={state.permanent_district}
            />
          </ItemSection>
        </ItemRow>
        <ItemRow className="flex-start">
          <LabelSection>
            <Label>
              PD Verification Address
              {state.pd_district ? <RedStarItem /> : null}
            </Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              width="377px"
              textField="Text"
              placeholder="PD Verification Address"
              multiLine={true}
              name="pd_address"
              value={state.pd_address ? state.pd_address : ""}
              required={state.pd_district ? state.formErrors.pd_address : false}
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>
              District
              {state.pd_address ? <RedStarItem /> : null}
            </Label>
          </LabelSection>
          <ItemSection>
            <SelectBoxLabel
              required={state.pd_address ? state.formErrors.pd_district : false}
              datas={state.district_list}
              default="Select District"
              fpadding="9.5px 14px"
              fsize="12px"
              handleChange={handleSelectChange}
              name="pd_district"
              selectType="EmployeeName"
              value={state.pd_district}
            />
          </ItemSection>
        </ItemRow>
      </FormSection>
      {state.formErrors.address && (
        <ErrorMsg>
          Please fill any of the addresses and it's corresponding district.
        </ErrorMsg>
      )}
      <ButtonSection>
        <ButtonItem
          name="Cancel"
          type="outlined"
          color="#252F40"
          bgColor=""
          fsize="16px"
          fweight="500"
          fpadding={isMobileScreen ? "5px 20px" : "6px 105px"}
          bradius="8px"
          handleClick={handleClose}
        />
        <ButtonItem
          handleClick={handleSubmit}
          pending={buttonloading}
          name="Submit"
          type="contained"
          color="#fff"
          bgColor="#132756"
          fsize="16px"
          fweight="500"
          fpadding={isMobileScreen ? "5px 20px" : "6px 105px"}
          bradius="8px"
          loader={buttonloading}
        />
      </ButtonSection>
    </FormContainer>
  );
}

export default AddModalForm;

const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  &.flex-start {
    align-items: flex-start;
  }
`;
const LabelSection = styled.div`
  width: 30%;
`;
const Label = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #000000;
  display: block;
  width: 100%;
`;
const ItemSection = styled.div`
  width: 70%;
  /* margin-right: 52px; */
`;
const FormSection = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 25px;
  height: 400px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
        width: 5px;
        border:none;
        /* border-radius: 1rem; */
    }
   &::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategrey;
  border-radius: 1rem;
} 
  @media only screen and (max-width: 480px) {
    height: 350px;
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
const ErrorMsg = styled.span`
  margin-left: 22px;
  font-size: 14px;
  color: red;
`;
