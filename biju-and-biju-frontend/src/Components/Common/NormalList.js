import * as React from "react";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import CustomCheckBox from "./CustomCheckBox";
import { Label } from "../Admin/AddProductModalForm";

export default function NormalList(props) {
  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Demo>
            <List>
              {props?.showAll ? (
                <ListItem
                  onClick={() => props.handleClick("all", props.name)}
                  style={{ cursor: "pointer" }}
                >
                  <CustomCheckBox
                    ticked={
                      props?.items?.length > 0 &&
                      props?.items?.length === props?.selectedItems?.length
                    }
                    class="no-margin"
                  />
                  <Label className="billing-location">Select All</Label>
                </ListItem>
              ) : null}
              {props?.items?.map((i) => (
                <ListItem onClick={() => props.handleClick(i, props.name)}>
                  {props.name === "vendor" ? (
                    <ListTextItem primary={i.employee_name} />
                  ) : props.name === "product" ? (
                    <ListTextItem primary={i.product_name} />
                  ) : props.name === "district" ? (
                    <ListTextItem primary={i.name} />
                  ) : (
                    <ListTextItem primary={i} />
                  )}
                  {props.is_close ? <CloseIcon /> : null}
                </ListItem>
              ))}
            </List>
          </Demo>
        </Grid>
      </Grid>
    </Box>
  );
}

const CloseIcon = styled(HighlightOffOutlinedIcon)`
  font-size: 20px !important;
  cursor: pointer;
`;

const Demo = styled.div``;

const ListTextItem = styled(ListItemText)`
  span {
    font-size: 14px !important;
    cursor: pointer;
  }
`;
