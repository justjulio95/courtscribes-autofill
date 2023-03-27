import docx from 'docx';
import * as fs from 'fs';

function renderExhibitsList(confirmExhibits, exhibits) {
  if (confirmExhibits === true) {
    let exhibitsList = exhibits.split(',').map(function(item){
      return item.trim();
    })
    let tradList = '';

    for (let i = 0; i <= exhibitsList.length - 1; i++) {
      tradList += (i+1) + ' - ' + exhibitsList[i] + '\t';
    }

    return `${tradList}`
  }
}

// use the docx package to develop the RCF file
const generateRCF = courtScribesData => {
  // destructure the object for the sake of simplicity in coding
  const {reporterName, jobNumber, date, witness, caseName, caseNumber, onTime, offTime,
  readWaive, transOrdered, originalOrder, deliverySpeed, videoOrdered, confirmExhibits, 
  exhibits, exhibitsSent} = courtScribesData;

  let doc = new docx.Document({
    sections: [
      {
        properties: {},
        children: [
          new docx.Paragraph({
            children: [
              new docx.ImageRun({
                data: fs.readFileSync('utils/images/CSHeader.jpeg'),
                transformation: {
                  width: 300,
                  height: 100
                },
                floating: {
                  horizontalPosition: {
                    align: docx.HorizontalPositionAlign.CENTER
                  },
                  verticalPosition: {
                    relative: docx.VerticalPositionRelativeFrom.TOP,
                    align: docx.VerticalPositionAlign.TOP
                  }
                }
              })
            ]
          }),
          new docx.Paragraph({
            alignment: docx.AlignmentType.CENTER,
            children: [
              new docx.TextRun({
                text: 'REPORTER COMPLETION FORM',
                color: '000000',
                bold: true,
                size: 36,
                font: 'Calibri',
                floating: {
                }
              }),
            ]
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: `DATE: ${date}`,
                color: '0000ff',
                bold: true,
                size: 24,
                font: 'Calibri'
              }),
              new docx.TextRun({
                text: `\t\t\t\t\t\t\tREPORTER NAME: ${reporterName}`,
                color: '0000ff',
                bold: true,
                size: 24,
                font: 'Calibri'
              })
            ]
          }),
          new docx.Paragraph({
            children:[
              new docx.TextRun({
                text: `JOB NUMBER: ${jobNumber}`,
                color: '0000ff',
                bold: true,
                size: 24,
                font: 'Calibri'
              })
            ]
          }),
          new docx.Paragraph({
            children:[
              new docx.TextRun({
                text: `CASE CAPTION/CASE #: ${caseNumber}`,
                color: '0000ff',
                bold: true,
                size: 24,
                font: 'Calibri'
              })
            ]
          }),
          new docx.Paragraph({
            children:[
              new docx.TextRun({
                text: `WITNESS/CASE NAME: ${witness}/${caseName}`,
                color: 'FF0000',
                bold: true,
                size: 24,
                font: 'Calibri'
              })
            ]
          }),
          new docx.Paragraph({
            children:[
              new docx.TextRun({
                text: `ON THE RECORD TIME: ${onTime}`,
                color: 'FF0000',
                bold: true,
                size: 24,
                font: 'Calibri'
              })
            ]
          }),
          new docx.Paragraph({
            children:[
              new docx.TextRun({
                text: `OFF THE RECORD TIME: ${offTime}`,
                color: 'FF0000',
                bold: true,
                size: 24,
                font: 'Calibri'
              })
            ]
          }),
          new docx.Paragraph({
            children:[
              new docx.TextRun({
                text: `READ or WAIVE: ${readWaive}`,
                color: 'FF0000',
                bold: true,
                size: 24,
                font: 'Calibri'
              })
            ]
          }),
          new docx.Paragraph({
            children:[
              new docx.TextRun({
                text: `WITNESS #2: `,
                color: '000000',
                bold: true,
                size: 24,
                font: 'Calibri'
              })
            ]
          }),
          new docx.Paragraph({
            children:[
              new docx.TextRun({
                text: `ON THE RECORD TIME: `,
                color: '000000',
                bold: true,
                size: 24,
                font: 'Calibri'
              })
            ]
          }),
          new docx.Paragraph({
            children:[
              new docx.TextRun({
                text: `OFF THE RECORD TIME: `,
                color: '000000',
                bold: true,
                size: 24,
                font: 'Calibri'
              })
            ]
          }),
          new docx.Paragraph({
            children:[
              new docx.TextRun({
                text: `READ or WAIVE: ${readWaive}`,
                color: '000000',
                bold: true,
                size: 24,
                font: 'Calibri'
              })
            ]
          }),
          new docx.Paragraph({
            children:[
              new docx.TextRun({
                text: `WITNESS #3: `,
                color: '000000',
                bold: true,
                size: 24,
                font: 'Calibri'
              })
            ]
          }),
          new docx.Paragraph({
            children:[
              new docx.TextRun({
                text: `ON THE RECORD TIME: `,
                color: '000000',
                bold: true,
                size: 24,
                font: 'Calibri'
              })
            ]
          }),
          new docx.Paragraph({
            children:[
              new docx.TextRun({
                text: `OFF THE RECORD TIME: `,
                color: '000000',
                bold: true,
                size: 24,
                font: 'Calibri'
              })
            ]
          }),
          new docx.Paragraph({
            children:[
              new docx.TextRun({
                text: `READ or WAIVE: ${readWaive}`,
                color: '000000',
                bold: true,
                size: 24,
                font: 'Calibri'
              })
            ]
          }),
          new docx.Paragraph({
            children:[
              new docx.TextRun({
                text: `EXHIBITS: ${renderExhibitsList(confirmExhibits, exhibits)}`,
                color: 'FF0000',
                bold: true,
                size: 24,
                font: 'Calibri'
              })
            ]
          }),
          new docx.Paragraph({
            children:[
              new docx.TextRun({
                text: `EXHIBITS BEING SENT TO TRANSCRIPTS@COURTSCRIBES.COM: ${exhibitsSent}`,
                color: 'FF0000',
                bold: true,
                size: 24,
                font: 'Calibri'
              })
            ]
          }),
          new docx.Paragraph({
            children:[
              new docx.TextRun({
                text: `TRANSCRIPT(S) ORDERED: ${transOrdered}`,
                color: '00AA00',
                bold: true,
                size: 24,
                font: 'Calibri'
              }),
            ]
          }),
          new docx.Paragraph({
            children:[
              new docx.TextRun({
                text: `DELIVERY SPEED: ${deliverySpeed}`,
                color: '00AA00',
                bold: true,
                size: 24,
                font: 'Calibri'
              }),
            ]
          }),
          new docx.Paragraph({
            children:[
              new docx.TextRun({
                text: `VIDEO ORDERED: ${videoOrdered}`,
                color: '00AA00',
                bold: true,
                size: 24,
                font: 'Calibri'
              }),
            ]
          }),
          new docx.Paragraph({
            children:[
              new docx.TextRun({
                text: `NAMES OF ATTORNEY(S) WHO ORDERED: ${originalOrder}`,
                color: '00AA00',
                bold: true,
                size: 24,
                font: 'Calibri'
              }),
            ]
          }),
          new docx.Paragraph({
            children:[
              new docx.TextRun({
                text: `INCLUDE ANY ISSUES THAT OPERATIONS SHOULD KNOW (CONTINUE ON SECOND PAGE): `,
                color: '000000',
                bold: true,
                size: 24,
                font: 'Calibri'
              }),
            ]
          }),
          new docx.Paragraph({
            children: [
              new docx.ImageRun({
                data: fs.readFileSync('utils/images/CSHeader.jpeg'),
                transformation: {
                  width: 300,
                  height: 100
                },
                floating: {
                  horizontalPosition: {
                    align: docx.HorizontalPositionAlign.CENTER
                  },
                  verticalPosition: {
                    relative: docx.VerticalPositionRelativeFrom.BOTTOM_MARGIN,
                    align: docx.VerticalPositionAlign.BOTTOM
                  }
                }
              })
            ]
          }),
        ]
      }
    ]
  })

  docx.Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("Test_Doc.docx", buffer)
  })
}

export default generateRCF;