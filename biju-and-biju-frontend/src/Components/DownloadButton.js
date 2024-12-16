import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { CircularProgress } from "@mui/material";

const BootstrapButton = styled(Button)(({ color, fmargin_left }) => ({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 12,
  padding: "8px 25px",
  border: "none",
  lineHeight: 1.5,
  backgroundColor: color ? color : "#64A7DC",
  borderRadius: "4px",
  fontweight: 500,
  marginLeft: fmargin_left ? fmargin_left : 25,
}));

export default function DownloadButton(props) {
  const title = props.title || "Download";
  return (
    <Stack spacing={2} direction="row">
      <BootstrapButton
        onClick={(e) => (props.handleClick ? props.handleClick(e) : null)}
        variant="contained"
        disableRipple
        fmargin_left={props.fmargin_left}
      >
        {props.isLoading ? (
          <CircularProgress size={20} color="inherit" />
        ) : (
          title
        )}
      </BootstrapButton>
    </Stack>
  );
}
