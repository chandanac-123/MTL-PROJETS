import React, { useEffect, useState } from "react";
import Heading from "../../Components/Heading";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AdminManagementModal from "../../Components/AdminManagement/AdminManagementModal";
import AdminManagementTable from "../../Components/AdminManagement/AdminManagementTable";
import { GetPermission } from "../../Functions/utils";
import AlertMessage from "../../Components/Common/AlertMessage";
import { create_admin } from "../../Api/AdminManagementAPIs";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectAccess } from "../../Slices/authSlice";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { get_data } from "../../Store/common/commonSlice";
import { DEFAULT_PAGE_SIZE } from "../../common/constants";
import { getPageSize } from "../../common/utils";

const getSearchParams = (state) => ({
  search: state.searchValue || undefined,
});
function AdminManagement() {
  const dispatch = useDispatch();
  const permission = GetPermission("admin_management", "change");
  const [loading, setLoading] = useState(true);
  const access = useSelector(selectAccess);
  const [state, setState] = useState({
    data: [],
    refresh: false,
    searchValue: "",
  });
  const [snackbarStatus, setSnackbarStatus] = useState({
    isOpen: false,
    severity: "success",
    message: "",
  });
  const [page, setPage] = useState(1);
  const [rowsperpage, setRowsPerPage] = useState(DEFAULT_PAGE_SIZE);

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

      let url = create_admin;
      url = !state.searchValue
        ? url + `?page=${page}&page_size=${pageSize}`
        : url + `?search=${state.searchValue}&page=${1}&page_size=${pageSize}`;
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
      //   let url = create_admin
      //     url =!state.searchValue ? url + `?page=${page}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`:url + `?search=${state.searchValue}&page=${1}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`
      //   const result = await axios.get(url,
      //       { headers: {"Authorization" : `Bearer ${access}`} })
      //       if(result.status === 200){
      //           setState((prevState)=> {
      //               return {
      //                   ...prevState,
      //                   data: result.data,
      //                   refresh: false
      //               }
      //           })
      //           setLoading(false)
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
        <AlertMessage
          setSnackbarStatus={setSnackbarStatus}
          snackbarStatus={snackbarStatus}
        />
        <Heading name="Admin Management" />
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
          {permission && (
            <AdminManagementModal
              setSnackbarStatus={setSnackbarStatus}
              setState={setState}
            />
          )}
        </SearchContainer>
        <AdminManagementTable
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
}

export default AdminManagement;

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
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.05);
  padding: 15px 25px;
  margin: 15px 0px;
`;
const AgentDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 33%;
  margin-left: 30px;
`;
const DateDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 35%;
  margin-left: 20px;
`;
const ButtonDiv = styled.div`
  width: 30%;
`;

const Label = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #444445;
`;
const SearchContainer = styled.div`
  width: 94%;
  margin: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
