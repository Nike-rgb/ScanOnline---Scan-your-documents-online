import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ImageIcon from "@material-ui/icons/Image";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { togglePreviewMenu } from "../redux/actions/previewMenuActions";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  navBar: {
    zIndex: 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const previewMenuOpen = useSelector(
    (state) => state.previewMenu.previewMenuOpen
  );
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleTogglePreviewMenu = () => {
    dispatch(togglePreviewMenu());
  };
  return (
    <div className={classes.root}>
      <AppBar className={classes.navBar} position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            ScannerOnline
          </Typography>
          <Tooltip title={previewMenuOpen ? "Close" : "Edit and delete images"}>
            <IconButton
              aria-label="open-captured-images"
              onClick={handleTogglePreviewMenu}
            >
              <ImageIcon style={{ fill: "white" }} />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </div>
  );
}
