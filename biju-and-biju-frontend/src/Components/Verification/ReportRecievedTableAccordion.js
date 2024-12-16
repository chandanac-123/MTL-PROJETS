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
import {
  FieldAgentSection,
  StatusDiv,
} from "../Common/AssignedVerificationTable";
import NotificationModal from "./NotificationModal";
import { ItemLabelContainer, NotificationDiv } from "./ReportRecievedTable";
import VerificationReportModal from "./VerificationReportModal";
import ReportMoveModal from "./ReportMoveModal";
import PlayButtonModal from "./PlayButtonModal";

function ReportRecievedTableAccordion(props) {
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
                {
                  row.assign_verification_id.verification_address.verification
                    .application_id
                }
              </Item>
            </TypographyItem>
            <TypographyItem className="item">
              <Item>
                Customer <br /> Name/Type
              </Item>
              <Item className="value">
                {
                  row.assign_verification_id.verification_address.verification
                    .customer_name
                }
                <p>
                  {
                    row.assign_verification_id.verification_address.verification
                      .applicant_type
                  }
                </p>
              </Item>
            </TypographyItem>
            <TypographyItem className="item">
              <Item>
                Vendor/ <br /> Product
              </Item>
              <Item className="value">
                {
                  row.assign_verification_id.verification_address.verification
                    .product.vendor_short_code
                }
                /
                {
                  row.assign_verification_id.verification_address.verification
                    .product.product_code
                }
              </Item>
            </TypographyItem>
            <TypographyItem className="item">
              <Item>FI Type</Item>
              <Item className="value">
                <>
                  {row?.other_ver_status?.map((ver) => (
                    <ItemLabelContainer>
                      <ItemValue>{ver[0]}</ItemValue>
                      <ItemIcon>
                        {(ver[1] === "currently_assigned" ||
                          ver[1] === "reassigned") && (
                          <img
                            width={25}
                            height={25}
                            src={require("../../Assets/images/yellow-cycle.png")}
                            alt="Assigned"
                          />
                        )}

                        {ver[1] === "recieved" && (
                          <img
                            src={require("../../Assets/images/recieved_icon.png")}
                            alt="Recieved"
                          />
                        )}

                        {ver[1] === "submitted" && (
                          <img
                            width={25}
                            height={25}
                            src={require("../../Assets/images/green-card.png")}
                            alt="Submitted"
                          />
                        )}
                      </ItemIcon>
                    </ItemLabelContainer>
                  ))}
                </>
              </Item>
            </TypographyItem>
            <TypographyItem className="item">
              <Item>
                FI Date <br /> FI Time
              </Item>
              <Item className="value">
                {extract_date(
                  row?.assign_verification_id?.verification_address
                    ?.fi_date_time
                )}
                <p className="no-margin">
                  {get_time_from_date(
                    row?.assign_verification_id?.verification_address
                      ?.fi_date_time
                  )}
                </p>
              </Item>
            </TypographyItem>

            <TypographyItem className="item">
              <Item>
                <p className="w-100">
                  TAT Date <br />& Time
                </p>
              </Item>

              {row.assign_verification_id.ver_tat_status === "running" ? (
                <Item className="value" style={{ color: "#77C673" }}>
                  <span>
                    {timeDate24Hours(row.assign_verification_id.verTat)}
                  </span>
                </Item>
              ) : row.assign_verification_id.ver_tat_status === "out" ? (
                <Item className="value" style={{ color: "#FF0303" }}>
                  <span>
                    {timeDate24Hours(row.assign_verification_id.verTat)}
                  </span>
                </Item>
              ) : (
                <Item className="value" style={{ color: "#FFA800" }}>
                  <span>
                    {timeDate24Hours(row.assign_verification_id.verTat)}
                  </span>
                </Item>
              )}
            </TypographyItem>
            <TypographyItem className="item">
              <Item>
                <p>District</p>
              </Item>
              <Item className="value">
                {
                  row.assign_verification_id.verification_address
                    .adress_district_name
                }
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
                <FieldAgentSection>
                  <span className="name">{row.field_agent_name}</span>
                  <span>{row.field_agent_number}</span>
                </FieldAgentSection>
              </Item>
            </TypographyItem>
            <TypographyItem className="item">
              <Item>
                <p>
                  Field <br />
                  Delay
                </p>
              </Item>
              <Item className="value">{row.field_delay}</Item>
            </TypographyItem>
            {permission && (
              <TypographyItem className="item">
                <Item>
                  <p>Status</p>
                </Item>
                <Item className="value text-end">
                  <VerificationReportModal
                    datas={row}
                    setState={props.setState}
                  />
                  <p className="no-margin">
                    {row.assign_verification_id.ver_recieved
                      ? timeDate24Hours(row.assign_verification_id.ver_recieved)
                      : ""}
                  </p>
                </Item>
              </TypographyItem>
            )}
            {permission && (
              <>
                <TypographyItem className="item">
                  <Item>
                    <p>Submit</p>
                  </Item>
                  <Item className="value">
                    <NotificationDiv>
                      {permission && (
                        <NotificationModal
                          reportReceived={true}
                          data={row}
                          setState={props.setState}
                          count={
                            row?.assign_verification_id?.verification_address
                              ?.address_remarks?.length
                          }
                          bcolor={
                            row?.assign_verification_id?.verification_address
                              ?.address_remarks?.length === 0
                              ? "#1289E4"
                              : row?.assign_verification_id?.verification_address?.address_remarks.filter(
                                  (item) => item.read === true
                                )?.length ===
                                row?.assign_verification_id
                                  ?.verification_address?.address_remarks
                                  ?.length
                              ? "#FEBF00"
                              : "#DA1E27"
                          }
                        />
                      )}
                      {permission && row?.assign_verification_id?.voice_clip ? (
                        <PlayButtonModal datas={row} />
                      ) : (
                        <p style={{ visibility: "hidden" }}>___</p>
                      )}
                    </NotificationDiv>
                  </Item>
                </TypographyItem>
                <TypographyItem className="item">
                  <Item className="full-width">
                    {permission && (
                      <ReportMoveModal
                        datas={row}
                        setState={props.setState}
                        snackbarStatus={props.snackbarStatus}
                        setSnackbarStatus={props.setSnackbarStatus}
                      />
                    )}
                  </Item>
                </TypographyItem>
              </>
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

export default ReportRecievedTableAccordion;

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
