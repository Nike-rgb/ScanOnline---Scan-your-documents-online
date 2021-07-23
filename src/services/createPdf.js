import logo from "./logo";

const styles = {
  logo: `
    width: 70px;
    display: inline-block;
  `,
  watermark: `
    position: absolute;
    width: 200px;
    left: 40px;
    top: 10px;
  `,
  watermarkText: `
    position: absolute;
    top: 105%;
    left: -10%;
    font-weight: bold;
    color: purple;
  `,
  intro: `
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 70%;
    left: 15%;
    text-align: center;
  `,
  introTitle: `
    font-weight: bold;
    font-size: 20px;
  `,
  image: `
    height: 98%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
};

export default function pdfMarkup(settings, images) {
  const { name, title, roll, faculty, attributed } = settings ? settings : {};
  return `
        <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>ScanOnline</title>
            </head>
            <link
              href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
              rel="stylesheet"
            />
            <link rel="stylesheet" href="pdfStyles.css"/>
            <body>
                <div class="page" style="border-bottom: 2px dotted; position: relative;">
                    ${
                      attributed
                        ? `<div style="${styles.watermark}">
                    <img style="${styles.logo}" src="${logo}"></img>
                    <span class="watermark" style="${styles.watermarkText}">
                    Made with
                    <a
                        style="color: blue; font-size: inherit"
                        href="https://scanonline100.web.app"
                    >
                        ScanOnline
                    </a>
                    </span>
                    </div>`
                        : ""
                    }

                    <div style="${styles.intro}">
                        <div class="introTitle" style="${
                          styles.introTitle
                        }">${title}</div>
                        <div style="font-size: 10px;">
                        ___________________________________
                        </div>
                        ${
                          name
                            ? `<div class="introText">Name: ${name}</div>`
                            : ""
                        }
                        ${
                          roll
                            ? `<div class="introText">Roll: ${roll}</div>`
                            : ""
                        }
                        ${
                          faculty
                            ? `<div class="introText">Faculty: ${faculty}</div>`
                            : ""
                        }
                    </div>
            </div>
            
            ${(() => {
              let imgSection = ``;
              images.forEach((src, index) => {
                imgSection += `
                    <div class="page" style="background: #1c1a3a;overflow-x: hidden; position: relative; border: 3px solid black;">
                        <img alt="Scanned Image" style="${
                          styles.image
                        }" src=${src} />
                        <div style="position: absolute; bottom: 4px; right: ${
                          (index + 1) % 2 ? "5px" : "93%"
                        }; font-size: 16px;    background: white; width: 20px; height: 20px; border-radius: 70%;
                          text-align: center;">${index + 1}</div>
                    </div>
                    `;
              });
              return imgSection;
            })()}
        
            </body>
        </html>
        `;
}
