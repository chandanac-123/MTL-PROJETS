import React, { useState, useEffect } from "react";
import Heading from "../Components/Heading";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import DownloadImageTable from "../Components/DownloadImageTable";
import SelectBoxLabel from "../Components/SelectBoxLabel";
import TextFieldItem from "../Components/Common/TextFieldItem";
import axios from "axios";
import { selectAccess } from "../Slices/authSlice";
import { useSelector } from "react-redux";
import { download_image } from "../Api/DownloadImageApis";
import { fiels_agent_url, district_dropdown } from "../Api/VerificationApis";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import DateRangeInput from "../Components/DateRangeInput";
import { convert_date_format } from "../Functions/utils";
import { useDispatch } from "react-redux";
import { get_data } from "../Store/common/commonSlice";
import { DEFAULT_PAGE_SIZE } from "../common/constants";
import { getPageSize } from "../common/utils";

const getSearchParams = (state) => ({
  search: state.searchValue || undefined,
  field_agent__id: state.verification_agent || undefined,
  assign_verification_id__verification_address__fi_type:
    state.visit_type || undefined,
  assign_verification_id__verification_address__adress_district__id:
    state.district || undefined,
  assign_verification_id__verification_address__verification__application_id:
    state.name || undefined,
  assign_verification_id__verification_address__fi_type:
    state.visit_type || undefined,
  created_at__date__gte: state.from_date
    ? convert_date_format(state.from_date)
    : undefined,
  created_at__date__lte: state.to_date
    ? convert_date_format(state.to_date)
    : undefined,
});

