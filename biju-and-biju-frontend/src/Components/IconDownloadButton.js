import * as React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import { styled as styled1 } from "@mui/material/styles";

export default function IconDownloadButtons(props) {
  return (
    <Stack direction="row" spacing={2}>
      <BootstrapButton
        onClick={() =>
          props.handleClick ? props.handleClick(props.name) : null
        }
        variant="contained"
        disableRipple
        endIcon={
          <AvatarItem src={require("../Assets/images/Vectordownload.png")} />
        }
        style={{ backgroundColor: props.color }}
      >
        {props.title}
      </BootstrapButton>
    </Stack>
  );
}

const AvatarItem = styled(Avatar)`
  padding: 0px !important;
  width: 16px !important;
  height: 18px !important;
  margin-left: 45px;
`;

const BootstrapButton = styled1(Button)({
  fontSize: "14px",
  padding: "7px 20px",
  borderRadius: "4px",
  fontweight: "800",
  marginLeft: "25",
  color: "#fff",
  textTransform: "none",
  borderColor: "#132756",
});
