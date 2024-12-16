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
} from "../../Functions/utils";
import VerificationTableModal from "./VerificationTableModal";
import TablePaginationDemo, { SelectInput } from "../TablePaginationDemo";
import DownloadButton from "../DownloadButton";
import { PageDetails } from "../VerificationTable";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function VerificationTableAccordion(props) {
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
          <DeleteConfirm
            handleClickOpen={props?.handleClickOpen}
            open={props?.open}
            handleClose={props?.handleClose}
            handleConfirm={props?.handleConfirm}
          />
        ) : null}
      </HeadContainer>
      {props?.data?.results?.map((row) => (
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
              <Item>Customer ID</Item>
              <Item className="value">{row.verification.application_id}</Item>
            </TypographyItem>
            <TypographyItem className="item">
              <Item>
                Customer <br /> Name/Type
              </Item>
              <Item className="value">
                {row.verification.customer_name}
                <p className="no-margin">{row.verification.applicant_type}</p>
              </Item>
            </TypographyItem>
            <TypographyItem className="item">
              <Item>
                Vendor/ <br /> Product
              </Item>
              <Item className="value">
                {row.verification?.product?.vendor_short_code} /{" "}
                {row.verification?.product?.product_code}
              </Item>
            </TypographyItem>
            <TypographyItem className="item">
              <Item>FI Type</Item>
              <Item className="value">{row.fi_type}</Item>
            </TypographyItem>
            <TypographyItem className="item">
              <Item>Address</Item>
              <Item className="value">{row.adress}</Item>
            </TypographyItem>
            <TypographyItem className="item">
              <Item>
                FI Date <br /> FI Time
              </Item>
              <Item className="value">
                <span>
                  {extract_date(row.fi_date_time)} <br /> {row.FI_time}
                  <p className="no-margin">
                    {get_time_from_date(row.fi_date_time)} <br />
                    {row.FI_time}
                  </p>
                </span>
              </Item>
            </TypographyItem>
            <TypographyItem className="item">
              <Item>
                Allocation <br /> Delay
              </Item>
              <Item className="value">{row.allocation_delay}</Item>
            </TypographyItem>
            <TypographyItem className="item">
              <Item>District</Item>
              <Item className="value">
                {row.adress_district_name == null
                  ? "Not Assigned"
                  : row.adress_district_name}
              </Item>
            </TypographyItem>
            <TypographyItem className="item">
              <Item className="full-width">
                {permission && row.assigned_status ? (
                  ""
                ) : (
                  <VerificationTableModal
                    data={row}
                    setState={props.setState}
                    snackbarStatus={props.snackbarStatus}
                    setSnackbarStatus={props.setSnackbarStatus}
                  />
                )}
              </Item>
            </TypographyItem>
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

export default VerificationTableAccordion;

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
    text-align: right;
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
