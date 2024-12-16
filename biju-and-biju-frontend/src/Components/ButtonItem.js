import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { styled as styled1 } from "@mui/material/styles";
import { auto } from "@popperjs/core";
import LoaderSpinner from "./Common/LoaderSpinner";

export default function ButtonItem(props) {
      return (
        <Stack direction="row" spacing={2}>
          <BootstrapButton
            type={props.button_type ? props.button_type : "button"}
            variant={props.type}
            disableRipple
            disabled={props.pending}
            fcolor={props.color}
            bgcolor={props.bgColor}
            fsize={props.fsize}
            fweight={props.fweight}
            fpadding={props.fpadding}
            fmargin={props.fmargin}
            bradius={props.bradius}
            onClick={() => (props.handleClick ? props.handleClick() : null)}
          >
            {/* {props.name} */}
            {props.loader ? <LoaderSpinner title={props.IsUpload ? "uploading": "Submitting"} /> : props.name}
          </BootstrapButton>
        </Stack>
      );
}

const BootstrapButton = styled1(Button)(
  ({ fcolor, bgcolor, fsize, fweight, fpadding, bradius, fmargin }) => ({
    fontSize: fsize ? fsize : "10px",
    padding: fpadding ? fpadding : "4px 30px",
    borderRadius: bradius ? bradius : "4px",
    fontweight: fweight ? fweight : 600,
    marginLeft: fmargin ? fmargin : auto,
    color: fcolor ? fcolor : "#252F40",
    textTransform: "none",
    borderColor: "#252F40",
    backgroundColor: bgcolor ? bgcolor : "unset",
    lineHeight: 2.5,
    whiteSpace: "nowrap",
  })
);
