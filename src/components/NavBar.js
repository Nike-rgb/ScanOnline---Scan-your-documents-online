import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ImageIcon from "@material-ui/icons/Image";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import IconButton from "@material-ui/core/IconButton";
import {
  togglePreviewMenu,
  setNewPhotosAdded,
} from "../redux/actions/cameraActions";
import { useDispatch, useSelector } from "react-redux";
import logo from "../images/logo.png";
import CropFreeIcon from "@material-ui/icons/CropFree";
import Badge from "@material-ui/core/Badge";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minWidth: 320,
    zIndex: 3,
  },
  logo: {
    width: 70,
    position: "absolute",
    top: -5,
    left: 100,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  btn: {
    color: "white",
  },
  badgeRoot: {
    position: "absolute",
    top: 15,
    left: "80%",
  },
  badge: {
    backgroundColor: theme.palette.secondary.notification,
  },
}));

export default function Navbar(props) {
  const imagesUploaded = props.imagesUploaded;
  const classes = useStyles();
  const newPhotosAdded = useSelector((state) => state.camera.newPhotosAdded);
  const dispatch = useDispatch();
  const handleTogglePreviewMenu = () => {
    dispatch(togglePreviewMenu());
    if (newPhotosAdded) dispatch(setNewPhotosAdded(false));
  };
  const handleOpenFaq = () => {
    props.setOpenFaq((prev) => !prev);
  };
  const handleOpenQr = () => {
    props.toggleQrScanner();
  };

  return (
    <div className={classes.root}>
      <AppBar classes={{ root: classes.root }} position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <img className={classes.logo} src={logo} alt="Logo" /> ScanOnline
          </Typography>
          <IconButton
            className={classes.btn}
            aria-label="open-qr-scanner"
            disabled={props.finishing ? true : false}
            onClick={handleOpenQr}
          >
            <CropFreeIcon />
          </IconButton>
          <IconButton
            className={classes.btn}
            style={{ position: "relative" }}
            disabled={!imagesUploaded || props.finishing ? true : false}
            aria-label="open-captured-images"
            onClick={handleTogglePreviewMenu}
          >
            <ImageIcon />
            <Badge
              color="secondary"
              variant="dot"
              classes={{ root: classes.badgeRoot, badge: classes.badge }}
              invisible={!newPhotosAdded}
            ></Badge>
          </IconButton>
          <IconButton
            className={classes.btn}
            disabled={!props.finishing ? false : true}
            aria-label="open faqs"
            onClick={handleOpenFaq}
          >
            <ContactSupportIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
