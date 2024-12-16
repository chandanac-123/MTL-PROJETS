import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Checkbox } from "@mui/material";
import {
  extract_date,
  getPageDetails,
  GetPermission,
  get_time_from_date,
  timeDate,
  timeDate24Hours,
} from "../../Functions/utils";
import TablePaginationDemo, { SelectInput } from "../TablePaginationDemo";
import DownloadButton from "../DownloadButton";
import { PageDetails } from "../VerificationTable";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ReportEditModal from "./ReportEditModal";
import DeleteConfirm from "../Common/DeleteConfirm";
import VerificationConfirm from "../Common/VerificationConfirm";

function ReportConfirmTableAccordion(props) {
  const user_type = useSelector((state) => state.auth.user_type);
  const permission = GetPermission("verification", "change");

  const handleRowsPerPageChange = (event) => {
    const value = parseInt(event.target.value, 10);
    props.setRowsPerPage(value);
    props.setPage(1); // Reset the current page to 1 when the rows per page is changed
  };

  return (
    <>
      <HeadContainer>
        {(user_type == "Admin" || user_type == "SubAdmin") && (
          <CheckboxItem
            color="primary"
            onChange={(e) => props?.handleCheckBox(e.target.checked, "all")}
            checked={
              props?.data?.results?.length > 0 &&
              props?.checkedIDs?.length == props?.data?.results?.length
            }
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        )}
        {props?.checkedIDs?.length ? (
          <VerificationConfirm
            handleClickOpen={props?.handleClickOpen}
            open={props?.open}
            handleClose={props?.handleClose}
            handleConfirm={props?.handleConfirm}
          />
        ) : null}
      </HeadContainer>
      {props?.data?.results?.map((row) => {
        let rv = row.addresses.filter((p) => p.fi_type === "RV")[0];
        let pv = row.addresses.filter((p) => p.fi_type === "PV")[0];
        let bv = row.addresses.filter((p) => p.fi_type === "BV")[0];
        let pd = row.addresses.filter((p) => p.fi_type === "PD")[0];
        return (
          <AccordionMain>
            <AccordionSummaryItem
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <TypographyItem>
                {(user_type == "Admin" || user_type == "SubAdmin") && (
                  <CheckboxItem
                    color="primary"
                    checked={props.checkedIDs.includes(row.id)}
                    onChange={(e) =>
                      props?.handleCheckBox(e.target.checked, row.id)
                    }
                    inputProps={{
                      "aria-labelledby": row.id,
                    }}
                  />
                )}
              </TypographyItem>
            </AccordionSummaryItem>
            <AccordionDetailsItem>
              <TypographyItem className="item">
                <Item>Application ID</Item>
                <Item className="value">{row.application_id}</Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>Vendor</Item>
                <Item className="value">{row.vendor_name}</Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>
                  Product <br /> Name
                </Item>
                <Item className="value">{row.product_name}</Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>
                  Customer <br /> Name
                </Item>
                <Item className="value">{row.customer_name}</Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>
                  Residence <br /> Address
                </Item>
                <Item className="value">{rv?.adress}</Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>
                  RV Verification <br /> Agent
                </Item>
                <Item className="value">
                  {
                    rv?.verification_address[0]?.assigned_verification_users.filter(
                      (i) => i.status == true
                    )[0]?.fieldagentname
                  }
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>
                  Applicant <br /> RV Distance
                </Item>
                <Item className="value">
                  {
                    rv?.verification_address[0]?.assign_verification[0]
                      ?.distance
                  }
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>
                  Vendor <br /> RV TAT
                </Item>
                <Item className="value">
                  {rv
                    ? rv?.verification_address[0]?.is_TATin === true
                      ? "IN"
                      : "OUT"
                    : ""}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>
                  Office <br /> Address
                </Item>
                <Item className="value">{bv?.adress}</Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>
                  BV Verification <br /> Agent
                </Item>
                <Item className="value">
                  {
                    bv?.verification_address[0]?.assigned_verification_users.filter(
                      (i) => i.status == true
                    )[0]?.fieldagentname
                  }
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>
                  Applicant <br /> BV Distance
                </Item>
                <Item className="value">
                  {
                    bv?.verification_address[0]?.assign_verification[0]
                      ?.distance
                  }
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>
                  Vendor <br /> BV TAT
                </Item>
                <Item className="value">
                  {bv
                    ? bv?.verification_address[0]?.is_TATin === true
                      ? "IN"
                      : "OUT"
                    : ""}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>
                  Permanent <br /> Address
                </Item>
                <Item className="value">{pv?.adress}</Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>
                  PV Verification <br /> Agent
                </Item>
                <Item className="value">
                  {
                    pv?.verification_address[0]?.assigned_verification_users.filter(
                      (i) => i.status == true
                    )[0]?.fieldagentname
                  }
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>
                  Applicant PV <br /> Distance
                </Item>
                <Item className="value">
                  {
                    pv?.verification_address[0]?.assign_verification[0]
                      ?.distance
                  }
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>
                  Vendor PV <br /> TAT
                </Item>
                <Item className="value">
                  {pv
                    ? pv?.verification_address[0]?.is_TATin === true
                      ? "IN"
                      : "OUT"
                    : ""}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>
                  PD <br /> Address
                </Item>
                <Item className="value">{pd?.adress}</Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>
                  PD Verification <br /> Agent
                </Item>
                <Item className="value">
                  {
                    pd?.verification_address[0]?.assigned_verification_users.filter(
                      (i) => i.status == true
                    )[0]?.fieldagentname
                  }
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>
                  Applicant PD <br /> Distance
                </Item>
                <Item className="value">
                  {
                    pd?.verification_address[0]?.assign_verification[0]
                      ?.distance
                  }
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>
                  Vendor PD <br /> TAT
                </Item>
                <Item className="value">
                  {pd
                    ? pd?.verification_address[0]?.is_TATin === true
                      ? "IN"
                      : "OUT"
                    : ""}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>FI Date</Item>
                <Item className="value">
                  {row.addresses.filter(
                    (p) => p.fi_type === "PD" || "RV" || "BV" || "PV"
                  )[0]?.fi_date_time
                    ? extract_date(
                        row.addresses.filter(
                          (p) => p.fi_type === "PD" || "RV" || "BV" || "PV"
                        )[0]?.fi_date_time
                      )
                    : "NA"}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>FI Time</Item>
                <Item className="value">
                  {row.addresses.filter(
                    (p) => p.fi_type === "PD" || "RV" || "BV" || "PV"
                  )[0]?.fi_date_time
                    ? get_time_from_date(
                        row.addresses.filter(
                          (p) => p.fi_type === "PD" || "RV" || "BV" || "PV"
                        )[0]?.fi_date_time
                      )
                    : "NA"}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>RV Coordinated By</Item>
                <Item className="value">
                  {
                    rv?.verification_address[0]?.assign_verification[0]
                      ?.employees_names?.coordinated_by_name
                  }
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>RV Allocated By</Item>
                <Item className="value">{rv ? row.allocated_by_name : ""}</Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>RV Written By</Item>
                <Item className="value">
                  {
                    rv?.verification_address[0]?.assign_verification[0]
                      ?.employees_names?.written_by_name
                  }
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>RV Reported By</Item>
                <Item className="value">
                  {
                    rv?.verification_address[0]?.assign_verification[0]
                      ?.employees_names?.reported_by_name
                  }
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>BV Coordinated By</Item>
                <Item className="value">
                  {
                    bv?.verification_address[0]?.assign_verification[0]
                      ?.employees_names?.coordinated_by_name
                  }
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>BV Allocated By</Item>
                <Item className="value">{bv ? row.allocated_by_name : ""}</Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>BV Written By</Item>
                <Item className="value">
                  {
                    bv?.verification_address[0]?.assign_verification[0]
                      ?.employees_names?.written_by_name
                  }
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>BV Reported By</Item>
                <Item className="value">
                  {
                    bv?.verification_address[0]?.assign_verification[0]
                      ?.employees_names?.reported_by_name
                  }
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>PV Coordinated By</Item>
                <Item className="value">
                  {
                    pv?.verification_address[0]?.assign_verification[0]
                      ?.employees_names?.coordinated_by_name
                  }
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>PV Allocated By</Item>
                <Item className="value">{pv ? row.allocated_by_name : ""}</Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>PV Written By</Item>
                <Item className="value">
                  {
                    pv?.verification_address[0]?.assign_verification[0]
                      ?.employees_names?.written_by_name
                  }
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>PV Reported By</Item>
                <Item className="value">
                  {
                    pv?.verification_address[0]?.assign_verification[0]
                      ?.employees_names?.reported_by_name
                  }
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>PD Coordinated By</Item>
                <Item className="value">
                  {
                    pd?.verification_address[0]?.assign_verification[0]
                      ?.employees_names?.coordinated_by_name
                  }
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>PD Allocated By</Item>
                <Item className="value">{pd ? row.allocated_by_name : ""}</Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>PD Written By</Item>
                <Item className="value">
                  {
                    pd?.verification_address[0]?.assign_verification[0]
                      ?.employees_names?.written_by_name
                  }
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>PD Reported By</Item>
                <Item className="value">
                  {
                    pd?.verification_address[0]?.assign_verification[0]
                      ?.employees_names?.reported_by_name
                  }
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>RV Billable</Item>
                <Item className="value">
                  {rv
                    ? rv?.verification_address[0]?.assign_verification[0]
                        ?.billable
                      ? "Yes"
                      : "No"
                    : ""}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>BV Billable</Item>
                <Item className="value">
                  {bv
                    ? bv?.verification_address[0]?.assign_verification[0]
                        ?.billable
                      ? "Yes"
                      : "No"
                    : ""}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>PV Billable</Item>
                <Item className="value">
                  {pv
                    ? pv?.verification_address[0]?.assign_verification[0]
                        ?.billable
                      ? "Yes"
                      : "No"
                    : ""}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>PD Billable</Item>
                <Item className="value">
                  {pd
                    ? pd?.verification_address[0]?.assign_verification[0]
                        ?.billable
                      ? "Yes"
                      : "No"
                    : ""}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>
                  RV Non-Billable
                  <br /> Reason
                </Item>
                <Item className="value">
                  {rv?.verification_address[0]?.assign_verification[0]?.billable
                    ? ""
                    : rv?.verification_address[0]?.assign_verification[0]
                        ?.billable_reason}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>
                  BV Non-Billable
                  <br /> Reason
                </Item>
                <Item className="value">
                  {bv?.verification_address[0]?.assign_verification[0]?.billable
                    ? ""
                    : bv?.verification_address[0]?.assign_verification[0]
                        ?.billable_reason}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>
                  PV Non-Billable
                  <br /> Reason
                </Item>
                <Item className="value">
                  {pv?.verification_address[0]?.assign_verification[0]?.billable
                    ? ""
                    : pv?.verification_address[0]?.assign_verification[0]
                        ?.billable_reason}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>
                  PD Non-Billable
                  <br /> Reason
                </Item>
                <Item className="value">
                  {pd?.verification_address[0]?.assign_verification[0]?.billable
                    ? ""
                    : pd?.verification_address[0]?.assign_verification[0]
                        ?.billable_reason}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>RV Payable</Item>
                <Item className="value">
                  {rv
                    ? rv?.verification_address[0]?.assign_verification[0]
                        ?.payable
                      ? "Yes"
                      : "No"
                    : ""}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>BV Payable</Item>
                <Item className="value">
                  {bv
                    ? bv?.verification_address[0]?.assign_verification[0]
                        ?.payable
                      ? "Yes"
                      : "No"
                    : ""}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>PV Payable</Item>
                <Item className="value">
                  {pv
                    ? pv?.verification_address[0]?.assign_verification[0]
                        ?.payable
                      ? "Yes"
                      : "No"
                    : ""}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>PD Payable</Item>
                <Item className="value">
                  {pd
                    ? pd?.verification_address[0]?.assign_verification[0]
                        ?.payable
                      ? "Yes"
                      : "No"
                    : ""}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>
                  RV Non-Payable
                  <br /> Reason
                </Item>
                <Item className="value">
                  {rv?.verification_address[0]?.assign_verification[0]?.payable
                    ? ""
                    : rv?.verification_address[0]?.assign_verification[0]
                        ?.payable_reason}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>
                  BV Non-Payable
                  <br /> Reason
                </Item>
                <Item className="value">
                  {bv?.verification_address[0]?.assign_verification[0]?.payable
                    ? ""
                    : bv?.verification_address[0]?.assign_verification[0]
                        ?.payable_reason}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>
                  PV Non-Payable
                  <br /> Reason
                </Item>
                <Item className="value">
                  {pv?.verification_address[0]?.assign_verification[0]?.payable
                    ? ""
                    : pv?.verification_address[0]?.assign_verification[0]
                        ?.payable_reason}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>
                  PD Non-Payable
                  <br /> Reason
                </Item>
                <Item className="value">
                  {pd?.verification_address[0]?.assign_verification[0]?.payable
                    ? ""
                    : pd?.verification_address[0]?.assign_verification[0]
                        ?.payable_reason}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>Billing Location RV</Item>
                <Item className="value">
                  {rv?.verification_address[0]?.selected_billing_location?.name}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>Billing Location BV</Item>
                <Item className="value">
                  {bv?.verification_address[0]?.selected_billing_location?.name}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>Billing Location PV</Item>
                <Item className="value">
                  {pv?.verification_address[0]?.selected_billing_location?.name}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>Billing Location PD</Item>
                <Item className="value">
                  {pd?.verification_address[0]?.selected_billing_location?.name}
                </Item>
              </TypographyItem>

              <TypographyItem className="item">
                <Item>RV Tele Verification</Item>
                <Item className="value">
                  {rv
                    ? rv?.verification_address[0]?.assign_verification[0]
                        ?.tele_verification
                      ? "Yes"
                      : "No"
                    : ""}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>BV Tele Verification</Item>
                <Item className="value">
                  {bv
                    ? bv?.verification_address[0]?.assign_verification[0]
                        ?.tele_verification
                      ? "Yes"
                      : "No"
                    : ""}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>PV Tele Verification</Item>
                <Item className="value">
                  {pv
                    ? pv?.verification_address[0]?.assign_verification[0]
                        ?.tele_verification
                      ? "Yes"
                      : "No"
                    : ""}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>PD Tele Verification</Item>
                <Item className="value">
                  {pd
                    ? pd?.verification_address[0]?.assign_verification[0]
                        ?.tele_verification
                      ? "Yes"
                      : "No"
                    : ""}
                </Item>
              </TypographyItem>

              <TypographyItem className="item">
                <Item>RV Tele Done By</Item>
                <Item className="value">
                  {
                    rv?.verification_address[0]?.assign_verification[0]
                      ?.employees_names?.tele_by_name
                  }
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>BV Tele Done By</Item>
                <Item className="value">
                  {
                    bv?.verification_address[0]?.assign_verification[0]
                      ?.employees_names?.tele_by_name
                  }
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>PV Tele Done By</Item>
                <Item className="value">
                  {
                    pv?.verification_address[0]?.assign_verification[0]
                      ?.employees_names?.tele_by_name
                  }
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>PD Tele Done By</Item>
                <Item className="value">
                  {
                    pd?.verification_address[0]?.assign_verification[0]
                      ?.employees_names?.tele_by_name
                  }
                </Item>
              </TypographyItem>

              <TypographyItem className="item">
                <Item>RV Report Status</Item>
                <Item className="value">
                  {rv?.verification_address[0]?.status}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>BV Report Status</Item>
                <Item className="value">
                  {bv?.verification_address[0]?.status}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>PV Report Status</Item>
                <Item className="value">
                  {pv?.verification_address[0]?.status}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>PD Report Status</Item>
                <Item className="value">
                  {pd?.verification_address[0]?.status}
                </Item>
              </TypographyItem>

              <TypographyItem className="item">
                <Item>RV Negative Reason</Item>
                <Item className="value">
                  {rv?.verification_address[0]?.negative_reason?.comment}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>BV Negative Reason</Item>
                <Item className="value">
                  {bv?.verification_address[0]?.negative_reason?.comment}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>PV Negative Reason</Item>
                <Item className="value">
                  {pv?.verification_address[0]?.negative_reason?.comment}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>PD Negative Reason</Item>
                <Item className="value">
                  {pd?.verification_address[0]?.negative_reason?.comment}
                </Item>
              </TypographyItem>

              <TypographyItem className="item">
                <Item>RV Remark</Item>
                <Item className="value">
                  {rv?.verification_address[0]?.assign_verification[0]?.remarks}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>BV Remark</Item>
                <Item className="value">
                  {bv?.verification_address[0]?.assign_verification[0]?.remarks}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>PV Remark</Item>
                <Item className="value">
                  {pv?.verification_address[0]?.assign_verification[0]?.remarks}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>PD Remark</Item>
                <Item className="value">
                  {pd?.verification_address[0]?.assign_verification[0]?.remarks}
                </Item>
              </TypographyItem>

              <TypographyItem className="item">
                <Item>RV Submitted By</Item>
                <Item className="value">
                  {rv?.verification_address[0]?.submitted_by_name}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>BV Submitted By</Item>
                <Item className="value">
                  {bv?.verification_address[0]?.submitted_by_name}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>PV Submitted By</Item>
                <Item className="value">
                  {pv?.verification_address[0]?.submitted_by_name}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>PD Submitted By</Item>
                <Item className="value">
                  {pd?.verification_address[0]?.submitted_by_name}
                </Item>
              </TypographyItem>

              <TypographyItem className="item">
                <Item>RV Img Received</Item>
                <Item className="value">
                  {rv?.verification_address[0]?.img_recieved_through}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>BV Img Received</Item>
                <Item className="value">
                  {bv?.verification_address[0]?.img_recieved_through}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>PV Img Received</Item>
                <Item className="value">
                  {pv?.verification_address[0]?.img_recieved_through}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>PD Img Received</Item>
                <Item className="value">
                  {pd?.verification_address[0]?.img_recieved_through}
                </Item>
              </TypographyItem>

              <TypographyItem className="item">
                <Item>RV District</Item>
                <Item className="value">{rv?.adress_district?.name}</Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>BV District</Item>
                <Item className="value">{bv?.adress_district?.name}</Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>PV District</Item>
                <Item className="value">{pv?.adress_district?.name}</Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>PD District</Item>
                <Item className="value">{pd?.adress_district?.name}</Item>
              </TypographyItem>

              <TypographyItem className="item">
                <Item>RV Verification Delay</Item>
                <Item className="value">{rv?.allocation_delay}</Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>BV Verification Delay</Item>
                <Item className="value">{bv?.allocation_delay}</Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>PV Verification Delay</Item>
                <Item className="value">{pv?.allocation_delay}</Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>PD Verification Delay</Item>
                <Item className="value">{pd?.allocation_delay}</Item>
              </TypographyItem>

              <TypographyItem className="item">
                <Item>
                  Assigned Verification
                  <br /> Delay RV
                </Item>
                <Item className="value">
                  {rv?.verification_address[0]?.assigned_delay}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>
                  Assigned Verification
                  <br /> Delay BV
                </Item>
                <Item className="value">
                  {bv?.verification_address[0]?.assigned_delay}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>
                  Assigned Verification
                  <br /> Delay PV
                </Item>
                <Item className="value">
                  {pv?.verification_address[0]?.assigned_delay}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>
                  Assigned Verification
                  <br /> Delay PD
                </Item>
                <Item className="value">
                  {pd?.verification_address[0]?.assigned_delay}
                </Item>
              </TypographyItem>

              <TypographyItem className="item">
                <Item>RV Report Received</Item>
                <Item className="value">
                  {rv?.verification_address[0]?.ver_recieved
                    ? timeDate(rv?.verification_address[0]?.ver_recieved)
                    : ""}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>BV Report Received</Item>
                <Item className="value">
                  {bv?.verification_address[0]?.ver_recieved
                    ? timeDate(bv?.verification_address[0]?.ver_recieved)
                    : ""}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>PV Report Received</Item>
                <Item className="value">
                  {pv?.verification_address[0]?.ver_recieved
                    ? timeDate(pv?.verification_address[0]?.ver_recieved)
                    : ""}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>PD Report Received</Item>
                <Item className="value">
                  {pd?.verification_address[0]?.ver_recieved
                    ? timeDate(pd?.verification_address[0]?.ver_recieved)
                    : ""}
                </Item>
              </TypographyItem>

              <TypographyItem className="item">
                <Item>RV Report Submitted Date</Item>
                <Item className="value">
                  {rv?.verification_address[0]?.submitted_at
                    ? extract_date(rv?.verification_address[0]?.submitted_at)
                    : ""}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>RV Report Submitted Time</Item>
                <Item className="value">
                  {rv?.verification_address[0]?.submitted_at
                    ? get_time_from_date(
                        rv?.verification_address[0]?.submitted_at
                      )
                    : ""}
                </Item>
              </TypographyItem>

              <TypographyItem className="item">
                <Item>BV Report Submitted Date</Item>
                <Item className="value">
                  {bv?.verification_address[0]?.submitted_at
                    ? extract_date(bv?.verification_address[0]?.submitted_at)
                    : ""}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>BV Report Submitted Time</Item>
                <Item className="value">
                  {bv?.verification_address[0]?.submitted_at
                    ? get_time_from_date(
                        bv?.verification_address[0]?.submitted_at
                      )
                    : ""}
                </Item>
              </TypographyItem>

              <TypographyItem className="item">
                <Item>PV Report Submitted Date</Item>
                <Item className="value">
                  {pv?.verification_address[0]?.submitted_at
                    ? extract_date(pv?.verification_address[0]?.submitted_at)
                    : ""}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>PV Report Submitted Time</Item>
                <Item className="value">
                  {pv?.verification_address[0]?.submitted_at
                    ? get_time_from_date(
                        pv?.verification_address[0]?.submitted_at
                      )
                    : ""}
                </Item>
              </TypographyItem>

              <TypographyItem className="item">
                <Item>PD Report Submitted Date</Item>
                <Item className="value">
                  {pd?.verification_address[0]?.submitted_at
                    ? extract_date(pd?.verification_address[0]?.submitted_at)
                    : ""}
                </Item>
              </TypographyItem>
              <TypographyItem className="item">
                <Item>PD Report Submitted Time</Item>
                <Item className="value">
                  {pd?.verification_address[0]?.submitted_at
                    ? get_time_from_date(
                        pd?.verification_address[0]?.submitted_at
                      )
                    : ""}
                </Item>
              </TypographyItem>
            </AccordionDetailsItem>
          </AccordionMain>
        );
      })}
      <TablePaginationDemo
        count={props.data.total_pages}
        setPage={props.setPage}
        page={props.page}
        rowsperpage={props.rowsperpage}
        setRowsPerPage={props.setRowsPerPage}
        showItemsPage={false}
        class="full-width"
      />
      <ExcelContainer>
        <PageDetails>
          {getPageDetails(props.data.count, props.page, props.rowsperpage)}
        </PageDetails>
        <Box sx={{ minWidth: 160 }}>
          <FormControl fullWidth>
            <SelectInput
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={props.rowsperpage}
              onChange={handleRowsPerPageChange}
            >
              <MenuItem value={30}>30/Page</MenuItem>
              <MenuItem value={60}>60/Page</MenuItem>
              <MenuItem value={100}>100/Page</MenuItem>
            </SelectInput>
          </FormControl>
        </Box>
      </ExcelContainer>
    </>
  );
}

