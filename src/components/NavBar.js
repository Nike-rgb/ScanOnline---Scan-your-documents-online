import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ImageIcon from "@material-ui/icons/Image";
import IconButton from "@material-ui/core/IconButton";
import { togglePreviewMenu } from "../redux/actions/cameraActions";
import { useDispatch, useSelector } from "react-redux";
import logo from "../images/logo.png";

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
  previewMenuBtn: {
    color: "white",
  },
  numberBadge: {
    background: theme.palette.secondary.icon,
  },
}));

export default function Navbar(props) {
  const imagesUploaded = useSelector((state) => state.camera.imagesUploaded);
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleTogglePreviewMenu = () => {
    dispatch(togglePreviewMenu());
  };
  return (
    <div className={classes.root}>
      <AppBar classes={{ root: classes.root }} position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <img className={classes.logo} src={logo} alt="Logo" /> ScanOnline
          </Typography>
          <IconButton
            className={classes.previewMenuBtn}
            disabled={imagesUploaded && !props.finishing ? false : true}
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
