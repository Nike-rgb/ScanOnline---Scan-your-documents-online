import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ImageIcon from "@material-ui/icons/Image";
import IconButton from "@material-ui/core/IconButton";
import { togglePreviewMenu } from "../redux/actions/cameraActions";
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
  previewMenuBtn: {
    color: "white",
  },
}));

export default function Navbar() {
  const imagesUploaded = useSelector((state) => state.camera.imagesUploaded);
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
          <IconButton
            className={classes.previewMenuBtn}
            disabled={imagesUploaded ? false : true}
            aria-label="open-captured-images"
            onClick={handleTogglePreviewMenu}
          >
            <ImageIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
