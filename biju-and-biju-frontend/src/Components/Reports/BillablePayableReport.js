import React, { useState, useEffect } from "react";
import Heading from "../../Components/Heading";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import BillablePayableReportTable from "./BillablePayableReportTable";
import RadioGroupsReport from "../RadioGroupsReport";
import DateRangeInput from "../../Components/DateRangeInput";
import {
  billable_report,
  payable_report,
  difference_report,
  billable_not_payable_report,
  payable_not_billable_report,
} from "../../Api/ReportsApis";
import { GetPermission, convert_date_format } from "../../Functions/utils";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { selectAccess } from "../../Slices/authSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getDataWithParams } from "../../Store/common/commonSlice";
import { DEFAULT_PAGE_SIZE } from "../../common/constants";
import { getPageSize } from "../../common/utils";

const EXCEL_EXPORT_SOURCES = {
  billable: "BILLABLE",
  payable: "PAYABLE",
  difference: "DIFFERENCE",
  billable_not_payable: "BILLABLE_NOT_PAYABLE",
  payable_not_billable: "PAYABLE_NOT_BILLABLE",
};

const URLS = {
  billable: billable_report,
  payable: payable_report,
  difference: difference_report,
  billable_not_payable: billable_not_payable_report,
  payable_not_billable: payable_not_billable_report,
};

const getSearchParams = (state, page, page_size) => {
  return {
    search: state.searchValue || undefined,
    filter_date_gte:
      (state.from_date && convert_date_format(state.from_date)) || undefined,
    filter_date_lte:
      (state.to_date && convert_date_format(state.to_date)) || undefined,
    page,
    page_size,
  };
};
function BillablePayableReport() {
  const dispatch = useDispatch();
  const permission = GetPermission("billable_payable", "change");
  const access = useSelector(selectAccess);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [is_reset, setReset] = useState(true);
  const [rowsperpage, setRowsPerPage] = useState(DEFAULT_PAGE_SIZE);
  const [state, setState] = useState({
    filter_option: "billable",
    data: [],
    searchValue: "",
    from_date: "",
    to_date: "",
    refresh: false,
  });

  useEffect(() => {
    setPage(1);
  }, [state.filter_option, state.searchValue]);

  useEffect(() => {
    setState((prevState) => {
      return {
        ...prevState,
        refresh: true,
      };
    });
  }, [page, rowsperpage, state.filter_option, state.searchValue]);

  useEffect(() => {
    async function fetchMyAPI() {
      const pageSize = getPageSize(rowsperpage);

      const params = getSearchParams(state, page, pageSize);
      const url = URLS[state.filter_option];
      dispatch(getDataWithParams({ url, params }))
        .then((res) => {
          // console.log('login res => ',res);
          const result = res?.payload;
          if (res?.payload?.status === 200) {
            setState((prevState) => {
              return {
                ...prevState,
                data: result.data,
                refresh: false,
              };
            });
            setLoading(false);
          }
        })
        .catch((err) => {
          console.error(err);
          setState((prevState) => {
            return {
              ...prevState,
              refresh: false,
            };
          });
        });

      // try {
      //   let url
      //   if(state.filter_option=='billable'){
      //      url = !state.searchValue ? billable_report + `?page=${page}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`:billable_report + `?search=${state.searchValue}&page=${1}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`
      //   }else if(state.filter_option=='payable'){
      //     url = !state.searchValue ? payable_report + `?page=${page}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`:payable_report + `?search=${state.searchValue}&page=${1}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`
      //   }else if(state.filter_option=='difference'){
      //     url = !state.searchValue ? difference_report + `?page=${page}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`:difference_report + `?search=${state.searchValue}&page=${1}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`
      //   }else if(state.filter_option=='billable_not_payable'){
      //     url = !state.searchValue ? billable_not_payable_report + `?page=${page}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`:billable_not_payable_report + `?search=${state.searchValue}&page=${1}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`
      //   }else{
      //     url = !state.searchValue ? payable_not_billable_report + `?page=${page}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`: payable_not_billable_report + `?search=${state.searchValue}&page=${1}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`
      //   }
      //     const result = await axios.get(url,
      //         { headers: {"Authorization" : `Bearer ${access}`} })
      //         if(result.status === 200){
      //             setState((prevState)=> {
      //                 return {
      //                     ...prevState,
      //                     data: result.data,
      //                     refresh: false
      //                 }
      //             })
      //             setLoading(false)
      //         }
      // } catch (error) {
      //     setState((prevState)=> {
      //       return {
      //           ...prevState,
      //           refresh: false
      //       }
      //     })
      // }
    }
    if (state.refresh) {
      fetchMyAPI();
    }
  }, [state.refresh]);

  const handleDateFilter = async () => {
    setReset(false);

    const pageSize = getPageSize(rowsperpage);

    setPage(1);
    const params = getSearchParams(state, 1, pageSize);
    const url = URLS[state.filter_option];

    dispatch(getDataWithParams({ url, params }))
      .then((res) => {
        // console.log('login res => ',res);
        const result = res?.payload;
        if (res?.payload?.status === 200) {
          setState((prevState) => {
            return {
              ...prevState,
              data: result.data,
              refresh: false,
            };
          });
        }
      })
      .catch((err) => {
        console.error(err);
        setState((prevState) => {
          return {
            ...prevState,
            refresh: false,
          };
        });
      });

    // try {
    //     let url
    //     if(state.filter_option=='billable'){
    //       url=billable_report
    //     }else if(state.filter_option=='payable'){
    //       url=payable_report
    //     }else if(state.filter_option=='difference'){
    //       url=difference_report
    //     }else if(state.filter_option=='billable_not_payable'){
    //       url=billable_not_payable_report
    //     }else{
    //       url=payable_not_billable_report
    //     }
    //       url=url+`?filter_date_gte=${from_date}&filter_date_lte=${to_date}`
    //     const result = await axios.get(url,
    //         { headers: {"Authorization" : `Bearer ${access}`} })
    //         if(result.status === 200){
    //             setState((prevState)=> {
    //                 return {
    //                     ...prevState,
    //                     data: result.data,
    //                     refresh: false
    //                 }
    //             })
    //         }
    // } catch (error) {
    //     setState((prevState)=> {
    //         return {
    //             ...prevState,
    //             refresh: false
    //         }
    //     })
    // }
  };

  const handleDateReset = () => {
    setPage(1);
    setReset(true);
    setState((prevState) => {
      return {
        ...prevState,
        from_date: "",
        to_date: "",
        refresh: true,
      };
    });
  };

  const handleSearch = (e) => {
    setState((prevState) => {
      return {
        ...prevState,
        searchValue: e.target.value,
        refresh: false,
      };
    });
  };

  const handleRadioChange = (value, name) => {
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  let datas = [
    {
      name: "billable",
      label: "Billable",
      checked: true,
    },
    {
      name: "payable",
      label: "Payable",
      checked: false,
    },
    {
      name: "difference",
      label: "Difference",
      checked: false,
    },
    {
      name: "billable_not_payable",
      label: "Billable but not Payable",
      checked: false,
    },
    {
      name: "payable_not_billable",
      label: "Payable but not Billable",
      checked: false,
    },
  ];

  if (loading) {
    return (
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "250px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  } else {
    return (
      <Container>
        <Heading name="Billable/Payable Report" />
        <FilterContainer>
          <RadioGroupsReport
            datas={datas}
            handleChange={handleRadioChange}
            value={state.filter_option}
            name="filter_option"
          />
          <DateDiv>
            <Label className="date-label">Date</Label>
            <DateRangeInput
              setState={setState}
              clearIcon={null}
              is_reset={is_reset}
            />
            {is_reset ? (
              <TableButton
                type="button"
                bcolor="#132756"
                fcolor="#fff"
                value="Search"
                onClick={handleDateFilter}
              />
            ) : (
              <TableButton
                type="button"
                bcolor="#132756"
                fcolor="#fff"
                value="Reset"
                onClick={handleDateReset}
              />
            )}
          </DateDiv>
        </FilterContainer>
        <SearchContainer>
          <TextInput
            id="outlined-start-adornment"
            sx={{ m: 0, width: "100%" }}
            placeholder="Search"
            onChange={(e) => handleSearch(e)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <img
                    src={require("../../Assets/images/searchfilter.png")}
                    alt=""
                  />
                </InputAdornment>
              ),
              inputProps: { maxLength: 100 },
            }}
          />
        </SearchContainer>
        <BillablePayableReportTable
          filter_option={state.filter_option}
          data={state.data}
          setState={setState}
          setPage={setPage}
          page={page}
          setRowsPerPage={setRowsPerPage}
          rowsperpage={rowsperpage}
          excelExportSource={EXCEL_EXPORT_SOURCES[state.filter_option]}
          searchParams={{
            search: state.searchValue || undefined,
            filter_date_gte:
              (state.from_date && convert_date_format(state.from_date)) ||
              undefined,
            filter_date_lte:
              (state.to_date && convert_date_format(state.to_date)) ||
              undefined,
          }}
        />
      </Container>
    );
  }
}

