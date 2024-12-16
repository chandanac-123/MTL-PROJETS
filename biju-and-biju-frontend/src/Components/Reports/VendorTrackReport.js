import React, { useEffect, useState } from "react";
import Heading from "../../Components/Heading";
import styled from "styled-components";
import DateRangeInput from "../../Components/DateRangeInput";
import SearchButton from "../../Components/SearchButton";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FilterBox from "../../Components/FilterBox";
import AddVendorTrackModal from "./AddVendorTrackModal";
import VendorTrackReportTable from "./VendorTrackReportTable";
import SelectBoxLabel from "../SelectBoxLabel";
import { convert_date_format, GetPermission } from "../../Functions/utils";
import { useSelector } from "react-redux";
import { product_dropdown, vendor_dropdown } from "../../Api/VerificationApis";
import axios from "axios";
import { selectAccess } from "../../Slices/authSlice";
import { vendor_track_report } from "../../Api/ReportsApis";
import AlertMessage from "../Common/AlertMessage";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { get_data } from "../../Store/common/commonSlice";
import { DEFAULT_PAGE_SIZE } from "../../common/constants";

function VendorTrackReport() {
  const dispatch = useDispatch();
  const permission = GetPermission("vendor_track_report", "change");
  const [isfilter, setFilter] = useState(false);
  const access = useSelector(selectAccess);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [rowsperpage, setRowsPerPage] = useState(DEFAULT_PAGE_SIZE);
  const [progress, setProgress] = useState(0);
  const [task_id, setTaskID] = useState("");
  const [state, setState] = useState({
    data: [],
    vendor: "",
    product: "",
    app_id: "",
    from_date: "",
    to_date: "",
    products: [],
    vendors: [],
    get_list: false,
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
        get_list: true,
      };
    });
  }, [page, rowsperpage, state.searchValue]);

  useEffect(() => {
    async function fetchMyAPI() {
      let url = vendor_track_report + `?page=${page}&page_size=${rowsperpage}`;
      if (state.vendor) {
        let vendor_name = encodeURIComponent(
          state.vendors.filter((i) => i.id === state.vendor)[0].employee_name
        );
        url = url + `&vendor__employee_name=${vendor_name}`;
      }
      if (state.product) {
        let product_name = state.products.filter(
          (i) => i.id === state.product
        )[0].product_name;
        url = url + `&product__product_name=${product_name}`;
      }
      if (state.from_date && state.to_date) {
        let from_date = state.from_date?.toLocaleDateString();
        let to_date = state.to_date?.toLocaleDateString();
        from_date = convert_date_format(from_date);
        to_date = convert_date_format(to_date);
        url = url + `&created_at__range=${from_date},${to_date}`;
      }
      if (state.searchValue) {
        url = url + `&search=${state.searchValue}`;
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
                get_list: false,
              };
            });
            setLoading(false);
          }
        })
        .catch((err) => {
          console.error(err);
        });

      // try {
      //     let url = vendor_track_report + `?page=${page}&page_size=${rowsperpage}`
      //     if (state.vendor) {
      //         let vendor_name = encodeURIComponent(state.vendors.filter((i) => i.id === state.vendor)[0].employee_name)
      //         url = url + `&vendor__employee_name=${vendor_name}`
      //     }
      //     if (state.product) {
      //         let product_name = state.products.filter((i) => i.id === state.product)[0].product_name
      //         url = url + `&product__product_name=${product_name}`
      //     }
      //     if (state.from_date && state.to_date) {
      //         let from_date = state.from_date?.toLocaleDateString();
      //         let to_date = state.to_date?.toLocaleDateString();
      //         from_date = convert_date_format(from_date)
      //         to_date = convert_date_format(to_date)
      //         url = url + `&created_at__range=${from_date},${to_date}`
      //     }
      //     if (state.searchValue) {
      //         url = url + `&search=${state.searchValue}`
      //     }

      //     const result = await axios.get(url,
      //         { headers: { "Authorization": `Bearer ${access}` } })
      //     if (result.status === 200) {
      //         setState((prevState) => {
      //             return {
      //                 ...prevState,
      //                 data: result.data,
      //                 get_list: false
      //             }
      //         })
      //         setLoading(false);
      //     }
      // } catch (error) {
      //     console.log(error);
      // }
    }
    if (state.get_list) {
      fetchMyAPI();
    }
  }, [state.get_list]);

  useEffect(() => {
    async function fetchMyAPI() {
      dispatch(get_data(product_dropdown))
        .then((res) => {
          // console.log('login res => ',res);
          const result = res?.payload;
          if (res?.payload?.status === 200) {
            setState((prevState) => {
              return {
                ...prevState,
                products: result.data,
              };
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });

      // try {
      //     const result = await axios.get(product_dropdown,
      //         { headers: { "Authorization": `Bearer ${access}` } })
      //     if (result.status === 200) {
      //         setState((prevState) => {
      //             return {
      //                 ...prevState,
      //                 products: result.data

      //             }
      //         })
      //     }
      // } catch (error) {
      //     console.log(error);
      // }

      dispatch(get_data(vendor_dropdown))
        .then((res) => {
          // console.log('login res => ',res);
          const result = res?.payload;
          if (res?.payload?.status === 200) {
            setState((prevState) => {
              return {
                ...prevState,
                vendors: result.data,
              };
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });

      // try {
      //     const result = await axios.get(vendor_dropdown,
      //         { headers: { "Authorization": `Bearer ${access}` } })
      //     if (result.status === 200) {
      //         setState((prevState) => {
      //             return {
      //                 ...prevState,
      //                 vendors: result.data

      //             }
      //         })
      //     }
      // } catch (error) {
      //     console.log(error);
      // }
    }
    if (state.refresh || page) {
      fetchMyAPI();
    }
  }, [state.refresh || page]);

  useEffect(() => {
    async function fetchMyAPI() {
      dispatch(get_data(product_dropdown + `?vendor=${state.vendor}`))
        .then((res) => {
          // console.log('login res => ',res);
          const result = res?.payload;
          if (res?.payload?.status === 200) {
            setState((prevState) => {
              return {
                ...prevState,
                products: result.data,
              };
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });

      // try {
      //     const result = await axios.get(product_dropdown + `?vendor=${state.vendor}`,
      //         { headers: { "Authorization": `Bearer ${access}` } })
      //     if (result.status === 200) {
      //         setState((prevState) => {
      //             return {
      //                 ...prevState,
      //                 products: result.data

      //             }
      //         })
      //     }
      // } catch (error) {
      //     console.log(error);
      // }
    }
    if (state.vendor) {
      fetchMyAPI();
    }
  }, [state.vendor]);

  const handleSelectChange = (value, name) => {
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const handleSearch = () => {
    setState((prevState) => {
      return {
        ...prevState,
        get_list: true,
      };
    });
  };
  const handleResetSearch = () => {
    setState((prevState) => {
      return {
        ...prevState,
        vendor: "",
        product: "",
        from_date: "",
        to_date: "",
        get_list: true,
      };
    });
  };

  const handleSearchItem = (e) => {
    setState((prevState) => {
      return {
        ...prevState,
        searchValue: e.target.value,
        get_list: false,
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
        <Heading name="Vendor Track Reports" />
        <FilterContainer>
          <HeadDiv className="first">
            <AgentDiv>
              <Label>Vendor</Label>
              <SelectBoxLabel
                handleChange={handleSelectChange}
                name="vendor"
                datas={state.vendors}
                value={state.vendor}
                default="Select"
                selectType="EmployeeName"
                fpadding="9.5px 14px"
                fsize="12px"
                min_width="235px"
              />
            </AgentDiv>
            <AgentDiv>
              <Label>Product</Label>
              <SelectBoxLabel
                handleChange={handleSelectChange}
                name="product"
                datas={state.products}
                value={state.product}
                default="Select"
                selectType="ProductName"
                fpadding="9.5px 14px"
                fsize="12px"
                min_width="235px"
              />
            </AgentDiv>
            <DateDiv>
              <Label>Date</Label>
              <DateRangeInput setState={setState} clearIcon={null} />
            </DateDiv>
          </HeadDiv>
          <HeadDiv className="secondary">
            <ButtonDiv className="reset-section">
              <SearchButton handleSearch={handleSearch} />
              <SearchButton handleSearch={handleResetSearch} title="Reset" />
            </ButtonDiv>
          </HeadDiv>
        </FilterContainer>
        <SearchContainer>
          <SectionDiv className="left">
            <TextInput
              id="outlined-start-adornment"
              sx={{ m: 0, width: "100%" }}
              placeholder="Search"
              onChange={(e) => handleSearchItem(e)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <img
                      src={require("../../Assets/images/searchfilter.png")}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </SectionDiv>
          <SectionDiv className="flex-right">
            {/* <FilterBoxItem isfilter={isfilter} setFilter={setFilter} /> */}
            {/* <DownloadButton title="Download" fmargin_left="0px" /> */}
            <AddVendorTrackModal />
          </SectionDiv>
        </SearchContainer>
        <VendorTrackReportTable
          data={state.data}
          setState={setState}
          setPage={setPage}
          page={page}
          setRowsPerPage={setRowsPerPage}
          rowsperpage={rowsperpage}
          snackbarStatus={snackbarStatus}
          setSnackbarStatus={setSnackbarStatus}
          state={state}
        />
      </Container>
    );
  }
}

export default VendorTrackReport;

const SectionDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 21%;
  &.left {
    width: 30%;
  }
  &.flex-right {
    justify-content: flex-end;
  }
`;
const TextInput = styled(TextField)`
  fieldset {
    border-color: ${({ customerid }) =>
      customerid ? "#D9D9D9 !important" : "#132756 !important"};
    border-width: ${({ customerid }) =>
      customerid ? "1px" : "2px !important"};
    /* border-color: #132756 !important; */
    /* border-width: 2px !important; */
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
const HeadDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 6px;
  &.first {
    margin-bottom: 15px;
  }
  &.secondary {
    /* width: 55%; */
  }
`;
const FilterContainer = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.05);
  padding: 22px 95px 22px 40px;
  margin: 15px 0px;
  width: 87%;
`;
const AgentDiv = styled.div`
  font-size: 16px;
  color: #444445;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 35%;
  &.agent {
    width: 40%;
  }
`;
const DateDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 34%;
  /* margin-left: 20px; */
`;
const ButtonDiv = styled.div`
  width: 30%;
  margin-left: 10px;
  &.reset-section {
    display: flex;
    gap: 10px;
  }
`;

const Label = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #444445;
  margin-right: 15px;
  &.date-label {
    margin-right: 24px;
    margin-left: 44px;
  }
`;
const SearchContainer = styled.div`
  width: 94%;
  margin: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
