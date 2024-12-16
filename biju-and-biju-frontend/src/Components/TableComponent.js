import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styled from "styled-components";
import TablePaginationDemo from "./TablePaginationDemo";
import { GetImageUrl, get_formatted_date_with_year } from "../Functions/utils";
import { useMediaQuery } from "react-responsive";
import TableComponentAccordion from "../Screens/MeterReading/TableComponentAccordion";
import { ExportExcel } from "./ExportExcel";

export default function BasicTable(props) {
  const isMobileScreen = useMediaQuery({ query: "(max-width: 480px)" });
  const [data, setData] = useState();
  const [sortingtype, setSortingType] = useState("name_ascending");

  useEffect(() => {
    setData(props?.data?.results);
  }, [props?.data?.results]);

  const handleSort = (name) => {
    if (name === "fieldagent_name") {
      data.sort((a, b) => {
        const nameA = a.fieldagent_name;
        const nameB = b.fieldagent_name;
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
    } else if (name === "initial_km_reading") {
      if (sortingtype === "initial_km_reading_decsending") {
        setSortingType("initial_km_reading_ascending");
        data.sort((a, b) => {
          return b.initial_km_reading - a.initial_km_reading;
        });
      } else {
        setSortingType("initial_km_reading_decsending");
        data.sort((a, b) => {
          return a.initial_km_reading - b.initial_km_reading;
        });
      }
    } else if (name === "final_km_reading") {
      if (sortingtype === "final_km_reading_decsending") {
        setSortingType("final_km_reading_ascending");
        data.sort((a, b) => {
          return b.final_km_reading - a.final_km_reading;
        });
      } else {
        setSortingType("final_km_reading_decsending");
        data.sort((a, b) => {
          return a.final_km_reading - b.final_km_reading;
        });
      }
    }
    setData(data);
  };

  return (
    <>
      {isMobileScreen ? (
        <TableComponentAccordion
          data={props?.data}
          setPage={props.setPage}
          page={props.page}
          rowsperpage={props.rowsperpage}
          setRowsPerPage={props.setRowsPerPage}
          searchParams={props.searchParams}
        />
      ) : (
        <>
          <MainContainer component={Paper}>
            <TableMain aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCellDiv className="head">
                    <THDiv>
                      <p>Name</p>{" "}
                      <SortIcon onClick={() => handleSort("fieldagent_name")}>
                        <img src={require("../Assets/images/sortIcon.png")} />
                      </SortIcon>
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv>
                      <p>Date</p>{" "}
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv>
                      <p>Initial Reading(KM) </p>
                      <SortIcon
                        onClick={() => handleSort("initial_km_reading")}
                      >
                        <img src={require("../Assets/images/sortIcon.png")} />
                      </SortIcon>
                    </THDiv>{" "}
                  </TableCellDiv>
                  <TableCellDiv className="short-head">
                    <THDiv>
                      <p>Initial Meter Reading Image</p>
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv>
                      <p>End Day Reading(KM) </p>
                      <SortIcon onClick={() => handleSort("final_km_reading")}>
                        <img src={require("../Assets/images/sortIcon.png")} />
                      </SortIcon>
                    </THDiv>{" "}
                  </TableCellDiv>
                  <TableCellDiv className="short-head">
                    <THDiv>
                      <p>End Day Meter Reading Image</p>
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
                      {row.fieldagent_name}
                    </TableCellDiv>
                    <TableCellDiv className="item">
                      {get_formatted_date_with_year(row.created_at)}
                    </TableCellDiv>
                    <TableCellDiv className="item">
                      {row.initial_km_reading == "null"
                        ? "NA"
                        : row.initial_km_reading}
                    </TableCellDiv>
                    <TableCellDiv className="item">
                      {row.initial_meter_image ? (
                        <img
                          style={{ width: "100px" }}
                          src={GetImageUrl(row.initial_meter_image)}
                        />
                      ) : null}
                    </TableCellDiv>
                    <TableCellDiv className="item">
                      {row.final_km_reading == "null"
                        ? "NA"
                        : row.final_km_reading}
                    </TableCellDiv>
                    <TableCellDiv className="item">
                      {row.final_meter_image ? (
                        <img
                          style={{ width: "100px" }}
                          src={GetImageUrl(row.final_meter_image)}
                        />
                      ) : null}
                    </TableCellDiv>
                  </TableRow>
                ))}
              </TableBody>
            </TableMain>
          </MainContainer>
          <TableFooter>
            <TablePaginationDemo
              count={props.data.total_pages}
              setPage={props.setPage}
              page={props.page}
              rowsperpage={props.rowsperpage}
              setRowsPerPage={props.setRowsPerPage}
            />
          </TableFooter>
          <ExportExcel
            fileName="meter_reading.xlsx"
            source="METER_READING"
            params={props.searchParams}
          />
        </>
      )}
    </>
  );
}

const TableFooter = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  margin-top: 20px;
`;

const MainContainer = styled(TableContainer)`
  padding: 10px;
  width: 96.2% !important;
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
  &.short-head {
    font-size: 14px;
    font-weight: 700;
    color: #727b84;
    width: 150px;
  }
`;
const SortIcon = styled.div`
  margin-left: 15px;
  width: 50%;
`;

const THDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
