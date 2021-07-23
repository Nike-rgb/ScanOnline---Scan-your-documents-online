import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Paper from "@material-ui/core/Paper";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AttributeConfirm from "./AttributeConfirm";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import byebye from "../images/byebye.svg";
import { set, get } from "idb-keyval";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Grow from "@material-ui/core/Grow";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "50%",
    maxHeight: 500,
    width: "60%",
    left: "20%",
    top: "25%",
    minWidth: 320,
    position: "absolute",
    overflow: "hidden",
    boxSizing: "border-box",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      left: "5%",
      minHeight: 350,
    },
    [theme.breakpoints.down("xs")]: {
      height: "60%",
      top: "20%",
      minHeight: 400,
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
      top: "16%",
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
    width: "40%",
    padding: 5,
    position: "absolute",
    bottom: "15%",
    fontSize: 16,
    left: "30%",
    [theme.breakpoints.down("sm")]: {
      width: "70%",
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
  downloadBtn: {
    background: theme.palette.secondary.lightIcon,
    "&:hover": {
      background: "#ef1388",
    },
  },
  closingWords: {
    position: "absolute",
    width: "100%",
    textAlign: "center",
    top: "38%",
    right: 5,
    fontWeight: "bold",
    color: theme.palette.secondary.success,
    [theme.breakpoints.down("sm")]: {
      width: "50%",
      right: 5,
      top: "25%",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 14,
    },
  },
  closeBtn: {
    position: "absolute",
    right: 5,
    top: 10,
  },
  byeImg: {
    position: "absolute",
    top: 30,
    width: "50%",
    left: "20%",
    borderRadius: "60%",
    [theme.breakpoints.down("sm")]: {
      left: "10%",
      top: 50,
      width: "80%",
    },
  },
  applyEffectsConfirm: {
    position: "absolute",
    bottom: "15%",
    left: "30%",
    width: "40%",
    color: "#351b9c",
    [theme.breakpoints.down("sm")]: {
      bottom: "50%",
      width: "100%",
      left: 0,
    },
    [theme.breakpoints.down("xs")]: {
      left: "5%",
      width: "90%",
      fontSize: 14,
    },
  },
}));

export default function PdfSettings(props) {
  const theme = useTheme();
  const titleRef = React.useRef();
  const nameRef = React.useRef();
  const rollRef = React.useRef();
  const facultyRef = React.useRef();
  const smallDevice = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [btnValid, setBtnValid] = React.useState(false);
  const [open, setOpen] = React.useState({});
  const [settings, setSettings] = React.useState({});
  const [title, setTitle] = React.useState(null);
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
    if (activeStep === 0) {
      const title = titleRef.current.value;
      document.title = title + " | ScanOnline";
    }
    if (activeStep === steps.length - 2) {
      const title = titleRef.current.value;
      const name = nameRef.current.value;
      const roll = rollRef.current.value;
      const faculty = facultyRef.current.value;
      const settings = { title, name, roll, faculty };
      set("settings", settings);
      sessionStorage.setItem("title", title);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    if (activeStep !== 0) setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleDownload = () => {
    props.setPreviewOpen(true);
  };

  React.useEffect(() => {
    if (activeStep === steps.length) {
      const title = titleRef.current.value;
      const name = nameRef.current.value;
      const roll = rollRef.current.value;
      const faculty = facultyRef.current.value;
      const settings = { title, name, roll, faculty };
      setOpen({ settings, status: true });
    }
  }, [activeStep, steps.length]);

  React.useEffect(() => {
    (async () => {
      const settings = await get("settings");
      if (!settings) return setSettings({});
      setSettings(settings);
      let title = sessionStorage.getItem("title");
      if (title) {
        setTitle(title);
        setBtnValid(true);
      }
    })();
  }, []);

  return (
    <>
      <AttributeConfirm open={open} setOpen={setOpen} handle />
      <Grow in={true}>
        <Paper className={classes.container} elevation={4}>
          {activeStep === steps.length && (
            <>
              <div className={classes.closingWords}>
                Yay! your PDF is now ready for download.<br></br>
                <img
                  src={byebye}
                  alt="cat in a box"
                  className={classes.byeImg}
                />
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
              defaultValue={title ? title : ""}
              ref={titleRef}
              style={{ display: activeStep === 0 ? "inline" : "none" }}
              spellCheck={false}
              className={classes.formInput}
              placeholder="eg. Assignment 1"
            />
            <input
              ref={nameRef}
              defaultValue={settings.name ? settings.name : ""}
              style={{ display: activeStep === 1 ? "inline" : "none" }}
              spellCheck={false}
              className={classes.formInput}
              placeholder="eg. John Doe"
            />
            <input
              ref={rollRef}
              defaultValue={settings.roll ? settings.roll : ""}
              style={{ display: activeStep === 2 ? "inline" : "none" }}
              spellCheck={false}
              className={classes.formInput}
              placeholder="eg. 1568"
            />
            <input
              ref={facultyRef}
              defaultValue={settings.faculty ? settings.faculty : ""}
              style={{ display: activeStep === 3 ? "inline" : "none" }}
              spellCheck={false}
              className={classes.formInput}
              placeholder="eg. Science"
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
                  disabled={activeStep === 0 ? true : false}
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
                  {"Preview"}
                  <VisibilityIcon style={{ position: "relative ", left: 10 }} />
                </Button>
              </>
            ) : null}
          </div>
        </Paper>
      </Grow>
    </>
  );
}
