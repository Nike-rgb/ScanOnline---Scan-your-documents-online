import { makeStyles } from "@material-ui/core/styles";
import { QrReader } from "@blackbox-vision/react-qr-reader";
import { useState, useEffect } from "react";
import Backdrop from "@material-ui/core/Backdrop";

const useStyles = makeStyles((theme) => ({
  scanner: {
    position: "absolute",
    width: 300,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  qr: {
    border: "white solid",
  },
  viewFinder: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    border: "70px solid #00000063",
    boxShadow: "#6301ffc4 0px 0px 0px 2px inset",
  },
}));

export default function Scanner(props) {
  const classes = useStyles();
  const [URL, setURL] = useState(null);
  const handleClose = () => {
    props.setQRScan((prev) => !prev);
  };
  useEffect(() => {
    if (URL && URL.startsWith(process.env.REACT_APP_SERVER_URL)) {
      props.loadSharedImages(URL);
    }
  }, [URL, props]);
  return (
    <>
      <Backdrop className={classes.backdrop} open={true} onClick={handleClose}>
        <div className={classes.scanner}>
          <QrReader
            constraints={{ facingMode: "environment" }}
            className={classes.qr}
            onResult={(result, error) => {
              if (!!result) {
                setURL(result?.text);
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
            }}
          >
            Scan the code to share photos across devices.<br></br>Tap anywhere
            to cancel.
          </div>
        </div>
      </Backdrop>
    </>
  );
}
