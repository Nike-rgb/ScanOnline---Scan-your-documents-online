import NavBar from "./components/NavBar";
import LandingPage from "./components/LandingPage";
import FinishPage from "./components/FinishPage";
import Camera from "./components/Camera";
import Alert from "./components/Alert";
import PreviewMenu from "./components/PreviewMenu";
import Editor from "./components/Editor";
import { useSelector } from "react-redux";
import Grow from "@material-ui/core/Grow";
import ImageIcon from "@material-ui/icons/Image";
import pig from "./images/pig.svg";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import PdfSettings from "./components/PdfSettings";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  instruction2: {
    position: "absolute",
    bottom: 10,
    left: 15,
    zIndex: -1,
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
  return (
    <>
      <Alert msg={alertMsg} />
      <NavBar finishing={finishing} />
      {previewMenuOpen && <PreviewMenu />}
      {!imagesUploaded && <LandingPage />}
      {imagesUploaded && !finishing && (
        <FinishPage setFinishing={setFinishing} />
      )}
      {finishing && <PdfSettings setFinishing={setFinishing} />}
      <Camera cameraOpen={cameraOpen} />
      {editorData && <Editor src={editorData} />}
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
          Click on{" "}
          <ImageIcon style={{ fill: "grey", position: "relative", top: 4 }} />{" "}
          to edit/delete images
        </Typography>
      </Grow>
    </>
  );
}
