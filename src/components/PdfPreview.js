import pdfMarkup from "../services/createPdf";
import Button from "@material-ui/core/Button";
import { useRef, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/styles";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { del } from "idb-keyval";
import GetAppIcon from "@material-ui/icons/GetApp";
import KeyboardArrowDownOutlinedIcon from "@material-ui/icons/KeyboardArrowDownOutlined";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "absolute",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: "70%",
    width: "60%",
    zIndex: 1000,
    top: "50%",
    minWidth: 300,
    minHeight: 350,
    maxWidth: 620,
    [theme.breakpoints.down("xs")]: {
      width: "95%",
      height: "95%",
    },
  },
  iframe: {
    height: "100%",
    width: "100%",
    border: 0,
  },
  downloadBtn: {
    position: "absolute",
    bottom: 5,
    left: 5,
    fontSize: 12,
    background: theme.palette.secondary.success,
    "&:hover": {
      background: "#1d9a5a",
    },
  },
  closeBtnContainer: {
    position: "absolute",
    top: 5,
    right: 25,
    [theme.breakpoints.down("xs")]: {
      right: 10,
    },
  },
  downArrowContainer: {
    position: "absolute",
    top: "85%",
    right: "5%",
    animation: "strobeAndDisappear 6s ease forwards",
  },
}));

export default function PdfPreview(props) {
  const classes = useStyles();
  const iframeRef = useRef();
  const scannedImages = props.scannedImages;
  const downloadSettings = props.downloadSettings;
  const print = () => {
    del("images").then(() => {
      let WinPrint = window.open(
        "",
        "pdf",
        "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0"
      );
      WinPrint.focus();
      WinPrint.print();
      WinPrint.close();
    });
  };
  useEffect(() => {
    const pdf = pdfMarkup(downloadSettings, scannedImages);
    let WinPrint = window.open(
      "",
      "pdf",
      "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0"
    );
    const doc = WinPrint.document;
    doc.body.innerHTML = pdf;
    doc.close();
    WinPrint.close();
  }, [downloadSettings, scannedImages]);
  const handleClose = () => {
    props.setPreviewOpen(false);
  };
  return (
    <>
      <div style={{ display: props.previewOpen ? "block" : "none" }}>
        <Paper className={classes.container} elevation={4}>
          <div className={classes.closeBtnContainer}>
            <IconButton
              style={{ background: "white", padding: 5 }}
              aria-label="close-menu"
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <div className={classes.downArrowContainer}>
            <KeyboardArrowDownOutlinedIcon style={{ fontSize: 50 }} />
          </div>
          <iframe
            className={classes.iframe}
            title="
        pdf"
            ref={iframeRef}
            name="pdf"
          ></iframe>
          <Button
            className={classes.downloadBtn}
            variant="contained"
            onClick={print}
            color="primary"
          >
            Download PDF
            <GetAppIcon style={{ position: "relative ", left: 10 }} />
          </Button>
        </Paper>
      </div>
    </>
  );
}
