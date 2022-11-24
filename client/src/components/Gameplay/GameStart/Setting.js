import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Settings from "@mui/icons-material/Settings";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { GameState } from "../Constants";

export default function Setting(props) {
  const { setGameState } = props;

  // Dropdown anchor position
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const onOpenMenuClick = (evt) => {
    setAnchorEl(evt.currentTarget);
  };
  const onCloseMenuClick = () => {
    setAnchorEl(null);
  };

  const onShareClick = () => {
    console.log("onShareClick");
  };

  const onExitClick = () => {
    console.log("onExitClick");
    setGameState(GameState.SETUP);
  };

  // Tooltip will open Menu element when clicked at the bottom due to menu tyle
  return (
    <div>
      <Tooltip title="Account settings">
        <IconButton
          onClick={onOpenMenuClick}
          size="small"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Settings sx={{ width: 32, height: 32 }} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={onCloseMenuClick}
        onClick={onCloseMenuClick}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              left: 15,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={onShareClick}>
          <ListItemIcon>
            <ScreenShareIcon fontSize="small" />
          </ListItemIcon>
          Share
        </MenuItem>
        <Divider />
        <MenuItem onClick={onExitClick}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          Exit
        </MenuItem>
      </Menu>
    </div>
  );
}
