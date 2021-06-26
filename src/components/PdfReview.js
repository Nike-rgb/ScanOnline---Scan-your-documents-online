import MyDoc from "../services/createPdf";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import Grow from "@material-ui/core/Grow";
import { useSelector, useDispatch } from "react-redux";
import { setDownloadSettings } from "../redux/actions/cameraActions";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  backBtn: {
    position: "absolute",
    bottom: 10,
    background: "#e60e4f",
    left: 5,
    "&:hover": {
      background: "#b91244",
    },
    [theme.breakpoints.down("xs")]: {
      left: 10,
    },
  },
  paper: {
    width: 300,
    height: 400,
  },
  downloadBtn: {
    background: theme.palette.secondary.success,
    "&:hover": {
      background: "#1d9a5a",
    },
  },
}));

const downloadWaitMsgs = [
  "Squeezing your PDF",
  "Cleaning the papers",
  "Importing ink from America",
  "Printing letters",
  "Gearing up our machine",
];

export default function PdfReview(props) {
  const theme = useTheme();
  const largeDevice = useMediaQuery(theme.breakpoints.up("md"));
  const scannedImages = useSelector((state) => state.camera.scannedImages);
  const dispatch = useDispatch();
  const classes = useStyles();
  const handleBack = () => {
    dispatch(setDownloadSettings(null));
  };

  return (
    <>
      <Grow in={true}>
        <Backdrop open={true} className={classes.backdrop}>
          {!largeDevice && (
            <div style={{ padding: 10, textAlign: "center" }}>
              <Typography variant="h6" color="initial">
                It might take some time depending on the number of images.
                <br></br>
                <br></br>
              </Typography>
              <Button
                className={classes.downloadBtn}
                variant="contained"
                color="primary"
              >
                <PDFDownloadLink
                  style={{ color: "white" }}
                  document={
                    <MyDoc
                      scannedImages={scannedImages ? scannedImages : []}
                      pdfSettings={
                        props.downloadSettings ? props.downloadSettings : {}
                      }
                    />
                  }
                  fileName={
                    props.downloadSettings
                      ? props.downloadSettings.title
                      : "PDF_MADE_WITH_SCANONLINE"
                  }
                >
                  {({ blob, url, loading, error }) =>
                    loading
                      ? "Wait..." +
                        downloadWaitMsgs[
                          Math.floor(Math.random() * downloadWaitMsgs.length)
                        ]
                      : "Download now!"
                  }
                </PDFDownloadLink>
              </Button>
            </div>
          )}
          <Button
            className={classes.backBtn}
            variant="contained"
            color="primary"
            onClick={handleBack}
          >
            Back to app
          </Button>
          {largeDevice && (
            <PDFViewer width="100%" height="100%">
              <MyDoc
                scannedImages={scannedImages ? scannedImages : []}
                pdfSettings={
                  props.downloadSettings ? props.downloadSettings : {}
                }
              />
            </PDFViewer>
          )}
        </Backdrop>
      </Grow>
    </>
  );
}
