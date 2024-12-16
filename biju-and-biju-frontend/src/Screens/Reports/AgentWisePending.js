import React, { useState, useEffect } from "react";
import Heading from "../../Components/Heading";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AgentWisePendingTable from "../../Components/Reports/AgentWisePendingTable";
import { agentwise_pending_district } from "../../Api/ReportsApis";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { selectAccess } from "../../Slices/authSlice";
import { useSelector } from "react-redux";
import { GetPermission } from "../../Functions/utils";
import { useDispatch } from "react-redux";
import { get_data } from "../../Store/common/commonSlice";
import { DEFAULT_PAGE_SIZE } from "../../common/constants";
import { getPageSize } from "../../common/utils";

function AgentWisePending() {
  const dispatch = useDispatch();
  const permission = GetPermission("agent_wise_pending", "change");
  const access = useSelector(selectAccess);
  const [page, setPage] = useState(1);
  const [rowsperpage, setRowsPerPage] = useState(DEFAULT_PAGE_SIZE);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    filterDate: new Date(),
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

      let url = !state.searchValue
        ? agentwise_pending_district + `?page=${page}&page_size=${pageSize}`
        : agentwise_pending_district +
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
      // let  url = !state.searchValue ? agentwise_pending_district+`?page=${page}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`:agentwise_pending_district+`?search=${state.searchValue}&page=${1}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`;
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
        <Heading name="Agent Wise Pending Cases" />
        <SearchContainer>
          <TextInput
            id="outlined-start-adornment"
            sx={{ m: 0, width: "100%" }}
            placeholder="Search"
            onChange={(e) => handleSearch(e)}
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
          <AgentWisePendingTable
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

export default AgentWisePending;

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
