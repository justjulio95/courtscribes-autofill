const inquirer = require('inquirer')
// import fs from 'fs';
const fs = require('fs')
const path = require('path')
const desktop = path.join(require('os').homedir(), 'Desktop') // this finds the path to a desktop, regardless of operating system.
// import generateTxtFile from './utils/generateTxt.js';
const generateTxtFile = require('./utils/generateTxt')
// import generateRCF from './utils/generateRCF.js'
const generateRCF = require('./utils/generateRCF')
const log = console.log;
//throughout this code the WHEN function will be used to filter out some unnecessary questions.

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
    },
    {
      type: 'input',
      name: 'jobNumber',
      message: 'CourtScribes Job number: ',
      validate: reqNum => {
        if (reqNum) return true;
        log('\nPlease provide a job number')
      },
    },
    {
      type: 'input',
      name: 'date',
      message: "Date: ",
      validate: reqDate => {
        if (reqDate) return true;
        log('\nPlease provide the date');
      },
    },
    {
      type: 'input',
      name: 'scheduledTime',
      message: 'Scheduled Time: ',
      validate: reqTime => {
        if (reqTime) return true;
        log('\nPlease provide the scheduled time.')
      },
    },
    {
      type: 'list',
      name: 'jobType',
      message: 'Job Type: ',
      choices: ['Hearing', 'Deposition', 'EUO'],
    },
    {
      type: 'list',
      name: 'video',
      message: 'Is this a video job?',
      choices: ['Yes', 'No'],
      when: (answers) => answers.jobType !== 'Hearing'
    },
    {
      type: 'list',
      name: 'idCheck',
      message: 'Have you checked the ID of the witness? (Select N/A if this is a HEARING)',
      choices: ['Yes', 'No', 'N/A'],
      when: (answers) => answers.jobType !== 'Hearing'
    },
    {
      type: 'input',
      name: 'witness',
      message: "Witness name or Judge's name: ",
      validate: reqWit => {
        if (reqWit) return true;
        log('\nPlease provide a name for the witness/Judge')
      },
    },
    {
      type: 'input',
      name: 'caseName',
      message: 'Case name: ',
      validate: reqCaseName => {
        if (reqCaseName) return true;
        log('\nPlease provide the case name')
      },
    },
    {
      type: 'input',
      name: 'caseNumber',
      message: 'Case number: ',
      validate: reqCaseNum => {
        if (reqCaseNum) return true
      },
    },
    {
      type: 'input',
      name: 'onTime',
      message: 'What time did you get on the record? ',
      validate: reqOnTime => {
        if (reqOnTime) return true;
        log('\nPlease provide the on the record time.')
      },
    },
    {
      type: 'input',
      name: 'offTime',
      message: 'What time did you get off the record? ',
      validate: reqOffTime => {
        if (reqOffTime) return true;
        log('\nPlease provide the off the record time.')
      },
    },
    {
      type: 'confirm',
      name: 'plaintiffInfo',
      message: "Do you have the plaintiff attorneys information?",
    },
    {
      type: 'input',
      name: 'plaintiffName',
      message: 'Plaintiff Attorneys Name: ',
      when: (answers) => answers.plaintiffInfo === true,
      validate: reqPlainName => {
        if (reqPlainName)return true
      },
    },
    {
      type: 'input',
      name: 'plaintiffLawFirm',
      message: 'Plaintiff Law Firm (if info is available): ',
      when: (answers) => answers.plaintiffInfo === true,
    },
    {
      type: 'input',
      name: 'plaintiffAddress',
      message: 'Address: ',
      when: (answers) => answers.plaintiffInfo === true,
      validate: reqAddress => {
        if (reqAddress) return true
      },
    },
    {
      type: 'input',
      name: 'plaintiffNumber',
      message: 'Telephone Number: ',
      when: (answers) => answers.plaintiffInfo === true,
      validate: reqPlainNum => {
        if (reqPlainNum) return true
      },
    },
    {
      type: 'input',
      name: 'plaintiffEmail',
      message: "Plaintiff's email: ",
      when: (answers) => answers.plaintiffInfo === true,
      validate: reqEmail => {
        if (reqEmail) return true
      },
    },
    {
      type: 'input',
      name: 'defenseName',
      message: 'Defense Attorneys Name: ',
      validate: reqDefName => {
        if (reqDefName)return true;
        log('\nPlease provide the defense attorneys name.')
      },
    },
    {
      type: 'input',
      name: 'defenseLawFirm',
      message: 'Defense Law Firm (if info is available): ',
    },
    {
      type: 'input',
      name: 'defenseAddress',
      message: 'Address: ',
      validate: reqAddress => {
        if (reqAddress) return true;
        log('\nPlease provide the address')
      },
    },
    {
      type: 'input',
      name: 'defenseNumber',
      message: 'Telephone Number: ',
      validate: reqDefNum => {
        if (reqDefNum) return true
        log('\nPlease provide the phone number')
      },
    },
    {
      type: 'input',
      name: 'defenseEmail',
      message: "Defense's email: ",
      validate: reqEmail => {
        if (reqEmail) return true
      },
    },
    {
      type: 'list',
      name: 'readWaive',
      message: 'Will the witness read or waive? (N/A if HEARING) ',
      choices: ['Read', 'Waive', 'N/A'],
      when: (answers) => answers.jobType !== 'Hearing',
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
    },
    {
      type: 'input',
      name: 'crossExam',
      message: 'Who did cross examination? ',
      when: (answers) => answers.jobType !== 'Hearing',
    },
    {
      type: 'input',
      name: 'reDirect',
      message: 'Who did re-direct examination? ',
      when: (answers) => answers.jobType !== 'Hearing',
    },
    {
      type: 'confirm',
      name: 'certQuestions',
      message: 'Are there certified questions?',
      when: (answers) => answers.jobType !== 'Hearing',
    },
    {
      type: 'confirm',
      name: 'transOrdered',
      message: 'Was the transcript ordered?',
      when: (answers) => answers.jobType !== 'Hearing',
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
      
    },
    {
      type: 'input',
      name: 'exhibits',
      message: 'Please provide all the exhibits separated by a comma (EXAMPLE: Exhibit 1, Exhibit 2, ..., Exhibit 5): ',
      when: (answers) => answers.confirmExhibits === true,
    },
    {
      type: 'confirm',
      name: 'exhibitsSent',
      message: 'Are the exhibits being sent?',
      when: (answers) => answers.jobType !== 'Hearing' && answers.confirmExhibits === true,
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
  generateRCF(courtScribesData);
  return generateTxtFile(courtScribesData);
})
.then(data => {
  fs.writeFile(path.join(desktop, `./${data.slice(10,15)}.txt`), data, err => {
    if(err) throw Error(err)
    log('Text file and RCF made successfully! Happy scribing!')
  })
})