import React, { useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grow from "@material-ui/core/Grow";
import {
  addNewPicture,
  addEditedPicture,
  closeEditor,
  openCamera,
  removeEditIndex,
  setAlertMsg,
} from "../redux/actions/cameraActions";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: 4,
    color: "#fff",
  },
  previewBtn: {
    background: theme.palette.secondary.success,
    "&:hover": {
      background: "#22945a",
    },
  },
  editorContainer: {
    height: 450,
    position: "relative",
    background: "#ffffff42",
    [theme.breakpoints.down("xs")]: {
      height: "100vh",
      minWidth: "100vw",
    },
  },
  cropper: {
    width: "100%",
    height: "100%",
  },
  btns: {
    position: "absolute",
    top: "90%",
    left: "10%",
    width: "80%",
    textAlign: "center",
  },
}));

export const Editor = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [cropper, setCropper] = useState();
  const editIndex = useSelector((state) => state.camera.editIndex);
  const scannedImages = useSelector((state) => state.camera.scannedImages);

  const cleanUp = () => {
    dispatch(closeEditor());
    dispatch(removeEditIndex());
  };

  const handleCrop = () => {
    if (typeof cropper !== "undefined") {
      if (editIndex !== null) {
        dispatch(
          addEditedPicture(cropper.getCroppedCanvas().toDataURL(), editIndex)
        );
      } else {
        dispatch(setAlertMsg(`${scannedImages.length + 1} photo added.`));
        dispatch(addNewPicture(cropper.getCroppedCanvas().toDataURL()));
        dispatch(openCamera());
      }
    }
    cleanUp();
  };

  const handleSkip = () => {
    if (editIndex === null) {
      dispatch(setAlertMsg(`${scannedImages.length + 1} photo added.`));
      dispatch(addNewPicture(props.src));
      dispatch(openCamera());
    }
    cleanUp();
  };

  return (
    <Grow in={true}>
      <Backdrop classes={{ root: classes.backdrop }} open={true}>
        <Paper className={classes.editorContainer} elevation={2}>
          <Cropper
            className={classes.cropper}
            zoomTo={1}
            initialAspectRatio={1}
            src={props.src}
            alt={"Image"}
            viewMode={1}
            guides={true}
            minCropBoxHeight={50}
            minCropBoxWidth={50}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            onInitialized={(instance) => {
              setCropper(instance);
            }}
          />
          <div className={classes.btns}>
            <Button color="primary" variant="contained" onClick={handleSkip}>
              {editIndex !== null ? "Cancel" : "Don't crop"}
            </Button>
            <Button
              color="primary"
              style={{ marginLeft: 5 }}
              variant="contained"
              onClick={handleCrop}
            >
              Crop
            </Button>
          </div>
        </Paper>
      </Backdrop>
    </Grow>
  );
};

export default Editor;
