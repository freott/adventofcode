import input from './input.json'

function hasDouble(text) {
  return text.split('').some((currentDigit, index, array) => currentDigit === array[index - 1])
}

function hasNoDecreasingNumbers(text) {
  return text.split('').every((digit, index, array) => {
    return index === 0 || Number(digit) >= Number(array[index - 1])
  })
}

function getAmountOfPossiblePasswords(floor, roof) {
  const passwords = []
  let next = floor;
  while (roof > next || 6 > next.length) {
    if (
        hasDouble(next)
        && hasNoDecreasingNumbers(next)
        && next.length === 6
    ) passwords.push(next)
    next = (Number(next) + 1).toString()
  }
  return passwords.length

}

function run() {
  const [floorValue, roofValue] = input.split('-')
  return getAmountOfPossiblePasswords(floorValue, roofValue)
}

export default run