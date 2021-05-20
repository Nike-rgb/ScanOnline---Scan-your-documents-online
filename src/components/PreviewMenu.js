import Preview from "./Preview";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grow from "@material-ui/core/Grow";
import { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import { togglePreviewMenu } from "../redux/actions/previewMenuActions";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import { moveImages } from "../redux/actions/cameraActions";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    top: 50,
    right: "2%",
    height: 300,
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
    gridTemplateColumns: "100px 100px 100px 100px 100px",
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
      gridTemplateColumns: "100px 100px",
    },
  },
}));

export default function PreviewMenu(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const scannedImages = useSelector((state) => state.camera.scannedImages);
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
  }, [rearrangeOrder]);
  return (
    <>
      <Grow in={true}>
        <Paper className={classes.paper} elevation={10}>
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
