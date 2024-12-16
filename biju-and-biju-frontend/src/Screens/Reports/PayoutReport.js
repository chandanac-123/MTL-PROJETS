import React, { useState, useEffect } from "react";
import Heading from "../../Components/Heading";
import styled from "styled-components";
import DateRangeInput from "../../Components/DateRangeInput";
import SearchButton from "../../Components/SearchButton";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import PayoutReportAddModal from "../../Components/Reports/PayoutReportAddModal";
import PayoutReportTable from "../../Components/Reports/PayoutReportTable";
import { payout_report } from "../../Api/ReportsApis";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { selectAccess } from "../../Slices/authSlice";
import { useSelector } from "react-redux";
import { GetPermission } from "../../Functions/utils";
import { convert_date_format } from "../../Functions/utils";
import AlertMessage from "../../Components/Common/AlertMessage";
import { getDataWithParams, get_data } from "../../Store/common/commonSlice";
import { useDispatch } from "react-redux";
import { DEFAULT_PAGE_SIZE } from "../../common/constants";
import { getPageSize } from "../../common/utils";

const getSearchParams = (state, page, pageSize) => ({
  search: state.searchValue || undefined,
  filter_date_gte: state.from_date
    ? convert_date_format(state.from_date)
    : undefined,
  filter_date_lte: state.to_date
    ? convert_date_format(state.to_date)
    : undefined,
  page,
  page_size: pageSize,
});
function PayoutReport() {
  const dispatch = useDispatch();
  const permission = GetPermission("payout_reports", "change");
  const [dateReset, setDateReset] = useState(true);
  const access = useSelector(selectAccess);
  const [page, setPage] = useState(1);
  const [rowsperpage, setRowsPerPage] = useState(DEFAULT_PAGE_SIZE);
  const [loading, setLoading] = useState(true);
  const [snackbarStatus, setSnackbarStatus] = useState({
    isOpen: false,
    severity: "success",
    message: "",
  });
  const [state, setState] = useState({
    from_date: "",
    to_date: "",
    refresh: false,
    searchValue: "",
  });

  useEffect(() => {
    setState((prevState) => {
      return {
        ...prevState,
        refresh: true,
      };
    });
  }, [page, rowsperpage, state.searchValue]);

  useEffect(() => {
    async function fetchMyAPI() {
      const pageSize = getPageSize(rowsperpage);

      const params = getSearchParams(state, page, pageSize);
      const url = payout_report;

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
      // let  url = !state.searchValue ? payout_report+`?page=${page}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`:payout_report+`?search=${state.searchValue}&page=${1}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`;
      //   const result = await axios.get(url, {
      //     headers: { Authorization: `Bearer ${access}` },
      //   });
      //   if (result.status === 200) {
      //     setState((prevState) => {
      //       return {
      //         ...prevState,
      //         data: result.data,
      //         refresh: false,
      //       };
      //     });
      //     setLoading(false);
      //   }
      // } catch (error) {
      //   console.log(error);
      //   setState((prevState) => {
      //     return {
      //       ...prevState,
      //       refresh: false,
      //     };
      //   });
      // }
    }
    if (state.refresh) {
      fetchMyAPI();
    }
  }, [state.refresh]);

  const handleFilter = async () => {
    setDateReset(false);

    const pageSize = getPageSize(rowsperpage);

    setPage(1);
    const params = getSearchParams(state, 1, pageSize);
    const url = payout_report;

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
    //    let url =payout_report +`?filter_date_gte=${startDate}&filter_date_lte=${endDate}`
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
    //     console.log(error);
    //     setState((prevState)=> {
    //         return {
    //             ...prevState,
    //             refresh: false
    //         }
    //     })
    // }
  };

  const handleReset = () => {
    setDateReset(true);
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
        <AlertMessage
          setSnackbarStatus={setSnackbarStatus}
          snackbarStatus={snackbarStatus}
        />
        <Heading name="Payout Reports" />
        <FilterContainer>
          <HeadDiv>
            <DateDiv>
              <Label className="date-label">Date</Label>
              <DateRangeInput
                setState={setState}
                clearIcon={null}
                is_reset={dateReset}
              />
            </DateDiv>
            <ButtonDiv>
              {dateReset ? (
                <SearchButton handleSearch={handleFilter} />
              ) : (
                <SearchButton handleSearch={handleReset} title="Reset" />
              )}
            </ButtonDiv>
          </HeadDiv>
        </FilterContainer>
        <SearchContainer>
          <SectionDiv className="left">
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
          </SectionDiv>
          <PayoutReportAddModal
            setState={setState}
            snackbarStatus={snackbarStatus}
            setSnackbarStatus={setSnackbarStatus}
          />
        </SearchContainer>
        <PayoutReportTable
          data={state.data}
          setState={setState}
          setPage={setPage}
          page={page}
          setRowsPerPage={setRowsPerPage}
          rowsperpage={rowsperpage}
          searchParams={getSearchParams(state)}
        />
      </Container>
    );
  }
}

export default PayoutReport;

const SectionDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  &.left {
    width: 30%;
  }
`;
const TextInput = styled(TextField)`
  fieldset {
    border-color: ${({ customerid }) =>
      customerid ? "#D9D9D9 !important" : "#132756 !important"};
    border-width: ${({ customerid }) =>
      customerid ? "1px" : "2px !important"};
    /* border-color: #132756 !important; */
    /* border-width: 2px !important; */
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
const HeadDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  &.first {
    margin-bottom: 15px;
  }
  &.secondary {
    /* width: 55%; */
  }
`;
const FilterContainer = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.05);
  padding: 22px 95px 22px 40px;
  margin: 15px 0px;
  width: 87%;
`;
const DateDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 36%;
  /* margin-left: 20px; */
`;
const ButtonDiv = styled.div`
  width: 30%;
`;

const Label = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #444445;
  &.date-label {
    margin-right: 24px;
  }
`;
const SearchContainer = styled.div`
  width: 94%;
  margin: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
