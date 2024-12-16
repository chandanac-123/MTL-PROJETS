import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ButtonItem from "../ButtonItem";
import TextInputOkEnd from "../Common/TextInputOkEnd";
import RadioGroups from "../RadioGroups";
import SelectBoxLabel from "../SelectBoxLabel";
import {
  get_time_from_date,
  timeDate24Hours,
  extract_date,
} from "../../Functions/utils";
import TextFieldItem from "../Common/TextFieldItem";
import { submitted, v2_employees } from "../../Api/ReportSubmittedApis";
import RedStarItem from "../Common/RedStarItem";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { get_data, post_data } from "../../Store/common/commonSlice";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";

const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 680,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "12px",
  height: 200,
  justifyContent: "center",
  textAlign: "center",
};

function ReportSubmittedModalForm(props) {
  const dispatch = useDispatch();
  const isMobileScreen = useMediaQuery({ query: "(max-width: 480px)" });
  const [open, setOpen] = React.useState(false);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const billing_locations =
    props.data.assign_verification_id.verification_address.verification.product
      .billing_location;
  const employee_name =employees?.map((item) => ({
    id: item.id,
    name: item.employee_name,
  }));
  const remark_1 = props?.data?.assign_verification_id?.verification_address?.verification?.product?.additional_remarks?.key1;
  const remark_2 = props?.data?.assign_verification_id?.verification_address?.verification?.product?.additional_remarks?.key2;
  const remark_3 = props?.data?.assign_verification_id?.verification_address?.verification?.product?.additional_remarks?.key3;
  const [state, setState] = useState({
    application_no: "",
    vendor_name: "",
    product_name: "",
    fi_date: "",
    fi_time: "",
    tat_date: "",
    tat_time: "",
    tat_status: "",
    customer_name: "",
    residencial_address: "",
    submitted_date: "",
    submitted_time: "",
    rv_executive: "",
    billing_location: props.data?.assign_verification_id
      ?.selected_billing_location
      ? props.data?.assign_verification_id?.selected_billing_location
      : "",
    allocated_by: "",
    coordinated_by: "",
    written_by: "",
    reported_by: "",
    distance: "",
    distance_radio: "",
    billable: true,
    payable: true,
    tele_verification: false,
    tele_by: null,
    status: "",
    additional_remark1: "",
    additional_remark2: "",
    additional_remark3: "",
    billable_reason: "",
    payable_reason: "",
    formErrors: {},
  });


  const fetchEmployeesData = async () => {
    try {
      const response = await dispatch(get_data(v2_employees + `?verification_id=${props?.data?.assign_verification_id?.verification_address?.verification?.id}`));
      const result = response?.payload;

      if (result?.status === 200) {
        let new_fitype = props?.data?.assign_verification_id?.verification_address?.fi_type
        let newemply = result?.data?.[new_fitype] || []
        setEmployees(newemply);
      } else {
        console.error('Failed to fetch employees:', result?.status);
      }
    } catch (err) {
      console.error('Error fetching employees:', err);
    }
  };

  useEffect(() => {
    fetchEmployeesData();
  }, []);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      billable: Number(state.distance) !== 0,
      payable: Number(state.distance) !== 0,
    }));
  }, [state.distance]);

  let distance_type = [
    {
      name: "local",
      label: "Local",
    },
    {
      name: "ocl1",
      label: "OCL 1",
    },
    {
      name: "ocl2",
      label: "OCL 2",
    },
    {
      name: "ocl3",
      label: "OCL 3",
    },
    {
      name: "ogl1",
      label: "OGL 1",
    },
    {
      name: "ogl2",
      label: "OGL 2",
    },
    {
      name: "ogl3",
      label: "OGL 3",
    },
    {
      name: "NA",
      label: "NA",
    },
  ];

  let billable_radio = [
    {
      name: true,
      label: "Yes",
      disabled: Number(state.distance) === 0,
    },
    {
      name: false,
      label: "No",
    },
  ];

  let tel_ver_radio = [
    {
      name: true,
      label: "Yes",
    },
    {
      name: false,
      label: "No",
    },
  ];

  const radioValue = (distanceVal) => {
    let states = "";
    switch (true) {
      case distanceVal <=
        props?.data?.assign_verification_id?.verification_address?.verification
          ?.product?.local_distance:
        states = "local";
        break;
      case distanceVal <=
        props?.data?.assign_verification_id?.verification_address?.verification
          ?.product?.ocl_distance_1:
        states = "ocl1";
        break;
      case distanceVal <=
        props?.data?.assign_verification_id?.verification_address?.verification
          ?.product?.ocl_distance_2:
        states = "ocl2";
        break;
      case distanceVal <=
        props?.data?.assign_verification_id?.verification_address?.verification
          ?.product?.ocl_distance_3:
        states = "ocl3";
        break;
      case distanceVal <=
        props?.data?.assign_verification_id?.verification_address?.verification
          ?.product?.ogl_distance_1:
        states = "ogl1";
        break;
      case distanceVal <=
        props?.data?.assign_verification_id?.verification_address?.verification
          ?.product?.ogl_distance_2:
        states = "ogl2";
        break;
      case distanceVal <=
        props?.data?.assign_verification_id?.verification_address?.verification
          ?.product?.ogl_distance_3:
        states = "ogl3";
        break;
      default:
        states = "NA";
        break;
    }

    return states;
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

  const handleRadioChange = (value, name) => {
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
      };
    });
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const ValidationForm = () => {
    let validation = true;
    let formErrors = state.formErrors;
    if (!state.billing_location) {
      formErrors["billing_location"] = true;
      validation = false;
    }
    if (!state.coordinated_by) {
      formErrors["coordinated_by"] = true;
      validation = false;
    }
    if (!state.written_by) {
      formErrors["written_by"] = true;
      validation = false;
    }
    if (!state.reported_by) {
      formErrors["reported_by"] = true;
      validation = false;
    }
    if (!state.distance) {
      formErrors["distance"] = true;
      validation = false;
    }
    if (!state.billable_reason && !state.billable) {
      formErrors["billable_reason"] = true;
      validation = false;
    }
    if (!state.payable_reason && !state.payable) {
      formErrors["payable_reason"] = true;
      validation = false;
    }
    if (!state.tele_by && state.tele_verification) {
      formErrors["tele_by"] = true;
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
    console.log("validation: ", validation);
    if (validation) {
      setLoading(true);
      let param = {
        values: {
          assign_verification: props?.data?.assign_verification_id?.id,
          billinglocation: state.billing_location,
          coordinated_by: state.coordinated_by,
          written_by: state.written_by,
          reported_by: state.reported_by,
          distance: state.distance,
          distance_type: radioValue(Number(state.distance)),
          billable: state.billable,
          billable_reason: state.billable_reason,
          payable: state.payable,
          payable_reason: state.payable_reason,
          tele_verification: state.tele_verification,
          tele_by: state.tele_by,
          remarks: state.remarks,
          additional_remarks: {
            key1: remark_1,
            key2: remark_2,
            key3: remark_3,
            value1: state.additional_remark1,
            value2: state.additional_remark2,
            value3: state.additional_remark3,
          },
        },
        url: submitted,
      };
      dispatch(post_data(param))
        .then((res) => {
          // console.log('login res => ',res);
          const result = res?.payload;
          if (result?.status === 201) {
            handleClose();
            setLoading(false);
            alertSuccessFun("Report has been submitted successfully.");
            props.setState((prevState) => {
              return {
                ...prevState,
                refresh: true,
              };
            });
          } else if (result?.status === 400) {
            alertErrorFun(result?.data?.error);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
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
    props.setSnackbarStatus({
      isOpen: true,
      severity: "error",
      message: msg,
    });
  };

  const handleClickOpen = () => {
    let validation = ValidationForm();
    if (validation) {
      setOpen(true);
    }
  };

  const handleConfirmClose = () => {
    setOpen(false);
  };

  return (
    <FormContainer>
      <HeadSection>
        <SubHead className="icons">
          {/* <img src={require('../../Assets/images/arrow-circle-leftarrow.png')} /> */}
        </SubHead>
        <SubHead>
          <Title>
            Report Application Number(
            {
              props?.data.assign_verification_id.verification_address
                .verification.application_id
            }
            )
          </Title>
        </SubHead>
        <SubHead className="icons">
          {/* <img src={require('../../Assets/images/close-square.png')} /> */}
        </SubHead>
      </HeadSection>
      <FormSection>
        <ItemRow>
          <LabelSection>
            <Label className="secondary">Application Number</Label>
          </LabelSection>
          <ItemSection>
            <SpanValue className="important">
              {
                props.data.assign_verification_id.verification_address
                  .verification.application_id
              }
            </SpanValue>
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label className="secondary">Vendor Name</Label>
          </LabelSection>
          <ItemSection>
            <SpanValue>
              {
                props.data.assign_verification_id.verification_address
                  .verification.product.vendor_name
              }
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
                props.data.assign_verification_id.verification_address
                  .verification.product.product_name
              }
            </SpanValue>
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label className="secondary">FI Date & Time</Label>
          </LabelSection>
          <ItemSection>
            <SpanValue>
              {timeDate24Hours(
                props?.data.assign_verification_id?.verification_address
                  ?.fi_date_time
              )}
            </SpanValue>
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label className="secondary">TAT Date & Time</Label>
          </LabelSection>
          <ItemSection>
            <SpanValue>
              {timeDate24Hours(props?.data.assign_verification_id?.verTat)}
            </SpanValue>
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>TAT Status</Label>
          </LabelSection>
          <ItemSection>
            <SpanValue>
              {props?.data?.assign_verification_id?.is_TATin == true
                ? "IN"
                : "OUT"}
            </SpanValue>
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>Customer Name</Label>
          </LabelSection>
          <ItemSection>
            <SpanValue>
              {
                props.data.assign_verification_id.verification_address
                  .verification.customer_name
              }
            </SpanValue>
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>Address</Label>
          </LabelSection>
          <ItemSection>
            <SpanValue>
              {props.data.assign_verification_id.verification_address.adress}
            </SpanValue>
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>Executive Name</Label>
          </LabelSection>
          <ItemSection>
            <SpanValue>{props.data.field_agent_name}</SpanValue>
          </ItemSection>
        </ItemRow>

        <ItemRow>
          <LabelSection>
            <Label>Submitted Date</Label>
          </LabelSection>
          <ItemSection>
            <SpanValue>
              {extract_date(props.data.assign_verification_id.submitted_at)}
            </SpanValue>
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>Submitted Time</Label>
          </LabelSection>
          <ItemSection>
            <SpanValue>
              {get_time_from_date(
                props.data.assign_verification_id.submitted_at
              )}
            </SpanValue>
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>Allocated By</Label>
          </LabelSection>
          <ItemSection>
            <SpanValue>
              {
                props.data.assign_verification_id.verification_address
                  .verification.allocated_by_name
              }
            </SpanValue>
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>Status</Label>
          </LabelSection>
          <ItemSection>
            <SpanValue>{props.data.assign_verification_id.status}</SpanValue>
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>If Negative,Reason</Label>
          </LabelSection>
          <ItemSection>
            <SpanValue>
              {props.data.assign_verification_id.negative_reason}
            </SpanValue>
          </ItemSection>
        </ItemRow>

        <ItemRow>
          <LabelSection>
            <Label>
              Billing Location
              <RedStarItem />
            </Label>
          </LabelSection>
          <ItemSection>
            <SelectBoxLabel
              required={state.formErrors.billing_location}
              selectType="EmployeeName"
              datas={billing_locations}
              handleChange={handleSelectChange}
              name="billing_location"
              value={state.billing_location}
              default="Select"
              fpadding="9.5px 14px"
              fsize="12px"
            />
          </ItemSection>
        </ItemRow>

        <ItemRow>
          <LabelSection>
            <Label>
              Coordinated By
              <RedStarItem />
            </Label>
          </LabelSection>
          <ItemSection>
            <SelectBoxLabel
              required={state.formErrors.coordinated_by}
              selectType="EmployeeName"
              datas={employee_name}
              handleChange={handleSelectChange}
              name="coordinated_by"
              value={state.coordinated_by}
              default="Select"
              fpadding="9.5px 14px"
              fsize="12px"
            />
          </ItemSection>
        </ItemRow>

        <ItemRow>
          <LabelSection>
            <Label>
              Written By
              <RedStarItem />
            </Label>
          </LabelSection>
          <ItemSection>
            <SelectBoxLabel
              required={state.formErrors.written_by}
              selectType="EmployeeName"
              datas={employee_name}
              handleChange={handleSelectChange}
              name="written_by"
              value={state.written_by}
              default="Select"
              fpadding="9.5px 14px"
              fsize="12px"
            />
          </ItemSection>
        </ItemRow>

        <ItemRow>
          <LabelSection>
            <Label>
              Reported By
              <RedStarItem />
            </Label>
          </LabelSection>
          <ItemSection>
            <SelectBoxLabel
              required={state.formErrors.reported_by}
              selectType="EmployeeName"
              datas={employee_name}
              handleChange={handleSelectChange}
              name="reported_by"
              value={state.reported_by}
              default="Select"
              fpadding="9.5px 14px"
              fsize="12px"
            />
          </ItemSection>
        </ItemRow>

        <ItemRow className="flex-start">
          <LabelSection>
            <Label>
              Distance(km)
              <RedStarItem />
            </Label>
          </LabelSection>
          <ItemSection>
            <TextInputOkEnd
              required={state.formErrors.distance}
              handleChange={handleChange}
              name="distance"
              value={state.distance}
              placeholder={
                props.data.assign_verification_id.verification_address.fi_type
              }
            />
            <RadioGroups
              fsize="12px"
              datas={distance_type}
              value={radioValue(Number(state.distance))}
              name="distance_radio"
              ml="0px"
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>Billable</Label>
          </LabelSection>
          <ItemSection>
            <RadioGroups
              fsize="12px"
              datas={billable_radio}
              handleChange={handleRadioChange}
              value={state.billable}
              name="billable"
              ml="0px"
            />
          </ItemSection>
        </ItemRow>
        {!state.billable ? (
          <ItemRow>
            <LabelSection>
              <Label>
                Non Billable Reason <RedStarItem />
              </Label>
            </LabelSection>
            <ItemSection>
              <TextFieldItem
                required={state.formErrors.billable_reason}
                width="377px"
                handleChange={handleChange}
                textField="Text"
                name="billable_reason"
                value={state.billable_reason}
              />
            </ItemSection>
          </ItemRow>
        ) : (
          (state.billable_reason = "")
        )}
        <ItemRow>
          <LabelSection>
            <Label>Payable</Label>
          </LabelSection>
          <ItemSection>
            <RadioGroups
              fsize="12px"
              datas={billable_radio}
              handleChange={handleRadioChange}
              value={state.payable}
              name="payable"
              ml="0px"
            />
          </ItemSection>
        </ItemRow>
        {!state.payable ? (
          <ItemRow>
            <LabelSection>
              <Label>
                Non Payable Reason <RedStarItem />
              </Label>
            </LabelSection>
            <ItemSection>
              <TextFieldItem
                required={state.formErrors.payable_reason}
                width="377px"
                handleChange={handleChange}
                textField="Text"
                name="payable_reason"
                value={state.payable_reason}
              />
            </ItemSection>
          </ItemRow>
        ) : (
          (state.payable_reason = "")
        )}

        <ItemRow>
          <LabelSection>
            <Label>Tele Verification</Label>
          </LabelSection>
          <ItemSection>
            <RadioGroups
              fsize="12px"
              datas={tel_ver_radio}
              handleChange={handleRadioChange}
              value={state.tele_verification}
              name="tele_verification"
              ml="0px"
            />
          </ItemSection>
        </ItemRow>
        {state.tele_verification ? (
          <ItemRow>
            <LabelSection>
              <Label>
                Tele By <RedStarItem />
              </Label>
            </LabelSection>
            <ItemSection>
              <SelectBoxLabel
                required={state.formErrors.tele_by}
                selectType="EmployeeName"
                datas={employee_name}
                handleChange={handleSelectChange}
                name="tele_by"
                value={state.tele_by}
                default="Select Reason"
                fpadding="9.5px 14px"
                fsize="12px"
              />
            </ItemSection>
          </ItemRow>
        ) : (
          (state.tele_by = null)
        )}

        <ItemRow>
          <LabelSection>
            <Label>Remarks</Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              width="377px"
              handleChange={handleChange}
              textField="Text"
              name="remarks"
              value={state.remarks}
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>
              Additional <br /> Remark 1:{remark_1}
            </Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              width="377px"
              handleChange={handleChange}
              textField="Text"
              name="additional_remark1"
              value={state.additional_remark1}
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>
              Additional <br /> Remark 2:{remark_2}
            </Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              width="377px"
              handleChange={handleChange}
              textField="Text"
              name="additional_remark2"
              value={state.additional_remark2}
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>
              Additional <br /> Remark 3:{remark_3}
            </Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              width="377px"
              handleChange={handleChange}
              textField="Text"
              name="additional_remark3"
              value={state.additional_remark3}
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
          fpadding={isMobileScreen ? "6px 40px" : "6px 110px"}
          bradius="8px"
        />
        <ButtonItem
          name="Submit"
          type="contained"
          handleClick={handleClickOpen}
          color="#fff"
          bgColor="#132756"
          fsize="16px"
          fweight="500"
          fpadding={isMobileScreen ? "6px 40px" : "6px 100px"}
          bradius="8px"
        />
      </ButtonSection>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          hideBackdrop={true}
        >
          <Box sx={styles}>
            <ConfirmMsg>Are you sure , you want to submit?</ConfirmMsg>
            <ConfirmButton>
              <LastSection>
                <ButtonItem
                  name="Cancel"
                  handleClick={handleConfirmClose}
                  type="outlined"
                  color="#252F40"
                  bgColor=""
                  fsize="16px"
                  fweight="500"
                  fpadding="6px 40px"
                  bradius="8px"
                />
                <ButtonItem
                  name="Confirm"
                  handleClick={handleSubmit}
                  type="contained"
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
            </ConfirmButton>
          </Box>
        </Modal>
      </div>
    </FormContainer>
  );
}

export default ReportSubmittedModalForm;

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
  justify-content: center;
  align-items: center;
  gap: 50px;
  /* margin-top: 50px; */
`;
const ConfirmButton = styled.div`
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LastSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 67%;
  gap: 50px;
`;
const ConfirmMsg = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #444445;
  align-items: center;
  margin-top: 40px;
`;
