import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ButtonItem from "../ButtonItem";
import DatePickItem from "../Common/DatePickItem";
import FileInputItem from "../Common/FileInputItem";
import TextFieldItem from "../Common/TextFieldItem";
import TimePickItem from "../Common/TimePickItem";
import RadioGroups from "../RadioGroups";
import SelectBoxLabel from "../SelectBoxLabel";
import {
  move_report,
  negative_remark_dropdown,
} from "../../Api/VerificationApis";
import { selectAccess } from "../../Slices/authSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { timeDate24Hours } from "../../Functions/utils";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import {
  get_data,
  patch_data_file,
  post_data,
} from "../../Store/common/commonSlice";
import { useMediaQuery } from "react-responsive";

function ReportMoveModalForm(props) {
  const access = useSelector(selectAccess);
  const isMobileScreen = useMediaQuery({ query: "(max-width: 480px)" });
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  var now = dayjs();
  const hours = now?.$H;
  const minutes = now?.$m;
  const seconds = now?.$s;
  const [state, setState] = useState({
    status: "positive",
    negative_reason: "",
    negative_reasons: [],
    image_receive: "mobileapp",
    remarks: "",
    upload_report: "",
    fi_initiated_time: `${hours}:${minutes}:${seconds}`,
    fi_initiated_date: new Date(),
    submitted_at: "",
    formErrors: {},
  });

  let status_datas = [
    {
      name: "positive",
      label: "Positive",
    },
    {
      name: "negative",
      label: "Negative",
    },
    {
      name: "neutral",
      label: "Neutral",
    },
  ];

  let image_recieve_datas = [
    {
      name: "mobileapp",
      label: "Mobile App",
    },
    {
      name: "googlecamera",
      label: "Google Camera",
    },
    {
      name: "whatsapp",
      label: "WhatsApp",
    },
  ];

  const handleSelectChange = (value, name) => {
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

  useEffect(() => {
    async function fetchMyAPI() {
      dispatch(get_data(negative_remark_dropdown))
        .then((res) => {
          // console.log('login res => ',res);
          const result = res?.payload;
          if (res?.payload?.status === 200) {
            setState((prevState) => {
              return {
                ...prevState,
                negative_reasons: result.data,
              };
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });

      // try {
      //   const result = await axios.get(negative_remark_dropdown, {
      //     headers: { Authorization: `Bearer ${access}` },
      //   });
      //   if (result.status === 200) {
      //     setState((prevState) => {
      //       return {
      //         ...prevState,
      //         negative_reasons: result.data,
      //       };
      //     });
      //   }
      // } catch (error) {
      //   console.log(error);
      // }
    }
    fetchMyAPI();
  }, []);

  const dateFun = (date1, date2) => {
    console.log("date2: ", date2);
    const year = date1.getFullYear();
    const month = date1.getMonth();
    const day = date1.getDate();
    const hours = date2?.$H ? date2?.$H : now?.$H;
    const minutes = date2?.$m ? date2?.$m : now?.$m;
    const seconds = date2?.$s ? date2?.$s : now?.$s;
    const combinedDateTime = new Date(
      year,
      month,
      day,
      hours,
      minutes,
      seconds
    );
    return combinedDateTime;
  };
  const date1 = new Date(state.fi_initiated_date);

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("file_report", state.upload_report);
    data.append("remarks", state.remarks);
    data.append("img_recieved_through", state.image_receive);
    data.append("negative_reason", state.negative_reason);
    data.append(
      "submitted_at",
      new Date(dateFun(date1, state.fi_initiated_time)).toISOString()
    );
    data.append("status", state.status);
    data.append(
      "is_TATin",
      props?.datas?.assign_verification_id.ver_tat_status == "out"
        ? false
        : true
    );

    setLoading(true);
    let param = {
      values: data,
      url: move_report + props.datas.assign_verification_id.id + "/",
    };
    dispatch(patch_data_file(param))
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
          handleClose();
          alertSuccessFun("Report has been moved successfully.");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

    // try {
    //   setLoading(true);
    //   const result = await axios.patch(
    //     move_report + props.datas.assign_verification_id.id + "/",
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
    //     alertSuccessFun("Report has been moved successfully.");
    //     setLoading(false);
    //   }
    // } catch (error) {
    //   console.log(error);
    //   setLoading(false);
    // }
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
        <SubHead className="icons">
          {/* <img src={require('../../Assets/images/arrow-circle-leftarrow.png')} /> */}
        </SubHead>
        <SubHead>
          <Title>
            Report Application Number (
            {
              props?.datas?.assign_verification_id?.verification_address
                ?.verification?.application_id
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
                props?.datas?.assign_verification_id?.verification_address
                  ?.verification?.application_id
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
                props?.datas?.assign_verification_id?.verification_address
                  ?.verification?.product?.vendor_name
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
                props?.datas?.assign_verification_id?.verification_address
                  ?.verification?.product?.product_name
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
                props?.datas?.assign_verification_id?.verification_address
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
              {timeDate24Hours(props?.datas?.assign_verification_id?.verTat)}
            </SpanValue>
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>TAT Status</Label>
          </LabelSection>
          <ItemSection>
            <SpanValue>
              {props?.datas?.assign_verification_id.ver_tat_status == "out"
                ? "TAT OUT"
                : "TAT IN"}
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
                props?.datas?.assign_verification_id?.verification_address
                  ?.verification?.customer_name
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
              {
                props?.datas?.assign_verification_id?.verification_address
                  ?.adress
              }
            </SpanValue>
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>Executive Name</Label>
          </LabelSection>
          <ItemSection>
            <SpanValue>{props?.datas?.field_agent_name}</SpanValue>
          </ItemSection>
        </ItemRow>

        <ItemRow>
          <LabelSection>
            <Label>Submitted Date</Label>
          </LabelSection>
          <ItemSection>
            <DatePickItem
              readOnly={true}
              handleChange={handleSelectChange}
              name="fi_initiated_date"
              value={state.fi_initiated_date}
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>Submitted Time</Label>
          </LabelSection>
          <ItemSection>
            <TimePickItem
              handleChange={handleSelectChange}
              name="fi_initiated_time"
              value={state.fi_initiated_time}
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
              datas={status_datas}
              handleChange={handleRadioChange}
              value={state.status}
              name="status"
              ml="0px"
            />
          </ItemSection>
        </ItemRow>

        {state.status == "negative" ? (
          <ItemRow>
            <LabelSection>
              <Label>If Negative,Reason</Label>
            </LabelSection>
            <ItemSection>
              <SelectBoxLabel
                selectType="Comment"
                datas={state.negative_reasons}
                handleChange={handleSelectChange}
                name="negative_reason"
                value={state.negative_reason}
                default="Select Reason"
                fpadding="9.5px 14px"
                fsize="12px"
                fwidth="370px"
              />
            </ItemSection>
          </ItemRow>
        ) : (
          ""
        )}

        <ItemRow>
          <LabelSection>
            <Label>Image Received Through</Label>
          </LabelSection>
          <ItemSection>
            <RadioGroups
              fsize="12px"
              datas={image_recieve_datas}
              handleChange={handleRadioChange}
              value={state.image_receive}
              name="image_receive"
              ml="0px"
            />
          </ItemSection>
        </ItemRow>
        {/* <ItemRow className="label-top">
          <LabelSection>
            <Label>Remarks</Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              textField="Text"
              multiLine={true}
              row={2}
              handleChange={handleChange}
              name="remarks"
              value={state.remarks}
            />
          </ItemSection>
        </ItemRow> */}
        <ItemRow>
          <LabelSection>
            <Label>Upload Report</Label>
          </LabelSection>
          <ItemSection>
            <FileInputItem
              bcolor="#77a388"
              handleFileChange={handleFileChange}
              name="upload_report"
              value={state.upload_report}
              fwidth="365px"
            />
          </ItemSection>
        </ItemRow>
      </FormSection>
      <ButtonSection>
        <ButtonItem
          name="Close"
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
          handleClick={handleSubmit}
          color="#fff"
          bgColor="#132756"
          fsize="16px"
          fweight="500"
          fpadding={isMobileScreen ? "6px 40px" : "6px 110px"}
          bradius="8px"
          pending={loading}
          loader={loading}
        />
      </ButtonSection>
    </FormContainer>
  );
}

export default ReportMoveModalForm;

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
