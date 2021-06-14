import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { makeStyles } from "@material-ui/core/styles";
import SnackbarContent from "@material-ui/core/SnackbarContent";

const useStyles = makeStyles((theme) => ({
  alert: {
    width: "60%",
    maxWidth: 200,
  },
  root: {
    width: "100%",
    padding: "2px 10px",
    background: theme.palette.secondary.success,
  },
}));

export default function Alert(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState();
  const handleClose = () => {
    if (props.update) setTimeout(() => props.setUpdate(false), 1000);
    setOpen(false);
  };
  React.useEffect(() => {
    if (props.msg) setOpen(true);
  }, [props.msg]);
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      className={classes.alert}
      open={open}
      autoHideDuration={props.update ? 3500 : 1200}
      onClose={handleClose}
    >
      <SnackbarContent
        classes={{ root: classes.root }}
        message={props.msg}
        action={
          <>
            {!props.update && (
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
