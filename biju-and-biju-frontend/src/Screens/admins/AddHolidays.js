import React, { useState, useEffect } from "react";
import Heading from "../../Components/Heading";
import styled from "styled-components";
import AddHolidayModal from "../../Components/Admin/AddHolidayModal";
import AddHolidayTable from "../../Components/Admin/AddHolidayTable";
import DateRangeInput from "../../Components/DateRangeInput";
import { selectAccess } from "../../Slices/authSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { holiday_url } from "../../Api/HolidayApis";
import { convert_date_format } from "../../Functions/utils";
import SearchButton from "../../Components/SearchButton";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import AlertMessage from "../../Components/Common/AlertMessage";
import { GetPermission } from "../../Functions/utils";
import { get_data } from "../../Store/common/commonSlice";
import { useDispatch } from "react-redux";
import { DEFAULT_PAGE_SIZE } from "../../common/constants";
import { getPageSize } from "../../common/utils";

const getSearchParams = (state) => {
  return {
    holiday_date__gte: state.from_date
      ? convert_date_format(state.from_date)
      : undefined,
    holiday_date__lte: state.to_date
      ? convert_date_format(state.to_date)
      : undefined,
    search: state.searchValue || undefined,
  };
};

function AddHolidays() {
  const dispatch = useDispatch();
  const permission = GetPermission("holiday", "change");
  const access = useSelector(selectAccess);
  const [dateReset, setDateReset] = useState(true);
  const [page, setPage] = useState(1);
  const [rowsperpage, setRowsPerPage] = useState(DEFAULT_PAGE_SIZE);
  const [state, setState] = useState({
    data: [],
    refresh: false,
    searchValue: "",
    from_date: "",
    to_date: "",
  });
  const [loading, setLoading] = useState(true);
  const [snackbarStatus, setSnackbarStatus] = useState({
    isOpen: false,
    severity: "success",
    message: "",
  });

  useEffect(() => {
    setState((prevState) => {
      return {
        ...prevState,
        refresh: true,
      };
    });
  }, [page, rowsperpage]);

  useEffect(() => {
    async function fetchMyAPI() {
      const pageSize = getPageSize(rowsperpage);

      let url =
        holiday_url +
        `?search=${state.searchValue}&page=${page}&page_size=${pageSize}`;
      dispatch(get_data(url))
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
      //   let url = holiday_url + `?search=${state.searchValue}&page=${page}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`;
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

  const handledateSearch = async () => {
    setDateReset(false);
    let startDate = state.from_date ? convert_date_format(state.from_date) : "";
    let endDate = state.to_date ? convert_date_format(state.to_date) : "";
    let url =
      holiday_url +
      `?holiday_date__gte=${startDate}&holiday_date__lte=${endDate}&search=${state.searchValue}`;

    dispatch(get_data(url))
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
    //  let url =holiday_url +`?holiday_date__gte=${startDate}&holiday_date__lte=${endDate}&search=${state.searchValue}`;
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
  };

  const handledateReset = () => {
    setDateReset(true);
    setState((prevState) => {
      return {
        ...prevState,
        startDate: "",
        endDate: "",
        refresh: true,
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
        <Heading name="Add Holidays" />
        <FilterContainer>
          <HeadDiv className="secondary">
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
                <SearchButton handleSearch={handledateSearch} />
              ) : (
                <SearchButton title="Reset" handleSearch={handledateReset} />
              )}
            </ButtonDiv>
          </HeadDiv>
        </FilterContainer>
        {permission && (
          <SearchContainer>
            <AddHolidayModal
              setState={setState}
              snackbarStatus={snackbarStatus}
              setSnackbarStatus={setSnackbarStatus}
            />
          </SearchContainer>
        )}
        <AddHolidayTable
          data={state.data}
          snackbarStatus={snackbarStatus}
          setSnackbarStatus={setSnackbarStatus}
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

export default AddHolidays;

const ButtonDiv = styled.div`
  margin-left: 120px;
`;

const HeadDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  &.first {
    margin-bottom: 15px;
  }
  &.secondary {
    width: 55%;
  }
`;

const Container = styled.div`
  padding: 15px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.05);
  padding: 15px 25px;
  margin: 15px 0px;
  width: 94%;
`;

const DateDiv = styled.div`
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  width: 35%;
`;

const Label = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #444445;
  margin-right: 12px;
`;
const SearchContainer = styled.div`
  width: 94%;
  margin: 28px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
