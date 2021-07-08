import Button from "@material-ui/core/Button";
import GetAppIcon from "@material-ui/icons/GetApp";
import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  installBtn: {
    position: "absolute",
    bottom: 5,
    right: 5,
    fontSize: 14,
    background: "linear-gradient(45deg, #714f65,#19b6bd, #0f150fe0)",
    transition: "transform 1s ease",
    "&:hover": {
      transform: "scale(1.03)",
    },
  },
}));

export default function Install(props) {
  const classes = useStyles();
  const [installed, setInstalled] = React.useState(false);
  const [deferredEvent, setDefferedEvent] = React.useState(null);
  React.useEffect(() => {
    window.addEventListener("appinstalled", () => {
      setInstalled(true);
      setDefferedEvent(null);
    });
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDefferedEvent(e);
      console.log(e);
    });
  }, []);

  const handleInstall = async () => {
    deferredEvent.prompt();
    const { outcome } = await deferredEvent.userChoice;
    if (outcome) {
      setInstalled(true);
      setDefferedEvent(null);
    }
  };
  return (
    <>
      <Button
        className={classes.installBtn}
        style={{
          display: installed ? "none" : "block",
        }}
        variant="contained"
        color="primary"
        onClick={handleInstall}
      >
        Install ScanOnline{" "}
        <GetAppIcon style={{ position: "relative", left: 5, top: 3 }} />
      </Button>
    </>
  );
}
