import docx from 'docx';
import * as fs from 'fs';

// use the docx package to develop the RCF file
const generateRCF = courtScribesData => {
  // destructure the object for the sake of simplicity in coding
  const {reporterName, jobNumber, date, scheduledTime, jobType, video, idCheck, witness, caseName,
  caseNumber, onTime, offTime, plaintiffInfo, plaintiffName, plaintiffLawFirm, plaintiffAddress,
  plaintiffNumber, plaintiffEmail, defenseName, defenseLawFirm, defenseAddress, 
  defenseNumber, defenseEmail, readWaive, contactRead, directExam, crossExam, reDirect,
  certQuestions, transOrdered, orderTime, originalOrder, deliverySpeed, copyOrder, 
  videoOrdered, videoAttny, confirmExhibits, exhibits, exhibitsSent, retainAttny} = courtScribesData;

  let doc = new docx.Document({
    sections: [
      {
        properties: {},
        children: [
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: 'REPORTER COMPLETION FORM',
                color: '000000',
                bold: true,
                size: 36,
                font: 'Calibri' 
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
        ]
      }
    ]
  })

  docx.Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("Test_Doc.docx", buffer)
  })
}

export default generateRCF;