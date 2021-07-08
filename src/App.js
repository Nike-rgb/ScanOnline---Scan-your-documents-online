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
import PreviewMenu from "./components/PreviewMenu";
import FinishPage from "./components/FinishPage";
import FAQ from "./components/FAQ";
import Camera from "./components/Camera";
import { set, del } from "idb-keyval";
import { useTheme } from "@material-ui/core/styles";
import PdfPreview from "./components/PdfPreview";
const PdfSettings = lazy(() => import("./components/PdfSettings"));

const useStyles = makeStyles((theme) => ({
  instruction2: {
    position: "absolute",
    left: 15,
    top: "95%",
    zIndex: -1,
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
  const [imagesUploaded, setImagesUploaded] = useState(false);
  const previewMenuOpen = useSelector((state) => state.camera.previewMenuOpen);
  const [editorData, setEditorData] = useState({});
  const [scannedImages, setScannedImages] = useState([]);
  const [finishing, setFinishing] = useState(false);
  const [openFaq, setOpenFaq] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const downloadSettings = useSelector(
    (state) => state.camera.downloadSettings
  );
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
  return (
    <>
      <Alert />
      <NavBar
        imagesUploaded={imagesUploaded}
        openFaq={openFaq}
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
      <PdfPreview
        previewOpen={previewOpen}
        setPreviewOpen={setPreviewOpen}
        downloadSettings={downloadSettings}
        scannedImages={scannedImages}
      />
    </>
  );
}
