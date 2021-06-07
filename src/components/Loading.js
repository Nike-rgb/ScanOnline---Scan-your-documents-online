import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "absolute",
    width: "100%",
    textAlign: "center",
    top: "45%",
    zIndex: 1000,
  },
  icon: {
    position: "relative",
    top: 20,
  },
}));

export default function Loading(props) {
  const classes = useStyles();
  return (
    <>
      <div className={classes.container}>
        Loading...<br></br>
        <CircularProgress className={classes.icon} />
      </div>
    </>
  );
}
