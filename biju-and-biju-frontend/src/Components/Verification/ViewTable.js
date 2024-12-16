import React, { useState } from "react";
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
import ViewForm from "./ViewForm";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {
  GetPermission,
  get_time_from_date,
  convert_date_format,
  exportToExcel,
  GetImageUrl,
} from "../../Functions/utils";
import { selectAccess } from "../../Slices/authSlice";
import { useSelector } from "react-redux";
import { saveAs } from "file-saver";
import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 670,
  height: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "12px",
};

export default function ViewTable(props) {
  const permission = GetPermission("vendor_view", "change");
  const [open, setOpen] = useState(false);
  const [instance, setInstance] = useState({});
  const [state, setState] = useState({
    is_edit: false,
  });

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
    exportToExcel(props.data.results, "Report View");
  };

  const handleDownload = (file_name) => {
    const pdfUrl = GetImageUrl(file_name);
    saveAs(pdfUrl, "downloaded.pdf");
  };

  return (
    <>
      <MainContainer component={Paper}>
        <TableMain id="my_table" aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCellDiv className="head">
                <THDiv>
                  <p>FI Date</p>{" "}
                  <SortIcon>
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>FI Time</p>{" "}
                  <SortIcon>
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>Customer</p>{" "}
                  <SortIcon>
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>Product</p>{" "}
                  <SortIcon>
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              {permission && (
                <TableCellDiv className="head">
                  <THDiv>
                    <p>View</p>
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
                  {convert_date_format(row.verification_address.fi_date_time)}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {get_time_from_date(row.verification_address.fi_date_time)}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row.verification_address.verification.customer_name}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row.verification_address.verification.product_name}
                </TableCellDiv>
                {permission && (
                  <TableCellDiv className="item">
                    <IconImg
                      src={require("../../Assets/images/view_icon.png")}
                      onClick={() => handleOpen(row)}
                    />
                    <IconImg
                      className="arrow"
                      src={require("../../Assets/images/vector.png")}
                      onClick={() => handleDownload(row.file_report)}
                    />
                  </TableCellDiv>
                )}
              </TableRow>
            ))}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              hideBackdrop={true}
            >
              <Box sx={style}>
                <ViewForm
                  instance={instance}
                  setOpen={setOpen}
                  is_edit={state.is_edit}
                />
              </Box>
            </Modal>
          </TableBody>
        </TableMain>
      </MainContainer>
      <TableFooter>
        <DownloadButton title="Excel" handleClick={handleClick} />
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
  width: 98% !important;
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
const IconImg = styled.img`
  margin-left: 14px;
  &.arrow {
    height: 5%;
    width: 10%;
  }
`;
