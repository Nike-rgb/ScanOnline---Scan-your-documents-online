import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import updatePic from "../images/update.svg";
import SemVer from "semver";
import React from "react";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1000,
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
  picContainer: {
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
  laterBtn: {
    background: theme.palette.secondary.danger,
    display: "inline-block",
    "&:hover": {
      background: "#c51515",
    },
  },
  text: {
    position: "absolute",
    width: "90%",
    left: "5%",
    top: 30,
    textAlign: "center",
  },
}));

export default function CacheValidator(props) {
  const classes = useStyles();
  const [refresh, setRefresh] = React.useState(false);
  const [time, setTime] = React.useState(5);
  const theme = useTheme();
  const [latestVersion, setLatestVersion] = React.useState("");
  const [timer] = React.useState({
    id: "",
    set(time) {
      this.id = setInterval(() => {
        setTime((prev) => {
          if (prev === 1) {
            hardCacheReset();
            this.clear();
            return 0;
          }
          return prev - 1;
        });
      }, time);
    },
    clear() {
      clearInterval(this.id);
    },
  });
  const hardCacheReset = async () => {
    console.log("Clearing cache and hard reloading...");
    if (caches) {
      const names = await caches.keys();
      for (let name of names) {
        await caches.delete(name);
      }
    }
    window.location.href = "/";
  };
  React.useEffect(() => {
    if (refresh) timer.set(1000);
  }, [refresh, timer]);
  const handleUpdateLater = () => {
    setRefresh(false);
    localStorage.removeItem("update");
    timer.clear();
  };
  React.useEffect(() => {
    fetch("/meta.json")
      .then((response) => response.json())
      .then((meta) => {
        const latestVersion = meta.version;
        const currentVersion = props.appVersion;
        const shouldForceRefresh = SemVer.gt(latestVersion, currentVersion);
        console.log(latestVersion, currentVersion, shouldForceRefresh);
        if (shouldForceRefresh) {
          localStorage.setItem("update", latestVersion);
          console.log(
            `We have a new version - ${latestVersion}. Should force refresh`
          );
          setRefresh(true);
          setLatestVersion(latestVersion);
        } else {
          console.log(
            `You already have the latest version - ${latestVersion}. No cache refresh needed.`
          );
        }
      });
  }, [props.appVersion]);

  return (
    <>
      <Backdrop className={classes.backdrop} open={refresh}>
        <Paper elevation={2} className={classes.container}>
          <div className={classes.picContainer + " pig"}>
            <img alt="Update pic" width="100%" src={updatePic} />
          </div>
          <p className={classes.text}>
            Update from v{global.appVersion} to v{latestVersion} is available.
            <br></br>
            Updating in
            <span style={{ color: theme.palette.secondary.danger }}>
              {` ${time}`}
            </span>
          </p>
          <div
            style={{
              position: "absolute",
              width: "100%",
              bottom: 40,
              textAlign: "center",
            }}
          >
            <Button
              className={classes.laterBtn}
              onClick={handleUpdateLater}
              color="primary"
              variant="contained"
            >
              Remind me Later
            </Button>
          </div>
        </Paper>
      </Backdrop>
    </>
  );
}
