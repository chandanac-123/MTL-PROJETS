import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styled from "styled-components";
import TablePaginationDemo from "./TablePaginationDemo";
import DownloadButton from "./DownloadButton";
import VerificationTableModal from "./Verification/VerificationTableModal";
import { getPageDetails } from "../Functions/utils";
import { extract_date, get_time_from_date } from "../Functions/utils";
import { useDispatch, useSelector } from "react-redux";
import { selectIsCollapse } from "../Slices/commonSlice";
import { GetPermission } from "../Functions/utils";
import { Checkbox } from "@mui/material";
import { verification_url } from "../Api/VerificationApis";
import { get_data } from "../Store/common/commonSlice";
import ExcelDownloadProgress from "./ProgressBar/ExcelDownloadProgress";
import { TableHeadSection } from "./Verification/DatabaseTable";
import { useMediaQuery } from "react-responsive";
import VerificationTableAccordion from "./Verification/VerificationTableAccordion";

export default function VerificationTable(props) {
  const dispatch = useDispatch();
  const isMobileScreen = useMediaQuery({ query: "(max-width: 480px)" });
  const isCollapse = useSelector(selectIsCollapse);
  const permission = GetPermission("verification", "change");
  const user_type = useSelector((state) => state.auth.user_type);
  const [progress, setProgress] = useState(0);
  const [task_id, setTaskID] = useState("");

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
    // exportToExcel(fetchExcelVerification(props.data.results), "Verification")
    let url = verification_url + "?mode=1";
    if (props?.state?.searchValue) {
      url = url + `&search=${props?.state?.searchValue}`;
    }
    if (props?.state.address_district) {
      url = url + `&adress_district__id=${props?.state.address_district}`;
    }
    if (props?.state.fi_type) {
      url = url + `&fi_type=${props?.state.fi_type}`;
    }
    if (props?.state.vendorValue) {
      url =
        url +
        `&verification__vendor__employee_name=${encodeURIComponent(
          props?.state.vendorValue
            ? props?.state.vendors.filter(
                (item) => item.id == props?.state.vendorValue
              )[0]?.employee_name
            : ""
        )}`;
    }
    if (props?.state.productValue) {
      url =
        url +
        `&verification__product__product_name=${
          props?.state.productValue
            ? props?.state.products.filter(
                (item) => item.id == props?.state.productValue
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

  const handleCheckBox = (checked, val) => {
    let checkedIDs = [...props.checkedIDs];
    if (val === "all") {
      checkedIDs = [];
      if (checked) {
        checkedIDs = props?.data?.results?.map((obj) => {
          return obj.id;
        });
      }
    } else {
      if (checked) {
        checkedIDs.push(val);
      } else {
        checkedIDs = checkedIDs.filter((i) => i !== val);
      }
    }
    props.setCheckedIDs(checkedIDs);
  };

  return (
    <>
      {isMobileScreen ? (
        <VerificationTableAccordion
          checkedIDs={props?.checkedIDs}
          data={props?.data}
          handleCheckBox={handleCheckBox}
          handleClickOpen={props?.handleClickOpen}
          open={props?.open}
          handleClose={props?.handleClose}
          handleConfirm={props?.handleConfirm}
          handleClick={handleClick}
          setPage={props.setPage}
          page={props.page}
          rowsperpage={props.rowsperpage}
          setRowsPerPage={props.setRowsPerPage}
        />
      ) : (
        <>
          <MainContainer component={Paper} iscollapse={isCollapse.toString()}>
            <TableMain aria-label="sticky table">
              <TableHeadSection>
                <TableRow>
                  <TableCell className="head" padding="checkbox">
                    {(user_type == "Admin" || user_type == "SubAdmin") && (
                      <CheckCellDiv>
                        <p
                          style={{
                            fontSize: "14px",
                            color: "#727B84",
                            fontWeight: "700",
                          }}
                        >
                          All
                        </p>
                        <Checkbox
                          color="primary"
                          onChange={(e) =>
                            handleCheckBox(e.target.checked, "all")
                          }
                          checked={
                            props?.data?.results?.length > 0 &&
                            props?.checkedIDs?.length ==
                              props?.data?.results?.length
                          }
                          inputProps={{
                            "aria-label": "select all desserts",
                          }}
                        />
                      </CheckCellDiv>
                    )}
                  </TableCell>
                  <TableCellDiv className="head">
                    <THDiv>
                      <p>Customer ID</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSort("verification__application_id")
                        }
                        className="mb"
                      >
                        <img src={require("../Assets/images/sortIcon.png")} />
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
                          handleSort("verification__customer_name")
                        }
                        className="mb"
                      >
                        <img src={require("../Assets/images/sortIcon.png")} />
                      </SortIcon>
                    </THDiv>{" "}
                  </TableCellDiv>
                  {/* <TableCellDiv className='head'><THDiv><p>Applicant <br /> Type</p> <SortIcon onClick={() => handleSort("applicant_type")} className='mb'><img src={require('../Assets/images/sortIcon.png')} /></SortIcon></THDiv></TableCellDiv> */}
                  <TableCellDiv className="head">
                    <THDiv>
                      <p>
                        Vendor/ <br /> Product
                      </p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSort("verification__vendor__employee_name")
                        }
                        className="mb"
                      >
                        <img src={require("../Assets/images/sortIcon.png")} />
                      </SortIcon>
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv>
                      <p>FI Type</p>{" "}
                      <SortIcon
                        onClick={() => handleSort("fi_type")}
                        className="mb"
                      >
                        <img src={require("../Assets/images/sortIcon.png")} />
                      </SortIcon>
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv>
                      <p>Address</p>
                      <SortIcon
                        onClick={() => handleSort("adress")}
                        className="mb"
                      >
                        <img src={require("../Assets/images/sortIcon.png")} />
                      </SortIcon>
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv>
                      <p className="w-100">
                        FI Date <br /> FI Time{" "}
                      </p>{" "}
                      <SortIcon
                        onClick={() => handleSort("fi_date_time")}
                        className="mb"
                      >
                        <img src={require("../Assets/images/sortIcon.png")} />
                      </SortIcon>
                    </THDiv>
                  </TableCellDiv>
                  {/* <TableCellDiv className='head'><THDiv><p>FI Time</p> <SortIcon onClick={() => handleSort("fi_time")}><img src={require('../Assets/images/sortIcon.png')} /></SortIcon></THDiv></TableCellDiv> */}
                  <TableCellDiv className="head">
                    <THDiv>
                      <p>
                        Allocation <br /> Delay
                      </p>{" "}
                      <SortIcon
                        onClick={() => handleSort("allocation_delay")}
                        className="mb"
                      >
                        <img src={require("../Assets/images/sortIcon.png")} />
                      </SortIcon>
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv>
                      <p>District</p>{" "}
                      <SortIcon
                        onClick={() => handleSort("adress_district__name")}
                      >
                        <img src={require("../Assets/images/sortIcon.png")} />
                      </SortIcon>
                    </THDiv>
                  </TableCellDiv>
                  {permission && (
                    <TableCellDiv className="head fi_date_time">
                      <THDiv>
                        <p>Action</p>
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
                      <TableCell padding="checkbox">
                        {(user_type == "Admin" || user_type == "SubAdmin") && (
                          <Checkbox
                            color="primary"
                            checked={props.checkedIDs.includes(row.id)}
                            onChange={(e) =>
                              handleCheckBox(e.target.checked, row.id)
                            }
                            inputProps={{
                              "aria-labelledby": row.id,
                            }}
                          />
                        )}
                      </TableCell>
                      <TableCellDiv className="item" component="th" scope="row">
                        {row.verification.application_id}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {row.verification.customer_name}
                        <p>{row.verification.applicant_type}</p>
                      </TableCellDiv>
                      {/* <TableCellDiv className='item'>{row.verification.applicant_type}</TableCellDiv> */}
                      <TableCellDiv className="item">
                        {row.verification?.product?.vendor_short_code} /{" "}
                        {row.verification?.product?.product_code}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {row.fi_type}
                      </TableCellDiv>
                      <TableCellDiv className="item">{row.adress}</TableCellDiv>
                      <TableCellDiv className="item">
                        <span>
                          {extract_date(row.fi_date_time)} <br /> {row.FI_time}
                          <p>
                            {get_time_from_date(row.fi_date_time)} <br />{" "}
                            {row.FI_time}
                          </p>
                        </span>
                      </TableCellDiv>
                      {/* <TableCellDiv className='item'><span>{get_time_from_date(row.fi_date_time)} <br /> {row.FI_time}</span></TableCellDiv> */}
                      <TableCellDiv className="item">
                        {row.allocation_delay}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {row.adress_district_name == null
                          ? "Not Assigned"
                          : row.adress_district_name}
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {permission && row.assigned_status ? (
                          ""
                        ) : (
                          <VerificationTableModal
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
            name="verification"
          />
        </div>
      )}
    </>
  );
}

export const PageDetails = styled.span`
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
`;
const SortIcon = styled.div`
  margin-left: 10px;
  width: 50%;
  cursor: pointer;
  &.mb {
    margin-bottom: 20px;
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
