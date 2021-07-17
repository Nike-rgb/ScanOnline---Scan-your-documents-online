import { useState, useEffect, Suspense, lazy } from "react";
import { setAlertMsg } from "./redux/actions/cameraActions";
import NavBar from "./components/NavBar";
import LandingPage from "./components/LandingPage";
import Alert from "./components/Alert";
import Editor from "./components/Editor";
import { useSelector, useDispatch } from "react-redux";
import Grow from "@material-ui/core/Grow";
import ImageIcon from "@material-ui/icons/Image";
import pig from "./images/pig.svg";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Loading from "./components/Loading";
import Button from "@material-ui/core/Button";
import PreviewMenu from "./components/PreviewMenu";
import FinishPage from "./components/FinishPage";
import FAQ from "./components/FAQ";
import Camera from "./components/Camera";
import { set, del } from "idb-keyval";
import { useTheme } from "@material-ui/core/styles";
import PdfPreview from "./components/PdfPreview";
import AddIcon from "@material-ui/icons/Add";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import qr from "./images/qr.svg";
import LinearProgress from "@material-ui/core/LinearProgress";
import ShareIcon from "@material-ui/icons/Share";
import CropFreeIcon from "@material-ui/icons/CropFree";
import Backdrop from "@material-ui/core/Backdrop";
const QRScanner = lazy(() => import("./components/QRScanner"));
const PdfSettings = lazy(() => import("./components/PdfSettings"));

