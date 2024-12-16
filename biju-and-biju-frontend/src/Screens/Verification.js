import React, { useState, useEffect, useRef } from "react";
import Heading from "../Components/Heading";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import VerificationTable from "../Components/VerificationTable";
import IconDownloadButtons from "../Components/IconDownloadButton";
import FilterBox from "../Components/FilterBox";
import VerificationUploadModal from "../Components/VerificationUploadModal";
import VerificationAddModal from "../Components/Verification/VerificationAddModal";
import { exportToExcel } from "../Functions/utils";
import {
  v2_verification_url,
  v2_product_dropdown,
  v2_vendor_dropdown,
  district_dropdown,
  delete_verification,
} from "../Api/VerificationApis";
import { selectAccess } from "../Slices/authSlice";
import { useSelector } from "react-redux";
import AlertMessage from "../Components/Common/AlertMessage";
import { GetPermission } from "../Functions/utils";
import { LinearProgress } from "@mui/material";
import Button from "@mui/material/Button";
import { styled as styled1 } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import {
  getDataWithParams,
  get_data,
  post_data,
} from "../Store/common/commonSlice";
import { useMediaQuery } from "react-responsive";
import VerificationHeader from "../Components/Verification/VerificationHeader";
import DeleteConfirm from "../Components/Common/DeleteConfirm";
import { DEFAULT_PAGE_SIZE } from "../common/constants";
import { getPageSize } from "../common/utils";
import { RefreshButton } from "../Components/RefreshButton";
import {
  selectFilter,
  setVerificationFilter,
} from "../Slices/verificationSlice";
import SearchInput from "../Components/Common/SearchInput";

const getSearchParams = (state, page, page_size, fieldToSort) => {
  return {
    search: state.searchValue || undefined,
    adress_district__id: state.address_district,
    fi_type: state.fi_type,
    verification__vendor__employee_name: state.vendorValue
      ? state.vendors.filter((item) => item.id === state.vendorValue)[0]
        ?.employee_name
      : "",
    verification__product__product_name: state.productValue
      ? state.products.filter((item) => item.id == state.productValue)[0]
        ?.product_name
      : "",
    page,
    page_size,
    ordering: fieldToSort,
  };
};

