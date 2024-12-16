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
import AddBillingLocationModalForm from "./AddBillingLocationModalForm";
import { selectAccess } from "../../Slices/authSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { billing_location } from "../../Api/SettingsAPIs";
import { exportToExcel, GetPermission } from "../../Functions/utils";
import { delete_data } from "../../Store/common/commonSlice";
import { useDispatch } from "react-redux";
import { ExportExcel } from "../ExportExcel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 670,
  bgcolor: "background.paper",
  //   border: '2px solid #000',
  boxShadow: 24,
  //   p: 2,
  borderRadius: "12px",
};

export default function BillingLocationTable(props) {
  const dispatch = useDispatch();
  const permission = GetPermission("billinglocation", "change");
  const access = useSelector(selectAccess);
  const [open, setOpen] = useState(false);
  const [instance, setInstance] = useState({});

  const [data, setData] = useState(props.data);
  const [sortingtype, setSortingType] = useState("notification_ascending");

  useEffect(() => {
    setData(props?.data?.results);
  }, [props?.data?.results]);

  const getItemValue = (item, name, fi_type = "") => {
    let result = "";
    if (name === "name") {
      result = item.name.toLowerCase();
    } else if (name === "description") {
      result = item.description.toLowerCase();
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
        if (!name1) name1 = "";
        if (!name2) name2 = "";
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

  const handleDelete = (row) => {
    const url = billing_location + row.id + "/";
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
                text: "Billing Location has been deleted.",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
              });
            } else if (res?.payload?.status === 400) {
              alertErrorFun(res?.payload?.data?.error);
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
        //       text: "Billing Location has been deleted.",
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
    let result = props.data.results.map(({ name, description }) => ({
      name,
      description,
    }));
    exportToExcel(result, "Billing Locations");
  };

  return (
    <>
      <MainContainer component={Paper}>
        <TableMain aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCellDiv className="head">
                <THDiv>
                  <p>Billing Location</p>{" "}
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
                  <p>Description</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "description",
                        "text",
                        "description_ascending",
                        "description_decsending",
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
            {props?.data?.results?.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCellDiv className="item">{row.name}</TableCellDiv>
                <TableCellDiv className="item">{row.description}</TableCellDiv>
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
            <AddBillingLocationModalForm
              instance={instance}
              setState={props.setState}
              setOpen={setOpen}
              is_edit={true}
              snackbarStatus={props.snackbarStatus}
              setSnackbarStatus={props.setSnackbarStatus}
            />
          </Box>
        </Modal>
      </MainContainer>
      <TableFooter>
        <ExportExcel
          fileName="billing_location.xlsx"
          source="BILLING_LOCATION"
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
