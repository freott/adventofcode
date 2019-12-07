import input from './input.json'

/**
 * To find the fuel required for a module, take its mass, 
 * divide by three, round down, and subtract 2.
 */
function calculateFuel(mass: number, fuelSum = 0): number {
  const fuel = Math.floor(mass / 3) - 2
  return fuel > 0 
    ? calculateFuel(fuel, fuel + fuelSum) 
    : fuelSum
}

function run() {
  return input.reduce((sum, mass) => sum + calculateFuel(mass), 0)
}

function run2() {
  const calculateFuel = (mass) => Math.floor(mass / 3) - 2
  
  let totalFuel = 0
  input.forEach(mass => {
    let fuel = calculateFuel(mass)
    do {
      totalFuel += fuel
      fuel = calculateFuel(fuel)
    } while (fuel > 0)
  })
  return totalFuel
}

export default run