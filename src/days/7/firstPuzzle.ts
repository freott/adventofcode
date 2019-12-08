import input from './input.json'

function getModifiers(list: number[], modes: number[], firstPointer: number, secondPointer: number) {
  const firstValue = modes[0] === 1 ? firstPointer : list[firstPointer]
  const secondValue = modes[1] === 1 ? secondPointer : list[secondPointer]
  return [firstValue, secondValue]
} 

function runProgram(program: number[], input: number[], pointer = 0, previousInstruction = {}): number[] {
  if (pointer > program.length) throw Error(`Couldn't find an exit in program`)
  const instruction = program[pointer].toString().split('')
  const opcode = Number(instruction.splice(-2).reduce((opcodePart1: string, opCodePart2: string) => opcodePart1 + opCodePart2))
  const modes = instruction.map(Number).reverse()
  const [firstPointer, secondPointer, thirdPointer] = program.slice(pointer + 1, pointer + 4);
  const [firstValue, secondValue] = getModifiers(program, modes, firstPointer, secondPointer)
  
  let nextPointer
  switch (opcode) {
    case 1: {
      nextPointer = pointer + 4
      program[thirdPointer] = firstValue + secondValue
      break;
    }
    case 2: {
      nextPointer = pointer + 4
      program[thirdPointer] = firstValue * secondValue
      break;
    }
    case 3: {
      nextPointer = pointer + 2
      console.log('using input', input[0])
      program[firstPointer] = input.shift()
      break;
    }
    case 4: {
      nextPointer = pointer + 2
      console.log('Output instruction:', firstValue)
      if (firstValue !== 0 && program[nextPointer] !== 99) {
        console.log('Previous instruction:', JSON.stringify(previousInstruction, null, 2))
      }
      break;
    }
    case 5:
      nextPointer = pointer + 3
      if (firstValue !== 0) nextPointer = secondValue
      break;
    case 6:
      nextPointer = pointer + 3
      if (firstValue === 0) nextPointer = secondValue
      break;
    case 7:
      nextPointer = pointer + 4
      program[thirdPointer] = secondValue > firstValue ?  1 : 0
      break;
    case 8:
      nextPointer = pointer + 4
      program[thirdPointer] = secondValue === firstValue ?  1 : 0
      break;
    case 99:
      return previousInstruction['firstValue']
    default:
      throw Error(`opcode can only be 1, 2, 3, 4, 5, 6, 7, 8 or 99, found ${opcode}. Previous instruction: ${JSON.stringify(previousInstruction, null, 2)}`)
  }
  const instructionSummary = {
    instruction: program[pointer],
    opcode,
    modes,
    firstPointer,
    secondPointer,
    thirdPointer,
    firstValue,
    secondValue,
    target: thirdPointer,
    newTargetValue: program[thirdPointer]
  }
  return runProgram(program, input, nextPointer, instructionSummary)
}

function trimSequenze(sequenze, initialValue, pointer) {
  const trimmedSequenze = [...sequenze]
  trimmedSequenze[pointer] = initialValue
  return trimmedSequenze.slice(1)
}

function iterate(sequenze) {
  if (sequenze.length === 1) return [sequenze]
  let sequenzes = []
  const initialValue = sequenze[0]
  for (let pointer = 0; pointer < sequenze.length; pointer++) {
    const currentValue = sequenze[pointer]
    iterate(trimSequenze(sequenze, initialValue, pointer))
      .forEach(seq => {
        seq.unshift(currentValue)
        sequenzes.push(seq)
      })
  }
  return sequenzes
}

function getAllCombinations(minValue, maxValue) {
  const sequenze = []
  for (let i = minValue; i <= maxValue; i++) {
    sequenze.push(i)
  }

  const allCombinations = iterate(sequenze)
  return allCombinations
}

function runAmplifiers(program, sequenze) {
  return sequenze.reduce((output, phaseID) => {
    output = runProgram(program, [phaseID, output])
    return output
  }, 0)
}

function run() {
  const largestOutput = getAllCombinations(0, 4).reduce((largest, combination) => {
    const output = runAmplifiers(input, combination)
    return largest > output ? largest : output
  }, 0)
  return largestOutput
}

export default run