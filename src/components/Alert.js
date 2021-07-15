import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { makeStyles } from "@material-ui/core/styles";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  alert: {
    width: "60%",
    maxWidth: 200,
  },
  root: {
    width: "100%",
    padding: "2px 10px",
  },
}));

export default function Alert(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState();
  const alertMsg = useSelector((state) => state.camera.alertMsg);
  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    if (alertMsg) setOpen(true);
  }, [alertMsg]);
  const { type, color, text } = alertMsg ? alertMsg : {};
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      className={classes.alert}
      open={open}
      autoHideDuration={type === "update" ? 5000 : 1200}
      onClose={handleClose}
    >
      <SnackbarContent
        classes={{ root: classes.root }}
        style={{ backgroundColor: color }}
        message={text}
        action={
          <>
            {type === "success" && (
              <IconButton size="small" aria-label="success" color="inherit">
                <CheckCircleOutlineIcon fontSize="small" />
              </IconButton>
            )}
          </>
        }
      />
    </Snackbar>
  );
}
