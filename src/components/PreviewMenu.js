import Preview from "./Preview";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grow from "@material-ui/core/Grow";
import { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import { moveImages, togglePreviewMenu } from "../redux/actions/cameraActions";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    top: 50,
    right: "2%",
    height: 400,
    zIndex: 2,
  },
  closeBtnContainer: {
    position: "absolute",
    top: 0,
    height: "10%",
    width: "100%",
    textAlign: "right",
  },
  grid: {
    gridTemplateColumns: "120px 120px 120px 120px 120px",
    position: "relative",
    top: "10%",
    padding: 10,
    bottom: 0,
    justifyItems: "center",
    gap: 5,
    width: "100%",
    display: "grid",
    overflowY: "auto",
    height: "90%",
    [theme.breakpoints.down("xs")]: {
      gridTemplateColumns: "120px 120px",
    },
  },
  instructions: {
    padding: 5,
    width: "100%",
    position: "absolute",
    textAlign: "center",
  },
}));

const localDB = window.localStorage;
function saveToLocal(arr) {
  if (!arr.length) return;
  localDB.setItem("images", JSON.stringify(arr));
}

export default function PreviewMenu(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const scannedImages = useSelector((state) => state.camera.scannedImages);
  useEffect(() => {
    saveToLocal(scannedImages);
  }, [scannedImages]);

  const [selectedImage, setSelectedImage] = useState(0);
  const [rearrangeOrder, setRearrangeOrder] = useState({});
  const handleTogglePreviewMenu = () => {
    dispatch(togglePreviewMenu());
  };
  useEffect(() => {
    if (
      "src" in rearrangeOrder &&
      "dest" in rearrangeOrder &&
      rearrangeOrder.dest !== rearrangeOrder.src
    )
      dispatch(moveImages(rearrangeOrder));
  }, [rearrangeOrder, dispatch]);
  return (
    <>
      <Grow in={true}>
        <Paper className={classes.paper} elevation={10}>
          <div className={classes.instructions}>
            <Typography variant="h6" color="initial">
              Click on image to edit/remove. Drag to reorder.
            </Typography>
          </div>
          <div className={classes.closeBtnContainer}>
            <IconButton
              aria-label="close-menu"
              onClick={handleTogglePreviewMenu}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <div className={classes.grid}>
            {scannedImages.map((src, index) => (
              <Preview
                key={`captured_image${index}`}
                showTools={selectedImage === index ? true : false}
                setSelectedImage={setSelectedImage}
                index={index}
                src={src}
                setRearrangeOrder={setRearrangeOrder}
              />
            ))}
          </div>
        </Paper>
      </Grow>
    </>
  );
}
