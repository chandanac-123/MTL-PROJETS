import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "styled-components";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TablePaginationDemo, { SelectInput } from "../../TablePaginationDemo";
import {
  extract_date,
  getPageDetails,
  get_time_from_date,
} from "../../../Functions/utils";
import { PageDetails } from "../../VerificationTable";
import { LinkItem } from "./AssignTATDistrict";
import Modal from "@mui/material/Modal";
import TATDetails from "../../../Screens/Reports/TATDetails";
import { ExportExcel } from "../../ExportExcel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "98%",
  bgcolor: "background.paper",
  //   border: '2px solid #000',
  boxShadow: 24,
  //   p: 2,
  borderRadius: "12px",
};

function TATReportVisitTableAccordion(props) {
  const handleRowsPerPageChange = (event) => {
    const value = parseInt(event.target.value, 10);
    props.setRowsPerPage(value);
    props.setPage(1); // Reset the current page to 1 when the rows per page is changed
  };

  return (
    <>
      {props?.data?.results?.map((row, index) => (
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
              <Item>Sl.No</Item>
              <Item className="value">
                {(props.page - 1) * props.rowsperpage + index + 1}
              </Item>
            </TypographyItem>
            <TypographyItem className="item">
              <Item>Vendor</Item>
              <Item className="value">
                {row?.verification_address?.verification?.vendor?.employee_name}
              </Item>
            </TypographyItem>
            <TypographyItem className="item">
              <Item>Product</Item>
              <Item className="value">
                {row?.verification_address?.verification?.product?.product_name}
              </Item>
            </TypographyItem>
            <TypographyItem className="item">
              <Item>District</Item>
              <Item className="value">
                {row?.verification_address?.adress_district?.name}
              </Item>
            </TypographyItem>
            <TypographyItem className="item">
              <Item>Application ID</Item>
              <Item className="value">
                {row?.verification_address?.verification?.application_id}
              </Item>
            </TypographyItem>

            <TypographyItem className="item">
              <Item>Customer Name</Item>
              <Item className="value">
                {row?.verification_address?.verification?.customer_name}
              </Item>
            </TypographyItem>
            <TypographyItem className="item">
              <Item>Visit Type</Item>
              <Item className="value">
                {row?.verification_address?.fi_type}
              </Item>
            </TypographyItem>
            <TypographyItem className="item">
              <Item>Address</Item>
              <Item className="value">{row?.verification_address?.adress}</Item>
            </TypographyItem>
            <TypographyItem className="item">
              <Item>FI date</Item>
              <Item className="value">
                {extract_date(row?.verification_address?.fi_date_time)}
              </Item>
            </TypographyItem>
            <TypographyItem className="item">
              <Item>FI Time</Item>
              <Item className="value">
                {get_time_from_date(row?.verification_address?.fi_date_time)}
              </Item>
            </TypographyItem>
            <TypographyItem className="item">
              <Item>Submitted Date</Item>
              <Item className="value">{extract_date(row?.submitted_at)}</Item>
            </TypographyItem>
            <TypographyItem className="item">
              <Item>Submitted Time</Item>
              <Item className="value">
                {get_time_from_date(row?.submitted_at)}
              </Item>
            </TypographyItem>
            <TypographyItem className="item">
              <Item>Agent Name</Item>
              <Item className="value">
                {
                  row?.assigned_verification_users[0]?.field_agent
                    ?.employee_name
                }
              </Item>
            </TypographyItem>
            <TypographyItem className="item">
              <Item>Allocated By</Item>
              <Item className="value">
                {row?.assign_verification[0]?.completed_by?.employee_name}
              </Item>
            </TypographyItem>
            <TypographyItem className="item">
              <Item>Assigned By</Item>
              <Item className="value">
                {
                  row?.assigned_verification_users[0]?.assigned_by
                    ?.employee_name
                }
              </Item>
            </TypographyItem>
            <TypographyItem className="item">
              <Item>Written By</Item>
              <Item className="value">
                {row?.assign_verification[0]?.written_by?.employee_name}
              </Item>
            </TypographyItem>
            <TypographyItem className="item">
              <Item>Reported By</Item>
              <Item className="value">
                {row?.assign_verification[0]?.reported_by?.employee_name}
              </Item>
            </TypographyItem>
            <TypographyItem className="item">
              <Item>Coordinated By</Item>
              <Item className="value">
                {row?.assign_verification[0]?.coordinated_by?.employee_name}
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

export default TATReportVisitTableAccordion;

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
