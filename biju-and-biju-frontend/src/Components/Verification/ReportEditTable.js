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
import ReportEditModal from "./ReportEditModal";
import { useDispatch, useSelector } from "react-redux";
import { selectIsCollapse } from "../../Slices/commonSlice";
import {
  exportToExcel,
  GetPermission,
  timeDate,
  get_time_from_date,
  extract_date,
  getPageDetails,
  convert_date_format,
} from "../../Functions/utils";
import { reportEditConfirmExcelData } from "../../Functions/helper";
import { Result } from "antd";
import { report_edit_excel } from "../../Api/ReportSubmittedApis";
import ExcelDownloadProgress from "../ProgressBar/ExcelDownloadProgress";
import { get_data } from "../../Store/common/commonSlice";
import { TableHeadSection } from "./DatabaseTable";
import { useMediaQuery } from "react-responsive";
import ReportEditTableAccordion from "./ReportEditTableAccordion";

export default function ReportEditTable(props) {
  const dispatch = useDispatch();
  const isMobileScreen = useMediaQuery({ query: "(max-width: 480px)" });
  const permission = GetPermission("reports_edit", "change");
  const isCollapse = useSelector(selectIsCollapse);
  const [progress, setProgress] = useState(0);
  const [task_id, setTaskID] = useState("");
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

  const getItemValue = (item, name, fi_type = "") => {
    let result = "";
    if (
      name === "rv_tele_done_by" ||
      name === "bv_tele_done_by" ||
      name === "pv_tele_done_by" ||
      name === "pd_tele_done_by"
    ) {
      result = item.addresses
        .filter((p) => p.fi_type === fi_type)[0]
        ?.verification_address[0]?.assign_verification[0]?.employees_names?.tele_by_name?.toLowerCase();
    } else if (
      name === "rv_report_status" ||
      name === "bv_report_status" ||
      name === "pv_report_status" ||
      name === "pd_report_status"
    ) {
      result = item.addresses
        .filter((p) => p.fi_type === fi_type)[0]
        ?.verification_address[0]?.status.toLowerCase();
    } else if (
      name === "rv_submitted_by" ||
      name === "bv_submitted_by" ||
      name === "pv_submitted_by" ||
      name === "pd_submitted_by"
    ) {
      result = item.addresses
        .filter((p) => p.fi_type === fi_type)[0]
        ?.verification_address[0]?.submitted_by_name.toLowerCase();
    } else if (
      name === "rv_img_recieved" ||
      name === "bv_img_recieved" ||
      name === "pv_img_recieved" ||
      name === "pd_img_recieved"
    ) {
      result = item.addresses
        .filter((p) => p.fi_type === fi_type)[0]
        ?.verification_address[0]?.img_recieved_through.toLowerCase();
    } else if (
      name === "rv_district" ||
      name === "bv_district" ||
      name === "pv_district" ||
      name === "pd_district"
    ) {
      result = item.addresses
        .filter((p) => p.fi_type === fi_type)[0]
        ?.adress_district?.name.toLowerCase();
    } else if (
      name === "rv_verification_delay" ||
      name === "bv_verification_delay" ||
      name === "pv_verification_delay" ||
      name === "pd_verification_delay"
    ) {
      result = item.addresses.filter((p) => p.fi_type === fi_type)[0]
        ?.allocation_delay;
    } else if (
      name === "rv_assigned_verification_delay" ||
      name === "bv_assigned_verification_delay" ||
      name === "pv_assigned_verification_delay" ||
      name === "pd_assigned_verification_delay"
    ) {
      result = item.addresses.filter((p) => p.fi_type === fi_type)[0]
        ?.verification_address[0]?.assigned_delay;
    } else if (
      name === "rv_report_recieved" ||
      name === "bv_report_recieved" ||
      name === "pv_report_recieved" ||
      name === "pd_report_recieved"
    ) {
      result = item.addresses.filter((p) => p.fi_type === fi_type)[0]
        ?.verification_address[0]?.ver_recieved;
    } else if (
      name === "rv_submitted_date" ||
      name === "rv_submitted_time" ||
      name === "bv_submitted_date" ||
      name === "bv_submitted_time" ||
      name === "pv_submitted_date" ||
      name === "pv_submitted_time" ||
      name === "pd_submitted_date" ||
      name === "pd_submitted_time"
    ) {
      result = item.addresses.filter((p) => p.fi_type === fi_type)[0]
        ?.verification_address[0]?.submitted_at;
    } else if (name === "application_id") {
      result = item.application_id;
    } else if (name === "vendor") {
      result = item.vendor_name.toLowerCase();
    } else if (name === "product_name") {
      result = item.product_name.toLowerCase();
    } else if (name === "customer_name") {
      result = item.customer_name.toLowerCase();
    } else if (
      name === "applicant_rv_distance" ||
      name === "applicant_bv_distance" ||
      name === "applicant_pv_distance" ||
      name === "applicant_pd_distance"
    ) {
      result = item.addresses.filter((p) => p.fi_type === fi_type)[0]
        ?.verification_address[0]?.assign_verification[0]?.distance;
    } else if (
      name === "vendor_rv_tat" ||
      name === "vendor_bv_tat" ||
      name === "vendor_pv_tat" ||
      name === "vendor_pd_tat"
    ) {
      result = item.addresses.filter((p) => p.fi_type === fi_type)[0]
        ? item.addresses.filter((p) => p.fi_type === fi_type)[0]
            ?.verification_address[0]?.is_TATin === true
          ? "IN"
          : "OUT"
        : "".toLowerCase();
    } else if (
      name === "rv_verification_agent" ||
      name === "bv_verification_agent" ||
      name === "pv_verification_agent" ||
      name === "pd_verification_agent"
    ) {
      result = item.addresses
        .filter((p) => p.fi_type === fi_type)[0]
        ?.verification_address[0]?.assigned_verification_users[0]?.fieldagentname.toLowerCase();
    } else if (name === "fi_date" || name == "fi_time") {
      result = item.addresses.filter(
        (p) => p.fi_type === "PD" || "RV" || "BV" || "PV"
      )[0]?.fi_date_time;
    } else if (
      name === "rv_coordinated_by" ||
      name === "bv_coordinated_by" ||
      name === "pv_coordinated_by" ||
      name === "pd_coordinated_by"
    ) {
      result = item.addresses
        .filter((p) => p.fi_type === fi_type)[0]
        ?.verification_address[0]?.assign_verification[0]?.employees_names?.coordinated_by_name.toLowerCase();
    } else if (
      name === "rv_allocated_by" ||
      name === "bv_allocated_by" ||
      name === "pv_allocated_by" ||
      name === "pd_allocated_by"
    ) {
      result = item.addresses.filter((p) => p.fi_type === fi_type)[0]
        ? item.allocated_by_name
        : "".toLowerCase();
    } else if (
      name === "rv_written_by" ||
      name === "bv_written_by" ||
      name === "pv_written_by" ||
      name === "pd_written_by"
    ) {
      result = item.addresses
        .filter((p) => p.fi_type === fi_type)[0]
        ?.verification_address[0]?.assign_verification[0]?.employees_names?.written_by_name.toLowerCase();
    } else if (
      name === "rv_reported_by" ||
      name === "bv_reported_by" ||
      name === "pv_reported_by" ||
      name === "pd_reported_by"
    ) {
      result = item.addresses
        .filter((p) => p.fi_type === fi_type)[0]
        ?.verification_address[0]?.assign_verification[0]?.employees_names?.reported_by_name.toLowerCase();
    } else if (
      name === "rv_billable" ||
      name === "bv_billable" ||
      name === "pv_billable" ||
      name === "pd_billable"
    ) {
      result = item.addresses.filter((p) => p.fi_type === fi_type)[0]
        ? item.addresses.filter((p) => p.fi_type === fi_type)[0]
            ?.verification_address[0]?.assign_verification[0]?.billable
          ? "Yes"
          : "No"
        : "";
    } else if (
      name === "rv_payable" ||
      name === "bv_payable" ||
      name === "pv_payable" ||
      name === "pd_payable"
    ) {
      result = item.addresses.filter((p) => p.fi_type === fi_type)[0]
        ? item.addresses.filter((p) => p.fi_type === fi_type)[0]
            ?.verification_address[0]?.assign_verification[0]?.payable
          ? "Yes"
          : "No"
        : "";
    } else if (
      name === "rv_billing_location" ||
      name === "bv_billing_location" ||
      name === "pv_billing_location" ||
      name === "pd_billing_location"
    ) {
      result = item.addresses
        .filter((p) => p.fi_type === fi_type)[0]
        ?.verification_address[0]?.selected_billing_location?.name.toLowerCase();
    } else if (
      name === "rv_tele_verification" ||
      name === "bv_tele_verification" ||
      name === "pv_tele_verification" ||
      name === "pd_tele_verification"
    ) {
      result = item.addresses.filter((p) => p.fi_type === fi_type)[0]
        ? item.addresses.filter((p) => p.fi_type === fi_type)[0]
            ?.verification_address[0]?.assign_verification[0]?.tele_verification
          ? "Yes"
          : "No"
        : "";
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

  const handleClick = () => {
    // exportToExcel(reportEditConfirmExcelData(props.data.results),"report_edit")
    let url = report_edit_excel + "?";
    let from_date = "";
    let to_date = "";
    if (props?.state?.searchValue) {
      url = url + `search=${props?.state?.searchValue}`;
    }
    if (props?.state?.from_date) {
      from_date = convert_date_format(props?.state?.from_date);
    }
    if (props?.state?.to_date) {
      to_date = convert_date_format(props?.state?.to_date);
    }

    if (props?.state?.vendor && props?.state?.vendor !== "all") {
      url = url + `&vendor__id=${props?.state?.vendor}`;
    }

    if (from_date) {
      url = url + `&addresses__fi_date_time__date__gte=${from_date}`;
    }

    if (to_date) {
      url = url + `&addresses__fi_date_time__date__lte=${to_date}`;
    }

    if (props?.state?.agent && props?.state?.agent !== "all") {
      url =
        url +
        `&addresses__verification_address__assigned_verification_users__field_agent__id=${props?.state?.agent}`;
    }
    if (props?.state?.location && props?.state?.location !== "all") {
      url =
        url +
        `&addresses__verification_address__selected_billing_location__id=${props?.state?.location}`;
    }

    if (
      props?.state?.address_district ||
      props?.state?.fi_type ||
      props?.state?.vendorValue ||
      props?.state?.productValue
    ) {
      url =
        url +
        `?addresses__adress_district__id=${
          props?.state?.address_district
        }&addresses__fi_type=${
          props?.state?.fi_type
        }&vendor__employee_name=${encodeURIComponent(
          props?.state?.vendorValue
            ? props?.state?.vendors.filter(
                (item) => item.id == props?.state?.vendorValue
              )[0]?.employee_name
            : ""
        )}&product__product_name=${
          props?.state?.productValue
            ? props?.state?.products.filter(
                (item) => item.id == props?.state?.productValue
              )[0]?.product_name
            : ""
        }`;
    }

    dispatch(get_data(url))
      .then((res) => {
        // console.log('login res => ',res);
        const result = res?.payload;
        if (res?.payload?.status === 200) {
          setTaskID(result?.data?.taskid);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <>
      {isMobileScreen ? (
        <ReportEditTableAccordion
          data={props?.data}
          handleClick={handleClick}
          setPage={props.setPage}
          page={props.page}
          rowsperpage={props.rowsperpage}
          setRowsPerPage={props.setRowsPerPage}
          setState={props.setState}
          snackbarStatus={props.snackbarStatus}
          setSnackbarStatus={props.setSnackbarStatus}
        />
      ) : (
        <>
          <MainContainer component={Paper} iscollapse={isCollapse.toString()}>
            <TableMain aria-label="sticky table">
              <TableHeadSection>
                <TableRow>
                  <TableCellDiv className="head">
                    <THDiv>
                      <p>Application ID</p>{" "}
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
                      <p>Vendor </p>
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
                        <img
                          src={require("../../Assets/images/sortIcon.png")}
                          alt=""
                        />
                      </SortIcon>
                    </THDiv>{" "}
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv>
                      <p>
                        Product <br /> Name
                      </p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "product_name",
                            "text",
                            "product_name_ascending",
                            "product_name_decsending",
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
                            "customer_name",
                            "text",
                            "customer_name_ascending",
                            "customer_name_decsending",
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
                        Residence <br /> Address
                      </p>
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv className="long-width">
                      <p>
                        RV Verification <br /> Agent
                      </p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "rv_verification_agent",
                            "text",
                            "rv_verification_agent_ascending",
                            "rv_verification_agent_decsending",
                            "RV"
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
                      <p>
                        Applicant <br /> RV Distance
                      </p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "applicant_rv_distance",
                            "number",
                            "applicant_rv_distance_ascending",
                            "applicant_rv_distance_decsending",
                            "RV"
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
                      <p>
                        Vendor <br /> RV TAT
                      </p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "vendor_rv_tat",
                            "text",
                            "vendor_rv_tat_ascending",
                            "vendor_rv_tat_decsending",
                            "RV"
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
                        Office <br /> Address
                      </p>
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv className="long-width">
                      <p>
                        BV Verification <br /> Agent
                      </p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "bv_verification_agent",
                            "text",
                            "bv_verification_agent_ascending",
                            "bv_verification_agent_decsending",
                            "BV"
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
                      <p>
                        Applicant <br /> BV Distance
                      </p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "applicant_bv_distance",
                            "number",
                            "applicant_bv_distance_ascending",
                            "applicant_bv_distance_decsending",
                            "BV"
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
                      <p>
                        Vendor <br /> BV TAT
                      </p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "vendor_bv_tat",
                            "text",
                            "vendor_bv_tat_ascending",
                            "vendor_bv_tat_decsending",
                            "BV"
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
                        Permanent <br /> Address
                      </p>
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv className="long-width">
                      <p>
                        PV Verification <br /> Agent
                      </p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "pv_verification_agent",
                            "text",
                            "pv_verification_agent_ascending",
                            "pv_verification_agent_decsending",
                            "PV"
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
                      <p>
                        Applicant PV <br /> Distance
                      </p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "applicant_pv_distance",
                            "number",
                            "applicant_pv_distance_ascending",
                            "applicant_pv_distance_decsending",
                            "PV"
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
                      <p>
                        Vendor PV <br /> TAT
                      </p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "vendor_pv_tat",
                            "text",
                            "vendor_pv_tat_ascending",
                            "vendor_pv_tat_decsending",
                            "PV"
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
                      <p>
                        PD <br /> Address
                      </p>
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv className="long-width">
                      <p>
                        PD Verification
                        <br /> Agent
                      </p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "pd_verification_agent",
                            "text",
                            "pd_verification_agent_ascending",
                            "pd_verification_agent_decsending",
                            "PD"
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
                    <THDiv className="long-width">
                      <p>
                        Applicant PD
                        <br /> Distance
                      </p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "applicant_pd_distance",
                            "number",
                            "applicant_pd_distance_ascending",
                            "applicant_pd_distance_decsending",
                            "PD"
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
                      <p>
                        Vendor PD
                        <br /> TAT
                      </p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "vendor_pd_tat",
                            "text",
                            "vendor_pd_tat_ascending",
                            "vendor_pd_tat_decsending",
                            "PD"
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
                    <THDiv className="long-width">
                      <p>FI Date</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "fi_date",
                            "date",
                            "fi_date_ascending",
                            "fi_date_decsending",
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
                      <p>FI Time</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "fi_time",
                            "date_time",
                            "fi_time_ascending",
                            "fi_time_decsending",
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
                      <p>RV Coordinated By</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "rv_coordinated_by",
                            "text",
                            "rv_coordinated_by_ascending",
                            "rv_coordinated_by_decsending",
                            "RV"
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
                      <p>RV Allocated By</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "rv_allocated_by",
                            "text",
                            "rv_allocated_by_ascending",
                            "rv_allocated_by_decsending",
                            "RV"
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
                      <p>RV Written By</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "rv_written_by",
                            "text",
                            "rv_written_by_ascending",
                            "rv_written_by_decsending",
                            "RV"
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
                      <p>RV Reported By</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "rv_reported_by",
                            "text",
                            "rv_reported_by_ascending",
                            "rv_reported_by_decsending",
                            "RV"
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
                    <THDiv className="long-width">
                      <p>BV Coordinated By</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "bv_coordinated_by",
                            "text",
                            "bv_coordinated_by_ascending",
                            "bv_coordinated_by_decsending",
                            "BV"
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
                      <p>BV Allocated By</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "bv_allocated_by",
                            "text",
                            "bv_allocated_by_ascending",
                            "bv_allocated_by_decsending",
                            "BV"
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
                      <p>BV Written By</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "bv_written_by",
                            "text",
                            "bv_written_by_ascending",
                            "bv_written_by_decsending",
                            "BV"
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
                      <p>BV Reported By</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "bv_reported_by",
                            "text",
                            "bv_reported_by_ascending",
                            "bv_reported_by_decsending",
                            "BV"
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
                    <THDiv className="long-width">
                      <p>PV Coordinated By</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "pv_coordinated_by",
                            "text",
                            "pv_coordinated_by_ascending",
                            "pv_coordinated_by_decsending",
                            "PV"
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
                      <p>PV Allocated By</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "pv_allocated_by",
                            "text",
                            "pv_allocated_by_ascending",
                            "pv_allocated_by_decsending",
                            "PV"
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
                      <p>PV Written By</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "pv_written_by",
                            "text",
                            "pv_written_by_ascending",
                            "pv_written_by_decsending",
                            "PV"
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
                      <p>PV Reported By</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "pv_reported_by",
                            "text",
                            "pv_reported_by_ascending",
                            "pv_reported_by_decsending",
                            "PV"
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
                    <THDiv className="long-width">
                      <p>PD Coordinated By</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "pd_coordinated_by",
                            "text",
                            "pd_coordinated_by_ascending",
                            "pd_coordinated_by_decsending",
                            "PD"
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
                      <p>PD Allocated By</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "pd_allocated_by",
                            "text",
                            "pd_allocated_by_ascending",
                            "pd_allocated_by_decsending",
                            "PD"
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
                      <p>PD Written By</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "pd_written_by",
                            "text",
                            "pd_written_by_ascending",
                            "pd_written_by_decsending",
                            "PD"
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
                      <p>PD Reported By</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "pd_reported_by",
                            "text",
                            "pd_reported_by_ascending",
                            "pd_reported_by_decsending",
                            "PD"
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
                      <p>RV Billable</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "rv_billable",
                            "text",
                            "rv_billable_ascending",
                            "rv_billable_decsending",
                            "RV"
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
                      <p>BV Billable</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "bv_billable",
                            "text",
                            "bv_billable_ascending",
                            "bv_billable_decsending",
                            "BV"
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
                      <p>PV Billable</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "pv_billable",
                            "text",
                            "pv_billable_ascending",
                            "pv_billable_decsending",
                            "PV"
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
                      <p>PD Billable</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "pd_billable",
                            "text",
                            "pd_billable_ascending",
                            "pd_billable_decsending",
                            "PD"
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
                    <THDiv className="long-width">
                      <p>
                        RV Non-Billable
                        <br /> Reason
                      </p>{" "}
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv className="long-width">
                      <p>
                        BV Non-Billable
                        <br /> Reason
                      </p>{" "}
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv className="long-width">
                      <p>
                        PV Non-Billable
                        <br /> Reason
                      </p>{" "}
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv className="long-width">
                      <p>
                        PD Non-Billable
                        <br /> Reason
                      </p>{" "}
                    </THDiv>
                  </TableCellDiv>

                  <TableCellDiv className="head">
                    <THDiv>
                      <p>RV Payable</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "rv_payable",
                            "text",
                            "rv_payable_ascending",
                            "rv_payable_decsending",
                            "RV"
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
                    <THDiv>
                      <p>BV Payable</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "bv_payable",
                            "text",
                            "bv_payable_ascending",
                            "bv_payable_decsending",
                            "BV"
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
                    <THDiv>
                      <p>PV Payable</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "pv_payable",
                            "text",
                            "pv_payable_ascending",
                            "pv_payable_decsending",
                            "PV"
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
                    <THDiv>
                      <p>PD Payable</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "pd_payable",
                            "text",
                            "pd_payable_ascending",
                            "pd_payable_decsending",
                            "PD"
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
                        RV Non-Payable
                        <br /> Reason
                      </p>{" "}
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv className="long-width">
                      <p>
                        BV Non-Payable
                        <br /> Reason
                      </p>{" "}
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv className="long-width">
                      <p>
                        PV Non-Payable
                        <br /> Reason
                      </p>{" "}
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv className="long-width">
                      <p>
                        PD Non-Payable
                        <br /> Reason
                      </p>{" "}
                    </THDiv>
                  </TableCellDiv>

                  <TableCellDiv className="head">
                    <THDiv className="long-width">
                      <p>Billing Location RV</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "rv_billing_location",
                            "text",
                            "rv_billing_location_ascending",
                            "rv_billing_location_decsending",
                            "RV"
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
                    <THDiv className="long-width">
                      <p>Billing Location BV</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "bv_billing_location",
                            "text",
                            "bv_billing_location_ascending",
                            "bv_billing_location_decsending",
                            "BV"
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
                    <THDiv className="long-width">
                      <p>Billing Location PV</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "pv_billing_location",
                            "text",
                            "pv_billing_location_ascending",
                            "pv_billing_location_decsending",
                            "PV"
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
                    <THDiv className="long-width">
                      <p>Billing Location PD</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "pd_billing_location",
                            "text",
                            "pd_billing_location_ascending",
                            "pd_billing_location_decsending",
                            "PD"
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
                    <THDiv className="long-width">
                      <p>RV Tele Verification</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "rv_tele_verification",
                            "text",
                            "rv_tele_verification_ascending",
                            "rv_tele_verification_decsending",
                            "RV"
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
                    <THDiv className="long-width">
                      <p>BV Tele Verification</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "bv_tele_verification",
                            "text",
                            "bv_tele_verification_ascending",
                            "bv_tele_verification_decsending",
                            "BV"
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
                    <THDiv className="long-width">
                      <p>PV Tele Verification</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "pv_tele_verification",
                            "text",
                            "pv_tele_verification_ascending",
                            "pv_tele_verification_decsending",
                            "PV"
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
                    <THDiv className="long-width">
                      <p>PD Tele Verification</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "pd_tele_verification",
                            "text",
                            "pd_tele_verification_ascending",
                            "pd_tele_verification_decsending",
                            "PD"
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
                      <p>RV Tele Done By</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "rv_tele_done_by",
                            "text",
                            "rv_tele_done_by_ascending",
                            "rv_tele_done_by_decsending",
                            "RV"
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
                    <THDiv>
                      <p>BV Tele Done By</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "bv_tele_done_by",
                            "text",
                            "bv_tele_done_by_ascending",
                            "bv_tele_done_by_decsending",
                            "BV"
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
                    <THDiv>
                      <p>PV Tele Done By</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "pv_tele_done_by",
                            "text",
                            "pv_tele_done_by_ascending",
                            "pv_tele_done_by_decsending",
                            "PV"
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
                    <THDiv>
                      <p>PD Tele Done By</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "pd_tele_done_by",
                            "text",
                            "pd_tele_done_by_ascending",
                            "pd_tele_done_by_decsending",
                            "PD"
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
                    <THDiv>
                      <p>RV Report Status</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "rv_report_status",
                            "text",
                            "rv_report_status_ascending",
                            "rv_report_status_decsending",
                            "RV"
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
                    <THDiv>
                      <p>BV Report Status</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "bv_report_status",
                            "text",
                            "bv_report_status_ascending",
                            "bv_report_status_decsending",
                            "BV"
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
                    <THDiv>
                      <p>PV Report Status</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "pv_report_status",
                            "text",
                            "pv_report_status_ascending",
                            "pv_report_status_decsending",
                            "PV"
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
                    <THDiv>
                      <p>PD Report Status</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "pd_report_status",
                            "text",
                            "pd_report_status_ascending",
                            "pd_report_status_decsending",
                            "PD"
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
                      <p>RV Negative Reason</p>
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv className="long-width">
                      <p>BV Negative Reason</p>
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv className="long-width">
                      <p>PV Negative Reason</p>
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv className="long-width">
                      <p>PD Negative Reason</p>
                    </THDiv>
                  </TableCellDiv>

                  <TableCellDiv className="head">
                    <THDiv>
                      <p>RV Remark</p>
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv>
                      <p>BV Remark</p>
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv>
                      <p>PV Remark</p>
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv>
                      <p>PD Remark</p>
                    </THDiv>
                  </TableCellDiv>

                  <TableCellDiv className="head">
                    <THDiv>
                      <p>RV Submitted By</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "rv_submitted_by",
                            "text",
                            "rv_submitted_by_ascending",
                            "rv_submitted_by_decsending",
                            "RV"
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
                    <THDiv>
                      <p>BV Submitted By</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "bv_submitted_by",
                            "text",
                            "bv_submitted_by_ascending",
                            "bv_submitted_by_decsending",
                            "BV"
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
                    <THDiv>
                      <p>PV Submitted By</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "pv_submitted_by",
                            "text",
                            "pv_submitted_by_ascending",
                            "pv_submitted_by_decsending",
                            "PV"
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
                    <THDiv>
                      <p>PD Submitted By</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "pd_submitted_by",
                            "text",
                            "pd_submitted_by_ascending",
                            "pd_submitted_by_decsending",
                            "PD"
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
                      <p>RV Img Received</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "rv_img_recieved",
                            "text",
                            "rv_img_recieved_ascending",
                            "rv_img_recieved_decsending",
                            "RV"
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
                      <p>BV Img Received</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "bv_img_recieved",
                            "text",
                            "bv_img_recieved_ascending",
                            "bv_img_recieved_decsending",
                            "BV"
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
                      <p>PV Img Received</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "pv_img_recieved",
                            "text",
                            "pv_img_recieved_ascending",
                            "pv_img_recieved_decsending",
                            "PV"
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
                      <p>PD Img Received</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "pd_img_recieved",
                            "text",
                            "pd_img_recieved_ascending",
                            "pd_img_recieved_decsending",
                            "PD"
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
                      <p>RV District</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "rv_district",
                            "text",
                            "rv_district_ascending",
                            "rv_district_decsending",
                            "RV"
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
                      <p>BV District</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "bv_district",
                            "text",
                            "bv_district_ascending",
                            "bv_district_decsending",
                            "BV"
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
                      <p>PV District</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "pv_district",
                            "text",
                            "pv_district_ascending",
                            "pv_district_decsending",
                            "PV"
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
                      <p>PD District</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "pd_district",
                            "text",
                            "pd_district_ascending",
                            "pd_district_decsending",
                            "PD"
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
                    <THDiv className="wid-200">
                      <p>RV Verification Delay</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "rv_verification_delay",
                            "delay",
                            "rv_verification_delay_ascending",
                            "rv_verification_delay_decsending",
                            "RV"
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
                    <THDiv className="wid-200">
                      <p>BV Verification Delay</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "bv_verification_delay",
                            "delay",
                            "bv_verification_delay_ascending",
                            "bv_verification_delay_decsending",
                            "BV"
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
                    <THDiv className="wid-200">
                      <p>PV Verification Delay</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "pv_verification_delay",
                            "delay",
                            "pv_verification_delay_ascending",
                            "pv_verification_delay_decsending",
                            "PV"
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
                    <THDiv className="wid-200">
                      <p>PD Verification Delay</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "pd_verification_delay",
                            "delay",
                            "pd_verification_delay_ascending",
                            "pd_verification_delay_decsending",
                            "PD"
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
                    <THDiv className="wid-200">
                      <p>
                        Assigned Verification
                        <br /> Delay RV
                      </p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "rv_assigned_verification_delay",
                            "delay",
                            "rv_assigned_verification_delay_ascending",
                            "rv_assigned_verification_delay_decsending",
                            "RV"
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
                    <THDiv className="wid-200">
                      <p>
                        Assigned Verification
                        <br /> Delay BV
                      </p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "bv_assigned_verification_delay",
                            "delay",
                            "bv_assigned_verification_delay_ascending",
                            "bv_assigned_verification_delay_decsending",
                            "BV"
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
                    <THDiv className="wid-200">
                      <p>
                        Assigned Verification
                        <br /> Delay PV
                      </p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "pv_assigned_verification_delay",
                            "delay",
                            "pv_assigned_verification_delay_ascending",
                            "pv_assigned_verification_delay_decsending",
                            "PV"
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
                    <THDiv className="wid-200">
                      <p>
                        Assigned Verification
                        <br /> Delay PD
                      </p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "pd_assigned_verification_delay",
                            "delay",
                            "pd_assigned_verification_delay_ascending",
                            "pd_assigned_verification_delay_decsending",
                            "PD"
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
                      <p>RV Report Received</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "rv_report_recieved",
                            "date_time",
                            "rv_report_recieved_ascending",
                            "rv_report_recieved_decsending",
                            "RV"
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
                      <p>BV Report Received</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "bv_report_recieved",
                            "date_time",
                            "bv_report_recieved_ascending",
                            "bv_report_recieved_decsending",
                            "BV"
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
                      <p>PV Report Received</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "pv_report_recieved",
                            "date_time",
                            "pv_report_recieved_ascending",
                            "pv_report_recieved_decsending",
                            "PV"
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
                      <p>PD Report Received</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "pd_report_recieved",
                            "date_time",
                            "pd_report_recieved_ascending",
                            "pd_report_recieved_decsending",
                            "PD"
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
                      <p>RV Report Submitted Date</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "rv_submitted_date",
                            "date_time",
                            "rv_submitted_date_ascending",
                            "rv_submitted_date_decsending",
                            "RV"
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
                      <p>RV Report Submitted Time</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "rv_submitted_time",
                            "date_time",
                            "rv_submitted_time_ascending",
                            "rv_submitted_time_decsending",
                            "RV"
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
                      <p>BV Report Submitted Date</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "bv_submitted_date",
                            "date_time",
                            "bv_submitted_date_ascending",
                            "bv_submitted_date_decsending",
                            "BV"
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
                      <p>BV Report Submitted Time</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "bv_submitted_time",
                            "date_time",
                            "bv_submitted_time_ascending",
                            "bv_submitted_time_decsending",
                            "BV"
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
                      <p>PV Report Submitted Date</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "pv_submitted_date",
                            "date_time",
                            "pv_submitted_date_ascending",
                            "pv_submitted_date_decsending",
                            "PV"
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
                      <p>PV Report Submitted Time</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "pv_submitted_time",
                            "date_time",
                            "pv_submitted_time_ascending",
                            "pv_submitted_time_decsending",
                            "PV"
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
                      <p>PD Report Submitted Date</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "pd_submitted_date",
                            "date_time",
                            "pd_submitted_date_ascending",
                            "pd_submitted_date_decsending",
                            "PD"
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
                      <p>PD Report Submitted Time</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "pd_submitted_time",
                            "date_time",
                            "pd_submitted_time_ascending",
                            "pd_submitted_time_decsending",
                            "PD"
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
                </TableRow>
              </TableHeadSection>
              <TableBody>
                {props?.data?.results?.map((row, index) => {
                  let rv = row.addresses.filter((p) => p.fi_type === "RV")[0];
                  let pv = row.addresses.filter((p) => p.fi_type === "PV")[0];
                  let bv = row.addresses.filter((p) => p.fi_type === "BV")[0];
                  let pd = row.addresses.filter((p) => p.fi_type === "PD")[0];
                  return (
                    <TableRow
                      key={row.application_id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCellDiv className="item">
                        <p>{row.application_id}</p>
                        {permission
                          ? row.can_edit && (
                              <ReportEditModal
                                data={row}
                                setState={props.setState}
                                snackbarStatus={props.snackbarStatus}
                                setSnackbarStatus={props.setSnackbarStatus}
                              />
                            )
                          : null}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {row.vendor_name}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {row.product_name}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {row.customer_name}
                      </TableCellDiv>

                      <TableCellDiv className="item">{rv?.adress}</TableCellDiv>
                      <TableCellDiv className="item">
                        {
                          rv?.verification_address[0]?.assigned_verification_users.filter(
                            (i) => i.status == true
                          )[0]?.fieldagentname
                        }
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {
                          rv?.verification_address[0]?.assign_verification[0]
                            ?.distance
                        }
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {rv
                          ? rv?.verification_address[0]?.is_TATin === true
                            ? "IN"
                            : "OUT"
                          : ""}
                      </TableCellDiv>

                      <TableCellDiv className="item">{bv?.adress}</TableCellDiv>
                      <TableCellDiv className="item">
                        {
                          bv?.verification_address[0]?.assigned_verification_users.filter(
                            (i) => i.status == true
                          )[0]?.fieldagentname
                        }
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {
                          bv?.verification_address[0]?.assign_verification[0]
                            ?.distance
                        }
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {bv
                          ? bv?.verification_address[0]?.is_TATin === true
                            ? "IN"
                            : "OUT"
                          : ""}
                      </TableCellDiv>

                      <TableCellDiv className="item">{pv?.adress}</TableCellDiv>
                      <TableCellDiv className="item">
                        {
                          pv?.verification_address[0]?.assigned_verification_users.filter(
                            (i) => i.status == true
                          )[0]?.fieldagentname
                        }
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {
                          pv?.verification_address[0]?.assign_verification[0]
                            ?.distance
                        }
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {pv
                          ? pv?.verification_address[0]?.is_TATin === true
                            ? "IN"
                            : "OUT"
                          : ""}
                      </TableCellDiv>

                      <TableCellDiv className="item">{pd?.adress}</TableCellDiv>
                      <TableCellDiv className="item">
                        {
                          pd?.verification_address[0]?.assigned_verification_users.filter(
                            (i) => i.status == true
                          )[0]?.fieldagentname
                        }
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {
                          pd?.verification_address[0]?.assign_verification[0]
                            ?.distance
                        }
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {pd
                          ? pd?.verification_address[0]?.is_TATin === true
                            ? "IN"
                            : "OUT"
                          : ""}
                      </TableCellDiv>

                      <TableCellDiv className="item">
                        {row.addresses.filter(
                          (p) => p.fi_type === "PD" || "RV" || "BV" || "PV"
                        )[0]?.fi_date_time
                          ? extract_date(
                              row.addresses.filter(
                                (p) =>
                                  p.fi_type === "PD" || "RV" || "BV" || "PV"
                              )[0]?.fi_date_time
                            )
                          : "NA"}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {row.addresses.filter(
                          (p) => p.fi_type === "PD" || "RV" || "BV" || "PV"
                        )[0]?.fi_date_time
                          ? get_time_from_date(
                              row.addresses.filter(
                                (p) =>
                                  p.fi_type === "PD" || "RV" || "BV" || "PV"
                              )[0]?.fi_date_time
                            )
                          : "NA"}
                      </TableCellDiv>

                      <TableCellDiv className="item">
                        {
                          rv?.verification_address[0]?.assign_verification[0]
                            ?.employees_names?.coordinated_by_name
                        }
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {rv ? row.allocated_by_name : ""}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {
                          rv?.verification_address[0]?.assign_verification[0]
                            ?.employees_names?.written_by_name
                        }
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {
                          rv?.verification_address[0]?.assign_verification[0]
                            ?.employees_names?.reported_by_name
                        }
                      </TableCellDiv>

                      <TableCellDiv className="item">
                        {
                          bv?.verification_address[0]?.assign_verification[0]
                            ?.employees_names?.coordinated_by_name
                        }
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {bv ? row.allocated_by_name : ""}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {
                          bv?.verification_address[0]?.assign_verification[0]
                            ?.employees_names?.written_by_name
                        }
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {
                          bv?.verification_address[0]?.assign_verification[0]
                            ?.employees_names?.reported_by_name
                        }
                      </TableCellDiv>

                      <TableCellDiv className="item">
                        {
                          pv?.verification_address[0]?.assign_verification[0]
                            ?.employees_names?.coordinated_by_name
                        }
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {pv ? row.allocated_by_name : ""}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {
                          pv?.verification_address[0]?.assign_verification[0]
                            ?.employees_names?.written_by_name
                        }
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {
                          pv?.verification_address[0]?.assign_verification[0]
                            ?.employees_names?.reported_by_name
                        }
                      </TableCellDiv>

                      <TableCellDiv className="item">
                        {
                          pd?.verification_address[0]?.assign_verification[0]
                            ?.employees_names?.coordinated_by_name
                        }
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {pd ? row.allocated_by_name : ""}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {
                          pd?.verification_address[0]?.assign_verification[0]
                            ?.employees_names?.written_by_name
                        }
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {
                          pd?.verification_address[0]?.assign_verification[0]
                            ?.employees_names?.reported_by_name
                        }
                      </TableCellDiv>

                      <TableCellDiv className="item">
                        {rv
                          ? rv?.verification_address[0]?.assign_verification[0]
                              ?.billable
                            ? "Yes"
                            : "No"
                          : ""}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {bv
                          ? bv?.verification_address[0]?.assign_verification[0]
                              ?.billable
                            ? "Yes"
                            : "No"
                          : ""}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {pv
                          ? pv?.verification_address[0]?.assign_verification[0]
                              ?.billable
                            ? "Yes"
                            : "No"
                          : ""}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {pd
                          ? pd?.verification_address[0]?.assign_verification[0]
                              ?.billable
                            ? "Yes"
                            : "No"
                          : ""}
                      </TableCellDiv>

                      <TableCellDiv className="item">
                        {rv?.verification_address[0]?.assign_verification[0]
                          ?.billable
                          ? ""
                          : rv?.verification_address[0]?.assign_verification[0]
                              ?.billable_reason}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {bv?.verification_address[0]?.assign_verification[0]
                          ?.billable
                          ? ""
                          : bv?.verification_address[0]?.assign_verification[0]
                              ?.billable_reason}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {pv?.verification_address[0]?.assign_verification[0]
                          ?.billable
                          ? ""
                          : pv?.verification_address[0]?.assign_verification[0]
                              ?.billable_reason}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {pd?.verification_address[0]?.assign_verification[0]
                          ?.billable
                          ? ""
                          : pd?.verification_address[0]?.assign_verification[0]
                              ?.billable_reason}
                      </TableCellDiv>

                      <TableCellDiv className="item">
                        {rv
                          ? rv?.verification_address[0]?.assign_verification[0]
                              ?.payable
                            ? "Yes"
                            : "No"
                          : ""}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {bv
                          ? bv?.verification_address[0]?.assign_verification[0]
                              ?.payable
                            ? "Yes"
                            : "No"
                          : ""}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {pv
                          ? pv?.verification_address[0]?.assign_verification[0]
                              ?.payable
                            ? "Yes"
                            : "No"
                          : ""}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {pd
                          ? pd?.verification_address[0]?.assign_verification[0]
                              ?.payable
                            ? "Yes"
                            : "No"
                          : ""}
                      </TableCellDiv>

                      <TableCellDiv className="item">
                        {rv?.verification_address[0]?.assign_verification[0]
                          ?.payable
                          ? ""
                          : rv?.verification_address[0]?.assign_verification[0]
                              ?.payable_reason}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {bv?.verification_address[0]?.assign_verification[0]
                          ?.payable
                          ? ""
                          : bv?.verification_address[0]?.assign_verification[0]
                              ?.payable_reason}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {pv?.verification_address[0]?.assign_verification[0]
                          ?.payable
                          ? ""
                          : pv?.verification_address[0]?.assign_verification[0]
                              ?.payable_reason}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {pd?.verification_address[0]?.assign_verification[0]
                          ?.payable
                          ? ""
                          : pd?.verification_address[0]?.assign_verification[0]
                              ?.payable_reason}
                      </TableCellDiv>

                      <TableCellDiv className="item">
                        {
                          rv?.verification_address[0]?.selected_billing_location
                            ?.name
                        }
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {
                          bv?.verification_address[0]?.selected_billing_location
                            ?.name
                        }
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {
                          pv?.verification_address[0]?.selected_billing_location
                            ?.name
                        }
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {
                          pd?.verification_address[0]?.selected_billing_location
                            ?.name
                        }
                      </TableCellDiv>

                      <TableCellDiv className="item">
                        {rv
                          ? rv?.verification_address[0]?.assign_verification[0]
                              ?.tele_verification
                            ? "Yes"
                            : "No"
                          : ""}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {bv
                          ? bv?.verification_address[0]?.assign_verification[0]
                              ?.tele_verification
                            ? "Yes"
                            : "No"
                          : ""}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {pv
                          ? pv?.verification_address[0]?.assign_verification[0]
                              ?.tele_verification
                            ? "Yes"
                            : "No"
                          : ""}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {pd
                          ? pd?.verification_address[0]?.assign_verification[0]
                              ?.tele_verification
                            ? "Yes"
                            : "No"
                          : ""}
                      </TableCellDiv>

                      <TableCellDiv className="item">
                        {
                          rv?.verification_address[0]?.assign_verification[0]
                            ?.employees_names?.tele_by_name
                        }
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {
                          bv?.verification_address[0]?.assign_verification[0]
                            ?.employees_names?.tele_by_name
                        }
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {
                          pv?.verification_address[0]?.assign_verification[0]
                            ?.employees_names?.tele_by_name
                        }
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {
                          pd?.verification_address[0]?.assign_verification[0]
                            ?.employees_names?.tele_by_name
                        }
                      </TableCellDiv>

                      <TableCellDiv className="item">
                        {rv?.verification_address[0]?.status}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {bv?.verification_address[0]?.status}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {pv?.verification_address[0]?.status}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {pd?.verification_address[0]?.status}
                      </TableCellDiv>

                      <TableCellDiv className="item">
                        {rv?.verification_address[0]?.negative_reason?.comment}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {bv?.verification_address[0]?.negative_reason?.comment}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {pv?.verification_address[0]?.negative_reason?.comment}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {pd?.verification_address[0]?.negative_reason?.comment}
                      </TableCellDiv>

                      <TableCellDiv className="item">
                        {
                          rv?.verification_address[0]?.assign_verification[0]
                            ?.remarks
                        }
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {
                          bv?.verification_address[0]?.assign_verification[0]
                            ?.remarks
                        }
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {
                          pv?.verification_address[0]?.assign_verification[0]
                            ?.remarks
                        }
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {
                          pd?.verification_address[0]?.assign_verification[0]
                            ?.remarks
                        }
                      </TableCellDiv>

                      <TableCellDiv className="item">
                        {rv?.verification_address[0]?.submitted_by_name}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {bv?.verification_address[0]?.submitted_by_name}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {pv?.verification_address[0]?.submitted_by_name}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {pd?.verification_address[0]?.submitted_by_name}
                      </TableCellDiv>

                      <TableCellDiv className="item">
                        {rv?.verification_address[0]?.img_recieved_through}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {bv?.verification_address[0]?.img_recieved_through}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {pv?.verification_address[0]?.img_recieved_through}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {pd?.verification_address[0]?.img_recieved_through}
                      </TableCellDiv>

                      <TableCellDiv className="item">
                        {rv?.adress_district?.name}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {bv?.adress_district?.name}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {pv?.adress_district?.name}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {pd?.adress_district?.name}
                      </TableCellDiv>

                      <TableCellDiv className="item">
                        {rv?.allocation_delay}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {bv?.allocation_delay}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {pv?.allocation_delay}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {pd?.allocation_delay}
                      </TableCellDiv>

                      <TableCellDiv className="item">
                        {rv?.verification_address[0]?.assigned_delay}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {bv?.verification_address[0]?.assigned_delay}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {pv?.verification_address[0]?.assigned_delay}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {pd?.verification_address[0]?.assigned_delay}
                      </TableCellDiv>

                      <TableCellDiv className="item">
                        {rv?.verification_address[0]?.ver_recieved
                          ? timeDate(rv?.verification_address[0]?.ver_recieved)
                          : ""}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {bv?.verification_address[0]?.ver_recieved
                          ? timeDate(bv?.verification_address[0]?.ver_recieved)
                          : ""}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {pv?.verification_address[0]?.ver_recieved
                          ? timeDate(pv?.verification_address[0]?.ver_recieved)
                          : ""}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {pd?.verification_address[0]?.ver_recieved
                          ? timeDate(pd?.verification_address[0]?.ver_recieved)
                          : ""}
                      </TableCellDiv>

                      <TableCellDiv className="item">
                        {rv?.verification_address[0]?.submitted_at
                          ? extract_date(
                              rv?.verification_address[0]?.submitted_at
                            )
                          : ""}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {rv?.verification_address[0]?.submitted_at
                          ? get_time_from_date(
                              rv?.verification_address[0]?.submitted_at
                            )
                          : ""}
                      </TableCellDiv>

                      <TableCellDiv className="item">
                        {bv?.verification_address[0]?.submitted_at
                          ? extract_date(
                              bv?.verification_address[0]?.submitted_at
                            )
                          : ""}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {bv?.verification_address[0]?.submitted_at
                          ? get_time_from_date(
                              bv?.verification_address[0]?.submitted_at
                            )
                          : ""}
                      </TableCellDiv>

                      <TableCellDiv className="item">
                        {pv?.verification_address[0]?.submitted_at
                          ? extract_date(
                              pv?.verification_address[0]?.submitted_at
                            )
                          : ""}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {pv?.verification_address[0]?.submitted_at
                          ? get_time_from_date(
                              pv?.verification_address[0]?.submitted_at
                            )
                          : ""}
                      </TableCellDiv>

                      <TableCellDiv className="item">
                        {pd?.verification_address[0]?.submitted_at
                          ? extract_date(
                              pd?.verification_address[0]?.submitted_at
                            )
                          : ""}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {pd?.verification_address[0]?.submitted_at
                          ? get_time_from_date(
                              pd?.verification_address[0]?.submitted_at
                            )
                          : ""}
                      </TableCellDiv>
                    </TableRow>
                  );
                })}
              </TableBody>
            </TableMain>
          </MainContainer>
        </>
      )}
      <TableFooter>
        <DownloadButton title="Excel" handleClick={handleClick} />
        {!isMobileScreen && (
          <>
            <PageDetails>
              {getPageDetails(props.data.count, props.page, props.rowsperpage)}
            </PageDetails>
            <TablePaginationDemo
              count={props.data.total_pages}
              setPage={props.setPage}
              page={props.page}
              rowsperpage={props.rowsperpage}
              setRowsPerPage={props.setRowsPerPage}
            />
          </>
        )}
      </TableFooter>
      {task_id && (
        <div style={{ margin: "15px 0px 0px 15px" }}>
          <ExcelDownloadProgress
            setTaskID={setTaskID}
            progress={progress}
            setProgress={setProgress}
            task_id={task_id}
            is_list={true}
            name="report_edit"
          />
        </div>
      )}
    </>
  );
}

const PageDetails = styled.span`
  color: #132756;
  font-size: 12px;
  font-weight: 600;
`;

const TableFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const MainContainer = styled(TableContainer)`
  padding: 10px;
  padding-top: 0px;
  width: 98% !important;
  border-radius: 12px !important;
  box-shadow: 0px 12px 12px rgba(0, 0, 0, 0.05) !important;
  /* max-width: 1180px !important; */
  max-width: ${({ iscollapse }) =>
    iscollapse == "true" ? "1200px !important" : "1360px !important"};
  overflow-x: scroll;
  // ::-webkit-scrollbar {
  //     display: none;
  //   }
  max-height: 500px;
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
    vertical-align: top;
  }
  &.status {
    display: flex;
    align-items: center;
  }
  /* &.address {
    width: 175px;
  }
  &.fi_date_time {
    width: 117px;
  } */
  /* &.check {
    display: flex;
    justify-content: space-between;
    align-items: center;
  } */
`;

const SortIcon = styled.div`
  margin-left: 15px;
  width: 50%;
  cursor: pointer;
  &.short-width {
    width: 10%;
  }
  &.mb {
    margin-bottom: 20px;
  }
`;
const THDiv = styled.div`
  width: 193px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &.long-width {
    width: 157px;
  }
  &.wid-200 {
    width: 200px;
  }
`;
