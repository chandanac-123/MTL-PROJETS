import React, { useState } from "react";
import Heading from "../../Components/Heading";
import styled from "styled-components";
import SelectBox from "../../Components/SelectBox";
import DateRangeInput from "../../Components/DateRangeInput";
import SearchButton from "../../Components/SearchButton";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FilterBox from "../../Components/FilterBox";
import TATReportProductTable from "../../Components/Reports/TATReportProductTabel";
import AssignTATProduct from "../../Components/Reports/TATReportTables/AssignTATProduct";
import AssignTATDistrict from "../../Components/Reports/TATReportTables/AssignTATDistrict";
import FieldTATExecutive from "../../Components/Reports/TATReportTables/FieldTATExecutive";
import FieldTATProduct from "../../Components/Reports/TATReportTables/FieldTATProduct";
import TotalTATDistrict from "../../Components/Reports/TATReportTables/TotalTATDistrict";
import TotalTATProduct from "../../Components/Reports/TATReportTables/TotalTATProduct";
import SelectBoxLabel from "../../Components/SelectBoxLabel";
import DistrictTAT from "../../Components/Reports/TATReportTables/DistrictTAT";
import FieldTATDistrict from "../../Components/Reports/TATReportTables/FieldTATDistrict";
import OfficeTATDistrict from "../../Components/Reports/TATReportTables/OfficeTATDistrict";
import OfficeTATProduct from "../../Components/Reports/TATReportTables/OfficeTATProduct";
import {
  assign_tat_district,
  assign_tat_product,
  district_tat_district,
  field_tat_district,
  field_tat_field_agent,
  field_tat_product,
  office_tat_district,
  office_tat_product,
  total_tat_district,
  total_tat_product,
} from "../../Api/ReportsApis";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectAccess } from "../../Slices/authSlice";
import { convert_date_format } from "../../Functions/utils";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { get_data } from "../../Store/common/commonSlice";
import { useMediaQuery } from "react-responsive";
import TatReportHeader from "./TatReportHeader";
import { DEFAULT_PAGE_SIZE } from "../../common/constants";
import SearchInput from "../../Components/Common/SearchInput";

const EXCEL_EXPORT_SOURCES = {
  "Allocation TAT (Product)": "ALLOCATION_TAT",
  "Assign TAT (District)": "ASSIGN_TAT",
  "District TAT (District)": "DISTRICT_TAT",
  "Field TAT (District)": "FIELD_TAT_DISTRICT",
  "Field TAT (Field Agent)": "FIELD_TAT_AGENT",
  "Field TAT (Product)": "FIELD_TAT_PRODUCT",
  "Office TAT (District)": "OFFICE_TAT_DISTRICT",
  "Office TAT (Product)": "OFFICE_TAT_PRODUCT",
  "Total TAT (District)": "TOTAL_TAT_DISTRICT",
  "Total TAT (Product)": "TOTAL_TAT_PRODUCT",
};

