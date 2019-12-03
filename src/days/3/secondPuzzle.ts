import input from './input.json'
const GRID_WIDTH_LENGTH = 1999
const GRID_CENTER = 999 - 1

const UP = 'U'
const DOWN = 'D'
const LEFT = 'L'
const RIGHT = 'R'

function getDirectionSteps(instruction) {
  const direction = instruction.slice(0, 1)
  const steps = Number(instruction.slice(1))
  return [direction, steps]
}

function createGrid() {
  return Array(GRID_WIDTH_LENGTH)
    .fill(Array(GRID_WIDTH_LENGTH).fill('.'))
}

function displayGrid(grid) {
  grid.forEach(line => { console.log(line.reduce((acc, node) => `${acc} ${node}`)) })
}

function modifyGrid(grid, x, y, value) {
  return grid.map((xLine, yIndex) => {
    if (yIndex === y) {
      return xLine.map((node, xIndex) => {
        if (xIndex === x) return value
        return node
      })
    }
    return xLine
  })
}

function oneDirection(grid, currentX, currentY, direction, stepsLeft, stepHistory, modification) {
  if (stepsLeft === 0) return [grid, currentX, currentY, stepHistory];
  if ([UP, DOWN].includes(direction)) {
    const newY = direction === DOWN ? currentY + 1 : currentY - 1;
    const newGrid = modifyGrid(grid, currentX, newY, modification)
    stepHistory.push(`${currentX},${newY}`)
    return oneDirection(newGrid, currentX, newY, direction, stepsLeft - 1, stepHistory, modification)
  }
  const newX = direction === RIGHT ? currentX + 1 : currentX - 1;
  const newGrid = modifyGrid(grid, newX, currentY, modification)
  stepHistory.push(`${newX},${currentY}`)
  return oneDirection(newGrid, newX, currentY, direction, stepsLeft - 1, stepHistory, modification)
}

function move(grid, instructions, modification, currentX = GRID_CENTER, currentY = GRID_CENTER, stepHistory = []) {
  if (!instructions.length) return [grid, stepHistory]
  const instruction = instructions.shift()
  const [direction, steps] = getDirectionSteps(instruction);
  ([grid, currentX, currentY, stepHistory] = oneDirection(grid, currentX, currentY, direction, steps, stepHistory, modification))
  return move(grid, instructions, modification,  currentX, currentY, stepHistory)
}

function findMatches(history1, history2) {
  const steps = []
  history1.forEach((step1, index1) => {
    history2.some((step2, index2) => {
      if (step1 === step2) {
        steps.push((index1 + 1) + (index2 + 1))
        return true;
      }
      return false;
    })
  })
  return steps
}

function findLeastSteps(matches) {
  return matches.reduce((leastSteps, steps) => {
    if (!leastSteps) return steps
    return leastSteps > steps ? steps : leastSteps
  }, null)
}

function run() {
  let grid = createGrid()
  grid = modifyGrid(grid, GRID_CENTER, GRID_CENTER, 'O')
  const [instructions1, instructions2] = input
  const [grid1, stepHistory1] = move(grid, instructions1, '1')
  const [grid2, stepHistory2] = move(grid1, instructions2, '2')
  console.log('history1', stepHistory1)
  console.log('history2', stepHistory2)
  const matches = findMatches(stepHistory1, stepHistory2)
  console.log('matches', matches)
  // displayGrid(grid2)
  return findLeastSteps(matches)
}

export default run