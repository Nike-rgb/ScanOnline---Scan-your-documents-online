import { useState, Suspense, lazy } from "react";
import NavBar from "./components/NavBar";
import LandingPage from "./components/LandingPage";
import Alert from "./components/Alert";
import Editor from "./components/Editor";
import { useSelector } from "react-redux";
import Grow from "@material-ui/core/Grow";
import ImageIcon from "@material-ui/icons/Image";
import pig from "./images/pig.svg";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Loading from "./components/Loading";
import PreviewMenu from "./components/PreviewMenu";
import FinishPage from "./components/FinishPage";
import FAQ from "./components/FAQ";

const Camera = lazy(() => import("./components/Camera"));
const PdfSettings = lazy(() => import("./components/PdfSettings"));

const useStyles = makeStyles((theme) => ({
  instruction2: {
    position: "absolute",
    top: 600,
    left: 15,
    zIndex: -1,
    [theme.breakpoints.down("xs")]: {
      top: "95%",
    },
  },
}));

export default function App(props) {
  const classes = useStyles();
  const alertMsg = useSelector((state) => state.camera.alertMsg);
  const imagesUploaded = useSelector((state) => state.camera.imagesUploaded);
  const previewMenuOpen = useSelector((state) => state.camera.previewMenuOpen);
  const cameraOpen = useSelector((state) => state.camera.cameraOpen);
  const editorData = useSelector((state) => state.camera.editorData);
  const [finishing, setFinishing] = useState(false);
  const [openFaq, setOpenFaq] = useState(false);
  return (
    <>
      <Alert msg={alertMsg} />
      <NavBar openFaq={openFaq} setOpenFaq={setOpenFaq} finishing={finishing} />
      {!imagesUploaded && <LandingPage />}
      {previewMenuOpen && <PreviewMenu />}
      {editorData && <Editor src={editorData} />}
      {imagesUploaded && !finishing && (
        <FinishPage setFinishing={setFinishing} />
      )}
      <FAQ openFaq={openFaq} />
      <Suspense fallback={<Loading />}>
        {finishing && <PdfSettings setFinishing={setFinishing} />}
      </Suspense>
      <Suspense fallback={<div></div>}>
        <Camera cameraOpen={cameraOpen} />
      </Suspense>
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