export default ReportConfirmTableAccordion;

const ExcelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;

const ItemValue = styled.div``;
const ItemIcon = styled.div``;

const HeadContainer = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Item = styled.span`
  font-size: 14px;
  color: #727b84;
  &.value {
    color: #272728;
  }
`;
const AccordionMain = styled(Accordion)`
  box-shadow: 0px 2px 10px 0px #00000033 !important;
  padding: 5px !important;
  border-radius: 12px !important;
  margin-bottom: 10px;
  /* &.MuiAccordionDetails-root {
        padding: 0px !important;
    } */

  & .MuiCollapse-root.MuiCollapse-vertical {
    min-height: 100px !important;
    overflow: hidden !important;
  }
  & .MuiCollapse-wrapper.MuiCollapse-vertical {
    visibility: visible !important;
  }
`;

const TypographyItem = styled(Typography)`
  font-size: 12px !important;
  font-weight: 600 !important;
  color: #444445 !important;
  &.item {
    /* margin-bottom: 20px; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0px;
    border-bottom: 0.5px solid #9999994a;
  }
`;

const AccordionSummaryItem = styled(AccordionSummary)`
  padding: 0px !important;
`;
const AccordionDetailsItem = styled(AccordionDetails)`
  padding: 0px !important;
  max-height: 70vh;
  overflow-y: scroll;
`;

const CheckboxItem = styled(Checkbox)`
  &.MuiButtonBase-root.MuiCheckbox-root {
    padding: 0px !important;
  }
`;
