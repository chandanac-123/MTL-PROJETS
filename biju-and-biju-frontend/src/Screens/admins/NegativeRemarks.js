import React, { useState, useEffect } from "react";
import Heading from "../../Components/Heading";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AddNegativeRemarksModal from "../../Components/Admin/AddNegativeRemarksModal";
import NegativeRemarksTable from "../../Components/Admin/NegativeRemarksTable";
import { selectAccess } from "../../Slices/authSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { negative_remark } from "../../Api/SettingsAPIs";
import AlertMessage from "../../Components/Common/AlertMessage";
import { GetPermission } from "../../Functions/utils";
import { useDispatch } from "react-redux";
import { get_data } from "../../Store/common/commonSlice";
import { DEFAULT_PAGE_SIZE } from "../../common/constants";
import { getPageSize } from "../../common/utils";

const getSearchParams = (state) => {
  return {
    search: state.searchValue || undefined,
  };
};

function NegativeRemarks() {
  const dispatch = useDispatch();
  const permission = GetPermission("negativeremarks", "change");
  const access = useSelector(selectAccess);
  const [page, setPage] = useState(1);
  const [rowsperpage, setRowsPerPage] = useState(DEFAULT_PAGE_SIZE);
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

      let url = negative_remark;
      url = !state.searchValue
        ? negative_remark + `?page=${page}&page_size=${pageSize}`
        : negative_remark +
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
      //   let url = negative_remark
      //       url =!state.searchValue ? negative_remark + `?page=${page}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`:negative_remark + `?search=${state.searchValue}&page=${1}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`
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
      <Heading name="Negative Remarks" />
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
          <AddNegativeRemarksModal
            setState={setState}
            setSnackbarStatus={setSnackbarStatus}
            snackbarStatus={snackbarStatus}
          />
        )}
      </SearchContainer>
      <NegativeRemarksTable
        data={state.data}
        setState={setState}
        setPage={setPage}
        page={page}
        setRowsPerPage={setRowsPerPage}
        setSnackbarStatus={setSnackbarStatus}
        snackbarStatus={snackbarStatus}
        rowsperpage={rowsperpage}
        searchParams={getSearchParams(state)}
      />
    </Container>
  );
}

export default NegativeRemarks;

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
  width: 94%;
  margin: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
