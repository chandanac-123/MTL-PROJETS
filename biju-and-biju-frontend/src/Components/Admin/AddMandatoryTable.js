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
import AddMandatoryModalForm from "./AddMandatoryModalForm";
import { exportToExcel } from "../../Functions/utils";
import { GetPermission } from "../../Functions/utils";
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

export default function AddMandatoryTable(props) {
  const permission = GetPermission("mandatory", "change");
  const [open, setOpen] = React.useState(false);
  const [instance, setInstance] = React.useState({});
  const [state, setState] = useState({
    is_edit: false,
  });

  const startIndex = (props.data.current_page - 1) * props.rowsperpage;

  const [data, setData] = React.useState();
  const [sortingtype, setSortingType] = useState("notification_ascending");

  useEffect(() => {
    setData(props?.data?.results);
  }, [props?.data?.results]);

  const getItemValue = (item, name, fi_type = "") => {
    let result = "";
    if (name === "mandatory_field") {
      result = item.mandatory_field;
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

  const handleClick = () => {
    let newData = props.data.results?.map((item, index) => {
      return {
        SI_NO: startIndex + index + 1,
        Mandatory_Field: item.mandatory_field,
      };
    });
    exportToExcel(newData, "Mandatory");
  };

  return (
    <>
      <MainContainer component={Paper}>
        <TableMain aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCellDiv className="head">
                <THDiv>
                  <p>Sl.No</p>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv className="center">
                  <p>Mandatory</p>{" "}
                  <SortIcon
                    onClick={() =>
                      handleSorting(
                        "mandatory_field",
                        "text",
                        "mandatory_field_ascending",
                        "mandatory_field_decsending",
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
          {data?.length ? (
            <BodyTable>
              {data?.map((row, index) => (
                <TableRow
                  key={startIndex + index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCellDiv className="item">
                    {startIndex + index + 1}
                  </TableCellDiv>
                  <TableCellDiv className="item center">
                    {row.mandatory_field}
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
            </BodyTable>
          ) : (
            <BodyTable className="no-data">
              <NoDataText>No Data Found</NoDataText>
            </BodyTable>
          )}
        </TableMain>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          hideBackdrop={true}
        >
          <Box sx={style}>
            <AddMandatoryModalForm
              setState={props.setState}
              setOpen={setOpen}
              instance={instance}
              is_edit={state.is_edit}
              snackbarStatus={props.snackbarStatus}
              setSnackbarStatus={props.setSnackbarStatus}
            />
          </Box>
        </Modal>
      </MainContainer>
      <TableFooter>
        <ExportExcel
          fileName="mandatory.xlsx"
          source="MANDATORY"
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

const BodyTable = styled(TableBody)`
  &.no-data {
    display: flex;
    /* justify-content: center; */
    align-items: center;
    padding: 30px;
  }
`;

const NoDataText = styled.span``;

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
