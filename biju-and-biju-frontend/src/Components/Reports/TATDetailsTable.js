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
import { date_conversion, exportToExcel } from "../../Functions/utils";
import { useMediaQuery } from "react-responsive";
import TATDetailsTableAccordion from "./TATDetailsTableAccordion";
import { ExportExcel } from "../ExportExcel";

export default function TATDetailsTable(props) {
  const [data, setData] = useState();
  const isMobileScreen = useMediaQuery({ query: "(max-width: 480px)" });
  const [sortingtype, setSortingType] = useState("sortingtypeAsc");

  useEffect(() => {
    setData(props?.data);
  }, [props?.data]);

  function getDurationInSeconds(duration) {
    if (duration == "0" || !duration) {
      return 0;
    } else {
      const [hours, minutes, seconds] = duration.split(":");
      return (
        parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds)
      );
    }
  }

  const getItemValue = (item, name, fi_type = "") => {
    let result = "";
    if (name === "app_id")
      result = item.verification_address?.verification?.application_id;
    else if (name === "customer")
      result =
        item.verification_address?.verification?.customer_name.toUpperCase();
    else if (name === "vendor")
      result =
        item.verification_address?.verification?.vendor?.employee_name.toUpperCase();
    else if (name === "product")
      result =
        item.verification_address?.verification?.product?.product_name.toUpperCase();
    else if (name === "fidate")
      result = item?.verification_address?.fi_date_time;
    else if (name === "fitype")
      result = item.verification_address?.fi_type.toUpperCase();
    return result;
  };

  // name,type={text,number..},acending,decending,fitype
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
        if (!name1) name1 = "";
        if (!name2) name2 = "";
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
    } else if (type === "delay") {
      sorted = data.sort((item1, item2) => {
        let delay1 = getDurationInSeconds(getItemValue(item1, name, fi_type));
        let delay2 = getDurationInSeconds(getItemValue(item2, name, fi_type));
        if (!delay1) delay1 = "";
        if (!delay2) delay2 = "";
        if (sortingtype === sortingtypeDesc) {
          setSortingType(sortingtypeAsc);
          return delay1 - delay2;
        } else {
          setSortingType(sortingtypeDesc);
          return delay2 - delay1;
        }
      });
    } else if (type === "time") {
      sorted = data.sort((item1, item2) => {
        let time1 = new Date(getItemValue(item1, name, fi_type)).getTime();
        let time2 = new Date(getItemValue(item2, name, fi_type)).getTime();
        if (!time1) time1 = "";
        if (!time2) time2 = "";
        if (sortingtype === sortingtypeDesc) {
          setSortingType(sortingtypeAsc);
          return time1 - time2;
        } else {
          setSortingType(sortingtypeDesc);
          return time2 - time1;
        }
      });
    } else if (type === "date") {
      sorted = data.sort((item1, item2) => {
        let date1 = new Date(getItemValue(item1, name, fi_type)).setHours(
          0,
          0,
          0,
          0
        );
        let date2 = new Date(getItemValue(item2, name, fi_type)).setHours(
          0,
          0,
          0,
          0
        );
        if (!date1) date1 = "";
        if (!date2) date2 = "";
        if (sortingtype === sortingtypeDesc) {
          setSortingType(sortingtypeAsc);
          return date1 - date2;
        } else {
          setSortingType(sortingtypeDesc);
          return date2 - date1;
        }
      });
    } else if (type === "application_id") {
      sorted = data.sort((item1, item2) => {
        let id1 = parseInt(getItemValue(item1, name, fi_type).split("/").pop());
        let id2 = parseInt(getItemValue(item2, name, fi_type).split("/").pop());
        if (!id1) id1 = 0;
        if (!id2) id2 = 0;
        if (sortingtype === sortingtypeDesc) {
          setSortingType(sortingtypeAsc);
          return id1 - id2;
        } else {
          setSortingType(sortingtypeDesc);
          return id2 - id1;
        }
      });
    } else if (type === "number") {
      sorted = data.sort((a, b) => {
        let distanceA = parseFloat(getItemValue(a, name, fi_type));
        let distanceB = parseFloat(getItemValue(b, name, fi_type));
        if (!distanceA) distanceA = "";
        if (!distanceB) distanceB = "";
        if (sortingtype === "applicant_rv_distance_decsending") {
          setSortingType("applicant_rv_distance_ascending");
          return distanceA - distanceB;
        } else {
          setSortingType("applicant_rv_distance_decsending");
          return distanceB - distanceA;
        }
      });
    }
  };

  return (
    <>
      {isMobileScreen ? (
        <TATDetailsTableAccordion
          data={props?.data}
          setPage={props.setPage}
          page={props.page}
          rowsperpage={props.rowsperpage}
          setRowsPerPage={props.setRowsPerPage}
          setState={props.setState}
          count={props.count}
        />
      ) : (
        <>
          <MainContainer component={Paper} style={{ maxHeight: 400 }}>
            <TableMain aria-label="sticky table" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCellDiv className="head">
                    <THDiv>
                      <p>Sl.No</p>{" "}
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv>
                      <p>Application ID</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "app_id",
                            "application_id",
                            "app_id_asc",
                            "app_id_desc",
                            ""
                          )
                        }
                      >
                        <img
                          src={require("../../Assets/images/sortIcon.png")}
                        />
                      </SortIcon>
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv>
                      <p>Customer </p>
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "customer",
                            "text",
                            "customer_asc",
                            "customer_desc",
                            ""
                          )
                        }
                      >
                        <img
                          src={require("../../Assets/images/sortIcon.png")}
                        />
                      </SortIcon>
                    </THDiv>{" "}
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv>
                      <p>Vendor </p>
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "vendor",
                            "text",
                            "vendor_asc",
                            "vendor_desc",
                            ""
                          )
                        }
                      >
                        <img
                          src={require("../../Assets/images/sortIcon.png")}
                        />
                      </SortIcon>
                    </THDiv>{" "}
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv>
                      <p>Product </p>
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "product",
                            "text",
                            "product_asc",
                            "product_desc",
                            ""
                          )
                        }
                      >
                        <img
                          src={require("../../Assets/images/sortIcon.png")}
                        />
                      </SortIcon>
                    </THDiv>{" "}
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv>
                      <p>FI Date </p>
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "fidate",
                            "date",
                            "fidate_asc",
                            "fidate_desc",
                            ""
                          )
                        }
                      >
                        <img
                          src={require("../../Assets/images/sortIcon.png")}
                        />
                      </SortIcon>
                    </THDiv>{" "}
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv>
                      <p>FI Type </p>
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "fitype",
                            "text",
                            "fitype_asc",
                            "fitype_desc",
                            ""
                          )
                        }
                      >
                        <img
                          src={require("../../Assets/images/sortIcon.png")}
                        />
                      </SortIcon>
                    </THDiv>{" "}
                  </TableCellDiv>
                </TableRow>
              </TableHead>
              <TableBody>
                {props?.data.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCellDiv className="item">
                      {(props.page - 1) * props.rowsperpage + index + 1}
                    </TableCellDiv>
                    <TableCellDiv className="item">
                      {row?.verification_address?.verification?.application_id}
                    </TableCellDiv>
                    <TableCellDiv className="item">
                      {row?.verification_address?.verification?.customer_name}
                    </TableCellDiv>
                    <TableCellDiv className="item">
                      {
                        row?.verification_address?.verification?.vendor
                          ?.employee_name
                      }
                    </TableCellDiv>
                    <TableCellDiv className="item">
                      {
                        row?.verification_address?.verification?.product
                          ?.product_name
                      }
                    </TableCellDiv>
                    <TableCellDiv className="item">
                      {row?.verification_address?.fi_date_time
                        ? date_conversion(
                            row?.verification_address?.fi_date_time
                          )
                        : "N/A"}
                    </TableCellDiv>
                    <TableCellDiv className="item">
                      {row?.verification_address?.fi_type}
                    </TableCellDiv>
                  </TableRow>
                ))}
              </TableBody>
            </TableMain>
          </MainContainer>
        </>
      )}
      <TableFooter>
        <ExportExcel
          fileName={`${props.name}.xlsx`}
          source="DETAIL_TAT_REPORT"
          params={props.searchParams}
        />
        {!isMobileScreen && (
          <TablePaginationDemo
            count={props.count}
            setPage={props.setPage}
            page={props.page}
            rowsperpage={props.rowsperpage}
            setRowsPerPage={props.setRowsPerPage}
          />
        )}
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
  cursor: pointer;
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
