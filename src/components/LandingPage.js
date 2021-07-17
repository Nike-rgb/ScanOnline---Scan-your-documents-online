import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { openCamera } from "../redux/actions/cameraActions";
import CameraIcon from "@material-ui/icons/Camera";
import Slide from "@material-ui/core/Slide";
import { forwardRef, useState, useEffect } from "react";
import cat from "../images/cat.svg";
import { del, get } from "idb-keyval";

const useStyles = makeStyles((theme) => ({
  paper: {
    height: 250,
    maxWidth: 500,
    width: "60%",
    margin: "auto",
    top: 320,
    position: "relative",
    boxSizing: "border-box",
    minWidth: 320,
    background: "#ffffffe6",
    [theme.breakpoints.down("xs")]: {
      width: "90%",
      height: 200,
      top: "40%",
    },
  },
  instruction: {
    position: "absolute",
    top: "10%",
    width: "100%",
    textAlign: "center",
    padding: 5,
  },
  btnWrapper: {
    textAlign: "center",
    position: "absolute",
    bottom: 30,
    width: "100%",
    left: 0,
  },
  iconWrapper: {
    textAlign: "center",
    position: "absolute",
    top: 60,
    width: "100%",
    left: 0,
  },
  scanButton: {
    width: 100,
    height: 100,
  },
  icon: {
    fontSize: 60,
    fill: theme.palette.secondary.icon,
    [theme.breakpoints.down("xs")]: {
      fontSize: 40,
    },
  },
  alert: {
    position: "relative",
    height: 220,
    width: 500,
    [theme.breakpoints.down("xs")]: {
      width: "90%",
      height: 250,
      margin: "auto",
    },
  },
  catIcon: {
    position: "absolute",
    width: "35%",
    top: 20,
    [theme.breakpoints.down("xs")]: {
      top: 50,
    },
  },
  dialogActionArea: {
    position: "absolute",
    width: "65%",
    right: 0,
    height: "100%",
  },
  features: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    width: "80%",
    left: "10%",
    gap: 50,
    top: 150,
    position: "absolute",
  },
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function LandingPage(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState({});
  useEffect(() => {
    get("images").then((val) => {
      if (val)
        setOpen({
          open: true,
          val,
        });
    });
  }, []);
  const handleOpenCamera = () => {
    dispatch(openCamera());
  };
  const handleCloseAlert = () => {
    props.setScannedImages(open.val);
    setOpen({});
  };
  const handleDeleteFromLocal = () => {
    del("images");
    setOpen({});
  };
  return (
    <>
      <Dialog
        open={Boolean(open.open)}
        classes={{ paper: classes.alert }}
        TransitionComponent={Transition}
        transitionDuration={200}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div>
          <img alt="Smart-cat" className={classes.catIcon} src={cat} />
        </div>
        <div className={classes.dialogActionArea}>
          <DialogTitle id="alert-dialog-title">Hey there!</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You left last time without finishing up. Load the same images?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={handleDeleteFromLocal}>
              Cancel
            </Button>
            <Button color="primary" onClick={handleCloseAlert} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            padding: 5,
            fontSize: 5,
          }}
        >
          <a
            style={{
              color: "rgba(0, 0, 0, 0.5)",
              textDecoration: "none",
            }}
            target="_blank"
            rel="noreferrer"
            href="https://www.freepik.com/vectors/background"
          >
            Background vector created by nizovatina
          </a>
        </div>
      </Dialog>
      <Paper className={classes.paper} elevation={3}>
        <Typography
          className={classes.instruction}
          variant="h6"
          color="initial"
        >
          Easy app to scan assignments.<br></br>
          <div className={classes.iconWrapper}>
            <CameraIcon className={classes.icon} />
          </div>
        </Typography>
        <div className={classes.btnWrapper}>
          <Button
            color="primary"
            onClick={handleOpenCamera}
            variant="contained"
          >
            Start scanning
          </Button>
        </div>
      </Paper>
    </>
  );
}
