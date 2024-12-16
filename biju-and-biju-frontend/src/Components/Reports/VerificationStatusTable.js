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
import BasicAccordion from "../Common/BasicAccordion";
import {
  calculateDuration,
  get_time_from_date,
  timeDate,
  exportToExcel,
  extract_date,
} from "../../Functions/utils";
import { fetchExcelVerificationStatusLog } from "../../Functions/helper";
import { useSelector } from "react-redux";
import { selectIsCollapse } from "../../Slices/commonSlice";
import { ExportExcel } from "../ExportExcel";

export default function VerificationStatusTable(props) {
  const isCollapse = useSelector(selectIsCollapse);
  const [expanded, setExpanded] = React.useState([]);
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
    exportToExcel(
      fetchExcelVerificationStatusLog(props.data.results),
      "Verification Status Log"
    );
  };

  const handleChange = (panel, index) => (event, newExpanded) => {
    if (newExpanded) {
      if (expanded.includes(index) === false) {
        setExpanded([...expanded, index]);
      }
    } else {
      let exps = expanded.filter((i) => i !== index);
      setExpanded(exps);
    }
    // setExpanded(newExpanded ? panel : false);
  };

  const getItemValue = (item, name, fi_type = "") => {
    let result = "";
    if (name === "applicationId")
      result = item.verification_address?.verification?.application_id;
    else if (name === "customerName")
      result =
        item.verification_address?.verification?.customer_name.toUpperCase();
    else if (name === "applicantType")
      result =
        item.verification_address?.verification?.applicant_type.toUpperCase();
    else if (name === "vendor_product")
      result =
        item.verification_address?.verification?.vendor?.employee_name.toUpperCase();
    else if (name === "fiType")
      result = item.verification_address?.fi_type.toUpperCase();
    else if (name === "fiDate")
      result = item.verification_address?.fi_date_time;
    else if (name === "fiTime")
      result = item.verification_address?.fi_date_time;
    else if (name === "TAT_Date") result = item.verTat;
    else if (name === "TAT_Time") result = item.verTat;
    else if (name === "disctrict")
      result = item.verification_address?.adress_district?.name.toUpperCase();
    else if (name === "verAgent")
      result =
        item.assigned_verification_users[0]?.field_agent?.employee_name.toUpperCase();
    else if (name === "reassigned")
      result = item.assigned_verification_users
        .filter((item) => item.status == true)[0]
        ?.field_agent?.employee_name.toUpperCase();
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
      <MainContainer component={Paper} iscollapse={isCollapse.toString()}>
        <TableMain aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCellDiv className="head">
                <THDiv>
                  <p>
                    Application <br /> ID
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "applicationId",
                        "application_id",
                        "application_asc",
                        "application_desc",
                        ""
                      )
                    }
                    className="mb"
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
                  <p>
                    Customer <br /> Name
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "customerName",
                        "text",
                        "customer_name_asc",
                        "customer_name_desc",
                        ""
                      )
                    }
                    className="mb"
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
                  <p>
                    Applicant <br /> Type
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "applicantType",
                        "text",
                        "applicant_type_asc",
                        "applicant_type_desc",
                        ""
                      )
                    }
                    className="short-width mb"
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
                  <p>Vendor/Product </p>
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "vendor_product",
                        "text",
                        "vendor_product_asc",
                        "vendor_product_desc",
                        ""
                      )
                    }
                  >
                    <img
                      src={require("../../Assets/images/sortIcon.png")}
                      alt=""
                    />
                  </SortIcon>
                </THDiv>{" "}
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>FI Type</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "fiType",
                        "text",
                        "fiType_asc",
                        "fiType_desc",
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
                  <p>FI Date</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "fiDate",
                        "date",
                        "fiDate_asc",
                        "fiDate_desc",
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
                  <p>FI Time</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "fiTime",
                        "time",
                        "fiTime_asc",
                        "fiTime_desc",
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
                <THDiv className="long-width">
                  <p>TAT Date </p>{" "}
                  <SortIcon
                    Click={() =>
                      handleSorting(
                        "TAT_Date",
                        "date",
                        "TAT_Date_asc",
                        "TAT_Date_desc",
                        ""
                      )
                    }
                    className="short-width"
                  >
                    <img
                      src={require("../../Assets/images/sortIcon.png")}
                      alt=""
                    />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv className="long-width">
                  <p>TAT Time</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "TAT_Time",
                        "time",
                        "TAT_Time_asc",
                        "TAT_Time_desc",
                        ""
                      )
                    }
                    className="short-width"
                  >
                    <img
                      src={require("../../Assets/images/sortIcon.png")}
                      alt=""
                    />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv className="long-width">
                  <p>District</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "disctrict",
                        "text",
                        "disctrict_asc",
                        "disctrict_desc",
                        ""
                      )
                    }
                    className="short-width"
                  >
                    <img
                      src={require("../../Assets/images/sortIcon.png")}
                      alt=""
                    />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv className="long-width">
                  <p>
                    Verification <br />
                    Agent & Phone
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "verAgent",
                        "text",
                        "verAgent_asc",
                        "verAgent_desc",
                        ""
                      )
                    }
                    className="short-width mb"
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
                  <p>Reassigned</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "reassigned",
                        "text",
                        "reassigned_asc",
                        "reassigned_desc",
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
                <THDiv className="more-length">
                  <p>Status</p>{" "}
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv className="min-width">
                  <p>Duration</p>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv className="long-width">
                  <p>Done By</p>
                </THDiv>
              </TableCellDiv>
            </TableRow>
          </TableHead>
          <TableBody>
            {props?.data?.results.map((row, index) => {
              let status = row?.verification_address?.verification_addr.map(
                (item) => item.status
              );
              let dates = row?.verification_address?.verification_addr.map(
                (item) => timeDate(item.done_at)
              );
              let combinedArray = status.map((element, index) => [
                element,
                `(${dates[index]})`,
              ]);
              // let duractionCalc = calculateDuration(row?.verification_address?.verification_addr.map((item) => get_time_from_date(item.done_at)))
              let duractionCalc = calculateDuration(
                row?.verification_address?.verification_addr.map(
                  (item) => item.done_at
                )
              );

              const combinedDuractionCalc = ["00:00:00", ...duractionCalc];
              return (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCellDiv
                    className="item"
                    is_expand={expanded.includes(index).toString()}
                  >
                    <p>
                      {row?.verification_address?.verification?.application_id}
                    </p>
                  </TableCellDiv>
                  <TableCellDiv
                    className="item"
                    is_expand={expanded.includes(index).toString()}
                  >
                    {row?.verification_address?.verification?.customer_name}
                  </TableCellDiv>
                  <TableCellDiv
                    className="item"
                    is_expand={expanded.includes(index).toString()}
                  >
                    {row?.verification_address?.verification?.applicant_type}
                  </TableCellDiv>
                  <TableCellDiv
                    className="item"
                    is_expand={expanded.includes(index).toString()}
                  >
                    {
                      row?.verification_address?.verification?.vendor
                        ?.employee_name
                    }
                    /
                    {
                      row?.verification_address?.verification?.product
                        ?.product_name
                    }
                  </TableCellDiv>
                  <TableCellDiv
                    className="item"
                    is_expand={expanded.includes(index).toString()}
                  >
                    {row?.verification_address?.fi_type}
                  </TableCellDiv>
                  <TableCellDiv
                    className="item"
                    is_expand={expanded.includes(index).toString()}
                  >
                    {extract_date(row?.verification_address?.fi_date_time)}
                  </TableCellDiv>
                  <TableCellDiv
                    className="item"
                    is_expand={expanded.includes(index).toString()}
                  >
                    {get_time_from_date(
                      row?.verification_address?.fi_date_time
                    )}
                  </TableCellDiv>
                  <TableCellDiv
                    className="item"
                    is_expand={expanded.includes(index).toString()}
                  >
                    {extract_date(row?.verTat)}
                  </TableCellDiv>
                  <TableCellDiv
                    className="item"
                    is_expand={expanded.includes(index).toString()}
                  >
                    {get_time_from_date(row?.verTat)}
                  </TableCellDiv>
                  <TableCellDiv
                    className="item"
                    is_expand={expanded.includes(index).toString()}
                  >
                    {row?.verification_address?.adress_district?.name}
                  </TableCellDiv>
                  <TableCellDiv
                    className="item"
                    is_expand={expanded.includes(index).toString()}
                  >
                    {
                      row?.assigned_verification_users[0]?.field_agent
                        ?.employee_name
                    }
                    <br />
                    {
                      row?.assigned_verification_users[0]?.field_agent?.user
                        ?.phonenumber
                    }{" "}
                  </TableCellDiv>
                  <TableCellDiv
                    className="item"
                    is_expand={expanded.includes(index).toString()}
                  >
                    {row?.assigned_verification_users.length > 1
                      ? row?.assigned_verification_users.filter(
                          (item) => item.status == true
                        )[0]?.field_agent?.employee_name
                      : "NA"}
                    <br />
                    {row?.assigned_verification_users.length > 1
                      ? row?.assigned_verification_users.filter(
                          (item) => item.status == true
                        )[0]?.field_agent?.user?.phonenumber
                      : "NA"}{" "}
                  </TableCellDiv>
                  <TableCellDiv
                    className="item"
                    is_expand={expanded.includes(index).toString()}
                  >
                    <BasicAccordion
                      datas={combinedArray}
                      row={row}
                      expanded={expanded.includes(index)}
                      setExpanded={setExpanded}
                      index={index}
                      expandArray={expanded}
                      handleChange={handleChange}
                    />
                  </TableCellDiv>
                  <TableCellDiv
                    className="item"
                    is_expand={expanded.includes(index).toString()}
                  >
                    <BasicAccordion
                      datas={combinedDuractionCalc}
                      expanded={expanded.includes(index)}
                      setExpanded={setExpanded}
                      index={index}
                      expandArray={expanded}
                      handleChange={handleChange}
                    />
                  </TableCellDiv>
                  <TableCellDiv
                    className="item"
                    is_expand={expanded.includes(index).toString()}
                  >
                    <BasicAccordion
                      datas={row?.verification_address?.verification_addr.map(
                        (item) => item.done_by.employee_name
                      )}
                      expanded={expanded.includes(index)}
                      setExpanded={setExpanded}
                      index={index}
                      expandArray={expanded}
                      handleChange={handleChange}
                    />
                  </TableCellDiv>
                </TableRow>
              );
            })}
          </TableBody>
        </TableMain>
      </MainContainer>
      <TableFooter>
        <ExportExcel
          fileName="verification_status_log_report.xlsx"
          source="VERIFICATION_STATUS_LOG"
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
    vertical-align: ${({ is_expand }) =>
      is_expand == "true" ? "top" : "center"};
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
  width: 140px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &.long-width {
    width: 157px;
  }
  &.more-length {
    /* width: 157px; */
    min-width: 350px;
    justify-content: flex-start;
  }
`;
