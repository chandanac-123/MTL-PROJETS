import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styled from "styled-components";
import TablePaginationDemo from "../TablePaginationDemo";
import DownloadButton from "../DownloadButton";
import ReportSubmittedModal from "./ReportSubmittedModal";
import { useDispatch, useSelector } from "react-redux";
import { selectIsCollapse } from "../../Slices/commonSlice";
import {
  GetPermission,
  get_time_from_date,
  extract_date,
  timeDate24Hours,
  getPageDetails,
} from "../../Functions/utils";
import { report_submitted_excel } from "../../Api/ReportSubmittedApis";
import { get_data } from "../../Store/common/commonSlice";
import ExcelDownloadProgress from "../ProgressBar/ExcelDownloadProgress";
import { TableHeadSection } from "./DatabaseTable";
import { FieldAgentSection } from "../Common/AssignedVerificationTable";
import { useMediaQuery } from "react-responsive";
import ReportSubmittedTableAccordion from "./ReportSubmittedTableAccordion";

export default function ReportSubmittedTable(props) {
  const dispatch = useDispatch();
  const isMobileScreen = useMediaQuery({ query: "(max-width: 480px)" });
  const isCollapse = useSelector(selectIsCollapse);
  const permission = GetPermission("report_submitted", "change");
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
    // exportToExcel(fetchExcelReportSubmited(props?.data?.results),"Report Submitted")
    let url = report_submitted_excel + "?";
    if (props?.state?.searchValue) {
      url += `&search=${props?.state?.searchValue}`;
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
        <ReportSubmittedTableAccordion
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
                      <p>
                        Customer <br /> ID
                      </p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSort(
                            "assign_verification_id__verification_address__verification__application_id"
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
                  {/* <TableCellDiv className='head'><THDiv><p>Applicant <br /> Type</p> <SortIcon onClick={()=> handleSort("applicant_type")} className='mb'><img src={require('../../Assets/images/sortIcon.png')} alt='' /></SortIcon></THDiv></TableCellDiv> */}
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
                  {/* <TableCellDiv className='head fi_date_time'><THDiv><p>FI Time</p> <SortIcon onClick={()=> handleSort("fi_time")}><img src={require('../../Assets/images/sortIcon.png')} alt='' /></SortIcon></THDiv></TableCellDiv> */}
                  <TableCellDiv className="head">
                    <THDiv>
                      <p>
                        Submitted <br /> Delay
                      </p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSort("assign_verification_id__submitted_delay")
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
                  <TableCellDiv className="head small">
                    <THDiv className="small">
                      <p>District</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSort(
                            "assign_verification_id__verification_address__adress_district__name"
                          )
                        }
                        className="small"
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
                        <p>Submit</p>
                      </THDiv>
                    </TableCellDiv>
                  )}
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
                      {/* <TableCellDiv className='item'> {row.assign_verification_id.verification_address.verification.applicant_type}</TableCellDiv> */}
                      <TableCellDiv className="item">
                        {
                          row.assign_verification_id.verification_address
                            .verification.product?.vendor_short_code
                        }
                        /
                        {
                          row.assign_verification_id.verification_address
                            .verification.product?.product_code
                        }
                      </TableCellDiv>
                      <TableCellDiv className="item small">
                        {
                          row.assign_verification_id.verification_address
                            .fi_type
                        }
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        <span>
                          {extract_date(
                            row.assign_verification_id.verification_address
                              .fi_date_time
                          )}
                          <p>
                            {get_time_from_date(
                              row.assign_verification_id.verification_address
                                .fi_date_time
                            )}
                          </p>
                        </span>
                      </TableCellDiv>
                      {/* <TableCellDiv className='item'><span>{get_time_from_date(row.assign_verification_id.verification_address.fi_date_time)} </span></TableCellDiv> */}
                      <TableCellDiv className="item">
                        {row.assign_verification_id?.submitted_delay}
                      </TableCellDiv>
                      {row.assign_verification_id.is_TATin ? (
                        <TableCellDiv
                          className="item"
                          style={{ color: "#77C673" }}
                        >
                          <span>
                            {timeDate24Hours(row.assign_verification_id.verTat)}
                          </span>
                        </TableCellDiv>
                      ) : (
                        <TableCellDiv
                          className="item"
                          style={{ color: "#FF0303" }}
                        >
                          <span>
                            {timeDate24Hours(row.assign_verification_id.verTat)}
                          </span>
                        </TableCellDiv>
                      )}
                      <TableCellDiv className="item small">
                        {
                          row.assign_verification_id.verification_address
                            .address_district_name
                        }
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        <FieldAgentSection>
                          <span className="name">{row.field_agent_name}</span>
                          <span>{row.field_agent_number}</span>
                        </FieldAgentSection>
                      </TableCellDiv>
                      {/* <TableCellDiv className='item'><span>{row.field_agent_name}</span></TableCellDiv> */}
                      <TableCellDiv className="item">
                        {permission && (
                          <ReportSubmittedModal
                            data={row}
                            setState={props.setState}
                            snackbarStatus={props.snackbarStatus}
                            setSnackbarStatus={props.setSnackbarStatus}
                          />
                        )}
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
            name="report_submitted"
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
  &.fi_date_time {
    width: 200px;
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
`;
