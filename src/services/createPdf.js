import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const pdfContent = (sections, pageWidth = 6, pageHeight = 7, pdfSettings) => {
  const pageSize = {
    width: pageWidth * 72,
    height: pageHeight * 72,
  };
  const imageWidth = 1.0;
  const imagePercentage = 90;
  const pageMargins = [40, 60, 40, 60];
  let content = [];
  if (pdfSettings) {
    let { title, name, roll, faculty, attributed } = pdfSettings;
    content.push(
      attributed
        ? {
            text: "Made with pdfOnline",
            link: "https://pdfonline.web.app",
            margin: 15,
            color: "#844494",
            decoration: "underline",
          }
        : null,
      {
        text: "Title",
        fontSize: 16,
        alignment: "center",
        marginTop: attributed ? pageSize.height * 0.1 : pageSize.height * 0.2,
      },
      {
        text: title,
        fontSize: 20,
        alignment: "center",
        margin: 10,
        fontWeight: "bold",
      },
      {
        text: "_______________________________",
        fontSize: 14,
        alignment: "center",
      },
      name
        ? {
            text: `Name: ${name}`,
            style: "text",
          }
        : null,
      roll
        ? {
            text: `Roll No: ${roll}`,
            style: "text",
          }
        : null,
      faculty
        ? {
            text: `Faculty: ${faculty}`,
            style: "text",
            pageBreak: "after",
          }
        : null
    );
  }
  sections.forEach((section, si) => {
    content.push({
      image: section.image,
      alignment: "center",
      width: (pageSize.width * imageWidth * imagePercentage) / 100,
    });
    content.push({
      text: "",
      pageBreak: "after",
    });
  });
  return {
    pageSize,
    content,
    pageMargins,
  };
};

export const PrintPdf = (sections, pdfSettings, pageWidth, pageHeight) => {
  const { pageSize, content, pageMargins } = pdfContent(
    sections,
    pageWidth,
    pageHeight,
    pdfSettings
  );
  const docDefinition = {
    pageSize,
    content,
    pageMargins,
    styles: {
      text: {
        fontSize: 16,
        alignment: "center",
        margin: 10,
        fontWeight: "bold",
      },
    },
    footer: function (currentPage) {
      return {
        text: currentPage.toString(),
        alignment: currentPage % 2 === 0 ? "left" : "right",
        style: "normalText",
        margin: [10, 10, 10, 10],
      };
    },
  };
  pdfMake.createPdf(docDefinition).open();
};
