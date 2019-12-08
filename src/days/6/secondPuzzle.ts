import input from './input.json'

const CENTER_OF_MASS = 'COM'
const ME = 'YOU'
const SANTA = 'SAN'

function getTrace(satelliteBodyMap: Object, satellite: string, trace = []) {
  if (satellite === CENTER_OF_MASS) return [CENTER_OF_MASS, ...trace]
  return [satellite, ...getTrace(satelliteBodyMap, satelliteBodyMap[satellite], trace)]
}

function countTransfers(trace: string[], closestSatellite: string) {
  return trace.slice(0, trace.findIndex(satellite => satellite === closestSatellite)).length
}

function run() {
  const satelliteBodyMap = input.reduce((map, string) => {
    const [body, satellite] = string.split(')')
    return {...map, [satellite]: body}
  }, {})

  const myTrace = getTrace(satelliteBodyMap, satelliteBodyMap[ME])
  const santasTrace = getTrace(satelliteBodyMap, satelliteBodyMap[SANTA])

  const closestSatellite = myTrace.find(mySatellite => santasTrace.some(santasSatellite => mySatellite === santasSatellite))

  return countTransfers(myTrace, closestSatellite) + countTransfers(santasTrace, closestSatellite)
}

export default run