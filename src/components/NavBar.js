import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ImageIcon from "@material-ui/icons/Image";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import IconButton from "@material-ui/core/IconButton";
import { togglePreviewMenu, setAlertMsg } from "../redux/actions/cameraActions";
import { useDispatch } from "react-redux";
import logo from "../images/logo.png";
import CropFreeIcon from "@material-ui/icons/CropFree";

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
  numberBadge: {
    background: theme.palette.secondary.icon,
  },
}));

export default function Navbar(props) {
  const imagesUploaded = props.imagesUploaded;
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const handleTogglePreviewMenu = () => {
    dispatch(togglePreviewMenu());
  };
  const handleOpenFaq = () => {
    props.setOpenFaq((prev) => !prev);
  };
  const handleOpenQrScanner = () => {
    if (!navigator.onLine)
      return dispatch(
        setAlertMsg({
          type: "danger",
          color: theme.palette.secondary.danger,
          text: "Sorry, you have to be connected to the internet.",
        })
      );
    props.setQRScan((prev) => !prev);
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
            onClick={handleOpenQrScanner}
          >
            <CropFreeIcon />
          </IconButton>
          <IconButton
            className={classes.btn}
            disabled={!imagesUploaded || props.finishing ? true : false}
            aria-label="open-captured-images"
            onClick={handleTogglePreviewMenu}
          >
            <ImageIcon />
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
