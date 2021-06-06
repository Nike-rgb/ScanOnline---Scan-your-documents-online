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
    question: "Does it work offline?",
    answer: `Yes, it is a fully offline working app. However, you need an internet connection when you load it the 
        first time duh, and also for ocassional updates. Go give it a try, turn off your internet and reload this page.`,
  },
  {
    question: "My camera is not opening. What should I do?",
    answer: `Make sure you allow us the permission to use your camera when you first load the app.
        You can always change it in your browser's settings.`,
  },
  {
    question:
      "I clicked photos, but accidentally closed the app without making my PDF. How can I recover those pictures?",
    answer: `You don't need to do anything because we've got you covered. Until you download your PDF, 
        your images are automatically saved and loaded the next time you re-open the app.`,
  },
  {
    question: "I am concerned about privacy. What if my pictures get leaked?",
    answer: `We assure you there'll never be such a thing like that. Because our app is serverless, meaning that
        no data is ever sent to the server, except for some usage statistics for analytics.`,
  },
  {
    question: `I don't want to keep filling my information everytime I make a PDF.`,
    answer: `You don't have to. Your details are automatically loaded from the last time you filled them.`,
  },
  {
    question: "I use the app frequently. Can I add it to my homescreen?",
    answer: `Yes you can. When you visit the app for the first time, you'll get a prompt to 'Add to home screen'
        or something like that. Click on that and it'll be ready to launch on your home screen just like your other
        favorite apps.`,
  },
  {
    question: "Will this service be free forever?",
    answer: `Yes this is a labor of love, and you'll never have to pay a dime, ever.`,
  },
  {
    question: "How can I contribute?",
    answer: `You can contact me at nikeshlepcha7@gmail.com. Buy me a coffee. Also if you are a developer,
        this project is open source and is on github at https://github.com/Nike-rgb/ScanOnline---Scan-your-documents-online. Go give it a visit and star it.`,
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
