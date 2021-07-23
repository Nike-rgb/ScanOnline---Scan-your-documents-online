import { makeStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import qr from "../images/qr.svg";
import Button from "@material-ui/core/Button";
import PhotoSizeSelectActualIcon from "@material-ui/icons/PhotoSizeSelectActual";
import SettingsOverscanIcon from "@material-ui/icons/SettingsOverscan";
import { useState, useEffect, useRef } from "react";
import { setAlertMsg } from "../redux/actions/cameraActions";
import { useDispatch } from "react-redux";
import LinearProgress from "@material-ui/core/LinearProgress";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";
import QRCodeStyling from "qr-code-styling";
import { logo2 as logo } from "../services/logo";
import { QrReader } from "@blackbox-vision/react-qr-reader";
import Backdrop from "@material-ui/core/Backdrop";
import pigWait from "../images/pig_wait.svg";
import frog from "../images/frog.svg";

const useStyles = makeStyles((theme) => ({
  container: {
    height: 500,
    minHeight: 300,
    width: 350,
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
  instruction: {
    [theme.breakpoints.down("xs")]: {
      fontSize: 15,
    },
  },
  qr: {
    marginTop: 30,
    textAlign: "center",
  },
  scannerContainer: {
    position: "absolute",
    width: 300,
  },
  scanner: {
    border: "white solid",
  },
  viewFinder: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    border: "40px solid #00000063",
    boxShadow: "#6301ffc4 0px 0px 0px 2px inset",
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
}));

export default function QRScan(props) {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const qrRef = useRef();
  const [url, setUrl] = useState();
  const [downloadUrl, setDownloadUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(5);
  const [downloadProgress, setDownloadProgress] = useState(5);
  const [working, setWorking] = useState("");
  const [completed, setCompleted] = useState(false);
  const [openQRScanner, setOpenQRScanner] = useState(false);
  const [cameraFace] = useState("environment");
  useEffect(() => {
    if (url && completed) {
      const qrCode = new QRCodeStyling({
        width: 180,
        height: 180,
        type: "svg",
        data: url,
        image: logo,
        dotsOptions: {
          color: theme.palette.secondary.main,
          type: "rounded",
        },
        backgroundOptions: {
          color: "#e9ebee",
        },
        imageOptions: {
          margin: 4,
        },
      });
      qrCode.append(qrRef.current);
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
      });
  };
  const handleSendPhotos = () => {
    if (isOffline()) return handleOffline();
    const xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      `${process.env.REACT_APP_SERVER_URL}/sendImages/${props.UUID}`
    );
    //xhr.setRequestHeader("content-type", "application/json");
    xhr.upload.onprogress = (e) => {
      const { loaded, total } = e;
      const progress = Math.trunc((loaded / total) * 100);
      setUploadProgress(progress);
    };
    const data = new FormData();
    data.append("images", JSON.stringify(props.scannedImages));
    xhr.send(data);
    setWorking("uploading");
    xhr.onload = () => {
      setCompleted(true);
      setUrl(xhr.response);
    };
  };
  const handleQRCode = () => {
    if (isOffline()) return handleOffline();
    setWorking("scanning");
    setOpenQRScanner(true);
  };
  const handleClose = () => {
    setOpenQRScanner(false);
    setWorking("");
  };
  useEffect(() => {
    if (downloadUrl !== "") {
      if (!downloadUrl.startsWith(process.env.REACT_APP_SERVER_URL)) {
        dispatch(
          setAlertMsg({
            type: "danger",
            color: theme.palette.secondary.danger,
            text: "Invalid QR code.",
          })
        );
        return setWorking("");
      }
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
        }
      };
      xhr.onprogress = (e) => {
        const { loaded, total } = e;
        const progress = Math.trunc((loaded / total) * 100);
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
  const handleCodeInput = (e) => {
    const input = e.currentTarget;
    if (input.value.length !== 6) return;
    setDownloadUrl(
      `${process.env.REACT_APP_SERVER_URL}/receiveImages/${input.value}`
    );
  };
  return (
    <>
      {working === "scanning" && openQRScanner && (
        <Backdrop
          className={classes.backdrop}
          open={true}
          onClick={handleClose}
        >
          <div className={classes.scannerContainer}>
            <QrReader
              constraints={{ facingMode: cameraFace }}
              className={classes.scanner}
              onResult={(result, error) => {
                if (!!result) {
                  setDownloadUrl(result?.text);
                }
              }}
              style={{ width: "100%" }}
            />
            <div className={classes.viewFinder}></div>
            <div
              style={{
                position: "absolute",
                top: "105%",
                width: "100%",
                textAlign: "center",
                fontSize: 14,
              }}
            >
              Scan the QR code. Tap anywhere to cancel.
              <br></br>
              Or if your camera isn't working, put the code from the sender
              below:<br></br>
              <br></br>
              <input
                placeholder="Code here please."
                onClick={(e) => e.stopPropagation()}
                className={classes.codeInput}
                onChange={handleCodeInput}
              />
            </div>
          </div>
        </Backdrop>
      )}
      <Paper elevation={8} className={classes.container}>
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
                  <div className={classes.instruction}>
                    Scan the following QR code from any other device<br></br>
                    <span style={{ fontSize: 14, fontWeight: "bold" }}>
                      (Valid for next 3 minutes only).
                    </span>
                  </div>
                  <br></br>
                  <CheckCircleOutline
                    style={{
                      fill: theme.palette.secondary.success,
                      fontSize: 40,
                    }}
                  />
                  <div className={classes.qr} ref={qrRef}></div>
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
                  You have successfully transferred photos to this device.
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
                Scan the code{" "}
                <SettingsOverscanIcon
                  style={{ position: "relative", top: 7, left: 5 }}
                />
              </Button>
            </>
          )}
          {!props.UUID && (
            <Button
              className={classes.btn}
              onClick={getUUID}
              variant="contained"
              color="primary"
            >
              Get Started
            </Button>
          )}
        </div>
      </Paper>
    </>
  );
}