export default BillablePayableReport;

const TableButton = styled.input`
  background-color: ${({ bcolor }) => (bcolor ? bcolor : "unset")};
  border: none;
  color: ${({ fcolor }) => (fcolor ? fcolor : "unset")};
  border-radius: 4px;
  font-size: 16px;
  padding: 8px 25px;
  cursor: pointer;
  font-weight: 500;
  line-height: 1.5;
  margin-left: 18px;
`;

const TextInput = styled(TextField)`
  width: 30% !important;
  fieldset {
    border-color: #132756 !important;
    border-width: 2px !important;
    color: #001b54 !important;
    border-radius: 4px;
    opacity: 0.7;
  }
  input {
    padding: 9.5px;
    padding-left: 20px;
    ::placeholder {
      color: #132756 !important;
      font-weight: 600;
      font-size: 12px;
      opacity: 1 !important;
    }
  }
  img {
    margin-right: 13px;
  }
`;
const Container = styled.div`
  padding: 15px;
`;
const FilterContainer = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.05);
  padding: 22px 120px 22px 40px;
  margin: 15px 0px;
  width: 85%;
`;
const DateDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 40%;
  /* margin-left: 20px; */
`;

const Label = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #444445;
  padding-left: 20px;
`;
const SearchContainer = styled.div`
  /* width: 30%; */
  margin: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
