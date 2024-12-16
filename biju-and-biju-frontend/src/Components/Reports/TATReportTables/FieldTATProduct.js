import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styled from "styled-components";
import TablePaginationDemo from "../../TablePaginationDemo";
import DownloadButton from "../../DownloadButton";
import Badge from "@mui/material/Badge";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TATDetails from "../../../Screens/Reports/TATDetails";
import { tat_report_detals } from "../../../Api/ReportsApis";
import { useSelector } from "react-redux";
import { selectAccess } from "../../../Slices/authSlice";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { convert_date_format, exportToExcel } from "../../../Functions/utils";
import { selectIsCollapse } from "../../../Slices/commonSlice";
import { useDispatch } from "react-redux";
import { get_data } from "../../../Store/common/commonSlice";
import { useMediaQuery } from "react-responsive";
import FieldTATProductAccordion from "./FieldTATProductAccordion";
import { ExportExcel } from "../../ExportExcel";
import { DEFAULT_PAGE_SIZE } from "../../../common/constants";

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

export default function FieldTATProduct(props) {
  const dispatch = useDispatch();
  const isMobileScreen = useMediaQuery({ query: "(max-width: 480px)" });
  const isCollapse = useSelector(selectIsCollapse);
  const access = useSelector(selectAccess);
  const [page, setPage] = useState(1);
  const [rowsperpage, setRowsPerPage] = useState(DEFAULT_PAGE_SIZE);
  const [totalPage, setTotalPage] = useState("");
  const [open, setOpen] = React.useState(false);
  const [detailID, setDetailID] = useState(null);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [detail_data, setDetailData] = useState([]);
  const [data, setData] = React.useState();
  const [sortingtype, setSortingType] = useState("sortingtypeAsc");

  useEffect(() => {
    setData(props?.data?.results);
  }, [props?.data?.results]);

  const handleClose = () => {
    setDetailID(null);
    setRowsPerPage(10);
    setPage(1);
    setOpen(false);
    console.log("Closed");
  };

  useEffect(() => {
    async function fetchMyAPI() {
      const id = detailID;
      let url = tat_report_detals + `?page=${page}&page_size=${rowsperpage}`;
      if ((start !== null) & (end !== null)) {
        url =
          url +
          `&field_tat_duration__range=${start},${end}&verification_address__verification__product__id=${id}`;
      } else if (start !== null && end === null) {
        url =
          url +
          `&field_tat_duration__gte=${start}&verification_address__verification__product__id=${id}`;
      } else if ((start === null) & (end === null)) {
        url = url + `&verification_address__verification__product__id=${id}`;
      }
      if (props.from_date && props.to_date) {
        let from_date = props.from_date?.toLocaleDateString();
        let to_date = props.to_date?.toLocaleDateString();
        from_date = convert_date_format(from_date);
        to_date = convert_date_format(to_date);
        url = url + `&created_at__date__range=${from_date},${to_date}`;
      }

      dispatch(get_data(url))
        .then((res) => {
          // console.log('login res => ',res);
          const result = res?.payload;
          if (res?.payload?.status === 200) {
            setDetailData(result?.data?.results);
            setTotalPage(result?.data?.total_pages);
            setOpen(true);
          }
        })
        .catch((err) => {
          console.error(err);
        });
      // try {
      //   const result = await axios.get(url,
      //     { headers: { "Authorization": `Bearer ${access}` } })
      //   console.log(result);
      //   if (result.status === 200) {
      //     setDetailData(result?.data?.results)
      //     setTotalPage(result?.data?.total_pages)
      //     setOpen(true);
      //   }
      // } catch (error) {
      //   console.log(error);
      // }
    }
    if (detailID && page) {
      fetchMyAPI();
    }
  }, [detailID, page, rowsperpage]);

  const handleOpen = async (id, start = null, end = null) => {
    setStart(start);
    setEnd(end);
    setDetailID(id);
  };

  const handleClick = () => {
    exportToExcel(props.data.results, "FieldTATProduct");
  };

  const getItemValue = (item, name, fi_type = "") => {
    let result = "";
    if (name === "vendor") result = item.vendor?.employee_name.toUpperCase();
    else if (name === "product") result = item.product_name.toUpperCase();
    else if (name === "0-1") result = item.zero_one;
    else if (name === "1-2") result = item.one_two;
    else if (name === "2-3") result = item.two_three;
    else if (name === "3-4") result = item.three_four;
    else if (name === "4-5") result = item.four_five;
    else if (name === ">5") result = item.five_greater;
    else if (name === "total") result = item.total;
    return result;
  };

  // name,type={text,number..},acending,decending,fitype
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
      sorted = data.sort((item1, item2) => {
        let id1 = parseInt(getItemValue(item1, name, fi_type).split("/").pop());
        let id2 = parseInt(getItemValue(item2, name, fi_type).split("/").pop());
        if (!id1) id1 = 0;
        if (!id2) id2 = 0;
        if (sortingtype === sortingtypeDesc) {
          setSortingType(sortingtypeAsc);
          return id1 - id2;
        } else {
          setSortingType(sortingtypeDesc);
          return id2 - id1;
        }
      });
    } else if (type === "number") {
      sorted = data.sort((a, b) => {
        let distanceA = parseFloat(getItemValue(a, name, fi_type));
        let distanceB = parseFloat(getItemValue(b, name, fi_type));
        if (!distanceA) distanceA = "";
        if (!distanceB) distanceB = "";
        if (sortingtype === "applicant_rv_distance_decsending") {
          setSortingType("applicant_rv_distance_ascending");
          return distanceA - distanceB;
        } else {
          setSortingType("applicant_rv_distance_decsending");
          return distanceB - distanceA;
        }
      });
    }
  };

  const searchParams = {
    field_tat_duration__range:
      start !== null && end !== null ? `${start || 0},${end || 0}` : undefined,
    field_tat_duration__gte: start !== null && end === null ? start : undefined,
    verification_address__verification__product__id: detailID || undefined,
    created_at__date__range:
      props.from_date && props.to_date
        ? `${convert_date_format(props.from_date)},${convert_date_format(
            props.to_date
          )}`
        : undefined,
  };

  return (
    <>
      {isMobileScreen ? (
        <FieldTATProductAccordion
          data={props?.data}
          setPage={props.setPage}
          page={props.page}
          rowsperpage={props.rowsperpage}
          setRowsPerPage={props.setRowsPerPage}
          setState={props.setState}
          handleOpen={handleOpen}
          open={open}
          handleClose={handleClose}
          setOpen={setOpen}
          detail_data={detail_data}
          totalPage={totalPage}
          searchParams={searchParams}
          detailPage={page}
          detailSetPage={setPage}
          detailRowsPerPage={rowsperpage}
          detailSetRowsPerPage={setRowsPerPage}
        />
      ) : (
        <>
          <MainContainer component={Paper} isCollapse={isCollapse}>
            <TableMain aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCellDiv className="head">
                    <THDiv>
                      <p>Sl.No</p>
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv>
                      <p>vendor</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "vendor",
                            "text",
                            "vendor_asc",
                            "vendor_desc",
                            ""
                          )
                        }
                      >
                        <img
                          src={require("../../../Assets/images/sortIcon.png")}
                        />
                      </SortIcon>
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv>
                      <p>Product</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "product",
                            "text",
                            "product_asc",
                            "product_desc",
                            ""
                          )
                        }
                      >
                        <img
                          src={require("../../../Assets/images/sortIcon.png")}
                        />
                      </SortIcon>
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv>
                      <p>0-1 HRS</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "0-1",
                            "number",
                            "0-1_asc",
                            "0-1_desc",
                            ""
                          )
                        }
                        className="short-width"
                      >
                        <img
                          src={require("../../../Assets/images/sortIcon.png")}
                        />
                      </SortIcon>
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv>
                      <p>1-2 HRS</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "1-2",
                            "number",
                            "1-2_asc",
                            "1-2_desc",
                            ""
                          )
                        }
                        className="short-width"
                      >
                        <img
                          src={require("../../../Assets/images/sortIcon.png")}
                        />
                      </SortIcon>
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv>
                      <p>2-3 HRS</p>{" "}
                      <SortIcon
                        conClick={() =>
                          handleSorting(
                            "2-3",
                            "number",
                            "2-3_asc",
                            "2-3_desc",
                            ""
                          )
                        }
                        className="short-width"
                      >
                        <img
                          src={require("../../../Assets/images/sortIcon.png")}
                        />
                      </SortIcon>
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv>
                      <p>3-4 HRS</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "3-4",
                            "number",
                            "3-4_asc",
                            "3-4_desc",
                            ""
                          )
                        }
                        className="short-width"
                      >
                        <img
                          src={require("../../../Assets/images/sortIcon.png")}
                        />
                      </SortIcon>
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv>
                      <p>4-5 HRS</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "4-5",
                            "number",
                            "4-5_asc",
                            "4-5_desc",
                            ""
                          )
                        }
                        className="short-width"
                      >
                        <img
                          src={require("../../../Assets/images/sortIcon.png")}
                        />
                      </SortIcon>
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv>
                      <p>{"> 5 HRS"}</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(">5", "number", ">5_asc", ">5_desc", "")
                        }
                        className="short-width"
                      >
                        <img
                          src={require("../../../Assets/images/sortIcon.png")}
                        />
                      </SortIcon>
                    </THDiv>
                  </TableCellDiv>
                  <TableCellDiv className="head">
                    <THDiv>
                      <p>Total</p>{" "}
                      <SortIcon
                        onClick={() =>
                          handleSorting(
                            "total",
                            "number",
                            "total_asc",
                            "total_desc",
                            ""
                          )
                        }
                      >
                        <img
                          src={require("../../../Assets/images/sortIcon.png")}
                        />
                      </SortIcon>
                    </THDiv>
                  </TableCellDiv>
                </TableRow>
              </TableHead>
              <TableBody>
                {props?.data?.results?.length > 0 &&
                  props?.data?.results.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCellDiv className="item">
                        {" "}
                        <p>
                          {(props.page - 1) * props.rowsperpage + index + 1}
                        </p>
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {" "}
                        <p>{row.vendor?.employee_name}</p>
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {" "}
                        <p>{row.product_name}</p>
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {" "}
                        <LinkItem onClick={() => handleOpen(row.id, 0, 3600)}>
                          {row.zero_one}
                        </LinkItem>
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {" "}
                        <LinkItem
                          onClick={() => handleOpen(row.id, 3600, 7200)}
                        >
                          {row.one_two}
                        </LinkItem>
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {" "}
                        <LinkItem
                          onClick={() => handleOpen(row.id, 7200, 10800)}
                        >
                          {row.two_three}
                        </LinkItem>
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {" "}
                        <LinkItem
                          onClick={() => handleOpen(row.id, 10800, 14400)}
                        >
                          {row.three_four}
                        </LinkItem>
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {" "}
                        <LinkItem
                          onClick={() => handleOpen(row.id, 14400, 18000)}
                        >
                          {row.four_five}
                        </LinkItem>
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {" "}
                        <LinkItem onClick={() => handleOpen(row.id, 18000)}>
                          {row.five_greater}
                        </LinkItem>
                      </TableCellDiv>
                      <TableCellDiv className="item">
                        {" "}
                        <LinkItem onClick={() => handleOpen(row.id)}>
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
                <TATDetails
                  name="FieldTATProductDetails"
                  setOpen={setOpen}
                  handleClose={handleClose}
                  data={detail_data}
                  count={totalPage}
                  setPage={setPage}
                  page={page}
                  rowsperpage={rowsperpage}
                  setRowsPerPage={setRowsPerPage}
                  searchParams={searchParams}
                />
              </Box>
            </Modal>
          </MainContainer>
        </>
      )}
      <TableFooter>
        <ExportExcel
          fileName="FieldTATProduct.xlsx"
          source="FIELD_TAT_PRODUCT"
          params={props.searchParams}
        />
        {!isMobileScreen && (
          <TablePaginationDemo
            count={props.data.total_pages}
            setPage={props.setPage}
            page={props.page}
            rowsperpage={props.rowsperpage}
            setRowsPerPage={props.setRowsPerPage}
          />
        )}
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
  max-width: ${({ isCollapse }) =>
    isCollapse ? "1200px !important" : "1360px !important"};
  overflow-x: scroll;
  /* ::-webkit-scrollbar {
      display: none;
    } */
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
`;
const SortIcon = styled.div`
  cursor: pointer;
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
