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
const PdfSettings = lazy(() => import("./components/PdfSettings"));
const PdfPreview = lazy(() => import("./components/PdfPreview"));

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
  const imagesUploaded = useSelector((state) => state.camera.imagesUploaded);
  const previewMenuOpen = useSelector((state) => state.camera.previewMenuOpen);
  const editorData = useSelector((state) => state.camera.editorData);
  const [finishing, setFinishing] = useState(false);
  const [openFaq, setOpenFaq] = useState(false);
  const downloadSettings = useSelector(
    (state) => state.camera.downloadSettings
  );
  useEffect(() => {
    dispatch(
      setAlertMsg({
        type: "update",
        color: theme.palette.secondary.update,
        text: "v1.0.3 is a unstable version. Expect some minor changes. Stable version coming soon.",
      })
    );
  }, [theme.palette.secondary.update, dispatch]);
  const scannedImages = useSelector((state) => state.camera.scannedImages);
  useEffect(() => {
    saveToLocal(scannedImages, imagesUploaded);
  }, [scannedImages, imagesUploaded]);
  return (
    <>
      <Alert />
      <NavBar openFaq={openFaq} setOpenFaq={setOpenFaq} finishing={finishing} />
      {!imagesUploaded && <LandingPage />}
      <PreviewMenu previewMenuOpen={previewMenuOpen} />
      {editorData && <Editor src={editorData} />}
      {imagesUploaded && !finishing && (
        <FinishPage setFinishing={setFinishing} />
      )}
      <FAQ openFaq={openFaq} />
      <Suspense fallback={<Loading text="Loading settings..." />}>
        {finishing && <PdfSettings setFinishing={setFinishing} />}
      </Suspense>
      <Camera />
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
      <Suspense fallback={<Loading text="Preparing your PDF..." />}>
        {downloadSettings && <PdfPreview downloadSettings={downloadSettings} />}
      </Suspense>
    </>
  );
}