function DownloadImage() {
  const dispatch = useDispatch();
  const access = useSelector(selectAccess);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [dataReset, setDataReset] = useState(true);
  const [rowsperpage, setRowsPerPage] = useState(DEFAULT_PAGE_SIZE);
  const fi_types = [
    { name: "PV", id: "PV" },
    { name: "RV", id: "RV" },
    { name: "PD", id: "PD" },
    { name: "BV", id: "BV" },
  ];
  const [state, setState] = useState({
    visit_type: "",
    district: "",
    customer_id: "",
    verification_agent: "",
    from_date: "",
    to_date: "",
    data: [],
    searchValue: "",
    refresh: false,
    fi_type: "",
    districts: [],
    agentVerifications: [],
    name: "",
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

      let url = !state.searchValue
        ? download_image + `?page=${page}&page_size=${pageSize}`
        : download_image +
          `?search=${state.searchValue}&page=${1}&page_size=${pageSize}`;
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
      //  let url =!state.searchValue ? download_image + `?page=${page}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`:download_image + `?search=${state.searchValue}&page=${1}&page_size=${rowsperpage==10?rowsperpage:rowsperpage<21?20:30}`
      //   const result = await axios.get(url,
      //       { headers: {"Authorization" : `Bearer ${access}`} })
      //       if(result.status === 200){
      //         setState((prevState)=> {
      //           return {
      //             ...prevState,
      //             data: result.data,
      //             refresh: false
      //           }
      //         })
      //         setLoading(false)
      //       }
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

      // try {
      //   const result = await axios.get(district_dropdown, {
      //     headers: { Authorization: `Bearer ${access}` },
      //   });
      //   if (result.status === 200) {
      //     setState((prevState) => {
      //       return {
      //         ...prevState,
      //         districts: result.data,
      //       };
      //     });
      //   }
      // } catch (error) {
      //   console.log(error);
      // }

      dispatch(get_data(fiels_agent_url))
        .then((res) => {
          // console.log('login res => ',res);
          const result = res?.payload;
          if (res?.payload?.status === 200) {
            setState((prevState) => {
              return {
                ...prevState,
                agentVerifications: result.data,
              };
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });

      // try {
      //     const result = await axios.get(fiels_agent_url,
      //         { headers: {"Authorization" : `Bearer ${access}`} })
      //         if(result.status === 200){
      //             setState((prevState)=> {
      //                 return {
      //                     ...prevState,
      //                     agentVerifications: result.data

      //                 }
      //             })
      //         }
      // } catch (error) {
      //     console.log(error);
      // }
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
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

  const handledateSearch = async () => {
    setDataReset(false);
    let startDate = state.from_date ? convert_date_format(state.from_date) : "";
    let endDate = state.to_date ? convert_date_format(state.to_date) : "";
    let url =
      download_image +
      `?search=${state.searchValue}&page=${page}&field_agent__id=${state.verification_agent}&assign_verification_id__verification_address__fi_type=${state.visit_type}&assign_verification_id__verification_address__adress_district__id=${state.district}&assign_verification_id__verification_address__verification__application_id=${state.name}&created_at__date__gte=${startDate}&created_at__date__lte=${endDate}`;
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
    //   let url =download_image + `?search=${state.searchValue}&page=${page}&field_agent__id=${state.verification_agent}&assign_verification_id__verification_address__fi_type=${state.visit_type}&assign_verification_id__verification_address__adress_district__id=${state.district}&assign_verification_id__verification_address__verification__application_id=${state.name}&created_at__date__gte=${startDate}&created_at__date__lte=${endDate}`
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
    //   console.log(error);
    //   setState((prevState) => {
    //     return {
    //       ...prevState,
    //       refresh: false,
    //     };
    //   });
    // }
  };

  const handledateReset = () => {
    setDataReset(true);
    setState((prevState) => {
      return {
        ...prevState,
        visit_type: "",
        district: "",
        name: "",
        verification_agent: "",
        refresh: true,
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
        <Heading name="Download Image" />
        <FilterContainer>
          <HeadDiv className="first">
            <AgentDiv>
              <Label>Visit Type</Label>
              <SelectBoxLabel
                selectType="EmployeeName"
                handleChange={handleSelectChange}
                datas={fi_types}
                name="visit_type"
                value={state.visit_type}
                default=""
                fpadding="9.5px 14px"
                fsize="12px"
                min_width="235px"
              />
            </AgentDiv>
            <AgentDiv>
              <Label>District</Label>
              <SelectBoxLabel
                selectType="EmployeeName"
                handleChange={handleSelectChange}
                datas={state.districts}
                name="district"
                value={state.district}
                default=""
                fpadding="9.5px 14px"
                fsize="12px"
                min_width="235px"
              />
            </AgentDiv>
            <AgentDiv>
              <Label>Customer ID</Label>
              <TextFieldItem
                textField="Text"
                handleChange={handleChange}
                name="name"
                value={state.name}
                placeholder=""
                width="210px"
              />
            </AgentDiv>
          </HeadDiv>
          <HeadDiv>
            <AgentDiv className="agent">
              <Label>Verification Agent</Label>
              <SelectBoxLabel
                selectType="EmployeeName"
                handleChange={handleSelectChange}
                datas={state.agentVerifications}
                name="verification_agent"
                value={state.verification_agent}
                default=""
                fpadding="9.5px 14px"
                fsize="12px"
                min_width="235px"
              />
            </AgentDiv>
            <DateDiv>
              <Label>Date</Label>
              <DateRangeInput
                setState={setState}
                clearIcon={null}
                is_reset={dataReset}
              />
            </DateDiv>
            <ButtonDiv>
              {dataReset ? (
                <TableButton
                  type="button"
                  bcolor="#132756"
                  fcolor="#fff"
                  value="Search"
                  fpadding="8px 26px"
                  onClick={handledateSearch}
                />
              ) : (
                <TableButton
                  type="button"
                  bcolor="#132756"
                  fcolor="#fff"
                  value="Reset"
                  fpadding="8px 30px"
                  onClick={handledateReset}
                />
              )}
            </ButtonDiv>
          </HeadDiv>
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
                  <img src={require("../Assets/images/searchfilter.png")} />
                </InputAdornment>
              ),
              inputProps: { maxLength: 100 },
            }}
          />
        </SearchContainer>
        <DownloadImageTable
          data={state.data}
          setState={setState}
          setPage={setPage}
          page={page}
          setRowsPerPage={setRowsPerPage}
          rowsperpage={rowsperpage}
          searchParams={getSearchParams(state)}
        />
      </Container>
    );
  }
}

export default DownloadImage;

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
`;
const FilterContainer = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.05);
  padding: 22px 95px 22px 40px;
  margin: 15px 0px;
  width: 85%;
`;
const AgentDiv = styled.div`
  font-size: 16px;
  color: #444445;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 30%;
  &.agent {
    width: 38%;
  }
`;
const DateDiv = styled.div`
  display: flex;
  justify-content: normal;
  align-items: center;
  width: 30%;
  height: 50px;
  /* margin-left: 20px; */
`;
const ButtonDiv = styled.div`
  width: 25%;
`;

const Label = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #444445;
`;
const SearchContainer = styled.div`
  width: 30%;
  margin: 28px;
`;
const TableButton = styled.input`
  background-color: ${({ bcolor }) => (bcolor ? bcolor : "unset")};
  border: none;
  color: ${({ fcolor }) => (fcolor ? fcolor : "unset")};
  border-radius: 4px;
  font-size: 15px;
  padding: ${({ fpadding }) => (fpadding ? fpadding : "8px 20px")};
  cursor: pointer;
  font-weight: 500;
  line-height: 1.2;
  margin-left: 1px;
`;
