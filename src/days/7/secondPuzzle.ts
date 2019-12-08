import input from './input.json'

function getModifiers(list: number[], modes: number[], firstPointer: number, secondPointer: number) {
  const firstValue = modes[0] === 1 ? firstPointer : list[firstPointer]
  const secondValue = modes[1] === 1 ? secondPointer : list[secondPointer]
  return [firstValue, secondValue]
} 

function iterateList(list: number[], input: number, pointer = 0, previousInstruction = {}): number[] {
  if (pointer > list.length) return list
  const instruction = list[pointer].toString().split('')
  const opcode = Number(instruction.splice(-2).reduce((opcodePart1: string, opCodePart2: string) => opcodePart1 + opCodePart2))
  const modes = []
  while (instruction.length) {
    modes.push(Number(instruction.pop()))
  }
  const [firstPointer, secondPointer, thirdPointer] = list.slice(pointer + 1, pointer + 4);
  const [firstValue, secondValue] = getModifiers(list, modes, firstPointer, secondPointer)
  
  let nextPointer
  switch (opcode) {
    case 1: {
      nextPointer = pointer + 4
      list[thirdPointer] = firstValue + secondValue
      break;
    }
    case 2: {
      nextPointer = pointer + 4
      list[thirdPointer] = firstValue * secondValue
      break;
    }
    case 3: {
      nextPointer = pointer + 2
      list[firstPointer] = input
      break;
    }
    case 4: {
      nextPointer = pointer + 2
      console.log('Output instruction:', firstValue)
      if (firstValue !== 0 && list[nextPointer] !== 99) {
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
      list[thirdPointer] = secondValue > firstValue ?  1 : 0
      break;
    case 8:
      nextPointer = pointer + 4
      list[thirdPointer] = secondValue === firstValue ?  1 : 0
      break;
    case 99:
      return previousInstruction['firstValue']
    default:
      throw Error(`opcode can only be 1, 2, 3, 4, 5, 6, 7, 8 or 99, found ${opcode}. Previous instruction: ${JSON.stringify(previousInstruction, null, 2)}`)
  }
  const instructionSummary = {
    instruction: list[pointer],
    opcode,
    modes,
    firstPointer,
    secondPointer,
    thirdPointer,
    firstValue,
    secondValue,
    target: thirdPointer,
    newTargetValue: list[thirdPointer]
  }
  return iterateList(list, input, nextPointer, instructionSummary)
}

function run() {
  return iterateList(input, 5)
}

export default run