import input from './input.json'

const WIDTH = 25
const HEIGHT = 6
const FIRST_DIGIT = '1'
const SECOND_DIGIT = '2'

function chunkString(string: string, chunkSize: number): string[] {
  let cut = 0
  const chunks = []
  while (string.length > cut) {
    chunks.push(string.slice(cut, cut + chunkSize))
    cut += chunkSize
  }
  return chunks
} 

function organizeLayer(chunk: string, width: number, height: number): string[] {
  let pointer = 0;
  let layer = []
  while (chunk.length > pointer) {
    for (let h = 0; height > h; h++) {
      let widthString = ''
      for (let w = 0; width > w; w++) {
        widthString += chunk[pointer]
        pointer++
      }
      layer.push(widthString)
    }
  }
  return layer
}

function getFewestZeroes(layers) {
  const { layer } = layers.reduce((fewestZeroes: any, layer: string[]) => {
    const zeroes = layer.reduce((sum, string) => sum + string.split('0').length - 1, 0)
    return fewestZeroes.zeroes && zeroes > fewestZeroes.zeroes
      ? fewestZeroes
      : { layer, zeroes }
  }, { })
  return layer
}

function multiplyDigits(layer: string[], firstDigit: string, secondDigit: string): number {
  return layer.reduce((sum, string) => sum + string.split(firstDigit).length - 1, 0)
    * layer.reduce((sum, string) => sum + string.split(secondDigit).length - 1, 0)
}

function run() {
  const chunks = chunkString(input, WIDTH * HEIGHT)
  const layers = chunks.map((chunk: string) => {
    return organizeLayer(chunk, WIDTH, HEIGHT)
  })
  const layerWithFewestZeroes = getFewestZeroes(layers)
  const result = multiplyDigits(layerWithFewestZeroes, FIRST_DIGIT, SECOND_DIGIT)
  return result
}

export default run