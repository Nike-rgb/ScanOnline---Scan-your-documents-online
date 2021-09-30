import { makeStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import qr from "../images/qr.svg";
import Button from "@material-ui/core/Button";
import PhotoSizeSelectActualIcon from "@material-ui/icons/PhotoSizeSelectActual";
import { useState, useEffect, useRef } from "react";
import { setAlertMsg, setNewPhotosAdded } from "../redux/actions/cameraActions";
import { useDispatch } from "react-redux";
import LinearProgress from "@material-ui/core/LinearProgress";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";
import pigWait from "../images/pig_wait.svg";
import frog from "../images/frog.svg";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import QRCode from "qrcode";
import CircularProgress from "@material-ui/core/CircularProgress";
import DeveloperModeIcon from "@material-ui/icons/DeveloperMode";

const useStyles = makeStyles((theme) => ({
  container: {
    height: 500,
    minHeight: 300,
    width: 300,
    padding: 10,
    left: "50%",
    top: "50%",
    zIndex: 1005,
    transform: "translate(-50%, -50%)",
    position: "absolute",
    [theme.breakpoints.down("xs")]: {
      height: "80%",
      minWidth: "80%",
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  heading: {
    textAlign: "center",
    marginTop: 15,
    color: theme.palette.primary.main,
  },
  description: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
    position: "absolute",
    width: "90%",
    left: "5%",
    color: theme.palette.secondary.main,
    [theme.breakpoints.down("xs")]: {
      fontSize: 15,
    },
  },
  img: {
    width: "94%",
    position: "absolute",
    left: "3%",
    top: "30%",
  },
  controls: {
    position: "absolute",
    bottom: 20,
    textAlign: "center",
    width: "90%",
    left: "5%",
  },
  btn: {
    minWidth: 180,
    display: "inline-block",
    margin: 5,
    fontSize: 12,
  },
  progress: {
    position: "absolute",
    width: "70%",
    left: "15%",
    bottom: "15%",
    textAlign: "center",
  },
  progress2: {
    position: "absolute",
    width: "70%",
    left: "15%",
    top: "15%",
    textAlign: "center",
  },
  qr: {
    marginTop: 5,
    textAlign: "center",
  },
  downloadProgress: {
    position: "absolute",
    width: "70%",
    left: "15%",
    bottom: "15%",
    textAlign: "center",
  },
  waitImg: {
    position: "absolute",
    width: "40%",
    left: "30%",
    top: "30%",
  },
  downloadedConfirm: {
    position: "absolute",
    bottom: "20%",
    width: "90%",
    left: "5%",
    textAlign: "center",
  },
  codeInput: {
    textAlign: "center",
    display: "inline-block",
    margin: 5,
    border: "2px solid black",
    borderRadius: 5,
    padding: 5,
    width: 200,
  },
  code: {
    letterSpacing: 5,
    marginTop: 8,
    border: "2px dotted #39d1da",
    fontWeight: "bold",
    padding: 10,
    display: "inline-block",
    color: "#844494",
  },
  closeBtn: {
    position: "absolute",
    right: 5,
    top: 2,
  },
}));

export default function QRScan(props) {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const qrRef = useRef();
  const [url, setUrl] = useState();
  const [downloadUrl, setDownloadUrl] = useState(
    props.downloadCode && !props.downloadCodeUsed
      ? `${
          process.env.REACT_APP_SERVER_URL
        }/receiveImages/${props.downloadCode.toLowerCase()}`
      : ""
  );
  const [isFetchingUUID, setIsFetchingUUID] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(5);
  const [downloadProgress, setDownloadProgress] = useState(5);
  const [working, setWorking] = useState("");
  const [completed, setCompleted] = useState(false);
  const [openQRScanner, setOpenQRScanner] = useState(false);
  useEffect(() => {
    if (url && completed) {
      QRCode.toDataURL(url, { width: 150 })
        .then((url) => {
          qrRef.current.src = url;
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [url, completed, theme.palette.secondary.main]);
  const isOffline = () => !navigator.onLine;
  const handleOffline = () => {
    dispatch(
      setAlertMsg({
        type: "danger",
        color: theme.palette.secondary.danger,
        text: "Connect to the internet.",
      })
    );
  };
  const getUUID = () => {
    if (isOffline()) return handleOffline();
    setIsFetchingUUID(true);
    fetch(`${process.env.REACT_APP_SERVER_URL}/sendUUID`)
      .then((res) => res.text())
      .then((uuid) => props.setUUID(uuid))
      .catch(() => {
        dispatch(
          setAlertMsg({
            type: "danger",
            color: theme.palette.secondary.danger,
            text: "Sorry something went wrong, try again.",
          })
        );
      })
      .finally(() => setIsFetchingUUID(false));
  };
  const handleSendPhotos = () => {
    if (isOffline()) return handleOffline();
    const xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      `${process.env.REACT_APP_SERVER_URL}/sendImages/${props.UUID}`
    );
    xhr.upload.onprogress = (e) => {
      const { loaded, total } = e;
      const progress = Math.trunc((loaded / total) * 100);
      if (progress < 5) return;
      setUploadProgress(progress);
    };
    const data = new FormData();
    data.append("images", JSON.stringify(props.scannedImages));
    xhr.send(data);
    setWorking("uploading");
    xhr.onload = () => {
      setCompleted(true);
      setUrl(`${process.env.REACT_APP_APP_URL}/shared/${props.UUID}`);
    };
  };
  const handleQRCode = () => {
    if (isOffline()) return handleOffline();
    setWorking("scanning");
    setOpenQRScanner(true);
  };
  useEffect(() => {
    if (downloadUrl !== "") {
      setWorking("downloading");
      const xhr = new XMLHttpRequest();
      xhr.open("GET", downloadUrl);
      xhr.send();
      xhr.onload = () => {
        try {
          const images = JSON.parse(xhr.response);
          setCompleted(true);
          setDownloadUrl("");
          props.setScannedImages((prev) => [...prev, ...images]);
          dispatch(
            setAlertMsg({
              type: "success",
              color: theme.palette.secondary.success,
              text: `${images.length} photos added.`,
            })
          );
          dispatch(setNewPhotosAdded(true));
        } catch (err) {
          dispatch(
            setAlertMsg({
              type: "danger",
              color: theme.palette.secondary.danger,
              text: "Sorry invalid or used code or you timed out. Note: Only one share is allowed per a QR code.",
            })
          );
          setWorking();
          setDownloadUrl("");
          props.setQrScan(false);
        }
        if (!props.downloadCodeUsed) props.setDownloadCodeUsed(true);
      };
      xhr.onprogress = (e) => {
        const { loaded, total } = e;
        const progress = Math.trunc((loaded / total) * 100);
        if (progress < 5) return;
        setDownloadProgress(progress);
      };
    }
  }, [
    downloadUrl,
    dispatch,
    props,
    theme.palette.secondary.danger,
    theme.palette.secondary.success,
  ]);
  const createBubble = (char, parent) => {
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.innerText = char;
    parent.append(bubble);
    setTimeout(() => bubble.remove(), 1500);
  };
  const handleCodeInput = (e) => {
    const input = e.currentTarget;
    const char = input.value.slice(-1);
    if (char.codePointAt(0) === 32 || char === "") return;
    createBubble(char, e.target.parentElement);
    if (input.value.length !== 6) return;
    setDownloadUrl(
      `${
        process.env.REACT_APP_SERVER_URL
      }/receiveImages/${input.value.toLowerCase()}`
    );
  };
  const handleCloseAll = (e) => {
    props.setQrScan(false);
  };

  return (
    <>
      <Paper elevation={8} className={classes.container}>
        <IconButton
          className={classes.closeBtn}
          aria-label="close"
          onClick={handleCloseAll}
        >
          <CloseIcon style={{ fontSize: 30 }} />
        </IconButton>
        {working === "scanning" && openQRScanner && (
          <div
            style={{
              position: "absolute",
              width: "70%",
              left: "15%",
              height: "100%",
              textAlign: "center",
              fontSize: 14,
            }}
          >
            <img
              src={frog}
              style={{
                position: "absolute",
                left: "5%",
                top: "20%",
                width: "90%",
              }}
              alt={"Frog on a leaf"}
            />
            <div style={{ position: "absolute", top: "70%" }}>
              <input
                placeholder="Code here please."
                onClick={(e) => e.stopPropagation()}
                className={classes.codeInput}
                onChange={handleCodeInput}
              />
              <br></br>
              <br></br>
              Put the code from the sender above:
            </div>
          </div>
        )}
        <h4 className={classes.heading}>Share your photos!</h4>
        {!working && (
          <>
            <img src={qr} alt={"Share photos"} className={classes.img} />
            <p className={classes.description}>
              Share photos across devices. Generate a QR code and scan it on
              another device.
            </p>
          </>
        )}
        {working === "uploading" && (
          <>
            {!completed && (
              <img
                src={pigWait}
                alt={"pig saying wait"}
                className={classes.waitImg + " pig"}
              />
            )}
            <div className={!completed ? classes.progress : classes.progress2}>
              {!completed && (
                <>
                  <div>Please wait... {uploadProgress}%</div>
                  <CloudUploadIcon style={{ fontSize: 40 }} />
                  <br></br>
                  <LinearProgress
                    variant="determinate"
                    value={uploadProgress}
                  />
                </>
              )}
              {completed && (
                <>
                  <div style={{ fontSize: 15 }}>
                    Go the following link or use the code below.
                    <br></br>
                    <a href={`${url}`}>
                      <span
                        style={{
                          color: "gray",
                          overflowWrap: "anywhere",
                          textDecoration: "underline",
                        }}
                      >
                        {url}
                      </span>
                    </a>
                    <br></br>
                    <br></br>
                    <span style={{ fontSize: 14, fontWeight: "bold" }}>
                      (Valid for next 3 minutes only).
                    </span>
                  </div>
                  <br></br>
                  <CheckCircleOutline
                    style={{
                      fill: theme.palette.secondary.success,
                      fontSize: 30,
                    }}
                  />
                  <div className={classes.qr}>
                    <img alt="qr code to scan" ref={qrRef} />
                  </div>
                  <div className={classes.code}>{props.UUID}</div>
                </>
              )}
            </div>
          </>
        )}
        {working === "downloading" && (
          <>
            {!completed && (
              <>
                <img
                  src={pigWait}
                  alt={"pig saying wait"}
                  className={classes.waitImg + " pig"}
                />
                <div className={classes.downloadProgress}>
                  <br></br>
                  Transferring...{downloadProgress}% <br></br>
                  <br></br>
                  <LinearProgress
                    variant="determinate"
                    value={downloadProgress}
                  />
                </div>
              </>
            )}
            {completed && (
              <>
                <img src={frog} alt="cat" className={classes.waitImg} />
                <div className={classes.downloadedConfirm}>
                  <CheckCircleOutline
                    style={{
                      fontSize: 40,
                      fill: theme.palette.secondary.success,
                    }}
                  />
                  <br></br>
                  <br></br>
                  Transfer successful. You can close this menu.
                </div>
              </>
            )}
          </>
        )}
        <div className={classes.controls}>
          {props.UUID && !working && (
            <>
              <Button
                onClick={handleSendPhotos}
                className={classes.btn}
                variant="contained"
                color="primary"
                disabled={!props.imagesUploaded}
              >
                Send my photos{" "}
                <PhotoSizeSelectActualIcon
                  style={{ position: "relative", top: 7, left: 5 }}
                />
              </Button>
              <br></br>
              <Button
                className={classes.btn}
                variant="contained"
                color="primary"
                onClick={handleQRCode}
              >
                Enter the code{" "}
                <DeveloperModeIcon
                  style={{ position: "relative", top: 7, left: 5 }}
                />
              </Button>
            </>
          )}
          {!props.UUID && (
            <>
              {!isFetchingUUID && working !== "downloading" && (
                <Button
                  className={classes.btn}
                  onClick={getUUID}
                  variant="contained"
                  color="primary"
                >
                  Get Started
                </Button>
              )}
              {isFetchingUUID && <CircularProgress />}
            </>
          )}
        </div>
      </Paper>
    </>
  );
}
