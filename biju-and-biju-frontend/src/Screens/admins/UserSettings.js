import React, { useState, useEffect } from "react";
import Heading from "../../Components/Heading";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import RadioGroups from "../../Components/RadioGroups";
import UserSettingsTable from "../../Components/Admin/UserSettingsTable";
import { selectAccess } from "../../Slices/authSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { user_settings } from "../../Api/UserApis";
import AlertMessage from "../../Components/Common/AlertMessage";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { GetDatas } from "../../Functions/utils";
import { get_data } from "../../Store/common/commonSlice";
import { useDispatch } from "react-redux";
import { DEFAULT_PAGE_SIZE } from "../../common/constants";
import { getPageSize } from "../../common/utils";

const GROUP_TYPES = {
  group_leader_role: "GroupLeader",
  product_coordinator_role: "ProductCoordinator",
  team_member_role: "TeamMember",
  district_coordinator_role: "DistrictCoordinator",
  executive_admin: "ExecutiveOfficeAdmin",
};

const getSearchParams = (state) => {
  return {
    search: state.searchValue || undefined,
    user__user_type: GROUP_TYPES[state.status_filter] || undefined,
  };
};
function UserSettings() {
  const dispatch = useDispatch();
  const user_type = useSelector((state) => state.auth.user_type);
  let radioDatas = GetDatas(user_type);
  const access = useSelector(selectAccess);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [rowsperpage, setRowsPerPage] = useState(DEFAULT_PAGE_SIZE);
  const [state, setState] = useState({
    status_filter: "",
    data: [],
    refresh: false,
    searchValue: "",
  });
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
  }, [page, rowsperpage, state.searchValue]);

  useEffect(() => {
    async function fetchMyAPI() {
      const pageSize = getPageSize(rowsperpage);

      let url = user_settings;
      if (state.status_filter === "group_leader_role") {
        url = !state.searchValue
          ? user_settings +
            `?user__user_type=${"GroupLeader"}&page=${page}&page_size=${pageSize}`
          : user_settings +
            `?search=${
              state.searchValue
            }&user__user_type=${"GroupLeader"}&page=${1}&page_size=${pageSize}`;
      } else if (state.status_filter === "product_coordinator_role") {
        url = !state.searchValue
          ? user_settings +
            `?user__user_type=${"ProductCoordinator"}&page=${page}&page_size=${pageSize}`
          : user_settings +
            `?search=${
              state.searchValue
            }&user__user_type=${"ProductCoordinator"}&page=${1}&page_size=${pageSize}`;
      } else if (state.status_filter === "team_member_role") {
        url = !state.searchValue
          ? user_settings +
            `?user__user_type=${"TeamMember"}&page=${page}&page_size=${pageSize}`
          : user_settings +
            `?search=${
              state.searchValue
            }&user__user_type=${"TeamMember"}&page=${1}&page_size=${pageSize}`;
      } else if (state.status_filter === "district_coordinator_role") {
        url = !state.searchValue
          ? user_settings +
            `?user__user_type=${"DistrictCoordinator"}&page=${page}&page_size=${pageSize}`
          : user_settings +
            `?search=${
              state.searchValue
            }&user__user_type=${"DistrictCoordinator"}&page=${1}&page_size=${pageSize}`;
      } else if (state.status_filter === "executive_admin") {
        url = !state.searchValue
          ? user_settings +
            `?user__user_type=${"ExecutiveOfficeAdmin"}&page=${page}&page_size=${pageSize}`
          : user_settings +
            `?search=${
              state.searchValue
            }&user__user_type=${"ExecutiveOfficeAdmin"}&page=${1}&page_size=${pageSize}`;
      } else {
        url = !state.searchValue
          ? user_settings + `?page=${page}&page_size=${pageSize}`
          : user_settings +
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
      //   let url = user_settings
      //   if(state.status_filter === 'group_leader_role'){
      //      url= !state.searchValue ? user_settings +`?user__user_type=${'GroupLeader'}&page=${page}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`:user_settings +`?search=${state.searchValue}&user__user_type=${'GroupLeader'}&page=${1}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`
      //   }else if(state.status_filter === 'product_coordinator_role'){
      //     url = !state.searchValue ? user_settings +`?user__user_type=${"ProductCoordinator"}&page=${page}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`:user_settings +`?search=${state.searchValue}&user__user_type=${"ProductCoordinator"}&page=${1}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`
      //   }else if(state.status_filter === 'team_member_role'){
      //     url = !state.searchValue ? user_settings +`?user__user_type=${"TeamMember"}&page=${page}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`:user_settings +`?search=${state.searchValue}&user__user_type=${"TeamMember"}&page=${1}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`
      //   }else if(state.status_filter === 'district_coordinator_role'){
      //     url = !state.searchValue ? user_settings +`?user__user_type=${"DistrictCoordinator"}&page=${page}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`:user_settings +`?search=${state.searchValue}&user__user_type=${"DistrictCoordinator"}&page=${1}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`
      //   }else if(state.status_filter === 'executive_admin'){
      //     url = !state.searchValue ? user_settings +`?user__user_type=${"ExecutiveOfficeAdmin"}&page=${page}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`:user_settings +`?search=${state.searchValue}&user__user_type=${"ExecutiveOfficeAdmin"}&page=${1}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`
      //   }
      //   else{
      //     url =!state.searchValue ? user_settings +`?page=${page}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`:user_settings +`?search=${state.searchValue}&page=${1}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`
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
      //             setLoading(false);
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
        <Heading name="User Settings" />
        <FilterContainer>
          <RadioGroups
            handleChange={handleRadioChange}
            value={state.status_filter}
            name="status_filter"
            datas={radioDatas}
            mr="25px"
          />
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
          {/* <UserSettingsModal /> */}
        </SearchContainer>
        <UserSettingsTable
          data={state.data}
          setState={setState}
          setPage={setPage}
          page={page}
          setRowsPerPage={setRowsPerPage}
          rowsperpage={rowsperpage}
          snackbarStatus={snackbarStatus}
          setSnackbarStatus={setSnackbarStatus}
          searchParams={getSearchParams(state)}
        />
      </Container>
    );
  }
}
export default UserSettings;

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
  /* display: flex; */
  justify-content: flex-start;
  align-items: center;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.05);
  padding: 15px 25px;
  margin: 15px 0px;
  width: 94%;
`;

const SearchContainer = styled.div`
  width: 94%;
  margin: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
