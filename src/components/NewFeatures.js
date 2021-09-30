import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import qr from "../images/qr.svg";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "absolute",
    width: 300,
    height: 300,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 5000,
  },
  img: {
    width: 200,
    position: "absolute",
    top: "20%",
    left: "50%",
    transform: "translateX(-50%)",
  },
  features: {
    position: "absolute",
    bottom: 25,
    width: "96%",
    padding: 5,
  },
  feature: {
    color: theme.palette.secondary.success,
    fontSize: 14,
  },
  closeBtn: {
    position: "absolute",
    right: 5,
    fontSize: 13,
    top: 2,
    color: theme.palette.secondary.danger,
  },
}));

export default function NewFeatures(props) {
  const classes = useStyles();
  const [show, setShow] = useState(true);
  const notifText = "Happy Dashain!!!"
  const features = [
    "Share your photos across devices",
    "Seamless QR code scanning",
    "Lossless sharing",
  ];
  const img = qr;
  const imgClipPath = `
  polygon(12% 20%, 99% 9%, 88% 46%, 106% 100%, 25% 100%, 0% 60%, 0% 20%)
  `;
  const handleClose = () => {
    setShow(false);
  };
  return (
    <>
      {show && (
        <Paper elevation={10} className={classes.container}>
          <h4 style={{ textAlign: "center", paddingTop: 15 }}>
            {notifText? notifText : `What's new in ${props.currentVersion}`}
          </h4>
          <img alt="" className={classes.img} style={{clipPath: props.img? imgClipPath: ''}} src={props.img? props.img : img} />
          {notifText? (<div style={{textAlign: 'right', color: 'crimson'}} className={classes.features}>Enjoy with your family and friends, 
          the holy festival of dashain. <br></br> -ScanOnline Team</div>) : 
            (<ul className={classes.features}>
            {features.map((feature, index) => {
              return (
                <li key={`feature_${index}`} className={classes.feature}>
                  {feature}
                </li>
              );
            })}
          </ul>)
          }
          <IconButton
            className={classes.closeBtn}
            aria-label="close"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </Paper>
      )}
    </>
  );
}
