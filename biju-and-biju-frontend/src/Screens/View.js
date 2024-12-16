import React, { useState, useEffect } from "react";
import Heading from "../Components/Heading";
import styled from "styled-components";
import ViewTable from "../Components/Verification/ViewTable";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import { selectAccess } from "../Slices/authSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { view_api } from "../Api/ViewApis";
import { convert_date_format } from "../Functions/utils";
import ButtonItem from "../Components/ButtonItem";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import AlertMessage from "../Components/Common/AlertMessage";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { DEFAULT_PAGE_SIZE } from "../common/constants";

function View() {
  const access = useSelector(selectAccess);
  const [state, setState] = useState({
    data: [],
    refresh: true,
    searchValue: "",
    startDate: convert_date_format(new Date()),
    endDate: convert_date_format(new Date()),
  });
  const [dateReset, setDateReset] = useState();
  const [value, onChange] = useState([state.startDate, state.endDate]);
  const [page, setPage] = useState(state.data.total_pages || 1);
  const [rowsperpage, setRowsPerPage] = useState(DEFAULT_PAGE_SIZE);
  const [loading, setLoading] = useState(true);
  const [snackbarStatus, setSnackbarStatus] = useState({
    isOpen: false,
    severity: "success",
    message: "",
  });

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        let url = view_api;
        url = view_api + `?search=${state.searchValue}` + `&page=${page}`;
        const result = await axios.get(url, {
          headers: { Authorization: `Bearer ${access}` },
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
        console.log(error);
        setState((prevState) => {
          return {
            ...prevState,
            refresh: false,
          };
        });
      }
    }
    if (state.refresh || page) {
      fetchMyAPI();
    }
  }, [state.refresh || page]);

  useEffect(() => {
    setState((prevState) => {
      return {
        ...prevState,
        startDate: convert_date_format(value[0]),
        endDate: convert_date_format(value[1]),
        refresh: true,
      };
    });
  }, [value]);

  const handledateSearch = async () => {
    setDateReset(true);
    try {
      let url = view_api;
      url =
        view_api +
        `?verification_address__fi_date_time__date__gte=${state.startDate}&verification_address__fi_date_time__date__lte=${state.endDate}&search=${state.searchValue}`;
      const result = await axios.get(url, {
        headers: { Authorization: `Bearer ${access}` },
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

  const handledateReset = () => {
    setDateReset(false);
    setState((prevState) => {
      return {
        ...prevState,
        startDate: "",
        endDate: "",
        refresh: true,
      };
    });
  };

  const handleSearch = (e) => {
    setState((prevState) => {
      return {
        ...prevState,
        searchValue: e.target.value,

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
        <AlertMessage
          setSnackbarStatus={setSnackbarStatus}
          snackbarStatus={snackbarStatus}
        />
        <Heading name="Views" />
        <FilterContainer>
          <HeadDiv className="secondary">
            <DateDiv>
              <Label className="date-label">Date</Label>
              <DateRangePicker
                onChange={onChange}
                value={value}
                clearIcon={null}
              />
              {!dateReset ? (
                <ButtonItem
                  name="Search"
                  type="contained"
                  fmargin="25px"
                  fweight="400"
                  fsize="15px"
                  color="white"
                  bgColor="#132756"
                  fpadding="1px 20px"
                  handleClick={handledateSearch}
                />
              ) : (
                <ButtonItem
                  name="Reset"
                  type="contained"
                  fmargin="25px"
                  fweight="400"
                  fsize="15px"
                  color="white"
                  bgColor="#132756"
                  fpadding="1px 25px"
                  handleClick={handledateReset}
                />
              )}
            </DateDiv>
          </HeadDiv>
        </FilterContainer>
        <SearchContainer>
          <TextInput
            inputProps={{ maxLength: 10 }}
            id="outlined-start-adornment"
            sx={{ m: 0, width: "100%" }}
            placeholder="Search"
            onChange={(e) => handleSearch(e)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <img
                    src={require("../Assets/images/searchfilter.png")}
                    alt=""
                  />
                </InputAdornment>
              ),
              inputProps: { maxLength: 100 },
            }}
          />
        </SearchContainer>
        <ViewTable
          data={state.data}
          setPage={setPage}
          page={page}
          setRowsPerPage={setRowsPerPage}
          rowsperpage={rowsperpage}
        />
      </Container>
    );
  }
}

export default View;

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

const Container = styled.div`
  padding: 15px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.05);
  padding: 15px 25px;
  margin: 15px 0px;
`;

const DateDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 35%;
  /* margin-left: 20px; */
`;

const Label = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #444445;
  margin-right: 12px;
`;
const SearchContainer = styled.div`
  width: 30%;
  margin: 28px;
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
