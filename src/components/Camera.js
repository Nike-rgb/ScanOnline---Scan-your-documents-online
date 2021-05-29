import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { closeCamera, loadEditor } from "../redux/actions/cameraActions";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import { useEffect, useRef, useState } from "react";
import { Typography } from "@material-ui/core";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import Grow from "@material-ui/core/Grow";
import pigWait from "../images/pig_wait.svg";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  closeBtn: {
    position: "absolute",
    top: 30,
    right: 20,
    zIndex: 1,
    [theme.breakpoints.down("xs")]: {
      top: 5,
      right: 10,
    },
  },
  closeIcon: {
    fill: theme.palette.secondary.lightIcon,
    fontSize: 30,
    [theme.breakpoints.down("xs")]: {
      fontSize: 30,
    },
  },
  cameraContainer: {
    height: 450,
    position: "relative",
    [theme.breakpoints.down("xs")]: {
      height: "100vh",
      minWidth: "100vw",
    },
  },
  video: {
    objectFit: "cover",
    width: "100%",
    height: "100%",
    border: "2px white solid",
    borderRadius: 10,
  },
  instruction: {
    position: "absolute",
    width: "100%",
    top: 10,
    padding: 5,
    fontSize: 14,
    background: "rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    color: "white",
  },
  iconBtnWrapper: {
    textAlign: "center",
    position: "absolute",
    top: "80%",
    width: "100%",
    left: 0,
    zIndex: 1,
    [theme.breakpoints.down("xs")]: {
      top: "87%",
    },
  },
  scanButton: {
    width: 60,
    height: 60,
    background: "#cac0c0",
    "&:hover": {
      background: "#867f7f",
    },
  },
  icon: {
    fontSize: 30,
    fill: theme.palette.secondary.darkIcon,
  },
  waitImgContainer: {
    position: "absolute",
    top: "30%",
    left: "25%",
    width: "50%",
    [theme.breakpoints.down("xs")]: {
      left: "30%",
      top: "40%",
      width: "40%",
    },
  },
  cameraInstruction: {
    position: "absolute",
    width: "80%",
    left: "10%",
    top: "80%",
    fontSize: 14,
    textAlign: "center",
    color: "gray",
  },
}));

export default function Camera(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const videoRef = useRef();
  const canvasRef = useRef();
  const [videoLoading, setLoading] = useState(true);
  useEffect(() => {
    const video = videoRef.current;
    if (props.cameraOpen) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then(function (stream) {
          video.srcObject = stream;
          video.play();
        })
        .catch(function (err) {
          console.log("An error occurred: " + err);
        });
    } else {
      deleteCameraTracks();
    }
  }, [videoRef, props.cameraOpen]);

  const deleteCameraTracks = () => {
    const video = videoRef.current;
    const stream = video.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(function (track) {
        track.stop();
      });
      setLoading(true);
    }
    video.srcObject = null;
  };

  const handleCloseCamera = () => {
    dispatch(closeCamera());
    deleteCameraTracks();
  };

  const handleCanPlay = () => {
    setLoading(false);
  };

  const takePicture = (e) => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    e.preventDefault();
    var context = canvas.getContext("2d");
    let width = video.videoWidth;
    let height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;
    context.drawImage(videoRef.current, 0, 0, width, height);
    var data = canvas.toDataURL("image/png");
    dispatch(loadEditor(data));
    dispatch(closeCamera());
  };
  return (
    <div>
      <Backdrop
        style={{ display: props.cameraOpen ? "grid" : "none" }}
        className={classes.backdrop}
        open={true}
      >
        {!videoLoading && (
          <IconButton onClick={handleCloseCamera} className={classes.closeBtn}>
            <CloseIcon className={classes.closeIcon} />
          </IconButton>
        )}
        <Paper className={classes.cameraContainer} elevation={2}>
          <Typography variant="h6" className={classes.instruction}>
            {videoLoading
              ? "Camera is opening. Please wait"
              : "Make sure you have good lighting"}
          </Typography>
          <Grow in={true} hidden={!videoLoading}>
            <div>
              <div className={classes.waitImgContainer + " pig"}>
                <img alt="pig saying wait" width="100%" src={pigWait} />
              </div>
              <p className={classes.cameraInstruction}>
                Make sure you allowed us access to your camera. You can change
                it anytime in your browser settings.
              </p>
            </div>
          </Grow>
          {!videoLoading && (
            <div className={classes.iconBtnWrapper}>
              <IconButton
                onClick={takePicture}
                className={classes.scanButton}
                aria-label="capture-image"
              >
                <CameraAltIcon className={classes.icon} />
              </IconButton>
            </div>
          )}
          <video
            onCanPlay={handleCanPlay}
            className={classes.video}
            ref={videoRef}
          />
          <canvas hidden ref={canvasRef} />
        </Paper>
      </Backdrop>
    </div>
  );
}
