import input from './input.json'

/**
 * Before running the program, replace 
 * position 1 with the value 12 and 
 * replace position 2 with the value 2.
 */
function iterateList(list, pointer = 0): number[] {
  if (pointer > list.length) return list
  if (pointer === 0) {
    list[1] = 12
    list[2] = 2
  }

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

function run() {
  return iterateList(input)[0]
}

export default run