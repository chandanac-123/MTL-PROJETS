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
import RoleManagementEditModalForm from "./RoleManagementEditModalForm";
import { selectAccess } from "../../Slices/authSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { edit_user } from "../../Api/UserApis";
import Swal from "sweetalert2";
import { exportToExcel, GetPermission } from "../../Functions/utils";
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

export default function RoleManagementTable(props) {
  const dispatch = useDispatch();
  const permission = GetPermission("role_management", "change");
  const [open, setOpen] = React.useState(false);
  const [instance, setInstance] = useState({});
  const access = useSelector(selectAccess);
  const [state, setState] = useState({ is_edit: false });
  const [data, setData] = useState();
  const [sortingtype, setSortingType] = useState("name_ascending");
  const startIndex = (props.data.current_page - 1) * props.rowsperpage;

  useEffect(() => {
    setData(props?.data?.results);
  }, [props?.data?.results]);

  const handleSort = (name) => {
    if (name === "name") {
      data.sort((a, b) => {
        const nameA = a.name;
        const nameB = b.name;
        if (sortingtype === "name_decsending") {
          setSortingType("name_ascending");
          if (nameA > nameB) return -1;
          if (nameA < nameB) return 1;
        } else {
          setSortingType("name_decsending");
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
        }
        return 0;
      });
    } else if (name === "usertype") {
      data.sort((a, b) => {
        const nameA = a.usertype;
        const nameB = b.usertype;
        if (sortingtype === "usertype_decsending") {
          setSortingType("usertype_ascending");
          if (nameA > nameB) return -1;
          if (nameA < nameB) return 1;
        } else {
          setSortingType("usertype_decsending");
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
        }
        return 0;
      });
    }
    setData(data);
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

  const handleDelete = async (row) => {
    const url = edit_user + row.id;
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
            if (result?.status === 200) {
              props.setState((prevState) => {
                return {
                  ...prevState,
                  refresh: true,
                };
              });
              Swal.fire({
                title: "Deleted!",
                text: "Role deleted successfully.",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
          .catch((error) => {
            console.error(error);
            alertErrorFun(error.response.data.error);
          });

        // try {s
        //   const result = await axios.delete(url,
        //     { headers: { "Authorization": `Bearer ${access}` } }
        //   )
        //   if (result.status === 200) {
        //     props.setState((prevState) => {
        //       return {
        //         ...prevState,
        //         refresh: true
        //       }
        //     })
        //     Swal.fire({
        //       title: 'Deleted!',
        //       text: "Role deleted successfully.",
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
    let newData = props.data.results?.map((item, index) => {
      return {
        SI_NO: startIndex + index + 1,
        Name: item.name,
        User_Role: item.usertype,
        Status: item.isactive ? "Active" : "Inactive",
      };
    });
    exportToExcel(newData, "RoleManagement");
  };

  return (
    <>
      <MainContainer component={Paper}>
        <TableMain aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCellDiv className="head">
                <THDiv>
                  <p>Sl:No</p>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>Name</p>{" "}
                  <SortIcon onClick={() => handleSort("name")}>
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>User Role</p>{" "}
                  <SortIcon onClick={() => handleSort("usertype")}>
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>Status</p>
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
                key={startIndex + index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCellDiv className="item">
                  {startIndex + index + 1}
                </TableCellDiv>
                <TableCellDiv className="item">{row.name}</TableCellDiv>
                <TableCellDiv className="item">{row.usertype}</TableCellDiv>
                <TableCellDiv className="item">
                  {row.isactive ? "Active" : "Inactive"}
                </TableCellDiv>
                {permission && (
                  <TableCellDiv>
                    <IconImg
                      src={require("../../Assets/images/edit_icon.png")}
                      onClick={() => handleOpen(row)}
                    />
                    <IconImg
                      src={require("../../Assets/images/trash.png")}
                      onClick={() => handleDelete(row)}
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
            <RoleManagementEditModalForm
              setState={props.setState}
              instance={instance}
              setOpen={setOpen}
              is_edit={state.is_edit}
              snackbarStatus={props.snackbarStatus}
              setSnackbarStatus={props.setSnackbarStatus}
            />
          </Box>
        </Modal>
      </MainContainer>
      <TableFooter>
        <ExportExcel
          fileName="role_management.xlsx"
          source="ROLE_MANAGEMENT"
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
  /* max-width: 1180px !important; */
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
  &.last {
    justify-content: flex-end;
  }
`;
