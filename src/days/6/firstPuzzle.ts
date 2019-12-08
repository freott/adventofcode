import input from './input.json'

function resolver(satelliteBodyMap) {
  const satelliteOrbitCounts = {}
  const resolve = (satellite) => {
    if (satellite === 'COM') return 0
    const body = satelliteBodyMap[satellite]
    satelliteOrbitCounts[satellite] = 1 + (satelliteOrbitCounts[body] || resolve(body))
    return satelliteOrbitCounts[satellite]
  }

  return resolve
}

function run() {
  const satelliteBodyMap = input.reduce((map, string) => {
    const [body, satellite] = string.split(')')
    return {...map, [satellite]: body}
  }, {})

  const resolve = resolver(satelliteBodyMap)
  return Object.keys(satelliteBodyMap).reduce((sum, satellite) => {
    return sum += resolve(satellite)
  }, 0)
}

export default run