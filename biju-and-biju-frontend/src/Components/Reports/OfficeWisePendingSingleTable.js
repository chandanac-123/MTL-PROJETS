import React, { useState, useEffect } from "react";
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
import { exportToExcel } from "../../Functions/utils";
import { fetchExcelOfficeWisePendingReport } from "../../Functions/helper";
import { ExportExcel } from "../ExportExcel";

export default function OfficeWisePendingSingleTable(props) {
  const navigate = useNavigate();

  const [data, setData] = useState(props.data);
  const [sortingtype, setSortingType] = useState("notification_ascending");

  useEffect(() => {
    setData(props?.data?.results);
  }, [props?.data?.results]);

  const getItemValue = (item, name, fi_type = "") => {
    let result = "";
    if (name === "employee_name") {
      result = item.employee_name.toLowerCase();
    } else if (name === "verification_count") {
      result = item.verification_count;
    }
    return result;
  };

  const handleSorting = (
    name,
    type,
    sortingtypeAsc,
    sortingtypeDesc,
    fi_type
  ) => {
    let sorted = data;
    if (type === "text") {
      sorted = data.sort((item1, item2) => {
        let name1 = getItemValue(item1, name, fi_type);
        let name2 = getItemValue(item2, name, fi_type);
        if (!name1) {
          name1 = "";
        }
        if (!name2) {
          name2 = "";
        }
        if (name1 < name2) {
          if (sortingtype === sortingtypeDesc) {
            setSortingType(sortingtypeAsc);
            return -1;
          } else {
            setSortingType(sortingtypeDesc);
            return 1;
          }
        }
        if (name1 > name2) {
          if (sortingtype === sortingtypeDesc) {
            setSortingType(sortingtypeAsc);
            return 1;
          } else {
            setSortingType(sortingtypeDesc);
            return -1;
          }
        }
        return 0;
      });
    } else if (type === "number") {
      sorted = data.sort((a, b) => {
        let distanceA = parseFloat(getItemValue(a, name, fi_type));
        let distanceB = parseFloat(getItemValue(b, name, fi_type));
        if (!distanceA) {
          distanceA = "";
        }
        if (!distanceB) {
          distanceB = "";
        }
        if (sortingtype === sortingtypeDesc) {
          setSortingType(sortingtypeAsc);
          return distanceA - distanceB;
        } else {
          setSortingType(sortingtypeDesc);
          return distanceB - distanceA;
        }
      });
    }
  };

  const handleNavigate = (row) => {
    navigate(
      `/dashboard/officewise-pending/details/${
        row.verification_ids
      }/${encodeURIComponent(row.employee_name)}`
    );
  };

  return (
    <>
      <MainContainer component={Paper}>
        <TableMain aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCellDiv className="head">
                <THDiv>
                  <p>Name of Office Staff</p>
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "employee_name",
                        "text",
                        "employee_name_ascending",
                        "employee_name_decsending",
                        ""
                      )
                    }
                  >
                    <img
                      src={require("../../Assets/images/sortIcon.png")}
                      alt=""
                    />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>Pending</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "verification_count",
                        "number",
                        "verification_count_ascending",
                        "verification_count_decsending",
                        ""
                      )
                    }
                  >
                    <img
                      src={require("../../Assets/images/sortIcon.png")}
                      alt=""
                    />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p></p>
                </THDiv>
              </TableCellDiv>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data?.results?.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCellDiv className="item">
                  {row.employee_name}
                </TableCellDiv>
                <TableCellDiv className="item">
                  <LinkItem onClick={() => handleNavigate(row)}>
                    {row.verification_count}
                  </LinkItem>
                </TableCellDiv>
                <TableCellDiv className="item"></TableCellDiv>
              </TableRow>
            ))}
          </TableBody>
        </TableMain>
      </MainContainer>
      <TableFooter>
        <ExportExcel
          fileName="office_wise_staff.xlsx"
          source="OFFICE_WISE_STAFF"
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
  min-width: 117px;
  width: 185px;
  &.item {
    font-size: 12px;
    font-weight: 600;
    color: #444445;
    padding: 32px !important;
  }

  &.head {
    font-size: 14px;
    font-weight: 700;
    color: #727b84;
    padding: 16px 16px 16px 30px;
  }
  &.status {
    display: flex;
    align-items: center;
  }
`;

const SortIcon = styled.div`
  margin-left: 15px;
  width: 50%;
  cursor: pointer;
  &.short-width {
    width: 10%;
  }
`;
const THDiv = styled.div`
  width: 138px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &.long-width {
    width: 157px;
  }
`;
const LinkItem = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #3699ff;
  cursor: pointer;
`;