function Verification() {
  const dispatch = useDispatch();
  const isMobileScreen = useMediaQuery({ query: "(max-width: 480px)" });
  const permission = GetPermission("verification", "change");
  const user_type = useSelector((state) => state.auth.user_type);
  const [isfilter, setFilter] = React.useState(false);
  const [dropdownState, setDropdownState] = useState(false);
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

  const filter = useSelector(selectFilter);

  const [state, setState] = useState(filter);

  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      dispatch(setVerificationFilter(state));
    }
  }, [state]);

  isMounted.current = true;

  const [snackbarStatus, setSnackbarStatus] = useState({
    isOpen: false,
    severity: "success",
    message: "",
  });
  const [checkedIDs, setCheckedIDs] = useState([]);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setState((prevState) => {
      return {
        ...prevState,
        refresh: true,
      };
    });
  }, [page, rowsperpage, state.searchValue]);

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
      const url = v2_verification_url;

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
            setDropdownState(true)
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
    }
    if (state.refresh) {
      setLoading(true);
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
    const url = v2_verification_url;

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

  let hdfc_format = [
    {
      "Application Id": "",
      "Customer Name": "",
      "FI To Be Conducted": "",
      "Product Name": "",
      "Residence Address": "",
      "Office Address": "",
      "Permanent Address": "",
      "FI Date": "",
      "FI Time": "",
      FIFlag: "",
      "Date Of Birth": "",
      Designation: "",
      "Loan amount": "",
      "FI Initiation Comments": "",
      "Asset make": "",
      "Asset model": "",
      Zip_RA: "",
      Zip_OA: "",
      Zip_PA: "",
      Branch: "",
      "PD Address": "",
    },
  ];

  let hdfccc_format = [
    {
      "Case Id": "",
      "REF No": "",
      Name: "",
      "CPV Type": "",
      PRODUCT: "",
      Status: "",
      Priority: "",
      "Assigned To": "",
      "Initiation Date": "",
      "Agency ID": "",
      "TAT Start Date": "",
      "TAT End Date": "",
      "Filter Status": "",
      "Multi Attempts": "",
      "Door Lock": "",
      "TAT MET": "",
      "Initiation Date Filter": "",
      Address: "",
      "Fresh / Redo / Restart": "",
      "Mobile No.": "",
      "CPV Status": "",
    },
  ];

  let common_format = [
    {
      "APPLICATION ID": "",
      "CUSTOMER NAME": "",
      "FI TYPE": "",
      "PRODUCT NAME": "",
      "RESIDENCE ADD": "",
      "OFF ADD": "",
      "PER ADD": "",
      "FI DATE": "",
      "FI TIME": "",
      FIFlag: "",
      "Date Of Birth": "",
      "VENDOR NAME": "",
      "Loan amount": "",
      "FI Initiation Comments": "",
      "Asset make": "",
      "Asset model": "",
      Zip_RA: "",
      Zip_OA: "",
      Zip_PA: "",
      Branch: "",
      "PD Address": "",
    },
  ];

  const handleDownload = (name) => {
    if (name == "hdfc_format") {
      exportToExcel(hdfc_format, name);
    } else if (name == "common_format") {
      exportToExcel(common_format, name);
    } else {
      exportToExcel(hdfccc_format, name);
    }
  };

  const handleConfirm = async (_) => {
    let param = {
      values: { ver_ids: checkedIDs },
      url: delete_verification,
    };
    dispatch(post_data(param))
      .then((res) => {
        const result = res?.payload;
        if (result?.status === 200) {
          setOpen(false);
          setCheckedIDs([]);
          setPage(
            page > 1 && checkedIDs?.length == state.data?.results?.length
              ? page - 1
              : page
          );
        }
      })
      .catch((err) => {
        console.error(err);
      });
    setState((prevState) => {
      return {
        ...prevState,
        refresh: true,
      };
    });

  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      <AlertMessage
        setSnackbarStatus={setSnackbarStatus}
        snackbarStatus={snackbarStatus}
      />
      <Heading name="Verification" />
      {loading && <LinearProgress />}
      {isMobileScreen ? (
        <VerificationHeader
          handleSearch={handleSearch}
          handleDownload={handleDownload}
          fi_types={fi_types}
          isfilter={isfilter}
          setFilter={setFilter}
          state={state}
          setState={setState}
          handleFilter={handleFilter}
          handleSelectChange={handleSelectChange}
          handleReset={handleReset}
          setSnackbarStatus={setSnackbarStatus}
          snackbarStatus={snackbarStatus}
          permission={permission}
          handleRefresh={handleRefresh}
        />
      ) : (
        <>
          <FilterContainer>
            <LeftDiv>
              <Title>Download file format</Title>
            </LeftDiv>
            {permission && user_type == "Vendor" ? (
              <IconDownloadButtons
                title="Common Format"
                name="common_format"
                handleClick={handleDownload}
                color="#0984E3"
              />
            ) : (
              <RightDiv>
                <IconDownloadButtons
                  title="HDFC Format"
                  name="hdfc_format"
                  handleClick={handleDownload}
                  color="#74B9FF"
                />
                <IconDownloadButtons
                  title="Common Format"
                  name="common_format"
                  handleClick={handleDownload}
                  color="#0984E3"
                />
                <IconDownloadButtons
                  title="HDFCCC Format"
                  name="hdfccc_format"
                  handleClick={handleDownload}
                  color="#2F477D"
                />
              </RightDiv>
            )}
          </FilterContainer>
          <SearchContainer>
            <SearchInput
              handleSearch={handleSearch}
              value={state.searchValue}
            />
            <SectionDiv>
              {checkedIDs.length > 0 && (
                <DeleteConfirm
                  handleClickOpen={handleClickOpen}
                  open={open}
                  handleClose={handleClose}
                  handleConfirm={handleConfirm}
                />
              )}
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
              {permission && (
                <VerificationUploadModal
                  setState={setState}
                  setSnackbarStatus={setSnackbarStatus}
                  snackbarStatus={snackbarStatus}
                />
              )}
              {permission && (
                <VerificationAddModal
                  setState={setState}
                  snackbarStatus={snackbarStatus}
                  setSnackbarStatus={setSnackbarStatus}
                />
              )}
            </SectionDiv>
          </SearchContainer>
        </>
      )}

      <VerificationTable
        setCheckedIDs={setCheckedIDs}
        handleClickOpen={handleClickOpen}
        open={open}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
        checkedIDs={checkedIDs}
        data={state.data}
        setState={setState}
        setPage={setPage}
        page={page}
        setRowsPerPage={setRowsPerPage}
        rowsperpage={rowsperpage}
        snackbarStatus={snackbarStatus}
        setSnackbarStatus={setSnackbarStatus}
        state={state}
        setSortOptions={setSortOptions}
      />
    </Container>
  );
}

export default Verification;

const FilterBoxItem = styled(FilterBox)`
  position: absolute;
`;

const LeftDiv = styled.div``;

const RightDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 62%;
`;

const Title = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #444445;
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
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.05);
  padding: 15px 25px;
  margin: 15px 0px;
  width: 94%;
`;

const SearchContainer = styled.div`
  margin: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 94%;
`;

export const ConfirmButton = styled1(Button)({
  fontSize: "12px",
  padding: "6px 30px",
  borderRadius: "4px",
  fontweight: 700,
  marginRight: "25px",
  color: "#132756",
  textTransform: "none",
  borderColor: "#132756",
  border: "1px solid",
  backgroundColor: "unset",
  boxShadow: "unset",
  "&:hover": {
    backgroundColor: "unset",
  },
});

export const ConfirmMsg = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #444445;
  align-items: center;
  margin-top: 40px;
`;
export const ButtonSection = styled.div`
  width: 100%;
  margin-bottom: 25px;
  margin-top: 25px;
  display: flex;
  justify-content: center;
`;
export const LastSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 67%;
  gap: 50px;
`;
