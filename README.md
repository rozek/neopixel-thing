# neopixel-thing #

a simple thing for the "Modular-Things" project that allows you to control a WS2812 ("NeoPixel") RGB LED strip

![NeoPixel Thing](NeoPixel-Test.jpg)


```javascript
const BlinkDelay  = 800 // LED toggles every BlinkDelay milliseconds

const NumOfPixels = 60
const PixelData = []
  for (let i = 0; i < NumOfPixels; i++) {
    let Hue        = i/NumOfPixels * 360
    let Saturation = 1
    let Value      = 0.1
    
    PixelData.push(...HSV2RGB(Hue,Saturation,Value))
  }
NeoPixel.setLength(NumOfPixels)
NeoPixel.loadPixels(PixelData)

let Timestamp = Date.now(), Value = 0
loop(async () => {
  let now = Date.now()
  if (Timestamp + BlinkDelay < now) {
    Value = (Value === 0 ? 0.1 : 0)
    await NeoPixel.setRGB(0,0,Value)

    Timestamp = now
  }
}, 10)


function HSV2RGB (Hue, Saturation, Value) {
  const Chroma = Value * Saturation
  const aux    = Chroma * (1 - Math.abs((Hue/60) % 2 - 1))
  const Match  = Value - Chroma

  let R,G,B
    if (Hue >= 0 && Hue < 60) {
      [R,G,B] = [Chroma,aux,0]
    } else if (Hue >= 60 && Hue < 120) {
      [R,G,B] = [aux,Chroma,0]
    } else if (Hue >= 120 && Hue < 180) {
      [R,G,B] = [0,Chroma,aux]
    } else if (Hue >= 180 && Hue < 240) {
      [R,G,B] = [0,aux,Chroma]
    } else if (Hue >= 240 && Hue < 300) {
      [R,G,B] = [aux,0,Chroma]
    } else {
      [R,G,B] = [Chroma,0,aux]
    }
  return [R+Match, G+Match, B+Match]
}
```
