import React, {  useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styled from "styled-components";
import TablePaginationDemo from "../TablePaginationDemo";
import DownloadButton from "../DownloadButton";
import NotificationModal from "../Verification/NotificationModal";
import VerificationReportModal from "./VerificationReportModal";
import ReportMoveModal from "./ReportMoveModal";
import PlayButtonModal from "./PlayButtonModal";
import {
  get_time_from_date,
  extract_date,
  timeDate24Hours,
  getPageDetails,
} from "../../Functions/utils";
import { useDispatch, useSelector } from "react-redux";
import { selectIsCollapse } from "../../Slices/commonSlice";
import { GetPermission } from "../../Functions/utils";
import { get_data } from "../../Store/common/commonSlice";
import { report_receive_excel } from "../../Api/VerificationApis";
import ExcelDownloadProgress from "../ProgressBar/ExcelDownloadProgress";
import { TableHeadSection } from "./DatabaseTable";
import { FieldAgentSection } from "../Common/AssignedVerificationTable";
import { useMediaQuery } from "react-responsive";
import ReportRecievedTableAccordion from "./ReportRecievedTableAccordion";

export default function ReportRecievedTable(props) {
  const dispatch = useDispatch();
  const isMobileScreen = useMediaQuery({ query: "(max-width: 480px)" });
  const isCollapse = useSelector(selectIsCollapse);
  const permission = GetPermission("report_recieved", "change");
  const [progress, setProgress] = useState(0);
  const [task_id, setTaskID] = useState("");

  const handleSort = (name) => {
    props.setSortOptions((prevSortOptions) => {
      if (!prevSortOptions.fieldName) {
        return {
          fieldName: name,
          fieldToSort: name,
          sortType: "asc",
        };
      }

      if (
        prevSortOptions.fieldName === name &&
        prevSortOptions.sortType === "asc"
      ) {
        return {
          fieldName: name,
          fieldToSort: `-${name}`,
          sortType: "desc",
        };
      }

      return {
        fieldName: "",
        fieldToSort: undefined,
        sortType: null,
      };
    });
  };

  const handleClick = () => {
    // exportToExcel(fetchExcelReportReceived(props.data.results),"Report Recieved")
    let url = report_receive_excel + "?";
    if (props?.state?.searchValue) {
      url = url + `&search=${props?.state?.searchValue}`;
    }
    if (
      props?.state?.address_district ||
      props?.state?.fi_type ||
      props?.state?.vendorValue ||
      props?.state?.productValue
    ) {
      url =
        url +
        `&assign_verification_id__verification_address__adress_district__id=${
          props?.state?.address_district
        }&assign_verification_id__verification_address__fi_type=${
          props?.state?.fi_type
        }&assign_verification_id__verification_address__verification__vendor__employee_name=${encodeURIComponent(
          props?.state?.vendorValue
            ? props?.state?.vendors.filter(
                (item) => item.id == props?.state?.vendorValue
              )[0]?.employee_name
            : ""
        )}&assign_verification_id__verification_address__verification__product__product_name=${
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
        <ReportRecievedTableAccordion
          data={props?.data}
          handleClick={handleClick}
          setPage={props.setPage}
          page={props.page}
          rowsperpage={props.rowsperpage}
          setRowsPerPage={props.setRowsPerPage}
          setState={props.setState}
          setSnackbarStatus={props.setSnackbarStatus}
          snackbarStatus={props.snackbarStatus}
        />
      ) : (
        <>
          <MainContainer component={Paper} iscollapse={isCollapse.toString()}>
            <TableMain aria-label="sticky table">
              <TableHeadSection>
                <TableRow>
                  <TableCellDiv className="head">
                    <THDiv>
                      <p>
                        Customer <br /> ID
                      </p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSort(
                            "assign_verification_id__verification_address__verification__application_id"
                          )
                        }
                        className="mb small"
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
                        Customer <br /> Name/Type{" "}
                      </p>
                      <SortIcon
                        onClick={() =>
                          handleSort(
                            "assign_verification_id__verification_address__verification__customer_name"
                          )
                        }
                        className="mb small"
                      >
                        <img
                          src={require("../../Assets/images/sortIcon.png")}
                          alt=""
                        />
                      </SortIcon>
                    </THDiv>{" "}
                  </TableCellDiv>
                  {/* <TableCellDiv className='head'><THDiv><p>Applicant <br /> Type</p> <SortIcon onClick={()=> handleSort("applicant_type")} className='mb'><img src={require('../../Assets/images/sortIcon.png')} alt=''/></SortIcon></THDiv></TableCellDiv> */}
                  <TableCellDiv className="head">
                    <THDiv>
                      <p>
                        Vendor/ <br /> Product
                      </p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSort(
                            "assign_verification_id__verification_address__verification__vendor__employee_name"
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
                  <TableCellDiv className="head small">
                    <THDiv className="small">
                      <p>FI Type</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSort(
                            "assign_verification_id__verification_address__fi_type"
                          )
                        }
                        className="mb small"
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
                      <p className="w-100">
                        FI Date <br /> FI Time
                      </p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSort(
                            "assign_verification_id__verification_address__fi_date_time"
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
                  {/* <TableCellDiv className='head fi_date_time'><THDiv><p>FI Time</p> <SortIcon onClick={()=> handleSort("fi_time")}><img src={require('../../Assets/images/sortIcon.png')} alt=''/></SortIcon></THDiv></TableCellDiv> */}
                  <TableCellDiv className="head fi_date_time">
                    <THDiv>
                      <p className="w-100">
                        TAT Date <br /> & Time
                      </p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSort("assign_verification_id__verTat")
                        }
                        className="mb small"
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
                          handleSort(
                            "assign_verification_id__verification_address__adress_district__name"
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
                        onClick={() => handleSort("field_agent__employee_name")}
                        className="mb small"
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
                      </THDiv>
                    </TableCellDiv>
                  )}
                  {permission && (
                    <TableCellDiv className="head fi_date_time">
                      <THDiv className="notification">
                        <p style={{ marginLeft: "50px" }}>Submit</p>{" "}
                      </THDiv>
                    </TableCellDiv>
                  )}
                  <TableCellDiv className="head fi_date_time small">
                    <THDiv className="small">
                      <p>
                        Field <br />
                        Delay
                      </p>{" "}
                      <SortIcon
                        onClick={() => handleSort("field_delay")}
                        className="mb small"
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
                        <p>
                          {
                            row.assign_verification_id.verification_address
                              .verification.applicant_type
                          }
                        </p>
                      </TableCellDiv>
                      {/* <TableCellDiv className='item'>{row.assign_verification_id.verification_address.verification.applicant_type}</TableCellDiv> */}
                      <TableCellDiv className="item">
                        {
                          row.assign_verification_id.verification_address
                            .verification.product.vendor_short_code
                        }
                        /
                        {
                          row.assign_verification_id.verification_address
                            .verification.product.product_code
                        }
                      </TableCellDiv>
                      {/* <TableCellDiv className='item'>
                <ItemLabelContainer>
                    <ItemValue>{row.assign_verification_id.verification_address.fi_type}</ItemValue>
                    <ItemIcon>
                        {row.assign_verification_id.work_status === "recieved"? <img src={require('../../Assets/images/recieved_icon.png')} alt=''/>:
                        <img src={require('../../Assets/images/yellow-cycle.png')} alt='' /> }
                
                    </ItemIcon>
                </ItemLabelContainer>
              </TableCellDiv> */}
                      <TableCellDiv className="item small">
                        <>
                          {row?.assign_verification_id?.other_ver_status?.map((ver) => {
                            return (
                              <ItemLabelContainer
                              // style={{
                              //   display: "flex",
                              //   width: 45,
                              //   justifyContent: "space-between",
                              // }}
                              >
                                <ItemValue>{ver[0]}</ItemValue>
                                <ItemIcon>
                                  {(ver[1] === "currently_assigned" ||
                                    ver[1] === "reassigned") && (
                                    <img
                                      src={require("../../Assets/images/yellow-cycle.png")}
                                      alt="Assigned"
                                      width={25}
                                      height={25}
                                    />
                                  )}

                                  {ver[1] === "recieved" && (
                                    <img
                                      src={require("../../Assets/images/recieved_icon.png")}
                                      alt="Recieved"
                                    />
                                  )}

                                  {ver[1] === "submitted" && (
                                    <img
                                      width={23}
                                      height={25}
                                      src={require("../../Assets/images/green-card.png")}
                                      alt="Submitted"
                                      style={{ marginLeft: 2 }}
                                    />
                                  )}
                                </ItemIcon>
                              </ItemLabelContainer>
                            );
                          })}
                        </>
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {extract_date(
                          row?.assign_verification_id?.verification_address
                            ?.fi_date_time
                        )}
                        <p>
                          {get_time_from_date(
                            row?.assign_verification_id?.verification_address
                              ?.fi_date_time
                          )}
                        </p>
                      </TableCellDiv>
                      {/* <TableCellDiv className='item'>{get_time_from_date(row?.assign_verification_id?.verification_address?.fi_date_time)}</TableCellDiv> */}
                      {row.assign_verification_id.ver_tat_status ===
                      "running" ? (
                        <TableCellDiv
                          className="item"
                          style={{ color: "#77C673" }}
                        >
                          <span>
                            {timeDate24Hours(row.assign_verification_id.verTat)}
                          </span>
                        </TableCellDiv>
                      ) : row.assign_verification_id.ver_tat_status ===
                        "out" ? (
                        <TableCellDiv
                          className="item"
                          style={{ color: "#FF0303" }}
                        >
                          <span>
                            {timeDate24Hours(row.assign_verification_id.verTat)}
                          </span>
                        </TableCellDiv>
                      ) : (
                        <TableCellDiv
                          className="item"
                          style={{ color: "#FFA800" }}
                        >
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
                        <FieldAgentSection>
                          <span className="name">{row.field_agent_name}</span>
                          <span>{row.field_agent_number}</span>
                        </FieldAgentSection>
                      </TableCellDiv>
                      {/* <TableCellDiv className='item'>{row.field_agent_name}</TableCellDiv> */}

                      {permission && (
                        <TableCellDiv className="item">
                          <div>
                            <VerificationReportModal
                              datas={row}
                              setState={props.setState}
                            />
                          </div>
                          <div style={{ marginTop: "5px" }}>
                            <span>
                              {row.assign_verification_id.ver_recieved
                                ? timeDate24Hours(
                                    row.assign_verification_id.ver_recieved
                                  )
                                : ""}
                            </span>
                          </div>
                        </TableCellDiv>
                      )}
                      <TableCellDiv>
                        <NotificationDiv>
                          {permission && (
                            <NotificationModal
                              reportReceived={true}
                              data={row}
                              setState={props.setState}
                              count={
                                row?.assign_verification_id
                                  ?.verification_address?.address_remarks
                                  ?.length
                              }
                              bcolor={
                                row?.assign_verification_id
                                  ?.verification_address?.address_remarks
                                  ?.length === 0
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
                          {permission && (
                            <ReportMoveModal
                              datas={row}
                              setState={props.setState}
                              snackbarStatus={props.snackbarStatus}
                              setSnackbarStatus={props.setSnackbarStatus}
                            />
                          )}
                          {permission &&
                          row?.assign_verification_id?.voice_clip ? (
                            <PlayButtonModal datas={row} />
                          ) : (
                            <p style={{ visibility: "hidden" }}>___</p>
                          )}
                        </NotificationDiv>
                      </TableCellDiv>
                      <TableCellDiv className="item small">
                        {row.field_delay}
                      </TableCellDiv>
                    </TableRow>
                  ))}
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
              page={props.page}
              setPage={props.setPage}
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
            name="report_recieved"
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

export const NotificationDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const ItemLabelContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const ItemValue = styled.div``;
const ItemIcon = styled.div``;

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
  min-width: 102px;
  width: 185px;
  padding: 5px !important;
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
  &.fi_date_time {
    width: 117px;
  }
  &.small {
    min-width: 70px;
    width: 100px;
  }
  span.small {
    display: block;
    width: 90%;
  }
`;
const SortIcon = styled.div`
  margin-left: 15px;
  width: 50%;
  cursor: pointer;
  &.mb {
    margin-bottom: 20px;
  }
  &.small {
    margin-left: 8px;
    width: 30%;
  }
`;
const THDiv = styled.div`
  width: 102px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p.w-100 {
    width: 100%;
  }
  &.larger {
    width: 110px;
  }
  &.small {
    width: 70px;
  }
  /* p {
    width: 75px;
  } */
  &.notification {
    width: 200px;
    /* text-align: right; */
  }
`;
