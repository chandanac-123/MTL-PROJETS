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
import AddHolidayModalForm from "./AddHolidayModalForm";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { date_conversion, GetPermission } from "../../Functions/utils";
import { ExportExcel } from "../ExportExcel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 470,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "12px",
};

export default function AddHolidayTable(props) {
  const permission = GetPermission("holiday", "change");
  const [open, setOpen] = useState(false);
  const [instance, setInstance] = useState({});
  const [state, setState] = useState({
    is_edit: false,
  });
  const [data, setData] = React.useState();
  const [sortingtype, setSortingType] = useState("notification_ascending");

  useEffect(() => {
    setData(props?.data?.results);
  }, [props?.data?.results]);

  const getItemValue = (item, name, fi_type = "") => {
    let result = "";
    if (name === "holiday_date") {
      result = item.holiday_date;
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
    } else if (type === "date") {
      sorted = data.sort((item1, item2) => {
        let date1 = new Date(getItemValue(item1, name, fi_type)).setHours(
          0,
          0,
          0,
          0
        );
        let date2 = new Date(getItemValue(item2, name, fi_type)).setHours(
          0,
          0,
          0,
          0
        );
        if (!date1) {
          date1 = "";
        }
        if (!date2) {
          date2 = "";
        }
        if (sortingtype === sortingtypeDesc) {
          setSortingType(sortingtypeAsc);
          return date1 - date2;
        } else {
          setSortingType(sortingtypeDesc);
          return date2 - date1;
        }
      });
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

  return (
    <>
      <MainContainer component={Paper}>
        <TableMain aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCellDiv className="head">
                <THDiv>
                  <p>Date</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "holiday_date",
                        "date",
                        "holiday_date_ascending",
                        "holiday_date_decsending",
                        ""
                      )
                    }
                  >
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv className="center">
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
                <TableCellDiv className="head">
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
                <TableCellDiv className="item">
                  {date_conversion(row.holiday_date)}
                </TableCellDiv>
                <TableCellDiv className="item center">
                  {row.description}
                </TableCellDiv>
                {permission && (
                  <TableCellDiv className="item last">
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
            <AddHolidayModalForm
              setState={props.setState}
              snackbarStatus={props.snackbarStatus}
              setSnackbarStatus={props.setSnackbarStatus}
              instance={instance}
              setOpen={setOpen}
              is_edit={state.is_edit}
            />
          </Box>
        </Modal>
      </MainContainer>
      <TableFooter>
        <ExportExcel
          fileName="holidays.xlsx"
          source="HOLIDAY"
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
  }
  img {
    cursor: pointer;
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
