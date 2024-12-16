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
import NotificationModal from "../Verification/NotificationModal";
import VerificationReportModal from "../Verification/VerificationReportModal";
import ReportMoveModal from "../Verification/ReportMoveModal";
import PlayButtonModal from "../Verification/PlayButtonModal";
import {
  timeDate24Hours,
  exportToExcel,
  extract_date,
  get_time_from_date,
} from "../../Functions/utils";
import { useSelector } from "react-redux";
import { selectIsCollapse } from "../../Slices/commonSlice";
import { GetPermission } from "../../Functions/utils";
import { fetchExcelReportReceived } from "../../Functions/helper";
import { ExportExcel } from "../ExportExcel";

export default function VendorWisePendingDetailsTable(props) {
  const isCollapse = useSelector(selectIsCollapse);
  const permission = GetPermission("report_recieved", "change");

  const [data, setData] = useState(props.data);
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
    if (name === "application_id") {
      result =
        item.assign_verification_id.verification_address.verification
          .application_id;
    } else if (name === "customer_name") {
      result =
        item.assign_verification_id.verification_address.verification
          .customer_name;
    } else if (name === "applicant_type") {
      result =
        item.assign_verification_id.verification_address.verification
          .applicant_type;
    } else if (name === "vendor_name") {
      result =
        item.assign_verification_id.verification_address.verification.product
          .vendor_name;
    } else if (name === "fi_type") {
      result = item.assign_verification_id.verification_address.fi_type;
    } else if (name === "fi_date_time") {
      result = item.assign_verification_id.verification_address.fi_date_time;
    } else if (name === "tat_date_time") {
      result = item.assign_verification_id.verTat;
    } else if (name === "adress_district_name") {
      result =
        item.assign_verification_id.verification_address.adress_district_name;
    } else if (name === "field_agent_name") {
      result = item.field_agent_name;
    } else if (name === "field_delay") {
      result = item.field_delay;
    } else if (name === "ver_recieved") {
      result = item.assign_verification_id.ver_recieved;
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
    } else if (type === "fi_type") {
      const order = {
        RV: 1,
        BV: 2,
        PV: 3,
        PD: 4,
      };
      if (sortingtype === sortingtypeDesc) {
        setSortingType(sortingtypeAsc);
        sorted = data.sort((a, b) => {
          return order[b.fi_type] - order[a.fi_type];
        });
      } else {
        setSortingType(sortingtypeDesc);
        sorted = data.sort((a, b) => {
          return order[a.fi_type] - order[b.fi_type];
        });
      }
    } else if (type === "notification") {
      let sorted = data;
      if (sortingtype === sortingtypeDesc) {
        setSortingType(sortingtypeAsc);
        sorted = data.sort(
          (item1, item2) =>
            item1.assign_verification_id?.verification_address?.address_remarks
              ?.length -
            item2.assign_verification_id?.verification_address?.address_remarks
              ?.length
        );
        console.log(sorted);
      } else {
        setSortingType(sortingtypeDesc);
        sorted = data.sort(
          (item1, item2) =>
            item2.assign_verification_id?.verification_address?.address_remarks
              ?.length -
            item1.assign_verification_id?.verification_address?.address_remarks
              ?.length
        );
      }
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
                    Customer <br /> ID
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
                    Customer <br /> Name{" "}
                  </p>
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
                </THDiv>{" "}
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>
                    Applicant <br /> Type
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "applicant_type",
                        "text",
                        "applicant_type_ascending",
                        "applicant_type_decsending",
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
                    Vendor/ <br /> Product
                  </p>{" "}
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
                  <p>FI Type</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "fi_type",
                        "fi_type",
                        "fi_type_ascending",
                        "fi_type_decsending",
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
                        "fi_date_time",
                        "date_time",
                        "fi_date_time_ascending",
                        "fi_date_time_decsending",
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
              <TableCellDiv className="head fi_date_time">
                <THDiv>
                  <p style={{ width: "100%" }}>FI Time</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "fi_date_time",
                        "date_time",
                        "fi_date_time_ascending",
                        "fi_date_time_decsending",
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
              <TableCellDiv className="head fi_date_time">
                <THDiv>
                  <p style={{ width: "100%" }}>
                    TAT Date <br /> & Time
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "tat_date_time",
                        "date_time",
                        "tat_date_time_ascending",
                        "tat_date_time_decsending",
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
                  <p>District</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "adress_district_name",
                        "text",
                        "adress_district_name_ascending",
                        "adress_district_name_decsending",
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
              <TableCellDiv className="head fi_date_time">
                <THDiv>
                  <p>
                    Verification <br />
                    Agent
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "field_agent_name",
                        "text",
                        "field_agent_name_ascending",
                        "field_agent_name_decsending",
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
              <TableCellDiv className="head fi_date_time">
                <THDiv>
                  <p>
                    Field <br />
                    Delay
                  </p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "field_delay",
                        "delay",
                        "field_delay_ascending",
                        "field_delay_decsending",
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
              {permission && (
                <TableCellDiv className="head fi_date_time">
                  <THDiv>
                    <p style={{ marginLeft: "30px" }}>Status</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "ver_recieved",
                          "date_time",
                          "ver_recieved_ascending",
                          "ver_recieved_decsending",
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
              )}
              {permission && (
                <TableCellDiv className="head fi_date_time">
                  <THDiv className="notification">
                    <p style={{ marginLeft: "50px" }}>Submit</p>{" "}
                    <SortIcon
                      onClick={() =>
                        handleSorting(
                          "notification",
                          "notification",
                          "notification_ascending",
                          "notification_decsending",
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
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {props?.data?.results?.length > 0 &&
              props?.data?.results?.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCellDiv className="item" component="th" scope="row">
                    {
                      row.assign_verification_id.verification_address
                        .verification.application_id
                    }
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {
                      row.assign_verification_id.verification_address
                        .verification.customer_name
                    }
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {
                      row.assign_verification_id.verification_address
                        .verification.applicant_type
                    }
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {
                      row.assign_verification_id.verification_address
                        .verification.product.vendor_name
                    }
                    /
                    {
                      row.assign_verification_id.verification_address
                        .verification.product.product_name
                    }
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    <ItemLabelContainer>
                      <ItemValue>
                        {
                          row.assign_verification_id.verification_address
                            .fi_type
                        }
                      </ItemValue>
                      <ItemIcon>
                        {row.assign_verification_id.work_status ===
                        "recieved" ? (
                          <img
                            src={require("../../Assets/images/recieved_icon.png")}
                            alt=""
                          />
                        ) : (
                          <img
                            src={require("../../Assets/images/yellow-cycle.png")}
                            alt=""
                          />
                        )}
                      </ItemIcon>
                    </ItemLabelContainer>
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {extract_date(
                      row?.assign_verification_id?.verification_address
                        ?.fi_date_time
                    )}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {get_time_from_date(
                      row?.assign_verification_id?.verification_address
                        ?.fi_date_time
                    )}
                  </TableCellDiv>
                  {row.assign_verification_id.ver_tat_status === "running" ? (
                    <TableCellDiv className="item" style={{ color: "#77C673" }}>
                      <span>
                        {timeDate24Hours(row.assign_verification_id.verTat)}
                      </span>
                    </TableCellDiv>
                  ) : row.assign_verification_id.ver_tat_status === "out" ? (
                    <TableCellDiv className="item" style={{ color: "#FF0303" }}>
                      <span>
                        {timeDate24Hours(row.assign_verification_id.verTat)}
                      </span>
                    </TableCellDiv>
                  ) : (
                    <TableCellDiv className="item" style={{ color: "#FFA800" }}>
                      <span>
                        {timeDate24Hours(row.assign_verification_id.verTat)}
                      </span>
                    </TableCellDiv>
                  )}
                  <TableCellDiv className="item">
                    {
                      row.assign_verification_id.verification_address
                        .adress_district_name
                    }
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row.field_agent_name}
                  </TableCellDiv>
                  <TableCellDiv className="item">
                    {row.field_delay}
                  </TableCellDiv>
                  {permission && (
                    <TableCellDiv className="item">
                      <div>
                        <VerificationReportModal
                          datas={row}
                          setState={props.setState}
                        />
                      </div>
                      <StatusDiv>
                        <span>
                          {row.assign_verification_id.ver_recieved
                            ? timeDate24Hours(
                                row.assign_verification_id.ver_recieved
                              )
                            : ""}
                        </span>
                      </StatusDiv>
                    </TableCellDiv>
                  )}
                  <TableCellDiv>
                    <NotificationDiv>
                      {permission && (
                        <ReportMoveModal
                          datas={row}
                          setState={props.setState}
                        />
                      )}
                      {permission && (
                        <NotificationModal
                          reportReceived={true}
                          data={row}
                          setState={props.setState}
                          count={
                            row?.assign_verification_id?.verification_address
                              ?.address_remarks?.length
                          }
                          bcolor={
                            row?.assign_verification_id?.verification_address
                              ?.address_remarks?.length === 0
                              ? "#1289E4"
                              : row?.assign_verification_id?.verification_address?.address_remarks.filter(
                                  (item) => item.read === true
                                )?.length ===
                                row?.assign_verification_id
                                  ?.verification_address?.address_remarks
                                  ?.length
                              ? "#FEBF00"
                              : "#DA1E27"
                          }
                        />
                      )}
                      {permission && row?.assign_verification_id?.voice_clip ? (
                        <PlayButtonModal datas={row} />
                      ) : (
                        ""
                      )}
                    </NotificationDiv>
                  </TableCellDiv>
                </TableRow>
              ))}
          </TableBody>
        </TableMain>
      </MainContainer>
      <TableFooter>
        <ExportExcel
          fileName="vendor_report_recieved.xlsx"
          source="VENDOR_WISE_TOTAL_PENDING"
          params={props.searchParams}
        />
        <TablePaginationDemo
          count={props.data?.total_pages}
          page={props.page}
          setPage={props.setPage}
          rowsperpage={props.rowsperpage}
          setRowsPerPage={props.setRowsPerPage}
        />
      </TableFooter>
    </>
  );
}
const NotificationDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ItemLabelContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const ItemValue = styled.div``;
const ItemIcon = styled.div``;

const StatusDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 114px;
  margin-top: -24px;
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
    iscollapse == "true" ? "1180px !important" : "1354px !important"};
  overflow-x: scroll;
  // ::-webkit-scrollbar {
  //     display: none;
  //   }
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
  &.icon-label {
    img {
      margin-top: 10px;
    }
  }
`;
const SortIcon = styled.div`
  margin-left: 15px;
  width: 50%;
  cursor: pointer;
  &.mb {
    margin-bottom: 20px;
  }
`;
const THDiv = styled.div`
  width: 138px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* p {
    width: 75px;
  } */
  &.notification {
    width: 200px;
    /* text-align: right; */
  }
`;
