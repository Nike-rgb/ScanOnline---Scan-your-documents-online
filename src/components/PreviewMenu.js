import Preview from "./Preview";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grow from "@material-ui/core/Grow";
import { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import { useDispatch } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import SickCat from "../images/sickcat.svg";
import { togglePreviewMenu } from "../redux/actions/cameraActions";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    top: 50,
    right: "2%",
    height: 390,
    overflow: "hidden",
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
    top: "12%",
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
      top: "8%",
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
    top: "20%",
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

export default function PreviewMenu(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(0);
  const handleTogglePreviewMenu = () => {
    dispatch(togglePreviewMenu());
  };
  const scannedImages = props.scannedImages;
  return (
    <>
      <Grow in={props.previewMenuOpen}>
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
                src={src}
                showTools={selectedImage === index ? true : false}
                setSelectedImage={setSelectedImage}
                index={index}
                setScannedImages={props.setScannedImages}
                setEditorData={props.setEditorData}
              />
            ))}
          </div>
        </Paper>
      </Grow>
    </>
  );
}
