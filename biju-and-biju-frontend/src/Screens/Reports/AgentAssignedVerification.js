import React, { useEffect, useState } from "react";
import Heading from "../../Components/Heading";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconLabelButtons from "../../Components/IconLabelButton";
import FilterBox from "../../Components/FilterBox";
import AssignedVerificationTable from "../../Components/Common/AssignedVerificationTable";
import { selectAccess } from "../../Slices/authSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  product_dropdown,
  vendor_dropdown,
  assigned_verification,
  district_dropdown,
} from "../../Api/VerificationApis";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { get_data } from "../../Store/common/commonSlice";
import { DEFAULT_PAGE_SIZE } from "../../common/constants";

const getUrlWithSearchParams = (id, state, page, rowsPerPage) => {
  let url = assigned_verification;
  url =
    assigned_verification +
    `?assigned_verification_users__field_agent__id=${id}&verification_address__adress_district__id=${
      state.address_district
    }&verification_address__fi_type=${
      state.fi_type
    }&verification_address__verification__vendor__employee_name=${
      state.vendorValue
        ? state.vendors.filter((item) => item.id == state.vendorValue)[0]
            ?.employee_name
        : ""
    }&verification_address__verification__product__product_name=${
      state.productValue
        ? state.products.filter((item) => item.id == state.productValue)[0]
            ?.product_name
        : ""
    }&search=${state.searchValue}&page=${page}&page_size=${rowsPerPage}`;
  return url;
};

function AgentAssignedVerification() {
  const dispatch = useDispatch();
  const { id, name } = useParams();
  const [isfilter, setFilter] = React.useState(false);
  const access = useSelector(selectAccess);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [rowsperpage, setRowsPerPage] = useState(DEFAULT_PAGE_SIZE);
  const fi_types = [
    { name: "PV", id: "PV" },
    { name: "RV", id: "RV" },
    { name: "PD", id: "PD" },
    { name: "BV", id: "BV" },
  ];
  const [state, setState] = useState({
    filter_value: "all",
    data: [],
    searchValue: "",
    is_edit: true,
    refresh: true,
    products: [],
    vendors: [],
    districts: [],
    address_district: "",
    fi_type: "",
    productValue: "",
    vendorValue: "",
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
      const url = getUrlWithSearchParams(id, state, page, rowsperpage);

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

      //   try {
      //     let url = assigned_verification;
      //     url =
      //       assigned_verification +
      //       `?assigned_verification_users__field_agent__id=${id}&search=${
      //         state.searchValue
      //       }&page=${page}&page_size=${
      //         rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30
      //       }`;
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

      dispatch(get_data(product_dropdown + `?vendor=${state.vendorValue}`))
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

      //   try {
      //     const result = await axios.get(
      //       product_dropdown + `?vendor=${state.vendorValue}`,
      //       { headers: { Authorization: `Bearer ${access}` } }
      //     );
      //     if (result.status === 200) {
      //       setState((prevState) => {
      //         return {
      //           ...prevState,
      //           products: result.data,
      //         };
      //       });
      //     }
      //   } catch (error) {
      //     console.log(error);
      //   }

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

      //   try {
      //     const result = await axios.get(vendor_dropdown, {
      //       headers: { Authorization: `Bearer ${access}` },
      //     });
      //     if (result.status === 200) {
      //       setState((prevState) => {
      //         return {
      //           ...prevState,
      //           vendors: result.data,
      //         };
      //       });
      //     }
      //   } catch (error) {
      //     console.log(error);
      //   }
    }
    fetchMyAPI();
  }, [state.vendorValue]);

  const handleFilter = async () => {
    setPage(1);
    const url = getUrlWithSearchParams(id, state, 1, rowsperpage);
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
    //   let url = assigned_verification;
    //   url =
    //     assigned_verification +
    //     `?verification_address__adress_district__id=${
    //       state.address_district
    //     }&verification_address__fi_type=${
    //       state.fi_type
    //     }&verification_address__verification__vendor__employee_name=${
    //       state.vendorValue
    //         ? state.vendors.filter((item) => item.id == state.vendorValue)[0]
    //             ?.employee_name
    //         : ""
    //     }&verification_address__verification__product__product_name=${
    //       state.productValue
    //         ? state.products.filter((item) => item.id == state.productValue)[0]
    //             ?.product_name
    //         : ""
    //     }`;
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

  const handleSelectChange = (value, name) => {
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleReset = () => {
    setPage(1);
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

  const handleClick = (name) => {
    console.log("enter");
    if (name === "filter") {
      setFilter(!isfilter);
    }
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
        <Heading name={`Agent Wise Pending Cases (${name})`} />
        <SearchContainer>
          <SectionDiv className="left">
            <TextInput
              id="outlined-start-adornment"
              sx={{ m: 0, width: "100%" }}
              onChange={(e) => handleSearch(e)}
              placeholder="Search"
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
          <SectionDiv>
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
        <AssignedVerificationTable
          data={state.data}
          setState={setState}
          setPage={setPage}
          page={page}
          setRowsPerPage={setRowsPerPage}
          rowsperpage={rowsperpage}
          searchParams={{
            search: state.searchValue || undefined,
            assigned_verification_users__field_agent__id: id || undefined,
            verification_address__adress_district__id:
              state.address_district || undefined,
            verification_address__fi_type: state.fi_type || undefined,
            verification_address__verification__vendor__employee_name:
              state.vendorValue
                ? state.vendors.filter(
                    (item) => item.id == state.vendorValue
                  )[0]?.employee_name
                : undefined,
            verification_address__verification__product__product_name:
              state.productValue
                ? state.products.filter(
                    (item) => item.id == state.productValue
                  )[0]?.product_name
                : undefined,
          }}
        />
      </Container>
    );
  }
}

export default AgentAssignedVerification;

const FilterButton = styled(IconLabelButtons)`
  position: relative !important;
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
  /* width: 30%; */
  margin: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
