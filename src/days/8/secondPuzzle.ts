import input from './input.json'

const WIDTH = 25
const HEIGHT = 6
const BLACK = '0'
const WHITE = '1'
const TRANSPARENT = '2'

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

function replaceAt(string: string, index: number, replacement: string): string {
  return string.substring(0, index) + replacement + string.substring(index + replacement.length)
}

function decodeImage(layers: string[][], width: number, height: number): string[] {
  const decodedLayer = new Array(height).fill(TRANSPARENT.repeat(width))
  layers.forEach(layer => {
    layer.forEach((string, heightIndex) => {
      let decodedString = decodedLayer[heightIndex]
      string.split('').forEach((digit, widthIndex) => {
        if ([BLACK, WHITE].includes(decodedString.charAt(widthIndex))
          || digit === TRANSPARENT) return
        decodedString = replaceAt(decodedString, widthIndex, digit)
      })
      decodedLayer[heightIndex] = decodedString
    })
  })
  return decodedLayer
}

function paintImage(image, white, black) {
    return image
      .map(string => string.replace(new RegExp(WHITE, 'g'), white))
      .map(string => string.replace(new RegExp(BLACK, 'g'), black))
}

function run() {
  const chunks = chunkString(input, WIDTH * HEIGHT)
  const layers = chunks.map((chunk: string) => {
    return organizeLayer(chunk, WIDTH, HEIGHT)
  })

  const decodedImage = decodeImage(layers, WIDTH, HEIGHT)
  return paintImage(decodedImage, '#', ' ')
}

export default run