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
  extract_date,
  exportToExcel,
  get_time_from_date,
  convert_date_format,
} from "../../Functions/utils";
import { useSelector } from "react-redux";
import { selectIsCollapse } from "../../Slices/commonSlice";
import { fetchExcelVendorTrackReport } from "../../Functions/helper";
import { get_data } from "../../Store/common/commonSlice";
import { useDispatch } from "react-redux";
import { vendor_track_excel_report } from "../../Api/ReportsApis";
import ExcelDownloadProgress from "../ProgressBar/ExcelDownloadProgress";
import VendorTrackProgressBar from "../ProgressBar/VendorTrackProgressBar";

export default function VendorTrackReportTable(props) {
  const isCollapse = useSelector(selectIsCollapse);
  const [taskId, setTaskId] = useState("");
  const [progress, setProgress] = useState(0);
  const [data, setData] = useState(props.data);
  const [sortingtype, setSortingType] = useState("notification_ascending");

  const dispatch = useDispatch();

  useEffect(() => {
    setData(props?.data?.results);
  }, [props?.data?.results]);

  const getItemValue = (item, name, fi_type = "") => {
    let result = "";
    if (name === "app_id") {
      result = item.application_id;
    } else if (name === "vendor") {
      result = item.vendor?.employee_name;
    } else if (name === "product") {
      result = item.product?.product_name;
    } else if (name === "fidate") {
      result = item?.addresses[0]?.fi_date_time;
    } else if (name === "fitime") {
      result = item?.addresses[0]?.fi_date_time;
    } else if (name === "customer") {
      result = item.customer_name;
    } else if (
      name === "subdate_rv" ||
      name === "subdate_bv" ||
      name === "subdate_pv" ||
      name === "subdate_pd"
    ) {
      result = item?.addresses?.filter((i) => i.fi_type === fi_type)[0]
        ?.verification_address[0]?.submitted_at;
    } else if (
      name === "subtime_rv" ||
      name === "subtime_bv" ||
      name === "subtime_pv" ||
      name === "subtime_pd"
    ) {
      result = item?.addresses?.filter((i) => i.fi_type === fi_type)[0]
        ?.verification_address[0]?.submitted_at;
    } else if (
      name === "applicant_rv_add" ||
      name === "applicant_bv_add" ||
      name === "applicant_pv_add" ||
      name === "applicant_pd_add"
    ) {
      result = item?.addresses?.filter((i) => i.fi_type === fi_type)[0]?.adress;
    } else if (
      name === "report_sts_rv" ||
      name === "report_sts_bv" ||
      name === "report_sts_pv" ||
      name === "report_sts_pd"
    ) {
      result = item?.addresses?.filter((i) => i.fi_type === fi_type)[0]
        ?.verification_address[0]?.status;
    } else if (
      name === "applicant_rv_dis" ||
      name === "applicant_bv_dis" ||
      name === "applicant_pv_dis" ||
      name === "applicant_pd_dis"
    ) {
      result = item?.addresses?.filter((i) => i.fi_type === fi_type)[0]
        ?.adress_district?.name;
    } else if (
      name === "rv_distance" ||
      name === "bv_distance" ||
      name === "pv_distance" ||
      name === "pd_distance"
    ) {
      result = item?.addresses?.filter((i) => i.fi_type === fi_type)[0]
        ?.verification_address[0]?.assign_verification[0]?.distance;
    } else if (name === "product_tat") {
      result = item.product?.tat_hours;
    } else if (
      name === "img_rv" ||
      name === "img_bv" ||
      name === "img_pv" ||
      name === "img_pd"
    ) {
      result = item?.addresses?.filter((i) => i.fi_type === fi_type)[0]
        ?.verification_address[0]?.img_recieved_through;
    } else if (name === "emp_status") {
      result = item?.addresses?.filter((i) => i.fi_type === "BV")[0]
        ?.verification_address[0]?.formdata[0]?.other_details[0]?.employed;
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
    }
  };

  // const handleClick = () => {
  //   exportToExcel(
  //     fetchExcelVendorTrackReport(props.data.results),
  //     "vendor_track_report"
  //   );
  // };

  const state = props.state;

  const handleClick = () => {
    let url = `${vendor_track_excel_report}?`;
    if (state.vendor) {
      let vendor_name = encodeURIComponent(
        state.vendors.filter((i) => i.id === state.vendor)[0].employee_name
      );
      url = url + `&vendor__employee_name=${vendor_name}`;
    }
    if (state.product) {
      let product_name = state.products.filter((i) => i.id === state.product)[0]
        .product_name;
      url = url + `&product__product_name=${product_name}`;
    }
    if (state.from_date && state.to_date) {
      let from_date = state.from_date?.toLocaleDateString();
      let to_date = state.to_date?.toLocaleDateString();
      from_date = convert_date_format(from_date);
      to_date = convert_date_format(to_date);
      url = url + `&created_at__range=${from_date},${to_date}`;
    }
    if (state.searchValue) {
      url = url + `&search=${state.searchValue}`;
    }

    dispatch(get_data(url))
      .then((res) => {
        // console.log('login res => ',res);
        const result = res?.payload;
        if (res?.payload?.status === 200) {
          setTaskId(result?.data?.task_id);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
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
                  <p>Application ID</p>
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
                        "vendor_asc",
                        "vendor_desc",
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
                  >
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>FI Date</p>{" "}
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
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>FI Time</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "fitime",
                        "date_time",
                        "fitime_asc",
                        "fitime_desc",
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
                    Customer <br />
                    Name
                  </p>{" "}
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
                    className="mb"
                  >
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>
                    Submitted <br /> Date RV
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "subdate_rv",
                        "date",
                        "subdate_rv_asc",
                        "subdate_rv_desc",
                        "RV"
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
                  <p>
                    Submitted <br /> Time RV
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "subtime_rv",
                        "date_time",
                        "subtime_rv_asc",
                        "subtime_rv_desc",
                        "RV"
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
                  <p>
                    Submitted <br /> Date BV
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "subdate_bv",
                        "dtae",
                        "subdate_bv_asc",
                        "subdate_bv_desc",
                        "BV"
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
                  <p>
                    Submitted <br /> Time BV
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "subtime_bv",
                        "date_time",
                        "subtime_bv_asc",
                        "subtime_bv_desc",
                        "BV"
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
                  <p>
                    Submitted <br /> Date PV
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "subdate_pv",
                        "date",
                        "subdate_pv_asc",
                        "subdate_pv_desc",
                        "PV"
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
                  <p>
                    Submitted <br /> Time PV
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "subtime_pv",
                        "date_time",
                        "subtime_pv_asc",
                        "subtime_pv_desc",
                        "PV"
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
                  <p>
                    Submitted <br /> Date PD
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "subdate_pd",
                        "date",
                        "subdate_pd_asc",
                        "subdate_pd_desc",
                        "PD"
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
                  <p>
                    Submitted <br /> Time PD
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "subtime_pd",
                        "date_time",
                        "subtime_pd_asc",
                        "subtime_pd_desc",
                        "PD"
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
                  <p>
                    Applicant RV <br /> Address
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "applicant_rv_add",
                        "text",
                        "applicant_rv_add_asc",
                        "applicant_rv_add_desc",
                        "RV"
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
                  <p>
                    Applicant BV <br /> Address
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "applicant_bv_add",
                        "text",
                        "applicant_bv_add_asc",
                        "applicant_bv_add_desc",
                        "BV"
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
                  <p>
                    Applicant PV <br /> Address
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "applicant_pv_add",
                        "text",
                        "applicant_pv_add_asc",
                        "applicant_pv_add_desc",
                        "PV"
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
                  <p>
                    Applicant PD <br /> Address
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "applicant_pd_add",
                        "text",
                        "applicant_pd_add_asc",
                        "applicant_pd_add_desc",
                        "PD"
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
                  <p>Report status RV</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "report_sts_rv",
                        "text",
                        "report_sts_rv_asc",
                        "report_sts_rv_desc",
                        "RV"
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
                  <p>Report status BV</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "report_sts_bv",
                        "text",
                        "report_sts_bv_asc",
                        "report_sts_bv_desc",
                        "BV"
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
                  <p>Report status PV</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "report_sts_pv",
                        "text",
                        "report_sts_pv_asc",
                        "report_sts_pv_desc",
                        "PV"
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
                  <p>Report status PD</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "report_sts_pd",
                        "text",
                        "report_sts_pd_asc",
                        "report_sts_pd_desc",
                        "PD"
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
                    Applicant RV
                    <br /> Distance
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "applicant_rv_dis",
                        "text",
                        "applicant_rv_dis_asc",
                        "applicant_rv_dis_desc",
                        "RV"
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
                  <p>RV District</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "rv_distance",
                        "text",
                        "rv_distance_asc",
                        "rv_distance_desc",
                        "RV"
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
                    Applicant BV
                    <br /> Distance
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "applicant_bv_dis",
                        "text",
                        "applicant_bv_dis_asc",
                        "applicant_bv_dis_desc",
                        "BV"
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
                  <p>BV District</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "bv_distance",
                        "text",
                        "bv_distance_asc",
                        "bv_distance_desc",
                        "BV"
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
                    Applicant PV <br /> Distance
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "applicant_pv_dis",
                        "text",
                        "applicant_pv_dis_asc",
                        "applicant_pv_dis_desc",
                        "PV"
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
                  <p>PV District</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "pv_distance",
                        "text",
                        "pv_distance_asc",
                        "pv_distance_desc",
                        "PV"
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
                    Applicant PD <br /> Distance
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "applicant_pd_dis",
                        "text",
                        "applicant_pd_dis_asc",
                        "applicant_pd_dis_desc",
                        "PD"
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
                  <p>PD District</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "pd_distance",
                        "text",
                        "pd_distance_asc",
                        "pd_distance_desc",
                        "PD"
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
                  <p>Product TAT</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "product_tat",
                        "time",
                        "product_tat_asc",
                        "product_tat_desc",
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
                    Image Upload <br /> Status RV
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "img_rv",
                        "text",
                        "img_rv_asc",
                        "img_rv_desc",
                        "RV"
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
                  <p>
                    Image Upload <br /> Status BV
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "img_bv",
                        "text",
                        "img_bv_asc",
                        "img_bv_desc",
                        "BV"
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
                  <p>
                    Image Upload <br /> Status PV
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "img_pv",
                        "text",
                        "img_pv_asc",
                        "img_pv_desc",
                        "PV"
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
                  <p>
                    Image Upload <br /> Status PD
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "img_pd",
                        "text",
                        "img_pd_asc",
                        "img_pd_desc",
                        "PD"
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
                    Applicant <br /> Employment status
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "emp_status",
                        "text",
                        "emp_status_asc",
                        "emp_status_desc",
                        ""
                      )
                    }
                    className="short-width mb"
                  >
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
            </TableRow>
          </TableHead>
          <TableBody>
            {props?.data?.results?.length > 0 &&
              props?.data?.results?.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCellDiv className="item">
                    {(props.page - 1) * 10 + index + 1}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.application_id}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.vendor?.employee_name}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.product?.product_name}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.addresses && row?.addresses.length
                      ? extract_date(row?.addresses[0]?.fi_date_time)
                      : "NA"}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.addresses && row?.addresses.length
                      ? get_time_from_date(row?.addresses[0]?.fi_date_time)
                      : "NA"}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.customer_name}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.addresses?.filter((i) => i.fi_type === "RV")[0]
                      ?.verification_address[0]?.submitted_at
                      ? extract_date(
                          row?.addresses?.filter((i) => i.fi_type === "RV")[0]
                            ?.verification_address[0]?.submitted_at
                        )
                      : "NA"}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.addresses?.filter((i) => i.fi_type === "RV")[0]
                      ?.verification_address[0]?.submitted_at
                      ? get_time_from_date(
                          row?.addresses?.filter((i) => i.fi_type === "RV")[0]
                            ?.verification_address[0]?.submitted_at
                        )
                      : "NA"}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.addresses?.filter((i) => i.fi_type === "BV")[0]
                      ?.verification_address[0]?.submitted_at
                      ? extract_date(
                          row?.addresses?.filter((i) => i.fi_type === "BV")[0]
                            ?.verification_address[0]?.submitted_at
                        )
                      : "NA"}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.addresses?.filter((i) => i.fi_type === "BV")[0]
                      ?.verification_address[0]?.submitted_at
                      ? get_time_from_date(
                          row?.addresses?.filter((i) => i.fi_type === "BV")[0]
                            ?.verification_address[0]?.submitted_at
                        )
                      : "NA"}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.addresses?.filter((i) => i.fi_type === "PV")[0]
                      ?.verification_address[0]?.submitted_at
                      ? extract_date(
                          row?.addresses?.filter((i) => i.fi_type === "PV")[0]
                            ?.verification_address[0]?.submitted_at
                        )
                      : "NA"}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.addresses?.filter((i) => i.fi_type === "PV")[0]
                      ?.verification_address[0]?.submitted_at
                      ? get_time_from_date(
                          row?.addresses?.filter((i) => i.fi_type === "PV")[0]
                            ?.verification_address[0]?.submitted_at
                        )
                      : "NA"}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.addresses?.filter((i) => i.fi_type === "PD")[0]
                      ?.verification_address[0]?.submitted_at
                      ? extract_date(
                          row?.addresses?.filter((i) => i.fi_type === "PD")[0]
                            ?.verification_address[0]?.submitted_at
                        )
                      : "NA"}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.addresses?.filter((i) => i.fi_type === "PD")[0]
                      ?.verification_address[0]?.submitted_at
                      ? get_time_from_date(
                          row?.addresses?.filter((i) => i.fi_type === "PD")[0]
                            ?.verification_address[0]?.submitted_at
                        )
                      : "NA"}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.addresses?.filter((i) => i.fi_type === "RV")[0]
                      ?.adress
                      ? row?.addresses?.filter((i) => i.fi_type === "RV")[0]
                          ?.adress
                      : "NA"}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.addresses?.filter((i) => i.fi_type === "BV")[0]
                      ?.adress
                      ? row?.addresses?.filter((i) => i.fi_type === "BV")[0]
                          ?.adress
                      : "NA"}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.addresses?.filter((i) => i.fi_type === "PV")[0]
                      ?.adress
                      ? row?.addresses?.filter((i) => i.fi_type === "PV")[0]
                          ?.adress
                      : "NA"}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.addresses?.filter((i) => i.fi_type === "PD")[0]
                      ?.adress
                      ? row?.addresses?.filter((i) => i.fi_type === "PD")[0]
                          ?.adress
                      : "NA"}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.addresses?.filter((i) => i.fi_type === "RV")[0]
                      ?.verification_address[0]?.status
                      ? row?.addresses?.filter((i) => i.fi_type === "RV")[0]
                          ?.verification_address[0]?.status
                      : "NA"}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.addresses?.filter((i) => i.fi_type === "BV")[0]
                      ?.verification_address[0]?.status
                      ? row?.addresses?.filter((i) => i.fi_type === "BV")[0]
                          ?.verification_address[0]?.status
                      : "NA"}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.addresses?.filter((i) => i.fi_type === "PV")[0]
                      ?.verification_address[0]?.status
                      ? row?.addresses?.filter((i) => i.fi_type === "PV")[0]
                          ?.verification_address[0]?.status
                      : "NA"}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.addresses?.filter((i) => i.fi_type === "PD")[0]
                      ?.verification_address[0]?.status
                      ? row?.addresses?.filter((i) => i.fi_type === "PD")[0]
                          ?.verification_address[0]?.status
                      : "NA"}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.addresses?.filter((i) => i.fi_type === "RV")[0]
                      ?.verification_address[0]?.assign_verification[0]
                      ?.distance
                      ? row?.addresses?.filter((i) => i.fi_type === "RV")[0]
                          ?.verification_address[0]?.assign_verification[0]
                          ?.distance
                      : "NA"}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.addresses?.filter((i) => i.fi_type === "RV")[0]
                      ?.adress_district?.name
                      ? row?.addresses?.filter((i) => i.fi_type === "RV")[0]
                          ?.adress_district?.name
                      : "NA"}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.addresses?.filter((i) => i.fi_type === "BV")[0]
                      ?.verification_address[0]?.assign_verification[0]
                      ?.distance
                      ? row?.addresses?.filter((i) => i.fi_type === "BV")[0]
                          ?.verification_address[0]?.assign_verification[0]
                          ?.distance
                      : "NA"}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.addresses?.filter((i) => i.fi_type === "BV")[0]
                      ?.adress_district?.name
                      ? row?.addresses?.filter((i) => i.fi_type === "BV")[0]
                          ?.adress_district?.name
                      : "NA"}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.addresses?.filter((i) => i.fi_type === "PV")[0]
                      ?.verification_address[0]?.assign_verification[0]
                      ?.distance
                      ? row?.addresses?.filter((i) => i.fi_type === "PV")[0]
                          ?.verification_address[0]?.assign_verification[0]
                          ?.distance
                      : "NA"}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.addresses?.filter((i) => i.fi_type === "PV")[0]
                      ?.adress_district?.name
                      ? row?.addresses?.filter((i) => i.fi_type === "PV")[0]
                          ?.adress_district?.name
                      : "NA"}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.addresses?.filter((i) => i.fi_type === "PD")[0]
                      ?.verification_address[0]?.assign_verification[0]
                      ?.distance
                      ? row?.addresses?.filter((i) => i.fi_type === "PD")[0]
                          ?.verification_address[0]?.assign_verification[0]
                          ?.distance
                      : "NA"}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.addresses?.filter((i) => i.fi_type === "PD")[0]
                      ?.adress_district?.name
                      ? row?.addresses?.filter((i) => i.fi_type === "PD")[0]
                          ?.adress_district?.name
                      : "NA"}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.product?.tat_hours}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.addresses?.filter((i) => i.fi_type === "RV")[0]
                      ?.verification_address[0]?.img_recieved_through
                      ? row?.addresses?.filter((i) => i.fi_type === "RV")[0]
                          ?.verification_address[0]?.img_recieved_through
                      : "NA"}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.addresses?.filter((i) => i.fi_type === "BV")[0]
                      ?.verification_address[0]?.img_recieved_through
                      ? row?.addresses?.filter((i) => i.fi_type === "BV")[0]
                          ?.verification_address[0]?.img_recieved_through
                      : "NA"}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.addresses?.filter((i) => i.fi_type === "PV")[0]
                      ?.verification_address[0]?.img_recieved_through
                      ? row?.addresses?.filter((i) => i.fi_type === "PV")[0]
                          ?.verification_address[0]?.img_recieved_through
                      : "NA"}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.addresses?.filter((i) => i.fi_type === "PD")[0]
                      ?.verification_address[0]?.img_recieved_through
                      ? row?.addresses?.filter((i) => i.fi_type === "PD")[0]
                          ?.verification_address[0]?.img_recieved_through
                      : "NA"}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row?.addresses?.filter((i) => i.fi_type === "BV")[0]
                      ?.verification_address[0]?.formdata[0]?.other_details[0]
                      ?.employed
                      ? row?.addresses?.filter((i) => i.fi_type === "BV")[0]
                          ?.verification_address[0]?.formdata[0]
                          ?.other_details[0]?.employed
                      : "NA"}{" "}
                  </TableCellDiv>
                </TableRow>
              ))}
          </TableBody>
        </TableMain>
      </MainContainer>
      <TableFooter>
        <DownloadButton title="Excel" handleClick={handleClick} />
        <TablePaginationDemo
          count={props.data.total_pages}
          setPage={props.setPage}
          page={props.page}
          rowsperpage={props.rowsperpage}
          setRowsPerPage={props.setRowsPerPage}
        />
      </TableFooter>

      {taskId && (
        <div style={{ margin: "15px 0px 0px 15px" }}>
          <VendorTrackProgressBar
            setTaskID={setTaskId}
            progress={progress}
            setProgress={setProgress}
            task_id={taskId}
            is_list={true}
            name="vendor_task_report"
          />
        </div>
      )}
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
