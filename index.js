import inquirer from 'inquirer';
import fs from 'fs'
import generateTxtFile from './utils/generateTxt.js';
import generateRCF from './utils/generateRCF.js'
const log = console.log;
// throughout this code the WHEN function will be used to filter out some unnecessary questions.

const promptReporter = () => {
  // a slew of initial questions for the forms that need to be filled out. 
  return inquirer.prompt([
    {
      type: 'input',
      name: 'reporterName',
      message: 'Enter your name: ',
      validate: reqName => {
        if (reqName) return true;
        log('\nPlease provide your name')
      },
      default: "Julio"
    },
    {
      type: 'input',
      name: 'jobNumber',
      message: 'CourtScribes Job number: ',
      validate: reqNum => {
        if (reqNum) return true;
        log('\nPlease provide a job number')
      },
      default: '12345'
    },
    {
      type: 'input',
      name: 'date',
      message: "Date: ",
      validate: reqDate => {
        if (reqDate) return true;
        log('\nPlease provide the date');
      },
      default: 'TODAY' 
    },
    {
      type: 'input',
      name: 'scheduledTime',
      message: 'Scheduled Time: ',
      validate: reqTime => {
        if (reqTime) return true;
        log('\nPlease provide the scheduled time.')
      },
      default: 'NOW'
    },
    {
      type: 'list',
      name: 'jobType',
      message: 'Job Type: ',
      choices: ['Hearing', 'Deposition', 'EUO'],
      default: 'EUO'
    },
    {
      type: 'confirm',
      name: 'video',
      message: 'Is this a video job?',
      when: (answers) => answers.jobType !== 'Hearing',
      default: false
    },
    {
      type: 'list',
      name: 'idCheck',
      message: 'Have you checked the ID of the witness? (Select N/A if this is a HEARING)',
      choices: ['Yes', 'No', 'N/A'],
      default: 'No'
    },
    {
      type: 'input',
      name: 'witness',
      message: "Witness name or Judge's name: ",
      validate: reqWit => {
        if (reqWit) return true;
        log('\nPlease provide a name for the witness/Judge')
      },
      default: 'Some Guy'
    },
    {
      type: 'input',
      name: 'caseName',
      message: 'Case name: ',
      validate: reqCaseName => {
        if (reqCaseName) return true;
        log('\nPlease provide the case name')
      },
      default: 'A v. B'
    },
    {
      type: 'input',
      name: 'caseNumber',
      message: 'Case number: ',
      validate: reqCaseNum => {
        if (reqCaseNum) return true
      },
      default: 'ABC11345'
    },
    {
      type: 'input',
      name: 'onTime',
      message: 'What time did you get on the record? ',
      validate: reqOnTime => {
        if (reqOnTime) return true;
        log('\nPlease provide the on the record time.')
      },
      default: 'NOW'
    },
    {
      type: 'input',
      name: 'offTime',
      message: 'What time did you get off the record? ',
      validate: reqOffTime => {
        if (reqOffTime) return true;
        log('\nPlease provide the off the record time.')
      },
      default: 'LATER'
    },
    {
      type: 'confirm',
      name: 'plaintiffInfo',
      message: "Do you have the plaintiff attorneys information?",
      default: true
    },
    {
      type: 'input',
      name: 'plaintiffName',
      message: 'Plaintiff Attorneys Name: ',
      when: (answers) => answers.plaintiffInfo === true,
      validate: reqPlainName => {
        if (reqPlainName)return true
      },
      default: 'Jessica'
    },
    {
      type: 'input',
      name: 'plaintiffLawFirm',
      message: 'Plaintiff Law Firm (if info is available): ',
      when: (answers) => answers.plaintiffInfo === true,
      default: 'Bass LLC'
    },
    {
      type: 'input',
      name: 'plaintiffAddress',
      message: 'Address: ',
      when: (answers) => answers.plaintiffInfo === true,
      validate: reqAddress => {
        if (reqAddress) return true
      },
      default: 'IGWIECVKWEC'
    },
    {
      type: 'input',
      name: 'plaintiffNumber',
      message: 'Telephone Number: ',
      when: (answers) => answers.plaintiffInfo === true,
      validate: reqPlainNum => {
        if (reqPlainNum) return true
      },
      default: "3051234567"
    },
    {
      type: 'input',
      name: 'plaintiffEmail',
      message: "Plaintiff's email: ",
      when: (answers) => answers.plaintiffInfo === true,
      validate: reqEmail => {
        if (reqEmail) return true
      },
      default: 'test@test.com'
    },
    {
      type: 'input',
      name: 'defenseName',
      message: 'Defense Attorneys Name: ',
      validate: reqDefName => {
        if (reqDefName)return true;
        log('\nPlease provide the defense attorneys name.')
      },
      default: 'Roberto'
    },
    {
      type: 'input',
      name: 'defenseLawFirm',
      message: 'Defense Law Firm (if info is available): ',
      default: 'Lopez LLC'
    },
    {
      type: 'input',
      name: 'defenseAddress',
      message: 'Address: ',
      validate: reqAddress => {
        if (reqAddress) return true;
        log('\nPlease provide the address')
      },
      default: 'ibiucbevr'
    },
    {
      type: 'input',
      name: 'defenseNumber',
      message: 'Telephone Number: ',
      validate: reqDefNum => {
        if (reqDefNum) return true
        log('\nPlease provide the phone number')
      },
      default: '7861234567'
    },
    {
      type: 'input',
      name: 'defenseEmail',
      message: "Defense's email: ",
      validate: reqEmail => {
        if (reqEmail) return true
      },
      default: 'bull@wait.com'
    },
    {
      type: 'list',
      name: 'readWaive',
      message: 'Will the witness read or waive? (N/A if HEARING) ',
      choices: ['Read', 'Waive', 'N/A'],
      when: (answers) => answers.jobType !== 'Hearing',
      default: 'Waive'
    },
    {
      type: 'input',
      name: 'contactRead',
      message: 'Contact email: (if READ) ',
      when: (answers) => answers.jobType !== 'Hearing' && answers.readWaive === 'Read'
    },
    {
      type: 'input',
      name: 'directExam',
      message: 'Who did direct examination? ',
      when: (answers) => answers.jobType !== 'Hearing',
      validate: reqDirEx => {
        if (reqDirEx) return true
      },
      default: 'Roberto'
    },
    {
      type: 'input',
      name: 'crossExam',
      message: 'Who did cross examination? ',
      when: (answers) => answers.jobType !== 'Hearing',
      default: 'meh'
    },
    {
      type: 'input',
      name: 'reDirect',
      message: 'Who did re-direct examination? ',
      when: (answers) => answers.jobType !== 'Hearing',
      default: 'roberto'
    },
    {
      type: 'confirm',
      name: 'certQuestions',
      message: 'Are there certified questions?',
      when: (answers) => answers.jobType !== 'Hearing',
      default: false
    },
    {
      type: 'confirm',
      name: 'transOrdered',
      message: 'Was the transcript ordered?',
      when: (answers) => answers.jobType !== 'Hearing',
      default: false
    },
    {
      type: 'input',
      name: 'orderTime',
      message: 'Order on the record timestamp: ',
      when: (answers) => answers.jobType !== 'Hearing' && answers.transOrdered === true
    },
    {
      type: 'input',
      name: 'originalOrder',
      message: 'Who ordered the original?',
      when: (answers) => answers.jobType !== 'Hearing' && answers.transOrdered === true
    },
    {
      type: 'list',
      name: 'deliverySpeed',
      message: 'Delivery Speed?',
      choices: ['Regular (7-10 business days', 'Expedited (3 business days', 'Daily (next business day)'],
      when: (answers) => answers.jobType !== 'Hearing' && answers.transOrdered === true
    },
    {
      type: 'input',
      name: 'copyOrder',
      message: 'Who ordered the copy?',
      when: (answers) => answers.jobType !== 'Hearing' && answers.transOrdered === true
    },
    {
      type: 'confirm',
      name: 'videoOrdered',
      message: 'Was the video ordered?',
      when: (answers) => answers.jobType !== 'Hearing',
      default: 'false'
    },
    {
      type: 'input',
      name: 'videoAttny',
      message: 'Who ordered the video? ',
      when: (answers) => answers.jobType !== 'Hearing' && answers.videoOrdered === true
    },
    {
      type: 'confirm',
      name: 'confirmExhibits',
      message: 'Were there any exhibits?',
      when: (answers) => answers.jobType !== 'Hearing',
      default: true
    },
    {
      type: 'input',
      name: 'exhibits',
      message: 'Please provide all the exhibits separated by a comma (EXAMPLE: Exhibit 1, Exhibit 2, ..., Exhibit 5): ',
      when: (answers) => answers.confirmExhibits === true,
      default: 'x1,     x2,                     x3'
    },
    {
      type: 'confirm',
      name: 'exhibitsSent',
      message: 'Are the exhibits being sent?',
      when: (answers) => answers.jobType !== 'Hearing' && answers.confirmExhibits === true,
      default: true
    },
    {
      type: 'input',
      name: 'retainAttny',
      message: 'Name of the attorney retaining exhibits: ',
      when: (answers) => answers.jobType !== 'Hearing' && answers.exhibitsSent === false
    }
  ])
}

promptReporter()
.then(courtScribesData => {
  // feeds the data from the users input into the generateTxt file to begin creating the .txt file.
  return generateTranscriptOrder(courtScribesData);
})
// .then(data => {
//    fs.writeFile(`./notepad.txt`, data, err => {
//      if (err) throw Error(err)
//   })
// })