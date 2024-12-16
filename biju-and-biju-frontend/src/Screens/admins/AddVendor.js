import React, { useState, useEffect } from "react";
import Heading from "../../Components/Heading";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import RadioGroups from "../../Components/RadioGroups";
import AddVendorModal from "../../Components/Admin/AddVendorModal";
import AddVendorTable from "../../Components/Admin/AddVendorTable";
import { selectAccess } from "../../Slices/authSlice";
import { useSelector } from "react-redux";
import { vendor_api } from "../../Api/UserApis";
import AlertMessage from "../../Components/Common/AlertMessage";
import { GetPermission } from "../../Functions/utils";
import { get_data } from "../../Store/common/commonSlice";
import { useDispatch } from "react-redux";
import { DEFAULT_PAGE_SIZE } from "../../common/constants";
import { getPageSize } from "../../common/utils";

const getSearchParams = (state) => {
  let user__is_active;
  if (state.search_filter === "active") {
    user__is_active = true;
  } else if (state.search_filter === "inactive") {
    user__is_active = false;
  }
  return {
    user__is_active,
    search: state.searchValue || undefined,
  };
};

function AddVendor() {
  const dispatch = useDispatch();
  const permission = GetPermission("add_vendor", "change");
  const access = useSelector(selectAccess);
  const [page, setPage] = useState(1);
  const [rowsperpage, setRowsPerPage] = useState(DEFAULT_PAGE_SIZE);
  const [snackbarStatus, setSnackbarStatus] = useState({
    isOpen: false,
    severity: "success",
    message: "",
  });
  const [state, setState] = useState({
    search_filter: "all",
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

      let url = vendor_api;
      if (state.search_filter === "active") {
        url = !state.searchValue
          ? vendor_api +
            `?user__is_active=${true}&page=${page}&page_size=${pageSize}`
          : vendor_api +
            `?search=${
              state.searchValue
            }&user__is_active=${true}&page=${page}&page_size=${pageSize}`;
      } else if (state.search_filter === "inactive") {
        url = !state.searchValue
          ? vendor_api +
            `?user__is_active=${false}&page=${page}&page_size=${pageSize}`
          : vendor_api +
            `?search=${
              state.searchValue
            }&user__is_active=${false}&page=${page}&page_size=${pageSize}`;
      } else {
        url = !state.searchValue
          ? vendor_api + `?page=${page}&page_size=${pageSize}`
          : vendor_api +
            `?search=${state.searchValue}&page=${page}&page_size=${pageSize}`;
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
      //   let url=vendor_api
      //   if(state.search_filter === 'active'){
      //     url = !state.searchValue ? vendor_api + `?user__is_active=${true}&page=${page}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`:vendor_api + `?search=${state.searchValue}&user__is_active=${true}&page=${1}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`
      //   }else if(state.search_filter === 'inactive'){
      //     url = !state.searchValue ? vendor_api + `?user__is_active=${false}&page=${page}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`:vendor_api + `?search=${state.searchValue}&user__is_active=${false}&page=${1}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`
      //   }else{
      //     url =!state.searchValue ? vendor_api + `?page=${page}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`: vendor_api + `?search=${state.searchValue}&page=${1}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`
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

  let datas = [
    {
      name: "all",
      label: "All",
    },
    {
      name: "active",
      label: "Active",
    },
    {
      name: "inactive",
      label: "Inactive",
    },
  ];

  const handleRadioChange = (value, name) => {
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
        refresh: true,
      };
    });
  };

  const handleSearch = (e) => {
    setPage(1);
    setState((prevState) => {
      return {
        ...prevState,
        searchValue: e.target.value,
        refresh: false,
      };
    });
  };

  return (
    <Container>
      <AlertMessage
        setSnackbarStatus={setSnackbarStatus}
        snackbarStatus={snackbarStatus}
      />
      <Heading name="Add Vendor" />
      <FilterContainer>
        <RadioGroups
          datas={datas}
          handleChange={handleRadioChange}
          value={state.search_filter}
          name="search_filter"
          mr="42px"
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
        {permission && (
          <AddVendorModal
            setState={setState}
            snackbarStatus={snackbarStatus}
            setSnackbarStatus={setSnackbarStatus}
          />
        )}
      </SearchContainer>
      <AddVendorTable
        data={state.data}
        setState={setState}
        setPage={setPage}
        snackbarStatus={snackbarStatus}
        setSnackbarStatus={setSnackbarStatus}
        page={page}
        setRowsPerPage={setRowsPerPage}
        rowsperpage={rowsperpage}
        searchParams={getSearchParams(state)}
      />
    </Container>
  );
}

export default AddVendor;

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

const SearchContainer = styled.div`
  width: 94%;
  margin: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
