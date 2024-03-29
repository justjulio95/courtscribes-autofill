// import docx from 'docx';
const docx = require('docx')
const fs = require('fs')
const path = require('path')
const csHeader = path.join(__dirname, './images/CSHeader.jpeg')
const desktop = path.join(require('os').homedir(), 'Desktop') // this finds the path to a desktop, regardless of operating system.

function renderReadWaive(readWaive) {
  if (readWaive === undefined) return `N/A`

  return `${readWaive}`
}

function renderExhibitsList(jobType, confirmExhibits, exhibits) {
  if (confirmExhibits === true) {
    let exhibitsList = exhibits.split(',').map(function(item){
      return item.trim();
    })
    let tradList = '';

    for (let i = 0; i <= exhibitsList.length - 1; i++) {
      tradList += (i+1) + ' - ' + exhibitsList[i] + '\t';
    }

    return `${tradList}`
  } else if (confirmExhibits === undefined){
    return '';
  }
}

function renderExhibitsSent(jobType, confirmExhibits, exhibitsSent) {
  if (confirmExhibits === true && exhibitsSent === true) {
    return `Yes`;
  } else if (confirmExhibits === true && exhibitsSent === false){
    return `No`
  } else if (confirmExhibits === false || jobType === 'Hearing') {
    return 'N/A'
  }
}

function renderTranscriptOrder(jobType, transOrdered) {
  if (jobType === 'Hearing') {
    return `N/A`
  } else if (jobType !== 'Hearing' && transOrdered === true) {
    return 'Yes'
  } else if (jobType !== 'Hearing' && transOrdered === false) {
    return 'No'
  }
}

function renderTranscriptDeliverySpeed(jobType, transOrdered, deliverySpeed) {
  if (jobType === 'Hearing') {
    return 'N/A'
  } else if (jobType !== 'Hearing' && transOrdered === false) {
    return `N/A`
  } else if (jobType !== 'Hearing' && transOrdered === true) {
    return `${deliverySpeed}`
  }
}

function renderVideoOrdered(videoOrdered) {
  if (videoOrdered === undefined) return `N/A`
  if (videoOrdered === true) return `Yes`
  if (videoOrdered === false) return `No`
}

function renderOriginalOrder(originalOrder){
  if (originalOrder === undefined) return `N/A`
  return `${originalOrder}`
}

// use the docx package to develop the RCF file
const generateRCF = courtScribesData => {
  // destructure the object for the sake of simplicity in coding
  const {reporterName, jobType, jobNumber, date, witness, caseName, caseNumber, onTime, offTime,
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
                data: fs.readFileSync(csHeader),
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
            spacing: {
              after: 500
            },
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
            spacing: {
              after: 300
            },
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
            spacing: {
              after: 300
            },
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
            spacing: {
              after: 300
            },
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
            spacing: {
              after: 300
            },
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
            spacing: {
              after: 300
            },
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
            spacing: {
              after: 300
            },
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
            spacing: {
              after: 300
            },
            children:[
              new docx.TextRun({
                text: `READ or WAIVE: ${renderReadWaive(readWaive)}`,
                color: 'FF0000',
                bold: true,
                size: 24,
                font: 'Calibri'
              })
            ]
          }),
          new docx.Paragraph({
            spacing: {
              after: 300
            },
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
            spacing: {
              after: 300
            },
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
            spacing: {
              after: 300
            },
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
            spacing: {
              after: 300
            },
            children:[
              new docx.TextRun({
                text: `READ or WAIVE: `,
                color: '000000',
                bold: true,
                size: 24,
                font: 'Calibri'
              })
            ]
          }),
          new docx.Paragraph({
            spacing: {
              after: 300
            },
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
            spacing: {
              after: 300
            },
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
            spacing: {
              after: 300
            },
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
            spacing: {
              after: 300
            },
            children:[
              new docx.TextRun({
                text: `READ or WAIVE: `,
                color: '000000',
                bold: true,
                size: 24,
                font: 'Calibri'
              })
            ]
          }),
          new docx.Paragraph({
            spacing: {
              after: 300
            },
            children:[
              new docx.TextRun({
                text: `EXHIBITS: ${renderExhibitsList(jobType, confirmExhibits, exhibitsSent)}`,
                color: 'FF0000',
                bold: true,
                size: 24,
                font: 'Calibri'
              })
            ]
          }),
          new docx.Paragraph({
            spacing: {
              after: 300
            },
            children:[
              new docx.TextRun({
                text: `EXHIBITS BEING SENT TO TRANSCRIPTS@COURTSCRIBES.COM: ${renderExhibitsSent(jobType, confirmExhibits)}`,
                color: 'FF0000',
                bold: true,
                size: 24,
                font: 'Calibri'
              })
            ]
          }),
          new docx.Paragraph({
            spacing: {
              after: 300
            },
            children:[
              new docx.TextRun({
                text: `TRANSCRIPT(S) ORDERED: ${renderTranscriptOrder(jobType, transOrdered)}`,
                color: '00AA00',
                bold: true,
                size: 24,
                font: 'Calibri'
              }),
            ]
          }),
          new docx.Paragraph({
            spacing: {
              after: 300
            },
            children:[
              new docx.TextRun({
                text: `DELIVERY SPEED: ${renderTranscriptDeliverySpeed(jobType, transOrdered, deliverySpeed)}`,
                color: '00AA00',
                bold: true,
                size: 24,
                font: 'Calibri'
              }),
            ]
          }),
          new docx.Paragraph({
            spacing: {
              after: 300
            },
            children:[
              new docx.TextRun({
                text: `VIDEO ORDERED: ${renderVideoOrdered(videoOrdered)}`,
                color: '00AA00',
                bold: true,
                size: 24,
                font: 'Calibri'
              }),
            ]
          }),
          new docx.Paragraph({
            spacing: {
              after: 300
            },
            children:[
              new docx.TextRun({
                text: `NAMES OF ATTORNEY(S) WHO ORDERED: ${renderOriginalOrder(originalOrder)}`,
                color: '00AA00',
                bold: true,
                size: 24,
                font: 'Calibri'
              }),
            ]
          }),
          new docx.Paragraph({
            spacing: {
              after: 300
            },
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
                data: fs.readFileSync(csHeader),
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
    fs.writeFileSync(path.join(desktop, `RCF_[${jobNumber}].docx`), buffer)
  })
}

// export default generateRCF;
module.exports = generateRCF