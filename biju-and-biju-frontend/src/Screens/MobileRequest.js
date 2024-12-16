import React, { useState, useEffect } from "react";
import Heading from "../Components/Heading";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import RadioGroups from "../Components/RadioGroups";
import MobileRequestTable from "../Components/MobileRequestTable";
import { mobile_requests } from "../Api/MobileRequestApis";
import { selectAccess } from "../Slices/authSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { get_data } from "../Store/common/commonSlice";
import { useMediaQuery } from "react-responsive";
import MobileRequestHeader from "../Components/MobileRequest/MobileRequestHeader";
import { DEFAULT_PAGE_SIZE } from "../common/constants";
import { getPageSize } from "../common/utils";
import SearchInput from "../Components/Common/SearchInput";

const getSearchParams = (state) => ({
  search: state.searchValue || undefined,
  mobile_request_status:
    !state.filter_option || state.filter_option === "All"
      ? undefined
      : state.filter_option,
});

function MobileRequest() {
  const dispatch = useDispatch();
  const isMobileScreen = useMediaQuery({ query: "(max-width: 480px)" });
  const access = useSelector(selectAccess);
  const [page, setPage] = useState(1);
  const [rowsperpage, setRowsPerPage] = useState(DEFAULT_PAGE_SIZE);
  const [state, setState] = useState({
    filter_option: "All",
    data: [],
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
      let url = mobile_requests;
      if (state.filter_option === "Accepted") {
        url = !state.searchValue
          ? mobile_requests +
            `?mobile_request_status=${"Accepted"}&page=${page}&page_size=${pageSize}`
          : mobile_requests +
            `?search=${
              state.searchValue
            }&mobile_request_status=${"Accepted"}&page=${1}&page_size=${pageSize}`;
      } else if (state.filter_option === "Rejected") {
        url = !state.searchValue
          ? mobile_requests +
            `?mobile_request_status=${"Rejected"}&page=${page}&page_size=${pageSize}`
          : mobile_requests +
            `?search=${
              state.searchValue
            }&mobile_request_status=${"Rejected"}&page=${1}&page_size=${pageSize}`;
      } else if (state.filter_option === "Pending") {
        url = !state.searchValue
          ? mobile_requests +
            `?mobile_request_status=${"Pending"}&page=${page}&page_size=${pageSize}`
          : mobile_requests +
            `?search=${
              state.searchValue
            }&mobile_request_status=${"Pending"}&page=${1}&page_size=${pageSize}`;
      } else {
        url = !state.searchValue
          ? mobile_requests + `?page=${page}&page_size=${pageSize}`
          : mobile_requests +
            `?search=${state.searchValue}&page=${1}&page_size=${pageSize}`;
      }

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
      //   let url = mobile_requests
      //   if(state.filter_option === 'Accepted'){
      //     url =!state.searchValue ? mobile_requests + `?mobile_request_status=${'Accepted'}&page=${page}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`:mobile_requests + `?search=${state.searchValue}&mobile_request_status=${'Accepted'}&page=${1}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`
      //   }else if(state.filter_option === 'Rejected'){
      //     url = !state.searchValue ? mobile_requests + `?mobile_request_status=${'Rejected'}&page=${page}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`:mobile_requests + `?search=${state.searchValue}&mobile_request_status=${'Rejected'}&page=${1}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`
      //   }else if(state.filter_option === 'Pending'){
      //     url = !state.searchValue ? mobile_requests + `?mobile_request_status=${'Pending'}&page=${page}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`:mobile_requests + `?search=${state.searchValue}&mobile_request_status=${'Pending'}&page=${1}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`
      //   }else{
      //     url =!state.searchValue ? mobile_requests + `?page=${page}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`:mobile_requests + `?search=${state.searchValue}&page=${1}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`
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

  const handleRadioChange = (value, name) => {
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
        refresh: true,
      };
    });
  };

  let filter_datas = [
    {
      name: "All",
      label: "All",
    },
    {
      name: "Pending",
      label: "Pending",
    },
    {
      name: "Accepted",
      label: "Accepted",
    },
    {
      name: "Rejected",
      label: "Rejected",
    },
  ];

  const handleSearch = (searchExp) => {
    setState((prevState) => {
      return {
        ...prevState,
        searchValue: searchExp,
        refresh: false,
      };
    });
  };

  return (
    <Container>
      <Heading name="Mobile Request" />
      {isMobileScreen ? (
        <MobileRequestHeader
          handleSearch={handleSearch}
          filter_datas={filter_datas}
          handleRadioChange={handleRadioChange}
          state={state}
        />
      ) : (
        <>
          <FilterContainer>
            <RadioGroups
              datas={filter_datas}
              handleChange={handleRadioChange}
              value={state.filter_option}
              name="filter_option"
            />
          </FilterContainer>
          <SearchContainer>
            <SearchInput
              handleSearch={handleSearch}
              value={state.searchValue}
            />
          </SearchContainer>
        </>
      )}

      <MobileRequestTable
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

export default MobileRequest;

const TextInput = styled(TextField)`
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
export const SearchContainer = styled.div`
  width: 30%;
  margin: 28px;
`;
