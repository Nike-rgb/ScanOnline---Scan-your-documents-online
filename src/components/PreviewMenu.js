import Preview from "./Preview";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grow from "@material-ui/core/Grow";
import { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import SickCat from "../images/sickcat.svg";
import { moveImages, togglePreviewMenu } from "../redux/actions/cameraActions";
import { set, clear } from "idb-keyval";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    top: 50,
    right: "2%",
    height: 290,
    zIndex: 4,
    [theme.breakpoints.down("xs")]: {
      height: 425,
    },
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
    top: "8%",
    padding: 15,
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
  clearBtn: {
    background: theme.palette.secondary.danger,
    position: "absolute",
    bottom: 10,
    right: 15,
    padding: 6,
    "&:hover": {
      background: "#da0f0f",
    },
  },
  clearBtnLabel: {
    fontSize: 12,
  },
  emptyIconContainer: {
    padding: 10,
    top: "14%",
    position: "absolute",
    width: "100%",
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      top: "30%",
    },
  },
  sickCatImage: {
    position: "absolute",
    top: "110%",
    width: "30%",
    left: "35%",
    [theme.breakpoints.down("xs")]: {
      width: "50%",
      left: "25%",
    },
  },
}));

function saveToLocal(arr) {
  if (!arr.length) return;
  return set("images", arr);
}

export default function PreviewMenu(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const scannedImages = useSelector((state) => state.camera.scannedImages);
  useEffect(() => {
    if (scannedImages.length === 0) return clear();
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
    ) {
      dispatch(moveImages(rearrangeOrder));
      setRearrangeOrder({});
    }
  }, [rearrangeOrder, dispatch]);
  return (
    <>
      <Grow in={true}>
        <Paper className={classes.paper} elevation={10}>
          <Grow in={scannedImages.length === 0}>
            <div className={classes.emptyIconContainer}>
              <img
                src={SickCat}
                alt="sick cat"
                className={classes.sickCatImage}
              />
              You don't have any photos.
            </div>
          </Grow>
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
