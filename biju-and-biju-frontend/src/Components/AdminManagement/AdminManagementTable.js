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
import AdminManagementModalForm from "./AdminManagementModalForm";
import {
  GetDecryptedPaswd,
  GetPermission,
  exportToExcel,
} from "../../Functions/utils";
import axios from "axios";
import { create_admin } from "../../Api/AdminManagementAPIs";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { selectAccess } from "../../Slices/authSlice";
import { fetchAdminMangementReport } from "../../Functions/helper";
import { useDispatch } from "react-redux";
import { delete_data } from "../../Store/common/commonSlice";
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

export default function AdminManagementTable(props) {
  const dispatch = useDispatch();
  const permission = GetPermission("admin_management", "change");
  const access = useSelector(selectAccess);
  const [open, setOpen] = React.useState(false);
  const [singleData, setSingleData] = React.useState({});
  const [data, setData] = useState();
  const [sortingtype, setSortingType] = useState("name_ascending");

  useEffect(() => {
    setData(props?.data?.results);
  }, [props?.data?.results]);

  const handleSort = (name) => {
    if (name === "first_name") {
      data.sort((a, b) => {
        const nameA = a.first_name.toUpperCase();
        const nameB = b.first_name.toUpperCase();
        if (sortingtype === "name_decsending") {
          setSortingType("name_ascending");
          if (nameA > nameB) {
            return -1;
          }
          if (nameA < nameB) {
            return 1;
          }
        } else {
          setSortingType("name_decsending");
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
        }
        return 0;
      });
    } else if (name === "username") {
      data.sort((a, b) => {
        const nameA = a.username;
        const nameB = b.username;
        if (sortingtype === "username_decsending") {
          setSortingType("username_ascending");
          if (nameA > nameB) {
            return -1;
          }
          if (nameA < nameB) {
            return 1;
          }
        } else {
          setSortingType("username_decsending");
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
        }
        return 0;
      });
    } else if (name === "is_active") {
      const status = {
        true: 1,
        false: 2,
      };
      if (sortingtype === "is_active_decsending") {
        setSortingType("is_active_ascending");
        data.sort((a, b) => {
          return status[b.is_active] - status[a.is_active];
        });
      } else {
        setSortingType("is_active_decsending");
        data.sort((a, b) => {
          return status[a.is_active] - status[b.is_active];
        });
      }
    }
    setData(data);
  };

  const handleOpen = (data) => {
    setSingleData(data);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const handleDelete = async (row) => {
    const url = create_admin + row.id;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(delete_data(url))
          .then((res) => {
            // console.log('login res => ',res);
            const result = res?.payload;
            if (result?.status === 204) {
              props.setState((prevState) => {
                return {
                  ...prevState,
                  refresh: true,
                };
              });
              Swal.fire({
                title: "Deleted!",
                text: "admin has been deleted",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
          .catch((error) => {
            alertErrorFun(error.response.data.error);
          });

        // try {
        //   const result = await axios.delete(url,
        //     { headers: { "Authorization": `Bearer ${access}` } }
        //   )
        //   if (result.status === 204) {
        //     props.setState((prevState) => {
        //       return {
        //         ...prevState,
        //         refresh: true
        //       }
        //     })
        //     Swal.fire({
        //       title: 'Deleted!',
        //       text: "admin has been deleted",
        //       icon: 'success',
        //       showConfirmButton: false,
        //       timer: 1500
        //     })
        //   }
        // } catch (error) {
        //   alertErrorFun(error.response.data.error)
        // }
      }
    });
  };
  const alertErrorFun = (msg) => {
    props.setSnackbarStatus({
      isOpen: true,
      severity: "error",
      message: msg,
    });
  };

  const handleClick = () => {
    exportToExcel(
      fetchAdminMangementReport(props.data.results),
      "Admin Managenment"
    );
  };

  function generateAsterisks(length) {
    if (typeof length !== "number" || length < 0) {
      return "";
    }
    return "*".repeat(length);
  }

  return (
    <>
      <MainContainer component={Paper}>
        <TableMain aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCellDiv className="head">
                <THDiv>
                  <p>Name</p>{" "}
                  <SortIcon onClick={() => handleSort("first_name")}>
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>User Name</p>{" "}
                  <SortIcon onClick={() => handleSort("username")}>
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>Password</p>{" "}
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>Status</p>{" "}
                  <SortIcon onClick={() => handleSort("is_active")}>
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
            {props?.data?.results.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCellDiv className="item">{row.first_name}</TableCellDiv>
                <TableCellDiv className="item">{row.username}</TableCellDiv>
                <TableCellDiv className="item">
                  {generateAsterisks(
                    GetDecryptedPaswd(row.encrypted_password).length
                  )}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row.is_active ? "Active" : "Inactive"}
                </TableCellDiv>
                <TableCellDiv>
                  {permission && (
                    <IconImg
                      src={require("../../Assets/images/edit_icon.png")}
                      onClick={(i) => handleOpen(row)}
                    />
                  )}
                  {permission && (
                    <IconImg
                      src={require("../../Assets/images/trash.png")}
                      onClick={() => handleDelete(row)}
                    />
                  )}
                </TableCellDiv>
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
            <AdminManagementModalForm
              setOpen={setOpen}
              is_edit={true}
              singleData={singleData}
              setState={props.setState}
              setSnackbarStatus={props.setSnackbarStatus}
            />
          </Box>
        </Modal>
      </MainContainer>
      <TableFooter>
        <ExportExcel
          fileName="admin_management.xlsx"
          source="ADMIN_ROLE"
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
  cursor: pointer;
`;
const TableFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const MainContainer = styled(TableContainer)`
  padding: 10px;
  width: 96% !important;
  border-radius: 12px !important;
  box-shadow: 0px 12px 12px rgba(0, 0, 0, 0.05) !important;
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
`;
const THDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  &.center {
    justify-content: center;
  }
`;
