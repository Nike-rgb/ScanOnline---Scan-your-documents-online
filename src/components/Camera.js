import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { closeCamera, addNewPicture } from "../redux/actions/cameraActions";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import { useEffect, useRef, useState } from "react";
import { Typography } from "@material-ui/core";
import CameraAltIcon from "@material-ui/icons/CameraAlt";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  closeBtn: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  closeIcon: {
    fill: theme.palette.secondary.lightIcon,
  },
  cameraContainer: {
    width: 260,
    height: 450,
    position: "relative",
    [theme.breakpoints.down("xs")]: {
      height: "100vh",
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
    width: 100,
    height: 100,
  },
  icon: {
    fontSize: 50,
    fill: theme.palette.secondary.darkIcon,
    [theme.breakpoints.down("xs")]: {
      fontSize: 30,
    },
  },
}));

export default function Camera() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleCloseCamera = () => {
    dispatch(closeCamera());
    const video = videoRef.current;
    const stream = video.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(function (track) {
      track.stop();
    });
    video.srcObject = null;
  };
  const videoRef = useRef();
  const canvasRef = useRef();
  const [videoLoading, setLoading] = useState(true);
  useEffect(() => {
    const video = videoRef.current;
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(function (stream) {
        video.srcObject = stream;
        video.play();
      })
      .catch(function (err) {
        console.log("An error occurred: " + err);
      });
  }, []);

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
    dispatch(addNewPicture(data));
  };
  return (
    <div>
      <Backdrop className={classes.backdrop} open={true}>
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

/*
export default function CaptureImage(props) {
  var width = 600; // We will scale the photo width to this
  var height; // This will be computed based on the input stream
  var streaming = false;
  var photo = null;
  var startbutton = null;
  const videoRef = useRef();
  const canvasRef = useRef();
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(function (stream) {
        video.srcObject = stream;
        video.play();
      })
      .catch(function (err) {
        console.log("An error occurred: " + err);
      });
  }, []);
  const canPlay = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!streaming) {
      height = video.videoHeight / (video.videoWidth / width);

      video.setAttribute("width", width);
      video.setAttribute("height", height);
      canvas.setAttribute("width", width);
      canvas.setAttribute("height", height);
      streaming = true;
    }
  };
  
  return (
    <>
      <div style={{}}>
        <video onCanPlay={canPlay} ref={videoRef} />
        <canvas hidden ref={canvasRef} />
      </div>
      <button onClick={takePicture}>Capture</button>
    </>
  );
}

*/
