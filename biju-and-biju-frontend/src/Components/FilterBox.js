import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { styled as styled1 } from "@mui/material/styles";
import styled from "styled-components";
import FilterForm from "./FilterForm";
import { useEffect } from "react";
import { Box } from "@mui/material";

export default function FilterBox(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    if (props.isfilter === false) {
      setOpen(false);
    }
  }, [props.isfilter]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
    props.setFilter(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const id = open ? "simple-popover" : undefined;

  return (
    <MainContainer className={props?.class}>
      <BootstrapButton
        aria-describedby={id}
        variant="contained"
        className={props?.class}
        startIcon={
          <AvatarItem src={require("../Assets/images/filtericon.png")} />
        }
        onClick={handleClick}
      >
        Filter
      </BootstrapButton>
      <PopOverItem
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{ bgcolor: "rgba(0,0,0,0.5)" }}
      >
        <Box
          sx={{ position: "absolute", right: "15px", top: "20px" }}
          onClick={handleClose}
        >
          <img src={require("../Assets/images/close-squareblack.png")} />
        </Box>
        <Typography sx={{ p: 3, borderRadius: "12px" }}>
          <FilterForm
            fi_types={props.fi_types}
            handleFilter={props.handleFilter}
            handleSelectChange={props.handleSelectChange}
            handleReset={props.handleReset}
            state={props.state}
            setState={props.setState}
          />
        </Typography>
      </PopOverItem>
    </MainContainer>
  );
}

const PopOverItem = styled(Popover)`
  @media only screen and (max-width: 480px) {
    &
      .MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation8.MuiPopover-paper {
      width: 100% !important;
    }
  }
`;

const AvatarItem = styled(Avatar)`
  padding: 0px !important;
  width: 25px !important;
  height: 25px !important;
  &.MuiAvatar-root.MuiAvatar-circular.FilterBox__AvatarItem-sc-u8hdvf-0 {
    width: 15px !important;
    height: 25px !important;
    margin-right: 8px;
  }
`;

const BootstrapButton = styled1(Button)({
  fontSize: "12px",
  padding: "4px 23px",
  borderRadius: "4px",
  fontweight: 700,
  marginLeft: "25",
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

const MainContainer = styled.div`
  button {
    font-weight: bold;
  }
`;
