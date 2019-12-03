import input from './input.json'

const THE_MAGIC_NUMBER = 19690720

function maybeApplyZero(number: number): string {
  return `${number}`.length === 1 ? `0${number}` : `${number}`
}

function iterateList(list: number[], pointer = 0): number[] {
  if (pointer > list.length) return list

  const nextPointer = pointer + 4
  const [
    opcode, 
    firstPointer, 
    secondPointer, 
    target 
  ] = list.slice(pointer, nextPointer);
  
  switch (opcode) {
    case 1:
      list[target] = list[firstPointer] + list[secondPointer]
      return iterateList(list, nextPointer)
    case 2:
      list[target] = list[firstPointer] * list[secondPointer]
      return iterateList(list, nextPointer)
    case 99:
      return list
    default:
      throw Error(`opcode can only be 1, 2 or 99, found ${opcode}`)
  }
}

function findValue(originalList: number[], noun = 0, verb = 0): string {
  if (verb > 99) throw Error('Gone through all possible combinations and never found the magic number')
  const manipulatedList = [...originalList]
  manipulatedList[1] = noun
  manipulatedList[2] = verb
  if (iterateList(manipulatedList)[0] === THE_MAGIC_NUMBER) return maybeApplyZero(noun) + maybeApplyZero(verb)
  if (noun < 100) return findValue(originalList, noun + 1, verb)
  return findValue(originalList, 0, verb + 1)
}

function run() {
  return findValue(input)
}

export default run