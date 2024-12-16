import styled from "styled-components";
import React from "react";
import SearchInput from "../Common/SearchInput";
import FilterBox from "../FilterBox";
import VerificationUploadModal from "../VerificationUploadModal";
import VerificationAddModal from "./VerificationAddModal";
import DownloadFileVerification from "./DownloadFileVerification";
import { RefreshButton } from "../RefreshButton";

function VerificationHeader({
  handleSearch,
  handleDownload,
  fi_types,
  isfilter,
  setFilter,
  state,
  setState,
  handleFilter,
  handleSelectChange,
  handleReset,
  setSnackbarStatus,
  snackbarStatus,
  permission,
  handleRefresh,
}) {
  return (
    <Container>
      <FileContainer>
        <DownloadFileVerification handleDownload={handleDownload} />
      </FileContainer>
      <SearchInput handleSearch={handleSearch} value={state.searchValue} />
      <ButtonContainer>
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
      </ButtonContainer>
      <div
        style={{
          marginTop: 20,
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: -35,
        }}
      >
        <RefreshButton onClick={handleRefresh} />
      </div>
    </Container>
  );
}

export default VerificationHeader;

const Container = styled.div`
  margin-bottom: 10px;
  margin-top: 20px;
`;

const FileContainer = styled.div`
  box-shadow: 0px 2px 10px 0px #00000033;
  border-radius: 4px;
  color: #ffffff;
  background-color: #ffffff;
  padding: 5px;
  margin-bottom: 10px;
`;
const FilterBoxItem = styled(FilterBox)`
  position: absolute;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;
