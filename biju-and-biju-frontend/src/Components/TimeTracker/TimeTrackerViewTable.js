import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styled from "styled-components";
import TablePaginationDemo from "../TablePaginationDemo";
import DownloadButton from "../DownloadButton";
import { useNavigate } from "react-router-dom";
import {
  exportToExcel,
  findTimeDifference,
  getDate_from_datetime,
  get_formatted_date,
} from "../../Functions/utils";
import { ExportExcel } from "../ExportExcel";

export default function TimeTrackerViewTable(props) {
  const navigate = useNavigate();
  const [data, setData] = React.useState();
  const [sortingtype, setSortingType] = useState("name_ascending");

  const handleClick = () => {
    let data = [];
    let date = get_formatted_date(props.value);
    props.data.results?.map((i) => {
      let obj = {
        date: date,
        login_time: getDate_from_datetime(i.login_time),
        logout_time: getDate_from_datetime(i.logout_time),
        duration: findTimeDifference(
          getDate_from_datetime(i.login_time),
          getDate_from_datetime(i.logout_time)
        ),
        reason: i.reason,
      };
      data.push(obj);
    });
    exportToExcel(data, "time_tracker_view");
  };

  const handleSort = (name) => {
    if (name === "name") {
      data.sort((a, b) => {
        const nameA = a.reason.toUpperCase();
        const nameB = b.reason.toUpperCase();
        if (sortingtype === "name_decsending") {
          setSortingType("name_ascending");
          if (nameA > nameB) {
            return -1;
          }
          if (nameA < nameB) {
            return 1;
          }
        } else {
          setSortingType("name_decsending");
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
        }
        return 0;
      });
    } else if (name === "number") {
      data.sort((a, b) => {
        const nameA = getDate_from_datetime(a.logout_time);
        const nameB = getDate_from_datetime(a.logout_time);
        if (sortingtype === "num_decsending") {
          setSortingType("num_ascending");
          if (nameA > nameB) {
            return -1;
          }
          if (nameA < nameB) {
            return 1;
          }
        } else {
          setSortingType("num_decsending");
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
        }
        return 0;
      });
    }
    setData(data);
  };

  return (
    <>
      <MainContainer component={Paper}>
        <TableMain aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCellDiv className="head">
                <THDiv>
                  <p>Sl.No</p>{" "}
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>Working hour's</p>{" "}
                  <SortIcon onClick={() => handleSort("number")}>
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>Reason </p>
                  <SortIcon onClick={() => handleSort("name")}>
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>{" "}
              </TableCellDiv>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data?.results?.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCellDiv className="item">{index + 1}</TableCellDiv>
                <TableCellDiv className="item">
                  {getDate_from_datetime(row.login_time)} &emsp;-&emsp;{" "}
                  {getDate_from_datetime(row.logout_time)} &emsp;-&emsp;{" "}
                  {findTimeDifference(
                    getDate_from_datetime(row.login_time),
                    getDate_from_datetime(row.logout_time)
                  )}
                </TableCellDiv>
                <TableCellDiv className="item">{row.reason}</TableCellDiv>
              </TableRow>
            ))}
          </TableBody>
        </TableMain>
        {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TimeTrackViewModalForm setOpen={setOpen} is_edit={true} name={openName} />
        </Box>
      </Modal> */}
      </MainContainer>
      <TableFooter>
        <ExportExcel
          fileName="time_tracker_view.xlsx"
          source="TIME_TRACKER_VIEW"
          params={props.searchParams}
        />
        <TablePaginationDemo
          count={props.data.total_pages}
          setPage={props.setPage}
          page={props.page}
          rowsperpage={props.rowsperpage}
          setRowsPerPage={props.setRowsPerPage}
        />
      </TableFooter>
    </>
  );
}

const IconImg = styled.img`
  width: 22%;
  height: 22%;
  /* margin-left: 9px; */
  margin-right: 10px;
`;
const TableFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const MainContainer = styled(TableContainer)`
  padding: 10px;
  width: 98% !important;
  border-radius: 12px !important;
  box-shadow: 0px 12px 12px rgba(0, 0, 0, 0.05) !important;
  max-width: 1180px !important;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const TableMain = styled(Table)`
  width: 98%;
  border-radius: 12px;
`;

const TableCellDiv = styled(TableCell)`
  &.head {
    font-size: 14px;
    font-weight: 700;
    color: #727b84;
  }
  &.item {
    font-size: 12px;
    font-weight: 600;
    color: #444445;
  }
  &.center {
    text-align: center;
  }
  &.last {
    text-align: right;
    cursor: pointer;
  }
  &.action {
    width: 105px;
  }
`;

const SortIcon = styled.div`
  margin-left: 10px;
`;
const THDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  &.center {
    justify-content: center;
  }
  &.last {
    justify-content: flex-end;
  }
`;
