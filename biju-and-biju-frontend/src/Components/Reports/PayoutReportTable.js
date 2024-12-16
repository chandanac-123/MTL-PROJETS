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
import { useSelector } from "react-redux";
import { selectIsCollapse } from "../../Slices/commonSlice";
import { exportToExcel } from "../../Functions/utils";
import { fetchExcelPayoutReport } from "../../Functions/helper";
import { ExportExcel } from "../ExportExcel";

const keysToCalculateRateByCountAndTotal = {
  reported: {
    totalKey: "reported_by_amt",
    countKey: "reported_by_count",
  },
  coordinated: {
    totalKey: "coordinated_by_amt",
    countKey: "coordinated_by_count",
  },
  allocated: {
    totalKey: "allocated_by_amt",
    countKey: "allocated_by_count",
  },
  written: {
    totalKey: "written_by_amt",
    countKey: "written_by_count",
  },
};

const calculateRateByCountAndTotal = (payout, fieldType) => {
  const { totalKey, countKey } = keysToCalculateRateByCountAndTotal[fieldType];
  if (!payout[totalKey] || !payout[countKey]) {
    return 0;
  }
  return Math.round(Number(payout[totalKey]) / Number(payout[countKey]));
};

export default function PayoutReportTable(props) {
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

  const getItemValue = (item, name, fi_type = "") => {
    let result = "";
    if (name === "agent_id")
      result = item.userprofile?.employee_code.toUpperCase();
    else if (name === "name")
      result = item.userprofile?.employee_name.toUpperCase();
    else if (name === "district")
      result = item.userprofile?.district_name.toUpperCase();
    else if (name === "bank") result = item.userprofile?.bank.toUpperCase();
    else if (name === "acc_num") result = item.userprofile?.account_number;
    else if (name === "ifsc_code") result = item.userprofile?.ifsc_code;
    else if (name === "holder_name") result = item.userprofile?.account_holder;
    else if (name === "cpv_local") result = item.cpv_count_local;
    else if (name === "cpv_rate_local") result = item.userprofile?.cpv_local;
    else if (name === "cpv_amt_local") result = item.cpv_amt_local;
    else if (name === "cpv_count_ocl1") result = item.cpv_count_ocl1;
    else if (name === "cpv_rate_ocl1") result = item.userprofile?.cpv_ocl_rate1;
    else if (name === "cpv_amt_ocl1") result = item.cpv_amt_ocl1;
    else if (name === "cpv_count_ocl2") result = item.cpv_count_ocl2;
    else if (name === "cpv_rate_ocl2") result = item.userprofile?.cpv_ocl_rate2;
    else if (name === "cpv_amt_ocl2") result = item.cpv_amt_ocl2;
    else if (name === "cpv_count_ocl3") result = item.cpv_count_ocl3;
    else if (name === "cpv_rate_ocl3") result = item.userprofile?.cpv_ocl_rate3;
    else if (name === "cpv_amt_ocl3") result = item.cpv_amt_ocl3;
    else if (name === "cpv_count_ogl1") result = item.cpv_count_ogl1;
    else if (name === "cpv_rate_ogl1") result = item.userprofile?.cpv_ogl_rate1;
    else if (name === "cpv_amt_ogl1") result = item.cpv_amt_ogl1;
    else if (name === "cpv_count_ogl2") result = item.cpv_count_ogl2;
    else if (name === "cpv_rate_ogl2") result = item.userprofile?.cpv_ogl_rate2;
    else if (name === "cpv_amt_ogl2") result = item.cpv_amt_ogl2;
    else if (name === "cpv_rate_ogl3") result = item.userprofile?.cpv_ogl_rate3;
    else if (name === "cpv_amt_ogl3") result = item.cpv_amt_ogl3;
    else if (name === "pd_count") result = item.pd_count;
    else if (name === "pd_rate") result = item.userprofile?.pd_rate;
    else if (name === "pd_amt") result = item.pd_amt;
    else if (name === "other_count") result = item.other_count;
    else if (name === "other_rate") result = item.other_rate;
    else if (name === "other_amt") result = item.other_amt;
    else if (name === "basic_pay") result = item.userprofile?.salary;
    else if (name === "expense") result = item.travelling_expense;
    else if (name === "allowance") result = item.special_allowance;
    else if (name === "incentive") result = item.incentive;
    else if (name === "report_count") result = item.reported_by_count;
    else if (name === "tot_reportedby") result = item.reported_by_amt;
    else if (name === "coordinat_cont") result = item.coordinated_by_count;
    else if (name === "tot_coordinat") result = item.coordinated_by_amt;
    else if (name === "allocate_count") result = item.allocated_by_count;
    else if (name === "tot_allocated") result = item.allocated_by_amt;
    else if (name === "written_count") result = item.written_by_count;
    else if (name === "tot_written") result = item.written_by_amt;
    else if (name === "others") result = item.others;
    else if (name === "tot_payout") result = item.total_payout;
    else if (name === "lev_deduction") result = item.leave_deduction;
    else if (name === "adv_deduction") result = item.advance_deduction;
    else if (name === "contri_deduction") result = item.contributions_deduction;
    else if (name === "tds_deduction") result = item.tds_deduction;
    else if (name === "othr_deduction") result = item.other_deduction;
    else if (name === "tot_deduction") result = item.total_deduction;
    else if (name === "net_payout") result = item.net_payout;

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
    } else if (type === "internal_calculation") {
      sorted = data.sort((item1, item2) => {
        let name1 = calculateRateByCountAndTotal(item1, name);
        let name2 = calculateRateByCountAndTotal(item2, name);
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
                <THDiv className="short-width">
                  <p>Sl.No</p>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>Agent ID</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "agent_id",
                        "text",
                        "agent_id_asc",
                        "agent_id_desc",
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
                  <p>Name</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting("name", "text", "name_asc", "name_desc", "")
                    }
                  >
                    <img src={require("../../Assets/images/sortIcon.png")} />
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
                  >
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>Bank</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting("bank", "text", "bank_asc", "bank_desc", "")
                    }
                  >
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>
                    Account <br />
                    Number
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "acc_num",
                        "text",
                        "acc_num_asc",
                        "acc_num_desc",
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
                  <p>IFSC Code</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "ifsc_code",
                        "text",
                        "ifsc_code_asc",
                        "ifsc_code_desc",
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
                  <p>
                    Account <br /> Holder Name
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "holder_name",
                        "text",
                        "holder_name_asc",
                        "holder_name_desc",
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
                  <p>CPV Count Local</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "cpv_local",
                        "number",
                        "cpv_local_asc",
                        "cpv_local_desc",
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
                  <p>CPV Rate Local</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "cpv_rate_local",
                        "number",
                        "cpv_rate_local_asc",
                        "cpv_rate_local_desc",
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
                  <p>CPV Amount Local</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "cpv_amt_local",
                        "number",
                        "cpv_amt_local_asc",
                        "cpv_amt_local_desc",
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
                  <p>CPV count OCL 1</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "cpv_count_ocl1",
                        "number",
                        "cpv_count_ocl1_asc",
                        "cpv_count_ocl1_desc",
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
                  <p>CPV Rate OCL 1</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "cpv_rate_ocl1",
                        "number",
                        "ncpv_rate_ocl1_asc",
                        "ncpv_rate_ocl1_desc",
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
                  <p>CPV Amount OCL 1</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "cpv_amt_ocl1",
                        "number",
                        "cpv_amt_ocl1_asc",
                        "cpv_amt_ocl1_desc",
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
                  <p>CPV count OCL 2</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "cpv_count_ocl2",
                        "number",
                        "cpv_count_ocl2_asc",
                        "cpv_count_ocl2_desc",
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
                  <p>CPV Rate OCL 2</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "cpv_rate_ocl2",
                        "number",
                        "cpv_rate_ocl2_asc",
                        "cpv_rate_ocl2_desc",
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
                  <p>CPV Amount OCL 2</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "cpv_amt_ocl2",
                        "number",
                        "cpv_amt_ocl2_asc",
                        "cpv_amt_ocl2_desc",
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
                  <p>CPV count OCL 3</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "cpv_count_ocl3",
                        "number",
                        "cpv_count_ocl3_asc",
                        "cpv_count_ocl3_desc",
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
                  <p>CPV Rate OCL 3</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "cpv_rate_ocl3",
                        "number",
                        "cpv_rate_ocl3_asc",
                        "cpv_rate_ocl3_desc",
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
                  <p>CPV Amount OCL 3</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "cpv_amt_ocl3",
                        "number",
                        "cpv_amt_ocl3_asc",
                        "cpv_amt_ocl3_desc",
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
                  <p>CPV count OGL 1</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "cpv_count_ogl1",
                        "number",
                        "cpv_count_ogl1_asc",
                        "cpv_count_ogl1_desc",
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
                  <p>CPV Rate OGL 1</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "cpv_rate_ogl1",
                        "number",
                        "cpv_rate_ogl1_asc",
                        "cpv_rate_ogl1_desc",
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
                  <p>CPV Amount OGL 1</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "cpv_amt_ogl1",
                        "number",
                        "cpv_amt_ogl1_asc",
                        "cpv_amt_ogl1_desc",
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
                  <p>CPV count OGL 2</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "cpv_count_ogl2",
                        "number",
                        "cpv_count_ogl2_asc",
                        "cpv_count_ogl2_desc",
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
                  <p>CPV Rate OGL 2</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "cpv_rate_ogl2",
                        "number",
                        "cpv_rate_ogl2_asc",
                        "cpv_rate_ogl2_desc",
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
                  <p>CPV Amount OGL 2</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "cpv_amt_ogl2",
                        "number",
                        "cpv_amt_ogl2_asc",
                        "cpv_amt_ogl2_desc",
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
                  <p>CPV count OGL 3</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "cpv_count_ogl3",
                        "number",
                        "cpv_count_ogl3_asc",
                        "cpv_count_ogl3_desc",
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
                  <p>CPV Rate OGL 3</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "cpv_rate_ogl3",
                        "number",
                        "cpv_rate_ogl3_asc",
                        "cpv_rate_ogl3_desc",
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
                  <p>CPV Amount OGL 3</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "cpv_amt_ogl3",
                        "number",
                        "cpv_amt_ogl3_asc",
                        "cpv_amt_ogl3_desc",
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
                  <p>PD count</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "pd_count",
                        "number",
                        "pd_count_asc",
                        "pd_count_desc",
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
                  <p>PD Rate</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "pd_rate",
                        "number",
                        "pd_rate_asc",
                        "pd_rate_desc",
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
                  <p>PD Amount</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "pd_amt",
                        "number",
                        "pd_amt_asc",
                        "pd_amt_desc",
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
                  <p>Other Count</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "other_count",
                        "number",
                        "other_count_asc",
                        "other_count_desc",
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
                  <p>Other Rate</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "other_rate",
                        "number",
                        "other_rate_asc",
                        "other_rate_desc",
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
                  <p>Other Amount</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "other_amt",
                        "number",
                        "other_amt_asc",
                        "other_amt_desc",
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
                  <p>Basic Pay</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "basic_pay",
                        "number",
                        "basic_pay_asc",
                        "basic_pay_desc",
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
                    Travelling
                    <br />
                    Allowances/Expense
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "expense",
                        "number",
                        "expense_asc",
                        "expense_desc",
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
                  <p>Special allowance</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "allowance",
                        "number",
                        "allowance_asc",
                        "allowance_desc",
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
                  <p>Incentive</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "incentive",
                        "number",
                        "incentive_asc",
                        "incentive_desc",
                        ""
                      )
                    }
                  >
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv className="long-width">
                  <p>Reported by count</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "report_count",
                        "number",
                        "report_count_asc",
                        "report_count_desc",
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
                  <p>Reported by rate</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "reported",
                        "internal_calculation",
                        "reported_by_rate_asc",
                        "reported_by_rate_desc",
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
                  <p>Total reported by</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "tot_reportedby",
                        "number",
                        "tot_reportedby_asc",
                        "tot_reportedby_desc",
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
                  <p>Coordinated by count</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "coordinat_cont",
                        "number",
                        "coordinat_cont_asc",
                        "coordinat_cont_desc",
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
                  <p>Coordinated by rate</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "coordinated",
                        "internal_calculation",
                        "coordinated_by_rate_asc",
                        "coordinated_by_rate_desc",
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
                  <p>Total coordinated by</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "tot_coordinat",
                        "number",
                        "tot_coordinat_asc",
                        "tot_coordinat_desc",
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
                  <p>Allocated by count</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "allocate_count",
                        "number",
                        "allocate_count_asc",
                        "allocate_count_desc",
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
                  <p>Allocated by rate</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "allocated",
                        "internal_calculation",
                        "allocated_by_rate_asc",
                        "allocated_by_rate_desc",
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
                  <p>Total allocated by</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "tot_allocated",
                        "number",
                        "tot_allocated_asc",
                        "tot_allocated_desc",
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
                  <p>Written by count</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "written_count",
                        "number",
                        "written_count_asc",
                        "written_count_desc",
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
                  <p>Written by rate</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "written",
                        "internal_calculation",
                        "written_by_rate_asc",
                        "written_by_rate_desc",
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
                  <p>Total written by</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "tot_written",
                        "number",
                        "tot_written_asc",
                        "tot_written_desc",
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
                  <p>Others</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "others",
                        "number",
                        "others_asc",
                        "others_desc",
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
                  <p>Total payout</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "tot_payout",
                        "number",
                        "tot_payout_asc",
                        "tot_payout_desc",
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
                  <p>Deduction(Leave)</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "lev_deduction",
                        "number",
                        "lev_deduction_asc",
                        "lev_deduction_desc",
                        ""
                      )
                    }
                  >
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv className="long-width">
                  <p>Deduction(Advance)</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "adv_deduction",
                        "number",
                        "adv_deduction_asc",
                        "adv_deduction_desc",
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
                  <p>Deduction(Contributions)</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "contri_deduction",
                        "number",
                        "contri_deduction_asc",
                        "contri_deduction_desc",
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
                  <p>Deduction(TDS)</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "tds_deduction",
                        "number",
                        "tds_deduction_asc",
                        "tds_deduction_desc",
                        ""
                      )
                    }
                  >
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv className="long-width">
                  <p>Other deductions</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "othr_deduction",
                        "number",
                        "othr_deduction_asc",
                        "othr_deduction_desc",
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
                  <p>Total deduction</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "tot_deduction",
                        "number",
                        "tot_deduction_asc",
                        "tot_deduction_desc",
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
                  <p>Net payout</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "net_payout",
                        "number",
                        "net_payout_asc",
                        "net_payout_desc",
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
            {props?.data?.results.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCellDiv className="item">
                  {(props.page - 1) * 10 + index + 1}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row?.userprofile?.employee_code
                    ? row?.userprofile?.employee_code
                    : row?.userprofile__employee_code}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row?.userprofile?.employee_name
                    ? row?.userprofile?.employee_name
                    : row?.userprofile__employee_name}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row?.userprofile?.district_name
                    ? row?.userprofile?.district_name
                    : row?.userprofile__address_district__name}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row?.userprofile?.bank
                    ? row?.userprofile?.bank
                    : row?.userprofile__bank}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row?.userprofile?.account_number
                    ? row?.userprofile?.account_number
                    : row?.userprofile__account_number}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row?.userprofile?.ifsc_code
                    ? row?.userprofile?.ifsc_code
                    : row?.userprofile__ifsc_code}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row?.userprofile?.account_holder
                    ? row?.userprofile?.account_holder
                    : row?.userprofile__account_holder}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row?.cpv_count_local}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row?.userprofile?.cpv_local
                    ? row?.userprofile?.cpv_local
                    : row?.userprofile__cpv_local}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row?.cpv_amt_local}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row?.cpv_count_ocl1}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row?.userprofile?.cpv_ocl_rate1
                    ? row?.userprofile?.cpv_ocl_rate1
                    : row?.userprofile__cpv_ocl_rate1}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row?.cpv_amt_ocl1}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row?.cpv_count_ocl2}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row?.userprofile?.cpv_ocl_rate2
                    ? row?.userprofile?.cpv_ocl_rate2
                    : row?.userprofile__cpv_ocl_rate2}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row?.cpv_amt_ocl2}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row?.cpv_count_ocl3}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row?.userprofile?.cpv_ocl_rate3
                    ? row?.userprofile?.cpv_ocl_rate3
                    : row?.userprofile__cpv_ocl_rate3}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row?.cpv_amt_ocl3}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row?.cpv_count_ogl1}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row?.userprofile?.cpv_ogl_rate1
                    ? row?.userprofile?.cpv_ogl_rate1
                    : row?.userprofile__cpv_ogl_rate1}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row?.cpv_amt_ogl1}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row?.cpv_count_ogl2}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row?.userprofile?.cpv_ogl_rate2
                    ? row?.userprofile?.cpv_ogl_rate2
                    : row?.userprofile__cpv_ogl_rate2}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row?.cpv_amt_ogl2}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row?.cpv_count_ogl3}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row?.userprofile?.cpv_ogl_rate3
                    ? row?.userprofile?.cpv_ogl_rate3
                    : row?.userprofile__cpv_ogl_rate3}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row?.cpv_amt_ogl3}
                </TableCellDiv>
                <TableCellDiv className="item">{row?.pd_count}</TableCellDiv>
                <TableCellDiv className="item">
                  {row?.userprofile?.pd_rate
                    ? row?.userprofile?.pd_rate
                    : row?.userprofile__pd_rate}
                </TableCellDiv>
                <TableCellDiv className="item">{row?.pd_amt}</TableCellDiv>
                <TableCellDiv className="item">{row?.other_count}</TableCellDiv>
                <TableCellDiv className="item">{row?.other_rate}</TableCellDiv>
                <TableCellDiv className="item">{row?.other_amt}</TableCellDiv>
                <TableCellDiv className="item">
                  {row?.userprofile?.salary
                    ? row?.userprofile?.salary
                    : row?.userprofile__salary}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row?.travelling_expense}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row?.special_allowance}
                </TableCellDiv>
                <TableCellDiv className="item">{row?.incentive}</TableCellDiv>
                <TableCellDiv className="item">
                  {row?.reported_by_count}
                </TableCellDiv>

                <TableCellDiv className="item">
                  {calculateRateByCountAndTotal(row, "reported")}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row?.reported_by_amt}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row?.coordinated_by_count}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {calculateRateByCountAndTotal(row, "coordinated")}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row?.coordinated_by_amt}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row?.allocated_by_count}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {calculateRateByCountAndTotal(row, "allocated")}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row?.allocated_by_amt}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row?.written_by_count}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {calculateRateByCountAndTotal(row, "written")}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row?.written_by_amt}
                </TableCellDiv>
                <TableCellDiv className="item">{row?.others}</TableCellDiv>
                <TableCellDiv className="item">
                  {row?.total_payout}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row?.leave_deduction}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row?.advance_deduction}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row?.contributions_deduction}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row?.tds_deduction}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row?.other_deduction}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row?.total_deduction}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {parseInt(row?.net_payout) +
                    parseInt(
                      row?.userprofile?.salary
                        ? row?.userprofile?.salary
                        : row?.userprofile__salary
                    )}
                </TableCellDiv>
              </TableRow>
            ))}
          </TableBody>
        </TableMain>
      </MainContainer>
      <TableFooter>
        <ExportExcel
          fileName="payout_report.xlsx"
          source="PAYOUT_REPORT"
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
  &.short-width {
    width: 100px;
  }
  &.long-width {
    width: 208px;
  }
  &.more-length {
    /* width: 157px; */
    min-width: 300px;
    justify-content: flex-start;
  }
`;
