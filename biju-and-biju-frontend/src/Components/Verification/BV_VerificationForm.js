import React from "react";
import styled from "styled-components";

function BV_VerificationForm(props) {
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
                  props?.datas?.assign_verification_id?.verification_address
                    ?.verification?.applicant_type
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
              <Label> Office Address Confirmed(Visited)</Label>
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
          <ItemRow>
            <LabelSection>
              <Label>Constitution</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.constitution
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>If other Constitution</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.ifOtherConstitution
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
        </BorderItem>

        <BorderItem>
          <ItemRow className="heading">
            <LabelSection>
              <Label className="heading">BV Type</Label>
            </LabelSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Office/Business</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {props?.datas?.assign_verification_id?.formdata[0]?.office}
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>No of Partners/Directors</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.numberOfPartners
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Income</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.income
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Turnover</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.turnover
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>

          <ItemRow>
            <LabelSection>
              <Label>Branch Details</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.branchDetails
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Owned/Rented</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.ownedOrRented
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>

          <ItemRow>
            <LabelSection>
              <Label>If other,Specified</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.otherSpecify
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Rent Amount</Label>
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
              <Label>Business Activity</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.businessActivity
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
        </BorderItem>
        <BorderItem>
          <ItemRow className="heading">
            <LabelSection>
              <Label className="heading">Business Details</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue></SpanValue>
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
                    ?.other_details[0]?.natureOfBusiness
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>No of Staff</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.numberOfStaffs
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>No of Staff visible at the time of visit</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.visibleTimeStaff
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Company Name</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.companyName
                }
              </SpanValue>
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
              <Label>Name Board</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.nameBoard
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Stability</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.stability
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Previous Employment/Business</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {props?.datas?.assign_verification_id?.formdata[0]
                  ?.other_details[0]?.previousBusiness
                  ? props?.datas?.assign_verification_id?.formdata[0]
                      ?.other_details[0]?.previousBusiness
                  : props?.datas?.assign_verification_id?.formdata[0]
                      ?.other_details[0]?.previousEmployment}
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Locality</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.locality
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>If other locality</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.otherLocality
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Construction</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.construction
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
        </BorderItem>
        <BorderItem>
          <ItemRow className="heading">
            <LabelSection>
              <Label className="heading">Employee Details</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue></SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Employed</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.employed
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Designation</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.employedDesignation
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>If other Designation</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.otherEmployedDesignation
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Salary</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.salary
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>No of year's working</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.numberOfYears
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Previous work experience any</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.previousWorkExperience
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
                    ?.other_details[0]?.purposOfLoan
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>
        </BorderItem>
      </div>

      {/* <div className="section">

</div> */}

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
              <Label>If other ,Reason</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.applicantReason
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
              <Label>Vehicle Accesibility</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.vehicleAccessibilty
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>{" "}
          <ItemRow>
            <LabelSection>
              <Label>If no,Vehicle Access</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.noVehicleAccess
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>{" "}
          <ItemRow>
            <LabelSection>
              <Label>If no,Reason</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>
                {
                  props?.datas?.assign_verification_id?.formdata[0]
                    ?.other_details[0]?.noReason
                }
              </SpanValue>
            </ItemSection>
          </ItemRow>{" "}
          <ItemRow>
            <LabelSection>
              <Label>KM</Label>
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
    </>
  );
}

export default BV_VerificationForm;

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
