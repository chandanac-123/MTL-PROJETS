import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styled from "styled-components";
import TablePaginationDemo from "./TablePaginationDemo";
import DownloadButton from "./DownloadButton";
import { GetImageUrl, exportToExcel } from "../Functions/utils";
import { fetchExcelImageData } from "../Functions/helper";
import { ExportExcel } from "./ExportExcel";

export default function DownloadImageTable(props) {
  const [data, setData] = useState();
  const [sortingtype, setSortingType] = useState("name_ascending");

  useEffect(() => {
    setData(props?.data?.results);
  }, [props?.data?.results]);

  const handleSort = (name) => {
    if (name === "application_id") {
      data.sort((a, b) => {
        let nameA = parseInt(a.application_id.split("/").pop());
        let nameB = parseInt(b.application_id.split("/").pop());
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
    } else if (name === "vendor") {
      data.sort((a, b) => {
        const nameA = a.vendor;
        const nameB = b.vendor;
        if (sortingtype === "vendor_decsending") {
          setSortingType("vendor_ascending");
          if (nameA > nameB) return -1;
          if (nameA < nameB) return 1;
        } else {
          setSortingType("vendor_decsending");
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
        }
        return 0;
      });
    } else if (name === "verification_agent") {
      data.sort((a, b) => {
        const nameA = a.verification_agent.toUpperCase();
        const nameB = b.verification_agent.toUpperCase();
        if (sortingtype === "verification_agent_decsending") {
          setSortingType("verification_agent_ascending");
          if (nameA > nameB) return -1;
          if (nameA < nameB) return 1;
        } else {
          setSortingType("verification_agent_decsending");
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
        }
        return 0;
      });
    } else if (name === "district") {
      data.sort((a, b) => {
        const nameA = a.district.toUpperCase();
        const nameB = b.district.toUpperCase();
        if (sortingtype === "district_decsending") {
          setSortingType("district_ascending");
          if (nameA > nameB) return -1;
          if (nameA < nameB) return 1;
        } else {
          setSortingType("district_decsending");
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
        }
        return 0;
      });
    }
    setData(data);
  };

  const handleClick = () => {
    exportToExcel(fetchExcelImageData(props.data.results), "Download_Image");
  };

  return (
    <>
      <MainContainer component={Paper}>
        <TableMain aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCellDiv className="head">
                <THDiv>
                  <p>Customer ID</p>{" "}
                  <SortIcon onClick={() => handleSort("application_id")}>
                    <img src={require("../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv className="long-width">
                  <p>Vendor </p>
                  <SortIcon onClick={() => handleSort("vendor")}>
                    <img src={require("../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>{" "}
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv className="long-width">
                  <p>Verification Agent Name</p>{" "}
                  <SortIcon onClick={() => handleSort("verification_agent")}>
                    <img src={require("../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>District</p>{" "}
                  <SortIcon onClick={() => handleSort("district")}>
                    <img src={require("../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv className="long-width">
                  <p>Image 1</p>{" "}
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv className="long-width">
                  <p>Image 2</p>{" "}
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv className="long-width">
                  <p>Image 3</p>{" "}
                </THDiv>
              </TableCellDiv>
            </TableRow>
          </TableHead>
          <TableBody>
            {props?.data?.results?.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCellDiv className="item" component="th" scope="row">
                  {row.application_id}
                </TableCellDiv>
                <TableCellDiv className="item">{row.vendor}</TableCellDiv>
                <TableCellDiv className="item">
                  {row.verification_agent}
                </TableCellDiv>
                <TableCellDiv className="item">{row.district}</TableCellDiv>
                <TableCellDiv className="item">
                  {row?.assign_verification_id?.image_1 ? (
                    <img
                      style={{ width: "100px" }}
                      src={GetImageUrl(row?.assign_verification_id?.image_1)}
                    />
                  ) : (
                    ""
                  )}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row?.assign_verification_id?.image_2 ? (
                    <img
                      style={{ width: "100px" }}
                      src={GetImageUrl(row?.assign_verification_id?.image_2)}
                    />
                  ) : (
                    ""
                  )}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row?.assign_verification_id?.image_3 ? (
                    <img
                      style={{ width: "100px" }}
                      src={GetImageUrl(row?.assign_verification_id?.image_3)}
                    />
                  ) : (
                    ""
                  )}
                </TableCellDiv>
              </TableRow>
            ))}
          </TableBody>
        </TableMain>
      </MainContainer>
      <TableFooter>
        <ExportExcel
          fileName="download_images.xlsx"
          source="DOWNLOAD_IMAGE"
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
  width: 93.6% !important;
  border-radius: 12px !important;
  box-shadow: 0px 12px 12px rgba(0, 0, 0, 0.05) !important;
`;
const TableMain = styled(Table)`
  width: 98%;
  border-radius: 12px;
`;

const TableCellDiv = styled(TableCell)`
  &.item {
    font-size: 12px;
    font-weight: 600;
    color: #444445;
  }

  &.head {
    font-size: 14px;
    font-weight: 700;
    color: #727b84;
  }
`;

const SortIcon = styled.div`
  margin-left: 15px;
  width: 34%;
`;
const THDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  &.long-width {
    width: 157px;
  }
`;
