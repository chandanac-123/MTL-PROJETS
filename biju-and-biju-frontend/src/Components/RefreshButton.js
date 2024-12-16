import { IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

export function RefreshButton({ onClick }) {
  return (
    <IconButton
      aria-label="Refresh"
      size="large"
      onClick={onClick}
      style={{
        borderColor: "black",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: "5px",
        height: 35,
        marginRight: 20,
      }}
    >
      <RefreshIcon />
    </IconButton>
  );
}
