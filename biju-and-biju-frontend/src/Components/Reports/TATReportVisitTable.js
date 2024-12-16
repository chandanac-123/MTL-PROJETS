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
import {
  exportToExcel,
  extract_date,
  get_time_from_date,
} from "../../Functions/utils";
import { fetchExcelTATReportVisit } from "../../Functions/helper";
import { useSelector } from "react-redux";
import { selectIsCollapse } from "../../Slices/commonSlice";
import { useMediaQuery } from "react-responsive";
import TATReportVisitTableAccordion from "./TATReportTables/TATReportVisitTableAccordion";
import { ExportExcel } from "../ExportExcel";

export default function TATReportVisitTable(props) {
  const isCollapse = useSelector(selectIsCollapse);
  const isMobileScreen = useMediaQuery({ query: "(max-width: 480px)" });
  const [data, setData] = React.useState();
  const [sortingtype, setSortingType] = useState("sortingtypeAsc");

  useEffect(() => {
    setData(props?.data?.results);
  }, [props?.data?.results]);

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
    if (name === "vendor")
      result =
        item.verification_address?.verification?.vendor?.employee_name.toUpperCase();
    else if (name === "product")
      result =
        item.verification_address?.verification?.product?.product_name.toUpperCase();
    else if (name === "district")
      result = item.verification_address?.adress_district?.name.toUpperCase();
    else if (name === "app_id")
      result = item.verification_address?.verification?.application_id;
    else if (name === "customer")
      result =
        item.verification_address?.verification?.customer_name.toUpperCase();
    else if (name === "visit_type")
      result = item.verification_address?.fi_type.toUpperCase();
    else if (name === "address")
      result = item.verification_address?.adress?.toUpperCase();
    else if (name === "fidate")
      result = item?.verification_address?.fi_date_time;
    else if (name === "fitime")
      result = get_time_from_date(item?.verification_address?.fi_date_time);
    else if (name === "sub_date") result = item?.submitted_at;
    else if (name === "sub_time")
      result = get_time_from_date(item?.submitted_at);
    else if (name === "agent_name")
      result =
        item.assigned_verification_users[0]?.field_agent?.employee_name?.toUpperCase();
    else if (name === "allocatedby")
      result =
        item.assign_verification[0]?.completed_by?.employee_name?.toUpperCase();
    else if (name === "assignedby")
      result =
        item.assigned_verification_users[0]?.assigned_by?.employee_name?.toUpperCase();
    else if (name === "writternby")
      result =
        item.assign_verification[0]?.written_by?.employee_name?.toUpperCase();
    else if (name === "reportedby")
      result =
        item.assign_verification[0]?.reported_by?.employee_name?.toUpperCase();
    else if (name === "coordinatedby")
      result =
        item.assign_verification[0]?.coordinated_by?.employee_name?.toUpperCase();
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
        <TATReportVisitTableAccordion
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
          <MainContainer component={Paper} iscollapse={isCollapse.toString()}>
            <TableMain aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCellDiv className="head">
                    <THDiv>
                      <p>Sl.No</p>
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv>
                      <p>Vendor</p>{" "}
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
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv>
                      <p>Product</p>{" "}
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
                        className="short-width"
                      >
                        <img
                          src={require("../../Assets/images/sortIcon.png")}
                        />
                      </SortIcon>
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv>
                      <p>District</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "district",
                            "text",
                            "district_asc",
                            "district_desc",
                            ""
                          )
                        }
                        className="short-width"
                      >
                        <img
                          src={require("../../Assets/images/sortIcon.png")}
                        />
                      </SortIcon>
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv className="long-width">
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
                        className="short-width"
                      >
                        <img
                          src={require("../../Assets/images/sortIcon.png")}
                        />
                      </SortIcon>
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv className="long-width">
                      <p>Customer Name</p>{" "}
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
                        className="short-width"
                      >
                        <img
                          src={require("../../Assets/images/sortIcon.png")}
                        />
                      </SortIcon>
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv className="long-width">
                      <p>Visit Type</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "visit_type",
                            "text",
                            "visit_type_asc",
                            "visit_type_desc",
                            ""
                          )
                        }
                        className="short-width"
                      >
                        <img
                          src={require("../../Assets/images/sortIcon.png")}
                        />
                      </SortIcon>
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv className="long-width">
                      <p>Address</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "address",
                            "text",
                            "address_asc",
                            "address_desc",
                            ""
                          )
                        }
                        className="short-width"
                      >
                        <img
                          src={require("../../Assets/images/sortIcon.png")}
                        />
                      </SortIcon>
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv className="long-width">
                      <p>FI date</p>{" "}
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
                        className="short-width"
                      >
                        <img
                          src={require("../../Assets/images/sortIcon.png")}
                        />
                      </SortIcon>
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv className="long-width">
                      <p>FI Time</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "fitime",
                            "text",
                            "fitype_asc",
                            "fitype_desc",
                            ""
                          )
                        }
                        className="short-width"
                      >
                        <img
                          src={require("../../Assets/images/sortIcon.png")}
                        />
                      </SortIcon>
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv className="long-width">
                      <p>Submitted Date</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "sub_date",
                            "date",
                            "sub_date_asc",
                            "sub_date_desc",
                            ""
                          )
                        }
                        className="short-width"
                      >
                        <img
                          src={require("../../Assets/images/sortIcon.png")}
                        />
                      </SortIcon>
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv className="long-width">
                      <p>Submitted Time</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "sub_time",
                            "text",
                            "sub_time_asc",
                            "sub_time_desc",
                            ""
                          )
                        }
                        className="short-width"
                      >
                        <img
                          src={require("../../Assets/images/sortIcon.png")}
                        />
                      </SortIcon>
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv className="long-width">
                      <p>Agent Name</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "agent_name",
                            "text",
                            "agent_name_asc",
                            "agent_name_desc",
                            ""
                          )
                        }
                        className="short-width"
                      >
                        <img
                          src={require("../../Assets/images/sortIcon.png")}
                        />
                      </SortIcon>
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv className="long-width">
                      <p>Allocated By</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "allocatedby",
                            "text",
                            "allocatedby_asc",
                            "allocatedby_desc",
                            ""
                          )
                        }
                        className="short-width"
                      >
                        <img
                          src={require("../../Assets/images/sortIcon.png")}
                        />
                      </SortIcon>
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv className="long-width">
                      <p>Assigned By</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "assignedby",
                            "text",
                            "assignedby_asc",
                            "assignedby_desc",
                            ""
                          )
                        }
                        className="short-width"
                      >
                        <img
                          src={require("../../Assets/images/sortIcon.png")}
                        />
                      </SortIcon>
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv className="long-width">
                      <p>Written By</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "writternby",
                            "text",
                            "writternby_asc",
                            "writternby_desc",
                            ""
                          )
                        }
                        className="short-width"
                      >
                        <img
                          src={require("../../Assets/images/sortIcon.png")}
                        />
                      </SortIcon>
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv className="long-width">
                      <p>Reported By</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "reportedby",
                            "text",
                            "reportedby_asc",
                            "reportedby_desc",
                            ""
                          )
                        }
                        className="short-width"
                      >
                        <img
                          src={require("../../Assets/images/sortIcon.png")}
                        />
                      </SortIcon>
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv className="long-width">
                      <p>Coordinated By</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "coordinatedby",
                            "text",
                            "coordinatedby_asc",
                            "coordinatedby_desc",
                            ""
                          )
                        }
                        className="short-width"
                      >
                        <img
                          src={require("../../Assets/images/sortIcon.png")}
                        />
                      </SortIcon>
                    </THDiv>
                  </TableCellDiv>
                </TableRow>
              </TableHead>
              <TableBody>
                {props?.data?.results.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCellDiv className="item">
                      {" "}
                      <p>{(props.page - 1) * 10 + index + 1}</p>
                    </TableCellDiv>
                    <TableCellDiv className="item">
                      {" "}
                      <p>
                        {
                          row?.verification_address?.verification?.vendor
                            ?.employee_name
                        }
                      </p>
                    </TableCellDiv>
                    <TableCellDiv className="item">
                      {" "}
                      <p>
                        {
                          row?.verification_address?.verification?.product
                            ?.product_name
                        }
                      </p>
                    </TableCellDiv>
                    <TableCellDiv className="item">
                      {" "}
                      <p>{row?.verification_address?.adress_district?.name}</p>
                    </TableCellDiv>
                    <TableCellDiv className="item">
                      {" "}
                      <p>
                        {
                          row?.verification_address?.verification
                            ?.application_id
                        }
                      </p>
                    </TableCellDiv>
                    <TableCellDiv className="item">
                      {" "}
                      <p>
                        {row?.verification_address?.verification?.customer_name}
                      </p>
                    </TableCellDiv>
                    <TableCellDiv className="item">
                      {" "}
                      <p>{row?.verification_address?.fi_type}</p>
                    </TableCellDiv>
                    <TableCellDiv className="item">
                      {" "}
                      <p>{row?.verification_address?.adress}</p>
                    </TableCellDiv>
                    <TableCellDiv className="item">
                      {" "}
                      <p>
                        {extract_date(row?.verification_address?.fi_date_time)}
                      </p>
                    </TableCellDiv>
                    <TableCellDiv className="item">
                      {" "}
                      <p>
                        {get_time_from_date(
                          row?.verification_address?.fi_date_time
                        )}
                      </p>
                    </TableCellDiv>
                    <TableCellDiv className="item">
                      {" "}
                      <p>{extract_date(row?.submitted_at)}</p>
                    </TableCellDiv>
                    <TableCellDiv className="item">
                      {" "}
                      <p>{get_time_from_date(row?.submitted_at)}</p>
                    </TableCellDiv>
                    <TableCellDiv className="item">
                      {" "}
                      <p>
                        {
                          row?.assigned_verification_users[0]?.field_agent
                            ?.employee_name
                        }
                      </p>
                    </TableCellDiv>
                    <TableCellDiv className="item">
                      {" "}
                      <p>
                        {
                          row?.assign_verification[0]?.completed_by
                            ?.employee_name
                        }
                      </p>
                    </TableCellDiv>
                    <TableCellDiv className="item">
                      {" "}
                      <p>
                        {
                          row?.assigned_verification_users[0]?.assigned_by
                            ?.employee_name
                        }
                      </p>
                    </TableCellDiv>
                    <TableCellDiv className="item">
                      {" "}
                      <p>
                        {row?.assign_verification[0]?.written_by?.employee_name}
                      </p>
                    </TableCellDiv>
                    <TableCellDiv className="item">
                      {" "}
                      <p>
                        {
                          row?.assign_verification[0]?.reported_by
                            ?.employee_name
                        }
                      </p>
                    </TableCellDiv>
                    <TableCellDiv className="item">
                      {" "}
                      <p>
                        {
                          row?.assign_verification[0]?.coordinated_by
                            ?.employee_name
                        }
                      </p>
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
          fileName="tat_report_visit.xlsx"
          source="TAT_REPORT_VISIT"
          params={props.searchParams}
        />
        {!isMobileScreen && (
          <TablePaginationDemo
            count={props.data.total_pages}
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
  max-width: ${({ iscollapse }) =>
    iscollapse == "true" ? "1200px !important" : "1360px !important"};
  overflow-x: scroll;
  /* ::-webkit-scrollbar {
      display: none;
    } */
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
    vertical-align: ${({ is_expand }) => (is_expand ? "top" : "center")};
    /* display: ${({ is_expand }) => (is_expand ? "flex" : "unset")}; */
  }

  &.head {
    font-size: 14px;
    font-weight: 700;
    color: #727b84;
    vertical-align: top;
  }
  &.status {
    display: flex;
    align-items: center;
  }
`;

const SortIcon = styled.div`
  cursor: pointer;
  margin-left: 15px;
  width: 50%;
  &.short-width {
    width: 10%;
  }
  &.mb {
    margin-bottom: 20px;
  }
`;
const THDiv = styled.div`
  width: 93px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &.long-width {
    width: 157px;
  }
  &.more-length {
    /* width: 157px; */
    min-width: 300px;
    justify-content: flex-start;
  }
`;
