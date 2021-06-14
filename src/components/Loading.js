import Paper from "@material-ui/core/Paper";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import Grow from "@material-ui/core/Grow";
import pigWait from "../images/pig_wait.svg";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  container: {
    height: 450,
    position: "relative",
    [theme.breakpoints.down("xs")]: {
      height: "100vh",
      minWidth: "100vw",
    },
  },
  waitImgContainer: {
    position: "absolute",
    top: "30%",
    left: "25%",
    width: "50%",
    [theme.breakpoints.down("xs")]: {
      left: "30%",
      top: "40%",
      width: "40%",
    },
  },
  cameraInstruction: {
    position: "absolute",
    width: "80%",
    left: "10%",
    top: "80%",
    fontSize: 14,
    textAlign: "center",
    color: "gray",
  },
}));

const loadingMsgs = [
  "Go drink some water.",
  "Close your eyes.",
  "It's a lovely day today.",
  "Have a great day.",
  "Patience is key.",
];

export default function Loading(props) {
  const classes = useStyles();
  return (
    <>
      <Backdrop className={classes.backdrop} open={true}>
        <Paper elevation={2} className={classes.container}>
          <Grow in={true}>
            <div>
              <div className={classes.waitImgContainer + " pig"}>
                <img alt="pig saying wait" width="100%" src={pigWait} />
              </div>
              <p className={classes.cameraInstruction}>
                Loading...<br></br>
                <br></br>
                {loadingMsgs[Math.floor(Math.random() * loadingMsgs.length)]}
              </p>
            </div>
          </Grow>
        </Paper>
      </Backdrop>
    </>
  );
}
