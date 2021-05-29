import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { PrintPdf } from "../services/createPdf";
import { useSelector } from "react-redux";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import FavoriteIcon from "@material-ui/icons/Favorite";
import GetAppIcon from "@material-ui/icons/GetApp";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import frog from "../images/frog.svg";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import byebye from "../images/byebye.svg";

const useStyles = makeStyles((theme) => ({
  container: {
    height: 350,
    width: "50%",
    left: "25%",
    top: 160,
    minWidth: 320,
    position: "absolute",
    overflow: "hidden",
    boxSizing: "border-box",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      top: "30%",
      left: "5%",
      minHeight: 350,
    },
    [theme.breakpoints.down("xs")]: {
      height: 350,
      top: "20%",
    },
  },
  root: {
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      position: "absolute",
      width: "50%",
      left: 0,
      top: "8%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "35%",
    },
  },
  stepper: {
    background: "none",
  },
  stepLabel: {
    color: "gray",
    textAlign: "center",
    padding: 5,
    width: "80%",
    margin: "30px auto",
    [theme.breakpoints.down("xs")]: {
      fontSize: 14,
    },
  },
  heading: {
    textAlign: "center",
    padding: 10,
    fontSize: 16,
    width: "85%",
    margin: "auto",
    color: theme.palette.primary.main,
  },
  settingsForm: {
    width: "100%",
    marginTop: 20,
    height: "100%",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      position: "absolute",
      width: "50%",
      top: "15%",
      right: 5,
    },
    [theme.breakpoints.down("xs")]: {
      width: "65%",
    },
  },
  formInput: {
    textAlign: "center",
    border: "3px solid #844494",
    borderRadius: 5,
    width: "80%",
    padding: 5,
    position: "absolute",
    bottom: "15%",
    fontSize: 17,
    left: "10%",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
      fontSize: 15,
      marginTop: 30,
      padding: 5,
      position: "static",
    },
  },
  btnContainer: {
    position: "absolute",
    bottom: 5,
    right: 5,
  },
  resetBtn: {
    background: theme.palette.secondary.danger,
    "&:hover": {
      background: "#c51515",
    },
  },
  downloadBtn: {
    background: theme.palette.secondary.success,
    "&:hover": {
      background: "#1d9a5a",
    },
  },
  alert: {
    position: "relative",
    height: 300,
    width: 500,
    [theme.breakpoints.down("xs")]: {
      width: "90%",
      margin: "auto",
      height: 350,
    },
  },
  frogIcon: {
    width: "25%",
    position: "absolute",
    right: 5,
    top: 10,
    [theme.breakpoints.down("xs")]: {},
  },
  dialogActionArea: {
    position: "absolute",
    width: "90%",
    right: "5%",
    top: 50,
  },
  dialogText: {
    fontSize: 15,
    [theme.breakpoints.down("xs")]: {
      fontSize: 14,
    },
  },
  closingWords: {
    position: "absolute",
    width: "100%",
    textAlign: "center",
    top: "40%",
    fontWeight: "bold",
    color: theme.palette.secondary.success,
    [theme.breakpoints.down("xs")]: {
      width: "50%",
      right: 5,
      fontSize: 14,
      top: "25%",
    },
  },
  closeBtn: {
    position: "absolute",
    right: 5,
    top: 10,
  },
  byeImg: {
    position: "absolute",
    bottom: 0,
    width: "30%",
    left: "15%",
    borderRadius: "60%",
    [theme.breakpoints.down("xs")]: {
      left: "55%",
      width: "40%",
      bottom: "20%",
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function PdfSettings(props) {
  const theme = useTheme();
  const titleRef = React.useRef();
  const nameRef = React.useRef();
  const rollRef = React.useRef();
  const facultyRef = React.useRef();
  const scannedImages = useSelector((state) => state.camera.scannedImages);
  const smallDevice = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [attributed, setAttributed] = React.useState(false);
  const [btnValid, setBtnValid] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const steps = ["Title of PDF", "Your Name", "Roll n.o", "Faculty"];
  const stepLabels = [
    "This is the title that appears on the front of your pdf (Required)",
    "Your name will help others to know who created it. (optional)",
    "Your teacher might wanna know this in your assignment. (optional)",
    "Your faculty of study. (optional)",
  ];

  const handleClose = () => {
    props.setFinishing(false);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleAttributeUs = () => {
    setAttributed((prev) => !prev);
    setTimeout(() => setOpen(false), 600);
  };

  const handleDontAttribute = () => {
    setOpen(false);
  };

  const handleDownload = () => {
    const title = titleRef.current.value;
    const name = nameRef.current.value;
    const roll = rollRef.current.value;
    const faculty = facultyRef.current.value;
    const settings = { title, name, roll, faculty, attributed };
    PrintPdf(
      scannedImages.map((image, index) => ({
        image,
      })),
      settings
    );
  };

  React.useEffect(() => {
    if (activeStep === steps.length) setOpen(true);
  }, [activeStep, steps.length]);

  return (
    <>
      <Dialog
        open={open}
        classes={{ paper: classes.alert }}
        TransitionComponent={Transition}
        transitionDuration={500}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div>
          <img alt="frog-on-a-leat" className={classes.frogIcon} src={frog} />
        </div>
        <div className={classes.dialogActionArea}>
          <DialogTitle id="alert-dialog-title">Attribute us?</DialogTitle>
          <DialogContent>
            <DialogContentText
              className={classes.dialogText}
              id="alert-dialog-description"
            >
              {`PdfOnline is a labour of love which took hours & hours worth of work, and it will always be
      absolutely free. It's not required, but we'd really appreciate if you would allow us to include
      our name in your creation. Thanks.`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <FormControlLabel
              control={
                <Checkbox
                  checked={attributed}
                  onChange={handleAttributeUs}
                  name="attribute-us"
                  color="primary"
                />
              }
              label={attributed ? "Thanks!" : "Attribute us?"}
            />
            <Button
              color="primary"
              className={classes.resetBtn}
              variant="contained"
              onClick={handleDontAttribute}
            >
              Nope
            </Button>
          </DialogActions>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            padding: 5,
            fontSize: 5,
          }}
        >
          <a
            style={{
              color: "rgba(0, 0, 0, 0.5)",
              textDecoration: "none",
            }}
            target="_blank"
            rel="noreferrer"
            href="https://www.freepik.com/vectors/background"
          >
            Background vector created by brgfx
          </a>
        </div>
      </Dialog>
      <Grow in={true}>
        <Paper className={classes.container} elevation={4}>
          {activeStep === steps.length && (
            <>
              <img src={byebye} alt="cat in a box" className={classes.byeImg} />
              <div className={classes.closingWords}>
                Yay! your PDF is now ready for download.<br></br>
              </div>
            </>
          )}
          <div className={classes.closeBtn}>
            <IconButton aria-label="close-menu" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <Typography className={classes.heading} variant="h6" color="initial">
            Almost there, let us know more about your pdf.{" "}
            <FavoriteIcon style={{ position: "relative", top: 5 }} />
          </Typography>
          <div className={classes.root}>
            <Stepper
              className={classes.stepper}
              orientation={smallDevice ? "vertical" : "horizontal"}
              activeStep={activeStep}
            >
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </div>
          <form className={classes.settingsForm}>
            <Typography
              variant="h6"
              color="primary"
              className={classes.stepLabel}
            >
              {stepLabels[activeStep]}
            </Typography>
            <input
              onChange={(e) => {
                if (e.currentTarget.value) setBtnValid(true);
                else setBtnValid(false);
              }}
              ref={titleRef}
              style={{ display: activeStep === 0 ? "inline" : "none" }}
              spellCheck={false}
              className={classes.formInput}
              placeholder="Title"
            />
            <input
              ref={nameRef}
              style={{ display: activeStep === 1 ? "inline" : "none" }}
              spellCheck={false}
              className={classes.formInput}
              placeholder="Name"
            />
            <input
              ref={rollRef}
              style={{ display: activeStep === 2 ? "inline" : "none" }}
              spellCheck={false}
              className={classes.formInput}
              placeholder="Your Roll n.o"
            />
            <input
              ref={facultyRef}
              style={{ display: activeStep === 3 ? "inline" : "none" }}
              spellCheck={false}
              className={classes.formInput}
              placeholder="Your faculty"
            />
          </form>
          <div className={classes.btnContainer}>
            {activeStep !== steps.length ? (
              <>
                <Button
                  disabled={!btnValid}
                  variant="contained"
                  onClick={handleNext}
                  color="primary"
                >
                  {activeStep === steps.length - 1 ? "Finish" : "next"}
                </Button>
                <Button
                  style={{ marginLeft: 5 }}
                  variant="contained"
                  onClick={handleBack}
                  color="primary"
                >
                  prev
                </Button>
              </>
            ) : null}
            {activeStep === steps.length ? (
              <>
                <Button
                  variant="contained"
                  className={classes.downloadBtn}
                  onClick={handleDownload}
                  color="secondary"
                  style={{ fontSize: 12 }}
                >
                  Download your PDF{" "}
                  <GetAppIcon style={{ position: "relative ", left: 10 }} />
                </Button>
              </>
            ) : null}
          </div>
        </Paper>
      </Grow>
    </>
  );
}
