import React, { useState, useEffect } from "react";
import Heading from "../../Components/Heading";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { selectAccess } from "../../Slices/authSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { get_param_url } from "../../Functions/utils";
import { vendor_wise_pending_detail } from "../../Api/ReportsApis";
import OfficeWisePendingDetailsTable from "../../Components/Reports/OfficeWisePendingDetailsTable";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { get_data } from "../../Store/common/commonSlice";
import { DEFAULT_PAGE_SIZE } from "../../common/constants";

function OfficeWisePendingDetails() {
  const dispatch = useDispatch();
  const { id, name } = useParams();
  const access = useSelector(selectAccess);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsperpage, setRowsPerPage] = useState(DEFAULT_PAGE_SIZE);

  const [state, setState] = useState({
    data: [],
    searchValue: "",
    refresh: true,
    address_district: "",
    fi_type: "",
    productValue: "",
    vendorValue: "",
    is_edit: true,
    districts: [],
    products: [],
    vendors: [],
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
      let url =
        vendor_wise_pending_detail +
        `?id__in=${id}&search=${state.searchValue}&page=${page}`;
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
      //     let url = vendor_wise_pending_detail + `?id__in=${id}&search=${state.searchValue}&page=${page}`
      //     const result = await axios.get(url,
      //         { headers: {"Authorization" : `Bearer ${access}`} })
      //         if(result.status === 200){
      //             setState((prevState)=> {
      //                 return {
      //                     ...prevState,
      //                     data: result.data,
      //                     refresh: false
      //                 }
      //             })
      //             setLoading(false)
      //         }
      // } catch (error) {
      //     console.log(error);
      //     setState((prevState)=> {
      //     return {
      //         ...prevState,
      //         refresh: false
      //     }
      //     })
      // }
    }
    if (state.refresh) {
      fetchMyAPI();
    }
  }, [state.refresh]);

  const handleSearch = (e) => {
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
        <Heading name={`Office Wise Pending Cases (${name})`} />
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
                    />
                  </InputAdornment>
                ),
                inputProps: { maxLength: 100 },
              }}
            />
          </SectionDiv>
        </SearchContainer>
        <OfficeWisePendingDetailsTable
          data={state.data}
          setState={setState}
          setPage={setPage}
          page={page}
          setRowsPerPage={setRowsPerPage}
          rowsperpage={rowsperpage}
          searchParams={{
            search: state.searchValue,
            id__in: id || undefined,
          }}
        />
      </Container>
    );
  }
}
export default OfficeWisePendingDetails;

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
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.05);
  padding: 15px 25px;
  margin: 15px 0px;
`;
const AgentDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 35%;
`;
const DateDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 35%;
  margin-left: 20px;
`;
const ButtonDiv = styled.div`
  width: 30%;
`;

const Label = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #444445;
`;
const SearchContainer = styled.div`
  /* width: 30%; */
  margin: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
