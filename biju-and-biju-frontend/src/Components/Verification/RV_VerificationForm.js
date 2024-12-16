import React from "react";
import styled from "styled-components";

function RV_VerificationForm(props) {
  return (
    <>
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
              <Label>Relation</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {props?.datas?.assign_verification_id?.formdata[0]?.relation}
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>If Other Relation</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.otherRelation
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
                    ?.other_details[0]?.marital
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
        </BorderItem>
        <BorderItem>
          <ItemRow className="heading">
            <LabelSection>
              <Label className="heading">Residential Details</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue></SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Square Feet</Label>
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
          <ItemRow>
            <LabelSection>
              <Label>Cents</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.cent
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Residence Type</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.residentType
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Root Type</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.roofType
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Landmarks</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.landMark
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Owned By</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.ownedBy
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>
                if Rented, add rent per month also(Company Provided)
              </Label>
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
          <ItemRow>
            <LabelSection>
              <Label>Furnished Type</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.furnishType
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>House Owner name</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.ownerName
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Year at Residence</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.yearAtResident
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Profile of Customer</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.profileOfCustomer
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
        </BorderItem>
        <BorderItem>
          <ItemRow>
            <LabelSection>
              <Label>Year's at Job/Business</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.yearAtJob
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Vehicles Owned Details if any</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.vehicleOwner
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Vehicle Accessibility</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.vehicleAccess
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>If no Vehicle Accessibility</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.noOfVehicles
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>If other enter reason</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.ifOther
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Land Value</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.landValue
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Kilometer</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.km
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Route</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.routes
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Purpose of Loan</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.loanPurpos
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
              <Label className="heading">Other Earning Members</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue></SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Details</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.earnDetails
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Any other Information</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.earnInfo
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
        </BorderItem>

        <BorderItem>
          <ItemRow className="heading">
            <LabelSection>
              <Label className="heading">Co-Applicant or Guarantor</Label>
            </LabelSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Co-Applicant or Guarantor</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.coApplicant
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Name</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.applicantName
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Relation</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.applicantRelation
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
                    ?.other_details[0]?.applicantAge
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>
                Profile of <br /> Co-Applicant/Guarantor
              </Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.profileOfCoApplicant
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>
                Co-Applicant/Guarantor <br /> Income
              </Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.coApplicantIncome
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
              <Label className="heading">Status</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue></SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Status</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {props?.datas?.assign_verification_id?.formdata[0]?.status}
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>If Negative</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.statusNegative
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>If Other Reason</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.statusOtherReason
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
        </BorderItem>
      </div>

      {/* <div className="section">
    
    
</div> */}

      {/* <div className="section">

</div> */}

      {/* <div className="section">

</div> */}
    </>
  );
}

export default RV_VerificationForm;

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
