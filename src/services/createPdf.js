import React from "react";
import theme from "../theme/theme";
import {
  Page,
  Text,
  Image,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import logo from "./logo";

const styles = StyleSheet.create({
  logo: {
    width: 60,
    display: "inline-block",
  },
  watermark: {
    position: "absolute",
    width: 200,
    left: 40,
    top: 10,
  },
  watermarkText: {
    position: "absolute",
    top: "105%",
    fontSize: 10,
    left: "-10%",
    fontWeight: "bold",
    color: theme.palette.primary.main,
  },
  intro: {
    position: "absolute",
    top: 180,
    width: "100%",
    textAlign: "center",
  },
  introTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  introText: {
    fontSize: 14,
  },
  image: {
    height: "100%",
  },
});

const pdfSettings = {
  title: "Assignment",
  name: "Nikesh Kazi lepcha",
  roll: "THA076BEI015",
  faculty: "BEI",
  attributed: true,
};

const Watermark = () => {
  return (
    <View style={styles.watermark}>
      <Image style={styles.logo} src={logo}></Image>
      <Text style={styles.watermarkText}>
        Made with{" "}
        <a
          style={{ color: theme.palette.secondary.main }}
          href="https://scanonline100.web.app"
        >
          ScanOnline
        </a>
      </Text>
    </View>
  );
};

const Intro = (props) => {
  const { title, name, roll, faculty } = props.pdfSettings;
  return (
    <>
      <View style={styles.intro}>
        <Text style={styles.introTitle}>{title}</Text>
        <Text style={{ fontSize: 10, marginBottom: 20 }}>
          ___________________________________
        </Text>
        {name && <Text style={styles.introText}>Name: {name}</Text>}
        {roll && <Text style={styles.introText}>Roll: {roll}</Text>}
        {faculty && <Text style={styles.introText}>Faculty: {faculty}</Text>}
      </View>
    </>
  );
};

const ImageSection = (props) => {
  const { src } = props;
  return (
    <>
      <Page size="A6">
        <Image alt="Scanned Image" style={styles.image} src={src} />
      </Page>
    </>
  );
};

const MyDoc = (props) => {
  const { title, name, attributed } = props.pdfSettings;
  return (
    <Document title={title} author={name}>
      <Page size="A6">
        {attributed && <Watermark />}
        <Intro pdfSettings={pdfSettings} />
      </Page>
      {props.scannedImages.map((src, index) => {
        return <ImageSection key={`Image_${index + 1}`} src={src} />;
      })}
    </Document>
  );
};
export default MyDoc;