const useStyles = makeStyles((theme) => ({
  instruction2: {
    position: "absolute",
    left: 15,
    top: "95%",
    zIndex: -1,
  },
  installBtn: {
    position: "fixed",
    bottom: "6%",
    right: 15,
    fontWeight: "bold",
    letterSpacing: 2,
    background: "#0000ffcf",
    border: "1px solid #3cbfbfb0",
    borderRadius: 15,
    padding: 10,
    fontSize: 13,
    "&:hover": {
      background: "#0000ffcf",
      border: "black 1px solid",
    },
    [theme.breakpoints.down("xs")]: {
      padding: 6,
    },
  },
  qrCode: {
    position: "absolute",
    right: "6%",
    zIndex: -1,
    top: "30%",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  downloadProgress: {
    width: 300,
    position: "absolute",
  },
}));

function saveToLocal(arr, imagesUploaded) {
  if (!arr.length && !imagesUploaded) return;
  if (!arr.length) return del("images");
  return set("images", arr);
}

export default function App(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const smallDevice = useMediaQuery(theme.breakpoints.down("xs"));
  const [imagesUploaded, setImagesUploaded] = useState(false);
  const [QRScan, setQRScan] = useState(false);
  const [progress, setProgress] = useState(5);
  const [downloading, setDownloading] = useState(false);
  const previewMenuOpen = useSelector((state) => state.camera.previewMenuOpen);
  const [editorData, setEditorData] = useState({});
  const [defferedEvent, setDefferedEvent] = useState(null);
  const [scannedImages, setScannedImages] = useState([]);
  const [finishing, setFinishing] = useState(false);
  const [openFaq, setOpenFaq] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const downloadSettings = useSelector(
    (state) => state.camera.downloadSettings
  );
  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDefferedEvent(e);
    });
  }, []);
  useEffect(() => {
    const update = localStorage.getItem("update");
    const firstInstall = !localStorage.getItem("installed");
    if (update || firstInstall) {
      fetch("/release.json")
        .then((result) => result.json())
        .then((release) => {
          const currentVersion = release.current_version;
          dispatch(
            setAlertMsg({
              type: "update",
              color: theme.palette.secondary.update,
              text: release[currentVersion]
                ? release[currentVersion]
                : `v${release.current_version} app updated. No major releases`,
            })
          );
          localStorage.removeItem("update");
          if (firstInstall)
            localStorage.setItem("installed", release.current_version);
        })
        .catch(() => console.log(`The app is up to date.`));
    }
  }, [theme.palette.secondary.update, dispatch]);
  useEffect(() => {
    saveToLocal(scannedImages, imagesUploaded);
    if (!imagesUploaded && scannedImages.length !== 0) setImagesUploaded(true);
  }, [scannedImages, imagesUploaded]);
  const handleInstall = () => {
    if (defferedEvent) {
      defferedEvent.prompt();
      setDefferedEvent(null);
    }
  };
  const loadSharedImages = (URL) => {
    setQRScan(false);
    const xhr = new XMLHttpRequest();
    xhr.open("GET", URL);
    xhr.responseType = "json";
    xhr.send();
    setDownloading(true);
    xhr.onprogress = (e) => {
      const { loaded, total } = e;
      const progress = (loaded / total) * 100;
      setProgress(progress);
    };
    xhr.onload = () => {
      const images = xhr.response;
      if (!Array.isArray(images))
        return dispatch(
          setAlertMsg({
            type: "danger",
            color: theme.palette.secondary.danger,
            text: "Sorry, something went wrong. Try again.",
          })
        );
      setScannedImages((prev) => [...prev, ...images]);
      setDownloading(false);
      dispatch(
        setAlertMsg({
          type: "success",
          color: theme.palette.secondary.success,
          text: `${images.length} photos received`,
        })
      );
    };
  };
  return (
    <>
      {downloading && (
        <Backdrop className={classes.backdrop} open={true}>
          <div className={classes.downloadProgress}>
            <div
              style={{
                position: "absolute",
                bottom: "110%",
                width: "100%",
                textAlign: "center",
              }}
            >
              Downloading shared photos
            </div>
            <LinearProgress
              className={classes.progress}
              variant="determinate"
              value={progress}
            />
          </div>
        </Backdrop>
      )}
      <Suspense fallback={<Loading text="Loading QR Scannner" />}>
        {QRScan && (
          <QRScanner
            loadSharedImages={loadSharedImages}
            setQRScan={setQRScan}
          />
        )}
      </Suspense>
      {!imagesUploaded && (
        <Button
          className={classes.installBtn}
          variant="contained"
          color="primary"
          onClick={handleInstall}
          style={{ display: defferedEvent ? "flex" : "none" }}
        >
          <div
            style={{
              color: "gray",
              position: "absolute",
              top: "110%",
              textAlign: "left",
              width: "300%",
              right: smallDevice ? "-70%" : "-90%",
              fontSize: 12,
            }}
          >
            Runs offline once installed.
          </div>
          <AddIcon style={{ position: "relative", left: -5 }} /> Install
        </Button>
      )}
      <Alert />
      <NavBar
        imagesUploaded={imagesUploaded}
        openFaq={openFaq}
        setQRScan={setQRScan}
        setOpenFaq={setOpenFaq}
        finishing={finishing}
      />
      {!imagesUploaded && <LandingPage setScannedImages={setScannedImages} />}
      <PreviewMenu
        previewMenuOpen={previewMenuOpen}
        scannedImages={scannedImages}
        setScannedImages={setScannedImages}
        setEditorData={setEditorData}
      />
      {editorData.src && (
        <Editor
          editorData={editorData}
          setEditorData={setEditorData}
          scannedImages={scannedImages}
          setScannedImages={setScannedImages}
        />
      )}
      {imagesUploaded && !finishing && (
        <FinishPage scannedImages={scannedImages} setFinishing={setFinishing} />
      )}
      <FAQ openFaq={openFaq} />
      <Suspense fallback={<Loading text="Loading settings..." />}>
        {finishing && (
          <PdfSettings
            setPreviewOpen={setPreviewOpen}
            setFinishing={setFinishing}
          />
        )}
      </Suspense>
      <Camera setEditorData={setEditorData} />
      <PdfPreview
        previewOpen={previewOpen}
        setPreviewOpen={setPreviewOpen}
        downloadSettings={downloadSettings}
        scannedImages={scannedImages}
      />
      {!finishing && !smallDevice && (
        <Grow in={true}>
          <div className={classes.qrCode}>
            <img height={"400px"} alt="Qr code scanning banner" src={qr} />
            <div
              style={{
                position: "absolute",
                bottom: "100%",
                fontSize: 14,
                width: "90%",
                left: "5%",
                textAlign: "center",
              }}
            >
              Now sharing your photos across devices as simple as scanning a QR
              code. Click on{" "}
              <ShareIcon
                style={{ position: "relative", top: 5, fill: "#3bbaea" }}
              />{" "}
              on the photos menu, to get started. Then, click on{" "}
              <CropFreeIcon style={{ position: "relative", top: 5 }} /> on
              another device to scan the QR code.
            </div>
          </div>
        </Grow>
      )}
      <Grow in={imagesUploaded}>
        <Typography
          className={classes.instruction2}
          variant="h6"
          color="initial"
        >
          <img
            alt={"Loving Pig"}
            src={pig}
            style={{
              width: 100,
              position: "absolute",
              bottom: "100%",
              left: 0,
            }}
          />
          Click on
          <ImageIcon style={{ fill: "grey", position: "relative", top: 4 }} />
          to edit/delete images
        </Typography>
      </Grow>
    </>
  );
}
