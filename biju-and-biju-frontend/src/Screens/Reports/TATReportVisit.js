import React, { useState, useEffect } from "react";
import Heading from "../../Components/Heading";
import styled from "styled-components";
import SearchButton from "../../Components/SearchButton";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import TATReportVisitTable from "../../Components/Reports/TATReportVisitTable";
import SelectBoxLabel from "../../Components/SelectBoxLabel";
import { tat_report_per_visit } from "../../Api/ReportsApis";
import axios from "axios";
import { selectAccess } from "../../Slices/authSlice";
import { useSelector } from "react-redux";
import {
  all_vendor_dropdown,
  all_product_dropdown,
} from "../../Api/DropDownApis";
import { CircularProgress } from "@mui/material";
import { GetPermission } from "../../Functions/utils";
import { Box } from "@mui/system";
import { useMediaQuery } from "react-responsive";
import { DEFAULT_PAGE_SIZE } from "../../common/constants";
import { getPageSize } from "../../common/utils";

const getSearchParams = (state, page, page_size) => ({
  search: state.searchValue || undefined,
  verification_address__verification__vendor__id: state.vendor || undefined,
  verification_address__fi_type: state.visit_type || undefined,
  verification_address__verification__product__id: state.product || undefined,
  page,
  page_size,
});

