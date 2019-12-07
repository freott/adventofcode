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
  const nextPointer = opcode > 2 ? pointer + 2 : pointer + 4
  const [firstPointer, secondPointer, target] = list.slice(pointer + 1, nextPointer);
  const [firstValue, secondValue] = getModifiers(list, modes, firstPointer, secondPointer)
  
  switch (opcode) {
    case 1: 
      list[target] = firstValue + secondValue
      break;
    case 2: 
      list[target] = firstValue * secondValue
      break;
    case 3:
      list[firstPointer] = input
      break;
    case 4:
      console.log('Output instruction:', firstValue)
      if (firstValue !== 0) {
        console.log('Previous instruction:', JSON.stringify(previousInstruction, null, 2))
      }
      break;
    case 99:
      return list
    default:
      throw Error(`opcode can only be 1, 2, 3, 4 or 99, found ${opcode}. Previous instruction: ${JSON.stringify(previousInstruction, null, 2)}`)
  }
  const instructionSummary = {
    instruction: list[pointer],
    opcode,
    modes,
    firstPointer,
    secondPointer,
    target,
    newTargetValue: list[target]
  }
  return iterateList(list, input, nextPointer, instructionSummary)
}

function run() {
  return iterateList(input, 1)
}

export default run