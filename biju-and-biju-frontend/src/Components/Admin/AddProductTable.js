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
import { get_time_from_date } from "../../Functions/utils";
import AddProductModalForm from "./AddProductModalForm";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { selectIsCollapse } from "../../Slices/commonSlice";
import { GetPermission } from "../../Functions/utils";
import { ExportExcel } from "../ExportExcel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "680px",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "12px",
};

export default function AddProductTable(props) {
  const permission = GetPermission("product", "change");
  const isCollapse = useSelector(selectIsCollapse);
  const [open, setOpen] = useState(false);
  const [instance, setInstance] = useState({});
  const [state, setState] = useState({
    is_edit: false,
  });

  const [data, setData] = useState(props.data);
  const [sortingtype, setSortingType] = useState("notification_ascending");

  useEffect(() => {
    setData(props?.data?.results);
  }, [props?.data?.results]);

  const getItemValue = (item, name, fi_type = "") => {
    let result = "";
    if (name === "product_name") {
      result = item.product_name.toLowerCase();
    } else if (name === "short_code") {
      result = item.product_code.toLowerCase();
    } else if (name === "vendor") {
      result = item.vendor_name.toLowerCase();
    } else if (name === "tat_hours") {
      result = item.tat_hours;
    } else if (name === "fi_service_start_time") {
      result = item.fi_service_start_time;
    } else if (name === "fi_service_end_time") {
      result = item.fi_service_end_time;
    } else if (name === "cut_off_time") {
      result = item.cut_off_time;
    } else if (name === "status") {
      result = item.status ? "Active" : "Inactive";
    } else if (name === "local_distance") {
      result = item.local_distance;
    } else if (name === "ocl_distance_1") {
      result = item.ocl_distance_1;
    } else if (name === "ocl_distance_2") {
      result = item.ocl_distance_2;
    } else if (name === "ocl_distance_3") {
      result = item.ocl_distance_3;
    } else if (name === "ogl_distance_1") {
      result = item.ogl_distance_1;
    } else if (name === "ogl_distance_2") {
      result = item.ogl_distance_2;
    } else if (name === "ogl_distance_3") {
      result = item.ogl_distance_3;
    } else if (name === "local_rate") {
      result = item.local_rate;
    } else if (name === "ocl_rate_1") {
      result = item.ocl_rate_1;
    } else if (name === "ocl_rate_2") {
      result = item.ocl_rate_2;
    } else if (name === "ocl_rate_3") {
      result = item.ocl_rate_3;
    } else if (name === "ogl_rate_1") {
      result = item.ogl_rate_1;
    } else if (name === "ogl_rate_2") {
      result = item.ogl_rate_2;
    } else if (name === "ogl_rate_3") {
      result = item.ogl_rate_3;
    } else if (name === "pd_rate") {
      result = item.pd_rate;
    } else if (name === "credit_card_manager") {
      result = item.credit_card_manager;
    } else if (name === "credit_card_manager_phone") {
      result = item.credit_card_manager_phone;
    } else if (name === "credit_card_manager_email") {
      result = item.credit_card_manager_email;
    } else if (name === "reported_by_rate") {
      result = item.reported_by_rate;
    } else if (name === "coordinated_by_rate") {
      result = item.coordinated_by_rate;
    } else if (name === "allocated_by_rate") {
      result = item.allocated_by_rate;
    } else if (name === "written_by_rate") {
      result = item.written_by_rate;
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

  const handleOpen = (row) => {
    setInstance(row);
    setState((prevState) => {
      return {
        ...prevState,
        is_edit: true,
      };
    });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <MainContainer component={Paper} iscollapse={isCollapse.toString()}>
        <TableMain aria-label="sticky table">
          <TableHead>
            <TableRow>
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
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>Short Code</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "short_code",
                        "text",
                        "short_code_ascending",
                        "short_code_decsending",
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
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>{" "}
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>TAT Time</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "tat_hours",
                        "date_time",
                        "tat_hours_ascending",
                        "tat_hours_decsending",
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
                    FI Service <br /> Start Time
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "fi_service_start_time",
                        "date_time",
                        "fi_service_start_time_ascending",
                        "fi_service_start_time_decsending",
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
                    FI Service <br /> End Time
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "fi_service_end_time",
                        "date_time",
                        "fi_service_end_time_ascending",
                        "fi_service_end_time_decsending",
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
                  <p>Cut off Time</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "cut_off_time",
                        "date_time",
                        "cut_off_time_ascending",
                        "cut_off_time_decsending",
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
                  <p>Status</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "status",
                        "date_time",
                        "status_ascending",
                        "status_decsending",
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
                    Local <br /> Distance
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "local_distance",
                        "number",
                        "local_distance_ascending",
                        "local_distance_decsending",
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
                    OCL <br /> Distance 1
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "ocl_distance_1",
                        "number",
                        "ocl_distance_1_ascending",
                        "ocl_distance_1_decsending",
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
                  <p>
                    OCL <br /> Distance 2
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "ocl_distance_2",
                        "number",
                        "ocl_distance_2_ascending",
                        "ocl_distance_2_decsending",
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
                  <p>
                    OCL <br /> Distance 3
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "ocl_distance_3",
                        "number",
                        "ocl_distance_3_ascending",
                        "ocl_distance_3_decsending",
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
                  <p>
                    OGL <br /> Distance 1
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "ogl_distance_1",
                        "number",
                        "ogl_distance_1_ascending",
                        "ogl_distance_1_decsending",
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
                  <p>
                    OGL <br /> Distance 2
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "ogl_distance_2",
                        "number",
                        "ogl_distance_2_ascending",
                        "ogl_distance_2_decsending",
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
                  <p>
                    OGL <br /> Distance 3
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "ogl_distance_3",
                        "number",
                        "ogl_distance_3_ascending",
                        "ogl_distance_3_decsending",
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
                  <p>
                    Local <br /> Rate
                  </p>{" "}
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
                    className="mb"
                  >
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>OCL Rate 1</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "ocl_rate_1",
                        "number",
                        "ocl_rate_1_ascending",
                        "ocl_rate_1_decsending",
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
                  <p>OCL Rate 2</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "ocl_rate_2",
                        "number",
                        "ocl_rate_2_ascending",
                        "ocl_rate_2_decsending",
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
                  <p>OCL Rate 3</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "ocl_rate_3",
                        "number",
                        "ocl_rate_3_ascending",
                        "ocl_rate_3_decsending",
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
                  <p>OGL Rate 1</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "ogl_rate_1",
                        "number",
                        "ogl_rate_1_ascending",
                        "ogl_rate_1_decsending",
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
                  <p>OGL Rate 2</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "ogl_rate_2",
                        "number",
                        "ogl_rate_2_ascending",
                        "ogl_rate_2_decsending",
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
                  <p>OGL Rate 3</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "ogl_rate_3",
                        "number",
                        "ogl_rate_3_ascending",
                        "ogl_rate_3_decsending",
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
                  <p>PD Rate </p>{" "}
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
                <THDiv className="long-width">
                  <p>
                    Credit Manager <br /> Name
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "credit_card_manager",
                        "text",
                        "credit_card_manager_ascending",
                        "credit_card_manager_decsending",
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
                    Credit Manager <br /> Contact No
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "credit_card_manager_phone",
                        "number",
                        "credit_card_manager_phone_ascending",
                        "credit_card_manager_phone_decsending",
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
                    Credit Manager <br /> Email-ID
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "credit_card_manager_email",
                        "text",
                        "credit_card_manager_email_ascending",
                        "credit_card_manager_email_decsending",
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
                  <p>Reported by rate</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "reported_by_rate",
                        "number",
                        "reported_by_rate_ascending",
                        "reported_by_rate_decsending",
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
                        "coordinated_by_rate",
                        "number",
                        "coordinated_by_rate_ascending",
                        "coordinated_by_rate_decsending",
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
                  <p>Allocated by rate</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "allocated_by_rate",
                        "number",
                        "allocated_by_rate_ascending",
                        "allocated_by_rate_decsending",
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
                  <p>Written by rate</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "written_by_rate",
                        "number",
                        "written_by_rate_ascending",
                        "written_by_rate_decsending",
                        ""
                      )
                    }
                    className="short-width"
                  >
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              {permission && (
                <TableCellDiv className="head">
                  <THDiv className="long-width">
                    <p>Action</p>
                  </THDiv>
                </TableCellDiv>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {props?.data?.results?.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCellDiv className="item">{row.product_name}</TableCellDiv>
                <TableCellDiv className="item">{row.product_code}</TableCellDiv>
                <TableCellDiv className="item">{row.vendor_name}</TableCellDiv>
                <TableCellDiv className="item">
                  {get_time_from_date(row.tat_hours)}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {get_time_from_date(row.fi_service_start_time)}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {get_time_from_date(row.fi_service_end_time)}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {get_time_from_date(row.cut_off_time)}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row.status ? "Active" : "Inactive"}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row.local_distance}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row.ocl_distance_1}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row.ocl_distance_2}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row.ocl_distance_3}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row.ogl_distance_1}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row.ogl_distance_2}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row.ogl_distance_3}
                </TableCellDiv>
                <TableCellDiv className="item">{row.local_rate}</TableCellDiv>
                <TableCellDiv className="item">{row.ocl_rate_1}</TableCellDiv>
                <TableCellDiv className="item">{row.ocl_rate_2}</TableCellDiv>
                <TableCellDiv className="item">{row.ocl_rate_3}</TableCellDiv>
                <TableCellDiv className="item">{row.ogl_rate_1}</TableCellDiv>
                <TableCellDiv className="item">{row.ogl_rate_2}</TableCellDiv>
                <TableCellDiv className="item">{row.ogl_rate_3}</TableCellDiv>
                <TableCellDiv className="item">{row.pd_rate}</TableCellDiv>
                <TableCellDiv className="item">
                  {row.credit_card_manager}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row.credit_card_manager_phone}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row.credit_card_manager_email}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row.reported_by_rate}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row.coordinated_by_rate}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row.allocated_by_rate}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row.written_by_rate}
                </TableCellDiv>
                {permission && (
                  <TableCellDiv className="item last">
                    <img
                      src={require("../../Assets/images/edit_icon.png")}
                      onClick={() => handleOpen(row)}
                    />
                  </TableCellDiv>
                )}
              </TableRow>
            ))}
          </TableBody>
        </TableMain>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          hideBackdrop={true}
        >
          <Box sx={style}>
            <AddProductModalForm
              instance={instance}
              setOpen={setOpen}
              setState={props.setState}
              snackbarStatus={props.snackbarStatus}
              setSnackbarStatus={props.setSnackbarStatus}
              is_edit={state.is_edit}
            />
          </Box>
        </Modal>
      </MainContainer>
      <TableFooter>
        <ExportExcel
          fileName="product.xlsx"
          source="PRODUCT"
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

const IconImg = styled.img`
  width: 22%;
  height: 22%;
  margin-left: 9px;
`;

const CheckCellDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  p {
    margin: 0px !important;
  }
  span {
    padding: 0px !important;
  }
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
  /* max-width: 1180px !important; */
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

const Title = styled.p`
  width: 50%;
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
  width: 138px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &.long-width {
    width: 157px;
  }
`;
