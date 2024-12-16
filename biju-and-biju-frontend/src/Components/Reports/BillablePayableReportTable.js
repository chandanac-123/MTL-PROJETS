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
import { exportToExcel } from "../../Functions/utils";
import {
  fetchExcelBillable,
  fetchExcelPayable,
  fetchExcelNotBillablePayable,
  fetchExcelDifferenceReport,
} from "../../Functions/helper";
import { useSelector } from "react-redux";
import { selectIsCollapse } from "../../Slices/commonSlice";
import { ExportExcel } from "../ExportExcel";

export default function BillablePayableReportTable(props) {
  const isCollapse = useSelector(selectIsCollapse);

  const [data, setData] = React.useState();
  const [sortingtype, setSortingType] = useState("notification_ascending");

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
    if (props?.filter_option == "billable") {
      exportToExcel(fetchExcelBillable(props.data.results), "Billable_Report");
    } else if (props?.filter_option == "payable") {
      exportToExcel(fetchExcelPayable(props.data.results), "Payable_Report");
    } else if (
      props?.filter_option == "billable_not_payable" ||
      props?.filter_option == "payable_not_billable"
    ) {
      exportToExcel(
        fetchExcelNotBillablePayable(props.data.results),
        props?.filter_option == "billable_not_payable"
          ? "Billable_not_Payable_Report"
          : "Payable_not_Billable_Report"
      );
    } else {
      exportToExcel(
        fetchExcelDifferenceReport(props.data.results),
        "Difference_Report"
      );
    }
  };

  const getItemValue = (item, name, fi_type = "") => {
    let result = "";
    if (name === "product") {
      result = item?.product?.product_name.toLowerCase();
    } else if (name === "vendor") {
      result = item.product?.vendor_name.toLowerCase();
    } else if (name === "billing_code") {
      result = item.vendor_code;
    } else if (name === "billing_count") {
      result = item.total_count;
    } else if (name === "local_count") {
      result = item.cpv_count_local;
    } else if (name === "local_rate") {
      result = item.product?.local_rate;
    } else if (name === "local_amt") {
      result = item.cpv_amt_local;
    } else if (name === "ocl1_count") {
      result = item.cpv_count_ocl1;
    } else if (name === "ocl1_rate") {
      result = item.product?.ocl_rate_2;
    } else if (name === "ocl1_amt") {
      result = item.cpv_amt_ocl1;
    } else if (name === "ocl2_count") {
      result = item.cpv_count_ocl2;
    } else if (name === "ocl2_rate") {
      result = item.product?.ocl_rate_2;
    } else if (name === "ocl2_amt") {
      result = item.cpv_amt_ocl2;
    } else if (name === "ocl3_count") {
      result = item.cpv_count_ocl3;
    } else if (name === "ocl3_rate") {
      result = item.product?.ocl_rate_3;
    } else if (name === "ocl3_amt") {
      result = item.cpv_amt_ocl3;
    } else if (name === "ogl1_count") {
      result = item.cpv_count_ogl1;
    } else if (name === "ogl1_rate") {
      result = item.product?.ogl_rate_1;
    } else if (name === "ogl1_amt") {
      result = item.cpv_amt_ogl1;
    } else if (name === "ogl2_count") {
      result = item.cpv_count_ogl2;
    } else if (name === "ogl2_rate") {
      result = item.product?.ogl_rate_2;
    } else if (name === "ogl2_amt") {
      result = item.cpv_amt_ogl2;
    } else if (name === "ogl3_count") {
      result = item.cpv_count_ogl3;
    } else if (name === "ogl3_rate") {
      result = item.product?.ogl_rate_3;
    } else if (name === "ogl3_amt") {
      result = item.cpv_amt_ogl3;
    } else if (name === "pd_count") {
      result = item.pd_count;
    } else if (name === "pd_rate") {
      result = item.product?.pd_rate;
    } else if (name === "pd_amt") {
      result = item.pd_amt;
    } else if (name === "bill_amt") {
      result = item.bill_amount;
    } else if (name === "agent") {
      result = item.userprofile?.employee_name.toLowerCase();
    } else if (name === "amt") {
      result = item.cpv_amt_local;
    } else if (name === "code") {
      result = item.userprofile?.employee_code;
    } else if (name === "rate") {
      result = item.userprofile?.cpv_local;
    } else if (name === "billing_count") {
      result = item.total_count;
    } else if (name === "ocl_count1") {
      result = item.cpv_count_ocl1;
    } else if (name === "ocl_rate1") {
      result = item.userprofile?.cpv_ocl_rate1;
    } else if (name === "ocl_amt1") {
      result = item.cpv_amt_ocl1;
    } else if (name === "ocl_count2") {
      result = item.cpv_count_ocl2;
    } else if (name === "ocl_rate2") {
      result = item.userprofile?.cpv_ogl_rate2;
    } else if (name === "ocl_amt2") {
      result = item.cpv_amt_ocl2;
    } else if (name === "ocl_count3") {
      result = item.cpv_count_ocl3;
    } else if (name === "pd_amt") {
      result = item.pd_amt;
    } else if (name === "amt_bill") {
      result = item.payable_amount;
    } else if (name === "pro_name") {
      result = item.product__product_name.toLowerCase();
    } else if (name === "vendor_name") {
      result = item.product__vendor__employee_name.toLowerCase();
    } else if (name === "payable_count") {
      result = item.payable_count;
    } else if (name === "billable_count") {
      result = item.billable_count;
    } else if (name === "difference") {
      result = item?.payable_count - item?.billable_count;
    } else if (name === "date") {
      result = item.created_at;
    } else if (name === "application_id") {
      result =
        item.submit_ver?.assign_verification?.verification_address?.verification
          ?.application_id;
    } else if (name === "cus_name") {
      result =
        item.submit_ver?.assign_verification?.verification_address?.verification?.customer_name.toLowerCase();
    } else if (name === "fidate") {
      result =
        item?.submit_ver?.assign_verification?.verification_address?.fi_type;
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
    } else if (type === "delay") {
      sorted = data.sort((item1, item2) => {
        let delay1 = getDurationInSeconds(getItemValue(item1, name, fi_type));
        let delay2 = getDurationInSeconds(getItemValue(item2, name, fi_type));
        if (!delay1) {
          delay1 = "";
        }
        if (!delay2) {
          delay2 = "";
        }
        if (sortingtype === sortingtypeDesc) {
          setSortingType(sortingtypeAsc);
          return delay1 - delay2;
        } else {
          setSortingType(sortingtypeDesc);
          return delay2 - delay1;
        }
      });
    } else if (type === "date_time") {
      sorted = data.sort((item1, item2) => {
        let time1 = new Date(getItemValue(item1, name, fi_type)).getTime();
        let time2 = new Date(getItemValue(item2, name, fi_type)).getTime();
        if (!time1) {
          time1 = "";
        }
        if (!time2) {
          time2 = "";
        }

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
        if (!date1) {
          date1 = "";
        }
        if (!date2) {
          date2 = "";
        }
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
        if (!id1) {
          id1 = 0;
        }
        if (!id2) {
          id2 = 0;
        }
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

  return (
    <>
      <MainContainer component={Paper} iscollapse={isCollapse.toString()}>
        <TableMain aria-label="sticky table">
          <TableHead>
            {props.filter_option === "billable" ? (
              <TableRow>
                <TableCellDiv className="head">
                  <THDiv>
                    <p>Product</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "product",
                          "text",
                          "product_ascending",
                          "product_decsending",
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
                    <p>Vendor</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "vendor",
                          "text",
                          "vendor_ascending",
                          "vendor_decsending",
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
                    <p>Billing Code</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "billing_code",
                          "text",
                          "billing_code_ascending",
                          "billing_code_decsending",
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
                    <p>Billing Count</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "billing_count",
                          "number",
                          "billing_count_ascending",
                          "billing_count_decsending",
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
                    <p>Local Count</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "local_count",
                          "number",
                          "local_count_ascending",
                          "local_count_decsending",
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
                    <p>Local Rate</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "local_rate",
                          "number",
                          "local_rate_ascending",
                          "local_rate_decsending",
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
                    <p>Local Amount</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "local_amt",
                          "number",
                          "local_amt_ascending",
                          "local_amt_decsending",
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
                    <p>OCL 1 Count</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "ocl1_count",
                          "number",
                          "ocl1_count_ascending",
                          "ocl1_count_decsending",
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
                    <p>OCL 1 Rate</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "ocl1_rate",
                          "number",
                          "ocl1_rate_ascending",
                          "ocl1_rate_decsending",
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
                    <p>OCL 1 Amount</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "ocl1_amt",
                          "number",
                          "ocl1_amt_ascending",
                          "ocl1_amt_decsending",
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
                    <p>OCL 2 Count</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "ocl2_count",
                          "number",
                          "ocl2_count_ascending",
                          "ocl2_count_decsending",
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
                    <p>OCL 2 Rate</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "ocl2_rate",
                          "number",
                          "ocl2_rate_ascending",
                          "ocl2_rate_decsending",
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
                    <p>OCL 2 Amount</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "ocl2_amt",
                          "number",
                          "ocl2_amt_ascending",
                          "ocl2_amt_decsending",
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
                    <p>OCL 3 Count</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "ocl3_count",
                          "number",
                          "ocl3_count_ascending",
                          "ocl3_count_decsending",
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
                    <p>OCL 3 Rate</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "ocl3_rate",
                          "number",
                          "ocl3_rate_ascending",
                          "ocl3_rate_decsending",
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
                    <p>OCL 3 Amount</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "ocl3_amt",
                          "number",
                          "ocl3_amt_ascending",
                          "ocl3_amt_decsending",
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
                    <p>OGL 1 Count</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "ogl1_count",
                          "number",
                          "ogl1_count_ascending",
                          "ogl1_count_decsending",
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
                    <p>OGL 1 Rate</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "ogl1_rate",
                          "number",
                          "ogl1_rate_ascending",
                          "ogl1_rate_decsending",
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
                    <p>OGL 1 Amount</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "ogl1_amt",
                          "number",
                          "ogl1_amt_ascending",
                          "ogl1_amt_decsending",
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
                    <p>OGL 2 Count</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "ogl2_count",
                          "number",
                          "ogl2_count_ascending",
                          "ogl2_count_decsending",
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
                    <p>OGL 2 Rate</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "ogl2_rate",
                          "number",
                          "ogl2_rate_ascending",
                          "ogl2_rate_decsending",
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
                    <p>OGL 2 Amount</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "ogl2_amt",
                          "number",
                          "ogl2_amt_ascending",
                          "ogl2_amt_decsending",
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
                    <p>OGL 3 Count</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "ogl3_count",
                          "number",
                          "ogl3_count_ascending",
                          "ogl3_count_decsending",
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
                    <p>OGL 3 Rate</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "ogl3_rate",
                          "number",
                          "ogl3_rate_ascending",
                          "ogl3_rate_decsending",
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
                    <p>OGL 3 Amount</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "ogl3_amt",
                          "number",
                          "ogl3_amt_ascending",
                          "ogl3_amt_decsending",
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
                    <p>PD Count</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "pd_count",
                          "number",
                          "pd_count_ascending",
                          "pd_count_decsending",
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
                          "pd_rate_ascending",
                          "pd_rate_decsending",
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
                          "pd_amt_ascending",
                          "pd_amt_decsending",
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
                    <p>Bill Amount</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "bill_amt",
                          "number",
                          "bill_amt_ascending",
                          "bill_amt_decsending",
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
            ) : props.filter_option === "payable" ? (
              <TableRow>
                <TableCellDiv className="head">
                  <THDiv>
                    <p>Product</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "product",
                          "text",
                          "product_ascending",
                          "product_decsending",
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
                    <p>Vendor</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "vendor",
                          "text",
                          "vendor_ascending",
                          "vendor_decsending",
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
                    <p style={{ marginBottom: "0px" }}>Agent Name</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "agent",
                          "text",
                          "agent_ascending",
                          "agent_decsending",
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
                    <p>Billing Code</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "code",
                          "number",
                          "code_ascending",
                          "code_decsending",
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
                    <p>Billing Count</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "billing_count",
                          "number",
                          "billing_count_ascending",
                          "billing_count_decsending",
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
                    <p>Local Count</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "local_count",
                          "number",
                          "local_count_ascending",
                          "local_count_decsending",
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
                    <p>Local Rate</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "rate",
                          "number",
                          "rate_ascending",
                          "rate_decsending",
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
                    <p>Local Amount</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "amt",
                          "number",
                          "amt_ascending",
                          "amt_decsending",
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
                    <p>OCL 1 Count</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "ocl_count1",
                          "number",
                          "ocl_count1_ascending",
                          "ocl_count1_decsending",
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
                    <p>OCL 1 Rate</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "ocl_rate1",
                          "number",
                          "ocl_rate1_ascending",
                          "ocl_rate1_decsending",
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
                    <p>OCL 1 Amount</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "ocl_amt1",
                          "number",
                          "ocl_amt1_ascending",
                          "ocl_amt1_decsending",
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
                    <p>OCL 2 Count</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "ocl_count2",
                          "number",
                          "ocl_count2_ascending",
                          "ocl_count2_decsending",
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
                    <p>OCL 2 Rate</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "ocl_rate2",
                          "number",
                          "ocl_rate2_ascending",
                          "ocl_rate2_decsending",
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
                    <p>OCL 2 Amount</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "ocl_amt2",
                          "number",
                          "ocl_amt2_ascending",
                          "ocl_amt2_decsending",
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
                    <p>OCL 3 Count</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "ocl_count3",
                          "number",
                          "ocl_count3_ascending",
                          "ocl_count3_decsending",
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
                    <p>OCL 3 Rate</p>{" "}
                    <SortIcon className="short-width">
                      <img src={require("../../Assets/images/sortIcon.png")} />
                    </SortIcon>
                  </THDiv>
                </TableCellDiv>
                <TableCellDiv className="head">
                  <THDiv>
                    <p>OCL 3 Amount</p>{" "}
                    <SortIcon className="short-width">
                      <img src={require("../../Assets/images/sortIcon.png")} />
                    </SortIcon>
                  </THDiv>
                </TableCellDiv>
                <TableCellDiv className="head">
                  <THDiv>
                    <p>OGL 1 Count</p>{" "}
                    <SortIcon className="short-width">
                      <img src={require("../../Assets/images/sortIcon.png")} />
                    </SortIcon>
                  </THDiv>
                </TableCellDiv>
                <TableCellDiv className="head">
                  <THDiv>
                    <p>OGL 1 Rate</p>{" "}
                    <SortIcon className="short-width">
                      <img src={require("../../Assets/images/sortIcon.png")} />
                    </SortIcon>
                  </THDiv>
                </TableCellDiv>
                <TableCellDiv className="head">
                  <THDiv>
                    <p>OGL 1 Amount</p>{" "}
                    <SortIcon className="short-width">
                      <img src={require("../../Assets/images/sortIcon.png")} />
                    </SortIcon>
                  </THDiv>
                </TableCellDiv>
                <TableCellDiv className="head">
                  <THDiv>
                    <p>OGL 2 Count</p>{" "}
                    <SortIcon className="short-width">
                      <img src={require("../../Assets/images/sortIcon.png")} />
                    </SortIcon>
                  </THDiv>
                </TableCellDiv>
                <TableCellDiv className="head">
                  <THDiv>
                    <p>OGL 2 Rate</p>{" "}
                    <SortIcon className="short-width">
                      <img src={require("../../Assets/images/sortIcon.png")} />
                    </SortIcon>
                  </THDiv>
                </TableCellDiv>
                <TableCellDiv className="head">
                  <THDiv>
                    <p>OGL 2 Amount</p>{" "}
                    <SortIcon className="short-width">
                      <img src={require("../../Assets/images/sortIcon.png")} />
                    </SortIcon>
                  </THDiv>
                </TableCellDiv>
                <TableCellDiv className="head">
                  <THDiv>
                    <p>OGL 3 Count</p>{" "}
                    <SortIcon className="short-width">
                      <img src={require("../../Assets/images/sortIcon.png")} />
                    </SortIcon>
                  </THDiv>
                </TableCellDiv>
                <TableCellDiv className="head">
                  <THDiv>
                    <p>OGL 3 Rate</p>{" "}
                    <SortIcon className="short-width">
                      <img src={require("../../Assets/images/sortIcon.png")} />
                    </SortIcon>
                  </THDiv>
                </TableCellDiv>
                <TableCellDiv className="head">
                  <THDiv>
                    <p>OGL 3 Amount</p>{" "}
                    <SortIcon className="short-width">
                      <img src={require("../../Assets/images/sortIcon.png")} />
                    </SortIcon>
                  </THDiv>
                </TableCellDiv>
                <TableCellDiv className="head">
                  <THDiv>
                    <p>PD Count</p>{" "}
                    <SortIcon className="short-width">
                      <img src={require("../../Assets/images/sortIcon.png")} />
                    </SortIcon>
                  </THDiv>
                </TableCellDiv>
                <TableCellDiv className="head">
                  <THDiv>
                    <p>PD Rate</p>{" "}
                    <SortIcon className="short-width">
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
                          "pd_amt_ascending",
                          "pd_amt_decsending",
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
                    <p>Bill Amount</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "amt_bill",
                          "number",
                          "amt_bill_ascending",
                          "amt_bill_decsending",
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
            ) : props.filter_option === "difference" ? (
              <TableRow>
                <TableCellDiv className="head">
                  <THDiv>
                    <p>Product</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "pro_name",
                          "text",
                          "pro_name_ascending",
                          "pro_name_decsending",
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
                    <p>Vendor</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "vendor_name",
                          "text",
                          "vendor_name_ascending",
                          "vendor_name_decsending",
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
                    <p>Payable Count</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "payable_count",
                          "number",
                          "payable_count_ascending",
                          "payable_count_decsending",
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
                    <p>Billing Count</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "billable_count",
                          "number",
                          "billable_count_ascending",
                          "billable_count_decsending",
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
                    <p>Difference</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "difference",
                          "number",
                          "difference_ascending",
                          "difference_decsending",
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
            ) : (
              <TableRow>
                <TableCellDiv className="head">
                  <THDiv>
                    <p>Date</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "date",
                          "date",
                          "date_ascending",
                          "date_decsending",
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
                    <p style={{ marginBottom: "0px" }}>
                      Application <br /> ID
                    </p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "application_id",
                          "application_id",
                          "application_id_ascending",
                          "application_id_decsending",
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
                    <p style={{ marginBottom: "0px" }}>Customer Name</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "cus_name",
                          "text",
                          "cus_name_ascending",
                          "cus_name_decsending",
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
                    <p>FI Type</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "fidate",
                          "text",
                          "fidate_ascending",
                          "fidate_decsending",
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
                    <p>Reason</p>{" "}
                  </THDiv>
                </TableCellDiv>
              </TableRow>
            )}
          </TableHead>
          <TableBody>
            {props?.data?.results.map((row, index) =>
              props.filter_option === "billable" ? (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCellDiv className="item">
                    {row?.product?.product_name}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.product?.vendor_name}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.vendor_code}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.total_count}
                  </TableCellDiv>

                  <TableCellDiv className="item">
                    {row?.cpv_count_local}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.product?.local_rate}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.cpv_amt_local}
                  </TableCellDiv>

                  <TableCellDiv className="item">
                    {row?.cpv_count_ocl1}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.product?.ocl_rate_1}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.cpv_amt_ocl1}
                  </TableCellDiv>

                  <TableCellDiv className="item">
                    {row?.cpv_count_ocl2}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.product?.ocl_rate_2}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.cpv_amt_ocl2}
                  </TableCellDiv>

                  <TableCellDiv className="item">
                    {row?.cpv_count_ocl3}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.product?.ocl_rate_3}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.cpv_amt_ocl3}
                  </TableCellDiv>

                  <TableCellDiv className="item">
                    {row?.cpv_count_ogl1}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.product?.ogl_rate_1}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.cpv_amt_ogl1}
                  </TableCellDiv>

                  <TableCellDiv className="item">
                    {row?.cpv_count_ogl2}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.product?.ogl_rate_2}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.cpv_amt_ogl2}
                  </TableCellDiv>

                  <TableCellDiv className="item">
                    {row?.cpv_count_ogl3}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.product?.ogl_rate_3}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.cpv_amt_ogl3}
                  </TableCellDiv>

                  <TableCellDiv className="item">{row?.pd_count}</TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.product?.pd_rate}
                  </TableCellDiv>
                  <TableCellDiv className="item">{row?.pd_amt}</TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.bill_amount}
                  </TableCellDiv>
                </TableRow>
              ) : props.filter_option === "payable" ? (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCellDiv className="item">
                    {row?.product?.product_name}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.product?.vendor_name}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.userprofile?.employee_name}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.userprofile?.employee_code}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.total_count}
                  </TableCellDiv>

                  <TableCellDiv className="item">
                    {row?.cpv_count_local}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.userprofile?.cpv_local}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.cpv_amt_local}
                  </TableCellDiv>

                  <TableCellDiv className="item">
                    {row?.cpv_count_ocl1}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.userprofile?.cpv_ocl_rate1}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.cpv_amt_ocl1}
                  </TableCellDiv>

                  <TableCellDiv className="item">
                    {row?.cpv_count_ocl2}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.userprofile?.cpv_ocl_rate2}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.cpv_amt_ocl2}
                  </TableCellDiv>

                  <TableCellDiv className="item">
                    {row?.cpv_count_ocl3}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.userprofile?.cpv_ocl_rate3}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.cpv_amt_ocl3}
                  </TableCellDiv>

                  <TableCellDiv className="item">
                    {row?.cpv_count_ogl1}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.userprofile?.cpv_ogl_rate1}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.cpv_amt_ogl1}
                  </TableCellDiv>

                  <TableCellDiv className="item">
                    {row?.cpv_count_ogl2}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.userprofile?.cpv_ogl_rate2}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.cpv_amt_ogl2}
                  </TableCellDiv>

                  <TableCellDiv className="item">
                    {row?.cpv_count_ogl3}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.userprofile?.cpv_ogl_rate3}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.cpv_amt_ogl3}
                  </TableCellDiv>

                  <TableCellDiv className="item">{row?.pd_count}</TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.userprofile?.pd_rate}
                  </TableCellDiv>
                  <TableCellDiv className="item">{row?.pd_amt}</TableCellDiv>

                  <TableCellDiv className="item">
                    {row?.payable_amount}
                  </TableCellDiv>
                </TableRow>
              ) : props.filter_option === "difference" ? (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCellDiv className="item">
                    {row?.product__product_name}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.product__vendor__employee_name}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.payable_count}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.billable_count}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {Math.abs(row?.payable_count - row?.billable_count)}
                  </TableCellDiv>
                </TableRow>
              ) : (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCellDiv className="item">
                    {row?.created_at}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {
                      row?.submit_ver?.assign_verification?.verification_address
                        ?.verification?.application_id
                    }
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {
                      row?.submit_ver?.assign_verification?.verification_address
                        ?.verification?.customer_name
                    }
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {
                      row?.submit_ver?.assign_verification?.verification_address
                        ?.fi_type
                    }
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {props.filter_option === "billable_not_payable"
                      ? row?.submit_ver?.payable_reason
                      : row?.submit_ver?.billable_reason}
                  </TableCellDiv>
                </TableRow>
              )
            )}
          </TableBody>
        </TableMain>
      </MainContainer>
      <TableFooter>
        <ExportExcel
          fileName={`${props.excelExportSource}.xlsx`}
          source={props.excelExportSource}
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
  }

  &.head {
    font-size: 14px;
    font-weight: 700;
    color: #727b84;
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
