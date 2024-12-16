import * as React from "react";
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
import Badge from "@mui/material/Badge";
import ReportEditModal from "../Verification/ReportEditModal";
import BasicAccordion from "../Common/BasicAccordion";
import { useNavigate } from "react-router-dom";
import TATDetails from "../../Screens/Reports/TATDetails";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "98%",
  bgcolor: "background.paper",
  //   border: '2px solid #000',
  boxShadow: 24,
  //   p: 2,
  borderRadius: "12px",
};

const rows = [
  {
    district: "Alappuzha",
    zero_ten: "25",
    ten_fifteen: "01",
    gt_15: "04",
    total: "04",
  },
  {
    district: "Calicut",
    zero_ten: "25",
    ten_fifteen: "01",
    gt_15: "04",
    total: "04",
  },
];

export default function TATReportDistrictTable() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const [expanded, setExpanded] = React.useState([0]);
  // const handleOpen = (name) => {
  //     navigate(`/dashboard/tat-details?name=${name}`)
  //   }
  return (
    <>
      <MainContainer component={Paper}>
        <TableMain aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCellDiv className="head">
                <THDiv>
                  <p>Sl.No</p>{" "}
                  <SortIcon>
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>District</p>{" "}
                  <SortIcon>
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>0-10 Min</p>{" "}
                  <SortIcon className="short-width">
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>10-15 Min</p>{" "}
                  <SortIcon className="short-width">
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>{"> 15 Min"}</p>{" "}
                  <SortIcon className="short-width">
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>Total</p>{" "}
                  <SortIcon>
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              {/* <TableCellDiv className='head'><THDiv className='long-width'><p>RV Verification <br /> Agent</p> <SortIcon className='short-width'><img src={require('../../Assets/images/sortIcon.png')} /></SortIcon></THDiv></TableCellDiv> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCellDiv className="item">
                  {" "}
                  <p>{index + 1}</p>
                </TableCellDiv>
                <TableCellDiv className="item">
                  {" "}
                  <p>{row.district}</p>
                </TableCellDiv>
                <TableCellDiv className="item">
                  {" "}
                  <LinkItem onClick={() => handleOpen(row.district)}>
                    {row.zero_ten}
                  </LinkItem>
                </TableCellDiv>
                <TableCellDiv className="item">
                  {" "}
                  <LinkItem onClick={() => handleOpen(row.district)}>
                    {row.ten_fifteen}
                  </LinkItem>
                </TableCellDiv>
                <TableCellDiv className="item">
                  {" "}
                  <LinkItem onClick={() => handleOpen(row.district)}>
                    {row.gt_15}
                  </LinkItem>
                </TableCellDiv>
                <TableCellDiv className="item">
                  {" "}
                  <LinkItem onClick={() => handleOpen(row.district)}>
                    {row.total}
                  </LinkItem>
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
            <TATDetails setOpen={setOpen} />
          </Box>
        </Modal>
      </MainContainer>
      <TableFooter>
        <DownloadButton title="Excel" />
        <TablePaginationDemo />
      </TableFooter>
    </>
  );
}

const LinkItem = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #3699ff;
  cursor: pointer;
`;

const BadgeItem = styled(Badge)`
  span {
    background-color: #fff !important;
    border: 1px solid red;
    color: red;
  }
`;
const TableButton = styled.input`
  background-color: ${({ bcolor }) => (bcolor ? bcolor : "unset")};
  border: none;
  color: ${({ fcolor }) => (fcolor ? fcolor : "unset")};
  border-radius: 4px;
  font-size: 12px;
  padding: 5px 10px;
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
  width: 98% !important;
  border-radius: 12px !important;
  box-shadow: 0px 12px 12px rgba(0, 0, 0, 0.05) !important;
  max-width: 1180px !important;
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
  min-width: 117px;
  width: 185px;
  &.item {
    font-size: 12px;
    font-weight: 600;
    color: #444445;
    vertical-align: ${({ is_expand }) => (is_expand ? "top" : "center")};
    /* display: ${({ is_expand }) => (is_expand ? "flex" : "unset")}; */
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
  /* &.address {
    width: 175px;
  }
  &.fi_date_time {
    width: 117px;
  } */
  /* &.check {
    display: flex;
    justify-content: space-between;
    align-items: center;
  } */
`;

const Title = styled.p`
  width: 50%;
`;

const SortIcon = styled.div`
  margin-left: 15px;
  width: 50%;
  &.short-width {
    width: 10%;
  }
  &.mb {
    margin-bottom: 20px;
  }
`;
const THDiv = styled.div`
  width: 93px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &.long-width {
    width: 157px;
  }
  &.more-length {
    /* width: 157px; */
    min-width: 300px;
    justify-content: flex-start;
  }
`;
