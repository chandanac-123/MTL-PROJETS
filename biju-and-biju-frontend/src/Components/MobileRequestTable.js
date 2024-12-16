import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styled from "styled-components";
import TablePaginationDemo from "./TablePaginationDemo";
import MobileRequestModal from "./MobileRequestModal";
import { GetPermission } from "../Functions/utils";
import { useMediaQuery } from "react-responsive";
import MobileRequestTableAccordion from "./MobileRequest/MobileRequestTableAccordion";
import { ExportExcel } from "./ExportExcel";

export default function MobileRequestTable(props) {
  const isMobileScreen = useMediaQuery({ query: "(max-width: 480px)" });
  const permission = GetPermission("usermobile", "change");
  const [data, setData] = useState();
  const [sortingtype, setSortingType] = useState("name_ascending");

  useEffect(() => {
    setData(props?.data?.results);
  }, [props?.data?.results]);

  const handleSort = (name) => {
    if (name === "employee_name") {
      data.sort((a, b) => {
        const nameA = a.user.employee_name;
        const nameB = b.user.employee_name;
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
    } else if (name === "version") {
      data.sort((a, b) => {
        const nameA = a.version;
        const nameB = b.version;
        if (sortingtype === "version_decsending") {
          setSortingType("version_ascending");
          if (nameA > nameB) return -1;
          if (nameA < nameB) return 1;
        } else {
          setSortingType("version_decsending");
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
        }
        return 0;
      });
    } else if (name === "mobile_request_status") {
      const status = { Accepted: 1, Rejected: 2, Pending: 3 };
      if (sortingtype === "mobile_request_decsending") {
        setSortingType("mobile_request_ascending");
        data.sort((a, b) => {
          return (
            status[b.mobile_request_status] - status[a.mobile_request_status]
          );
        });
      } else {
        setSortingType("mobile_request_decsending");
        data.sort((a, b) => {
          return (
            status[a.mobile_request_status] - status[b.mobile_request_status]
          );
        });
      }
    }
    setData(data);
  };

  return (
    <>
      {isMobileScreen ? (
        <MobileRequestTableAccordion
          data={props?.data}
          setPage={props.setPage}
          page={props.page}
          rowsperpage={props.rowsperpage}
          setRowsPerPage={props.setRowsPerPage}
          setState={props.setState}
          searchParams={props.searchParams}
        />
      ) : (
        <>
          <MainContainer component={Paper}>
            <TableMain aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCellDiv className="head">
                    <THDiv>
                      <p>Name</p>{" "}
                      <SortIcon onClick={() => handleSort("employee_name")}>
                        <img src={require("../Assets/images/sortIcon.png")} />
                      </SortIcon>
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv>
                      <p>Active Status </p>
                      <SortIcon
                        onClick={() => handleSort("mobile_request_status")}
                      >
                        <img src={require("../Assets/images/sortIcon.png")} />
                      </SortIcon>
                    </THDiv>{" "}
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv>
                      <p>Version Number</p>{" "}
                      <SortIcon onClick={() => handleSort("version")}>
                        <img src={require("../Assets/images/sortIcon.png")} />
                      </SortIcon>
                    </THDiv>
                  </TableCellDiv>
                  {permission && (
                    <TableCellDiv className="head">
                      <THDiv className="last">
                        <p>Action</p>
                        <SortIcon
                          onClick={() => handleSort("mobile_request_status")}
                        >
                          <img src={require("../Assets/images/sortIcon.png")} />
                        </SortIcon>
                      </THDiv>
                    </TableCellDiv>
                  )}
                </TableRow>
              </TableHead>
              {props?.data?.results?.length ? (
                <BodyTable>
                  {data?.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCellDiv className="item" component="th" scope="row">
                        <div>
                          {row.user.employee_name}
                          <div>{row.user.phonenumber}</div>
                        </div>
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {row.mobile_request_status}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {row.version}
                      </TableCellDiv>
                      {permission && (
                        <TableCellDiv className="item">
                          <MobileRequestModal
                            setState={props.setState}
                            action={row.mobile_request_status}
                            data={props.data}
                            row={row}
                          />
                        </TableCellDiv>
                      )}
                    </TableRow>
                  ))}
                </BodyTable>
              ) : (
                <BodyTable className="no-data">
                  <NoDataText>No Data Found</NoDataText>
                </BodyTable>
              )}
            </TableMain>
          </MainContainer>
          <TableFooter>
            <ExportExcel
              fileName="mobile_request.xlsx"
              source="MOBILE_REQUEST"
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
      )}
    </>
  );
}

const BodyTable = styled(TableBody)`
  &.no-data {
    display: flex;
    /* justify-content: center; */
    align-items: center;
    padding: 30px;
  }
`;

const NoDataText = styled.span``;

const TableFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const MainContainer = styled(TableContainer)`
  padding: 10px;
  width: 96.2% !important;
  border-radius: 12px !important;
  box-shadow: 0px 12px 12px rgba(0, 0, 0, 0.05) !important;
`;
const TableMain = styled(Table)`
  width: 98%;
  border-radius: 12px;
`;

const TableCellDiv = styled(TableCell)`
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
  /* &.check {
    display: flex;
    justify-content: space-between;
    align-items: center;
  } */
`;

const Title = styled.p`
  width: 50%;
`;

const SortIcon = styled.div`
  margin-left: 15px;
  width: 50%;
`;
const THDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  &.last {
    width: 55%;
  }
`;
