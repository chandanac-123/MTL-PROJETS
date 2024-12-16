import React, { useRef, useState } from "react";
import Heading from "../Components/Heading";
import styled from "styled-components";
import DateRangeInput from "../Components/DateRangeInput";
import SearchButton from "../Components/SearchButton";
import TextField from "@mui/material/TextField";
import FilterBox from "../Components/FilterBox";
import ReportEditTable from "../Components/Verification/ReportEditTable";
import SelectBoxLabel from "../Components/SelectBoxLabel";
import { useSelector } from "react-redux";
import { v2_report_edit } from "../Api/ReportSubmittedApis";
import { useEffect } from "react";
import {
  field_agent_dropdown,
  location_dropdown,
} from "../Api/DropDownApis";
import { v2_product_dropdown, v2_vendor_dropdown } from "../Api/VerificationApis";
import { convert_date_format } from "../Functions/utils";
import AlertMessage from "../Components/Common/AlertMessage";
import { LinearProgress } from "@mui/material";
import { getDataWithParams, get_data } from "../Store/common/commonSlice";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import ReportEditHeader from "../Components/Verification/ReportEditHeader";
import { DEFAULT_PAGE_SIZE } from "../common/constants";
import { getPageSize } from "../common/utils";
import { RefreshButton } from "../Components/RefreshButton";
import SearchInput from "../Components/Common/SearchInput";
import { selectFilter, setDataFilter } from "../Slices/reportEditSlice";

const getSearchParams = (state, page, page_size) => {
  return {
    search: state.searchValue || undefined,
    addresses__adress_district__id: state.address_district,
    addresses__fi_type: state.fi_type,
    vendor__employee_name: state.vendorValue
      ? state.vendors.filter((item) => item.id === state.vendorValue)[0]
        ?.employee_name
      : "",
    product__product_name: state.productValue
      ? state.products.filter((item) => item.id === state.productValue)[0]
        ?.product_name
      : "",
    page,
    page_size,
    vendor__id:
      state.vendor && state.vendor !== "all" ? state.vendor : undefined,
    addresses__fi_date_time__date__gte: state.from_date
      ? convert_date_format(state.from_date)
      : undefined,
    addresses__fi_date_time__date__lte: state.to_date
      ? convert_date_format(state.to_date)
      : undefined,
    addresses__verification_address__assigned_verification_users__field_agent__id:
      state.agent && state.agent !== "all" ? state.agent : undefined,
    addresses__verification_address__selected_billing_location__id:
      state.location && state.location !== "all" ? state.location : undefined,
  };
};

