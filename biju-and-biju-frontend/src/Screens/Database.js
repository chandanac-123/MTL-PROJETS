import React, { useRef, useState } from "react";
import Heading from "../Components/Heading";
import styled from "styled-components";
import DateRangeInput from "../Components/DateRangeInput";
import SearchButton from "../Components/SearchButton";
import TextField from "@mui/material/TextField";
import FilterBox from "../Components/FilterBox";
import RadioGroups from "../Components/RadioGroups";
import DatabaseTable from "../Components/Verification/DatabaseTable";
import SelectBoxLabel from "../Components/SelectBoxLabel";
import { useSelector } from "react-redux";
import { database_dwonload, v2_database_list } from "../Api/ReportSubmittedApis";
import { useEffect } from "react";
import {
  field_agent_dropdown,
  location_dropdown,
} from "../Api/DropDownApis";
import { LinearProgress } from "@mui/material";
import { v2_product_dropdown, v2_vendor_dropdown } from "../Api/VerificationApis";
import { GetPermission, convert_date_format } from "../Functions/utils";
import AlertMessage from "../Components/Common/AlertMessage";
import { useDispatch } from "react-redux";
import {
  getDataWithParams,
  get_data,
  post_data,
} from "../Store/common/commonSlice";
import { useMediaQuery } from "react-responsive";
import ReportEditHeader from "../Components/Verification/ReportEditHeader";
import DatabaseSelectDownload from "../Components/Verification/DatabaseSelectDownload";
import { DEFAULT_PAGE_SIZE } from "../common/constants";
import { getPageSize } from "../common/utils";
import { RefreshButton } from "../Components/RefreshButton";
import SearchInput from "../Components/Common/SearchInput";
import { selectFilter, setDataFilter } from "../Slices/databaseSlice";

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
    addresses__fi_date_time__date__gte:
      state.date_type === "fi_date" && state.from_date
        ? convert_date_format(state.from_date)
        : undefined,
    addresses__verification_address__submitted_at__date__gte: state.from_date
      ? convert_date_format(state.from_date)
      : undefined,

    addresses__verification_address__submitted_at__date__lte:
      state.date_type === "submitted_date" && state.to_date
        ? convert_date_format(state.to_date)
        : undefined,
    addresses__fi_date_time__date__lte: state.to_date
      ? convert_date_format(state.to_date)
      : undefined,

    addresses__verification_address__assigned_verification_users__field_agent__id:
      state.executives && state.executives !== "all"
        ? state.executives
        : undefined,
    addresses__verification_address__selected_billing_location__id:
      state.location && state.location !== "all" ? state.location : undefined,
  };
};

