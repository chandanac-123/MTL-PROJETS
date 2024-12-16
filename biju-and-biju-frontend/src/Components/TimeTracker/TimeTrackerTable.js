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
import { useNavigate } from "react-router-dom";
import { exportToExcel, GetPermission } from "../../Functions/utils";
import { fetchTimeTrackerReport } from "../../Functions/helper";
import { ExportExcel } from "../ExportExcel";

export default function TimeTrackerTable(props) {
  const permission = GetPermission("time_tracker", "change");
  const navigate = useNavigate();

  const [data, setData] = useState();
  const [sortingtype, setSortingType] = useState("name_ascending");

  useEffect(() => {
    setData(props?.data?.results);
  }, [props?.data?.results]);

  const handleOpen = (row) => {
    navigate(
      `/dashboard/time-tracker-view?name=${row.employee_name}&user_id=${row.user?.id}`
    );
  };

  const handleClick = () => {
    exportToExcel(fetchTimeTrackerReport(props.data.results), "Time Tracker");
  };

  const handleSort = (name) => {
    if (name === "name") {
      data.sort((a, b) => {
        const nameA = a.employee_name.toUpperCase();
        const nameB = b.employee_name.toUpperCase();
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
          return order[b.user.user_type] - order[a.user.user_type];
        });
      } else {
        setSortingType("designation_decsending");
        data.sort((a, b) => {
          return order[a.user.user_type] - order[b.user.user_type];
        });
      }
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
                  <p>Name</p>{" "}
                  <SortIcon onClick={() => handleSort("name")}>
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>Designation</p>{" "}
                  <SortIcon onClick={() => handleSort("designation")}>
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head action">
                <THDiv className="last">
                  <p>View </p>
                </THDiv>{" "}
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
                  {row.employee_name}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row.user?.user_type}
                </TableCellDiv>
                {permission && (
                  <TableCellDiv className="item last">
                    <IconImg
                      src={require("../../Assets/images/view_icon.png")}
                      onClick={() => handleOpen(row)}
                    />
                  </TableCellDiv>
                )}
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
          fileName="time_tracker.xlsx"
          source="TIME_TRACKER"
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
  width: 96% !important;
  border-radius: 12px !important;
  box-shadow: 0px 12px 12px rgba(0, 0, 0, 0.05) !important;
  /* max-width: 1180px !important; */
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
