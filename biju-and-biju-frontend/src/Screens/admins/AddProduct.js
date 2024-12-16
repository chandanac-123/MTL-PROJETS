import React, { useState, useEffect } from "react";
import Heading from "../../Components/Heading";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import RadioGroups from "../../Components/RadioGroups";
import AddProductModal from "../../Components/Admin/AddProductModal";
import AddProductTable from "../../Components/Admin/AddProductTable";

import { product_api } from "../../Api/ProductApis";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import AlertMessage from "../../Components/Common/AlertMessage";
import { GetPermission } from "../../Functions/utils";
import { useDispatch } from "react-redux";
import { get_data } from "../../Store/common/commonSlice";
import { DEFAULT_PAGE_SIZE } from "../../common/constants";

const getSearchParams = (state) => {
  let status;
  if (state.filter_value === "active") {
    status = true;
  } else if (state.filter_value === "inactive") {
    status = false;
  }
  return {
    status,
    search: state.searchValue || undefined,
  };
};

function AddProduct() {
  const dispatch = useDispatch();
  const permission = GetPermission("product", "change");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [rowsperpage, setRowsPerPage] = useState(DEFAULT_PAGE_SIZE);
  const [state, setState] = useState({
    filter_value: "all",
    data: [],
    searchValue: "",
    refresh: false,
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
      let url = product_api;
      // if (state.filter_value === "active") {
      //   url = !state.searchValue ? product_api + `?status=${true}&page=${page}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}` : product_api + `?search=${state.searchValue}&status=${true}&page=${1}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}`;
      // } else if (state.filter_value === "inactive") {
      //   url = !state.searchValue ? product_api + `?status=${false}&page=${page}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}` : product_api + `?search=${state.searchValue}&status=${false}&page=${1}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}`;
      // } else {
      //   url = !state.searchValue ? product_api + `?page=${page}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}` : product_api + `?search=${state.searchValue}&page=${1}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}`;
      // }

      if (state.filter_value === "active") {
        url =
          product_api + `?status=${true}&page=${page}&page_size=${rowsperpage}`;
      } else if (state.filter_value === "inactive") {
        url =
          product_api +
          `?status=${false}&page=${page}&page_size=${rowsperpage}`;
      } else {
        url = product_api + `?page=${page}&page_size=${rowsperpage}`;
      }

      if (state.searchValue) {
        url = `${url}&search=${state.searchValue}`;
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
      //   let url = product_api;
      //   if (state.filter_value === "active") {
      //     url = !state.searchValue ? product_api + `?status=${true}&page=${page}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}` : product_api + `?search=${state.searchValue}&status=${true}&page=${1}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}`;
      //   } else if (state.filter_value === "inactive") {
      //     url = !state.searchValue ? product_api + `?status=${false}&page=${page}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}` : product_api + `?search=${state.searchValue}&status=${false}&page=${1}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}`;
      //   } else {
      //     url = !state.searchValue ? product_api + `?page=${page}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}` : product_api + `?search=${state.searchValue}&page=${1}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}`;
      //   }
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

  const handleRadioChange = (value, name) => {
    setPage(1);
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
        <Heading name="Add Product" />
        <FilterContainer>
          <RadioGroups
            datas={datas}
            handleChange={handleRadioChange}
            value={state.filter_value}
            name="filter_value"
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
            <AddProductModal
              setState={setState}
              snackbarStatus={snackbarStatus}
              setSnackbarStatus={setSnackbarStatus}
            />
          )}
        </SearchContainer>
        <AddProductTable
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

export default AddProduct;

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
