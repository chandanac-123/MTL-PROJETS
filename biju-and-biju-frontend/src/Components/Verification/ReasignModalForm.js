import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ButtonItem from "../ButtonItem";
import SelectBoxLabel from "../SelectBoxLabel";
import RedStarItem from "../Common/RedStarItem";
import {
  fiels_agent_url,
  reassign_verification,
  update_district,
} from "../../Api/VerificationApis";
import { timeDate24Hours } from "../../Functions/utils";
import { district_dropdown } from "../../Api/DropDownApis";
import { get_data, patch_data } from "../../Store/common/commonSlice";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";

function ReasignModalForm(props) {
  const isMobileScreen = useMediaQuery({ query: "(max-width: 480px)" });
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    formErrors: {},
    verification_agent: "",
    billing_location: props?.data?.selected_billing_location
      ? props?.data?.selected_billing_location
      : "",
    address_district_name: "",
    districts: [],
    district: props?.data?.verification_address?.adress_district,
    billing_locations:
      props.data.verification_address.verification.product.billing_location,
    agentVerifications: [],
    address_district: "",
  });

  useEffect(() => {
    async function fetchMyAPI() {
      dispatch(get_data(district_dropdown))
        .then(async (res) => {
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
    }
    fetchMyAPI();
  }, [state.district]);

  const myFunction = async () => {
    let url = fiels_agent_url;
    url = fiels_agent_url + `?address_district=${state.district}`;
    dispatch(get_data(url))
      .then((res) => {
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
  };

  const ValidationForm = () => {
    let validation = true;
    let formErrors = state.formErrors;
    if (!state.verification_agent) {
      formErrors["verification_agent"] = true;
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
    districtFun();
    let validation = ValidationForm();
    if (validation) {
      setLoading(true);
      let param = {
        values: {
          assigned_verification_users: [
            {
              field_agent: state.verification_agent,
              status: true,
            },
          ],
          work_status: "reassigned",
          verification_address: props.data.verification_address.id,
          selected_billing_location: state.billing_location,
        },
        url: reassign_verification + props.data.id + "/",
      };

      dispatch(patch_data(param))
        .then((res) => {
          // console.log('login res => ',res);
          const result = res?.payload;
          if (result?.status === 200) {
            handleClose();
            setLoading(false);
            props.setState((prevState) => {
              return {
                ...prevState,
                refresh: true,
              };
            });
          }
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  };

  const handleClose = () => {
    props.setOpen(false);
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

  const districtFun = async () => {
    let param = {
      values: {
        adress_district: state.district,
      },
      url: update_district + `${props?.data?.verification_address?.id}/`,
    };
    dispatch(patch_data(param))
      .then((res) => {
        const result = res?.payload;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <FormContainer>
      <HeadSection>
        <SubHead className="icons">
        </SubHead>
        <SubHead>
          <Title>Reassign Verification Agent</Title>
        </SubHead>
        <SubHead className="icons" onClick={() => props.setOpen(false)}>
        </SubHead>
      </HeadSection>
      <FormSection>
        <ItemRow>
          <LabelSection>
            <Label className="secondary">Application Number</Label>
          </LabelSection>
          <ItemSection>
            <SpanValue className="important">
              {props.data.verification_address.verification.application_id}
            </SpanValue>
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label className="secondary">Vendor Name</Label>
          </LabelSection>
          <ItemSection>
            <SpanValue>
              {props.data.verification_address.verification.product.vendor_name}
            </SpanValue>
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label className="secondary">Product Name</Label>
          </LabelSection>
          <ItemSection>
            <SpanValue>
              {
                props.data.verification_address.verification.product
                  .product_name
              }
            </SpanValue>
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label className="secondary">FI Date and Time</Label>
          </LabelSection>
          <ItemSection>
            <SpanValue>
              {timeDate24Hours(props.data.verification_address.fi_date_time)}
            </SpanValue>
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>Customer Name</Label>
          </LabelSection>
          <ItemSection>
            <SpanValue>
              {props.data.verification_address.verification.customer_name}
            </SpanValue>
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>Address</Label>
          </LabelSection>
          <ItemSection>
            <SpanValue>{props.data.verification_address.adress}</SpanValue>
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>District</Label>
          </LabelSection>
          <ItemSection>
            <SelectBoxLabel
              selectType="EmployeeName"
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
              required={state.formErrors.verification_agent}
              selectType="UserName"
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
              // required={state.formErrors.billing_location}
              selectType="EmployeeName"
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
          name="Cancel"
          type="outlined"
          color="#252F40"
          bgColor=""
          fsize="16px"
          handleClick={handleClose}
          fweight="500"
          fpadding={isMobileScreen ? "5px 20px" : "6px 110px"}
          bradius="8px"
        />
        <ButtonItem
          name="Allocate with SMS"
          type="contained"
          handleClick={handleSubmit}
          color="#fff"
          bgColor="#132756"
          fsize="16px"
          fweight="500"
          fpadding={isMobileScreen ? "5px 20px" : "6px 60px"}
          bradius="8px"
          pending={loading}
          loader={loading}
        />
      </ButtonSection>
    </FormContainer>
  );
}

export default ReasignModalForm;

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
  width: 70%;
  /* margin-right: 52px; */
`;
const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 25px;
  height: 400px;
  /* width: 82%; */
  overflow-y: scroll;
  /* ::-webkit-scrollbar {
    display: none;
  } */
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
