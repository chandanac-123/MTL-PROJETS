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
import Badge from "@mui/material/Badge";
import { exportToExcel } from "../../Functions/utils";
import { useSelector } from "react-redux";
import { selectIsCollapse } from "../../Slices/commonSlice";
import { fetchMISReport } from "../../Functions/helper";
import { ExportExcel } from "../ExportExcel";

export default function MISReportTable(props) {
  const isCollapse = useSelector(selectIsCollapse);
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

  const handleClick = () => {
    exportToExcel(fetchMISReport(props.data.results), "MIS Report");
  };

  const getItemValue = (item, name, fi_type = "") => {
    let result = "";
    if (name === "vendor_name")
      result = item.verification__vendor__employee_name.toUpperCase();
    else if (name === "cpv/pd") result = item.newfitype.toUpperCase();
    else if (name === "preday_pending")
      result = item.pre_pending + item.unassigned_prev_day;
    else if (name === "case_initiated")
      result = item?.newfitype == "cpv" ? item?.total_cpv : item?.total_pd;
    else if (name === "total_initiated")
      result =
        item?.newfitype == "cpv"
          ? item?.total_cpv + item.pre_pending + item.unassigned_prev_day
          : item?.total_pd + item.pre_pending + item.unassigned_prev_day;
    else if (name === "num_cases_submitted") result = item.recieved_today_FI;
    else if (name === "total_num_submitted") result = item.submitted_today;
    else if (name === "tat_in") result = item.tatIn;
    else if (name === "tat_out") result = item.tatOut;
    else if (name === "tat_percent")
      result =
        item.tatOut + item.tatOut != 0 &&
        ((item.tatIn / (item.tatIn + item.tatOut)) * 100).toFixed(2);
    else if (name === "unassigned") result = item.unassigned;
    else if (name === "assigned_verification") result = item.assignedField;
    else if (name === "report_received") result = item.assignedOffice;
    else if (name === "total_pending")
      result = item.total_pending + item.unassigned_current_day;
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
      <MainContainer component={Paper} iscollapse={isCollapse.toString()}>
        <TableMain aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCellDiv className="head">
                <THDiv>
                  <p>
                    Vendor <br /> Name
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "vendor_name",
                        "text",
                        "vendor_asc",
                        "vendor_desc",
                        ""
                      )
                    }
                    className="mb"
                  >
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>CPV/PD</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "cpv/pd",
                        "text",
                        "cpv/pv_asc",
                        "cpv/pv_desc",
                        ""
                      )
                    }
                  >
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>
                    Previous day <br /> Pending
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "preday_pending",
                        "number",
                        "preday_pending_asc",
                        "preday_pending_desc",
                        ""
                      )
                    }
                    className="short-width mb"
                  >
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv className="long-width">
                  <p>
                    No of Cases Initiated <br />
                    for the Day{" "}
                  </p>
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "case_initiated",
                        "number",
                        "case_initiated_asc",
                        "case_initiated_desc",
                        ""
                      )
                    }
                    className="short-width mb"
                  >
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>{" "}
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>
                    Total Number
                    <br /> of cases
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "total_initiated",
                        "number",
                        "total_initiated_asc",
                        "total_initiated_desc",
                        ""
                      )
                    }
                    className="short-width mb"
                  >
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv className="long-width">
                  <p>
                    No. of cases submitted <br />
                    from today's FI
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "num_cases_submitted",
                        "number",
                        "num_cases_submitted_asc",
                        "num_cases_submitted_desc",
                        ""
                      )
                    }
                    className="short-width mb"
                  >
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv className="long-width">
                  <p>
                    Total No. of Cases
                    <br />
                    submitted for the day
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "total_num_submitted",
                        "number",
                        "total_num_submitted_asc",
                        "total_num_submitted_desc",
                        ""
                      )
                    }
                    className="short-width mb"
                  >
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>TAT IN</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "tat_in",
                        "number",
                        "tat_in_asc",
                        "tat_in_desc",
                        ""
                      )
                    }
                    className="short-width"
                  >
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>TAT OUT</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "tat_out",
                        "number",
                        "tat_out_asc",
                        "tat_out_desc",
                        ""
                      )
                    }
                    className="short-width"
                  >
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>TAT %</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "tat_percent",
                        "number",
                        "tat_percent_asc",
                        "tat_percent_desc",
                        ""
                      )
                    }
                    className="short-width"
                  >
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>Unassigned</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "unassigned",
                        "number",
                        "unassigned_asc",
                        "unassigned_desc",
                        ""
                      )
                    }
                    className="short-width"
                  >
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv className="long-width">
                  <p>
                    Assigned
                    <br /> Verification(Field)
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "assigned_verification",
                        "number",
                        "assigned_verification_asc",
                        "assigned_verification_desc",
                        ""
                      )
                    }
                    className="short-width mb"
                  >
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>Report Received</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "report_received",
                        "number",
                        "report_received_asc",
                        "report_received_desc",
                        ""
                      )
                    }
                    className="short-width mb"
                  >
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>Total Pending</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "total_pending",
                        "number",
                        "total_pending_asc",
                        "total_pending_desc",
                        ""
                      )
                    }
                    className="short-width"
                  >
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.results.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCellDiv className="item">
                  {row.verification__vendor__employee_name}
                </TableCellDiv>
                <TableCellDiv className="item">{row.newfitype}</TableCellDiv>
                <TableCellDiv className="item">
                  {row?.pre_pending +
                    row?.unassigned_prev_day +
                    row?.pre_pending_submitted}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row?.newfitype == "cpv" ? row?.total_cpv : row?.total_pd}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row?.newfitype == "cpv"
                    ? row?.total_cpv +
                      row.pre_pending +
                      row.unassigned_prev_day +
                      row?.pre_pending_submitted
                    : row?.total_pd +
                      row.pre_pending +
                      row.unassigned_prev_day +
                      row?.pre_pending_submitted}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row.recieved_today_FI}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row.submitted_today}
                </TableCellDiv>
                <TableCellDiv className="item">{row.tatIn}</TableCellDiv>
                <TableCellDiv className="item">{row.tatOut}</TableCellDiv>
                <TableCellDiv className="item">
                  {row.tatIn + row.tatOut != 0 &&
                    ((row.tatIn / (row.tatIn + row.tatOut)) * 100).toFixed(2)}
                </TableCellDiv>
                <TableCellDiv className="item">{row.unassigned}</TableCellDiv>
                <TableCellDiv className="item">
                  {row.assignedField}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row.assignedOffice}
                </TableCellDiv>
                {/* <TableCellDiv className='item'>{(row.unassigned) + (row.assignedOffice)+(row.assignedField)}</TableCellDiv> */}
                <TableCellDiv className="item">
                  {row?.newfitype == "cpv"
                    ? row?.total_cpv +
                      row.pre_pending +
                      row.unassigned_prev_day +
                      row?.pre_pending_submitted -
                      row?.submitted_today
                    : row?.total_pd +
                      row.pre_pending +
                      row.unassigned_prev_day +
                      row?.pre_pending_submitted -
                      row?.submitted_today}
                </TableCellDiv>
              </TableRow>
            ))}
          </TableBody>
        </TableMain>
      </MainContainer>
      <TableFooter>
        <ExportExcel
          fileName="mis_report.xlsx"
          source="MIS_REPORT"
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
  width: 98% !important;
  border-radius: 12px !important;
  box-shadow: 0px 12px 12px rgba(0, 0, 0, 0.05) !important;
  max-width: ${({ iscollapse }) =>
    iscollapse == "true" ? "1200px !important" : "1360px !important"};
  overflow-x: scroll;
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
  width: 138px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &.long-width {
    width: 208px;
  }
  &.more-length {
    /* width: 157px; */
    min-width: 300px;
    justify-content: flex-start;
  }
`;
