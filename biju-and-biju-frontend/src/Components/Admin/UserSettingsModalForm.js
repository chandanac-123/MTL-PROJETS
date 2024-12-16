import React, { useState } from "react";
import styled from "styled-components";
import ButtonItem from "../ButtonItem";
import DatePickItem from "../Common/DatePickItem";
import FileInputItem from "../Common/FileInputItem";
import RedStarItem from "../Common/RedStarItem";
import TextFieldItem from "../Common/TextFieldItem";
import SelectBoxLabel from "../SelectBoxLabel";

function UserSettingsModalForm(props) {
  const [state, setState] = useState({
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
    district: "",
    salary: "",
    cpv_rate: "",
    pd_rate: "",
    bank: "",
    branch: "",
    ifsc_code: "",
    account_number: "",
    joining_date: "",
    date_of_birth: "",
    blood_group: "",
    description: "",
    upload_report: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSelectChange = (value, name) => {
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

  const handleSubmit = () => {
    console.log(state);
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
          <Title>Add User(add new)</Title>
        </SubHead>
        <SubHead className="icons" onClick={() => props.setOpen(false)}>
          <img src={require("../../Assets/images/close-square.png")} />
        </SubHead>
      </HeadSection>
      <FormSection>
        <ItemRow>
          <LabelSection>
            <Label>
              Name
              <RedStarItem />
            </Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              handleChange={handleChange}
              name="name"
              value={state.name}
              placeholder=""
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
              handleChange={handleChange}
              name="email"
              value={state.email}
              placeholder=""
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
              handleChange={handleChange}
              name="password"
              value={state.password}
              placeholder=""
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
              handleChange={handleChange}
              name="phone"
              value={state.phone}
              placeholder=""
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
              handleChange={handleChange}
              name="employee_code"
              value={state.employee_code}
              placeholder=""
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
              handleChange={handleChange}
              name="employeeid_name"
              value={state.employeeid_name}
              placeholder=""
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
              handleChange={handleChange}
              name="account_holder"
              value={state.account_holder}
              placeholder=""
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
              handleChange={handleChange}
              name="address"
              value={state.address}
              placeholder=""
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
              handleChange={handleSelectChange}
              name="designation"
              value={state.designation}
              selectType="EmployeeName"
              default="Select"
              fpadding="9.5px 14px"
              fsize="12px"
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>
              MACID
              <RedStarItem />
            </Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              handleChange={handleChange}
              name="MACID"
              value={state.MACID}
              placeholder=""
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>
              Zone
              <RedStarItem />
            </Label>
          </LabelSection>
          <ItemSection>
            <SelectBoxLabel
              handleChange={handleSelectChange}
              name="zone"
              value={state.zone}
              default="Select"
              fpadding="9.5px 14px"
              fsize="12px"
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
            <TextFieldItem
              handleChange={handleChange}
              name="district"
              value={state.district}
              placeholder=""
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>Salary</Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              handleChange={handleChange}
              name="salary"
              value={state.salary}
              placeholder=""
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>CPV Rate</Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              handleChange={handleChange}
              name="cpv_rate"
              value={state.cpv_rate}
              placeholder=""
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>PD Rate</Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              handleChange={handleChange}
              name="pd_rate"
              value={state.pd_rate}
              placeholder=""
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>Bank</Label>
          </LabelSection>
          <ItemSection>
            <SelectBoxLabel
              handleChange={handleSelectChange}
              name="bank"
              value={state.bank}
              default="Select"
              fpadding="9.5px 14px"
              fsize="12px"
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>Branch</Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              handleChange={handleChange}
              name="branch"
              value={state.branch}
              placeholder=""
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>IFSC Code</Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              handleChange={handleChange}
              name="ifsc_code"
              value={state.ifsc_code}
              placeholder=""
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>Account Number</Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              handleChange={handleChange}
              name="account_number"
              value={state.account_number}
              placeholder=""
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>Joining Date</Label>
          </LabelSection>
          <ItemSection>
            <DatePickItem
              handleChange={handleSelectChange}
              name="joining_date"
              value={state.joining_date}
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>Date Of Birth</Label>
          </LabelSection>
          <ItemSection>
            <DatePickItem
              handleChange={handleSelectChange}
              name="date_of_birth"
              value={state.date_of_birth}
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>Blood Group</Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
              handleChange={handleChange}
              name="blood_group"
              value={state.blood_group}
              placeholder=""
            />
          </ItemSection>
        </ItemRow>
        <ItemRow className="flex-start">
          <LabelSection>
            <Label>Description</Label>
          </LabelSection>
          <ItemSection>
            <TextFieldItem
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
            <Label>Upload Report</Label>
          </LabelSection>
          <ItemSection>
            <FileInputItem
              handleFileChange={handleFileChange}
              name="upload_report"
              bcolor="#64A7DC"
              fwidth="97%"
            />
          </ItemSection>
        </ItemRow>
      </FormSection>
      <ButtonSection>
        <ButtonItem
          name="Delete"
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
        />
      </ButtonSection>
    </FormContainer>
  );
}

export default UserSettingsModalForm;

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
