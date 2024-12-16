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
import DownloadButton from "../DownloadButton";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import AddUserModalForm from "./AddUserModalForm";
import { selectAccess } from "../../Slices/authSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { create_user, edit_user } from "../../Api/UserApis";
import Swal from "sweetalert2";
import { exportToExcel, GetPermission } from "../../Functions/utils";
import { fetchUserExcelreport } from "../../Functions/helper";
import { delete_data } from "../../Store/common/commonSlice";
import { useDispatch } from "react-redux";
import { ExportExcel } from "../ExportExcel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 680,
  bgcolor: "background.paper",
  //   border: '2px solid #000',
  boxShadow: 24,
  //   p: 2,
  borderRadius: "12px",
};

export default function AddUserTable(props) {
  const dispatch = useDispatch();
  const permission = GetPermission("add_user", "change");
  const access = useSelector(selectAccess);
  const [open, setOpen] = React.useState(false);
  const [instance, setInstance] = React.useState({});
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
    if (name === "employee_name") {
      result = item.employee_name.toLowerCase();
    } else if (name === "username") {
      result = item.user.username.toLowerCase();
    } else if (name === "phonenumber") {
      result = item.user.phonenumber;
    } else if (name === "user_type") {
      result = item.user.user_type;
    } else if (name === "addr_dt_name") {
      result = item.addr_dt_name;
    } else if (name === "is_active") {
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
    } else if (type === "designation") {
      console.log("enterereree");
      const order = {
        GroupLeader: 1,
        ProductCoordinator: 2,
        TeamMember: 3,
        DistrictCoordinator: 4,
        ExecutiveOfficeAdmin: 5,
        SubAdmin: 6,
      };
      if (sortingtype === "designation_decsending") {
        setSortingType("designation_ascending");
        sorted = data.sort((a, b) => {
          return order[b.user.user_type] - order[a.user.user_type];
        });
      } else {
        setSortingType("designation_decsending");
        sorted = data.sort((a, b) => {
          return order[a.user.user_type] - order[b.user.user_type];
        });
      }
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
  const handlDelete = async (row) => {
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
            console.log(result, "result");
            if (result?.status === 200) {
              props.setState((prevState) => {
                return {
                  ...prevState,
                  refresh: true,
                };
              });
              Swal.fire({
                title: "Deleted!",
                text: "user has been deleted",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
              });
            } else if (result?.status === 400 && result?.data?.error) {
              alertErrorFun(result?.data?.error);
            }
          })
          .catch((error) => {
            console.error(error);
            alertErrorFun(error.response.data.error);
          });

        // try {
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
        //       text: "user has been deleted",
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
    exportToExcel(fetchUserExcelreport(props.data.results), "Users");
  };

  return (
    <>
      <MainContainer component={Paper}>
        <TableMain aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCellDiv className="head">
                <THDiv>
                  <p>Name</p>{" "}
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
                  <p>Phone</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "phonenumber",
                        "number",
                        "phonenumber_ascending",
                        "phonenumber_decsending",
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
                  <p>Designation</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "designation",
                        "designation",
                        "designation_ascending",
                        "designation_decsending",
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
                  <p>District</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "addr_dt_name",
                        "text",
                        "addr_dt_name_ascending",
                        "addr_dt_name_decsending",
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
                        "is_active",
                        "text",
                        "is_active_ascending",
                        "is_active_decsending",
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
                  <THDiv className="last">
                    <p>Action </p>
                  </THDiv>{" "}
                </TableCellDiv>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.results?.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCellDiv className="item">
                  {row.employee_name}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row.user.username}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row.user.phonenumber}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row.user.user_type}
                </TableCellDiv>
                <TableCellDiv className="item">{row.addr_dt_name}</TableCellDiv>
                <TableCellDiv className="item">
                  {row.user.is_active ? "Active" : "Inactive"}
                </TableCellDiv>
                {permission && (
                  <TableCellDiv className="item last">
                    <IconImg
                      src={require("../../Assets/images/edit_icon.png")}
                      onClick={() => handleOpen(row)}
                    />
                    <IconImg
                      src={require("../../Assets/images/trash.png")}
                      onClick={() => handlDelete(row)}
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
            <AddUserModalForm
              instance={instance}
              setOpen={setOpen}
              snackbarStatus={props.snackbarStatus}
              setSnackbarStatus={props.setSnackbarStatus}
              setState={props.setState}
              is_edit={true}
            />
          </Box>
        </Modal>
      </MainContainer>
      <TableFooter>
        <ExportExcel
          fileName="user.xlsx"
          source="USER"
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
