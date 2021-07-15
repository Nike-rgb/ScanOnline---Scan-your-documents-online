import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import frog from "../images/frog.svg";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { setDownloadSettings } from "../redux/actions/cameraActions";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
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
  skipBtn: {
    background: theme.palette.secondary.danger,
    "&:hover": {
      background: "#c51515",
    },
  },
  dialogText: {
    fontSize: 15,
    [theme.breakpoints.down("xs")]: {
      fontSize: 14,
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function AttributeConfirm(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [thanks, setThanks] = React.useState(false);
  const handleAttributeUs = () => {
    let settings = props.open.settings;
    settings.attributed = true;
    setThanks(true);
    dispatch(setDownloadSettings(settings));
    setTimeout(() => props.setOpen(false), 600);
  };
  const handleDontAttribute = () => {
    let settings = props.open.settings;
    settings.attributed = false;
    dispatch(setDownloadSettings(settings));
    props.setOpen((prev) => ({
      status: false,
    }));
  };
  return (
    <>
      <Dialog
        open={!!props.open.status}
        classes={{ paper: classes.alert }}
        TransitionComponent={Transition}
        transitionDuration={500}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div>
          <img alt="frog-on-a-leaf" className={classes.frogIcon} src={frog} />
        </div>
        <div className={classes.dialogActionArea}>
          <DialogTitle id="alert-dialog-title">Attribute us?</DialogTitle>
          <DialogContent>
            <DialogContentText
              className={classes.dialogText}
              id="alert-dialog-description"
            >
              {`ScanOnline is a labour of love which took hours & hours worth of work, and it will always be
      absolutely free. It's not required, but we'd really appreciate if you would allow us to include
      our name in your creation. Thanks.`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <FormControlLabel
              control={
                <Checkbox
                  checked={props.thanks}
                  onChange={handleAttributeUs}
                  name="attribute-us"
                  color="primary"
                />
              }
              label={thanks ? "Thanks!" : "Attribute us?"}
            />
            <Button
              color="primary"
              className={classes.skipBtn}
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
    </>
  );
}
