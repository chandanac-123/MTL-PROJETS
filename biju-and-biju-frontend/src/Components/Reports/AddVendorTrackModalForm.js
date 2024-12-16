import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { vendor_track_download } from "../../Api/ReportsApis";
import { selectAccess } from "../../Slices/authSlice";
import ButtonItem from "../ButtonItem";
import CustomCheckBox from "../Common/CustomCheckBox";
import { exportToExcel } from "../../Functions/utils";
import { LinearProgress } from "@mui/material";
import ProgressBar from "../ProgressBar/ProgressBar";
import VendorTrackProgressBar from "../ProgressBar/VendorTrackProgressBar";

function AddVendorTrackModalForm(props) {
  const access = useSelector(selectAccess);
  const [ticked, setTicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [task_id, setTaskID] = useState("");
  const [progress, setProgress] = useState(0);
  const [state, setState] = useState({
    selected_fields: [],
  });
  const handleCheckBox = (value) => {
    // setTicked(!ticked)
    let selected_fields = state.selected_fields;
    if (selected_fields.includes(value)) {
      selected_fields = selected_fields.filter((i) => i !== value);
    } else {
      selected_fields.push(value);
    }
    setState((prevState) => {
      return {
        ...prevState,
        selected_fields,
      };
    });
  };
  const handleClose = () => {
    props.setOpen(false);
  };

  function readBlobData(blob) {
    const reader = new FileReader();

    reader.onload = function (event) {
      const data = event.target.result;
      console.log(data); // Display the data in the console
    };

    reader.readAsText(blob);
  }

  function downloadStringBlobAsCSV(blob, fileName) {
    // Convert the string blob to a Blob object
    // const blob = new Blob([stringBlobData], { type: 'text/csv' });
    // Generate a temporary URL for the blob
    const url = URL.createObjectURL(blob);

    // Create a link element
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;

    // Trigger a click event to initiate the download
    link.click();

    // Clean up the temporary URL
    URL.revokeObjectURL(url);
  }

  const handleSubmit = async () => {
    console.log(state);
    setLoading(true);
    let selected_fields = state.selected_fields;
    if (selected_fields.length) {
      selected_fields = selected_fields.join(",");
      console.log(selected_fields);
      try {
        let url = vendor_track_download + `?fields=${selected_fields}`;
        const result = await axios.get(url, {
          headers: { Authorization: `Bearer ${access}` },
          // responseType: "blob"
        });
        console.log(result);
        if (result.status === 200) {
          setTaskID(result.data.task_id);
          // let data = result.data
          // downloadStringBlobAsCSV(data, "vendor-track");
          // props.setOpen(false)
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };
  return (
    <FormContainer>
      <HeadSection>
        <SubHead className="icons">
          <img
            src={require("../../Assets/images/arrow-circle-leftarrow.png")}
          />
        </SubHead>
        <SubHead>
          <Title>Select Fields and Download</Title>
        </SubHead>
        <SubHead className="icons" onClick={() => props.setOpen(false)}>
          <img src={require("../../Assets/images/close-square.png")} />
        </SubHead>
      </HeadSection>
      <FormSection>
        <ItemRow className="flex-start">
          <LabelSection>
            <Label>Select Field</Label>
          </LabelSection>
          <ItemSection className="billing-location">
            <LocationItems onClick={() => handleCheckBox("Application ID")}>
              <CustomCheckBox
                ticked={state.selected_fields.includes("Application ID")}
              />
              <Label className="billing-location">Application Id</Label>
            </LocationItems>
            <LocationItems onClick={() => handleCheckBox("Vendor")}>
              <CustomCheckBox
                ticked={state.selected_fields.includes("Vendor")}
              />
              <Label className="billing-location">Vendor</Label>
            </LocationItems>
            <LocationItems onClick={() => handleCheckBox("Product")}>
              <CustomCheckBox
                ticked={state.selected_fields.includes("Product")}
              />
              <Label className="billing-location">Product</Label>
            </LocationItems>
            <LocationItems onClick={() => handleCheckBox("FI Date")}>
              <CustomCheckBox
                ticked={state.selected_fields.includes("FI Date")}
              />
              <Label className="billing-location">FI Date</Label>
            </LocationItems>
            <LocationItems onClick={() => handleCheckBox("FI Time")}>
              <CustomCheckBox
                ticked={state.selected_fields.includes("FI Time")}
              />
              <Label className="billing-location">FI Time</Label>
            </LocationItems>
            <LocationItems onClick={() => handleCheckBox("Customer Name")}>
              <CustomCheckBox
                ticked={state.selected_fields.includes("Customer Name")}
              />
              <Label className="billing-location">Customer Name</Label>
            </LocationItems>
            <LocationItems onClick={() => handleCheckBox("Submitted Date RV")}>
              <CustomCheckBox
                ticked={state.selected_fields.includes("Submitted Date RV")}
              />
              <Label className="billing-location">Submitted Date RV</Label>
            </LocationItems>
            {/* <LocationItems onClick={()=> handleCheckBox("Submitted Time RV")}>
                    <CustomCheckBox ticked={state.selected_fields.includes("Submitted Time RV")} />
                    <Label className='billing-location'>Submitted Time RV</Label>
                </LocationItems> */}
            <LocationItems onClick={() => handleCheckBox("Submitted Date BV")}>
              <CustomCheckBox
                ticked={state.selected_fields.includes("Submitted Date BV")}
              />
              <Label className="billing-location">Submitted Date BV</Label>
            </LocationItems>
            {/* <LocationItems onClick={()=> handleCheckBox("Submitted Time BV")}>
                    <CustomCheckBox ticked={state.selected_fields.includes("Submitted Time BV")} />
                    <Label className='billing-location'>Submitted Time BV</Label>
                </LocationItems> */}
            <LocationItems onClick={() => handleCheckBox("Submitted Date PV")}>
              <CustomCheckBox
                ticked={state.selected_fields.includes("Submitted Date PV")}
              />
              <Label className="billing-location">Submitted Date PV</Label>
            </LocationItems>
            {/* <LocationItems onClick={()=> handleCheckBox("Submitted Time PV")}>
                    <CustomCheckBox ticked={state.selected_fields.includes("Submitted Time PV")} />
                    <Label className='billing-location'>Submitted Time PV</Label>
                </LocationItems> */}
            <LocationItems onClick={() => handleCheckBox("Submitted Date PD")}>
              <CustomCheckBox
                ticked={state.selected_fields.includes("Submitted Date PD")}
              />
              <Label className="billing-location">Submitted Date PD</Label>
            </LocationItems>
            {/* <LocationItems onClick={()=> handleCheckBox("Submitted Time PD")}>
                    <CustomCheckBox ticked={state.selected_fields.includes("Submitted Time PD")} />
                    <Label className='billing-location'>Submitted Time PD</Label>
                </LocationItems> */}
            <LocationItems
              onClick={() => handleCheckBox("Applicant RV Address")}
            >
              <CustomCheckBox
                ticked={state.selected_fields.includes("Applicant RV Address")}
              />
              <Label className="billing-location">Applicant RV Address</Label>
            </LocationItems>
            <LocationItems
              onClick={() => handleCheckBox("Applicant BV Address")}
            >
              <CustomCheckBox
                ticked={state.selected_fields.includes("Applicant BV Address")}
              />
              <Label className="billing-location">Applicant BV Address</Label>
            </LocationItems>
            <LocationItems
              onClick={() => handleCheckBox("Applicant PV Address")}
            >
              <CustomCheckBox
                ticked={state.selected_fields.includes("Applicant PV Address")}
              />
              <Label className="billing-location">Applicant PV Address</Label>
            </LocationItems>
            <LocationItems
              onClick={() => handleCheckBox("Applicant PD Address")}
            >
              <CustomCheckBox
                ticked={state.selected_fields.includes("Applicant PD Address")}
              />
              <Label className="billing-location">Applicant PD Address</Label>
            </LocationItems>
            <LocationItems
              onClick={() => handleCheckBox("Applicant RV Distance")}
            >
              <CustomCheckBox
                ticked={state.selected_fields.includes("Applicant RV Distance")}
              />
              <Label className="billing-location">Applicant RV Distance</Label>
            </LocationItems>
            <LocationItems
              onClick={() => handleCheckBox("Applicant BV Distance")}
            >
              <CustomCheckBox
                ticked={state.selected_fields.includes("Applicant BV Distance")}
              />
              <Label className="billing-location">Applicant BV Distance</Label>
            </LocationItems>
            <LocationItems
              onClick={() => handleCheckBox("Applicant PV Distance")}
            >
              <CustomCheckBox
                ticked={state.selected_fields.includes("Applicant PV Distance")}
              />
              <Label className="billing-location">Applicant PV Distance</Label>
            </LocationItems>
            <LocationItems
              onClick={() => handleCheckBox("Applicant PD Distance")}
            >
              <CustomCheckBox
                ticked={state.selected_fields.includes("Applicant PD Distance")}
              />
              <Label className="billing-location">Applicant PD Distance</Label>
            </LocationItems>
            <LocationItems onClick={() => handleCheckBox("RV District")}>
              <CustomCheckBox
                ticked={state.selected_fields.includes("RV District")}
              />
              <Label className="billing-location">RV District</Label>
            </LocationItems>
            <LocationItems onClick={() => handleCheckBox("BV District")}>
              <CustomCheckBox
                ticked={state.selected_fields.includes("BV District")}
              />
              <Label className="billing-location">BV District</Label>
            </LocationItems>
            <LocationItems onClick={() => handleCheckBox("PV District")}>
              <CustomCheckBox
                ticked={state.selected_fields.includes("PV District")}
              />
              <Label className="billing-location">PV District</Label>
            </LocationItems>
            <LocationItems onClick={() => handleCheckBox("PD District")}>
              <CustomCheckBox
                ticked={state.selected_fields.includes("PD District")}
              />
              <Label className="billing-location">PD District</Label>
            </LocationItems>
            <LocationItems onClick={() => handleCheckBox("Product TAT")}>
              <CustomCheckBox
                ticked={state.selected_fields.includes("Product TAT")}
              />
              <Label className="billing-location">Product TAT</Label>
            </LocationItems>
            <LocationItems
              onClick={() => handleCheckBox("Image Upload Status RV")}
            >
              <CustomCheckBox
                ticked={state.selected_fields.includes(
                  "Image Upload Status RV"
                )}
              />
              <Label className="billing-location">Image Upload Status RV</Label>
            </LocationItems>
            <LocationItems
              onClick={() => handleCheckBox("Image Upload Status BV")}
            >
              <CustomCheckBox
                ticked={state.selected_fields.includes(
                  "Image Upload Status BV"
                )}
              />
              <Label className="billing-location">Image Upload Status BV</Label>
            </LocationItems>
            <LocationItems
              onClick={() => handleCheckBox("Image Upload Status PV")}
            >
              <CustomCheckBox
                ticked={state.selected_fields.includes(
                  "Image Upload Status PV"
                )}
              />
              <Label className="billing-location">Image Upload Status PV</Label>
            </LocationItems>
            <LocationItems
              onClick={() => handleCheckBox("Image Upload Status PD")}
            >
              <CustomCheckBox
                ticked={state.selected_fields.includes(
                  "Image Upload Status PD"
                )}
              />
              <Label className="billing-location">Image Upload Status PD</Label>
            </LocationItems>
            <LocationItems
              onClick={() => handleCheckBox("Applicant Employment status")}
            >
              <CustomCheckBox
                ticked={state.selected_fields.includes(
                  "Applicant Employment status"
                )}
              />
              <Label className="billing-location">
                Applicant Employment status
              </Label>
            </LocationItems>
          </ItemSection>
        </ItemRow>
      </FormSection>
      <ButtonSection>
        <ButtonItem
          handleClick={handleClose}
          name="Discard"
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
          name="Download"
          type="contained"
          color="#fff"
          bgColor="#132756"
          fsize="16px"
          fweight="500"
          fpadding="6px 105px"
          bradius="8px"
        />
      </ButtonSection>
      {/* {loading? 
        <div style={{ width: '100%',marginBottom: '40px' }}>
            <LinearProgress />
        </div>
      : null} */}
      {task_id ? (
        <VendorTrackProgressBar
          progress={progress}
          setProgress={setProgress}
          task_id={task_id}
          is_list={false}
        />
      ) : null}
    </FormContainer>
  );
}

export default AddVendorTrackModalForm;

const LocationItems = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 21px;
  cursor: pointer;
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
    color: #444445;
    font-size: 14px;
    font-weight: 400;
  }
`;
const ItemSection = styled.div`
  width: 60%;
  margin-right: 52px;
  &.billing-location {
    height: 157px;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    overflow-y: scroll;
    padding: 22px;
    width: 53%;
  }
`;
const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 25px;
  height: 185px;
  overflow-y: scroll;
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
  padding: 20px 40px 40px 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  /* margin-top: 50px; */
`;
