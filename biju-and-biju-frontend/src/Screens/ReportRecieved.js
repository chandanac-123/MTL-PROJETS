import React, { useState, useEffect, useRef } from "react";
import Heading from "../Components/Heading";
import styled from "styled-components";
import FilterBox from "../Components/FilterBox";
import ReportRecievedTable from "../Components/Verification/ReportRecievedTable";
import {
  v2_report_received,
  district_dropdown,
  v2_product_dropdown,
  v2_vendor_dropdown,
} from "../Api/VerificationApis";
import { useSelector } from "react-redux";
import {  LinearProgress } from "@mui/material";
import AlertMessage from "../Components/Common/AlertMessage";
import { getDataWithParams, get_data } from "../Store/common/commonSlice";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import ReportRecievedHeader from "../Components/Verification/ReportRecievedHeader";
import { DEFAULT_PAGE_SIZE } from "../common/constants";
import { getPageSize } from "../common/utils";
import { RefreshButton } from "../Components/RefreshButton";
import SearchInput from "../Components/Common/SearchInput";
import { selectFilter, setDataFilter } from "../Slices/reportReceivedSlice";

const getSearchParams = (state, page, page_size, fieldToSort) => {
  return {
    search: state.searchValue || undefined,
    assign_verification_id__verification_address__adress_district__id:
      state.address_district,
    assign_verification_id__verification_address__fi_type: state.fi_type,
    assign_verification_id__verification_address__verification__vendor__employee_name:
      state.vendorValue
        ? state.vendors.filter((item) => item.id === state.vendorValue)[0]
            ?.employee_name
        : "",
    assign_verification_id__verification_address__verification__product__product_name:
      state.productValue
        ? state.products.filter((item) => item.id === state.productValue)[0]
            ?.product_name
        : "",
    page,
    page_size,
    ordering: fieldToSort,
  };
};

function ReportRecieved() {
  const dispatch = useDispatch();
  const isMobileScreen = useMediaQuery({ query: "(max-width: 480px)" });
  const [isfilter, setFilter] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [rowsperpage, setRowsPerPage] = useState(DEFAULT_PAGE_SIZE);
  const fi_types = [
    { name: "PV", id: "PV" },
    { name: "RV", id: "RV" },
    { name: "PD", id: "PD" },
    { name: "BV", id: "BV" },
  ];
  const [snackbarStatus, setSnackbarStatus] = useState({
    isOpen: false,
    severity: "success",
    message: "",
  });

  const filter = useSelector(selectFilter);

  const [state, setState] = useState(filter);

  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      dispatch(setDataFilter(state));
    }
  }, [state]);

  isMounted.current = true;

  const [sortOptions, setSortOptions] = useState({
    fieldToSort: "",
    fieldName: "",
    sortType: null, // null | asc | desc,
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
      const params = getSearchParams(
        state,
        page,
        pageSize,
        sortOptions.fieldToSort
      );
      const url = v2_report_received;
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
    if (state.refresh) {
      fetchMyAPI();
    }
  }, [state.refresh]);

  useEffect(() => {
    fetchDropdownData(state, dispatch, setState, district_dropdown, v2_product_dropdown, v2_vendor_dropdown);
  }, [state.vendorValue])

  const fetchDropdownData = async (state, dispatch, setState, district_dropdown, v2_product_dropdown, v2_vendor_dropdown) => {
    try {
      const districtResponse = await dispatch(get_data(district_dropdown));
      const districtResult = districtResponse?.payload;

      if (districtResult?.status === 200) {
        setState((prevState) => ({
          ...prevState,
          districts: districtResult.data,
        }));
      }
    } catch (err) {
      console.error(err);
    }

    try {
      const productResponse = await dispatch(get_data(v2_product_dropdown + `?vendor=${state.vendorValue}`));
      const productResult = productResponse?.payload;

      if (productResult?.status === 200) {
        setState((prevState) => ({
          ...prevState,
          products: productResult.data,
        }));
      }
    } catch (err) {
      console.error(err);
    }

    try {
      const vendorResponse = await dispatch(get_data(v2_vendor_dropdown));
      const vendorResult = vendorResponse?.payload;

      if (vendorResult?.status === 200) {
        setState((prevState) => ({
          ...prevState,
          vendors: vendorResult.data,
        }));
      }
    } catch (err) {
      console.error(err);
    }
  }

  const handleSelectChange = (value, name) => {
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
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

  const handleFilter = async () => {
    const pageSize = getPageSize(rowsperpage);

    setPage(1);
    const params = getSearchParams(state, 1, pageSize, sortOptions.fieldToSort);
    const url = v2_report_received;
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
        setState((prevState) => {
          return {
            ...prevState,
            refresh: false,
          };
        });
        setLoading(false);
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

  useEffect(() => {
    handleRefresh();
  }, [sortOptions]);

  return (
    <Container>
      <AlertMessage
        setSnackbarStatus={setSnackbarStatus}
        snackbarStatus={snackbarStatus}
      />
      <Heading name="Reports Recieved" />
      {loading && <LinearProgress />}
      {isMobileScreen ? (
        <ReportRecievedHeader
          handleSearch={handleSearch}
          fi_types={fi_types}
          isfilter={isfilter}
          setFilter={setFilter}
          state={state}
          setState={setState}
          handleFilter={handleFilter}
          handleSelectChange={handleSelectChange}
          handleReset={handleReset}
          handleRefresh={handleRefresh}
        />
      ) : (
        <SearchContainer>
          <SearchInput handleSearch={handleSearch} value={state.searchValue} />
          <SectionDiv>
            <IconLabelContainer>
              <IconImg>
                <img
                  src={require("../Assets/images/yellow-cycle.png")}
                  width={25}
                  height={25}
                />
              </IconImg>
              <SpanLabel>Assigned</SpanLabel>
            </IconLabelContainer>
            <IconLabelContainer>
              <IconImg>
                <img src={require("../Assets/images/recieved_icon.png")} />
              </IconImg>
              <SpanLabel>Received</SpanLabel>
            </IconLabelContainer>

            <IconLabelContainer>
              <IconImg>
                <img
                  src={require("../Assets/images/green-card.png")}
                  width={25}
                  height={25}
                />
              </IconImg>
              <SpanLabel>Submitted</SpanLabel>
            </IconLabelContainer>
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
      )}

      <ReportRecievedTable
        data={state.data}
        setState={setState}
        setPage={setPage}
        page={page}
        setRowsPerPage={setRowsPerPage}
        rowsperpage={rowsperpage}
        snackbarStatus={snackbarStatus}
        setSnackbarStatus={setSnackbarStatus}
        setSortOptions={setSortOptions}
        state={state}
      />
    </Container>
  );
}
export default ReportRecieved;

const IconLabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 25px;
  width: 120px;
`;
const IconImg = styled.div`
  width: 27px;
  height: 27px;
  img {
    width: 100%;
    height: 100%;
  }
`;
const SpanLabel = styled.span`
  color: #444445;
  font-size: 16px;
  font-weight: 500;
`;

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
