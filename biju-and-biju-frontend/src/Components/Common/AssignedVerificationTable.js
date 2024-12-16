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
import ReasignModal from "../Verification/ReasignModal";
import AssignModal from "../Verification/AssignModal";
import ManualEntryModal from "../Verification/ManualEntryModal";
import NotificationModal from "../Verification/NotificationModal";
import {
  extract_date,
  get_time_from_date,
  timeDate24Hours,
  getPageDetails,
} from "../../Functions/utils";
import { useDispatch, useSelector } from "react-redux";
import { selectIsCollapse } from "../../Slices/commonSlice";
import { GetPermission } from "../../Functions/utils";
import { get_data } from "../../Store/common/commonSlice";
import { assigned_verification_excel } from "../../Api/VerificationApis";
import ExcelDownloadProgress from "../ProgressBar/ExcelDownloadProgress";
import { TableHeadSection } from "../Verification/DatabaseTable";
import { useMediaQuery } from "react-responsive";
import AssignedVerificationTableAccordion from "../Verification/AssignedVerificationTableAccordion";

export default function AssignedVerificationTable(props) {
  const dispatch = useDispatch();
  const isMobileScreen = useMediaQuery({ query: "(max-width: 480px)" });
  const permission = GetPermission("assignedverification", "change");
  const isCollapse = useSelector(selectIsCollapse);
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
    // exportToExcel(fetchExcelAssignVerification(props.data.results),"Assigned Verification")
    let url = assigned_verification_excel + "?";
    if (props?.state?.searchValue) {
      url = url + `&search=${props?.state?.searchValue}`;
    }
    if (
      props?.state.address_district ||
      props?.state.fi_type ||
      props?.state.vendorValue ||
      props?.state.productValue
    ) {
      url =
        url +
        `?verification_address__adress_district__id=${
          props?.state.address_district
        }&verification_address__fi_type=${
          props?.state.fi_type
        }&verification_address__verification__vendor__employee_name=${encodeURIComponent(
          props?.state.vendorValue
            ? props?.state.vendors.filter(
                (item) => item.id == props?.state.vendorValue
              )[0]?.employee_name
            : ""
        )}&verification_address__verification__product__product_name=${
          props?.state.productValue
            ? props?.state.products.filter(
                (item) => item.id == props?.state.productValue
              )[0]?.product_name
            : ""
        }`;
    }

    console.log({ url, state: props.state });

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
        <AssignedVerificationTableAccordion
          checkedIDs={props?.checkedIDs}
          data={props?.data}
          handleClickOpen={props?.handleClickOpen}
          open={props?.open}
          handleClose={props?.handleClose}
          handleConfirm={props?.handleConfirm}
          handleClick={handleClick}
          setPage={props.setPage}
          page={props.page}
          rowsperpage={props.rowsperpage}
          setRowsPerPage={props.setRowsPerPage}
          setState={props.setState}
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
                            "verification_address__verification__application_id"
                          )
                        }
                        className="mb"
                      >
                        <img
                          src={require("../../Assets/images/sortIcon.png")}
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
                            "verification_address__verification__customer_name"
                          )
                        }
                        className="mb small"
                      >
                        <img
                          src={require("../../Assets/images/sortIcon.png")}
                        />
                      </SortIcon>
                    </THDiv>{" "}
                  </TableCellDiv>
                  {/* <TableCellDiv className='head'><THDiv><p>Applicant <br /> Type</p> <SortIcon onClick={()=> handleSort("applicant_type")} className='mb'><img src={require('../../Assets/images/sortIcon.png')} /></SortIcon></THDiv></TableCellDiv> */}
                  <TableCellDiv className="head">
                    <THDiv>
                      <p>
                        Vendor/ <br /> Product
                      </p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSort(
                            "verification_address__verification__vendor__employee_name"
                          )
                        }
                        className="mb"
                      >
                        <img
                          src={require("../../Assets/images/sortIcon.png")}
                        />
                      </SortIcon>
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head small">
                    <THDiv className="small">
                      <p>FI Type</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSort("verification_address__fi_type")
                        }
                        className="mb small"
                      >
                        <img
                          src={require("../../Assets/images/sortIcon.png")}
                        />
                      </SortIcon>
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv>
                      <p className="w-100">
                        FI Date <br /> FI Time
                      </p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSort("verification_address__fi_date_time")
                        }
                        className="mb small"
                      >
                        <img
                          src={require("../../Assets/images/sortIcon.png")}
                        />
                      </SortIcon>
                    </THDiv>
                  </TableCellDiv>
                  {/* <TableCellDiv className='head'><THDiv><p>FI Time</p> <SortIcon onClick={()=> handleSort("fi_time")}><img src={require('../../Assets/images/sortIcon.png')} /></SortIcon></THDiv></TableCellDiv> */}
                  <TableCellDiv className="head fi_date_time">
                    <THDiv className="larger">
                      <p className="w-100">
                        TAT Date <br />& Time
                      </p>{" "}
                      <SortIcon
                        onClick={() => handleSort("verTat")}
                        className="mb small"
                      >
                        <img
                          src={require("../../Assets/images/sortIcon.png")}
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
                            "verification_address__adress_district__name"
                          )
                        }
                      >
                        <img
                          src={require("../../Assets/images/sortIcon.png")}
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
                          handleSort(
                            "assigned_verification_users__field_agent__employee_name"
                          )
                        }
                        className="mb small"
                      >
                        <img
                          src={require("../../Assets/images/sortIcon.png")}
                        />
                      </SortIcon>
                    </THDiv>
                  </TableCellDiv>

                  {permission && (
                    <TableCellDiv className="head fi_date_time">
                      <THDiv>
                        <p>
                          Team <br />
                          Member
                        </p>
                        <SortIcon
                          onClick={() =>
                            handleSort("team_assigned__employee_name")
                          }
                        >
                          <img
                            src={require("../../Assets/images/sortIcon.png")}
                          />
                        </SortIcon>
                      </THDiv>
                    </TableCellDiv>
                  )}

                  {permission && (
                    <TableCellDiv className="head fi_date_time">
                      <THDiv>
                        <p>Status</p>{" "}
                      </THDiv>
                    </TableCellDiv>
                  )}
                  {permission && (
                    <TableCellDiv className="head fi_date_time">
                      <THDiv>
                        <p>Notification</p>{" "}
                      </THDiv>
                    </TableCellDiv>
                  )}
                  {permission && (
                    <TableCellDiv className="head fi_date_time">
                      <THDiv>
                        <p>Reassign</p>
                      </THDiv>
                    </TableCellDiv>
                  )}
                  <TableCellDiv className="head fi_date_time">
                    <THDiv>
                      <p>
                        Reassign <br />
                        Delay
                      </p>{" "}
                      <SortIcon
                        onClick={() => handleSort("reassigned_delay")}
                        className="mb"
                      >
                        <img
                          src={require("../../Assets/images/sortIcon.png")}
                        />
                      </SortIcon>
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head fi_date_time">
                    <THDiv>
                      <p>
                        Assign <br />
                        Delay
                      </p>{" "}
                      <SortIcon
                        onClick={() => handleSort("assigned_delay")}
                        className="mb"
                      >
                        <img
                          src={require("../../Assets/images/sortIcon.png")}
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
                      <TableCellDiv className="item">
                        <div style={{ wordWrap: "break-word", width: 120 }}>
                          {row.verification_address.verification.application_id}
                        </div>
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {row.verification_address.verification.customer_name}
                        <p>
                          {row.verification_address.verification.applicant_type}
                        </p>
                      </TableCellDiv>
                      {/* <TableCellDiv className='item'>{row.verification_address.verification.applicant_type}</TableCellDiv> */}
                      <TableCellDiv className="item">
                        {
                          row.verification_address.verification.product
                            .vendor_short_code
                        }
                        /
                        <br />
                        {
                          row.verification_address.verification.product
                            .product_code
                        }
                      </TableCellDiv>
                      <TableCellDiv className="item small">
                        {row.verification_address.fi_type}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        <span>
                          {extract_date(row.verification_address.fi_date_time)}
                          <p>
                            {get_time_from_date(
                              row.verification_address.fi_date_time
                            )}
                          </p>
                        </span>
                      </TableCellDiv>
                      {/* <TableCellDiv className='item'><span>{get_time_from_date(row.verification_address.fi_date_time)}</span></TableCellDiv> */}
                      {row.ver_tat_status == "out" ? (
                        <TableCellDiv
                          className="item"
                          style={{ color: "#DA1E27" }}
                        >
                          <span className="small">
                            {timeDate24Hours(row.verTat)}
                          </span>
                        </TableCellDiv>
                      ) : row.ver_tat_status == "warning" ? (
                        <TableCellDiv
                          className="item"
                          style={{ color: "#FEBF00" }}
                        >
                          <span className="small">
                            {timeDate24Hours(row.verTat)}
                          </span>
                        </TableCellDiv>
                      ) : row.ver_tat_status == "running" ? (
                        <TableCellDiv
                          className="item"
                          style={{ color: "#77C673" }}
                        >
                          <span className="small">
                            {timeDate24Hours(row.verTat)}
                          </span>
                        </TableCellDiv>
                      ) : (
                        ""
                      )}
                      <TableCellDiv className="item">
                        {row.verification_address.adress_district_name}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        <FieldAgentSection>
                          <span className="name">
                            {
                              row.assigned_verification_users.filter(
                                (item) => item.status
                              )[0]?.fieldagent_name
                            }
                          </span>
                          <span>
                            {
                              row.assigned_verification_users.filter(
                                (item) => item.status
                              )[0]?.phonenumber
                            }
                          </span>
                        </FieldAgentSection>
                      </TableCellDiv>

                      {permission && (
                        <TableCellDiv className="item">
                          {" "}
                          <AssignModal row={row} setState={props.setState} />
                        </TableCellDiv>
                      )}

                      {permission && (
                        <TableCellDiv className="item">
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <ManualEntryModal
                              row={row}
                              setState={props.setState}
                            />
                            <div style={{ marginTop: "8px" }}>
                              <span>
                                {row?.assigned_verification_users?.filter(
                                  (i) => i.status == true
                                )[0]?.fieldagent_viewed != null ? (
                                  <div style={{ whiteSpace: "nowrap" }}>
                                    Agent Viewed
                                  </div>
                                ) : (
                                  <div style={{ color: "red" }}>Pending</div>
                                )}
                              </span>
                              <span>
                                {row?.assigned_verification_users?.filter(
                                  (i) => i.status == true
                                )[0]?.fieldagent_viewed != null
                                  ? timeDate24Hours(
                                      row?.assigned_verification_users?.filter(
                                        (i) => i.status == true
                                      )[0]?.fieldagent_viewed
                                    )
                                  : ""}
                              </span>
                            </div>
                          </div>
                        </TableCellDiv>
                      )}

                      {permission && (
                        <TableCellDiv className="item">
                          <NotificationModal
                            reportReceived={false}
                            data={row}
                            setState={props.setState}
                            count={
                              row?.verification_address?.address_remarks?.length
                            }
                            bcolor={
                              row?.verification_address?.address_remarks
                                ?.length == 0
                                ? "#1289E4"
                                : row?.verification_address?.address_remarks?.filter(
                                    (item) => item.read == true
                                  )?.length ==
                                  row?.verification_address?.address_remarks
                                    ?.length
                                ? "#FEBF00"
                                : "#DA1E27"
                            }
                          />
                        </TableCellDiv>
                      )}

                      {permission && (
                        <TableCellDiv className="item">
                          {" "}
                          <ReasignModal
                            row={row}
                            setState={props.setState}
                          />{" "}
                        </TableCellDiv>
                      )}
                      <TableCellDiv className="item">
                        {row.reassigned_delay ? row.reassigned_delay : "0"}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {row.assigned_delay ? row.assigned_delay : "0"}
                      </TableCellDiv>
                    </TableRow>
                  ))}
              </TableBody>
            </TableMain>
          </MainContainer>
        </>
      )}
      <TableFooter>
        <DownloadButton
          title="Excel"
          handleClick={handleClick}
          fmargin_left="0px"
        />
        {!isMobileScreen && (
          <>
            {" "}
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
            name="assigned_verification"
          />
        </div>
      )}
    </>
  );
}

export const FieldAgentSection = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  span.name {
    margin-left: 5px;
  }
`;

const PageDetails = styled.span`
  color: #132756;
  font-size: 12px;
  font-weight: 600;
`;

export const StatusDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 75px;
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
  padding-top: 0px;
  width: 98% !important;
  border-radius: 12px !important;
  box-shadow: 0px 12px 12px rgba(0, 0, 0, 0.05) !important;
  /* max-width: 1180px !important; */
  max-width: ${({ iscollapse }) =>
    iscollapse == "true" ? "1200px !important" : "1360px !important"};
  overflow-x: scroll;
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
  &.manual {
    font-size: 12px;
    font-weight: 600;
    color: #444445;
  }
  &.small {
    min-width: 70px;
    width: 100px;
  }
  span.small {
    display: block;
    width: 90%;
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
