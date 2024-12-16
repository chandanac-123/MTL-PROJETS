import React, { useState, useEffect } from "react";
import Heading from "../Components/Heading";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import TableComponent from "../Components/TableComponent";
import SelectBoxLabel from "../Components/SelectBoxLabel";
import { meter_reading_list } from "../Api/MeterReadingApis";
import axios from "axios";
import { selectAccess } from "../Slices/authSlice";
import { useSelector } from "react-redux";
import { convert_date_format } from "../Functions/utils";
import SearchButton from "../Components/SearchButton";
import DateRangeInput from "../Components/DateRangeInput";
import { fiels_agent_url } from "../Api/VerificationApis";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { get_data } from "../Store/common/commonSlice";
import { useMediaQuery } from "react-responsive";
import MeterReadingHeader from "./MeterReading/MeterReadingHeader";
import { DEFAULT_PAGE_SIZE } from "../common/constants";
import { getPageSize } from "../common/utils";

const getSearchParams = (state) => ({
  search: state.searchValue || undefined,
  fieldagent__id: state.fieldagent_name || undefined,
  created_at__date__gte: state.from_date
    ? convert_date_format(state.from_date)
    : undefined,
  created_at__date__lte: state.to_date
    ? convert_date_format(state.to_date)
    : undefined,
});

function MeterReading() {
  const dispatch = useDispatch();
  const isMobileScreen = useMediaQuery({ query: "(max-width: 480px)" });
  const access = useSelector(selectAccess);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [dateReset, setDateReset] = useState(true);
  const [rowsperpage, setRowsPerPage] = useState(DEFAULT_PAGE_SIZE);
  const [state, setState] = useState({
    from_date: "",
    to_date: "",
    data: [],
    searchValue: "",
    refresh: false,
    verificationsAgent: [],
    fieldagent_name: "",
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
      let url = meter_reading_list;
      url = !state.searchValue
        ? meter_reading_list +
          `?fieldagent__id=${state.fieldagent_name}&page=${page}&page_size=${pageSize}`
        : meter_reading_list +
          `?search=${state.searchValue}&fieldagent__id=${
            state.fieldagent_name
          }&page=${1}&page_size=${pageSize}`;
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
      //   let url=meter_reading_list
      //   url =!state.searchValue ? meter_reading_list + `?fieldagent__id=${state.fieldagent_name}&page=${page}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`:meter_reading_list + `?search=${state.searchValue}&fieldagent__id=${state.fieldagent_name}&page=${1}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`
      //   const result = await axios.get(url,
      //       { headers: {"Authorization" : `Bearer ${access}`} })
      //       if(result.status === 200){
      //         setState((prevState)=> {
      //           return {
      //             ...prevState,
      //             data: result.data,
      //             refresh: false
      //           }
      //         })
      //         setLoading(false)
      //       }
      // } catch (error) {
      //     setState((prevState)=> {
      //       return {
      //           ...prevState,
      //           refresh: false
      //       }
      //     })
      // }
    }
    fetchMyAPI();
  }, [state.refresh]);

  useEffect(() => {
    async function fetchMyAPI() {
      dispatch(get_data(fiels_agent_url))
        .then((res) => {
          // console.log('login res => ',res);
          const result = res?.payload;
          if (res?.payload?.status === 200) {
            setState((prevState) => {
              return {
                ...prevState,
                verificationsAgent: result.data,
              };
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });

      // try {
      //     const result = await axios.get(fiels_agent_url,
      //         { headers: {"Authorization" : `Bearer ${access}`} })
      //         if(result.status === 200){
      //             setState((prevState)=> {
      //                 return {
      //                     ...prevState,
      //                     verificationsAgent: result.data

      //                 }
      //             })
      //         }
      // } catch (error) {
      //     console.log(error);
      // }
    }
    fetchMyAPI();
  }, []);

  const handleSelectChange = (value, name) => {
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
        refresh: true,
      };
    });
  };

  const handleDateSearch = async () => {
    setDateReset(false);
    let startDate = state.from_date ? convert_date_format(state.from_date) : "";
    let endDate = state.to_date ? convert_date_format(state.to_date) : "";
    let url = meter_reading_list;
    url =
      meter_reading_list +
      `?created_at__date__gte=${startDate}&created_at__date__lte=${endDate}&search=${state.searchValue}`;
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
    //     let url = meter_reading_list
    //     url =meter_reading_list + `?created_at__date__gte=${startDate}&created_at__date__lte=${endDate}&search=${state.searchValue}`
    //     const result = await axios.get(url,
    //         { headers: {"Authorization" : `Bearer ${access}`} })
    //         if(result.status === 200){
    //             setState((prevState)=> {
    //                 return {
    //                     ...prevState,
    //                     data: result.data,
    //                     refresh: false,
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
    setState((prevState) => {
      return {
        ...prevState,
        fieldagent_name: "",
        refresh: true,
      };
    });
  };

  const handleDateReset = () => {
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
        <Heading name="Meter Reading" />
        {isMobileScreen ? (
          <MeterReadingHeader
            state={state}
            handleSelectChange={handleSelectChange}
            handleReset={handleReset}
            setState={setState}
            dateReset={dateReset}
            handleDateReset={handleDateReset}
            handleDateSearch={handleDateSearch}
          />
        ) : (
          <FilterContainer>
            <AgentDiv>
              <Label>Verification Agent</Label>
              <SelectBoxLabel
                datas={state.verificationsAgent}
                handleChange={handleSelectChange}
                name="fieldagent_name"
                value={state.fieldagent_name}
                selectType="EmployeeName"
                default=""
                fpadding="9.5px 14px"
                fsize="12px"
                min_width="235px"
              />
              <TableButton
                type="button"
                bcolor="#132756"
                fcolor="#fff"
                value="Reset"
                onClick={handleReset}
              />
            </AgentDiv>
            <DateDiv>
              <Label>Date</Label>
              <DateRangeInput
                setState={setState}
                clearIcon={null}
                is_reset={dateReset}
              />
              <ButtonDiv>
                {!dateReset ? (
                  <SearchButton handleSearch={handleDateReset} title="Reset" />
                ) : (
                  <SearchButton handleSearch={handleDateSearch} />
                )}
              </ButtonDiv>
            </DateDiv>
          </FilterContainer>
        )}

        <TableComponent
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

export default MeterReading;

const Container = styled.div`
  padding: 15px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.05);
  padding: 15px 25px;
  margin: 15px 0px;
  width: 94%;
`;
const AgentDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 45%;
`;
const DateDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 35%;
  margin-left: 20px;
`;
const ButtonDiv = styled.div`
  margin-right: 25px;
`;

const Label = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #444445;
`;

export const TableButton = styled.input`
  background-color: ${({ bcolor }) => (bcolor ? bcolor : "unset")};
  border: none;
  color: ${({ fcolor }) => (fcolor ? fcolor : "unset")};
  border-radius: 4px;
  font-size: 15px;
  padding: 8px 20px;
  cursor: pointer;
  font-weight: 500;
  line-height: 1.2;
  /* margin-right: 200px */
`;
