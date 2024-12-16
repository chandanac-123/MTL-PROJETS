import styled from "styled-components";
import React from "react";
import SearchInput from "../Common/SearchInput";
import FilterBox from "../FilterBox";
import VerificationUploadModal from "../VerificationUploadModal";
import VerificationAddModal from "./VerificationAddModal";
import DownloadFileVerification from "./DownloadFileVerification";
import { RefreshButton } from "../RefreshButton";

function AssignedVerificationHeader({
  handleSearch,
  fi_types,
  isfilter,
  setFilter,
  state,
  setState,
  handleFilter,
  handleSelectChange,
  handleReset,
  handleRefresh,
}) {
  return (
    <Container>
      <SearchInput handleSearch={handleSearch} value={state.searchValue} />
      <ButtonContainer>
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
          class="full-width"
        />
      </ButtonContainer>
    </Container>
  );
}

export default AssignedVerificationHeader;

const Container = styled.div`
  margin-bottom: 10px;
  margin-top: 20px;
`;

const FilterBoxItem = styled(FilterBox)`
  position: absolute;
  div {
    width: 100% !important;
  }
  & .MuiButtonBase-root.MuiButton-root.MuiButton-contained {
    width: 100% !important;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  width: 100%;
`;
