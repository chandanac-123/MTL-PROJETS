import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "styled-components";
import { useSelector } from "react-redux";
import {
  GetImageUrl,
  getPageDetails,
  GetPermission,
  get_formatted_date_with_year,
} from "../../Functions/utils";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TablePaginationDemo, {
  SelectInput,
} from "../../Components/TablePaginationDemo";
import { PageDetails } from "../../Components/VerificationTable";
import { ExportExcel } from "../../Components/ExportExcel";

function TableComponentAccordion(props) {
  const user_type = useSelector((state) => state.auth.user_type);
  const permission = GetPermission("verification", "change");

  const handleRowsPerPageChange = (event) => {
    const value = parseInt(event.target.value, 10);
    props.setRowsPerPage(value);
    props.setPage(1); // Reset the current page to 1 when the rows per page is changed
  };

  return (
    <>
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
              <Item>Name</Item>
              <Item className="value">{row.fieldagent_name}</Item>
            </TypographyItem>

            <TypographyItem className="item">
              <Item>Date</Item>
              <Item className="value">
                {get_formatted_date_with_year(row.created_at)}
              </Item>
            </TypographyItem>
            <TypographyItem className="item">
              <Item>Initial Reading(KM)</Item>
              <Item className="value">
                {row.initial_km_reading == "null"
                  ? "NA"
                  : row.initial_km_reading}
              </Item>
            </TypographyItem>

            <TypographyItem className="item">
              <Item>Initial Meter Reading Image</Item>
              <Item className="value">
                {row.initial_meter_image ? (
                  <img
                    style={{ width: "100px" }}
                    src={GetImageUrl(row.initial_meter_image)}
                  />
                ) : null}
              </Item>
            </TypographyItem>

            <TypographyItem className="item">
              <Item>End Day Reading(KM)</Item>
              <Item className="value">
                {row.final_km_reading == "null" ? "NA" : row.final_km_reading}
              </Item>
            </TypographyItem>
            <TypographyItem className="item">
              <Item>End Day Meter Reading Image</Item>
              <Item className="value">
                {row.final_meter_image ? (
                  <img
                    style={{ width: "100px" }}
                    src={GetImageUrl(row.final_meter_image)}
                  />
                ) : null}
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
      <ExportExcel
        fileName="meter_reading.xlsx"
        source="METER_READING"
        params={props.searchParams}
      />
    </>
  );
}

export default TableComponentAccordion;

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
