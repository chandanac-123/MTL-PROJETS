import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import styled from "styled-components";

function DownloadFileVerification({ handleDownload }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <DownloadButton onClick={() => setOpen(true)}>
        <span>Download file format</span>
        <span>
          <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.92826 4.81446L10.0531 0.689697L11.2316 1.86821L5.92826 7.17155L0.625 1.86821L1.80351 0.689697L5.92826 4.81446Z"
              fill="white"
            />
          </svg>
        </span>
      </DownloadButton>
      <MainMenu
        id="account-menu"
        open={open}
        onClose={() => setOpen(false)}
        onClick={() => setOpen(false)}
        anchorOrigin={{
          vertical: "left",
          horizontal: "left",
        }}
        sx={{ bgcolor: "rgba(0,0,0,0.5)" }}
      >
        <MenuItem onClick={() => handleDownload("hdfc_format")}>
          HDFC Format
        </MenuItem>
        <MenuItem onClick={() => handleDownload("common_format")}>
          Common Format
        </MenuItem>
        <MenuItem onClick={() => handleDownload("hdfccc_format")}>
          HDFCCC Format
        </MenuItem>
      </MainMenu>
    </div>
  );
}

export default DownloadFileVerification;

const DownloadButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: #001b54;
  border: 1px solid #001b54;
  border-radius: 6px;
  color: #ffff;
  padding: 10px;
`;

const MainMenu = styled(Popover)`
  &
    .MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation8.MuiPopover-paper {
    width: 90% !important;
    top: 150px !important;
  }
  li {
    color: #001b54 !important;
    font-weight: 600;
    justify-content: center;
  }
`;
