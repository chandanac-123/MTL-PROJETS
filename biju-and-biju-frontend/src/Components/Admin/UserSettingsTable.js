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
import UserSettingsEditModalForm from "./UserSettingsEditModalForm";
import { useSelector } from "react-redux";
import { selectAccess } from "../../Slices/authSlice";
import { edit_user } from "../../Api/UserApis";
import Swal from "sweetalert2";
import axios from "axios";
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

export default function UserSettingsTable(props) {
  const dispatch = useDispatch();
  const permission = GetPermission("user_settings", "change");
  const [open, setOpen] = useState(false);
  const [instance, setInstance] = useState({});
  const access = useSelector(selectAccess);
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
    if (name === "name") {
      result = item.name.toLowerCase();
    } else if (name === "designation") {
      result = item.usertype;
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
        let name1 = getItemValue(item1, name, fi_type).toLowerCase();
        let name2 = getItemValue(item2, name, fi_type).toLowerCase();
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
    } else if (type === "designation") {
      const order = {
        DistrictCoordinator: 1,
        ExecutiveOfficeAdmin: 2,
        GroupLeader: 3,
        ProductCoordinator: 4,
        SubAdmin: 5,
        TeamMember: 6,
      };
      if (sortingtype === "designation_decsending") {
        setSortingType("designation_ascending");
        sorted = data.sort((a, b) => {
          return order[b.usertype] - order[a.usertype];
        });
      } else {
        setSortingType("designation_decsending");
        sorted = data.sort((a, b) => {
          return order[a.usertype] - order[b.usertype];
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
            if (res?.payload?.status === 200) {
              props.setState((prevState) => {
                return {
                  ...prevState,
                  refresh: true,
                };
              });
              Swal.fire({
                title: "Deleted!",
                text: "User has been deleted",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
              });
            } else if (result?.status === 400 && result?.data?.error) {
              alertErrorFun(result?.data?.error);
            }
          })
          .catch((error) => {
            alertErrorFun(error.response.data.error);
          });

        // try {
        //     const result = await axios.delete(url,
        //         { headers: {"Authorization" : `Bearer ${access}`} }
        //         )
        //     if(result.status === 200){
        //         props.setState((prevState)=> {
        //           return {
        //               ...prevState,
        //               refresh: true
        //           }
        //         })
        //         Swal.fire({
        //             title: 'Deleted!',
        //             text: "Negative Remark has been deleted",
        //             icon: 'success',
        //             showConfirmButton: false,
        //             timer: 1500
        //         })
        //     }
        // } catch (error) {
        //     alertErrorFun(error.response.data.error)
        // }
      }
    });
  };

  const alertErrorFun = (msg) => {
    props.setSnackbarStatus({ isOpen: true, severity: "error", message: msg });
  };

  const handleClick = () => {
    let result = props.data.results.map(({ name, usertype }) => ({
      name,
      usertype,
    }));
    exportToExcel(result, "User Settings");
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
                        "name",
                        "text",
                        "name_ascending",
                        "name_decsending",
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
              {permission && (
                <TableCellDiv className="head action">
                  <THDiv className="last">
                    <p>Action</p>
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
                <TableCellDiv className="item">{row.name}</TableCellDiv>
                <TableCellDiv className="item">{row.usertype}</TableCellDiv>
                {permission && (
                  <TableCellDiv className="item last">
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
            <UserSettingsEditModalForm
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
          fileName="user_settings.xlsx"
          source="USER_SETTINGS"
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
