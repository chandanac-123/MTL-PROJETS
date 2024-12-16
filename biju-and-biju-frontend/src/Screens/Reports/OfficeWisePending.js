import React, { useEffect, useState } from "react";
import Heading from "../../Components/Heading";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import OfficeWisePendingTable from "../../Components/Reports/OfficeWisePendingTable";
import { useSelector } from "react-redux";
import { selectAccess } from "../../Slices/authSlice";
import { office_wise_pending } from "../../Api/ReportsApis";
import axios from "axios";
import { GetPermission } from "../../Functions/utils";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { get_data } from "../../Store/common/commonSlice";
import { DEFAULT_PAGE_SIZE } from "../../common/constants";
import { getPageSize } from "../../common/utils";

function OfficeWisePending() {
  const dispatch = useDispatch();
  const permission = GetPermission("office_wise_pending", "change");
  const access = useSelector(selectAccess);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [rowsperpage, setRowsPerPage] = useState(DEFAULT_PAGE_SIZE);
  const [state, setState] = useState({
    data: [],
    searchValue: "",
    refresh: false,
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

      let url = !state.searchValue
        ? office_wise_pending + `?page=${page}&page_size=${pageSize}`
        : office_wise_pending +
          `?search=${state.searchValue}&page=${1}&page_size=${pageSize}`;
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
      //     let url = !state.searchValue ? office_wise_pending + `?page=${page}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`: office_wise_pending + `?search=${state.searchValue}&page=${1}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`
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
      //     console.log(error);
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

  const handleSearchItem = (e) => {
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
        <Heading name="Office Wise Pending Cases" />
        <SearchContainer>
          <TextInput
            id="outlined-start-adornment"
            sx={{ m: 0, width: "100%" }}
            placeholder="Search"
            onChange={(e) => handleSearchItem(e)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <img src={require("../../Assets/images/searchfilter.png")} />
                </InputAdornment>
              ),
            }}
          />
        </SearchContainer>
        {permission && (
          <OfficeWisePendingTable
            data={state.data}
            setState={setState}
            setPage={setPage}
            page={page}
            setRowsPerPage={setRowsPerPage}
            rowsperpage={rowsperpage}
            searchParams={{
              search: state.searchValue,
            }}
          />
        )}
      </Container>
    );
  }
}

export default OfficeWisePending;

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
const SearchContainer = styled.div`
  /* width: 30%; */
  margin: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