function TATReportVisit() {
  const permission = GetPermission("tat_reports_visit", "change");
  const isMobileScreen = useMediaQuery({ query: "(max-width: 480px)" });
  const access = useSelector(selectAccess);
  const [loading, setLoading] = useState(true);
  const [filterState, setFilterState] = useState(true);
  const [page, setPage] = useState(1);
  const [rowsperpage, setRowsPerPage] = useState(DEFAULT_PAGE_SIZE);
  const [state, setState] = useState({
    vendor: "",
    product: "",
    visit_type: "",
    refresh: true,
    searchValue: "",
    product_list: [],
    vendor_list: [],
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
      try {
        const pageSize = getPageSize(DEFAULT_PAGE_SIZE);

        const params = getSearchParams(state, page, pageSize);
        const url = tat_report_per_visit;

        const result = await axios.get(url, {
          headers: { Authorization: `Bearer ${access}` },
          params,
        });
        if (result.status === 200) {
          setState((prevState) => {
            return {
              ...prevState,
              data: result.data,
              refresh: false,
            };
          });
          setLoading(false);
        }
      } catch (error) {
        setState((prevState) => {
          return {
            ...prevState,
            refresh: false,
          };
        });
      }
    }
    if (state.refresh) {
      fetchMyAPI();
    }
  }, [state.refresh]);

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        const result = await axios.get(all_vendor_dropdown, {
          headers: { Authorization: `Bearer ${access}` },
        });
        if (result.status === 200) {
          console.log(result);
          setState((prevState) => {
            return {
              ...prevState,
              vendor_list: result.data,
            };
          });
        }
      } catch (error) {
        console.log(error);
      }

      try {
        let url = all_product_dropdown;
        if (state.vendor) {
          url = all_product_dropdown + `?vendor=${state.vendor}`;
        }
        const result = await axios.get(url, {
          headers: { Authorization: `Bearer ${access}` },
        });
        if (result.status === 200) {
          setState((prevState) => {
            return {
              ...prevState,
              product_list: result.data,
            };
          });
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    fetchMyAPI();
  }, [state.vendor]);

  const handleFilter = async () => {
    setFilterState(false);
    try {
      const pageSize = getPageSize(DEFAULT_PAGE_SIZE);

      setPage(1);
      const params = getSearchParams(state, 1, pageSize);
      const url = tat_report_per_visit;

      const result = await axios.get(url, {
        headers: { Authorization: `Bearer ${access}` },
        params,
      });
      if (result.status === 200) {
        setState((prevState) => {
          return {
            ...prevState,
            data: result.data,
            refresh: false,
          };
        });
      }
    } catch (error) {
      console.log(error);
      setState((prevState) => {
        return {
          ...prevState,
          refresh: false,
        };
      });
    }
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
    setFilterState(true);
    setState((prevState) => {
      return {
        ...prevState,
        visit_type: "",
        vendor: "",
        product: "",
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

  const fi_types = [
    { name: "PV", id: "PV" },
    { name: "RV", id: "RV" },
    { name: "PD", id: "PD" },
    { name: "BV", id: "BV" },
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
        <Heading name="TAT Reports Visit" />
        <FilterContainer isMobileScreen={isMobileScreen}>
          <HeadDiv isMobileScreen={isMobileScreen}>
            <AgentDiv>
              <Label>Vendor </Label>

              <SelectBoxLabel
                handleChange={handleSelectChange}
                datas={state.vendor_list}
                selectType="EmployeeName"
                name="vendor"
                value={state.vendor}
                fpadding="9.5px 14px"
                fsize="12px"
                min_width={isMobileScreen ? "180px" : "235px"}
              />
            </AgentDiv>
            <AgentDiv>
              <Label>Product </Label>
              <SelectBoxLabel
                handleChange={handleSelectChange}
                datas={state.product_list}
                selectType="ProductName"
                name="product"
                value={state.product}
                fpadding="9.5px 14px"
                fsize="12px"
                min_width={isMobileScreen ? "180px" : "235px"}
              />
            </AgentDiv>
            <AgentDiv>
              <Label>Visit Type </Label>
              <SelectBoxLabel
                handleChange={handleSelectChange}
                datas={fi_types}
                selectType="EmployeeName"
                name="visit_type"
                value={state.visit_type}
                fpadding="9.5px 14px"
                fsize="12px"
                min_width={isMobileScreen ? "180px" : "235px"}
              />
            </AgentDiv>
            <ButtonDiv>
              {filterState ? (
                <SearchButton handleSearch={handleFilter} />
              ) : (
                <SearchButton handleSearch={handleReset} title="Reset" />
              )}
            </ButtonDiv>
          </HeadDiv>
        </FilterContainer>
        <SearchContainer>
          <SectionDiv className="left" isMobileScreen={isMobileScreen}>
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
                    />
                  </InputAdornment>
                ),
                inputProps: { maxLength: 100 },
              }}
            />
          </SectionDiv>
        </SearchContainer>
        {permission && (
          <TATReportVisitTable
            data={state.data}
            setState={setState}
            page={page}
            setPage={setPage}
            setRowsPerPage={setRowsPerPage}
            rowsperpage={rowsperpage}
            searchParams={getSearchParams(state)}
          />
        )}
      </Container>
    );
  }
}

export default TATReportVisit;

const SectionDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  &.left {
    width: ${({ isMobileScreen }) => (isMobileScreen ? " 100%" : " 30%")};
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
  justify-content: space-between;
  align-items: ${({ isMobileScreen }) =>
    isMobileScreen ? "flex-start" : "center"};
  &.first {
    margin-bottom: 15px;
  }
  &.secondary {
    /* width: 55%; */
  }
  flex-direction: ${({ isMobileScreen }) =>
    isMobileScreen ? "column" : "row"};
  gap: 10px;
`;
const FilterContainer = styled.div`
  background-color: ${({ isMobileScreen }) =>
    isMobileScreen ? "transparent" : "#ffffff"};
  border-radius: 12px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.05);
  padding: ${({ isMobileScreen }) =>
    isMobileScreen ? "0" : "22px 50px 22px 40px"};
  margin: 15px 0px;
`;
const AgentDiv = styled.div`
  font-size: 16px;
  color: #444445;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonDiv = styled.div`
  width: 80px;
`;

const Label = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #444445;
  &.date-label {
    margin-right: 24px;
    margin-left: 44px;
  }
  width: 80px;
`;
const SearchContainer = styled.div`
  /* width: 30%; */
  margin: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
