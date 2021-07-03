import { makeStyles } from "@material-ui/core/styles";
import Grow from "@material-ui/core/Grow";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  removePhoto,
  loadEditor,
  addEditIndex,
} from "../redux/actions/cameraActions";
import { useDispatch } from "react-redux";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  previewContainer: {
    height: 148,
    width: 90,
    position: "relative",
    transition: "transform 1s ease, opacity 0.1s ease",
  },
  preview: {
    height: 113,
    width: 85,
    cursor: "pointer",
    position: "absolute",
    top: 0,
    display: "block",
    left: 0,
    transition: "transform 1s ease",
    border: "solid 2px #a718f733",
    boxShadow: "0px 5px 5px 1px #00000021",
    borderRadius: 5,
  },
  previewNumber: {
    position: "absolute",
    padding: 4,
    top: 3,
    left: 3,
    background: "rgba(0, 0, 0, 0.2)",
    color: "white",
    zIndex: 1,
    fontSize: 14,
    borderRadius: 5,
  },
  toolsContainer: {
    position: "absolute",
    width: "100%",
    height: 35,
    top: 113,
    left: 0,
  },
  tool: {
    display: "inline-block",
    width: "50%",
    "&:hover": {
      background: "none",
    },
  },
}));

export default function Preview(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [draggedOver, setDraggedOver] = useState(false);
  const handleShowTools = () => {
    props.setSelectedImage(props.index);
  };
  const handleRemovePhoto = () => {
    setTimeout(() => dispatch(removePhoto(props.index)), 800);
  };
  const handleDragEnter = () => {
    setDraggedOver(true);
  };
  const handleDragLeave = () => {
    setDraggedOver(false);
  };
  const handleDragStart = () => {
    props.setRearrangeOrder({ src: props.index });
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = () => {
    props.setRearrangeOrder((prev) => ({ ...prev, dest: props.index }));
    setDraggedOver(false);
  };
  const handleEditPhoto = () => {
    dispatch(loadEditor(props.src));
    dispatch(addEditIndex(props.index));
  };
  return (
    <>
      <Grow in={true}>
        <div>
          <div
            className={`${classes.previewContainer} ${
              draggedOver ? "draggedOver" : ""
            }`}
          >
            <div className={classes.previewNumber}>{props.index + 1}</div>
            <img
              draggable
              onClick={handleShowTools}
              onDragStart={handleDragStart}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onDragLeave={handleDragLeave}
              alt={`Scan ${props.index + 1}`}
              className={`${classes.preview} preview-image`}
              src={props.src}
            />
            {props.showTools && (
              <Grow in={true}>
                <div className={classes.toolsContainer}>
                  <IconButton
                    className={classes.tool}
                    aria-label="edit-photo"
                    onClick={handleEditPhoto}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    className={classes.tool}
                    aria-label="remove-photo"
                    onClick={handleRemovePhoto}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </Grow>
            )}
          </div>
        </div>
      </Grow>
    </>
  );
}
