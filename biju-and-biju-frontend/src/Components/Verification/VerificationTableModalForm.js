import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ButtonItem from "../ButtonItem";
import SelectBoxLabel from "../SelectBoxLabel";
import {
  fiels_agent_url,
  assigned_verification,
  update_district,
} from "../../Api/VerificationApis";
import axios from "axios";
import { selectAccess } from "../../Slices/authSlice";
import { useSelector } from "react-redux";
import RedStarItem from "../Common/RedStarItem";
import { timeDate24Hours } from "../../Functions/utils";
import { district_dropdown } from "../../Api/DropDownApis";
import { useDispatch } from "react-redux";
import { get_data, post_data } from "../../Store/common/commonSlice";
import { useMediaQuery } from "react-responsive";

function VerificationTableModalForm(props) {
  const dispatch = useDispatch();
  const isMobileScreen = useMediaQuery({ query: "(max-width: 480px)" });
  const access = useSelector(selectAccess);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    formErrors: {},
    application_no: "",
    vendor_name: "",
    product_name: "",
    fi_date: "",
    fi_time: "",
    customer_name: "",
    residential_address: "",
    verification_agent: "",
    billing_location: null,
    message: "",
    address_district_name: "",
    districts: [],
    district: props.data.adress_district,
    billing_locations: props.data.verification.product.billing_location,
    agentVerifications: [],
    address_district: "",
  });

  useEffect(() => {
    async function fetchMyAPI() {
      dispatch(get_data(district_dropdown))
        .then(async (res) => {
          // console.log('login res => ',res);
          const result = res?.payload;
          if (res?.payload?.status === 200) {
            setState((prevState) => {
              return {
                ...prevState,
                districts: result.data,
              };
            });
            await myFunction(result.data.results);
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
      //     await myFunction(result.data.results);
      //   }
      // } catch (error) {
      //   console.log(error);
      // }
    }
    fetchMyAPI();
  }, [state.district]);

  const myFunction = async () => {
    let url = fiels_agent_url;
    url = fiels_agent_url + `?address_district=${state.district}`;
    dispatch(get_data(url))
      .then((res) => {
        // console.log('login res => ',res);
        const result = res?.payload;
        if (res?.payload?.status === 200) {
          setState((prevState) => {
            return {
              ...prevState,
              agentVerifications: result.data,
            };
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });

    // try {
    //   let url = fiels_agent_url;
    //   url = fiels_agent_url + `?address_district=${state.district}`;
    //   const result = await axios.get(url, {
    //     headers: { Authorization: `Bearer ${access}` },
    //   });
    //   if (result.status === 200) {
    //     setState((prevState) => {
    //       return {
    //         ...prevState,
    //         agentVerifications: result.data,
    //       };
    //     });
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  //   useEffect(() => {
  //     if (props.is_edit) {
  //       setState((prevState) => {
  //         return {
  //           ...prevState,
  //           address_district_name: props.instance.address_district_name,

  //         };
  //       });
  //     }
  //   }, [props.is_edit]);

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

  const handleCancel = () => {
    props.setOpen(false);
  };

  const ValidationForm = () => {
    let validation = true;
    let formErrors = state.formErrors;
    if (!state.verification_agent) {
      formErrors["verification_agent"] = true;
      validation = false;
    }
    if (!state.district) {
      formErrors["district"] = true;
      validation = false;
    }
    // if (!state.billing_location) {
    //   formErrors["billing_location"] = true;
    //   validation = false;
    // }
    setState((prevState) => {
      return {
        ...prevState,
        formErrors,
      };
    });
    return validation;
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleSubmit = async () => {
    districtFun();
    let validation = ValidationForm();
    if (validation) {
      setLoading(true);
      let values = {
        assigned_verification_users: [
          {
            field_agent: state.verification_agent,
            status: true,
          },
        ],
        work_status: "currently_assigned",
        verification_address: props.data.id,
        selected_billing_location: state.billing_location,
      };
      let param = {
        values: values,
        url: assigned_verification,
      };

      dispatch(post_data(param))
        .then((res) => {
          // console.log('login 11res => ',res);
          const result = res?.payload;
          if (result?.status === 201) {
            handleClose();
            setLoading(false);
            alertSuccessFun("Verification Assigned Successfully");
            props.setState((prevState) => {
              return {
                ...prevState,
                refresh: true,
              };
            });
          }
        })
        .catch((error) => {
          // console.error(err);
          alertErrorFun(
            error.response.data.error || error.response.data.detail
          );
          setLoading(false);
        });

      // try {
      //   setLoading(true)
      //   const result = await axios.post(
      //     assigned_verification,
      //     {
      //       assigned_verification_users: [
      //         {
      //           field_agent: state.verification_agent,
      //           status: true,
      //         },
      //       ],
      //       work_status: "currently_assigned",
      //       verification_address: props.data.id,
      //       selected_billing_location: state.billing_location,
      //     },
      //     { headers: { Authorization: `Bearer ${access}` } }
      //   );
      //   if (result.status === 201) {
      //     handleClose();
      //     setLoading(false)
      //     alertSuccessFun("Verification Assigned Successfully");
      //   }
      // } catch (error) {
      //   alertErrorFun(error.response.data.error || error.response.data.detail);
      //   setLoading(false)
      // }
    }
  };

  const districtFun = async () => {
    try {
      await axios.patch(
        update_district + `${props?.data?.id}/`,
        {
          adress_district: state.district,
        },
        { headers: { Authorization: `Bearer ${access}` } }
      );
    } catch (error) {}
  };

  const alertSuccessFun = (msg) => {
    props.setSnackbarStatus({
      isOpen: true,
      severity: "success",
      message: msg,
    });
  };

  const alertErrorFun = (msg) => {
    props.setSnackbarStatus({
      isOpen: true,
      severity: "error",
      message: msg,
    });
  };

  return (
    <FormContainer>
      <HeadSection>
        <SubHead>
          <Title>Assign Verification</Title>
        </SubHead>
        <SubHead className="icons" onClick={() => props.setOpen(false)}>
          <img src={require("../../Assets/images/close-square.png")} alt="" />
        </SubHead>
      </HeadSection>
      <FormSection>
        <ItemRow>
          <LabelSection>
            <Label className="secondary">Application Number</Label>
          </LabelSection>
          <ItemSection>
            <SpanValue className="important">
              {props.data.verification.application_id}
            </SpanValue>
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label className="secondary">Vendor Name</Label>
          </LabelSection>
          <ItemSection>
            <SpanValue>{props.data.verification.product.vendor_name}</SpanValue>
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label className="secondary">Product Name</Label>
          </LabelSection>
          <ItemSection>
            <SpanValue>
              {props.data.verification.product.product_name}
            </SpanValue>
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label className="secondary">FI Date</Label>
          </LabelSection>
          <ItemSection>
            <SpanValue>{timeDate24Hours(props.data.fi_date_time)}</SpanValue>
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>Customer Name</Label>
          </LabelSection>
          <ItemSection>
            <SpanValue>{props.data.verification.customer_name}</SpanValue>
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>Address</Label>
          </LabelSection>
          <ItemSection>
            <SpanValue>{props.data.adress}</SpanValue>
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
              selectType="EmployeeName"
              required={state.formErrors.district}
              datas={state.districts}
              handleChange={handleSelectChange}
              name="district"
              value={state.district}
              default="Select District"
              fpadding="9.5px 14px"
              fsize="12px"
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>
              Select Verification Agent
              <RedStarItem />
            </Label>
          </LabelSection>
          <ItemSection>
            <SelectBoxLabel
              selectType="UserName"
              required={state.formErrors.verification_agent}
              datas={state.agentVerifications}
              handleChange={handleSelectChange}
              name="verification_agent"
              value={state.verification_agent}
              default="Select Verification Agent"
              fpadding="9.5px 14px"
              fsize="12px"
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>
              Billing Location
              {/* <RedStarItem /> */}
            </Label>
          </LabelSection>
          <ItemSection>
            <SelectBoxLabel
              selectType="EmployeeName"
              // required={state.formErrors.billing_location}
              datas={state.billing_locations}
              handleChange={handleSelectChange}
              name="billing_location"
              value={state.billing_location}
              default="Select Billing Location"
              fpadding="9.5px 14px"
              fsize="12px"
            />
          </ItemSection>
        </ItemRow>
      </FormSection>
      <ButtonSection>
        <ButtonItem
          handleClick={handleCancel}
          name="Cancel"
          type="outlined"
          color="#252F40"
          bgColor=""
          fsize="16px"
          fweight="500"
          fpadding={isMobileScreen ? "6px 10px" : "6px 110px"}
          bradius="8px"
        />
        <ButtonItem
          handleClick={handleSubmit}
          name="Allocate with SMS"
          type="contained"
          color="#fff"
          bgColor="#132756"
          fsize="16px"
          fweight="500"
          fpadding={isMobileScreen ? "6px 10px" : "6px 60px"}
          bradius="8px"
          pending={loading}
          loader={loading}
        />
      </ButtonSection>
    </FormContainer>
  );
}

export default VerificationTableModalForm;

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
  &.secondary {
    color: #444445;
    font-size: 13px;
  }
  display: block;
  width: 100%;
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
const ButtonSection = styled.div`
  padding: 40px;
  display: flex;
  align-items: center;
  margin-top: 30px;
  justify-content: center;
  gap: 50px;
`;
