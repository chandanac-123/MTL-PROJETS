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
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import AddVendorModalForm from "./AddVendorModalForm";
import { exportToExcel, GetPermission } from "../../Functions/utils";
import { fetchVendorExcelreport } from "../../Functions/helper";
import { ExportExcel } from "../ExportExcel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 670,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "12px",
};

export default function AddVendorTable(props) {
  const permission = GetPermission("add_vendor", "change");
  const [open, setOpen] = React.useState(false);
  const [instance, setInstance] = React.useState({});

  const [data, setData] = useState(props.data);
  const [sortingtype, setSortingType] = useState("notification_ascending");

  useEffect(() => {
    setData(props?.data?.results);
  }, [props?.data?.results]);

  const getItemValue = (item, name, fi_type = "") => {
    let result = "";
    if (name === "employee_name") {
      result = item.employee_name.toLowerCase();
    } else if (name === "email") {
      result = item.user.email;
    } else if (name === "username") {
      result = item.user.username;
    } else if (name === "vendor_code") {
      result = item.employee_code;
    } else if (name === "status") {
      result = item.user.is_active ? "Active" : "Inactive";
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
    }
  };

  const handleOpen = (row) => {
    setInstance(row);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleClick = () => {
    exportToExcel(fetchVendorExcelreport(props.data.results), "Vendors");
  };

  return (
    <>
      <MainContainer component={Paper}>
        <TableMain aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCellDiv className="head">
                <THDiv>
                  <p>Vendor Name</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "employee_name",
                        "text",
                        "employee_name_ascending",
                        "employee_name_decsending",
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
                  <p>Email.ID</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "email",
                        "text",
                        "email_ascending",
                        "email_decsending",
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
                  <p>User Name</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "username",
                        "text",
                        "username_ascending",
                        "username_decsending",
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
                  <p>Vendor Short Code</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "vendor_code",
                        "text",
                        "vendor_code_ascending",
                        "vendor_code_decsending",
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
                  <p>Status</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "status",
                        "text",
                        "status_ascending",
                        "status_decsending",
                        ""
                      )
                    }
                  >
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              {permission && (
                <TableCellDiv className="head action">
                  <THDiv>
                    <p>Action </p>
                  </THDiv>{" "}
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
                <TableCellDiv className="item">
                  {row.employee_name}
                </TableCellDiv>
                <TableCellDiv className="item">{row.user.email}</TableCellDiv>
                <TableCellDiv className="item">
                  {row.user.username}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row.employee_code}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row.user.is_active ? "Active" : "Inactive"}
                </TableCellDiv>
                {permission && (
                  <TableCellDiv className="item">
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
            <AddVendorModalForm
              instance={instance}
              setState={props.setState}
              snackbarStatus={props.snackbarStatus}
              setSnackbarStatus={props.setSnackbarStatus}
              setOpen={setOpen}
              is_edit={true}
            />
          </Box>
        </Modal>
      </MainContainer>
      <TableFooter>
        <ExportExcel
          fileName="vendors.xlsx"
          source="VENDOR"
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
const TableFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const MainContainer = styled(TableContainer)`
  padding: 10px;
  width: 96.2% !important;
  border-radius: 12px !important;
  box-shadow: 0px 12px 12px rgba(0, 0, 0, 0.05) !important;
  /* max-width: 1200px !important; */
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const TableMain = styled(Table)`
  width: 98%;
  border-radius: 12px;
`;

const TableCellDiv = styled(TableCell)`
  &.head {
    font-size: 14px;
    font-weight: 700;
    color: #727b84;
    width: 210px;
  }
  &.item {
    font-size: 12px;
    font-weight: 600;
    color: #444445;
  }
  &.center {
    text-align: center;
  }
  &.last {
    text-align: right;
    cursor: pointer;
  }
  &.action {
    width: 105px;
  }
`;

const SortIcon = styled.div`
  margin-left: 10px;
  cursor: pointer;
`;
const THDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  &.center {
    justify-content: center;
  }
  &.last {
    justify-content: flex-end;
  }
`;
