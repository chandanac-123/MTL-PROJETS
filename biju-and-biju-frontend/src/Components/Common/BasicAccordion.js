import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "styled-components";

export default function BasicAccordion(props) {
  // const [expanded, setExpanded] = React.useState(props.index === 0 ? true : false);

  const handleChange = (panel) => (event, newExpanded) => {
    if (newExpanded) {
      let expandArray = props.expandArray;
      if (expandArray.includes(props.index) === false) {
        expandArray.push(props.index);
      }
      props.setExpanded(expandArray);
    }
    // setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <AccordionMain
        expanded={props.expanded}
        onChange={props.handleChange(!props.expanded, props.index)}
      >
        <AccordionSummaryItem
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <TypographyItem>{props.datas[0]}</TypographyItem>
        </AccordionSummaryItem>
        <AccordionDetailsItem>
          {props.datas?.slice(1).map((i, index) => (
            <TypographyItem className="item" key={index}>
              {i}
            </TypographyItem>
          ))}
        </AccordionDetailsItem>
      </AccordionMain>
    </div>
  );
}

const AccordionMain = styled(Accordion)`
  box-shadow: none !important;
  &.MuiAccordionDetails-root {
    padding: 0px !important;
  }
`;

const TypographyItem = styled(Typography)`
  font-size: 12px !important;
  font-weight: 600 !important;
  color: #444445 !important;
  &.item {
    margin-bottom: 20px;
  }
`;

const AccordionSummaryItem = styled(AccordionSummary)`
  padding: 0px !important;
`;
const AccordionDetailsItem = styled(AccordionDetails)`
  padding: 0px !important;
`;
