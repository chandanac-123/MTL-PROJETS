import React, { useState, useEffect } from "react";
import Heading from "../../Components/Heading";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import RadioGroups from "../../Components/RadioGroups";
import SelectBoxLabel from "../../Components/SelectBoxLabel";
import AddUserModal from "../../Components/Admin/AddUserModal";
import AddUserTable from "../../Components/Admin/AddUserTable";
import { selectAccess } from "../../Slices/authSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { create_user } from "../../Api/UserApis";
import AlertMessage from "../../Components/Common/AlertMessage";
import { GetPermission } from "../../Functions/utils";
import { useDispatch } from "react-redux";
import { get_data } from "../../Store/common/commonSlice";
import { DEFAULT_PAGE_SIZE } from "../../common/constants";
import { getPageSize } from "../../common/utils";

const getSearchParams = (state) => {
  let user__is_active;
  if (state.filter_value === "active") {
    user__is_active = true;
  } else if (state.filter_value === "inactive") {
    user__is_active = false;
  }
  return {
    user__is_active,
    search: state.searchValue || undefined,
    user__user_type: state.designation || undefined,
  };
};

function AddUser() {
  const dispatch = useDispatch();
  const permission = GetPermission("add_user", "change");
  const access = useSelector(selectAccess);
  const [page, setPage] = useState(1);
  const [rowsperpage, setRowsPerPage] = useState(DEFAULT_PAGE_SIZE);
  const [state, setState] = useState({
    status_filter: "all",
    designation: "",
    data: [],
    refresh: false,
    searchValue: "",
  });
  const [snackbarStatus, setSnackbarStatus] = useState({
    isOpen: false,
    severity: "success",
    message: "",
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

      let url = create_user;
      if (
        state.designation === "FieldAgent" &&
        state.status_filter === "active"
      ) {
        url = !state.searchValue
          ? create_user +
            `?user__user_type=${"FieldAgent"}&user__is_active=${true}&page=${page}&page_size=${pageSize}`
          : create_user +
            `?search=${
              state.searchValue
            }&user__user_type=${"FieldAgent"}&user__is_active=${true}&page=${1}&page_size=${pageSize}`;
      } else if (
        state.designation === "FieldAgent" &&
        state.status_filter === "inactive"
      ) {
        url = !state.searchValue
          ? create_user +
            `?user__user_type=${"FieldAgent"}&user__is_active=${false}&page=${page}&page_size=${pageSize}`
          : create_user +
            `?search=${
              state.searchValue
            }&user__user_type=${"FieldAgent"}&user__is_active=${false}&page=${1}&page_size=${pageSize}`;
      } else if (
        state.designation === "GroupLeader" &&
        state.status_filter === "active"
      ) {
        url = !state.searchValue
          ? create_user +
            `?user__user_type=${"GroupLeader"}&user__is_active=${true}&page=${page}&page_size=${pageSize}`
          : create_user +
            `?search=${
              state.searchValue
            }&user__user_type=${"GroupLeader"}&user__is_active=${true}&page=${1}&page_size=${pageSize}`;
      } else if (
        state.designation === "GroupLeader" &&
        state.status_filter === "inactive"
      ) {
        url = !state.searchValue
          ? create_user +
            `?user__user_type=${"GroupLeader"}&user__is_active=${false}&page=${page}&page_size=${pageSize}`
          : create_user +
            `?search=${
              state.searchValue
            }&user__user_type=${"GroupLeader"}&user__is_active=${false}&page=${1}&page_size=${pageSize}`;
      } else if (
        state.designation === "ProductCoordinator" &&
        state.status_filter === "active"
      ) {
        url = !state.searchValue
          ? create_user +
            `?user__user_type=${"ProductCoordinator"}&user__is_active=${true}&page=${page}&page_size=${pageSize}`
          : create_user +
            `?search=${
              state.searchValue
            }&user__user_type=${"ProductCoordinator"}&user__is_active=${true}&page=${1}&page_size=${pageSize}`;
      } else if (
        state.designation === "ProductCoordinator" &&
        state.status_filter === "inactive"
      ) {
        url = !state.searchValue
          ? create_user +
            `?user__user_type=${"ProductCoordinator"}&user__is_active=${false}&page=${page}&page_size=${pageSize}`
          : create_user +
            `?search=${
              state.searchValue
            }&user__user_type=${"ProductCoordinator"}&user__is_active=${false}&page=${1}&page_size=${pageSize}`;
      } else if (
        state.designation === "TeamMember" &&
        state.status_filter === "active"
      ) {
        url = !state.searchValue
          ? create_user +
            `?user__user_type=${"TeamMember"}&user__is_active=${true}&page=${page}&page_size=${pageSize}`
          : create_user +
            `?search=${
              state.searchValue
            }&user__user_type=${"TeamMember"}&user__is_active=${true}&page=${1}&page_size=${pageSize}`;
      } else if (
        state.designation === "TeamMember" &&
        state.status_filter === "inactive"
      ) {
        url = !state.searchValue
          ? create_user +
            `?user__user_type=${"TeamMember"}&user__is_active=${false}&page=${page}&page_size=${pageSize}`
          : create_user +
            `?search=${
              state.searchValue
            }&user__user_type=${"TeamMember"}&user__is_active=${false}&page=${1}&page_size=${pageSize}`;
      } else if (
        state.designation === "DistrictCoordinator" &&
        state.status_filter === "active"
      ) {
        url = !state.searchValue
          ? create_user +
            `?user__user_type=${"DistrictCoordinator"}&user__is_active=${true}&page=${page}&page_size=${pageSize}`
          : create_user +
            `?search=${
              state.searchValue
            }&user__user_type=${"DistrictCoordinator"}&user__is_active=${true}&page=${1}&page_size=${pageSize}`;
      } else if (
        state.designation === "DistrictCoordinator" &&
        state.status_filter === "inactive"
      ) {
        url = !state.searchValue
          ? create_user +
            `?user__user_type=${"DistrictCoordinator"}&user__is_active=${false}&page=${page}&page_size=${pageSize}`
          : create_user +
            `?search=${
              state.searchValue
            }&user__user_type=${"DistrictCoordinator"}&user__is_active=${false}&page=${1}&page_size=${pageSize}`;
      } else if (
        state.designation === "ExecutiveOfficeAdmin" &&
        state.status_filter === "active"
      ) {
        url = !state.searchValue
          ? create_user +
            `?&user__user_type=${"ExecutiveOfficeAdmin"}&user__is_active=${true}&page=${page}&page_size=${pageSize}`
          : create_user +
            `?search=${
              state.searchValue
            }&user__user_type=${"ExecutiveOfficeAdmin"}&user__is_active=${true}&page=${1}&page_size=${pageSize}`;
      } else if (
        state.designation === "ExecutiveOfficeAdmin" &&
        state.status_filter === "inactive"
      ) {
        url = !state.searchValue
          ? create_user +
            `?user__user_type=${"ExecutiveOfficeAdmin"}&user__is_active=${false}&page=${page}&page_size=${pageSize}`
          : `?search=${
              state.searchValue
            }&user__user_type=${"ExecutiveOfficeAdmin"}&user__is_active=${false}&page=${1}&page_size=${pageSize}`;
      } else if (state.designation === "FieldAgent") {
        url = !state.searchValue
          ? create_user +
            `?user__user_type=${"FieldAgent"}&page=${page}&page_size=${pageSize}`
          : create_user +
            `?search=${
              state.searchValue
            }&user__user_type=${"FieldAgent"}&page=${1}&page_size=${pageSize}`;
      } else if (state.designation === "GroupLeader") {
        url = !state.searchValue
          ? create_user +
            `?user__user_type=${"GroupLeader"}&page=${page}&page_size=${pageSize}`
          : create_user +
            `?search=${
              state.searchValue
            }&user__user_type=${"GroupLeader"}&page=${1}&page_size=${pageSize}`;
      } else if (state.designation === "ProductCoordinator") {
        url = !state.searchValue
          ? create_user +
            `?user__user_type=${"ProductCoordinator"}&page=${page}&page_size=${pageSize}`
          : create_user +
            `?search=${
              state.searchValue
            }&user__user_type=${"ProductCoordinator"}&page=${1}&page_size=${pageSize}`;
      } else if (state.designation === "TeamMember") {
        url = !state.searchValue
          ? create_user +
            `?user__user_type=${"TeamMember"}&page=${page}&page_size=${pageSize}`
          : create_user +
            `?search=${
              state.searchValue
            }&user__user_type=${"TeamMember"}&page=${1}&page_size=${pageSize}`;
      } else if (state.designation === "DistrictCoordinator") {
        url = !state.searchValue
          ? create_user +
            `?user__user_type=${"DistrictCoordinator"}&page=${page}&page_size=${pageSize}`
          : create_user +
            `?search=${
              state.searchValue
            }&user__user_type=${"DistrictCoordinator"}&page=${1}&page_size=${pageSize}`;
      } else if (state.designation === "ExecutiveOfficeAdmin") {
        url = !state.searchValue
          ? create_user +
            `?user__user_type=${"ExecutiveOfficeAdmin"}&page=${page}&page_size=${pageSize}`
          : create_user +
            `?search=${
              state.searchValue
            }&user__user_type=${"ExecutiveOfficeAdmin"}&page=${1}&page_size=${pageSize}`;
      } else if (state.status_filter === "active") {
        url = !state.searchValue
          ? create_user +
            `?user__is_active=${true}&page=${page}&page_size=${pageSize}`
          : create_user +
            `?search=${
              state.searchValue
            }&user__is_active=${true}&page=${1}&page_size=${pageSize}`;
      } else if (state.status_filter === "inactive") {
        url = !state.searchValue
          ? create_user +
            `?user__is_active=${false}&page=${page}&page_size=${pageSize}`
          : create_user +
            `?search=${
              state.searchValue
            }&user__is_active=${false}&page=${1}&page_size=${pageSize}`;
      } else {
        url = !state.searchValue
          ? create_user + `?page=${page}&page_size=${pageSize}`
          : create_user +
            `?search=${state.searchValue}&page=${1}&page_size=${pageSize}`;
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
      //   let url = create_user
      //   if (state.designation === 'FieldAgent' && state.status_filter === 'active') {
      //     url = !state.searchValue ? create_user + `?user__user_type=${"FieldAgent"}&user__is_active=${true}&page=${page}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}`:create_user + `?search=${state.searchValue}&user__user_type=${"FieldAgent"}&user__is_active=${true}&page=${1}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}`
      //   } else if (state.designation === 'FieldAgent' && state.status_filter === 'inactive') {
      //     url = !state.searchValue ? create_user + `?user__user_type=${"FieldAgent"}&user__is_active=${false}&page=${page}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}`:create_user + `?search=${state.searchValue}&user__user_type=${"FieldAgent"}&user__is_active=${false}&page=${1}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}`
      //   } else if (state.designation === 'GroupLeader' && state.status_filter === 'active') {
      //     url = !state.searchValue ? create_user + `?user__user_type=${"GroupLeader"}&user__is_active=${true}&page=${page}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}`:create_user + `?search=${state.searchValue}&user__user_type=${"GroupLeader"}&user__is_active=${true}&page=${1}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}`
      //   } else if (state.designation === 'GroupLeader' && state.status_filter === 'inactive') {
      //     url = !state.searchValue ? create_user + `?user__user_type=${"GroupLeader"}&user__is_active=${false}&page=${page}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}`:create_user + `?search=${state.searchValue}&user__user_type=${"GroupLeader"}&user__is_active=${false}&page=${1}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}`
      //   } else if (state.designation === 'ProductCoordinator' && state.status_filter === 'active') {
      //     url = !state.searchValue ? create_user + `?user__user_type=${"ProductCoordinator"}&user__is_active=${true}&page=${page}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}`:create_user + `?search=${state.searchValue}&user__user_type=${"ProductCoordinator"}&user__is_active=${true}&page=${1}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}`
      //   } else if (state.designation === 'ProductCoordinator' && state.status_filter === 'inactive') {
      //     url = !state.searchValue ? create_user + `?user__user_type=${"ProductCoordinator"}&user__is_active=${false}&page=${page}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}`:create_user + `?search=${state.searchValue}&user__user_type=${"ProductCoordinator"}&user__is_active=${false}&page=${1}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}`
      //   } else if (state.designation === 'TeamMember' && state.status_filter === 'active') {
      //     url = !state.searchValue ? create_user + `?user__user_type=${"TeamMember"}&user__is_active=${true}&page=${page}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}`:create_user + `?search=${state.searchValue}&user__user_type=${"TeamMember"}&user__is_active=${true}&page=${1}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}`
      //   } else if (state.designation === 'TeamMember' && state.status_filter === 'inactive') {
      //     url = !state.searchValue ? create_user + `?user__user_type=${"TeamMember"}&user__is_active=${false}&page=${page}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}`:create_user + `?search=${state.searchValue}&user__user_type=${"TeamMember"}&user__is_active=${false}&page=${1}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}`
      //   } else if (state.designation === 'DistrictCoordinator' && state.status_filter === 'active') {
      //     url = !state.searchValue ? create_user + `?user__user_type=${"DistrictCoordinator"}&user__is_active=${true}&page=${page}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}`:create_user + `?search=${state.searchValue}&user__user_type=${"DistrictCoordinator"}&user__is_active=${true}&page=${1}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}`
      //   } else if (state.designation === 'DistrictCoordinator' && state.status_filter === 'inactive') {
      //     url = !state.searchValue ? create_user + `?user__user_type=${"DistrictCoordinator"}&user__is_active=${false}&page=${page}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}`:create_user + `?search=${state.searchValue}&user__user_type=${"DistrictCoordinator"}&user__is_active=${false}&page=${1}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}`
      //   } else if (state.designation === 'ExecutiveOfficeAdmin' && state.status_filter === 'active') {
      //     url = !state.searchValue ? create_user + `?&user__user_type=${"ExecutiveOfficeAdmin"}&user__is_active=${true}&page=${page}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}`:create_user + `?search=${state.searchValue}&user__user_type=${"ExecutiveOfficeAdmin"}&user__is_active=${true}&page=${1}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}`
      //   } else if (state.designation === 'ExecutiveOfficeAdmin' && state.status_filter === 'inactive') {
      //     url = !state.searchValue ? create_user + `?user__user_type=${"ExecutiveOfficeAdmin"}&user__is_active=${false}&page=${page}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}`:`?search=${state.searchValue}&user__user_type=${"ExecutiveOfficeAdmin"}&user__is_active=${false}&page=${1}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}`
      //   } else if (state.designation === 'FieldAgent') {
      //     url = !state.searchValue ? create_user + `?user__user_type=${"FieldAgent"}&page=${page}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}`:create_user + `?search=${state.searchValue}&user__user_type=${"FieldAgent"}&page=${1}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}`
      //   } else if (state.designation === 'GroupLeader') {
      //     url = !state.searchValue ? create_user + `?user__user_type=${"GroupLeader"}&page=${page}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}`:create_user + `?search=${state.searchValue}&user__user_type=${"GroupLeader"}&page=${1}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}`
      //   } else if (state.designation === 'ProductCoordinator') {
      //     url = !state.searchValue ? create_user + `?user__user_type=${"ProductCoordinator"}&page=${page}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}`:create_user + `?search=${state.searchValue}&user__user_type=${"ProductCoordinator"}&page=${1}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}`
      //   } else if (state.designation === 'TeamMember') {
      //     url = !state.searchValue ? create_user + `?user__user_type=${"TeamMember"}&page=${page}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}`:create_user + `?search=${state.searchValue}&user__user_type=${"TeamMember"}&page=${1}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}`
      //   } else if (state.designation === 'DistrictCoordinator') {
      //     url = !state.searchValue ? create_user + `?user__user_type=${"DistrictCoordinator"}&page=${page}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}`:create_user + `?search=${state.searchValue}&user__user_type=${"DistrictCoordinator"}&page=${1}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}`
      //   } else if (state.designation === 'ExecutiveOfficeAdmin') {
      //     url = !state.searchValue ? create_user + `?user__user_type=${"ExecutiveOfficeAdmin"}&page=${page}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}`:create_user + `?search=${state.searchValue}&user__user_type=${"ExecutiveOfficeAdmin"}&page=${1}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}`
      //   } else if (state.status_filter === 'active') {
      //     url = !state.searchValue ? create_user + `?user__is_active=${true}&page=${page}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}`:create_user + `?search=${state.searchValue}&user__is_active=${true}&page=${1}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}`
      //   } else if (state.status_filter === 'inactive') {
      //     url = !state.searchValue ? create_user + `?user__is_active=${false}&page=${page}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}`:create_user + `?search=${state.searchValue}&user__is_active=${false}&page=${1}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}`
      //   } else {
      //     url = !state.searchValue ? create_user + `?page=${page}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}`:create_user + `?search=${state.searchValue}&page=${1}&page_size=${rowsperpage == 10 ? rowsperpage : rowsperpage < 21 ? 20 : 30}`
      //   }
      //   const result = await axios.get(url,
      //     { headers: { "Authorization": `Bearer ${access}` } })
      //   if (result.status === 200) {
      //     setState((prevState) => {
      //       return {
      //         ...prevState,
      //         data: result.data,
      //         refresh: false
      //       }
      //     })
      //   }
      // } catch (error) {
      //   setState((prevState) => {
      //     return {
      //       ...prevState,
      //       refresh: false
      //     }
      //   })
      // }
    }
    if (state.refresh) {
      fetchMyAPI();
    }
  }, [state.refresh]);

  const handleSelectChange = (value, name) => {
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const handleFilter = (value, name) => {
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
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

  const designations = [
    {
      name: "All",
      id: "",
    },
    {
      name: "Field Agent",
      id: "FieldAgent",
    },
    {
      name: "Group Leader",
      id: "GroupLeader",
    },
    {
      name: "Product Coordinator",
      id: "ProductCoordinator",
    },
    {
      name: "Team Member",
      id: "TeamMember",
    },
    {
      name: "District Coordinator",
      id: "DistrictCoordinator",
    },
    {
      name: "Executive Office Admin",
      id: "ExecutiveOfficeAdmin",
    },
  ];

  let datas = [
    {
      name: "all",
      label: "All",
    },
    {
      name: "active",
      label: "Active",
    },
    {
      name: "inactive",
      label: "Inactive",
    },
  ];

  return (
    <Container>
      <AlertMessage
        setSnackbarStatus={setSnackbarStatus}
        snackbarStatus={snackbarStatus}
      />
      <Heading name="Add User" />
      <FilterContainer>
        <RadioGroups
          datas={datas}
          handleChange={handleFilter}
          value={state.status_filter}
          name="status_filter"
        />
        <AgentDiv>
          <Label>Designation</Label>
          <SelectBoxLabel
            datas={designations}
            handleChange={handleSelectChange}
            name="designation"
            value={state.designation}
            selectType="EmployeeName"
            default="Select Designation"
            fpadding="9.5px 14px"
            fsize="12px"
            min_width="250px"
          />
        </AgentDiv>
        <TableButton
          type="button"
          bcolor="#132756"
          fcolor="#fff"
          value="Search"
          onClick={handleFilter}
        />
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
                <img
                  src={require("../../Assets/images/searchfilter.png")}
                  alt=""
                />
              </InputAdornment>
            ),
            inputProps: { maxLength: 100 },
          }}
        />
        {permission && (
          <AddUserModal
            setState={setState}
            snackbarStatus={snackbarStatus}
            setSnackbarStatus={setSnackbarStatus}
          />
        )}
      </SearchContainer>
      <AddUserTable
        data={state.data}
        setState={setState}
        snackbarStatus={snackbarStatus}
        setSnackbarStatus={setSnackbarStatus}
        setPage={setPage}
        page={page}
        setRowsPerPage={setRowsPerPage}
        rowsperpage={rowsperpage}
        searchParams={getSearchParams(state)}
      />
    </Container>
  );
}

export default AddUser;

const TableButton = styled.input`
  background-color: ${({ bcolor }) => (bcolor ? bcolor : "unset")};
  border: none;
  color: ${({ fcolor }) => (fcolor ? fcolor : "unset")};
  border-radius: 4px;
  font-size: 16px;
  padding: 8px 25px;
  cursor: pointer;
  font-weight: 500;
  line-height: 1.5;
  margin-left: 18px;
`;

const TextInput = styled(TextField)`
  width: 30% !important;
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
  justify-content: flex-start;
  align-items: center;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.05);
  padding: 15px 25px;
  margin: 15px 0px;
  width: 94%;
`;
const AgentDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 33%;
  margin-left: 30px;
`;

const Label = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #444445;
`;
const SearchContainer = styled.div`
  width: 94%;
  margin: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