function ReportsEdit() {
  const dispatch = useDispatch();
  const isMobileScreen = useMediaQuery({ query: "(max-width: 480px)" });
  const [loading, setLoading] = useState(false);
  const [is_reset, setReset] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsperpage, setRowsPerPage] = useState(DEFAULT_PAGE_SIZE);
  const [isfilter, setFilter] = useState(false);
  const fi_types = [
    { name: "PV", id: "PV" },
    { name: "RV", id: "RV" },
    { name: "PD", id: "PD" },
    { name: "BV", id: "BV" },
  ];

  const filter = useSelector(selectFilter);

  const [state, setState] = useState(filter);

  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      dispatch(setDataFilter(state));
    }
  }, [state]);

  isMounted.current = true;

  const [snackbarStatus, setSnackbarStatus] = useState({
    isOpen: false,
    severity: "success",
    message: "",
  });


  useEffect(() => {
    async function fetchMyAPI() {
      const pageSize = getPageSize(rowsperpage);

      const params = getSearchParams(state, page, pageSize);
      const url = v2_report_edit;
      setLoading(true);

      dispatch(getDataWithParams({ url, params }))
        .then((res) => {
          const result = res?.payload;
          if (res?.payload?.status === 200) {
            setLoading(false);
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
          setLoading(false);
        });

    }
      fetchMyAPI();
  }, [state.refresh]);

  useEffect(() => {
    setState((prevState) => {
      return {
        ...prevState,
        refresh: true,
      };
    });
  }, [page, rowsperpage, state.searchValue]);


  useEffect(() => {
    fetchMyDropdownAPI()
  }, [state.vendorValue]);

  const fetchMyDropdownAPI = async () => {
    try {
      // Fetch vendor data
      const vendorResponse = await dispatch(get_data(v2_vendor_dropdown));
      const vendorResult = vendorResponse?.payload;

      if (vendorResult?.status === 200) {
        let vendorData = vendorResult.data;
        if (vendorData.length) {
          vendorData.unshift({
            id: "all",
            employee_name: "ALL",
          });
        }
        setState((prevState) => ({
          ...prevState,
          vendor_list: vendorData,
          vendors: vendorResult.data,
        }));
      }

      // Fetch location data
      const locationResponse = await dispatch(get_data(location_dropdown));
      const locationResult = locationResponse?.payload;

      if (locationResult?.status === 200) {
        let locationData = locationResult.data;
        if (locationData.length) {
          locationData.unshift({
            id: "all",
            name: "ALL",
          });
        }
        setState((prevState) => ({
          ...prevState,
          location_list: locationData,
          districts: locationResult.data,
        }));
      }

      // Fetch field agent data
      const agentResponse = await dispatch(get_data(field_agent_dropdown));
      const agentResult = agentResponse?.payload;

      if (agentResult?.status === 200) {
        let agentData = agentResult.data;
        if (agentData.length) {
          agentData.unshift({
            id: "all",
            employee_name: "ALL",
          });
        }
        setState((prevState) => ({
          ...prevState,
          agent_list: agentData,
        }));
      }

      // Fetch product data based on vendorValue
      const productResponse = await dispatch(get_data(v2_product_dropdown + `?vendor=${state.vendorValue}`));
      const productResult = productResponse?.payload;

      if (productResult?.status === 200) {
        setState((prevState) => ({
          ...prevState,
          products: productResult.data,
        }));
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  // useEffect(() => {
  //   async function fetchMyAPI() {
  //     dispatch(get_data(vendor_dropdown))
  //       .then((res) => {
  //         // console.log('login res => ',res);
  //         const result = res?.payload;
  //         if (res?.payload?.status === 200) {
  //           let vendorData = result.data;
  //           if (vendorData.length) {
  //             vendorData.unshift({
  //               id: "all",
  //               employee_name: "ALL",
  //             });
  //           }
  //           setState((prevState) => {
  //             return {
  //               ...prevState,
  //               vendor_list: vendorData,
  //               vendors: result.data,
  //             };
  //           });
  //         }
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });

  //     // try {
  //     //   const result = await axios.get(vendor_dropdown, {
  //     //     headers: { Authorization: `Bearer ${access}` },
  //     //   });
  //     //   if (result.status === 200) {
  //     //     setState((prevState) => {
  //     //       return {
  //     //         ...prevState,
  //     //         vendor_list: result.data,
  //     //         vendors: result.data,
  //     //       };
  //     //     });
  //     //   }
  //     // } catch (error) {
  //     //   console.log(error);
  //     // }

  //     dispatch(get_data(location_dropdown))
  //       .then((res) => {
  //         // console.log('login res => ',res);
  //         const billing_result = res?.payload;
  //         if (res?.payload?.status === 200) {
  //           let locationData = billing_result.data;
  //           if (locationData.length) {
  //             locationData.unshift({
  //               id: "all",
  //               name: "ALL",
  //             });
  //           }
  //           setState((prevState) => {
  //             return {
  //               ...prevState,
  //               location_list: locationData,
  //               districts: billing_result.data,
  //             };
  //           });
  //         }
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });

  //     // try {
  //     //   const billing_result = await axios.get(location_dropdown, {
  //     //     headers: { Authorization: `Bearer ${access}` },
  //     //   });
  //     //   if (billing_result.status === 200) {
  //     //     setState((prevState) => {
  //     //       return {
  //     //         ...prevState,
  //     //         location_list: billing_result.data,
  //     //         districts: billing_result.data,
  //     //       };
  //     //     });
  //     //   }
  //     // } catch (error) {
  //     //   console.log(error);
  //     // }

  //     dispatch(get_data(field_agent_dropdown))
  //       .then((res) => {
  //         // console.log('login res => ',res);
  //         const result = res?.payload;
  //         if (res?.payload?.status === 200) {
  //           let agentData = result.data;
  //           if (agentData.length) {
  //             agentData.unshift({
  //               id: "all",
  //               employee_name: "ALL",
  //             });
  //           }
  //           setState((prevState) => {
  //             return {
  //               ...prevState,
  //               agent_list: agentData,
  //             };
  //           });
  //         }
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });

  //     // try {
  //     //   const result = await axios.get(field_agent_dropdown, {
  //     //     headers: { Authorization: `Bearer ${access}` },
  //     //   });
  //     //   if (result.status === 200) {
  //     //     setState((prevState) => {
  //     //       return {
  //     //         ...prevState,
  //     //         agent_list: result.data,
  //     //       };
  //     //     });
  //     //   }
  //     // } catch (error) {
  //     //   console.log(error);
  //     // }

  //     dispatch(get_data(product_dropdown + `?vendor=${state.vendorValue}`))
  //       .then((res) => {
  //         // console.log('login res => ',res);
  //         const result = res?.payload;
  //         if (res?.payload?.status === 200) {
  //           setState((prevState) => {
  //             return {
  //               ...prevState,
  //               products: result.data,
  //             };
  //           });
  //         }
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });

  //     //   try {
  //     //     const result = await axios.get(product_dropdown+`?vendor=${state.vendorValue}`,
  //     //         { headers: {"Authorization" : `Bearer ${access}`} })
  //     //         if(result.status === 200){
  //     //             setState((prevState)=> {
  //     //                 return {
  //     //                     ...prevState,
  //     //                     products: result.data
  //     //                 }
  //     //             })
  //     //         }
  //     // } catch (error) {
  //     //     console.log(error);
  //     // }
  //     // setLoading(false);
  //   }
  //   fetchMyAPI();
  // }, [state.vendorValue]);


  const handleSelectChange = (value, name) => {
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSearchButton = async () => {
    setReset(false);
    const pageSize = getPageSize(rowsperpage);
    setPage(1);
    const params = getSearchParams(state, 1, pageSize);
    const url = v2_report_edit;
    setLoading(true);
    dispatch(getDataWithParams({ url, params }))
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
        setLoading(false);
      });
  };

  const handleSearch = (searchExp) => {
    setPage(1);
    setState((prevState) => {
      return {
        ...prevState,
        searchValue: searchExp,
        refresh: false,
      };
    });
  };

  const handleFilter = async () => {
    const pageSize = getPageSize(rowsperpage);
    setPage(1);
    const params = getSearchParams(state, 1, pageSize);
    const url = v2_report_edit;
    setLoading(true);
    dispatch(getDataWithParams({ url, params }))
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
          setFilter(false);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setState((prevState) => {
          return {
            ...prevState,
            refresh: false,
          };
        });
        setLoading(false);
      });
  };

  const handleReset = () => {
    setState((prevState) => {
      return {
        ...prevState,
        fi_type: "",
        productValue: "",
        vendorValue: "",
        address_district: "",
        refresh: true,
      };
    });
  };

  const handleResetSearch = () => {
    setReset(true);
    setState((prevState) => {
      return {
        ...prevState,
        vendor: "all",
        agent: "all",
        location: "all",
        from_date: "",
        to_date: "",
        refresh: true,
      };
    });
  };

  const handleRefresh = () => {
    setPage(1);
    setState((prevState) => {
      return {
        ...prevState,
        refresh: true,
      };
    });
  };

  return (
    <Container>
      <AlertMessage
        setSnackbarStatus={setSnackbarStatus}
        snackbarStatus={snackbarStatus}
      />
      <Heading name="Reports Edit" />
      {loading && <LinearProgress />}

      {isMobileScreen ? (
        <ReportEditHeader
          handleSearch={handleSearch}
          is_reset={is_reset}
          fi_types={fi_types}
          isfilter={isfilter}
          setFilter={setFilter}
          state={state}
          setState={setState}
          handleFilter={handleFilter}
          handleSelectChange={handleSelectChange}
          handleSearchButton={handleSearchButton}
          handleResetSearch={handleResetSearch}
          handleReset={handleReset}
          handleRefresh={handleRefresh}
        />
      ) : (
        <>
          <FilterContainer>
            <HeadDiv className="first">
              <AgentDiv>
                <Label>Vendor</Label>
                <SelectBoxLabel
                  handleChange={handleSelectChange}
                  datas={state.vendor_list}
                  selectType="EmployeeName"
                  name="vendor"
                  value={state.vendor}
                  default=""
                  fpadding="9.5px 14px"
                  fsize="12px"
                  min_width="235px"
                />
              </AgentDiv>
              <AgentDiv>
                <Label>Agent</Label>
                <SelectBoxLabel
                  handleChange={handleSelectChange}
                  name="agent"
                  datas={state.agent_list}
                  selectType="EmployeeName"
                  value={state.agent}
                  default=""
                  fpadding="9.5px 14px"
                  fsize="12px"
                  min_width="235px"
                />
              </AgentDiv>
              <AgentDiv>
                <Label>Location</Label>
                <SelectBoxLabel
                  handleChange={handleSelectChange}
                  datas={state.location_list}
                  selectType="name"
                  name="location"
                  value={state.location}
                  default=""
                  fpadding="9.5px 14px"
                  fsize="12px"
                  min_width="235px"
                />
              </AgentDiv>
            </HeadDiv>
            <HeadDiv className="secondary">
              <DateDiv>
                <Label className="date-label">Date</Label>
                <DateRangeInput
                  setState={setState}
                  clearIcon={null}
                  is_reset={is_reset}
                  from_date={state.from_date}
                  to_date={state.to_date}
                />
              </DateDiv>
              <ButtonDiv className="reset-section">
                <SearchButton handleSearch={handleSearchButton} />
                <SearchButton handleSearch={handleResetSearch} title="Reset" />
              </ButtonDiv>
            </HeadDiv>
          </FilterContainer>
          <SearchContainer>
            <SearchInput
              handleSearch={handleSearch}
              value={state.searchValue}
            />
            <SectionDiv>
              <RefreshButton onClick={handleRefresh} />
              <FilterBoxItem
                fi_types={fi_types}
                isfilter={isfilter}
                setFilter={setFilter}
                state={state}
                setState={setState}
                handleFilter={handleFilter}
                handleSelectChange={handleSelectChange}
                handleReset={handleReset}
              />
            </SectionDiv>
          </SearchContainer>
        </>
      )}

      <ReportEditTable
        data={state.data}
        setState={setState}
        page={page}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
        rowsperpage={rowsperpage}
        snackbarStatus={snackbarStatus}
        setSnackbarStatus={setSnackbarStatus}
        state={state}
      />
    </Container>
  );
}

