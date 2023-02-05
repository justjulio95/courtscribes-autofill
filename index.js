import inquirer from "inquirer";
import fs from "fs"
const log = console.log;

const promptReporter = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'jobNumber',
      message: 'CourtScribes Job number: ',
      validate: reqNum => {
        if (reqNum) return true;
        log('\nPlease provide a job number')
      }
    },
    {
      type: 'input',
      name: 'date',
      message: "Date: ",
      validate: reqDate => {
        if (reqDate) return true;
        log('\nPlease provide the date');
      }
    },
    {
      type: 'input',
      name: 'scheduledTime',
      message: 'Scheduled Time: ',
      validate: reqTime => {
        if (reqTime) return true;
        log('\nPlease provide the scheduled time.')
      }
    },
    {
      type: 'list',
      name: 'jobType',
      message: 'Job Type: ',
      choices: ['Hearing', 'Deposition', 'EUO']
    },
    {
      type: 'confirm',
      name: 'video',
      message: 'Is this a video job?'
    },
    {
      type: 'list',
      name: 'idCheck',
      message: 'Have you checked the ID of the witness? (Select N/A if this is a HEARING)',
      choices: ['Yes', 'No', 'N/A']
    },
    {
      type: 'input',
      name: 'witness',
      message: "Witness name or Judge's name: ",
      validate: reqWit => {
        if (reqWit) return true;
        log('\nPlease provide a name for the witness/Judge')
      }
    },
    {
      type: 'input',
      name: 'caseName',
      message: 'Case name: ',
      validate: reqCaseName => {
        if (reqCaseName) return true;
        log('\nPlease provide the case name')
      }
    },
    {
      type: 'input',
      name: 'onTime',
      message: 'What time did you get on the record? ',
      validate: reqOnTime => {
        if (reqOnTime) return true;
        log('\nPlease provide the on the record time.')
      }
    },
    {
      type: 'input',
      name: 'offTime',
      message: 'What time did you get off the record? ',
      validate: reqOffTime => {
        if (reqOffTime) return true;
        log('\nPlease provide the off the record time.')
      }
    },
    {
      type: 'input',
      name: 'plaintiffName',
      message: 'Plaintiff Attorneys Name: ',
      validate: reqPlainName => {
        if (reqPlainName)return true
      }
    },
    {
      type: 'input',
      name: 'plaintiffLawFirm',
      message: 'Plaintiff Law Firm (if info is available): '
    },
    {
      type: 'input',
      name: 'plaintiffAddress',
      message: 'Address: ',
      validate: reqAddress => {
        if (reqAddress) return true
      }
    },
    {
      type: 'input',
      name: 'plaintiffNumber',
      message: 'Telephone Number: ',
      validate: reqPlainNum => {
        if (reqPlainNum) return true
      }
    },
    {
      type: 'input',
      name: 'plaintiffEmail',
      message: "Plaintiff's email: ",
      validate: reqEmail => {
        if (reqEmail) return true
      }
    },
    {
      type: 'input',
      name: 'defenseName',
      message: 'Defense Attorneys Name: ',
      validate: reqPlainName => {
        if (reqPlainName)return true
      }
    },
    {
      type: 'input',
      name: 'defenseLawFirm',
      message: 'Defense Law Firm (if info is available): '
    },
    {
      type: 'input',
      name: 'defenseAddress',
      message: 'Address: ',
      validate: reqAddress => {
        if (reqAddress) return true
      }
    },
    {
      type: 'input',
      name: 'defenseNumber',
      message: 'Telephone Number: ',
      validate: reqPlainNum => {
        if (reqPlainNum) return true
      }
    },
    {
      type: 'input',
      name: 'defenseEmail',
      message: "Defense's email: ",
      validate: reqEmail => {
        if (reqEmail) return true
      }
    },
    {
      type: 'list',
      name: 'readWaive',
      message: 'Will the witness read or waive? (N/A if HEARING) ',
      choices: ['Yes', 'No', 'N/A']
    },
    {
      type: 'input',
      name: 'contactRead',
      message: 'Contact email: (if READ) ',
    },
    {
      type: 'input',
      name: 'directExam',
      message: 'Who did direct examination? ',
      validate: reqDirEx => {
        if (reqDirEx) return true
      }
    },
    {
      type: 'input',
      name: 'crossExam',
      message: 'Who did cross examination? ',
    },
    {
      type: 'input',
      name: 'reDirect',
      message: 'Who did re-direct examination? ',
    },
    {
      type: 'confirm',
      name: 'certQuestions',
      message: 'Are there certified questions?'
    },
    {
      type: 'confirm',
      name: 'transOrdered',
      message: 'Was the transcript ordered?'
    },
    {
      type: 'input',
      name: 'orderTime',
      message: 'Order on the record timestamp: ',
    },
    {
      type: 'input',
      name: 'originalOrder',
      message: 'Who ordered the original?'
    },
    {
      type: 'list',
      name: 'deliverySpeed',
      message: 'Delivery Speed?',
      choices: ['Regular (7-10 business days', 'Expedited (3 business days', 'Daily (next business day)']
    },
    {
      type: 'input',
      name: 'copyOrder',
      message: 'Who ordered the copy?'
    },
    {
      type: 'confirm',
      name: 'videoOrder',
      message: 'Was the video ordered?'
    },
    {
      type: 'input',
      name: 'videoAttny',
      message: 'Who ordered the video? '
    },
    {
      type: 'confirm',
      name: 'exhibitsSent',
      message: 'Are the exhibits being sent?'
    },
    {
      type: 'input',
      name: 'retainAttny',
      message: 'Name of the attorney retaining exhibits: '
    }
  ])
}

promptReporter()
.then(data => {
  log(data)
})