import input from './input.json'

/**
 * To find the fuel required for a module, take its mass, 
 * divide by three, round down, and subtract 2.
 */
function calculateFuel(mass: number): number {
  return Math.floor(mass / 3) - 2
}

function run() {
  return input.reduce((sum, mass) => sum + calculateFuel(mass), 0)
}

export default run