export default ReportsEdit;

const FilterBoxItem = styled(FilterBox)`
  position: absolute;
`;
const SectionDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  &.left {
    width: 30%;
  }
`;
const TextInput = styled(TextField)`
  fieldset {
    border-color: ${({ customerid }) =>
    customerid ? "#D9D9D9 !important" : "#132756 !important"};
    border-width: ${({ customerid }) =>
    customerid ? "1px" : "2px !important"};
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
  justify-content: space-between;
  align-items: center;
  &.first {
    margin-bottom: 15px;
  }
  &.secondary {
    width: 55%;
  }
`;
const FilterContainer = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.05);
  padding: 22px 120px 22px 40px;
  margin: 15px 0px;
  width: 85%;
`;
export const AgentDiv = styled.div`
  font-size: 14px;
  color: #444445;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 30%;
  &.agent {
    width: 35%;
  }
  &.full-width {
    width: 100%;
  }
`;
export const DateDiv = styled.div`
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  &.full-width {
    width: 100%;
  }
`;
export const ButtonDiv = styled.div`
  width: 30%;
  &.reset-section {
    display: flex;
    gap: 10px;
  }
  &.mt-5 {
    margin-top: 5px;
  }
  &.full-width {
    width: 100%;
  }
  &.center {
    align-items: center;
    justify-content: center;
  }
`;

export const Label = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #444445;
  &.date-label {
    margin-right: 66px;
  }
  &.w-30 {
    width: 36%;
  }
`;
const SearchContainer = styled.div`
  margin: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 94%;
`;
