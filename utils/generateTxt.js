function renderPlaintiffInfo(plaintiffInfo, plaintiffName, plaintiffLawFirm, plaintiffAddress,
  plaintiffNumber, plaintiffEmail) {

  if (plaintiffInfo === true) {
    return `PLAINTIFF ATTORNEY
ATTORNEY NAME: ${plaintiffName}
LAW FIRM: ${plaintiffLawFirm}
LAW FIRM ADDRESS: ${plaintiffAddress}
TELEPHONE NUMBER: ${plaintiffNumber}
EMAIL: ${plaintiffEmail}
REPRESENTING: (IF MORE THAN ONE PLAINTIFF)`
  }
  else {
    return `PLAINTIFF ATTORNEY
ATTORNEY NAME: 
LAW FIRM: 
LAW FIRM ADDRESS: 
TELEPHONE NUMBER: 
EMAIL: 
REPRESENTING: (IF MORE THAN ONE PLAINTIFF)`
  }
}

function renderExhibitsList(confirmExhibits, exhibits) {
  if (confirmExhibits === true) {
    let exhibitsList = exhibits.split(',').map(function(item){
      return item.trim();
    })
    let tradList = '';

    for (let i = 0; i <= exhibitsList.length - 1; i++) {
      tradList += (i+1) + ' - ' + exhibitsList[i] + '\n';
    }

    return `${tradList}`
  }
}

function renderProperInfo(jobType, jobNumber, date, scheduledTime, video, idCheck) {
  if (jobType === 'Hearing') {
    return `CS JOB #: ${jobNumber}
DATE: ${date}
SCHEDULED TIME: ${scheduledTime}
JOB TYPE: ${jobType}
VIDEO JOB: NO
ID CHECKED: N/A` 
  }
  return `CS JOB #: ${jobNumber}
DATE: ${date}
SCHEDULED TIME: ${scheduledTime}
JOB TYPE: ${jobType}
VIDEO JOB: ${video}
ID CHECKED: ${idCheck}`
}

function renderReadWaive(jobType, readWaive, contactRead, directExam, crossExam, 
reDirect, certQuestions, transOrdered, orderTime, originalOrder, deliverySpeed, 
copyOrder, videoOrdered, videoAttny, exhibitsSent, retainAttny) {
  if (jobType === 'Hearing') {
    return `READ OR WAIVE: N/A
CONTACT EMAIL (IF READ): N/A

EXAMINATIONS:
DIRECT EXAMINATION: N/A
CROSS EXAMINATION: N/A
RE-DIRECT EXAMINATION: N/A
RE-CROSS EXAMINATION: N/A
(add more if questioning goes further)
  
CERTIFIED QUESTIONS?: N/A
  
TRANSCRIPT ORDER: N/A
IF ORDERED: 
ORDER ON THE RECORD TIMESTAMP: N/A
WHO ORDERED ORIGINAL? (O+1): N/A
DELIVERY SPEED: N/A
COPY ORDER(S): N/A

VIDEO ORDER: N/A
ORDER NOTES: (i.e. requests for physical copies or cost quotes)

IF EXHIBITS WERE MARKED (MUST HAVE EXHIBIT LIST IN NOTES SECTION):
ARE THE EXHIBITS BEING SENT TO TRANSCRIPTS@COURTSCIBES.COM? N/A
IF NOT, ATTORNEY NAME OF WHO RETAINED EXHIBITS: N/A`
    }
    return `READ OR WAIVE: ${readWaive}
CONTACT EMAIL (IF READ): ${contactRead}

EXAMINATIONS:
DIRECT EXAMINATION: ${directExam}
CROSS EXAMINATION: ${crossExam}
RE-DIRECT EXAMINATION: ${reDirect}
RE-CROSS EXAMINATION: (ATTORNEY NAME)
(add more if questioning goes further)

CERTIFIED QUESTIONS?: ${certQuestions}

TRANSCRIPT ORDER: ${transOrdered}
IF ORDERED: 
ORDER ON THE RECORD TIMESTAMP: ${orderTime}
WHO ORDERED ORIGINAL? (O+1): ${originalOrder}
DELIVERY SPEED: ${deliverySpeed}
COPY ORDER(S): ${copyOrder}

VIDEO ORDER: ${videoOrdered} - ${videoAttny}
ORDER NOTES: (i.e. requests for physical copies or cost quotes)

IF EXHIBITS WERE MARKED (MUST HAVE EXHIBIT LIST IN NOTES SECTION):
ARE THE EXHIBITS BEING SENT TO TRANSCRIPTS@COURTSCIBES.COM? ${exhibitsSent}
IF NOT, ATTORNEY NAME OF WHO RETAINED EXHIBITS: ${retainAttny}`
}

