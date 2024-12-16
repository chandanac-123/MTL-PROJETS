import * as React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import { styled as styled1 } from "@mui/material/styles";

export default function IconLabelButtons(props) {
  return (
    <Stack direction="row" spacing={2}>
      <BootstrapButton
        variant="outlined"
        disableRipple
        startIcon={
          <AvatarItem src={require("../Assets/images/filtericon.png")} />
        }
      >
        Filter
      </BootstrapButton>
    </Stack>
  );
}

const AvatarItem = styled(Avatar)`
  padding: 0px !important;
  &.MuiAvatar-root.MuiAvatar-circular.IconLabelButton__AvatarItem-sc-1bouepl-0 {
    width: 15px !important;
    height: 25px !important;
  }
`;

const BootstrapButton = styled1(Button)({
  fontSize: "12px",
  padding: "4px 20px",
  borderRadius: "4px",
  fontweight: 700,
  marginLeft: "25",
  color: "#132756",
  textTransform: "none",
  borderColor: "#132756",
});
