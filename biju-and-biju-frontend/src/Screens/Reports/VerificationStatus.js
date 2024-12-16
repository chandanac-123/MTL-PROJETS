import React, { useState, useEffect } from "react";
import Heading from "../../Components/Heading";
import styled from "styled-components";
import DateRangeInput from "../../Components/DateRangeInput";
import SearchButton from "../../Components/SearchButton";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import VerificationStatusTable from "../../Components/Reports/VerificationStatusTable";
import SelectBoxLabel from "../../Components/SelectBoxLabel";
import { verification_status_log } from "../../Api/ReportsApis";
import { selectAccess } from "../../Slices/authSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { CircularProgress, LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import { district_dropdown, fiels_agent_url } from "../../Api/VerificationApis";
import { convert_date_format } from "../../Functions/utils";
import { GetPermission } from "../../Functions/utils";
import { useDispatch } from "react-redux";
import { getDataWithParams, get_data } from "../../Store/common/commonSlice";
import { DEFAULT_PAGE_SIZE } from "../../common/constants";
import { getPageSize } from "../../common/utils";

const getSearchParams = (state, page, page_size) => {
  const startDate = state.from_date && convert_date_format(state.from_date);
  const endDate = state.to_date && convert_date_format(state.to_date);

  return {
    search: state.searchValue || undefined,
    verification_address__adress_district__id: state.district || undefined,

    verification_address__fi_type: state.visit_type || undefined,

    assigned_verification_users__field_agent__id:
      state.verification_agent || undefined,

    assign_verification_id__verification_address__verification__application_id:
      state.name || undefined,

    verification_address__fi_date_time__date__range: `${startDate}${
      endDate ? "," : ""
    }${endDate}`,
    page,
    page_size,
  };
};
function VerificationStatus() {
  const dispatch = useDispatch();
  const permission = GetPermission("verification_status_log", "change");
  const [is_reset, setReset] = useState(false);
  const access = useSelector(selectAccess);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [rowsperpage, setRowsPerPage] = useState(DEFAULT_PAGE_SIZE);
  const [state, setState] = useState({
    visit_type: "",
    district: "",
    customer_id: "",
    verification_agent: "",
    from_date: "",
    to_date: "",
    searchValue: "",
    districts: [],
    verificationAgent: [],
    refresh: false,
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
      const params = getSearchParams(state, page, pageSize);
      const url = verification_status_log;
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
          setLoading(false);
          setState((prevState) => {
            return {
              ...prevState,
              refresh: false,
            };
          });
        });

      //   try {
      //     let url = !state.searchValue
      //       ? verification_status_log +
      //         `?page=${page}&page_size=${
      //           rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30
      //         }`
      //       : verification_status_log +
      //         `?search=${state.searchValue}&page=${1}&page_size=${
      //           rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30
      //         }`;
      //     const result = await axios.get(url, {
      //       headers: { Authorization: `Bearer ${access}` },
      //     });
      //     if (result.status === 200) {
      //       setState((prevState) => {
      //         return {
      //           ...prevState,
      //           data: result.data,
      //           refresh: false,
      //         };
      //       });
      //       setLoading(false);
      //     }
      //   } catch (error) {
      //     setState((prevState) => {
      //       return {
      //         ...prevState,
      //         refresh: false,
      //       };
      //     });
      //   }
    }
    if (state.refresh) {
      fetchMyAPI();
    }
  }, [state.refresh]);

  useEffect(() => {
    async function fetchMyAPI() {
      dispatch(get_data(district_dropdown))
        .then((res) => {
          // console.log('login res => ',res);
          const result = res?.payload;
          if (res?.payload?.status === 200) {
            setState((prevState) => {
              return {
                ...prevState,
                districts: result.data,
              };
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });

      //   try {
      //     const result = await axios.get(district_dropdown, {
      //       headers: { Authorization: `Bearer ${access}` },
      //     });
      //     if (result.status === 200) {
      //       setState((prevState) => {
      //         return {
      //           ...prevState,
      //           districts: result.data,
      //         };
      //       });
      //     }
      //   } catch (error) {
      //     console.log(error);
      //   }

      dispatch(get_data(fiels_agent_url))
        .then((res) => {
          // console.log('login res => ',res);
          const result = res?.payload;
          if (res?.payload?.status === 200) {
            setState((prevState) => {
              return {
                ...prevState,
                verificationAgent: result.data,
              };
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });

      //   try {
      //     const result = await axios.get(fiels_agent_url, {
      //       headers: { Authorization: `Bearer ${access}` },
      //     });
      //     if (result.status === 200) {
      //       setState((prevState) => {
      //         return {
      //           ...prevState,
      //           verificationAgent: result.data,
      //         };
      //       });
      //     }
      //   } catch (error) {
      //     console.log(error);
      //   }
    }
    fetchMyAPI();
  }, []);

  const handleSelectChange = (value, name) => {
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleFilter = async () => {
    setReset(false);
    setPage(1);
    const pageSize = getPageSize(rowsperpage);
    const params = getSearchParams(state, 1, pageSize);
    const url = verification_status_log;
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
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        setState((prevState) => {
          return {
            ...prevState,
            refresh: false,
          };
        });
      });

    // try {
    //   let url =
    //     verification_status_log +
    //     `?verification_address__adress_district__id=${
    //       state.district
    //     }&verification_address__fi_type=${
    //       state.visit_type
    //     }&assigned_verification_users__field_agent__id=${
    //       state.verification_agent
    //     }&verification_address__fi_date_time__date__range=${startDate}${
    //       endDate ? "," : ""
    //     }${endDate}`;
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
    //   }
    // } catch (error) {
    //   setState((prevState) => {
    //     return {
    //       ...prevState,
    //       refresh: false,
    //     };
    //   });
    // }
  };

  const handleReset = () => {
    setReset(true);
    setState((prevState) => {
      return {
        ...prevState,
        district: "",
        visit_type: "",
        customer_id: "",
        verification_agent: "",
        from_date: "",
        to_date: "",
        refresh: true,
      };
    });
  };

  const handleSearch = (e) => {
    setState((prevState) => {
      return {
        ...prevState,
        searchValue: e.target.value,
        refresh: false,
      };
    });
  };

  const visitType = [
    { name: "RV", id: "RV" },
    { name: "BV", id: "BV" },
    { name: "PV", id: "PV" },
    { name: "PD", id: "PD" },
  ];

  return (
    <Container>
      <Heading name="Verification Status & Log Report" />

      {loading && <LinearProgress />}
      <FilterContainer>
        <HeadDiv className="first">
          <AgentDiv>
            <Label>Visit Type</Label>
            <SelectBoxLabel
              handleChange={handleSelectChange}
              datas={visitType}
              selectType="name"
              name="visit_type"
              value={state.visit_type}
              fpadding="9.5px 14px"
              fsize="12px"
              min_width="235px"
            />
          </AgentDiv>
          <AgentDiv>
            <Label>District</Label>
            <SelectBoxLabel
              handleChange={handleSelectChange}
              datas={state.districts}
              name="district"
              selectType="EmployeeName"
              value={state.district}
              fpadding="9.5px 14px"
              fsize="12px"
              min_width="235px"
            />
          </AgentDiv>
          <AgentDiv className="agent">
            <Label>Verification Agent</Label>
            <SelectBoxLabel
              handleChange={handleSelectChange}
              datas={state.verificationAgent}
              selectType="EmployeeName"
              name="verification_agent"
              value={state.verification_agent}
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
            />
          </DateDiv>
          <ButtonDiv>
            <SearchButton handleSearch={handleFilter} />
            <SearchButton handleSearch={handleReset} title="Reset" />
          </ButtonDiv>
        </HeadDiv>
      </FilterContainer>
      <SearchContainer>
        <SectionDiv className="left">
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
        </SectionDiv>
      </SearchContainer>
      {permission && !!state.data && (
        <VerificationStatusTable
          filterCondition={state}
          data={state.data}
          excelDatas={state.excelData}
          setState={setState}
          setPage={setPage}
          page={page}
          setRowsPerPage={setRowsPerPage}
          rowsperpage={rowsperpage}
          searchParams={getSearchParams(state)}
        />
      )}
    </Container>
  );
}

export default VerificationStatus;

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
    margin-left: -36px;
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
  margin: 0px 5px 0px 9px;
  color: #444445;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 32%;
  &.agent {
    width: 40%;
  }
  &.customer_id {
    width: 35%;
  }
`;
const DateDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 48%;
`;
const ButtonDiv = styled.div`
  width: 30%;
  display: flex;
  gap: 10px;
`;

const Label = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #444445;
  &.date-label {
    margin-right: 24px;
    margin-left: 44px;
  }
`;
const SearchContainer = styled.div`
  margin: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