function TATReports() {
  const dispatch = useDispatch();
  const isMobileScreen = useMediaQuery({ query: "(max-width: 480px)" });
  // const [isfilter, setFilter] = React.useState("");
  const access = useSelector(selectAccess);
  const [page, setPage] = useState(1);
  const [rowsperpage, setRowsPerPage] = useState(DEFAULT_PAGE_SIZE);
  const [state, setState] = useState({
    filter_value: "Allocation TAT (Product)",
    from_date: "",
    to_date: "",
    data: [],
    searchValue: "",
  });

  useEffect(() => {
    if (page) {
      handleSearch();
    }
  }, [page, rowsperpage, state.searchValue, state.filter_value]);

  const handleSelectChange = (value, name) => {
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
        data: [],
      };
    });
    setPage(1);
  };

  const handleSearch = async () => {
    console.log(state);
    let url = "";
    if (state.filter_value === "Allocation TAT (Product)") {
      url = assign_tat_product + `?page=${page}&page_size=${rowsperpage}`;
    } else if (state.filter_value === "Assign TAT (District)") {
      url = assign_tat_district + `?page=${page}&page_size=${rowsperpage}`;
    } else if (state.filter_value === "District TAT (District)") {
      url = district_tat_district + `?page=${page}&page_size=${rowsperpage}`;
    } else if (state.filter_value === "Field TAT (District)") {
      url = field_tat_district + `?page=${page}&page_size=${rowsperpage}`;
    } else if (state.filter_value === "Field TAT (Field Agent)") {
      url = field_tat_field_agent + `?page=${page}&page_size=${rowsperpage}`;
    } else if (state.filter_value === "Field TAT (Product)") {
      url = field_tat_product + `?page=${page}&page_size=${rowsperpage}`;
    } else if (state.filter_value === "Office TAT (District)") {
      url = office_tat_district + `?page=${page}&page_size=${rowsperpage}`;
    } else if (state.filter_value === "Office TAT (Product)") {
      url = office_tat_product + `?page=${page}&page_size=${rowsperpage}`;
    } else if (state.filter_value === "Total TAT (District)") {
      url = total_tat_district + `?page=${page}&page_size=${rowsperpage}`;
    } else if (state.filter_value === "Total TAT (Product)") {
      url = total_tat_product + `?page=${page}&page_size=${rowsperpage}`;
    }
    if (state.from_date && state.to_date) {
      let from_date = state.from_date?.toLocaleDateString();
      let to_date = state.to_date?.toLocaleDateString();
      from_date = convert_date_format(from_date);
      to_date = convert_date_format(to_date);
      url = url + `&start_date=${from_date}&end_date=${to_date}`;
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
            };
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });

    // try {
    //     const result = await axios.get(url,
    //         { headers: {"Authorization" : `Bearer ${access}`} })
    //         console.log(result);
    //         if(result.status === 200){
    //             setState((prevState)=> {
    //                 return {
    //                     ...prevState,
    //                     data: result.data,
    //                 }
    //             })
    //             // setLoading(false)
    //         }
    // } catch (error) {
    //     console.log(error);
    //     // setState((prevState)=> {
    //     //   return {
    //     //       ...prevState,
    //     //   }
    //     // })
    // }
  };

  const handleSearchItem = (searchExp) => {
    setState((prevState) => {
      return {
        ...prevState,
        searchValue: searchExp,
      };
    });
    setPage(1);
  };

  let Tat_filter = [
    {
      name: "Allocation TAT (Product)",
      id: "Allocation TAT (Product)",
    },
    {
      name: "Assign TAT (District)",
      id: "Assign TAT (District)",
    },
    {
      name: "District TAT (District)",
      id: "District TAT (District)",
    },
    {
      name: "Field TAT (District)",
      id: "Field TAT (District)",
    },
    {
      name: "Field TAT (Field Agent)",
      id: "Field TAT (Field Agent)",
    },
    {
      name: "Field TAT (Product)",
      id: "Field TAT (Product)",
    },
    {
      name: "Office TAT (District)",
      id: "Office TAT (District)",
    },
    {
      name: "Office TAT (Product)",
      id: "Office TAT (Product)",
    },
    {
      name: "Total TAT (District)",
      id: "Total TAT (District)",
    },
    {
      name: "Total TAT (Product)",
      id: "Total TAT (Product)",
    },
  ];

  return (
    <Container>
      <Heading name="TAT Reports" />
      {isMobileScreen ? (
        <TatReportHeader
          handleSelectChange={handleSelectChange}
          handleSearchItem={handleSearchItem}
          handleSearch={handleSearch}
          state={state}
          Tat_filter={Tat_filter}
          setState={setState}
        />
      ) : (
        <>
          <FilterContainer>
            <HeadDiv>
              <AgentDiv>
                <Label>TAT Report</Label>
                <SelectBoxLabel
                  handleChange={handleSelectChange}
                  name="filter_value"
                  value={state.filter_value}
                  datas={Tat_filter}
                  selectType="name"
                  default=""
                  fpadding="9.5px 14px"
                  fsize="12px"
                  min_width="235px"
                />
              </AgentDiv>
              <DateDiv>
                <Label className="date-label">Date</Label>
                <DateRangeInput setState={setState} clearIcon={null} />
              </DateDiv>
              <ButtonDiv>
                <SearchButton handleSearch={handleSearch} />
              </ButtonDiv>
            </HeadDiv>
          </FilterContainer>
          <SearchContainer>
            <SearchInput
              handleSearch={handleSearchItem}
              value={state.searchValue}
            />
          </SearchContainer>
        </>
      )}

      {state.filter_value === "Assign TAT (District)" ? (
        <AssignTATDistrict
          data={state.data}
          from_date={state.from_date}
          to_date={state.to_date}
          setState={setState}
          setPage={setPage}
          page={page}
          setRowsPerPage={setRowsPerPage}
          rowsperpage={rowsperpage}
          searchParams={{
            search: state.searchValue,
            start_date:
              (state.from_date && convert_date_format(state.from_date)) ||
              undefined,
            end_date:
              (state.to_date && convert_date_format(state.to_date)) ||
              undefined,
          }}
        />
      ) : state.filter_value === "Allocation TAT (Product)" ? (
        <AssignTATProduct
          data={state.data}
          from_date={state.from_date}
          to_date={state.to_date}
          setState={setState}
          setPage={setPage}
          page={page}
          setRowsPerPage={setRowsPerPage}
          rowsperpage={rowsperpage}
          searchParams={{
            search: state.searchValue,
            start_date:
              (state.from_date && convert_date_format(state.from_date)) ||
              undefined,
            end_date:
              (state.to_date && convert_date_format(state.to_date)) ||
              undefined,
          }}
        />
      ) : state.filter_value === "District TAT (District)" ? (
        <DistrictTAT
          data={state.data}
          from_date={state.from_date}
          to_date={state.to_date}
          setState={setState}
          setPage={setPage}
          page={page}
          setRowsPerPage={setRowsPerPage}
          rowsperpage={rowsperpage}
          searchParams={{
            search: state.searchValue,
            start_date:
              (state.from_date && convert_date_format(state.from_date)) ||
              undefined,
            end_date:
              (state.to_date && convert_date_format(state.to_date)) ||
              undefined,
          }}
        />
      ) : state.filter_value === "Field TAT (District)" ? (
        <FieldTATDistrict
          data={state.data}
          from_date={state.from_date}
          to_date={state.to_date}
          setState={setState}
          setPage={setPage}
          page={page}
          setRowsPerPage={setRowsPerPage}
          rowsperpage={rowsperpage}
          searchParams={{
            search: state.searchValue,
            start_date:
              (state.from_date && convert_date_format(state.from_date)) ||
              undefined,
            end_date:
              (state.to_date && convert_date_format(state.to_date)) ||
              undefined,
          }}
        />
      ) : state.filter_value === "Field TAT (Field Agent)" ? (
        <FieldTATExecutive
          data={state.data}
          from_date={state.from_date}
          to_date={state.to_date}
          setState={setState}
          setPage={setPage}
          page={page}
          setRowsPerPage={setRowsPerPage}
          rowsperpage={rowsperpage}
          searchParams={{
            search: state.searchValue,
            start_date:
              (state.from_date && convert_date_format(state.from_date)) ||
              undefined,
            end_date:
              (state.to_date && convert_date_format(state.to_date)) ||
              undefined,
          }}
        />
      ) : state.filter_value === "Field TAT (Product)" ? (
        <FieldTATProduct
          data={state.data}
          from_date={state.from_date}
          to_date={state.to_date}
          setState={setState}
          setPage={setPage}
          page={page}
          setRowsPerPage={setRowsPerPage}
          rowsperpage={rowsperpage}
          searchParams={{
            search: state.searchValue,
            start_date:
              (state.from_date && convert_date_format(state.from_date)) ||
              undefined,
            end_date:
              (state.to_date && convert_date_format(state.to_date)) ||
              undefined,
          }}
        />
      ) : state.filter_value === "Office TAT (District)" ? (
        <OfficeTATDistrict
          data={state.data}
          from_date={state.from_date}
          to_date={state.to_date}
          setState={setState}
          setPage={setPage}
          page={page}
          setRowsPerPage={setRowsPerPage}
          rowsperpage={rowsperpage}
          searchParams={{
            search: state.searchValue,
            start_date:
              (state.from_date && convert_date_format(state.from_date)) ||
              undefined,
            end_date:
              (state.to_date && convert_date_format(state.to_date)) ||
              undefined,
          }}
        />
      ) : state.filter_value === "Office TAT (Product)" ? (
        <OfficeTATProduct
          data={state.data}
          from_date={state.from_date}
          to_date={state.to_date}
          setState={setState}
          setPage={setPage}
          page={page}
          setRowsPerPage={setRowsPerPage}
          rowsperpage={rowsperpage}
          searchParams={{
            search: state.searchValue,
            start_date:
              (state.from_date && convert_date_format(state.from_date)) ||
              undefined,
            end_date:
              (state.to_date && convert_date_format(state.to_date)) ||
              undefined,
          }}
        />
      ) : state.filter_value === "Total TAT (District)" ? (
        <TotalTATDistrict
          data={state.data}
          from_date={state.from_date}
          to_date={state.to_date}
          setState={setState}
          setPage={setPage}
          page={page}
          setRowsPerPage={setRowsPerPage}
          rowsperpage={rowsperpage}
          searchParams={{
            search: state.searchValue,
            start_date:
              (state.from_date && convert_date_format(state.from_date)) ||
              undefined,
            end_date:
              (state.to_date && convert_date_format(state.to_date)) ||
              undefined,
          }}
        />
      ) : state.filter_value === "Total TAT (Product)" ? (
        <TotalTATProduct
          data={state.data}
          from_date={state.from_date}
          to_date={state.to_date}
          setState={setState}
          setPage={setPage}
          page={page}
          setRowsPerPage={setRowsPerPage}
          rowsperpage={rowsperpage}
          searchParams={{
            search: state.searchValue,
            start_date:
              (state.from_date && convert_date_format(state.from_date)) ||
              undefined,
            end_date:
              (state.to_date && convert_date_format(state.to_date)) ||
              undefined,
          }}
        />
      ) : (
        <TATReportProductTable />
      )}
    </Container>
  );
}

export default TATReports;

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
export const HeadDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
export const AgentDiv = styled.div`
  font-size: 16px;
  color: #444445;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 35%;
  &.agent {
    width: 40%;
  }
`;
export const DateDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 48%;
  /* margin-left: 20px; */
`;
const ButtonDiv = styled.div`
  width: 30%;
`;

export const Label = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #444445;
  &.date-label {
    margin-right: 24px;
    margin-left: 44px;
  }
`;
const SearchContainer = styled.div`
  /* width: 30%; */
  margin: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
