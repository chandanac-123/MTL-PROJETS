import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ButtonItem from "../ButtonItem";
import CustomCheckBox from "../Common/CustomCheckBox";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function DatabaseSelectModalForm(props) {
  let result = Object.values(props.state.selected_fields);
  const [state, setState] = useState({ ticked_items: [] });
  const [tickedItems, setTickedItems] = useState(result);
  const [items, setItems] = useState([
    {
      id: "Application ID",
      label: "Application ID",
      input: "Application ID",
      checked: false,
    },
    {
      id: "Application Type",
      label: "Application Type",
      input: "Application Type",
      checked: false,
    },
    {
      id: "Customer Name",
      label: "Customer Name",
      input: "Customer Name",
      checked: false,
    },
    {
      id: "Customer No",
      label: "Customer No",
      input: "Customer No",
      checked: false,
    },
    { id: "Vendor", label: "Vendor", input: "Vendor", checked: false },
    {
      id: "Vendor Code",
      label: "Vendor Code",
      input: "Vendor Code",
      checked: false,
    },
    {
      id: "Product Name",
      label: "Product Name",
      input: "Product Name",
      checked: false,
    },
    {
      id: "Allocated By",
      label: "Allocated By",
      input: "Allocated By",
      checked: false,
    },
    {
      id: "Residence Address",
      label: "Residence Address",
      input: "Residence Address",
      checked: false,
    },
    { id: "FI Date", label: "FI Date", input: "FI Date", checked: false },
    { id: "FI Time", label: "FI Time", input: "FI Time", checked: false },
    {
      id: "RV Verification Agent",
      label: "RV Verification Agent",
      input: "RV Verification Agent",
      checked: false,
    },
    {
      id: "Applicant RV distance",
      label: "Applicant RV distance",
      input: "Applicant RV distance",
      checked: false,
    },
    {
      id: "RV Vendor TAT",
      label: "RV Vendor TAT",
      input: "RV Vendor TAT",
      checked: false,
    },
    // { id: 'RV FI Date', label: 'RV FI Date', input: 'RV FI Date', checked: false },
    {
      id: "RV Coordinated By",
      label: "RV Coordinated By",
      input: "RV Coordinated By",
      checked: false,
    },
    {
      id: "RV Written By",
      label: "RV Written By",
      input: "RV Written By",
      checked: false,
    },
    {
      id: "RV Reported By",
      label: "RV Reported By",
      input: "RV Reported By",
      checked: false,
    },
    {
      id: "RV Billable",
      label: "RV Billable",
      input: "RV Billable",
      checked: false,
    },
    {
      id: "RV Non-Billable Reason",
      label: "RV Non-Billable Reason",
      input: "RV Non-Billable Reason",
      checked: false,
    },
    {
      id: "RV Payable",
      label: "RV Payable",
      input: "RV Payable",
      checked: false,
    },
    {
      id: "RV Non-PayableReason",
      label: "RV Non-PayableReason",
      input: "RV Non-PayableReason",
      checked: false,
    },
    {
      id: "RV Billing Location",
      label: "RV Billing Location",
      input: "RV Billing Location",
      checked: false,
    },
    {
      id: "RV Tele Verification",
      label: "RV Tele Verification",
      input: "RV Tele Verification",
      checked: false,
    },
    {
      id: "RV Tele Done By",
      label: "RV Tele Done By",
      input: "RV Tele Done By",
      checked: false,
    },
    {
      id: "RV Report Status",
      label: "RV Report Status",
      input: "RV Report Status",
      checked: false,
    },
    {
      id: "RV Negative Reason",
      label: "RV Negative Reason",
      input: "RV Negative Reason",
      checked: false,
    },
    {
      id: "RV Remark 1",
      label: "RV Remark 1",
      input: "RV Remark 1",
      checked: false,
    },
    {
      id: "RV Remark 2",
      label: "RV Remark 2",
      input: "RV Remark 2",
      checked: false,
    },
    {
      id: "RV Remark 3",
      label: "RV Remark 3",
      input: "RV Remark 3",
      checked: false,
    },
    {
      id: "RV Submitted By",
      label: "RV Submitted By",
      input: "RV Submitted By",
      checked: false,
    },
    {
      id: "RV Submitted Date",
      label: "RV Submitted Date",
      input: "RV Submitted Date",
      checked: false,
    },
    {
      id: "RV Submitted Time",
      label: "RV Submitted Time",
      input: "RV Submitted Time",
      checked: false,
    },
    {
      id: "RV Img Recieved",
      label: "RV Img Recieved",
      input: "RV Img Recieved",
      checked: false,
    },
    {
      id: "RV District",
      label: "RV District",
      input: "RV District",
      checked: false,
    },
    {
      id: "RV Allocation Delay",
      label: "RV Allocation Delay",
      input: "RV Allocation Delay",
      checked: false,
    },
    {
      id: "RV Assigned Delay",
      label: "RV Assigned Delay",
      input: "RV Assigned Delay",
      checked: false,
    },
    {
      id: "RV Report Recieved Delay",
      label: "RV Report Recieved Delay",
      input: "RV Report Recieved Delay",
      checked: false,
    },
    {
      id: "RV Report Submitted Delay",
      label: "RV Report Submitted Delay",
      input: "RV Report Submitted Delay",
      checked: false,
    },
    {
      id: "Office Address",
      label: "Office Address",
      input: "Office Address",
      checked: false,
    },
    {
      id: "BV Verification Agent",
      label: "BV Verification Agent",
      input: "BV Verification Agent",
      checked: false,
    },
    {
      id: "Applicant BV distance",
      label: "Applicant BV distance",
      input: "Applicant BV distance",
      checked: false,
    },
    {
      id: "BV Vendor TAT",
      label: "BV Vendor TAT",
      input: "BV Vendor TAT",
      checked: false,
    },
    // { id: 'BV FI Date', label: 'BV FI Date', input: 'BV FI Date', checked: false },
    {
      id: "BV Coordinated By",
      label: "BV Coordinated By",
      input: "BV Coordinated By",
      checked: false,
    },
    {
      id: "BV Written By",
      label: "BV Written By",
      input: "BV Written By",
      checked: false,
    },
    {
      id: "BV Reported By",
      label: "BV Reported By",
      input: "BV Reported By",
      checked: false,
    },
    {
      id: "BV Billable",
      label: "BV Billable",
      input: "BV Billable",
      checked: false,
    },
    {
      id: "BV Non-Billable Reason",
      label: "BV Non-Billable Reason",
      input: "BV Non-Billable Reason",
      checked: false,
    },
    {
      id: "BV Payable",
      label: "BV Payable",
      input: "BV Payable",
      checked: false,
    },
    {
      id: "BV Non-PayableReason",
      label: "BV Non-PayableReason",
      input: "BV Non-PayableReason",
      checked: false,
    },
    {
      id: "BV Billing Location",
      label: "BV Billing Location",
      input: "BV Billing Location",
      checked: false,
    },
    {
      id: "BV Tele Verification",
      label: "BV Tele Verification",
      input: "BV Tele Verification",
      checked: false,
    },
    {
      id: "BV Tele Done By",
      label: "BV Tele Done By",
      input: "BV Tele Done By",
      checked: false,
    },
    {
      id: "BV Report Status",
      label: "BV Report Status",
      input: "BV Report Status",
      checked: false,
    },
    {
      id: "BV Negative Reason",
      label: "BV Negative Reason",
      input: "BV Negative Reason",
      checked: false,
    },
    {
      id: "BV Remark 1",
      label: "BV Remark 1",
      input: "BV Remark 1",
      checked: false,
    },
    {
      id: "BV Remark 2",
      label: "BV Remark 2",
      input: "BV Remark 2",
      checked: false,
    },
    {
      id: "BV Remark 3",
      label: "BV Remark 3",
      input: "BV Remark 3",
      checked: false,
    },
    {
      id: "BV Submitted By",
      label: "BV Submitted By",
      input: "BV Submitted By",
      checked: false,
    },
    {
      id: "BV Submitted Date",
      label: "BV Submitted Date",
      input: "BV Submitted Date",
      checked: false,
    },
    {
      id: "BV Submitted Time",
      label: "BV Submitted Time",
      input: "BV Submitted Time",
      checked: false,
    },
    {
      id: "BV Img Recieved",
      label: "BV Img Recieved",
      input: "BV Img Recieved",
      checked: false,
    },
    {
      id: "BV District",
      label: "BV District",
      input: "BV District",
      checked: false,
    },
    {
      id: "BV Allocation Delay",
      label: "BV Allocation Delay",
      input: "BV Allocation Delay",
      checked: false,
    },
    {
      id: "BV Assigned Delay",
      label: "BV Assigned Delay",
      input: "BV Assigned Delay",
      checked: false,
    },
    {
      id: "BV Report Recieved Delay",
      label: "BV Report Recieved Delay",
      input: "BV Report Recieved Delay",
      checked: false,
    },
    {
      id: "BV Report Submitted Delay",
      label: "BV Report Submitted Delay",
      input: "BV Report Submitted Delay",
      checked: false,
    },
    {
      id: "Permanent Address",
      label: "Permanent Address",
      input: "Permanent Address",
      checked: false,
    },
    {
      id: "PV Verification Agent",
      label: "PV Verification Agent",
      input: "PV Verification Agent",
      checked: false,
    },
    {
      id: "Applicant PV distance",
      label: "Applicant PV distance",
      input: "Applicant PV distance",
      checked: false,
    },
    {
      id: "PV Vendor TAT",
      label: "PV Vendor TAT",
      input: "PV Vendor TAT",
      checked: false,
    },
    // { id: 'PV FI Date', label: 'PV FI Date', input: 'PV FI Date', checked: false },
    {
      id: "PV Coordinated By",
      label: "PV Coordinated By",
      input: "PV Coordinated By",
      checked: false,
    },
    {
      id: "PV Written By",
      label: "PV Written By",
      input: "PV Written By",
      checked: false,
    },
    {
      id: "PV Reported By",
      label: "PV Reported By",
      input: "PV Reported By",
      checked: false,
    },
    {
      id: "PV Billable",
      label: "PV Billable",
      input: "PV Billable",
      checked: false,
    },
    {
      id: "PV Non-Billable Reason",
      label: "PV Non-Billable Reason",
      input: "PV Non-Billable Reason",
      checked: false,
    },
    {
      id: "PV Payable",
      label: "PV Payable",
      input: "PV Payable",
      checked: false,
    },
    {
      id: "PV Non-PayableReason",
      label: "PV Non-PayableReason",
      input: "PV Non-PayableReason",
      checked: false,
    },
    {
      id: "PV Billing Location",
      label: "PV Billing Location",
      input: "PV Billing Location",
      checked: false,
    },
    {
      id: "PV Tele Verification",
      label: "PV Tele Verification",
      input: "PV Tele Verification",
      checked: false,
    },
    {
      id: "PV Tele Done By",
      label: "PV Tele Done By",
      input: "PV Tele Done By",
      checked: false,
    },
    {
      id: "PV Report Status",
      label: "PV Report Status",
      input: "PV Report Status",
      checked: false,
    },
    {
      id: "PV Negative Reason",
      label: "PV Negative Reason",
      input: "PV Negative Reason",
      checked: false,
    },
    {
      id: "PV Remark 1",
      label: "PV Remark 1",
      input: "PV Remark 1",
      checked: false,
    },
    {
      id: "PV Remark 2",
      label: "PV Remark 2",
      input: "PV Remark 2",
      checked: false,
    },
    {
      id: "PV Remark 3",
      label: "PV Remark 3",
      input: "PV Remark 3",
      checked: false,
    },
    {
      id: "PV Submitted By",
      label: "PV Submitted By",
      input: "PV Submitted By",
      checked: false,
    },
    {
      id: "PV Submitted Date",
      label: "PV Submitted Date",
      input: "PV Submitted Date",
      checked: false,
    },
    {
      id: "PV Submitted Time",
      label: "PV Submitted Time",
      input: "PV Submitted Time",
      checked: false,
    },
    {
      id: "PV Img Recieved",
      label: "PV Img Recieved",
      input: "PV Img Recieved",
      checked: false,
    },
    {
      id: "PV District",
      label: "PV District",
      input: "PV District",
      checked: false,
    },
    {
      id: "PV Allocation Delay",
      label: "PV Allocation Delay",
      input: "PV Allocation Delay",
      checked: false,
    },
    {
      id: "PV Assigned Delay",
      label: "PV Assigned Delay",
      input: "PV Assigned Delay",
      checked: false,
    },
    {
      id: "PV Report Recieved Delay",
      label: "PV Report Recieved Delay",
      input: "PV Report Recieved Delay",
      checked: false,
    },
    {
      id: "PV Report Submitted Delay",
      label: "PV Report Submitted Delay",
      input: "PV Report Submitted Delay",
      checked: false,
    },
    {
      id: "PD Address",
      label: "PD Address",
      input: "PD Address",
      checked: false,
    },
    {
      id: "PD Verification Agent",
      label: "PD Verification Agent",
      input: "PD Verification Agent",
      checked: false,
    },
    {
      id: "Applicant PD distance",
      label: "Applicant PD distance",
      input: "Applicant PD distance",
      checked: false,
    },
    {
      id: "PD Vendor TAT",
      label: "PD Vendor TAT",
      input: "PD Vendor TAT",
      checked: false,
    },
    // { id: 'PD FI Date', label: 'PD FI Date', input: 'PD FI Date', checked: false },
    {
      id: "PD Coordinated By",
      label: "PD Coordinated By",
      input: "PD Coordinated By",
      checked: false,
    },
    {
      id: "PD Written By",
      label: "PD Written By",
      input: "PD Written By",
      checked: false,
    },
    {
      id: "PD Reported By",
      label: "PD Reported By",
      input: "PD Reported By",
      checked: false,
    },
    {
      id: "PD Billable",
      label: "PD Billable",
      input: "PD Billable",
      checked: false,
    },
    {
      id: "PD Non-Billable Reason",
      label: "PD Non-Billable Reason",
      input: "PD Non-Billable Reason",
      checked: false,
    },
    {
      id: "PD Payable",
      label: "PD Payable",
      input: "PD Payable",
      checked: false,
    },
    {
      id: "PD Non-PayableReason",
      label: "PD Non-PayableReason",
      input: "PD Non-PayableReason",
      checked: false,
    },
    {
      id: "PD Billing Location",
      label: "PD Billing Location",
      input: "PD Billing Location",
      checked: false,
    },
    {
      id: "PD Tele Verification",
      label: "PD Tele Verification",
      input: "PD Tele Verification",
      checked: false,
    },
    {
      id: "PD Tele Done By",
      label: "PD Tele Done By",
      input: "PD Tele Done By",
      checked: false,
    },
    {
      id: "PD Report Status",
      label: "PD Report Status",
      input: "PD Report Status",
      checked: false,
    },
    {
      id: "PD Negative Reason",
      label: "PD Negative Reason",
      input: "PD Negative Reason",
      checked: false,
    },
    {
      id: "PD Remark 1",
      label: "PD Remark 1",
      input: "PD Remark 1",
      checked: false,
    },
    {
      id: "PD Remark 2",
      label: "PD Remark 2",
      input: "PD Remark 2",
      checked: false,
    },
    {
      id: "PD Remark 3",
      label: "PD Remark 3",
      input: "PD Remark 3",
      checked: false,
    },
    {
      id: "PD Submitted By",
      label: "PD Submitted By",
      input: "PD Submitted By",
      checked: false,
    },
    {
      id: "PD Submitted Date",
      label: "PD Submitted Date",
      input: "PD Submitted Date",
      checked: false,
    },
    {
      id: "PD Submitted Time",
      label: "PD Submitted Time",
      input: "PD Submitted Time",
      checked: false,
    },
    {
      id: "PD Img Recieved",
      label: "PD Img Recieved",
      input: "PD Img Recieved",
      checked: false,
    },
    {
      id: "PD District",
      label: "PD District",
      input: "PD District",
      checked: false,
    },
    {
      id: "PD Allocation Delay",
      label: "PD Allocation Delay",
      input: "PD Allocation Delay",
      checked: false,
    },
    {
      id: "PD Assigned Delay",
      label: "PD Assigned Delay",
      input: "PD Assigned Delay",
      checked: false,
    },
    {
      id: "PD Report Recieved Delay",
      label: "PD Report Recieved Delay",
      input: "PD Report Recieved Delay",
      checked: false,
    },
    {
      id: "PD Report Submitted Delay",
      label: "PD Report Submitted Delay",
      input: "PD Report Submitted Delay",
      checked: false,
    },
  ]);

  const handleCheckBox = (value) => {
    let ticked_items = tickedItems;
    let tickitem = [...items];
    if (ticked_items.includes(value)) {
      ticked_items = ticked_items.filter((i) => i !== value);
      tickitem.filter((i) => i.id === value)[0].checked = false;
    } else {
      tickitem.filter((i) => i.id === value)[0].checked = true;
      ticked_items.push(value);
    }
    setItems(tickitem);
    setTickedItems(ticked_items);
  };

  useEffect(() => {
    props.state.selected_fields = Object.assign({}, tickedItems);
    let tickitem = [...items];
    const updatedItems = tickitem.map((item) => ({
      ...item,
      checked: tickedItems.includes(item.id),
    }));
    setItems(updatedItems);
  }, [props.state.selected_fields]);

  const grid = 8;
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  function Quote({ quote, index }) {
    return (
      <Draggable draggableId={quote} index={index}>
        {(provided) => (
          <QuoteItem
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {quote}
          </QuoteItem>
        )}
      </Draggable>
    );
  }

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const quotes = reorder(
      tickedItems,
      result.source.index,
      result.destination.index
    );
    setTickedItems(quotes);
  }

  return (
    <FormContainer>
      <HeadSection>
        <SubHead className="icons">
          {/* <img src={require('../../Assets/images/arrow-circle-leftarrow.png')} /> */}
        </SubHead>
        <SubHead>
          <Title>Select Fields and Download</Title>
        </SubHead>
        <SubHead className="icons" onClick={() => props.setOpen(false)}>
          <img src={require("../../Assets/images/close-square.png")} />
        </SubHead>
      </HeadSection>
      <FormSection>
        <LeftSection>
          {items.map((i) => (
            <ItemRow>
              <CheckBoxSection onClick={() => handleCheckBox(i.id)}>
                <CustomCheckBox ticked={i.checked} />
              </CheckBoxSection>
              <LabelSection onClick={() => handleCheckBox(i.id)}>
                <Label className="secondary">{i.label}</Label>
              </LabelSection>
            </ItemRow>
          ))}
        </LeftSection>
        <RightSection id="draggable-section">
          <DragDropContext
            onDragEnd={onDragEnd}
            root={document.getElementById("draggable-section")}
          >
            <Droppable droppableId="list">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.draggableProps}>
                  {tickedItems.map((i, index) => (
                    <Quote quote={i} index={index} key={i} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </RightSection>
      </FormSection>
      <ButtonSection>
        <ButtonItem
          name="Save"
          type="contained"
          handleClick={() => props.setOpen(false)}
          color="#fff"
          bgColor="#132756"
          fsize="16px"
          fweight="500"
          fpadding="6px 40px"
          bradius="8px"
        />
      </ButtonSection>
    </FormContainer>
  );
}

export default DatabaseSelectModalForm;

const CheckBoxSection = styled.div`
  cursor: pointer;
`;
const ItemRow = styled.div`
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  margin-bottom: 25px;
  &.flex-start {
    align-items: flex-start;
  }
  &.flex-end {
    justify-content: flex-end;
    width: 92%;
  }
`;
const LabelSection = styled.div`
  width: 100%;
  cursor: pointer;
`;
const Label = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #000000;
  &.secondary {
    color: #444445;
    font-size: 13px;
  }
`;
const FormSection = styled.div`
  display: flex;
  /* flex-direction: column; */
  justify-content: space-between;
  padding: 25px;
  height: 400px;
  overflow-y: scroll;
`;
const SubHead = styled.div`
  &.icons {
    cursor: pointer;
  }
`;

const Title = styled.span`
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 12px;
`;
const HeadSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #132756;
  padding: 25px;
  border-radius: 12px 12px 0px 0px;
`;

const ButtonSection = styled.div`
  padding: 40px;
  display: flex;
  justify-content: center;
  gap: 50px;
  align-items: center;
  /* margin-top: 50px; */
  button {
    margin-right: 30px !important;
  }
`;
const LeftSection = styled.div`
  width: 60%;
`;
const RightSection = styled.div``;

const QuoteItem = styled.div`
  width: 300px;
  border: 1px solid grey;
  margin-bottom: 8px;
  background-color: lightblue;
  padding: 8px;
  top: auto !important;
  left: auto !important;
`;
