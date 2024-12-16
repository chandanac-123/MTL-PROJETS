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
import { useSelector } from "react-redux";
import { exportToExcel } from "../../Functions/utils";
import { selectIsCollapse } from "../../Slices/commonSlice";
import { fetchVendorBillingReport } from "../../Functions/helper";
import { ExportExcel } from "../ExportExcel";

export default function VendorBillingTable(props) {
  const isCollapse = useSelector(selectIsCollapse);
  const [data, setData] = useState();
  const [sortingtype, setSortingType] = useState("vendor_name_ascending");

  useEffect(() => {
    setData(props?.data?.results);
  }, [props?.data?.results]);

  const handleSort = (name) => {
    if (name === "vendor_name") {
      data.sort((a, b) => {
        const nameA = a.product.vendor_name.toUpperCase();
        const nameB = b.product.vendor_name.toUpperCase();
        if (sortingtype === "vendor_name_decsending") {
          setSortingType("vendor_name_ascending");
          if (nameA > nameB) return -1;
          if (nameA < nameB) return 1;
        } else {
          setSortingType("vendor_name_decsending");
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
        }
        return 0;
      });
    } else if (name === "vendor_code") {
      data.sort((a, b) => {
        const nameA = a.vendor_code.toUpperCase();
        const nameB = b.vendor_code.toUpperCase();
        if (sortingtype === "vendor_code_decsending") {
          setSortingType("vendor_code_ascending");
          if (nameA > nameB) return -1;
          if (nameA < nameB) return 1;
        } else {
          setSortingType("vendor_code_decsending");
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
        }
        return 0;
      });
    } else if (name === "billing_location_name") {
      data.sort((a, b) => {
        const nameA = a.billing_location_name.toUpperCase();
        const nameB = b.billing_location_name.toUpperCase();
        if (sortingtype === "billing_location_name_decsending") {
          setSortingType("billing_location_name_ascending");
          if (nameA > nameB) return -1;
          if (nameA < nameB) return 1;
        } else {
          setSortingType("billing_location_name_decsending");
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
        }
        return 0;
      });
    } else if (name === "product_name") {
      data.sort((a, b) => {
        const nameA = a.product.product_name.toUpperCase();
        const nameB = b.product.product_name.toUpperCase();
        if (sortingtype === "product_name_decsending") {
          setSortingType("product_name_ascending");
          if (nameA > nameB) return -1;
          if (nameA < nameB) return 1;
        } else {
          setSortingType("product_name_decsending");
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
        }
        return 0;
      });
    } else if (name === "local_distance") {
      if (sortingtype === "local_distance_decsending") {
        setSortingType("local_distance_ascending");
        data.sort(
          (a, b) => a.product.local_distance - b.product.local_distance
        );
      } else {
        setSortingType("local_distance_decsending");
        data.sort(
          (a, b) => b.product.local_distance - a.product.local_distance
        );
      }
    } else if (name === "local_rate") {
      if (sortingtype === "local_rate_decsending") {
        setSortingType("local_rate_ascending");
        data.sort((a, b) => a.product.local_rate - b.product.local_rate);
      } else {
        setSortingType("local_rate_decsending");
        data.sort((a, b) => b.product.local_rate - a.product.local_rate);
      }
    } else if (name === "ocl_distance_1") {
      if (sortingtype === "ocl_distance_1_decsending") {
        setSortingType("ocl_distance_1_ascending");
        data.sort(
          (a, b) => a.product.ocl_distance_1 - b.product.ocl_distance_1
        );
      } else {
        setSortingType("ocl_distance_1_decsending");
        data.sort(
          (a, b) => b.product.ocl_distance_1 - a.product.ocl_distance_1
        );
      }
    } else if (name === "ocl_distance_2") {
      if (sortingtype === "ocl_distance_2_decsending") {
        setSortingType("ocl_distance_2_ascending");
        data.sort(
          (a, b) => a.product.ocl_distance_2 - b.product.ocl_distance_2
        );
      } else {
        setSortingType("ocl_distance_2_decsending");
        data.sort(
          (a, b) => b.product.ocl_distance_2 - a.product.ocl_distance_2
        );
      }
    } else if (name === "ocl_distance_3") {
      if (sortingtype === "ocl_distance_3_decsending") {
        setSortingType("ocl_distance_3_ascending");
        data.sort(
          (a, b) => a.product.ocl_distance_3 - b.product.ocl_distance_3
        );
      } else {
        setSortingType("ocl_distance_3_decsending");
        data.sort(
          (a, b) => b.product.ocl_distance_3 - a.product.ocl_distance_3
        );
      }
    } else if (name === "ocl_rate_1") {
      if (sortingtype === "ocl_rate_1_decsending") {
        setSortingType("ocl_rate_1_ascending");
        data.sort((a, b) => a.product.ocl_rate_1 - b.product.ocl_rate_1);
      } else {
        setSortingType("ocl_rate_1_decsending");
        data.sort((a, b) => b.product.ocl_rate_1 - a.product.ocl_rate_1);
      }
    } else if (name === "ocl_rate_2") {
      if (sortingtype === "ocl_rate_2_decsending") {
        setSortingType("ocl_rate_2_ascending");
        data.sort((a, b) => a.product.ocl_rate_2 - b.product.ocl_rate_2);
      } else {
        setSortingType("ocl_rate_2_decsending");
        data.sort((a, b) => b.product.ocl_rate_2 - a.product.ocl_rate_2);
      }
    } else if (name === "ocl_rate_3") {
      if (sortingtype === "ocl_rate_3_decsending") {
        setSortingType("ocl_rate_3_ascending");
        data.sort((a, b) => a.product.ocl_rate_3 - b.product.ocl_rate_3);
      } else {
        setSortingType("ocl_rate_3_decsending");
        data.sort((a, b) => b.product.ocl_rate_3 - a.product.ocl_rate_3);
      }
    } else if (name === "ogl_distance_1") {
      if (sortingtype === "ogl_distance_1_decsending") {
        setSortingType("ogl_distance_1_ascending");
        data.sort(
          (a, b) => a.product.ogl_distance_1 - b.product.ogl_distance_1
        );
      } else {
        setSortingType("ogl_distance_1_decsending");
        data.sort(
          (a, b) => b.product.ogl_distance_1 - a.product.ogl_distance_1
        );
      }
    } else if (name === "ogl_distance_2") {
      if (sortingtype === "ogl_distance_2_decsending") {
        setSortingType("ogl_distance_2_ascending");
        data.sort(
          (a, b) => a.product.ogl_distance_2 - b.product.ogl_distance_2
        );
      } else {
        setSortingType("ogl_distance_2_decsending");
        data.sort(
          (a, b) => b.product.ogl_distance_2 - a.product.ogl_distance_2
        );
      }
    } else if (name === "ogl_distance_3") {
      if (sortingtype === "ogl_distance_3_decsending") {
        setSortingType("ogl_distance_3_ascending");
        data.sort(
          (a, b) => a.product.ogl_distance_3 - b.product.ogl_distance_3
        );
      } else {
        setSortingType("ogl_distance_3_decsending");
        data.sort(
          (a, b) => b.product.ogl_distance_3 - a.product.ogl_distance_3
        );
      }
    } else if (name === "ogl_rate_1") {
      if (sortingtype === "ogl_rate_1_decsending") {
        setSortingType("ogl_rate_1_ascending");
        data.sort((a, b) => a.product.ogl_rate_1 - b.product.ogl_rate_1);
      } else {
        setSortingType("ogl_rate_1_decsending");
        data.sort((a, b) => b.product.ogl_rate_1 - a.product.ogl_rate_1);
      }
    } else if (name === "ogl_rate_2") {
      if (sortingtype === "ogl_rate_2_decsending") {
        setSortingType("ogl_rate_2_ascending");
        data.sort((a, b) => a.product.ogl_rate_2 - b.product.ogl_rate_2);
      } else {
        setSortingType("ogl_rate_2_decsending");
        data.sort((a, b) => b.product.ogl_rate_2 - a.product.ogl_rate_2);
      }
    } else if (name === "ogl_rate_3") {
      if (sortingtype === "ogl_rate_3_decsending") {
        setSortingType("ogl_rate_3_ascending");
        data.sort((a, b) => a.product.ogl_rate_3 - b.product.ogl_rate_3);
      } else {
        setSortingType("ogl_rate_3_decsending");
        data.sort((a, b) => b.product.ogl_rate_3 - a.product.ogl_rate_3);
      }
    } else if (name === "pd_rate") {
      if (sortingtype === "pd_rate_decsending") {
        setSortingType("pd_rate_ascending");
        data.sort((a, b) => a.product.pd_rate - b.product.pd_rate);
      } else {
        setSortingType("pd_rate_decsending");
        data.sort((a, b) => b.product.pd_rate - a.product.pd_rate);
      }
    }
    setData(data);
  };

  const handleClick = () => {
    exportToExcel(
      fetchVendorBillingReport(props.data.results),
      "Vendor billing parameter"
    );
  };

  return (
    <>
      <MainContainer component={Paper} iscollapse={isCollapse.toString()}>
        <TableMain aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCellDiv className="head">
                <THDiv>
                  <p>Vendor</p>{" "}
                  <SortIcon onClick={() => handleSort("vendor_name")}>
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>Vendor Code</p>{" "}
                  <SortIcon
                    className="short-width"
                    onClick={() => handleSort("vendor_code")}
                  >
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>Product </p>
                  <SortIcon onClick={() => handleSort("product_name")}>
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>{" "}
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>
                    Billing <br /> Location
                  </p>{" "}
                  <SortIcon
                    className="short-width mb"
                    onClick={() => handleSort("billing_location_name")}
                  >
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>
                    Local <br /> Distance
                  </p>{" "}
                  <SortIcon
                    className="mb"
                    onClick={() => handleSort("local_distance")}
                  >
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>
                    Local <br /> Rate
                  </p>{" "}
                  <SortIcon
                    className="mb"
                    onClick={() => handleSort("local_rate")}
                  >
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>OCL Distance 1</p>{" "}
                  <SortIcon
                    className="mb"
                    onClick={() => handleSort("ocl_distance_1")}
                  >
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv className="long-width">
                  <p>OCL Distance 2</p>{" "}
                  <SortIcon
                    className="mb"
                    onClick={() => handleSort("ocl_distance_2")}
                  >
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv className="long-width">
                  <p>OCL Distance 3</p>{" "}
                  <SortIcon
                    className="mb"
                    onClick={() => handleSort("ocl_distance_3")}
                  >
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>OCL Rate 1</p>{" "}
                  <SortIcon
                    onClick={() => handleSort("ocl_rate_1")}
                    className="short-width"
                  >
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>OCL Rate 2</p>{" "}
                  <SortIcon
                    onClick={() => handleSort("ocl_rate_2")}
                    className="short-width"
                  >
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>OCL Rate 3</p>{" "}
                  <SortIcon
                    onClick={() => handleSort("ocl_rate_3")}
                    className="short-width"
                  >
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>OGL Distance 1</p>{" "}
                  <SortIcon
                    onClick={() => handleSort("ogl_distance_1")}
                    className="mb"
                  >
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv className="long-width">
                  <p>OGL Distance 2</p>{" "}
                  <SortIcon
                    onClick={() => handleSort("ogl_distance_2")}
                    className="mb"
                  >
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv className="long-width">
                  <p>OGL Distance 3</p>{" "}
                  <SortIcon
                    onClick={() => handleSort("ogl_distance_3")}
                    className="mb"
                  >
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>OGL Rate 1</p>{" "}
                  <SortIcon
                    onClick={() => handleSort("ogl_rate_1")}
                    className="short-width"
                  >
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>OGL Rate 2</p>{" "}
                  <SortIcon
                    onClick={() => handleSort("ogl_rate_2")}
                    className="short-width"
                  >
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>OGL Rate 3</p>{" "}
                  <SortIcon
                    onClick={() => handleSort("ogl_rate_3")}
                    className="short-width"
                  >
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
                </THDiv>
              </TableCellDiv>
              <TableCellDiv className="head">
                <THDiv>
                  <p>PD Rate</p>{" "}
                  <SortIcon
                    onClick={() => handleSort("pd_rate")}
                    className="short-width"
                  >
                    <img src={require("../../Assets/images/sortIcon.png")} />
                  </SortIcon>
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
                <TableCellDiv className="item">
                  {row.product.vendor_name}
                </TableCellDiv>
                <TableCellDiv className="item">{row.vendor_code}</TableCellDiv>
                <TableCellDiv className="item">
                  {row.product.product_name}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row.billing_location_name}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row.product.local_distance}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row.product.local_rate}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row.product.ocl_distance_1}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row.product.ocl_distance_2}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row.product.ocl_distance_3}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row.product.ocl_rate_1}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row.product.ocl_rate_2}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row.product.ocl_rate_3}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row.product.ogl_distance_1}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row.product.ogl_distance_2}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row.product.ogl_distance_3}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row.product.ogl_rate_1}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row.product.ogl_rate_2}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row.product.ogl_rate_3}
                </TableCellDiv>
                <TableCellDiv className="item">
                  {row.product.pd_rate}
                </TableCellDiv>
              </TableRow>
            ))}
          </TableBody>
        </TableMain>
      </MainContainer>
      <TableFooter>
        <ExportExcel
          fileName="vendor_billing_parameters.xlsx"
          source="VENDOR_PARAMETER"
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
  width: 98% !important;
  border-radius: 12px !important;
  box-shadow: 0px 12px 12px rgba(0, 0, 0, 0.05) !important;
  max-width: ${({ iscollapse }) =>
    iscollapse == "true" ? "1200px !important" : "1360px !important"};
  overflow-x: scroll;
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
  &.action {
    min-width: 70px;
  }
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
  width: 138px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &.long-width {
    width: 157px;
  }
  &.action {
    width: 80px;
    justify-content: flex-start;
  }
`;
