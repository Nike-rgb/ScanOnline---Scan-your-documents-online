import Paper from "@material-ui/core/Paper";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import pigWait from "../images/pig_wait.svg";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  container: {
    height: 450,
    width: 300,
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
  "How are you today?",
  "Don't lose 'Focus'.",
];

export default function Loading(props) {
  const classes = useStyles();
  return (
    <>
      <Backdrop className={classes.backdrop} open={props.hidden ? false : true}>
        <Paper elevation={2} className={classes.container}>
          <div className={classes.waitImgContainer + " pig"}>
            <img alt="pig saying wait" width="100%" src={pigWait} />
          </div>
          <p className={classes.cameraInstruction}>
            {props.text}
            <br></br>
            <br></br>
            {loadingMsgs[Math.floor(Math.random() * loadingMsgs.length)]}
          </p>
        </Paper>
      </Backdrop>
    </>
  );
}
