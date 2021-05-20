import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { openCamera } from "../redux/actions/cameraActions";
import CameraIcon from "@material-ui/icons/Camera";
import Grow from "@material-ui/core/Grow";

const useStyles = makeStyles((theme) => ({
  paper: {
    height: 250,
    maxWidth: 500,
    width: "60%",
    margin: "auto",
    marginTop: 320,
    position: "relative",
    boxSizing: "border-box",
    [theme.breakpoints.down("xs")]: {
      width: "90%",
      height: 200,
      position: "absolute",
      bottom: 20,
      left: "5%",
    },
  },
  instruction: {
    position: "absolute",
    top: "10%",
    width: "100%",
    textAlign: "center",
    padding: 10,
  },
  btnWrapper: {
    textAlign: "center",
    position: "absolute",
    bottom: 30,
    width: "100%",
    left: 0,
  },
  iconWrapper: {
    textAlign: "center",
    position: "absolute",
    top: 60,
    width: "100%",
    left: 0,
  },
  scanButton: {
    width: 100,
    height: 100,
  },
  icon: {
    fontSize: 60,
    fill: theme.palette.secondary.icon,
    [theme.breakpoints.down("xs")]: {
      fontSize: 40,
    },
  },
  finishBtn: {
    background: theme.palette.secondary.success,
    "&:hover": {
      background: "#22945a",
    },
  },
}));

export default function LandingPage(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleOpenCamera = () => {
    dispatch(openCamera());
  };
  return (
    <>
      <Grow in={true}>
        <Paper className={classes.paper} elevation={3}>
          <Typography
            className={classes.instruction}
            variant="h6"
            color="initial"
          >
            Click on the button below to finish.
            <div className={classes.iconWrapper}>
              <CameraIcon className={classes.icon} />
            </div>
          </Typography>
          <div className={classes.btnWrapper} style={{ bottom: 10 }}>
            <Button
              color="primary"
              className={classes.finishBtn}
              variant="contained"
            >
              Create PDF
            </Button>
            <Button
              style={{ display: "inline-block", marginLeft: 15 }}
              color="primary"
              onClick={handleOpenCamera}
              variant="contained"
            >
              Add More
            </Button>
          </div>
        </Paper>
      </Grow>
    </>
  );
}
