import React, { useEffect, useRef, useState } from "react";
import Heading from "../Components/Heading";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import FilterBox from "../Components/FilterBox";
import AssignedVerificationTable from "../Components/Common/AssignedVerificationTable";
import { useSelector } from "react-redux";
import {
  v2_product_dropdown,
  v2_vendor_dropdown,
  v2_assigned_verification,
  district_dropdown,
} from "../Api/VerificationApis";
import { LinearProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { getDataWithParams, get_data } from "../Store/common/commonSlice";
import { useMediaQuery } from "react-responsive";
import AssignedVerificationHeader from "../Components/Verification/AssignedVerificationHeader";
import { DEFAULT_PAGE_SIZE } from "../common/constants";
import { getPageSize } from "../common/utils";
import { RefreshButton } from "../Components/RefreshButton";
import SearchInput from "../Components/Common/SearchInput";
import {
  selectFilter,
  setDataFilter,
} from "../Slices/assignedVerificationSlice";

const getSearchParams = (state, page, page_size, fieldToSort) => {
  return {
    search: state.searchValue || undefined,
    verification_address__adress_district__id: state.address_district,
    verification_address__fi_type: state.fi_type,
    verification_address__verification__vendor__employee_name: state.vendorValue
      ? state.vendors.filter((item) => item.id === state.vendorValue)[0]
        ?.employee_name
      : "",
    verification_address__verification__product__product_name:
      state.productValue
        ? state.products.filter((item) => item.id === state.productValue)[0]
          ?.product_name
        : "",
    page,
    page_size,
    ordering: fieldToSort,
  };
};

function AssignedVerification() {
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

  const filter = useSelector(selectFilter);

  const [state, setState] = useState(filter);

  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      dispatch(setDataFilter(state));
    }
  }, [state]);

  isMounted.current = true;

  useEffect(() => {
    setState((prevState) => {
      return {
        ...prevState,
        refresh: true,
      };
    });
  }, [page, rowsperpage, state.searchValue]);

  const refreshGrid = () => {
    setState((prevState) => {
      return {
        ...prevState,
        refresh: true,
      };
    });
  };

  const [sortOptions, setSortOptions] = useState({
    fieldToSort: "",
    fieldName: "",
    sortType: null, // null | asc | desc,
  });

  useEffect(() => {
    async function fetchMyAPI() {
      const pageSize = getPageSize(rowsperpage);
      const params = getSearchParams(
        state,
        page,
        pageSize,
        sortOptions.fieldToSort
      );

      const url = v2_assigned_verification;
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

  const handleFilter = async () => {
    const pageSize = getPageSize(rowsperpage);
    setPage(1);
    const params = getSearchParams(state, 1, pageSize, sortOptions.fieldToSort);

    const url = v2_assigned_verification;
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

  const handleSelectChange = (value, name) => {
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
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
      <Heading name="Assigned Verification" />
      {loading && <LinearProgress />}
      {isMobileScreen ? (
        <AssignedVerificationHeader
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

      <AssignedVerificationTable
        data={state.data}
        setState={setState}
        setPage={setPage}
        page={page}
        setRowsPerPage={setRowsPerPage}
        rowsperpage={rowsperpage}
        state={state}
        setSortOptions={setSortOptions}
      />
    </Container>
  );
}
export default AssignedVerification;

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
  width: 95%;
  margin: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
