import utils from './utils'
import one from './days/1'
import two from './days/2'
import three from './days/3'

const { logColors: { FgRed, FgCyan } } = utils

const PUZZLES = [
  'firstPuzzle',
  'secondPuzzle'
]

const DAYS = {
  1: one,
  2: two,
  3: three,
}

const [,, day, puzzle] = process.argv

if (!day || !Object.keys(DAYS).includes(day)) {
  console.error(FgRed, `Day should be one of ${Object.keys(DAYS)}`)
  process.exit(0)
}

if (!puzzle || !PUZZLES.includes(puzzle)) {
  console.error(FgRed, `Puzzle should be one of ${PUZZLES}`)
  process.exit(0)
}

if (!DAYS[day]) {
  console.error(FgRed, `This day has not yet been developed!`)
  process.exit(0)
}

if (!DAYS[day][puzzle]) {
  console.error(FgRed, `This puzzle has not yet been developed!`)
  process.exit(0)
}

console.log(FgCyan, `Result: ${DAYS[day][puzzle]()}`)