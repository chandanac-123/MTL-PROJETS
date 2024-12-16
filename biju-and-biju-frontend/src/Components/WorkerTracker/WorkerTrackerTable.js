import React, { useEffect, useState } from "react";
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
import { exportToExcel } from "../../Functions/utils";
import { fetchWorkTrackerReport } from "../../Functions/helper";
import { ExportExcel } from "../ExportExcel";

export default function WorkerTrackerTable(props) {
  const [data, setData] = useState();
  const [sortingtype, setSortingType] = useState("name_ascending");

  useEffect(() => {
    setData(props?.data?.results);
  }, [props?.data?.results]);

  const handleClick = () => {
    exportToExcel(fetchWorkTrackerReport(props.data.results), "Work Tracker");
  };

  const handleSort = (name) => {
    if (name === "name") {
      data.sort((a, b) => {
        const nameA = a.employee_name.toUpperCase();
        const nameB = b.employee_name.toUpperCase();
        if (sortingtype === "name_decsending") {
          setSortingType("name_ascending");
          if (nameA > nameB) return -1;
          if (nameA < nameB) return 1;
        } else {
          setSortingType("name_decsending");
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
        }
        return 0;
      });
    } else if (name === "designation") {
      const order = {
        GroupLeader: 1,
        ProductCoordinator: 2,
        TeamMember: 3,
        DistrictCoordinator: 4,
        ExecutiveOfficeAdmin: 5,
      };
      if (sortingtype === "designation_decsending") {
        setSortingType("designation_ascending");
        data.sort((a, b) => {
          return order[b.usertype] - order[a.usertype];
        });
      } else {
        setSortingType("designation_decsending");
        data.sort((a, b) => {
          return order[a.usertype] - order[b.usertype];
        });
      }
    } else if (name === "count") {
      data.sort((a, b) => {
        if (sortingtype === "count_decsending") {
          setSortingType("count_ascending");
          if (a.count > b.count) return -1;
          if (a.count < b.count) return 1;
        } else {
          setSortingType("count_decsending");
          if (a.count < b.count) return -1;
          if (a.count > b.count) return 1;
        }
        return 0;
      });
    }
    setData(data);
    console.log("data: ", data);
  };

  return (
    <>
      <MainContainer component={Paper}>
        <TableMain aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCellDiv className="head">
                <THDiv>
                  <p>Name</p>{" "}
                  <SortIcon onClick={() => handleSort("name")}>
                    <img
                      src={require("../../Assets/images/sortIcon.png")}
                      alt=""
                    />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv className="center">
                  <p>Designation</p>{" "}
                  <SortIcon onClick={() => handleSort("designation")}>
                    <img
                      src={require("../../Assets/images/sortIcon.png")}
                      alt=""
                    />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head last">
                <THDiv className="center">
                  <p>Work Assigned</p>{" "}
                  <SortIcon onClick={() => handleSort("count")}>
                    <img
                      src={require("../../Assets/images/sortIcon.png")}
                      alt=""
                    />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCellDiv className="item">
                  {row?.employee_name}
                </TableCellDiv>
                <TableCellDiv className="item center">
                  {row?.usertype}
                </TableCellDiv>
                <TableCellDiv className="item center">
                  {row?.usertype == "FieldAgent"
                    ? row?.fagentcount
                    : row?.count}
                </TableCellDiv>
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
          fileName="worker_tracker.xlsx"
          source="WORKER_TRACKER"
          params={props.searchParams}
        />
        <TablePaginationDemo
          count={props.data.total_pages}
          page={props.page}
          setPage={props.setPage}
          rowsperpage={props.rowsperpage}
          setRowsPerPage={props.setRowsPerPage}
        />
      </TableFooter>
    </>
  );
}

const TableFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;
const MainContainer = styled(TableContainer)`
  padding: 10px;
  width: 96% !important;
  border-radius: 12px !important;
  box-shadow: 0px 12px 12px rgba(0, 0, 0, 0.05) !important;
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
  cursor: pointer;
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
