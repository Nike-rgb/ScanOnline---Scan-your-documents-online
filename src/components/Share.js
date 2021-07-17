import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grow from "@material-ui/core/Grow";
import { useState, useRef, useEffect } from "react";
import QRCodeStyling from "qr-code-styling";
import LinearProgress from "@material-ui/core/LinearProgress";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Button from "@material-ui/core/Button";
import { logo2 as logo } from "../services/logo";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 300,
    height: 200,
    left: "50%",
    zIndex: 5,
    bottom: "5%",
    transform: "translateX(-50%)",
    padding: 10,
  },
  qr: {
    width: 138,
    height: 135,
    background: "linear-gradient(45deg, #d622bf,#8d1ea9,#00e7ff82, #150a0ad4)",
  },
  instruction: {
    position: "absolute",
    top: "102%",
    fontSize: 15,
    width: "65%",
  },
  uploading: {
    position: "absolute",
    right: 4,
    width: 130,
  },
  progress: {
    marginTop: 10,
  },
  closeBtn: {
    background: theme.palette.secondary.danger,
    position: "absolute",
    bottom: 5,
    fontSize: 12,
    right: 5,
    "&:hover": {
      background: "#c51515",
    },
  },
}));

export default function Share(props) {
  const classes = useStyles();
  const [qrCreated, setQrCreated] = useState(false);
  const URL = props.URL;
  const qrRef = useRef();
  useEffect(() => {
    if (props.completed && URL && !qrCreated) {
      const qrCode = new QRCodeStyling({
        width: 135,
        height: 135,
        type: "svg",
        data: URL,
        image: logo,
        dotsOptions: {
          color: "#824392",
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
      setQrCreated(true);
    }
  }, [props.completed, URL, qrCreated]);

  const handleClose = () => props.handleClose();
  return (
    <>
      <Grow in={true}>
        <div>
          <Paper elevation={5} className={classes.paper}>
            <div style={{ position: "absolute", width: "96%" }}>
              {!props.completed && (
                <div className={classes.uploading}>
                  <h4 style={{ textAlign: "center" }}>
                    Uploading<br></br>
                    <br></br>
                    <CloudUploadIcon style={{ fontSize: 40 }} />
                  </h4>
                  <LinearProgress
                    className={classes.progress}
                    variant="determinate"
                    value={10}
                  />
                </div>
              )}
              {props.completed && (
                <Grow in={true}>
                  <div
                    style={{
                      position: "absolute",
                      right: "10%",
                      top: "30%",
                      color: "green",
                    }}
                  >
                    <CheckCircleIcon style={{ fontSize: 50 }} />
                  </div>
                </Grow>
              )}
              <div className={classes.qr} ref={qrRef}></div>
              <div className={classes.instruction}>
                {props.completed
                  ? "Scan this QR code opening the app in another device."
                  : "Please wait..."}
              </div>
            </div>
            <Button
              className={classes.closeBtn}
              onClick={handleClose}
              variant="contained"
              color="secondary"
            >
              cancel
            </Button>
          </Paper>
        </div>
      </Grow>
    </>
  );
}
