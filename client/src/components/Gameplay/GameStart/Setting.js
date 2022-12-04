import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import { Dialog } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Settings from "@mui/icons-material/Settings";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {
  FacebookShareButton,
  PinterestShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from "react-share";
import {
  FacebookIcon,
  PinterestIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
} from "react-share";

function ShareDialog({ isOpenDialog, setIsOpenDialog }) {
  return (
    <Dialog onClose={() => setIsOpenDialog(false)} open={isOpenDialog}>
      <div className="p-3">
        <h3>Share:</h3>
        <ul className="p-0">
          <FacebookShareButton url={window.location.href} className="mx-2">
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
          <PinterestShareButton url={window.location.href} className="mx-2">
            <PinterestIcon size={32} round={true} />
          </PinterestShareButton>
          <RedditShareButton url={window.location.href} className="mx-2">
            <RedditIcon size={32} round={true} />
          </RedditShareButton>
          <TelegramShareButton url={window.location.href} className="mx-2">
            <TelegramIcon size={32} round={true} />
          </TelegramShareButton>
          <TwitterShareButton url={window.location.href} className="mx-2">
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
        </ul>
      </div>
    </Dialog>
  );
}

export default function Setting(props) {
  const { onExitClick } = props;

  // Dropdown anchor position
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Share dialog
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const onOpenMenuClick = (evt) => {
    setAnchorEl(evt.currentTarget);
  };
  const onCloseMenuClick = () => {
    setAnchorEl(null);
  };

  const onShareClick = () => {
    setIsOpenDialog(true);
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
          <Settings style={{ color: "azure" }} sx={{ width: 32, height: 32 }} />
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

      <ShareDialog
        isOpenDialog={isOpenDialog}
        setIsOpenDialog={setIsOpenDialog}
      />
    </div>
  );
}
