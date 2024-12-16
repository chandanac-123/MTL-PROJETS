import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import styled from "styled-components";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function TablePaginationDemo({
  showItemsPage = true,
  ...props
}) {
  const handleChange = (event, value) => {
    props.setPage(value);
  };

  const handleRowsPerPageChange = (event) => {
    const value = parseInt(event.target.value, 10);
    props.setRowsPerPage(value);
    props.setPage(1); // Reset the current page to 1 when the rows per page is changed
  };

  return (
    <Container className={props?.class}>
      <Stack spacing={2}>
        <StyledPagination
          count={props.count}
          page={props.page ? props.page : 1}
          rowsperpage={props.rowsperpage}
          onChange={handleChange}
          variant="outlined"
          shape="rounded"
        />
      </Stack>
      {showItemsPage && (
        <Box sx={{ minWidth: 160 }}>
          <FormControl fullWidth>
            <SelectInput
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={props.rowsperpage}
              onChange={handleRowsPerPageChange}
            >
              <MenuItem value={30}>30/Page</MenuItem>
              <MenuItem value={60}>60/Page</MenuItem>
              <MenuItem value={100}>100/Page</MenuItem>
            </SelectInput>
          </FormControl>
        </Box>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  /* width: 100%; */
  margin-right: 35px;
  &.full-width {
    div {
      width: 100%;
    }
  }
  div {
    margin-right: 15px;
  }
`;

const StyledPagination = styled(Pagination)`
  ul {
    display: flex;
    justify-content: center;
  }
  li button {
    color: #132756 !important;
    border-color: #132756 !important;
  }
  li button {
    &.MuiButtonBase-root.MuiPaginationItem-root.MuiPaginationItem-sizeMedium.MuiPaginationItem-outlined.MuiPaginationItem-rounded.Mui-selected.MuiPaginationItem-page {
      background-color: #132756 !important;
      color: #fff !important;
    }
  }
`;

export const SelectInput = styled(Select)`
  div[role="button"] {
    padding: 3.5px 14px;
    font-size: 11px;
    color: #132756;
    font-weight: 600;
  }
  fieldset {
    border-color: #132756 !important;
    border-width: 0.5px !important;
  }
`;