const generateTxtFile = courtScribesData => {
  // destructure the object for the sake of simplicity in coding
  const {jobNumber, date, scheduledTime, jobType, video, idCheck, witness, caseName,
  caseNumber, onTime, offTime, plaintiffInfo, plaintiffName, plaintiffLawFirm, plaintiffAddress,
  plaintiffNumber, plaintiffEmail, defenseName, defenseLawFirm, defenseAddress, 
  defenseNumber, defenseEmail, readWaive, contactRead, directExam, crossExam, reDirect,
  certQuestions, transOrdered, orderTime, originalOrder, deliverySpeed, copyOrder, 
  videoOrdered, videoAttny, confirmExhibits, exhibits, exhibitsSent, retainAttny} = courtScribesData;

  return `${renderProperInfo(jobType, jobNumber, date, scheduledTime, video, idCheck)}

WITNESS NAME (or JUDGE'S NAME if hearing): ${witness}
CASE NAME: ${caseName}
CASE #: ${caseNumber}
*****************************************************************************************************************
EXHIBIT LIST: 
(running list of marked exhibits w/# or letter and short description. Differentiate plaintiff or defense if both are used)
${renderExhibitsList(confirmExhibits, exhibits)}


CORRECT SPELLINGS:
(any proper names that might be difficult to spell or find online. Ask at end of depo for clarifications)




NOTES: 
(ANY AND ALL ISSUES THAT WE SHOULD BE AWARE OF, i.e. TECHNICAL ISSUES, ATTORNEY/WITNESS ISSUES)



ON/OFF RECORD TIMES: (MUST HAVE AT LEAST START AND END OF JOB. IT IS HELPFUL TO HAVE FULL LIST)
ON: ${onTime}
OFF: ${offTime}

APPEARANCES (COPY/PASTE FOR ADDITIONAL ATTORNEYS)

THE FOLLOWING SECTION MUST BE FILLED OUT COMPLETELY:

${renderPlaintiffInfo(plaintiffInfo, plaintiffName, plaintiffLawFirm, plaintiffAddress,
  plaintiffNumber, plaintiffEmail)}

DEFENSE ATTORNEY
ATTORNEY NAME: ${defenseName}
LAW FIRM: ${defenseLawFirm}
LAW FIRM ADDRESS: ${defenseAddress}
TELEPHONE NUMBER: ${defenseNumber}
EMAIL: ${defenseEmail}
REPRESENTING: (IF MORE THAN ONE DEFENDANT)

ANYONE ELSE THAT WAS PRESENT 
(MUST GET ALL NAMES UNLESS IT IS A CALENDAR HEARING WHERE OTHER PEOPLE ARE PRESENT FOR MULTIPLE HEARINGS)


*******************************************************************************************************************
${renderReadWaive(jobType, readWaive, contactRead, directExam, crossExam, 
reDirect, certQuestions, transOrdered, orderTime, originalOrder, deliverySpeed, 
copyOrder, videoOrdered, videoAttny, exhibitsSent, retainAttny)}
`
}

export default generateTxtFile