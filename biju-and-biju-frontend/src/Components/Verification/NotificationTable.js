import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styled from "styled-components";
import { timeDate24Hours } from "../../Functions/utils";

export default function NotificationTable(props) {
  return (
    <>
      <MainContainer component={Paper}>
        <TableMain aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCellDiv className="head">
                <THDiv>
                  <p>Sl.NO</p>{" "}
                  {/* <SortIcon>
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon> */}
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>
                    Verification <br /> Agent{" "}
                  </p>
                  {/* <SortIcon>
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon> */}
                </THDiv>{" "}
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>Date & Time</p>{" "}
                  {/* <SortIcon>
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon> */}
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>Remarks</p>{" "}
                  {/* <SortIcon>
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon> */}
                </THDiv>
              </TableCellDiv>
            </TableRow>
          </TableHead>
          <TableBody>
            {props?.datas?.reportReceived
              ? props?.datas?.data?.assign_verification_id?.verification_address?.address_remarks.map(
                  (row, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCellDiv className="item" component="th" scope="row">
                        {index + 1}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {row.sender_name}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {timeDate24Hours(row.created_at)}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {row.message}
                      </TableCellDiv>
                    </TableRow>
                  )
                )
              : props?.datas?.verification_address?.address_remarks.map(
                  (row, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCellDiv className="item" component="th" scope="row">
                        {index + 1}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {row.sender_name}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {timeDate24Hours(row.created_at)}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {row.message}
                      </TableCellDiv>
                    </TableRow>
                  )
                )}
          </TableBody>
        </TableMain>
      </MainContainer>
    </>
  );
}

const MainContainer = styled(TableContainer)`
  padding: 10px;
  width: 98% !important;
  border-radius: 8px !important;
  box-shadow: 0px 12px 12px rgba(0, 0, 0, 0.05) !important;
  border: 0.5px solid #979797;
  &.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.MuiTableContainer-root.NotificationTable__MainContainer-sc-14npjl9-4 {
    overflow: hidden;
  }
  /* max-width: 1180px !important; */
  /* overflow-x: scroll; */
`;
const TableMain = styled(Table)`
  width: 98%;
  border-radius: 12px;
`;

const TableCellDiv = styled(TableCell)`
  /* min-width: 117px;
  width: 185px; */
  &.item {
    font-size: 12px;
    font-weight: 600;
    color: #444445;
  }

  &.head {
    font-size: 14px;
    font-weight: 700;
    color: #727b84;
  }
  &.status {
    display: flex;
    align-items: center;
  }
`;

const THDiv = styled.div`
  /* width: 118px; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* p {
    width: 75px;
  } */
`;
