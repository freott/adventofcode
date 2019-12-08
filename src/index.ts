import fs from 'fs'
import utils from './utils'
const { logColors: { FgRed, FgCyan } } = utils

async function run() {
  const DAYS = {}
  await new Promise(resolve => {
    fs.readdir('./src/days', null, (error, dayFolders) => {
      dayFolders.forEach(dayFolder => {
        DAYS[dayFolder] = require(`./days/${dayFolder}`)
      })
      resolve()
    })
  })
  
  const PUZZLES = [
    'firstPuzzle',
    'secondPuzzle'
  ]
  
  const [,, day, puzzle] = process.argv
  
  if (!day) {
    console.error(FgRed, `Please provide day as first argument, should be one of ${Object.keys(DAYS)}`)
    process.exit(0)
  }
  
  if (!puzzle || !PUZZLES.includes(puzzle)) {
    console.error(FgRed, `Please provide puzzle as second argument, should be one of ${PUZZLES}`)
    process.exit(0)
  }
  
  if (!DAYS[day]) {
    console.error(FgRed, `This day has not yet been developed`)
    process.exit(0)
  }
  
  if (!DAYS[day][puzzle]) {
    console.error(FgRed, `This puzzle has not yet been developed`)
    process.exit(0)
  }
  
  console.time('run')
  console.log(FgCyan, `Result: ${DAYS[day][puzzle]()}`)
  console.timeEnd('run')
}

run()