function Database() {
  const dispatch = useDispatch();
  const isMobileScreen = useMediaQuery({ query: "(max-width: 480px)" });
  const permission = GetPermission("database", "change");
  const [isfilter, setFilter] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [rowsperpage, setRowsPerPage] = useState(DEFAULT_PAGE_SIZE);
  const [checkedIDs, setCheckedIDs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [task_id, setTaskID] = useState("");
  const [is_reset, setReset] = useState(false);
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

  useEffect(() => {
    async function fetchMyAPI() {
      const pageSize = getPageSize(rowsperpage);

      const params = getSearchParams(state, page, pageSize);
      const url = v2_database_list;
      setLoading(true);

      dispatch(getDataWithParams({ url, params }))
        .then((res) => {
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
    }
      fetchMyAPI();
  }, [state.refresh]);

  const handleSelectChange = (value, name) => {
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleRadioChange = (value, name) => {
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
    setLoading(true);

    setPage(1);
    const params = getSearchParams(state, 1, pageSize);
    const url = v2_database_list;

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

  const handleDownload = async (e) => {
    e.preventDefault();
    let data = {
      ver_ids: checkedIDs,
      selected_fields: null,
      isAll:
        state.data.count > 0 && state.data.count == checkedIDs.length
          ? true
          : false,
    };
    let url = database_dwonload;
    let param = {
      values: data,
      url: url,
    };

    dispatch(post_data(param))
      .then((res) => {
        const result = res?.payload;
        if (result?.status === 200) {
          setTaskID(result.data.task_id);
          setCheckedIDs([]);
        }
      })
      .catch((err) => {
        setState((prevState) => {
          return {
            ...prevState,
            refresh: false,
          };
        });
      });
  };

  const handleFilter = async () => {
    const pageSize =
      rowsperpage === 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30;
    setPage(1);
    const params = getSearchParams(state, 1, pageSize);
    const url = v2_database_list;

    dispatch(getDataWithParams({ url, params }))
      .then((res) => {
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
  let dates_radio = [
    {
      name: "fi_date",
      label: "FI Date",
      checked: true,
    },
    {
      name: "submitted_date",
      label: "Submitted Date",
      checked: false,
    },
  ];

  const handleResetSearch = () => {
    setReset(true);
    setState((prevState) => {
      return {
        ...prevState,
        vendor: "all",
        executives: "all",
        location: "all",
        from_date: "",
        to_date: "",
        refresh: true,
      };
    });
  };

  const sameVendorsCheck = () => {
    const data = state.data?.results;
    if (!data || data.length === 0) {
      return false;
    }
    const vendorNames = {};
    data.forEach((item) => {
      vendorNames[item.id] = item.vendor_name;
    });
    const firstVendorName = vendorNames[checkedIDs[0]];
    return checkedIDs.every((id) => vendorNames[id] === firstVendorName);
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
      <Heading name="Database" />
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
                <Label>Executives</Label>
                <SelectBoxLabel
                  handleChange={handleSelectChange}
                  name="executives"
                  datas={state.agent_list}
                  selectType="EmployeeName"
                  value={state.executives}
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
                  name="location"
                  datas={state.location_list}
                  selectType="name"
                  value={state.location}
                  default=""
                  fpadding="9.5px 14px"
                  fsize="12px"
                  min_width="235px"
                />
              </AgentDiv>
            </HeadDiv>
            <HeadDiv className="secondary">
              <RadioDiv>
                <RadioGroups
                  fsize="13px"
                  fweight="600"
                  datas={dates_radio}
                  handleChange={handleRadioChange}
                  value={state.date_type}
                  name="date_type"
                  ml="0px"
                />
              </RadioDiv>
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
            <SectionDiv className="filter-section">
              {/* {permission && checkedIDs.length ? (
                  <>
                    {checkedIDs.length === 1 || sameVendorsCheck() ? (
                      <DatabaseSelectModal
                        checkedIDs={checkedIDs}
                        data={state.data?.results}
                      />
                    ) : null}
                    <DownloadButton
                      handleClick={(e) => handleDownload(e)}
                      title="Download"
                      fmargin_left="0px"
                    />
                  </>
                ) : null} */}
              <DatabaseSelectDownload
                permission={permission}
                checkedIDs={checkedIDs}
                sameVendorsCheck={sameVendorsCheck}
                state={state}
                handleDownload={handleDownload}
                setTaskID={setTaskID}
                progress={progress}
                setProgress={setProgress}
                task_id={task_id}
              />
              {/* <FilterBoxItem isfilter={isfilter} setFilter={setFilter} /> */}
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
          {/* {task_id ? (
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <ProgressBar
                  setTaskID={setTaskID}
                  progress={progress}
                  setProgress={setProgress}
                  task_id={task_id}
                  is_list={true}
                />
              </div>
            ) : null} */}
        </>
      )}

      <DatabaseTable
        data={state.data}
        setState={setState}
        setCheckedIDs={setCheckedIDs}
        checkedIDs={checkedIDs}
        page={page}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
        rowsperpage={rowsperpage}
        snackbarStatus={snackbarStatus}
        setSnackbarStatus={setSnackbarStatus}
        state={state}
        permission={permission}
        sameVendorsCheck={sameVendorsCheck}
        handleDownload={handleDownload}
        setTaskID={setTaskID}
        progress={progress}
        setProgress={setProgress}
        task_id={task_id}
      />
    </Container>
  );
}

export default Database;

const RadioDiv = styled.div``;

const FilterBoxItem = styled(FilterBox)`
  position: absolute;
`;
const SectionDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 35%;
  &.left {
    width: 30%;
  }
  &.filter-section {
    width: 55%;
    gap: 15px;
    justify-content: flex-end;
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
    width: 85%;
  }
`;
const FilterContainer = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.05);
  padding: 22px 90px 22px 40px;
  margin: 15px 0px;
  width: 87.5%;
`;
const AgentDiv = styled.div`
  font-size: 14px;
  color: #444445;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 30%;
  &.agent {
    width: 35%;
  }
`;
const DateDiv = styled.div`
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  align-items: center;
  width: 45%;
`;
const ButtonDiv = styled.div`
  width: 20%;
  &.reset-section {
    display: flex;
    gap: 10px;
  }
`;

const Label = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #444445;
  &.date-label {
  }
`;
const SearchContainer = styled.div`
  margin: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 94%;
`;
