import { useState, useEffect } from "react";
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
import PdfSettings from "./components/PdfSettings";
import QRScan from "./components/QRScan";
import NewFeatures from "./components/NewFeatures";
import dashain from "./images/dashain.jpg";
import { useParams } from "react-router-dom";

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
  const params = useParams();
  const sharing = params.downloadCode ? true : false;
  const [downloadCodeUsed, setDownloadCodeUsed] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const smallDevice = useMediaQuery(theme.breakpoints.down("xs"));
  const [newFeatures, setNewFeatures] = useState(!sharing);
  const [imagesUploaded, setImagesUploaded] = useState(false);
  const previewMenuOpen = useSelector((state) => state.camera.previewMenuOpen);
  const [editorData, setEditorData] = useState({});
  const [defferedEvent, setDefferedEvent] = useState(null);
  const [scannedImages, setScannedImages] = useState([]);
  const [finishing, setFinishing] = useState(false);
  const [openFaq, setOpenFaq] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [qrScan, setQrScan] = useState(params.downloadCode ? true : false);
  const [UUID, setUUID] = useState(null);
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
          setNewFeatures(true); //set to false if there's no update
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
  const toggleQrScanner = () => {
    setQrScan((prev) => !prev);
  };
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
  return (
    <>
      {newFeatures && <NewFeatures img={dashain} currentVersion={"v2.0.0"} />}
      {qrScan && (
        <QRScan
          setQrScan={setQrScan}
          imagesUploaded={imagesUploaded}
          setScannedImages={setScannedImages}
          scannedImages={scannedImages}
          UUID={UUID}
          setUUID={setUUID}
          downloadCode={params.downloadCode}
          setDownloadCodeUsed={setDownloadCodeUsed}
          downloadCodeUsed={downloadCodeUsed}
        />
      )}
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
        setOpenFaq={setOpenFaq}
        finishing={finishing}
        toggleQrScanner={toggleQrScanner}
      />
      {!imagesUploaded && (
        <LandingPage sharing={sharing} setScannedImages={setScannedImages} />
      )}
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
      {finishing && (
        <PdfSettings
          setPreviewOpen={setPreviewOpen}
          setFinishing={setFinishing}
        />
      )}
      <Camera setEditorData={setEditorData} />
      <PdfPreview
        previewOpen={previewOpen}
        setPreviewOpen={setPreviewOpen}
        downloadSettings={downloadSettings}
        scannedImages={scannedImages}
      />
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
