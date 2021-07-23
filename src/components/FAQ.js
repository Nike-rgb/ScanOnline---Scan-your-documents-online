import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Grow from "@material-ui/core/Grow";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    position: "absolute",
    top: 60,
    [theme.breakpoints.down("xs")]: {
      width: "90%",
      right: "5%",
    },
  },
  accordion: {
    background: "beige",
  },
  heading: {
    fontWeight: theme.typography.fontWeightRegular,
    color: "#1ead1e",
  },
  answer: {
    color: "gray",
  },
}));

const FAQS = [
  {
    question: "What is ScanOnline?",
    answer: `ScanOnline is a free online tool, which you can use to scan your 
        documents online.`,
  },
  {
    question: "Fully offline",
    answer: `Yes, it is a fully offline working app. However, you need an internet connection when you load it the 
        first time duh, and also for ocassional updates. For best offline experience, install app on your device. Go give it a try, 
        turn off your internet and reload this page.`,
  },
  {
    question: "Fully integrated PDF viewer",
    answer: `Once you create your PDF, you can preview right here in the app.`,
  },
  {
    question: "Automatic saving of photos",
    answer: `Until you download your PDF for the first time, 
        your images are automatically saved and loaded the next time you re-open the app.`,
  },
  {
    question: "Automatic filling of PDF information",
    answer: `Don't like us asking for name, roll and so on everytime you make a PDF. We've got you
    covered with automatic filling of those information from the last time you filled them.`,
  },
  {
    question: `I am concerned about privacy. What if my photos are leaked?`,
    answer: `Our app is serverless, and doesn't send data anywhere, except for some usage
    statistics for analytics, and when you wanna share photos.`,
  },
  {
    question: `What's with the whole QR code thing?`,
    answer: `From v2.0.0, we have introduced lossless sharing of photos across your devices, which is as 
    simple as creating a QR code, and scanning it on your other device. Needs internet connection.`,
  },
  {
    question: "I use the app frequently. Can I add it to my homescreen?",
    answer: `Yes you can. When you visit the app for the first time, you'll get a prompt to 'Add to home screen'
        or something like that. Click on that and it'll be ready to launch on your home screen just like your other
        favorite apps.`,
  },
  {
    question: "How can I contribute?",
    answer: `You can contact me at nikeshlepcha7@gmail.com. Also if you are a developer,
        this project is open source and is on github as 'ScanOnline---Scan-your-documents-online'. Go give it a visit and star it.`,
  },
];

export default function FAQ(props) {
  const classes = useStyles();

  return (
    <Grow in={props.openFaq}>
      <div className={classes.root}>
        {FAQS.map((faq, index) => {
          return (
            <Accordion
              key={String(index + Math.random() * 1e9)}
              className={classes.accordion}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="questions"
              >
                <PlayArrowIcon style={{ fill: "green", marginRight: 10 }} />{" "}
                <Typography variant="h6" className={classes.heading}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className={classes.answer}>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </Grow>
  );
}
