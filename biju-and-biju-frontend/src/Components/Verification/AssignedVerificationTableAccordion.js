import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Checkbox } from "@mui/material";
import Modal from "@mui/material/Modal";
import DeleteConfirm from "../Common/DeleteConfirm";
import {
  extract_date,
  getPageDetails,
  GetPermission,
  get_time_from_date,
  timeDate24Hours,
} from "../../Functions/utils";
import VerificationTableModal from "./VerificationTableModal";
import TablePaginationDemo, { SelectInput } from "../TablePaginationDemo";
import DownloadButton from "../DownloadButton";
import { PageDetails } from "../VerificationTable";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ReasignModal from "./ReasignModal";
import AssignModal from "./AssignModal";
import ManualEntryModal from "./ManualEntryModal";
import { StatusDiv } from "../Common/AssignedVerificationTable";
import NotificationModal from "./NotificationModal";

function AssignedVerificationTableAccordion(props) {
  const user_type = useSelector((state) => state.auth.user_type);
  const permission = GetPermission("verification", "change");

  const handleRowsPerPageChange = (event) => {
    const value = parseInt(event.target.value, 10);
    props.setRowsPerPage(value);
    props.setPage(1); // Reset the current page to 1 when the rows per page is changed
  };

  return (
    <>
      {/* <HeadContainer>
        
      </HeadContainer> */}
      {props?.data?.results?.map((row) => (
        <AccordionMain>
          <AccordionSummaryItem
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <TypographyItem></TypographyItem>
          </AccordionSummaryItem>
          <AccordionDetailsItem>
            <TypographyItem className="item">
              <Item>Customer ID</Item>
              <Item className="value">
                {row.verification_address.verification.application_id}
              </Item>
            </TypographyItem>
            <TypographyItem className="item">
              <Item>
                Customer <br /> Name/Type
              </Item>
              <Item className="value">
                {row.verification_address.verification.customer_name}
                <p className="no-margin">
                  {row.verification_address.verification.applicant_type}
                </p>
              </Item>
            </TypographyItem>
            <TypographyItem className="item">
              <Item>
                Vendor/ <br /> Product
              </Item>
              <Item className="value">
                {
                  row.verification_address.verification.product
                    .vendor_short_code
                }
                /{row.verification_address.verification.product.product_code}
              </Item>
            </TypographyItem>
            <TypographyItem className="item">
              <Item>FI Type</Item>
              <Item className="value">{row.verification_address.fi_type}</Item>
            </TypographyItem>
            <TypographyItem className="item">
              <Item>
                FI Date <br /> FI Time
              </Item>
              <Item className="value">
                <span>
                  {extract_date(row.verification_address.fi_date_time)}
                  <p className="no-margin">
                    {get_time_from_date(row.verification_address.fi_date_time)}
                  </p>
                </span>
              </Item>
            </TypographyItem>
            <TypographyItem className="item">
              <Item>
                <p className="w-100">
                  TAT Date <br />& Time
                </p>
              </Item>

              {row.ver_tat_status == "out" ? (
                <Item className="value" style={{ color: "#DA1E27" }}>
                  <span className="small">{timeDate24Hours(row.verTat)}</span>
                </Item>
              ) : row.ver_tat_status == "warning" ? (
                <Item className="value" style={{ color: "#FEBF00" }}>
                  <span className="small">{timeDate24Hours(row.verTat)}</span>
                </Item>
              ) : row.ver_tat_status == "running" ? (
                <Item className="value" style={{ color: "#77C673" }}>
                  <span className="small">{timeDate24Hours(row.verTat)}</span>
                </Item>
              ) : (
                ""
              )}
            </TypographyItem>
            <TypographyItem className="item">
              <Item>
                <p>District</p>
              </Item>
              <Item className="value">
                {row.verification_address.adress_district_name}
              </Item>
            </TypographyItem>
            <TypographyItem className="item">
              <Item>
                <p>
                  Verification <br />
                  Agent
                </p>
              </Item>
              <Item className="value">
                <span className="name">
                  {
                    row.assigned_verification_users.filter(
                      (item) => item.status
                    )[0]?.fieldagent_name
                  }
                </span>
                <p className="no-margin">
                  {
                    row.assigned_verification_users.filter(
                      (item) => item.status
                    )[0]?.phonenumber
                  }
                </p>
              </Item>
            </TypographyItem>
            {permission && (
              <TypographyItem className="item">
                <Item>
                  <p>Reassign</p>
                </Item>
                <Item className="value">
                  <ReasignModal row={row} setState={props.setState} />
                </Item>
              </TypographyItem>
            )}
            {permission && (
              <TypographyItem className="item">
                <Item>
                  <p>
                    Team <br />
                    Member
                  </p>
                </Item>
                <Item className="value">
                  <AssignModal row={row} setState={props.setState} />
                </Item>
              </TypographyItem>
            )}
            <TypographyItem className="item">
              <Item>
                <p>
                  Reassign <br />
                  Delay
                </p>
              </Item>
              <Item className="value">
                {row.reassigned_delay ? row.reassigned_delay : "0"}
              </Item>
            </TypographyItem>
            <TypographyItem className="item">
              <Item>
                <p>
                  Assign <br />
                  Delay
                </p>
              </Item>
              <Item className="value">
                {row.assigned_delay ? row.assigned_delay : "0"}
              </Item>
            </TypographyItem>
            {permission && (
              <TypographyItem className="item">
                <Item>
                  <p>Status</p>
                </Item>
                <Item className="value">
                  <ManualEntryModal row={row} setState={props.setState} />
                  <StatusDiv>
                    <span>
                      {row?.assigned_verification_users?.filter(
                        (i) => i.status == true
                      )[0]?.fieldagent_viewed != null ? (
                        <div style={{ whiteSpace: "nowrap" }}>Agent Viewed</div>
                      ) : (
                        <div style={{ color: "red" }}>Pending</div>
                      )}
                    </span>
                    <span>
                      {row?.assigned_verification_users?.filter(
                        (i) => i.status == true
                      )[0]?.fieldagent_viewed != null
                        ? timeDate24Hours(
                            row?.assigned_verification_users?.filter(
                              (i) => i.status == true
                            )[0]?.fieldagent_viewed
                          )
                        : ""}
                    </span>
                  </StatusDiv>
                </Item>
              </TypographyItem>
            )}
            {permission && (
              <TypographyItem className="item">
                <Item>
                  <p>Notification</p>
                </Item>
                <Item className="value">
                  <NotificationModal
                    reportReceived={false}
                    data={row}
                    setState={props.setState}
                    count={row?.verification_address?.address_remarks?.length}
                    bcolor={
                      row?.verification_address?.address_remarks?.length == 0
                        ? "#1289E4"
                        : row?.verification_address?.address_remarks?.filter(
                            (item) => item.read == true
                          )?.length ==
                          row?.verification_address?.address_remarks?.length
                        ? "#FEBF00"
                        : "#DA1E27"
                    }
                  />
                </Item>
              </TypographyItem>
            )}
          </AccordionDetailsItem>
        </AccordionMain>
      ))}
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

export default AssignedVerificationTableAccordion;

const ExcelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;
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
