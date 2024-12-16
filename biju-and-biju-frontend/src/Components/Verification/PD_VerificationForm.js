import React from "react";
import styled from "styled-components";

function PD_VerificationForm(props) {
  return (
    <>
      {/* <div className="section"> */}
      <div className="section">
        <TopSection>
          <ItemRow>
            <LabelSection>
              <Label className="secondary">Application Number</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue className="important">
                {
                  props?.datas?.assign_verification_id.verification_address
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
              <SpanValue className="secondary">
                {
                  props?.datas?.assign_verification_id.verification_address
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
              <SpanValue className="secondary">
                {
                  props?.datas?.assign_verification_id.verification_address
                    .verification.product.product_name
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Applicant</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id.verification_address
                    .verification.applicant_type
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
                    .adress
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Status</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {props?.datas?.assign_verification_id?.work_status}
              </SpanValue>
            </ItemSection>
          </ItemRow>
        </TopSection>

        <BorderItem>
          <ItemRow className="heading">
            <LabelSection>
              <Label className="heading">General</Label>
            </LabelSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Address Confirmed(Visited)</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.adress_confirmed
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Person Met</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {props?.datas?.assign_verification_id?.formdata[0]?.person_met}
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Designation</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {props?.datas?.assign_verification_id?.formdata[0]?.designation}
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>If Other Designation</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.otherDesignation
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
        </BorderItem>
        <BorderItem>
          <ItemRow className="">
            <LabelSection>
              <Label className="heading">Office Details</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue></SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Nature of Business</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.natureOfBusinees
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Square feet</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.squareFeet
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
        </BorderItem>
        <BorderItem>
          <ItemRow>
            <LabelSection>
              <Label>
                Owned in the name <br />
                of /Rented with amount
              </Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.ownedName
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>No of Staffs</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.numberOfStaff
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Total Salary</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.totalSalary
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>No of staff present now</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.numberOfStaffPresent
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Company type</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.companyType
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>
                Partners/Directors with <br />
                share details
              </Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.partners
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Purpose of loan</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.purposOfLoan
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Pledging property</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.pledging
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Supplier for the firm(any three)</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.supplierOfFirm
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Creditors Amount</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.creditorsAmount
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>
                Creditors Amount <br />
                duration obtained
              </Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.creditorsAmountDuration
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Customers of the firm(any 3)</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.customerOfFirm
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Total Debtors Amount</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.totalDebtorsAmount
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
        </BorderItem>
      </div>

      <div className="section">
        <BorderItem>
          <ItemRow>
            <LabelSection>
              <Label>Vehicle Details(Office)</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.vehicleDetails
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Loans/Overdrafts details(office)</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.loanOverfraft
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>
                Total debtors amount
                <br /> duration obtained
              </Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.totalDebtorsDuration
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
        </BorderItem>
        <BorderItem>
          <ItemRow className="heading">
            <LabelSection>
              <Label className="heading">Other Income</Label>
            </LabelSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Details of branches</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.detailsOfBranches
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Details of other business</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.detailsOfOtherBusiness
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Details of business name</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.detailsOfOtherBusinessName
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Place</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.place
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Year's of business</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.yearOfBusiness
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>No of staffs</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.numberOfStaffOthers
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Nature of business</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.natureOfBusineesOthers
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Square feet</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.squareFeetOthers
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Rent</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.rent
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
        </BorderItem>
      </div>
      <div className="section">
        <BorderItem>
          <ItemRow className="heading">
            <LabelSection>
              <Label className="heading">Godown</Label>
            </LabelSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Details</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.godownDetails
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Square feet</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.godownSquarefeet
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Rent</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.godownRent
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Place</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.goDownPlace
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Stock amount</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.stockAmount
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
        </BorderItem>
        {/* </div> */}

        <BorderItem>
          <ItemRow className="heading">
            <LabelSection>
              <Label className="heading">Other</Label>
            </LabelSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Annual Turnover</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.annualTurnOver
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Name of auditor(CA)and place</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.nameOfAuditor
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Bank account and Number</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.bankAccountNumber
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>PAN card Number</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.panCard
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>GST Number</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.gstNumber
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Aadhar Number</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.aadharNumber
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
        </BorderItem>
        <BorderItem>
          <ItemRow className="heading">
            <LabelSection>
              <Label className="heading">Applicant Residence Details</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue></SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Family members and details</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.familyMemberDetails
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
        </BorderItem>
        <BorderItem>
          <ItemRow className="heading">
            <LabelSection>
              <Label className="heading">Residence Premise Details</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue></SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Square feet</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.familySquareFeet
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Cent</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.familyCent
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Ownership/Rented </Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.rented
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Rent amount</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.rentAmount
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>
                Year's at current <br />
                residence/by birth place
              </Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.yearAtresidence
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Applicant DOB</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.applicantDob
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Educational qualification</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.educationalQualification
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Profile of co-applicant/guarantor</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.profileCoApplicant
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Assets details</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.assetDetails
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>

          <ItemRow>
            <LabelSection>
              <Label>Loans/Overdraft details(residence)</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.loanOverfraftResidence
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
        </BorderItem>
      </div>

      <div className="section">
        <BorderItem>
          <ItemRow>
            <LabelSection>
              <Label>Vehicle Details(Residence)</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.vehicleDetailsResidence
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Age</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.age
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Marital Status</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.maritalStatus
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
        </BorderItem>
        <BorderItem>
          <ItemRow className="heading">
            <LabelSection>
              <Label className="heading">Neighbour Check</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue></SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Neighbour Check Done</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.neighbour_check
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Neighbour Details</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.neighbourDetails
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
        </BorderItem>
        <BorderItem>
          <ItemRow className="heading">
            <LabelSection>
              <Label className="heading">Family Details</Label>
            </LabelSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Father</Label>
            </LabelSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Father's Occupation</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.fatherOccupation
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Father's Income</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.fatherIncome
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Mother</Label>
            </LabelSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Mother's Occupation</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.motherOccupation
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Mother's Income</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.motherIncome
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Brother</Label>
            </LabelSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Brother's Occupation</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.brotherOccupation
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Brother's Income</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.brotherIncome
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Daughter</Label>
            </LabelSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Daughter's Occupation</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.daughterOccupation
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Daughter's Income</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.daughterIncome
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Spouse</Label>
            </LabelSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Spouse's Occupation</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.spouseOccupation
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Spouse's Income</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.spouseIncome
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Number of Children</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.numberOfChildren
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Sister</Label>
            </LabelSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Sister's Occupation</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.sisterOccupation
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Sister's Income</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.sisterIncome
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Son</Label>
            </LabelSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Son's Occupation</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.sonOccupation
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Son's Income</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.sonIncome
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
        </BorderItem>
      </div>

      {/* </div> */}
    </>
  );
}

export default PD_VerificationForm;

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
const TopSection = styled.div`
  padding: 25px;
`;
const BorderItem = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 25px;
  margin-bottom: 25px;
`;
const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  &.heading {
    margin-bottom: 35px;
  }
  &.bottom-section {
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
  &.heading {
    font-size: 14px;
  }
  &.signature {
    margin-right: 60px;
  }
`;
const ItemSection = styled.div`
  width: 60%;
  margin-right: 22px;
  &.bottom-section {
    border: 1px solid #d9d9d9;
    border-radius: 8px;
    margin-right: 15px;
    margin-right: 0px;
    height: 100px;
    padding: 15px;
  }
`;
